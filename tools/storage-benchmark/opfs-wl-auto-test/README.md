# Prisma · OPFS-WL AutoTest V1

Sonda independiente para evaluar **dos conexiones SQLite reales e independientes**, abiertas desde dos Dedicated Workers, sobre un mismo archivo OPFS mediante el VFS oficial `opfs-wl`. No utiliza SharedWorker ni el propietario único de SAH pool.

## Estado

**Herramienta experimental; aceptación en Brave pendiente.** La documentación oficial indica que OPFS-WL existe desde SQLite 3.53.0, usa Web Locks y requiere `Atomics.waitAsync()`. Su API OO1 es `sqlite3.oo1.OpfsWlDb`. La versión fijada del proyecto, `@sqlite.org/sqlite-wasm 3.54.1-build1`, es posterior a esa incorporación.

Fuentes oficiales:
- SQLite WASM — persistencia OPFS y OPFS-WL: https://sqlite.org/wasm/doc/trunk/persistence.md
- SQLite WASM — API OO1 / OpfsWlDb: https://sqlite.org/wasm/doc/trunk/api-oo1.md
- SQLite WASM — `sqlite3_js_retry_busy()`: https://sqlite.org/wasm/doc/trunk/api-c-style.md
- MDN — Web Locks API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API
- MDN — COEP: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy

## Por qué usa un servidor separado

OPFS-WL necesita aislamiento de origen. Para activar `SharedArrayBuffer`, el servidor entrega:
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp` o `credentialless`

La sonda usa el puerto **18768**. El servidor activo de SAH pool y Concurrency AutoTest en el puerto **18767** no se modifica, detiene ni reinicia.

## Instalación

El instalador independiente se descarga desde un commit inmutable y verifica cada archivo antes de escribir. Si encuentra un archivo local diferente, cancela sin sobrescribirlo. Requiere que ya exista `$HOME/prisma-storage-benchmark` y el paquete SQLite WASM instalado allí.

Después de instalar, inicia únicamente el nuevo servidor:

```sh
cd "$HOME/prisma-storage-benchmark"
python serve-opfs-wl.py
```

Mantén esa sesión de Termux abierta. No detengas el servidor que utiliza el puerto 18767.

En Brave abre primero la variante `require-corp`:

`http://127.0.0.1:18768/opfs-wl-auto-test/`

La variante alternativa es:

`http://127.0.0.1:18768/opfs-wl-auto-test/?coep=credentialless`

## Qué comprueba

1. Verifica las cabeceras COOP/COEP y las APIs `crossOriginIsolated`, `SharedArrayBuffer`, `Atomics.waitAsync`, Web Locks, Dedicated Worker y OPFS, tanto en la ventana como en los Workers.
2. Prueba un póster público de ejemplo desde `image.tmdb.org` en modo de imagen normal (no-CORS) y con `crossorigin="anonymous"` (CORS). Solo solicita una imagen estática; no llama a la API de TMDB ni envía datos personales de Prisma.
3. Crea un RUN_ID aleatorio y un directorio OPFS exclusivo. El cliente A crea la base e inserta cinco filas de referencia sintéticas.
4. El cliente B abre **el mismo archivo** desde otro Dedicated Worker y otra instancia `OpfsWlDb`; debe ver las mismas cinco filas.
5. Los dos Workers envían 12 transacciones cada uno. Cada transacción inserta 25 filas. La prueba registra latencias y reintentos de `SQLITE_BUSY`.
6. Las dos conexiones verifican los recuentos: A=305, B=300 y total=605.
7. Las dos conexiones cierran y vuelven a abrir SQLite de forma independiente; ambas deben recuperar los mismos 605 registros.
8. Solo después de superar todas las comprobaciones y cerrar ambas conexiones, la página elimina el directorio exclusivo de ese RUN_ID.

El éxito esperado es 24/24 transacciones confirmadas, 605 filas verificadas por ambos Workers, 605 después de la reapertura y limpieza del directorio exclusivo.

## Aislamiento de datos

Cada ejecución usa:
- RUN_ID: `prisma-opfs-wl-auto-<UUID>`
- Archivo: `/<RUN_ID>/shared.sqlite3`
- VFS: `opfs-wl`
- Dos Dedicated Workers independientes.
- Dos instancias independientes de `sqlite3.oo1.OpfsWlDb`.

