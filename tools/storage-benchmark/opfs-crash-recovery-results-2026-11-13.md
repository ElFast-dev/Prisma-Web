# OPFS Crash Recovery AutoTest V1 · Resultado real

**Fecha:** 13 de noviembre de 2026, hora de Panamá (UTC-5).  
**RUN_ID:** `prisma-opfs-crash-recovery-986eb1b4-a6d7-4fa3-b5dc-26028624c271`.  
**Archivo:** `file:prisma-opfs-crash-recovery-986eb1b4-a6d7-4fa3-b5dc-26028624c271/recovery.sqlite3`.  
**SQLite:** núcleo 3.54.1; paquete 3.54.1-build1.  
**VFS:** `opfs`.  
**Entorno:** COOP `same-origin`, COEP `require-corp`, `crossOriginIsolated=true`, SharedArrayBuffer, OPFS y Dedicated Worker disponibles.  
**Modo de journal:** `delete`; **synchronous:** valor devuelto 2 tras configurar `PRAGMA synchronous=FULL`; **locking_mode:** `normal`; **page_size:** 8192.

La carpeta de este RUN_ID se conservó. La sonda no ejecutó reparación ni limpieza.

## Resultado

**APROBADO para los dos escenarios controlados de terminación abrupta de Dedicated Worker.**

### Preparación

- Se creó una base nueva y se confirmaron cinco filas `baseline`.
- Conteos: total=5, baseline=5, uncommitted=0, committedNoAck=0.
- `quick_check=["ok"]`, `integrity_check=["ok"]`.
- Conexión cerrada; `transactionState=0`.

### Ensayo A: terminación con transacción abierta y sin COMMIT

1. Una conexión nueva abrió el mismo archivo.
2. Comenzó `BEGIN IMMEDIATE`.
3. Insertó cinco filas `uncommitted`.
4. La sonda observó `transactionState=2` y `totalChanges=5`.
5. La página llamó a `Worker.terminate()` sin ejecutar COMMIT ni permitir limpieza del Worker.
6. Una conexión nueva reabrió la base y verificó los conteos.

Resultado tras recuperación:

| Conteo | Esperado | Observado |
|---|---:|---:|
| Total | 5 | 5 |
| baseline | 5 | 5 |
| uncommitted | 0 | 0 |
| committedNoAck | 0 | 0 |

`quick_check` e `integrity_check` devolvieron `ok`.

**Ensayo A: PASS.** Las cinco inserciones no confirmadas no sobrevivieron; las cinco filas confirmadas permanecieron.

### Observación adicional del journal después del rollback

Después de que la nueva conexión verificó el rollback y se cerró, el listado OPFS informó:

- `recovery.sqlite3`: 40.960 bytes.
- `recovery.sqlite3-journal`: 36.896 bytes.

No se registraron los primeros bytes, la cabecera ni el contenido del journal. Por tanto, el informe no permite determinar si el archivo restante tenía una cabecera de journal caliente válida o era un artefacto inerte/no-hot. No debe etiquetarse como corrupción ni ignorarse.

La documentación oficial de SQLite explica que, en modo DELETE, el journal de rollback se elimina al concluir la transacción; durante la recuperación de un hot journal, SQLite revierte los cambios y después elimina el journal. La clasificación de un hot journal depende, entre otras condiciones, de una cabecera válida y no nula. En esta ejecución solo se registró el tamaño, no la cabecera. Referencias:
- https://sqlite.org/pragma.html#pragma_journal_mode
- https://www.sqlite.org/lockingv3.html#hot_journals

En la verificación final posterior al segundo escenario, el listado OPFS mostró únicamente `recovery.sqlite3` (40.960 bytes); el archivo `-journal` ya no aparecía. No se sabe exactamente en qué operación intermedia desapareció.

**Seguimiento pendiente:** una futura sonda aislada debe registrar, sin modificar el archivo, los primeros 32 bytes y la clasificación de la cabecera del journal inmediatamente después de una recuperación por rollback, y volver a listar después de una segunda apertura sin escrituras. No borrar el journal manualmente ni reutilizar este RUN_ID.

