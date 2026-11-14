# OPFS Persistence Probe V1 · Resultado real

**Fecha del informe:** 13 de noviembre de 2026, hora de Panamá (UTC-5).  
**Dispositivo/navegador de aceptación declarado:** Galaxy A03 con Brave; el User-Agent recibido solo declara Android 10 y Chrome/157, por lo que no se usa como verificación independiente del sistema operativo o marca.  
**SQLite:** núcleo 3.54.1; paquete 3.54.1-build1.  
**VFS:** `opfs` (OPFS clásico).  
**COOP/COEP:** `same-origin` / `require-corp`.  
**Aislamiento:** `crossOriginIsolated=true`; SharedArrayBuffer, OPFS, Dedicated Worker y Web Crypto disponibles.

## Identificación de la ejecución

- RUN_ID: `prisma-opfs-survival-a29c5f2e-f49f-4e57-85ed-e0106d31df25`
- Archivo: `file:prisma-opfs-survival-a29c5f2e-f49f-4e57-85ed-e0106d31df25/survival.sqlite3`
- Inicio reportado: 13-11-2026, 20:18:49 (hora de Panamá).
- Fase de la última apertura: `after-close-1`.
- PAGE_BOOT_ID de la última apertura: `a89c7924-a294-4088-a21e-d2a0aee0e743`.

## Resultado de persistencia

**APROBADO para el escenario ejecutado.** La misma base sobrevivió a la creación inicial, una recarga de la página y una nueva apertura declarada manualmente después de cerrar Brave por completo.

La última apertura volvió a encontrar las tres tablas esperadas:

- `dataset`
- `records`
- `verification_sessions`

Metadatos observados:

- `journal_mode=delete`
- `locking_mode=normal`
- `synchronous=2`
- `page_size=8192`
- `schema_version=3`
- `readOnly=0`

La prueba encontró 57 registros únicos: A=29, B=28 y total=57.

### Huella de los datos