El puerto 18768 tiene un origen distinto del puerto 18767. La carpeta de la sonda es exclusiva por ejecución. No utiliza ni borra las bases de SAH pool, Recovery AutoTest, V4 o V8, ni ningún dato de Prisma.

**Si hay un error, la herramienta conserva la carpeta OPFS y el informe.** No pulses ninguna limpieza del sitio ni borres datos de Brave. Si la pantalla indica que la prueba lleva más de 120 segundos, puedes pulsar «DETENER Y CONSERVAR DATOS»: termina los Workers y preserva la carpeta para diagnóstico.

## COEP y pósteres de TMDB

`require-corp` bloquea recursos cross-origin solicitados en modo no-CORS si el servidor remoto no autoriza su inclusión mediante CORP. El modo `credentialless` permite algunos recursos no-CORS sin permiso CORP, pero omite las credenciales de la solicitud. En modo CORS sigue siendo necesario que el recurso remoto permita CORS.

Por eso la sonda compara una imagen normal y otra con CORS, y ofrece la variante `credentialless`. Un fallo de imagen significa «bloqueada por la política o no disponible»; no se atribuye automáticamente a COEP sin comparar la otra variante.

Fuente: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy

TMDB documenta cómo construir URLs de imágenes desde `image.tmdb.org`; el póster usado por esta prueba es el ejemplo público de su guía. Esta comprobación no garantiza todavía que todos los pósteres o recursos externos futuros funcionen bajo el origen definitivo.

Fuentes:
- https://developer.themoviedb.org/docs/image-basics
- https://developer.themoviedb.org/docs/faq

## Interpretación y límites

La prueba evalúa una carga controlada de 12 transacciones por Worker, no una garantía de equidad matemática ni una prueba de estrés prolongada. El orden observado de confirmación y los reintentos se registran como evidencia de esta ejecución, no como garantía universal de FIFO para cualquier carga o navegador.

El medidor de memoria solo utiliza las APIs que exponga el navegador. Si devuelve bytes, es una estimación del navegador y no una lectura completa de la RAM física del Galaxy A03. Si la API no está disponible, el informe lo indica.

Una aprobación aquí no selecciona el almacenamiento definitivo de Prisma. Aún quedarían por evaluar rendimiento sostenido, memoria, contención prolongada, recuperación ante terminación o suspensión real de Android, migraciones, cifrado, claves, exportación/restauración y el origen HTTPS definitivo. La prueba no implementa la aplicación principal.


## Primera ejecución observada y revisión diagnóstica 2 (13-11-2026)

La primera ejecución en Brave terminó **NO APROBADA** durante la inicialización del primer Worker, antes de la carga de escritura:

- RUN_ID: `prisma-opfs-wl-auto-6cc9edd7-5e0b-4621-a44b-aaa61c1dd2a3`
- COOP: `same-origin`; COEP: `require-corp`; `crossOriginIsolated = true`.
- `SharedArrayBuffer`, `Atomics.waitAsync`, Web Locks y OPFS: disponibles.
- Error comunicado: `SQLite no devolvió una conexión válida.`
- No se recibieron confirmaciones de las cinco filas iniciales, de transacciones ni de reapertura.
- La página dejó la carpeta OPFS exclusiva de esa ejecución sin limpiar, tal como estaba previsto. **Conservarla para diagnóstico; no borrarla ni reutilizar su RUN_ID.**

Diagnóstico de recursos externos bajo `require-corp`:
- El póster de ejemplo no cargó en modo no-CORS.
- El mismo recurso sí cargó con CORS: 500 × 750.
- Esto demuestra que al menos ese recurso puede cargarse con CORS bajo la política probada; no demuestra compatibilidad de todas las imágenes o dominios externos.

### Corrección de la herramienta, todavía no aceptada

La revisión del código encontró una diferencia respecto a la prueba oficial de concurrencia de SQLite: V1 envolvía el constructor de la conexión en `sqlite3_js_retry_busy()`. La prueba oficial maneja los errores `SQLITE_BUSY` del constructor con un ciclo de apertura separado y utiliza `sqlite3_js_retry_busy()` para transacciones. La revisión 2 adapta ese flujo y usa la forma de nombre `file:<RUN_ID>/shared.sqlite3` que aparece en el ejemplo oficial.

