# OPFS Crash Recovery AutoTest V1

Sonda experimental e independiente para probar recuperación de SQLite WASM 3.54.1 sobre OPFS clásico (`opfs`). Los dos casos de interrupción se provocan con `DedicatedWorker.terminate()`: una transacción sin COMMIT y una transacción con COMMIT completado cuyo acuse se retiene.

## Requisitos

- Proyecto local `~/prisma-storage-benchmark` con `node_modules/@sqlite.org/sqlite-wasm` 3.54.1-build1 en su raíz.
- Servidor `serve-opfs-wl.py` ya activo en el puerto 18768.
- COOP `same-origin`, COEP `require-corp`, `crossOriginIsolated=true`, OPFS, SharedArrayBuffer y Dedicated Worker.
- Brave en el dispositivo de aceptación.

No instala dependencias, no reinicia servidores y no consulta ni modifica otros RUN_ID.

## Dirección y directorio

`http://127.0.0.1:18768/opfs-crash-recovery-auto-test/`

Directorio local servido:
`~/prisma-storage-benchmark/opfs-crash-recovery-auto-test/`

La herramienta genera un RUN_ID nuevo al iniciar y lo añade a la URL. Si la URL ya contiene `run`, la página rechaza iniciar otra vez esa base. Para un nuevo ensayo abre la ruta base sin parámetro `run`. No reutilices un RUN_ID.

## Protocolo

1. Crea una base nueva y confirma cinco filas iniciales.
2. Abre `BEGIN IMMEDIATE`, inserta cinco filas `uncommitted` y mantiene la transacción abierta. La página espera `transactionState=2` y cinco cambios antes de llamar a `Worker.terminate()`.
3. Una conexión SQLite nueva abre el archivo y ejecuta `quick_check`, `integrity_check` y conteos. Debe recuperar solo las cinco filas iniciales.
4. Un segundo Worker inserta otras cinco filas `committed-no-ack`, completa COMMIT, verifica diez filas y la integridad, emite una señal de COMMIT completado y retiene el acuse final. La página lo termina con `Worker.terminate()`.
5. Una conexión nueva reabre el archivo. Debe encontrar diez filas: cinco iniciales y cinco confirmadas, ninguna sin COMMIT.
6. Un Worker final vuelve a abrir y verifica los mismos diez registros. Todos los directorios se conservan.

## Resultados esperados

- Tras rollback: total=5, baseline=5, uncommitted=0, committedNoAck=0.
- Tras COMMIT sin acuse: total=10, baseline=5, uncommitted=0, committedNoAck=5.
- Tras la reapertura final: los mismos diez registros.
- Cada recuperación debe devolver exclusivamente `ok` en ambas comprobaciones de integridad.
- Metadatos: VFS `opfs`, `journal_mode=delete`, `synchronous=FULL`, `readOnly=0` y transacción cerrada (`sqlite3_txn_state=0`) al verificar.

## Alcance

`Worker.terminate()` detiene el Worker sin permitir que complete o limpie su operación. Esta prueba mide la recuperación cuando desaparece abruptamente el Dedicated Worker propietario de la conexión. **No equivale** a apagar Android, perder energía, forzar la terminación del proceso Brave ni a probar un fallo físico del dispositivo.

Una aprobación solo cubre estos dos escenarios controlados. No aprueba por sí sola OPFS para toda Prisma ni sustituye repeticiones, estrés, cuota, migraciones, cifrado, exportación/restauración o comparación con SharedWorker + OPFS SAH pool.

## Seguridad

- Directorio: `prisma-opfs-crash-recovery-<UUID>`.
- Archivo: `recovery.sqlite3`.
- No reutiliza RUN_ID antiguos.
- No incluye funciones de borrado, limpieza o reparación.
- Ante cualquier error detiene la prueba y preserva el directorio y el informe.
- No borres datos del sitio Brave ni carpetas OPFS de ensayos anteriores.

**Estado al documentar:** herramienta construida y validada estáticamente; pendiente de ejecución real en Brave.