- SHA-256 guardado: `feb1859f51eeef189df729862f4e14b3875cdc7d25c0f0063e0b1e7f4b8d524a`
- SHA-256 observado: `feb1859f51eeef189df729862f4e14b3875cdc7d25c0f0063e0b1e7f4b8d524a`
- Coincidencia exacta: **sí**.
- `quick_check=["ok"]`.
- `integrity_check=["ok"]`.
- `distinctPayloads=57).

### Historial conservado dentro de SQLite

| Fase | Hora de Panamá | PAGE_BOOT_ID |
|---|---|---|
| `seed-created` | 13-11-2026, 20:18:22 | `ff9a7fca-8866-4562-8f56-93a08e8baba3` |
| `after-reload` | 13-11-2026, 20:18:30 | `5ca90907-6a15-4009-ad5c-129ba6fd3319` |
| `after-close-1` | 13-11-2026, 20:18:50 | `a89c7924-a294-4088-a21e-d2a0aee0e743` |

Las tres fases tienen PAGE_BOOT_ID distintos. En la última apertura, el contador informó dos sesiones anteriores y se leyó el historial completo de tres sesiones después de registrar la sesión actual.

Identificador de la sesión final: `93411ded-3965-4cbe-83b6-af5ea7dafbf0`.

## Qué demuestra

1. La base creada por una conexión SQLite nueva se pudo abrir desde otro Dedicated Worker tras recargar la página.
2. Los 57 registros y la huella SHA-256 permanecieron iguales después de la recarga.
3. La conexión y el contexto de página volvieron a abrir el archivo con otro PAGE_BOOT_ID.
4. La base conservó también su historial de verificaciones, incluyendo las fases anteriores.
5. Las comprobaciones `quick_check` e `integrity_check` devolvieron `ok` después de la reapertura.

El usuario informó que cerró Brave por completo antes de abrir la URL preparada con `phase=after-close-1`. La aplicación registró esa fase y verificó la base tras abrirse de nuevo.

**Límite importante:** la fase `after-close-1` es declarada por el usuario; una página web no puede certificar por sí misma que el proceso de Brave terminó ni distinguir un cierre completo de una restauración de pestaña en todos los escenarios. Se documenta como evidencia de una reapertura posterior al procedimiento manual, no como telemetría independiente del sistema operativo.

## Alcance y pruebas pendientes

Esta ejecución valida persistencia de datos ya confirmados a través del flujo de siembra, cierre explícito de SQLite, recarga y reapertura manual del navegador. No valida todavía:

- terminación abrupta de un Worker mientras existe una transacción sin COMMIT;
- terminación después de COMMIT pero antes de la respuesta al cliente;
- interrupción real del proceso durante la escritura o sincronización;
- pérdida de energía, bloqueo del dispositivo, cierre forzado por Android o descarte real del proceso por el sistema;
- cuota agotada, migraciones, cifrado, gestión de claves o restauración de exportaciones.

La próxima prueba debe aislar OPFS clásico y ensayar dos casos de interrupción: una transacción sin COMMIT que debe desaparecer por rollback y una transacción ya confirmada cuya respuesta se retiene deliberadamente y que debe reaparecer al abrir una conexión nueva. Cada escenario tendrá un RUN_ID nuevo, verificaciones de integridad y preservación automática ante cualquier error.

**Estado de arquitectura:** OPFS clásico es el candidato principal y ha aprobado esta prueba de persistencia. La arquitectura de almacenamiento definitiva de Prisma todavía no está aprobada; debe completarse la recuperación ante interrupción y compararse con SharedWorker + OPFS SAH pool bajo criterios equivalentes. No limpiar ni reutilizar este RUN_ID.

## Actualización: recuperación ante terminación abrupta del Worker (13-11-2026)

La fase que en la versión inicial de este informe figuraba como pendiente **ya se ejecutó** en OPFS clásico:

- RUN_ID: `prisma-opfs-crash-recovery-986eb1b4-a6d7-4fa3-b5dc-26028624c271`.
- Cinco INSERT sin COMMIT: después de terminar el Worker, una conexión nueva recuperó cinco filas baseline y cero no confirmadas; integridad `ok`.
- Cinco INSERT con COMMIT completado pero sin acuse: después de terminar el Worker, una conexión nueva recuperó las diez filas; integridad `ok`.
- Tercera reapertura: diez filas, `transactionState=0`, integridad `ok`.

Esto completa los dos escenarios controlados de interrupción del Dedicated Worker. No equivale a apagado de Android, cierre forzado de Brave ni pérdida de energía.

### Observación de journal que requiere seguimiento

Después de la recuperación del primer rollback, el listado OPFS todavía mostraba `recovery.sqlite3-journal` de 36.896 bytes. Después del segundo escenario y la reapertura final, solo aparecía `recovery.sqlite3`.

El informe no capturó la cabecera ni el contenido del journal, por lo que no se puede determinar si era un journal caliente, inerte o un efecto temporal del VFS. La documentación de SQLite explica que en modo DELETE el journal se elimina al concluir la transacción y que, durante la recuperación de un hot journal, SQLite revierte y después elimina el archivo. No manipular ni borrar manualmente ese archivo. La observación detallada y el alcance están en [opfs-crash-recovery-results-2026-11-13.md](opfs-crash-recovery-results-2026-11-13.md).

Referencias oficiales: https://sqlite.org/pragma.html#pragma_journal_mode y https://www.sqlite.org/lockingv3.html#hot_journals.

**Siguiente comparación:** persistencia de SharedWorker + OPFS SAH pool a través de recarga y reapertura manual de Brave, con `clearOnInit=false` y `preserveOnInitFailure=true` explícitos. OPFS clásico sigue como candidato principal, pero la arquitectura definitiva aún no está aprobada. No reutilizar ni limpiar los RUN_ID existentes.