La revisión 2 también amplía el informe con:
- tipo y mensaje original del error;
- código SQLite y su nombre simbólico cuando esté disponible;
- versión del núcleo SQLite;
- lista de VFS registrados y presencia de `opfs-wl`;
- estado de apertura y tipo del puntero de la conexión;
- número de intentos de apertura y reintentos BUSY;
- traza del error, limitada a 8.000 caracteres.

**Esta corrección es una hipótesis de solución del defecto de la sonda, no una prueba de que la apertura ya funciona.** La compatibilidad de OPFS-WL en Brave sigue pendiente hasta completar una nueva ejecución real.

Para actualizar los dos archivos de la herramienta sin sobrescribir modificaciones locales, ejecuta en Termux:

```sh
python -c "from urllib.request import urlopen; u='https://raw.githubusercontent.com/ElFast-dev/Prisma-Web/a75cac6b1341b5fda43a45e239af949dc724d1e4/tools/storage-benchmark/install-opfs-wl-auto-test-revision-2.py'; exec(compile(urlopen(u, timeout=30).read(), u, 'exec'))"
```

El instalador acepta únicamente los SHA exactos de V1 o de la revisión 2; si encuentra otro contenido, cancela sin sobrescribirlo. No instala ni cambia SQLite WASM, no toca la carpeta OPFS de la ejecución fallida y no reinicia el servidor del puerto 18768. El puerto 18767 tampoco se modifica.

Con el servidor del puerto 18768 todavía activo, recarga una vez:

`http://127.0.0.1:18768/opfs-wl-auto-test/`

Ejecuta una sola vez y comparte el informe completo. Si falla, conserva el nuevo RUN_ID y su carpeta. No pulses «Borrar datos del sitio» ni limpies manualmente OPFS.

Fuente oficial de comparación:
- Prueba de concurrencia SQLite con `OpfsWlDb` y reintento específico de apertura: https://wasm-testing.sqlite.org/tests/opfs/concurrency/worker.js
- OO1 `OpfsWlDb` y constructor: https://sqlite.org/wasm/doc/trunk/api-oo1.md
- `sqlite3_js_retry_busy()`: https://sqlite.org/wasm/doc/trunk/api-c-style.md


## Segunda ejecución observada y revisión de inicialización 3 (13-11-2026)

La revisión 2 corrigió la apertura del constructor: en esta ejecución, el Worker A abrió una conexión SQLite real y válida. La prueba todavía terminó **NO APROBADA**, esta vez al verificar la tabla de escritura:

- RUN_ID: `prisma-opfs-wl-auto-7639517d-9ebf-4c96-be3b-eb83142243af`
- COOP: `same-origin`; COEP: `require-corp`; `crossOriginIsolated = true`.
- `SharedArrayBuffer`, `Atomics.waitAsync`, Web Locks y OPFS: disponibles.
- SQLite informó versión del núcleo `3.54.1`; constructor `OpfsWlDb` disponible y VFS `opfs-wl` registrado.
- La conexión del Worker A tenía `dbIsOpen = true` y un puntero SQLite de tipo number.
- Error: `SQLITE_ERROR: no such table: writes`, durante `readCounts()` en la inicialización.
- No hay confirmación de cinco filas iniciales, escrituras concurrentes, recuentos finales, reapertura ni limpieza.

El flujo de la página espera a que A envíe `ready` antes de crear e inicializar B. Por ello, esta traza no respalda atribuir el error a una carrera de inicialización entre ambos Workers. Tampoco demuestra un defecto de OPFS-WL o de Brave: el problema sigue localizado en la preparación/escritura inicial del esquema de esta sonda.

**Conservar la carpeta OPFS y el informe de este RUN_ID. No borrarlos ni reutilizarlos.**

### Revisión 3 preparada; aceptación aún pendiente

La revisión 3 modifica únicamente el Worker de la sonda:

1. Crea la tabla y el índice en modo autocommit, separados de la transacción de inserción de filas de referencia.
2. Consulta `sqlite_schema` y confirma que `writes` existe antes de intentar leer o insertar filas.
3. Comprueba que la siembra deja exactamente cinco filas.
4. Si ocurre otro error, el diagnóstico añade el listado de tablas visibles y cualquier error al consultar el esquema.

La revisión 3 **no es una aceptación ni prueba que el problema esté resuelto**. Es una corrección experimental que permite separar con mayor claridad el DDL, la transacción de siembra y la verificación del esquema.

Para instalarla en Termux, ejecuta:

```sh
python -c "from urllib.request import urlopen; u='https://raw.githubusercontent.com/ElFast-dev/Prisma-Web/8f3ef0b343680acf86713056117e7420f87cd28b/tools/storage-benchmark/install-opfs-wl-auto-test-revision-3.py'; exec(compile(urlopen(u, timeout=30).read(), u, 'exec'))"
```

El instalador modifica únicamente `opfs-wl-auto-test/src/opfs-wl-db-worker.js`. Comprueba el SHA exacto del servidor y del archivo descargado, y cancela si detecta cambios locales no reconocidos. No cambia SQLite WASM, el HTML, las dependencias, ningún servidor ni los archivos OPFS anteriores.

Con el servidor 18768 todavía activo, recarga una vez:

`http://127.0.0.1:18768/opfs-wl-auto-test/`

Ejecuta una sola vez con `require-corp` y comparte el informe completo. No cambies a `credentialless` por el fallo de la imagen no-CORS: en ambas ejecuciones el mismo póster sí cargó con CORS. No reinicies el servidor ni borres datos del sitio. Los puertos 18767 y la aplicación Prisma permanecen fuera de esta sonda.


## Tercera ejecución observada y revisión diagnóstica 4 (13-11-2026)

La revisión 3 confirmó que la tabla seguía ausente después de la rutina de creación del esquema. La prueba terminó **NO APROBADA** durante la inicialización:

- RUN_ID: `prisma-opfs-wl-auto-9dc4693d-7d38-4fd7-812a-8552f069fb3f`
- COOP `same-origin`, COEP `require-corp`, `crossOriginIsolated = true`.
- SharedArrayBuffer, Atomics.waitAsync, Web Locks y OPFS: disponibles.
- SQLite núcleo `3.54.1`, constructor `OpfsWlDb` disponible y VFS `opfs-wl` registrado.
- La conexión A permanecía abierta y con un puntero SQLite válido.
- La consulta de diagnóstico devolvió `schemaTables: []`; no se pudo confirmar la tabla `writes`.
- No se confirmaron filas de referencia, transacciones, 605 filas, reapertura ni limpieza.
- El póster de TMDB falló no-CORS y cargó con CORS a 500 × 750, igual que en las pruebas anteriores.

El resultado no demuestra incompatibilidad del navegador ni del VFS. Confirma que la rutina de preparación no dejó visible la tabla. Se debe conservar el informe y el directorio OPFS exclusivo del RUN_ID, sin borrarlo ni reutilizarlo.

### Revisión 4: ejecución DDL directa y diagnóstico de la identidad de la base

La revisión 4 modifica únicamente el Worker:

1. Ejecuta un único bloque SQL como cadena, directamente sobre la conexión abierta, sin envolver la creación del esquema en el helper de reintento.
2. Captura las sentencias SQL que el método `db.exec()` prepara mediante `saveSql`.
3. Registra antes y después `PRAGMA schema_version`, nombre de archivo de la conexión, VFS efectivo, indicador de solo lectura y `PRAGMA database_list`.
4. Si la tabla sigue ausente, agrega `page_count`, cambios totales y puntero SQLite al diagnóstico.

La API oficial OO1 documenta que `OpfsWlDb` ofrece la funcionalidad de `OpfsDb` y que `DB.exec()` ejecuta sentencias SQL; la extensión `saveSql` permite registrar las sentencias procesadas. Esta revisión busca distinguir entre un problema al despachar el DDL, una conexión de solo lectura o una identidad/VFS inesperada. No presupone cuál de esas causas explica el resultado.

**La revisión 4 es instrumental y experimental; no es una aceptación ni una prueba de que la creación de tabla ya funcione.**

Instalador seguro: `install-opfs-wl-auto-test-revision-4.py`, fijado al commit `3fe38b4853a0c314810c7e979912714dfc7e6ee0`. Comando para Termux:

```sh
python -c "from urllib.request import urlopen; u='https://raw.githubusercontent.com/ElFast-dev/Prisma-Web/3fe38b4853a0c314810c7e979912714dfc7e6ee0/tools/storage-benchmark/install-opfs-wl-auto-test-revision-4.py'; exec(compile(urlopen(u, timeout=30).read(), u, 'exec'))"
```

Este instalador modifica exclusivamente `opfs-wl-auto-test/src/opfs-wl-db-worker.js`, comprueba el hash del servidor y del archivo destino, y reconoce las versiones instaladas anteriores de ese Worker. No cambia SQLite WASM, dependencias, HTML, servidor ni datos OPFS.