### Ensayo B: COMMIT completado, acuse retenido, Worker terminado

1. Una conexión nueva abrió el archivo y comprobó que había cinco filas iniciales.
2. Insertó cinco filas `committed-no-ack` dentro de `BEGIN IMMEDIATE`.
3. Ejecutó COMMIT.
4. Verificó localmente diez filas, `quick_check=["ok"]` e `integrity_check=["ok"]`.
5. Envió a la página una señal que acredita que el COMMIT había terminado, pero retuvo el acuse final.
6. La página terminó abruptamente el Worker con `Worker.terminate()`.
7. Una conexión nueva reabrió la base y comprobó el resultado.

Resultado tras recuperación:

| Conteo | Esperado | Observado |
|---|---:|---:|
| Total | 10 | 10 |
| baseline | 5 | 5 |
| uncommitted | 0 | 0 |
| committedNoAck | 5 | 5 |

`quick_check` e `integrity_check` devolvieron `ok`.

**Ensayo B: PASS.** Las cinco filas cuyo COMMIT ya había terminado sobrevivieron aunque el Worker fue terminado antes de enviar el acuse.

### Reapertura final

Un tercer Worker y una conexión SQLite nueva volvieron a abrir el mismo archivo.

- Total=10.
- baseline=5.
- uncommitted=0.
- committedNoAck=5.
- `quick_check=["ok"]`.
- `integrity_check=["ok"]`.
- `transactionState=0`.
- VFS `opfs`, SQLite 3.54.1, journal_mode `delete`, synchronous=2, readOnly=0.
- Archivos OPFS observados: solo `recovery.sqlite3`, 40.960 bytes.

**Reapertura final: PASS.**

## Interpretación

La ejecución acredita recuperación de SQLite sobre OPFS clásico frente a dos interrupciones inmediatas del Dedicated Worker:

- la transacción que no llegó a COMMIT se revirtió;
- la transacción cuyo COMMIT ya había terminado permaneció, incluso al perderse la respuesta al cliente;
- el archivo pudo reabrirse y superar las comprobaciones de integridad en dos verificaciones posteriores.

Esto no demuestra un apagado de Android, un cierre forzado del proceso Brave, pérdida de energía ni fallo físico del dispositivo. `Worker.terminate()` interrumpe el Worker dedicado y no simula todo el ciclo de vida del sistema operativo.

## Arquitectura y siguiente trabajo

OPFS clásico queda fortalecido como candidato: ha pasado la prueba de 57 filas concurrentes controladas, la persistencia a través de recarga y reapertura manual de Brave y estos dos escenarios de recuperación del Worker. Sin embargo, la documentación oficial advierte que OPFS requiere locks exclusivos de SyncAccessHandle, que la concurrencia entre workers exige transacciones breves y tratamiento de `SQLITE_BUSY` (o de ciertos errores I/O), y que el límite fiable de conexiones depende del entorno. No se aprobará una arquitectura de múltiples escritores OPFS solo por esta prueba pequeña.

SharedWorker + OPFS SAH pool sigue siendo alternativa fuerte: su diseño de un único propietario SQLite evita conexiones simultáneas al mismo archivo, y las pruebas previas de transferencia, 24 solicitudes/605 filas y recuperación ya están documentadas. Falta una prueba equivalente de persistencia del archivo SAH pool a través de recarga y reapertura manual de Brave para compararlo con OPFS clásico.

**Próximo paso recomendado:** construir una prueba aislada de persistencia del SAH pool con `clearOnInit=false` y `preserveOnInitFailure=true` explícitos, para evitar que un fallo de inicialización pueda borrar el almacenamiento. Comparar el mismo tipo de 57 filas, huella SHA-256 y sesiones entre sesiones de navegador. Después cerrar la matriz de arquitectura.

**No iniciar todavía la app principal ni declarar definitivo el almacenamiento.** No limpiar ni reutilizar este RUN_ID.
