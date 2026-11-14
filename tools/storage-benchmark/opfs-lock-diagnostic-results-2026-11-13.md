# Resultado comparativo: OPFS-WL y OPFS clásico

**Fecha de las ejecuciones:** 13 de noviembre de 2026, hora de Panamá (UTC-5).  
**Entorno:** Brave en Android; el User-Agent reportó Android 10 y Chrome Mobile 157.  
**SQLite:** núcleo 3.54.1; paquete `@sqlite.org/sqlite-wasm` 3.54.1-build1.  
**Conexiones:** dos Dedicated Workers independientes, cada uno con su propia conexión SQLite al mismo archivo de la ejecución.  
**Cabeceras:** COOP `same-origin`, COEP `require-corp`; `crossOriginIsolated=true`.  
**Configuración común observada:** `journal_mode=delete`, `locking_mode=normal`, `synchronous=2`, `page_size=8192`.

Esta sonda usa archivos sintéticos con un directorio OPFS único por RUN_ID. No accede a datos personales ni modifica bases de Prisma. Los dos directorios descritos aquí se conservaron; no se intentó limpiarlos, repararlos ni reutilizarlos.

## Resumen

| VFS | RUN_ID | Resultado |
|---|---|---|
| `opfs-wl` | `prisma-opfs-lock-diag-482fb3aa-5879-40e2-873d-044161ba69c7` | No aprobado: discrepancia de una fila después de autocommit concurrente |
| `opfs` | `prisma-opfs-lock-diag-b23f86e8-d6f0-4c14-bd66-13df45cb4bee` | Todas las fases completadas; 57 filas verificadas después de reabrir ambas conexiones |

**Conclusión de esta comparación:** OPFS clásico es el candidato principal para la siguiente ronda de validación. OPFS-WL queda sin aprobación. Una sola ejecución no demuestra que OPFS clásico sea seguro bajo toda carga ni que OPFS-WL falle siempre.

## Ejecución OPFS-WL: discrepancia al escribir concurrentemente

**Inicio:** 13-11-2026, 19:43:36.  
**RUN_ID:** `prisma-opfs-lock-diag-482fb3aa-5879-40e2-873d-044161ba69c7`.  
**Archivo:** `file:prisma-opfs-lock-diag-482fb3aa-5879-40e2-873d-044161ba69c7/probe.sqlite3?opfs-unlock-asap=0`.

### Fases completadas

- Los dos Dedicated Workers abrieron conexiones independientes al mismo archivo.
- Ambos comprobaron la fila inicial.
- Escritura secuencial A: total 2; `quick_check` e `integrity_check` correctos desde A y B.
- Escritura secuencial B: total 3, distribución A=2 y B=1; ambas comprobaciones de integridad correctas desde A y B.

### Fallo observado

En la fase `CONC-AUTOCOMMIT`, A y B solicitaron una inserción simultáneamente. Ambos Workers reportaron `write-done` y `rowsInserted=1`; ninguno registró reintentos `SQLITE_BUSY`.

Sin embargo, la primera verificación posterior, ejecutada desde A, encontró:

- Total: **4**, cuando se esperaban 5.
- A: **3**, como se esperaba.
- B: **1**, cuando se esperaban 2.
- `quick_check=["ok"]` e `integrity_check=["ok"]` en esa instantánea.

La sonda se detuvo al detectar la discrepancia. No llegó a consultar B en esa fase ni a ejecutar las transacciones `BEGIN IMMEDIATE`, las inserciones de 25 filas o el cierre/reapertura. Por ello, este resultado acredita una discrepancia de datos observada después de dos escrituras que los Workers reportaron como confirmadas; **no acredita corrupción estructural**. Tampoco identifica por sí solo la causa.

El monitor de Web Locks registró solicitudes compartidas/exclusivas, estados pendientes y transiciones entre los dos clientes. Es evidencia del comportamiento de bloqueo observado durante esta ejecución, no una prueba concluyente de causalidad.

**Estado:** no aprobado. No borrar, reparar ni reutilizar este RUN_ID.

## Ejecución OPFS clásico: ciclo completo correcto

**Inicio:** 13-11-2026, 19:48:42.  
**RUN_ID:** `prisma-opfs-lock-diag-b23f86e8-d6f0-4c14-bd66-13df45cb4bee`.  
**Archivo:** `file:prisma-opfs-lock-diag-b23f86e8-d6f0-4c14-bd66-13df45cb4bee/probe.sqlite3?opfs-unlock-asap=0`.

### Resultados por fase

| Fase | Total | A | B | Resultado |
|---|---:|---:|---:|---|
| Preparación | 1 | 1 | 0 | Correcta |
| Escritura secuencial A | 2 | 2 | 0 | Correcta |
| Escritura secuencial B | 3 | 2 | 1 | Correcta |
| Autocommit concurrente | 5 | 3 | 2 | Correcta |
| `BEGIN IMMEDIATE`, una fila por Worker | 7 | 4 | 3 | Correcta |
| `BEGIN IMMEDIATE`, 25 filas por Worker | 57 | 29 | 28 | Correcta |
| Tras cerrar y reabrir A y B | 57 | 29 | 28 | Correcta |

En cada etapa, ambas conexiones confirmaron los mismos conteos. `quick_check` e `integrity_check` devolvieron exclusivamente `ok`, incluso después de cerrar y reabrir las dos conexiones.

No se registraron reintentos `SQLITE_BUSY`. Las escrituras concurrentes se completaron con ambos Workers activos. La última verificación se realizó desde A y B después de reabrir sus conexiones.

**Resultado de la sonda:** `TODAS LAS FASES COMPLETADAS`; 57 filas, A=29 y B=28; sin errores detectados.

**Estado:** aprobado para este escenario controlado. No es todavía una aprobación de arquitectura para Prisma. No borrar ni reutilizar este RUN_ID.

## Comparación e interpretación

1. El VFS clásico `opfs` completó autocommit concurrente, transacciones `BEGIN IMMEDIATE` concurrentes con una fila y con 25 filas por Worker, integridad y reapertura.
2. El VFS `opfs-wl` mostró una discrepancia de una fila en la primera fase de autocommit concurrente, a pesar de que ambos Workers reportaron una inserción y no se registraron reintentos BUSY.
3. Que `integrity_check` devuelva `ok` no demuestra que se hayan conservado todas las filas esperadas: la ejecución OPFS-WL ilustra precisamente esa diferencia entre integridad estructural y consistencia del resultado esperado.
4. La causa del resultado OPFS-WL no está establecida. Debe quedar descrita como fallo observado, no como diagnóstico definitivo de Web Locks, SQLite o del navegador.

## Alcance y validaciones pendientes

Las ejecuciones son una comparación funcional pequeña en un dispositivo/navegador y no sustituyen:

- repetición de OPFS clásico con RUN_ID independientes;
- persistencia tras recargar la página y volver a abrir el mismo archivo;
- recuperación después de cerrar/reiniciar Brave o de terminar abruptamente un Worker;
- pruebas con varias pestañas, migraciones, cuota/almacenamiento bajo y cierre inesperado durante una transacción;
- comparación final con SharedWorker + OPFS SAH pool, cuya estrategia de coordinación es distinta.

No se debe iniciar la implementación de Prisma suponiendo que estas dos ejecuciones ya seleccionaron por completo la arquitectura. Por ahora, la decisión técnica es **continuar la validación con OPFS clásico como candidato principal**, mantener OPFS-WL sin aprobación y conservar SharedWorker + SAH pool como alternativa que debe compararse con los mismos criterios de persistencia y recuperación.