Con el servidor 18768 activo, recarga una vez `http://127.0.0.1:18768/opfs-wl-auto-test/` y ejecuta una sola vez con `require-corp`. Comparte el informe completo, sobre todo `schemaBefore`, `schemaAfter`, `preparedSchemaSql`, `schemaTables` y `databaseList`. No reinicies el servidor ni borres los directorios OPFS de las ejecuciones anteriores.


## Cuarta ejecución observada y revisión diagnóstica 5 (13-11-2026)

La revisión 4 consiguió que el esquema quedara visible y la tabla `writes` existiera. La prueba terminó **NO APROBADA** en la comprobación de la siembra:

- RUN_ID: `prisma-opfs-wl-auto-3f8f81ea-5c11-4f93-b078-8ae9123068a9`
- COOP `same-origin`, COEP `require-corp`, `crossOriginIsolated = true`.
- SharedArrayBuffer, Atomics.waitAsync, Web Locks y OPFS: disponibles.
- SQLite núcleo `3.54.1`, `OpfsWlDb` y VFS `opfs-wl` disponibles.
- La conexión permanecía abierta y `sqlite_schema` ya contenía `writes`.
- El recuento reportado fue `total=0, A=0, B=0`; no se confirmaron cinco filas para el RUN_ID.
- No se inició la carga concurrente, no se verificaron 605 filas, no hubo prueba de cierre/reapertura ni limpieza.
- El póster de TMDB siguió fallando en no-CORS y cargando con CORS a 500 × 750.

**Matiz de interpretación:** el campo `total` de `readCounts()` filtra por el RUN_ID actual; no es un recuento global de la tabla. Por tanto, ese valor cero no demuestra por sí solo que no haya filas en `writes`: las filas podrían tener otro `run_id`. La sonda anterior no reportaba el total global ni la distribución de filas, por lo que el informe no permite distinguir esas posibilidades.

Conservar el directorio OPFS y el informe de este RUN_ID; no borrar ni reutilizar ese identificador.

### Revisión 5: aislar inserción SQL y distinguir recuento global/RUN_ID

La revisión 5 cambia solo el Worker experimental:

1. Añade un recuento global de `writes` a `readCounts()`, conservando `total` como el recuento filtrado por RUN_ID.
2. Añade un diagnóstico de agrupación por `run_id` y `client_id`, más una muestra de filas con valores escapados.
3. Sustituye la inserción de cinco filas iniciales por un único `INSERT ... VALUES (...), (...)` ejecutado con `tx.exec()` dentro de la transacción `IMMEDIATE`.
4. Exige que SQLite informe exactamente cinco cambios antes del commit y verifica tanto el total global como el total del RUN_ID después del commit.
5. Usa la misma ruta SQL multirregistro para las 24 tandas posteriores y exige 25 cambios por tanda. Así se evita mezclar la prueba de persistencia con el camino de sentencias preparadas que se había usado hasta ahora.

La documentación oficial confirma que `DB.exec()` admite una o varias sentencias SQL y que `transaction()` confirma al retornar o revierte si el callback arroja una excepción. La API de sentencias preparadas y `stepReset()` también está documentada; la revisión cambia la ruta de inserción para aislarla, no porque esos métodos estén declarados incompatibles. Fuentes: https://sqlite.org/wasm/doc/trunk/api-oo1.md y https://sqlite.org/wasm/doc/trunk/api-c-style.md.

**La revisión 5 es un experimento de diagnóstico y no una aprobación.** Aún no se ha ejecutado en Brave.

Instalador seguro: `install-opfs-wl-auto-test-revision-5.py`, fijado al commit `b4f3c9d62eb147cfd1d9e2f60428e7d7819d0e0d`. En Termux:

```sh
python -c "from urllib.request import urlopen; u='https://raw.githubusercontent.com/ElFast-dev/Prisma-Web/b4f3c9d62eb147cfd1d9e2f60428e7d7819d0e0d/tools/storage-benchmark/install-opfs-wl-auto-test-revision-5.py'; exec(compile(urlopen(u, timeout=30).read(), u, 'exec'))"
```

