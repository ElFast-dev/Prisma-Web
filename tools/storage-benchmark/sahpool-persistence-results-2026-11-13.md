# Prisma · SAH Pool Persistence Probe V1 — resultado real

**Fecha:** 13 de noviembre de 2026, hora de Panamá (UTC-5).  
**RUN_ID:** `prisma-sahpool-survival-b1bb9d6f-2558-4d1d-a2a8-a75744cebc2a`.  
**VFS:** `opfs-sahpool`, registrado como `prisma_sahpool_persistence_v1`.  
**SQLite:** núcleo 3.54.1; paquete `3.54.1-build1`.  
**Base virtual:** `/prisma-sahpool-survival-b1bb9d6f-2558-4d1d-a2a8-a75744cebc2a.sqlite3`.  
**Directorio del VFS:** `/prisma-sahpool-persistence-probe-v1`.  
**PAGE_BOOT_ID final:** `a5b825f2-e07c-4fcc-8c4b-0bd27fea3026`.  
**Fase informada:** `after-close-1`.

El RUN_ID y el directorio permanecen preservados. No se ejecutó limpieza ni reparación.

## Protección de inicialización

La prueba registró exactamente:

```json
{
  "name": "prisma_sahpool_persistence_v1",
  "directory": "/prisma-sahpool-persistence-probe-v1",
  "initialCapacity": 6,
  "clearOnInit": false,
  "preserveOnInitFailure": true
}
```

La instalación fue satisfactoria. El pool reportó capacidad 6, un archivo asignado y el nombre virtual esperado. La opción `clearOnInit=false` evita solicitar el borrado al inicializar. `preserveOnInitFailure=true` protege el contenido si la inicialización del pool falla; se eligió porque la documentación oficial describe que, por defecto, un fallo de inicialización puede eliminar el almacenamiento del pool. La documentación de SQLite también advierte que el directorio configurado queda administrado por el VFS y no debe contener archivos ajenos.

## Datos y huella

La base contiene tres tablas:

- `dataset`
- `records`
- `verification_sessions`

El conjunto sintético esperado fue A=29 y B=28, total 57.

| Comprobación | Esperado | Observado |
|---|---:|---:|
| Registros totales | 57 | 57 |
| Registros A | 29 | 29 |
| Registros B | 28 | 28 |
| Payloads distintos | 57 | 57 |
| SHA-256 | `a9d09c499384dc4deeaadfeffd9d68f9a0860eec4648bd5144a1862638c33d76` | Coincidente |
| `quick_check` | `ok` | `ok` |
| `integrity_check` | `ok` | `ok` |

La misma huella se conservó después de la siembra, después de recargar y en la fase `after-close-1`.

## Historial de aperturas

| Fase | Hora local de Panamá | PAGE_BOOT_ID |
|---|---|---|
| `seed-created` | 13-11-2026 9:04:56 p. m. | `b2b7eb7a-d69f-4ddc-aa58-15cbeb352071` |
| `after-reload` | 13-11-2026 9:04:59 p. m. | `e28caf3a-57a7-483c-af40-6b50985f82e6` |
| `after-close-1` | 13-11-2026 9:05:17 p. m. | `a5b825f2-e07c-4fcc-8c4b-0bd27fea3026` |

Los tres identificadores de página son distintos. La última sesión fue declarada manualmente por el usuario después de cerrar y volver a abrir Brave. La página no puede certificar por sí sola que Android haya terminado por completo el proceso de Brave, por lo que la conclusión debe expresarse como persistencia tras la reapertura manual declarada, no como prueba automatizada del cierre del proceso.

## Metadatos SQLite

- `journal_mode=delete`.
- `locking_mode=normal`.
- `synchronous=2` (FULL).
- `page_size=8192`.
- `schema_version=3`.
- `user_version=1`.
- `readOnly=0`.
- Pool: capacidad 6, `fileCount=1`, un único archivo virtual asignado.
- Tras cerrar la conexión, el pool continuó informando el archivo virtual y los mismos parámetros de capacidad.

## Resultado

**APROBADO para persistencia de este conjunto a través de cierre de conexión, recarga de página y reapertura manual de Brave declarada por el usuario.**

Los 57 registros, el recuento por cliente y el SHA-256 coincidieron; ambas comprobaciones de integridad devolvieron `ok`. La sonda utilizó una carpeta VFS propia y protegió el contenido ante fallos de inicialización.

## Qué demuestra y qué no

Demuestra que el VFS SAH pool 3.54.1 puede volver a inicializarse en un contexto de página/Worker nuevo y encontrar el mismo archivo y los mismos datos cuando se conservan el nombre y el directorio del VFS, sin pedir que se limpie el contenido.

La fase `after-close-1` fue declarada manualmente: el informe no demuestra que Brave/Android haya terminado el proceso a nivel del sistema operativo. Tampoco prueba concurrencia nativa de varias instancias SAH pool. El diseño propuesto debe mantener un único propietario SQLite activo y coordinar las demás pestañas a nivel de aplicación.

Esta prueba se combina con la evidencia previa ya documentada:
- Transferencia cooperativa V8 con 200 registros.
- Concurrencia de dos clientes: 24/24 solicitudes y 605 registros con un solo propietario SQLite.
- Recovery AutoTest V1 sobre SAH pool: rollback, COMMIT con respuesta retenida, reapertura y limpieza exclusiva aprobados.
- Pruebas OPFS clásicas de integridad y Crash Recovery, como evidencia complementaria; no se confunden con este resultado SAH pool.

OPFS-WL continúa **no aprobado** por la ejecución previa que devolvió `SQLITE_CORRUPT` bajo escrituras concurrentes. OPFS clásico sigue siendo una alternativa técnicamente viable, con la observación pendiente del archivo journal documentada en el informe de Crash Recovery.

## Recomendación técnica para Prisma

La evidencia disponible favorece como candidato principal:

1. SQLite WASM 3.54.1-build1.
2. VFS `opfs-sahpool` con directorio persistente y protegido.
3. Un único Dedicated Worker propietario de la base SQLite en cada momento.
4. SharedWorker como coordinador de pestañas/clientes, sin intentar crear Dedicated Workers desde el propio SharedWorker.
5. Las peticiones de otros clientes se envían al propietario; las escrituras se serializan allí. La transferencia de propiedad se hace solo mediante el protocolo cooperativo probado, nunca abriendo el mismo SAH pool de forma independiente desde cada pestaña.

Esto **no es concurrencia transparente del VFS**: es coordinación exclusiva en la capa de aplicación. SQLite documenta que SAH pool preasigna y bloquea los SyncAccessHandles y recomienda OPFS/OPFS-WL cuando se necesita concurrencia multi-pestaña nativa. La solución propuesta elige SAH pool por rendimiento y por el actor único ya probado, aceptando la serialización y el trabajo de coordinación.

La arquitectura de almacenamiento queda lista para aprobación del propietario; esta recomendación no sustituye su aprobación expresa ni aprueba automáticamente framework, diseño web, hosting, cifrado, exportación/restauración ni actualización de la PWA.

Fuentes oficiales:
- https://sqlite.org/wasm/doc/tip/persistence.md
- https://sqlite.org/wasm/doc/trunk/api-oo1.md