El instalador modifica únicamente `opfs-wl-auto-test/src/opfs-wl-db-worker.js`; verifica el SHA del servidor y del Worker, y acepta las versiones previas conocidas de ese archivo. No cambia SQLite WASM, dependencias, HTML, servidores, puerto 18767, aplicación Prisma ni directorios OPFS de pruebas anteriores.

Mantén activo el servidor del puerto 18768, recarga una vez `http://127.0.0.1:18768/opfs-wl-auto-test/` y ejecuta una sola prueba con `require-corp`. Si vuelve a fallar, comparte todo el informe, especialmente `tableTotal`, `changesInsideTransaction`, `executedSeedSql`, `groups` y `sample`. No reinicies servidores ni borres carpetas OPFS.


## Quinta ejecución observada y revisión 6 (13-11-2026)

La ejecución con revisión 5 terminó **NO APROBADA** al consultar `writes`:

- RUN_ID: `prisma-opfs-wl-auto-66eee9ef-9c94-4c01-bc24-97a78ab19613`
- Requisitos COOP/COEP, `crossOriginIsolated`, SharedArrayBuffer, Atomics.waitAsync, Web Locks y OPFS: disponibles.
- SQLite `3.54.1`, constructor `OpfsWlDb`, VFS `opfs-wl`, conexión abierta y puntero válido: confirmados.
- Error `SQLITE_ERROR: no such table: writes` en `readCounts()`, llamado desde `seedDatabase()`.
- No se confirmaron cinco filas, escrituras concurrentes, 605 filas, reapertura ni limpieza.
- El póster TMDB no cargó no-CORS y cargó con CORS a 500 × 750; se conserva `require-corp`.

### Causa identificada: regresión en el código de revisión 5

La inspección del Worker publicado encontró que, al sustituir el método de inserción en la revisión 5, el bloque que ejecutaba `CREATE TABLE IF NOT EXISTS writes` y creaba el índice quedó eliminado accidentalmente de `seedDatabase()`. El Worker intentaba insertar y después consultar una tabla que nunca había creado. Esto explica el `no such table: writes` de esta ejecución; no apunta a un fallo de Brave ni del VFS OPFS-WL.

La revisión 4 sí contenía el bloque DDL y había conseguido que la tabla apareciera en `sqlite_schema`. La revisión 6 restaura ese bloque antes de la siembra, conserva las inserciones SQL multirregistro de la revisión 5 y mantiene las comprobaciones de cambios y conteos.

**La omisión fue un defecto introducido al preparar la revisión 5.** El informe de la quinta ejecución es válido como resultado de la sonda publicada, pero no permite juzgar la capacidad de inserción de OPFS-WL porque faltaba el esquema.

### Revisión 6 preparada; aceptación pendiente

El Worker de revisión 6:
1. Ejecuta `CREATE TABLE IF NOT EXISTS writes` y el índice antes de insertar.
2. Comprueba que `writes` aparece en `sqlite_schema`.
3. Inserta las cinco filas de referencia en una transacción `IMMEDIATE` usando un `INSERT` multirregistro.
4. Exige que SQLite reporte cinco cambios y verifica tanto el conteo global como el del RUN_ID.
5. Conserva la misma ruta multirregistro para cada lote de 25 filas.

El instalador modifica únicamente `opfs-wl-auto-test/src/opfs-wl-db-worker.js`. Está fijado al commit `cf09dbe573949376d223704e421f904e9d5370dd` y reconoce los SHA de las revisiones previas conocidas del Worker. No cambia SQLite WASM, dependencias, HTML, servidores, puerto 18767, aplicación Prisma ni directorios OPFS existentes.

Comando en Termux:

```sh
python -c "from urllib.request import urlopen; u='https://raw.githubusercontent.com/ElFast-dev/Prisma-Web/cf09dbe573949376d223704e421f904e9d5370dd/tools/storage-benchmark/install-opfs-wl-auto-test-revision-6.py'; exec(compile(urlopen(u, timeout=30).read(), u, 'exec'))"
```

Con el servidor 18768 activo, recarga una vez `http://127.0.0.1:18768/opfs-wl-auto-test/` y ejecuta una sola prueba con `require-corp`. Comparte todo el informe, en especial `changesInsideTransaction`, `executedSeedSql`, `tableTotal`, `groups` y `sample`. No reinicies servidores ni borres las carpetas OPFS de ejecuciones anteriores.

**Estado vigente:** se demostró apertura de la conexión y se ha aislado el error de la revisión 5 como omisión DDL. La revisión 6 aún no se ha ejecutado. OPFS-WL permanece sin aceptación hasta completar dos conexiones, 24/24 transacciones, 605 filas verificadas, cierre/reapertura y limpieza limitada al RUN_ID.

## Sexta ejecución observada y revisión 7 (13-11-2026)

La ejecución con revisión 6 terminó **NO APROBADA** durante la siembra:

- RUN_ID: prisma-opfs-wl-auto-49ac6a3d-23cf-4fcb-8940-70fa16c318ff
- COOP same-origin, COEP require-corp, crossOriginIsolated true.
- SharedArrayBuffer, Atomics.waitAsync, Web Locks y OPFS: disponibles.
- SQLite 3.54.1, constructor OpfsWlDb, VFS opfs-wl, conexión abierta y tabla writes: confirmados.
- El informe devolvió changesInsideTransaction null, totalChangesInsideTransaction null y executedSeedSql vacío.
- El total global y el total por RUN_ID permanecieron en cero. No se iniciaron las 24 transacciones, no se verificaron 605 filas, reapertura ni limpieza.

### Causa localizada: retryBusy() pasaba -1 al helper

La revisión del Worker muestra que todas las inserciones se ejecutan dentro de retryBusy(), que a su vez llamaba a sqlite3_js_retry_busy(-1, callback, beforeRetryCallback).

El informe confirma que el callback no llegó a ejecutarse: los valores que solo se asignan dentro del callback quedaron null y executedSeedSql quedó vacío. La implementación publicada de sqlite3_js_retry_busy() recorre los intentos con for (let n = 1; n <= maxTimes; ++n); con maxTimes = -1, la condición inicial es falsa y el cuerpo —incluido el callback— se omite. La implementación consultada está aquí: https://chromium.googlesource.com/external/github.com/sqlite/sqlite/%2B/refs/heads/compile-commands%5E1..refs/heads/compile-commands/ (bloque sqlite3_js_retry_busy). El comentario de la misma implementación indica que se debe usar un límite positivo grande para repetir indefinidamente, lo que entra en contradicción con la nota negativa de alguna documentación generada.

Esta explicación concuerda con el informe; no es evidencia de un fallo de OPFS-WL, de Brave, de OpfsWlDb ni del SQL de inserción. En esta ejecución, el callback de transacción no se ejecutó porque el mecanismo de reintento no entró en su bucle.

### Revisión 7

La revisión 7 cambia retryBusy() para pasar un límite positivo y acotado de **120 intentos** al helper SQLite. Además, incrementa y reporta retryCallbackCalls, de modo que el siguiente resultado permitirá comprobar explícitamente que las operaciones sí entraron en el callback.

Conserva:
- DDL de revisión 6: creación de tabla e índice y verificación de sqlite_schema.
- Inserción de referencia y lotes de 25 filas mediante SQL multirregistro.
- Recuento global, por RUN_ID, agrupación y muestra de filas.
- Protección de los RUN_ID anteriores y limpieza limitada al RUN_ID nuevo solo si la prueba termina aprobada.

**La revisión 7 aún no se ha ejecutado en Brave y no aprueba OPFS-WL.**

Instalador seguro: install-opfs-wl-auto-test-revision-7.py, fijado al commit b73eeff671db54022fbfaed3da4e3b573189ad42. En Termux:

```sh
python -c "from urllib.request import urlopen; u='https://raw.githubusercontent.com/ElFast-dev/Prisma-Web/b73eeff671db54022fbfaed3da4e3b573189ad42/tools/storage-benchmark/install-opfs-wl-auto-test-revision-7.py'; exec(compile(urlopen(u, timeout=30).read(), u, 'exec'))"
```

El instalador cambia únicamente opfs-wl-auto-test/src/opfs-wl-db-worker.js, comprueba los SHA del servidor y del Worker, reconoce las revisiones previas conocidas y no toca dependencias, SQLite WASM, HTML, servidores ni directorios OPFS anteriores.

Con el servidor 18768 activo, recarga una vez http://127.0.0.1:18768/opfs-wl-auto-test/ y ejecuta una prueba con require-corp. Comparte el informe íntegro. El campo decisivo inicial será retryCallbackCalls: debe ser mayor que cero. Después interesa confirmar cinco filas de referencia, ambos Workers y el resto del ciclo completo. No reinicies el servidor ni borres datos del sitio o los RUN_ID anteriores.
