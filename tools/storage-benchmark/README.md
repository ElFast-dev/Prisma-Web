# Prisma Storage Benchmark

Comparación técnica independiente entre:

- Dexie **4.4.7** sobre IndexedDB, con `chromeTransactionDurability: "strict"`.
- SQLite WASM del paquete oficial `@sqlite.org/sqlite-wasm` **3.54.1-build1**, usando OPFS SAH pool dentro de un Worker.

No es la aplicación Prisma ni el esquema final de su base de datos. Utiliza únicamente datos sintéticos y elimina sus propias bases después de cada ronda.

## Por qué esta comparación

La primera sonda del Galaxy A03 confirmó IndexedDB, OPFS y `SyncAccessHandle` en Worker. Ahora hay que medir dos capas reales con la misma carga. El paquete de SQLite WASM disponible para instalar es 3.54.1-build1; no debe confundirse con la versión del núcleo SQLite que pueda aparecer en otra publicación o documentación.

La variante SAH pool se ha elegido para la comparación por su rendimiento de lotes y porque no requiere COOP/COEP. Tiene una limitación importante: no permite varias conexiones concurrentes normales a una misma base. Por tanto, aunque gane en velocidad, todavía habrá que valorar el uso de varias pestañas y la alternativa `opfs-wl`.

## Descargar archivos en Termux

Copia y ejecuta este bloque:

```sh
mkdir -p "$HOME/prisma-storage-benchmark/src"
python - <<'PY'
from pathlib import Path
from urllib.request import urlopen

base = "https://raw.githubusercontent.com/ElFast-dev/Prisma-Web/main/tools/storage-benchmark/"
target = Path.home() / "prisma-storage-benchmark"
files = (
    "package.json",
    "index.html",
    "serve.py",
    "src/main.js",
    "src/sqlite-worker.js",
)
for name in files:
    data = urlopen(base + name, timeout=30).read()
    dest = target / name
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
    print(f"Descargado: {name} ({len(data)} bytes)")
PY
```

## Instalar dependencias fijadas

```sh
cd "$HOME/prisma-storage-benchmark"
npm install --no-audit --no-fund
```

No instala un framework de interfaz ni un servidor de desarrollo. Solo Dexie y el paquete SQLite WASM fijados en `package.json`.

## Ejecutar el servidor

```sh
python serve.py
```

Mantén Termux abierto y entra en Brave:

`http://127.0.0.1:18766/`

El servidor local configura los tipos MIME para módulos ES y WebAssembly. La prueba utiliza OPFS SAH pool y no establece COOP/COEP.

## Orden recomendado

1. Ejecuta primero **1.000 películas × 3 visionados**, con tres rondas por alternativa.
2. Descarga el informe JSON.
3. Si no hay bloqueos, errores o calentamiento excesivo, repite con **10.000 × 3**.
4. Comparte ambos informes en la conversación.

El benchmark alterna el orden Dexie/SQLite entre rondas para reducir el sesgo de ejecutar siempre el mismo motor primero. Compara apertura, generación de datos, inserción y commit, consultas indexadas, actualización de nota, rollback y cierre/reapertura. También verifica que los conteos coincidan.

## Seguridad y limpieza

- No importes películas, visionados ni copias personales.
- No pulses «Borrar datos del sitio» de Brave.
- Cada ronda elimina solo la base Dexie y el directorio OPFS con nombre propio del benchmark.
- Si una ronda se interrumpe, el panel «Limpiar restos de pruebas» elimina solo las bases con prefijo `prisma-dexie-benchmark-` y la carpeta OPFS `prisma-storage-benchmark-v1`.
- No cierres Brave ni Termux mientras la ronda está en curso.
- Si el navegador se ralentiza, detén la comparación y usa primero el dataset pequeño.
- Detén el servidor con Ctrl+C al terminar.

## Cómo interpretar el resultado

No elegir SQLite solo porque una inserción masiva resulte más rápida. El diario de Prisma necesita buen rendimiento también en interacciones pequeñas, reapertura, migraciones, recuperación y varias pestañas. La decisión debe ponderar asimismo el tamaño WASM, memoria, complejidad del Worker, concurrencia y exportación/restauración.

El informe es evidencia de prueba en el Galaxy A03 y Brave; no convierte automáticamente Dexie ni SQLite en decisiones aprobadas. La versión actual registra si `removeVfs()` confirmó la limpieza (`vfsRemoved`), si el directorio OPFS de prueba sigue existiendo (`opfsCleanup.exists`) y el delta de almacenamiento reportado (`storageDeltaBytes`) y las bases IndexedDB temporales restantes (`indexedDbCleanup.names`). La integridad de los datos y la limpieza se informan por separado. La limpieza completa queda verificada cuando el VFS confirma la eliminación, el directorio OPFS queda ausente y, si el navegador permite enumerarlas, no quedan bases IndexedDB con el prefijo del benchmark. Si `opfsCleanup.exists: true`, usa el botón de limpieza, no repitas el dataset grande y conserva el informe para revisar el residuo.

## Prueba funcional: SharedWorker + SQLite SAH pool

Esta prueba no vuelve a comparar rendimiento. Comprueba si dos pestañas del mismo origen comparten realmente un único SharedWorker que mantiene una sola conexión SQLite SAH pool.

Archivos adicionales:

- `coordination.html`
- `serve-coordination.py`
- `src/sahpool-shared-worker.js`

Descárgalos desde la rama `main` y conserva la carpeta `node_modules` instalada para el benchmark. No requiere dependencias adicionales.

Ejecuta desde `$HOME/prisma-storage-benchmark`:

```sh
python serve-coordination.py
```

Abre en Brave:

`http://127.0.0.1:18767/coordination.html`

Este servidor no configura COOP/COEP deliberadamente: SAH pool + SharedWorker no necesita aislamiento de origen y así comprobamos que la arquitectura candidata no impone restricciones adicionales a los recursos externos de Prisma. La prueba utiliza exclusivamente una base sintética con un directorio OPFS propio.

Procedimiento:

1. Abre exactamente la misma dirección en dos pestañas normales de Brave.
2. Cada página inicia automáticamente su conexión al cargar. Espera a que ambas indiquen su estado; el botón de conexión queda disponible como reintento manual si el registro automático falla.
3. Comprueba que las dos muestran el mismo ID del Worker y que el contador llega a 2 conexiones.
4. Pulsa una sola vez «Insertar 25 registros» en cada pestaña.
5. Comprueba que ambas reciben el mismo total de 50 registros.
6. Pulsa «Cerrar y reabrir SQLite» y verifica que siguen existiendo los 50 registros.
7. Cuando ambas pestañas hayan terminado, pulsa «Eliminar la base sintética» desde una sola pestaña y conserva el resultado de `removeVfs()`.
8. Detén el servidor con Ctrl+C.

Si los IDs de Worker son distintos, no se ha demostrado que Brave comparta el SharedWorker. Si hay errores de escritura, discrepancias de conteo o fallos de reapertura, conserva el registro y no repitas la prueba con datos personales.

Esta prueba valida el actor compartido y el acceso a SAH pool desde dos pestañas. No sustituye las pruebas posteriores de cierre abrupto del Worker, recuperación tras reiniciar Brave ni funcionamiento en el origen HTTPS definitivo.

### Sonda de recuperación ante fallos (aislada de V8)

La herramienta se sirve en `/recovery-probe/` y tiene su propio Dedicated Worker, SharedWorker, RUN_ID, VFS y archivo SQLite:

- OPFS: `/prisma-sahpool-recovery-probe-v1`
- Archivo SQLite: `/recovery-probe.sqlite3`
- Protocolo: `recovery-fault-probe-1`

No comparte ni elimina los datos de referencia de V8 (`/prisma-sahpool-sharedworker-probe-v5/sharedworker-probe.sqlite3`). Su failover exige que el nuevo propietario encuentre el archivo anterior y recupere al menos el último total confirmado si este era mayor que cero; así evita aceptar una base vacía como recuperación correcta.

La sonda incluye tres ensayos: terminación del Dedicated Worker en reposo sin notificar al coordinador; cierre del propietario con una transacción abierta antes de COMMIT; y cierre después de que COMMIT haya terminado pero antes de entregar el acuse. La revisión `recovery-fault-probe-2` añade heartbeat del coordinador (cada 5 s, timeout de 20 s), solicitud de terminación del Worker a su página propietaria y confirmación de retirada antes de promover la reserva. Si la página propietaria no responde, no se abre una segunda conexión SAH pool. El resultado del primer ensayo y sus límites están en `recovery-probe/README.md`. El tercer caso prueba pérdida de respuesta después de commit, **no** terminación dentro de la llamada COMMIT. La documentación paso a paso está en [recovery-probe/README.md](recovery-probe/README.md).

### Nota de arquitectura: SharedWorker y SyncAccessHandle

`FileSystemSyncAccessHandle` y `createSyncAccessHandle()` están disponibles únicamente dentro de Dedicated Workers, no dentro de SharedWorkers. Por eso SQLite SAH pool no debe inicializarse directamente en el SharedWorker.

La ejecución anterior en Brave Android terminó con `Worker is not defined` al intentar crear un Dedicated Worker desde el SharedWorker. Aunque la especificación HTML incluye la interfaz `Worker` en los contextos Window, DedicatedWorker y SharedWorker, la prueba debe registrar lo que expone el runtime real. La nueva interfaz muestra `typeof Worker` dentro del SharedWorker y evita depender de ese constructor:

- Cada pestaña crea un candidato `Dedicated Worker` desde su propio contexto de ventana.
- `src/sahpool-shared-worker.js`: SharedWorker coordinador; elige un único candidato como propietario y reenvía a él las operaciones de todas las pestañas.
- `src/sahpool-db-worker.js`: Dedicated Worker; solo inicializa SQLite WASM y OPFS SAH pool cuando el coordinador lo activa.
- Las demás pestañas mantienen su candidato inactivo, listo para ser promovido tras un cierre normal del propietario.
- `coordination.html`: permite verificar el ID común del SharedWorker, el ID del Dedicated Worker propietario, dos conexiones y las escrituras compartidas.

El Dedicated Worker comprueba explícitamente `FileSystemHandle`, `FileSystemDirectoryHandle`, `FileSystemFileHandle.prototype.createSyncAccessHandle` y `navigator.storage.getDirectory`, e incluye el resultado en la respuesta de conexión. Así, un fallo de OPFS indica qué API falta en ese contexto.

El directorio y el archivo SQLite son estables durante todas las recargas de esta prueba. El identificador del conjunto de datos también es estable; el ID del SharedWorker sí cambia cuando su última pestaña se cierra y se crea una nueva instancia. El panel cuenta todos los registros de la base exclusiva de prueba, incluso si fueron escritos antes de reiniciar el SharedWorker. No se activa `clearOnInit`; por tanto, una inicialización, una promoción del Worker o una recarga no deben borrar la base. La limpieza final elimina únicamente el VFS temporal de esta herramienta.

Esta separación respeta el modelo de permisos del navegador, pero todavía requiere validación real en Brave del Galaxy A03. La prueba de dos pestañas no valida por sí sola un cierre abrupto del proceso ni la recuperación tras reiniciar el navegador.


### Corrección de la prueba V5

La ejecución en Brave confirmó que todas las APIs OPFS requeridas estaban presentes, pero SQLite OO1 rechazó la llamada de conteo por un error de enlace SQL. `selectValue(SQL, bind, asType)` acepta un solo argumento de enlace; cuando la consulta tiene dos parámetros, deben pasarse juntos como un array. Se corrigió `clientRows()` para usar `[runId, clientId]` y `countRows()` para usar `[runId]`.

La coordinación también promueve automáticamente el siguiente Dedicated Worker candidato cuando falla la inicialización del propietario. Las pestañas en espera muestran ahora un estado explícito y un propietario fallido termina su Dedicated Worker para liberar recursos.

V5 utiliza un nombre nuevo de SharedWorker y el directorio OPFS `prisma-sahpool-sharedworker-probe-v5`, aislados de la ejecución fallida anterior. Cierra todas las pestañas de pruebas anteriores antes de actualizar los archivos y arrancar de nuevo.


### Corrección de persistencia tras recargar (V5)

La primera versión de la prueba generaba `RUN_ID` con `crypto.randomUUID()` dentro del SharedWorker y filtraba el conteo SQL por ese valor. Cuando el SharedWorker terminaba (por ejemplo, al cerrarse o recargarse su última pestaña), la instancia nueva generaba otro `RUN_ID`. Los registros anteriores seguían en OPFS, pero el filtro los ocultaba y la interfaz mostraba cero. No era un borrado de SQLite.

Se corrigió usando un identificador estable `prisma-sahpool-sharedworker-probe-v5` para el conjunto de datos y contando todos los registros de la base exclusiva de la prueba. Los IDs del SharedWorker y Dedicated Worker siguen siendo IDs de instancia y pueden cambiar al recargar; eso no significa que se haya reiniciado la base.

La persistencia del conjunto debe verificarse recargando la página y comprobando que el total continúa en 50. No pulses «Eliminar la base sintética» antes de esa comprobación.


### Persistencia visible tras recargar (corrección V5)

Se encontró un defecto en la sonda: el SharedWorker generaba un `RUN_ID` aleatorio al arrancar y el conteo total filtraba los registros por ese valor. Al terminar el SharedWorker y crearse otra instancia, se generaba otro ID y la interfaz parecía mostrar cero, aunque los registros seguían almacenados en OPFS.

La corrección fija el ID del conjunto de datos como `prisma-sahpool-sharedworker-probe-v5`, cuenta todas las filas de la base exclusiva de esta herramienta y conserva en el SharedWorker el último total conocido para informar a pestañas secundarias que se recarguen. El ID de instancia del SharedWorker puede cambiar y no identifica los datos persistentes.

La verificación esperada tras recargar la página es que el conjunto mantenga 50 registros y muestre el mismo ID estable del conjunto de prueba.


### Transferencia controlada de propiedad (V6)

La interfaz anterior mostraba «Esta pestaña» al seleccionarse un candidato, antes de que SQLite terminara de inicializarse. Ahora distingue «Preparando propiedad» de «Propietaria activa» y mantiene deshabilitadas las operaciones durante la transición.

Para una cesión normal se utiliza el botón «Ceder propiedad a otra pestaña». El Dedicated Worker propietario cierra primero su conexión SQLite y ejecuta `PoolUtil.pauseVfs()`, lo que libera los SyncAccessHandles sin eliminar el contenido de OPFS. Solo tras recibir la confirmación de pausa, el SharedWorker promueve la pestaña candidata. Su Dedicated Worker ejecuta `unpauseVfs()` si ya tenía un pool pausado, o inicializa el pool si es nuevo.

La propiedad solo se considera transferida cuando el nuevo Dedicated Worker confirma la apertura de SQLite. Los cierres abruptos del propietario siguen siendo un escenario distinto; no deben confundirse con la cesión controlada.


Procedimiento para probar el relevo controlado:

1. Conecta dos pestañas y espera a que una muestre `Propietaria activa` y la otra `Otra pestaña`.
2. En la pestaña propietaria pulsa `Ceder propiedad a otra pestaña`.
3. Espera a que la pestaña anterior indique que SQLite está activo en otra pestaña y que la nueva indique `Propietaria activa`.
4. En la nueva propietaria consulta el estado, que debe conservar el total anterior, y verifica que puedes insertar y reabrir SQLite.
5. Cierra la pestaña anterior (ya no propietaria) y confirma que la nueva sigue operativa.

La interfaz no debe mostrar `Esta pestaña · PROPIETARIA ACTIVA` hasta recibir la confirmación `activated` del Dedicated Worker. La selección inicial se muestra como `Preparando propiedad` y mantiene deshabilitadas las operaciones.

No se debe cerrar manualmente la pestaña propietaria antes de completar la cesión. `pagehide` es un evento de ciclo de vida y no permite esperar de forma fiable a una operación asíncrona de liberación de OPFS; el relevo normal se prueba con la cesión cooperativa explícita. Los cierres abruptos se evalúan en una prueba aparte.


La revisión de esta prueba controlada usa nombres nuevos de Worker con sufijo `v6`; el nombre del conjunto de datos y el directorio OPFS se mantienen en `v5` para conservar los registros sintéticos existentes. Esto separa el código del coordinador de la identidad de los datos.


### Diagnóstico y protección de datos en el relevo (V7)

La ejecución V6 mostró que un nuevo Dedicated Worker podía inicializar SQLite y devolver cero filas tras una cesión. Eso no se acepta como un relevo correcto, aunque el Worker muestre OPFS disponible.

V7 añade estas verificaciones antes de aceptar al nuevo propietario:

- El propietario saliente registra el total de filas y el inventario del SAH pool antes de pausar el VFS.
- El nuevo Worker instala el mismo VFS con `clearOnInit: false`, `preserveOnInitFailure: true`, el mismo nombre, directorio y archivo.
- Antes de abrir SQLite comprueba que el pool contiene el nombre virtual exacto del archivo anterior y obtiene su tamaño con `exportFile()`.
- Tras abrirlo, comprueba que la tabla existe y que el total de filas no sea inferior al confirmado por el propietario saliente.
- Si no encuentra el archivo o recupera menos filas, rechaza el relevo y pausa su VFS sin borrar el directorio.
- El SharedWorker intenta restaurar al propietario anterior usando su `PoolUtil` ya pausado y `unpauseVfs()`. Solo publica «Propietaria activa» cuando el nuevo o el restaurado Dedicated Worker confirma la base.

El informe de diagnóstico incluye nombre del VFS, directorio, capacidad, archivos virtuales, presencia y tamaño del archivo SQLite, existencia de la tabla y total de filas. No se permite insertar datos durante la validación del relevo.

La nueva revisión usa identificadores de Worker `v7`, pero conserva el conjunto y directorio de datos sintéticos `v5`. No activa `clearOnInit` ni elimina el VFS. La única eliminación automática sigue siendo el directorio aislado de prueba V4.


### Procedimiento V7 tras el resultado de V6

La salida V6 mostró `pauseVfs()` exitoso, pero la nueva pestaña consultó cero filas. V6 no verificaba que el nuevo Worker hubiera recuperado el mismo archivo virtual ni comparaba el número de filas con el confirmado por el propietario saliente. Por ello V6 no se considera una transferencia satisfactoria.

V7 añade una comprobación previa a la apertura: `PoolUtil.getFileNames()` debe contener `/sharedworker-probe.sqlite3`, y `exportFile()` debe confirmar un contenido no vacío. Después de abrir SQLite, el conteo debe ser como mínimo el que el propietario anterior informó antes de pausar. Si cualquiera de estas condiciones falla, el candidato no se convierte en propietario.

En ese caso el SharedWorker intenta restaurar el propietario anterior usando su mismo `PoolUtil` pausado. La interfaz debe informar explícitamente `TRANSFERENCIA RECHAZADA; se conservó el propietario anterior` o `Se restauró el propietario anterior`, en lugar de presentar cero como éxito.

El registro V7 debe incluir, antes y después del relevo:
- total de filas;
- `databaseFileFound`;
- `databaseFileBytes`;
- `fileNames`;
- `writesTableExists`;
- `vfsName` y `directory`.

El test de V7 no inserta automáticamente ni limpia la base durante el handoff. Primero conectar una pestaña, consultar y anotar el total inicial; luego conectar la segunda, comprobar que ambas ven el mismo total, y solo entonces pulsar «Ceder propiedad». No cerrar el propietario manualmente hasta que V7 confirme transferencia completada o restauración del propietario anterior.


### Relevo con instantánea SQLite explícita (V8)

V7 detectó que el archivo persistente contenía la tabla `writes` pero cero filas después de un relevo anterior. Para no depender exclusivamente de que una nueva instalación del SAH pool reconstruya correctamente el mapeo virtual del archivo, V8 incorpora una instantánea de la base:

1. El propietario consulta el total de filas y cierra la conexión SQLite.
2. Exporta el archivo virtual exacto con `PoolUtil.exportFile(DB_FILE)`.
3. Pausa el VFS con `pauseVfs()` y transfiere la instantánea binaria al SharedWorker.
4. El SharedWorker conserva una copia en memoria y envía una copia transferible al Dedicated Worker entrante.
5. El nuevo propietario instala o reanuda el SAH pool y usa `PoolUtil.importDb(DB_FILE, bytes)` para sobrescribir el archivo virtual con la instantánea recibida.
6. Abre SQLite y valida que el conteo sea al menos el confirmado por el propietario saliente.
7. Solo tras esa verificación se confirma el nuevo propietario. Si falla la importación o validación, el coordinador intenta restaurar el propietario anterior utilizando la misma instantánea.

SQLite documenta que `exportFile()` devuelve los bytes de un archivo virtual del pool y que `importDb()` importa o sobrescribe una base de datos existente; el nombre del archivo debe ser absoluto y la importación debe ocurrir cuando la base no está abierta. Esta prueba mantiene `journal_mode=DELETE` para entregar un archivo autocontenido.

La instantánea queda temporalmente en memoria del SharedWorker únicamente durante el relevo. No es una copia de seguridad persistente de Prisma ni sustituye el sistema de exportación/restauración del producto.

V8 usa nuevos nombres de instancias de Worker, pero conserva el directorio y conjunto sintético V5. No activa `clearOnInit`, no invoca `removeVfs()` y no elimina la base al iniciar.


### Resultado de la lectura V7: conjunto sintético vacío

El informe recibido tras V7 mostró:
- archivo virtual `/sharedworker-probe.sqlite3` presente;
- tamaño de 32768 bytes;
- tabla `writes` presente;
- `COUNT(*) = 0`.

Por tanto, los 175 registros sintéticos informados en V6 ya no estaban en el archivo SQLite que V7 abrió. No es una cuestión de un filtro por `run_id`, porque V7 cuenta todas las filas de `writes`. El informe no permite identificar con certeza en qué paso anterior se vaciaron, así que no debe afirmarse que sigan recuperables. Son datos sintéticos de la herramienta, no datos personales de Prisma.

V8 no presupone que ese contenido exista. La siguiente ejecución debe crear un nuevo conjunto de referencia (25 + 25 = 50) y comprobarlo antes de transferir.

### Procedimiento de aceptación V8

1. Cerrar todas las pestañas de versiones anteriores y actualizar los archivos V8.
2. Abrir la primera pestaña. La página crea automáticamente sus Workers y se registra en el SharedWorker; espera a que muestre el estado.
3. Abrir la segunda pestaña. También se registrará automáticamente. El informe inicial puede mostrar 0 porque el conjunto sintético anterior estaba vacío; no significa que la conexión haya fallado.
4. Insertar 25 filas desde cada pestaña. Verificar 50 filas en ambas y reabrir SQLite.
5. Pulsar `Ceder propiedad a otra pestaña` desde la propietaria.
6. En el registro, comprobar que el propietario saliente exporta una instantánea no vacía y que el entrante importa el mismo número de bytes.
7. Confirmar que el nuevo propietario recupera 50 filas. No aceptar el relevo si el número es menor.
8. Consultar estado y reabrir SQLite en el nuevo propietario. En este momento el total debe seguir en 50.
9. Sin cerrar ninguna pestaña, pulsar «Insertar 25 registros» una vez desde la nueva pestaña propietaria. El total debe pasar de 50 a 75. Volver a pulsar «Cerrar y reabrir SQLite» desde esa pestaña y confirmar 75.
10. En la pestaña anterior (ahora no propietaria), pulsar «Consultar estado» y confirmar que ve 75. Después pulsar «Insertar 25 registros» una sola vez desde esa pestaña. El SharedWorker debe reenviar la solicitud al Dedicated Worker propietario y el total compartido debe pasar a 100.
11. Comprobar ambas interfaces: mismo ID de SharedWorker mientras ambas sigan conectadas, mismo ID Dedicated Worker propietario, propietario indicado en la pestaña nueva, «Otra pestaña» en la anterior y total 100 en ambas. Consultar estado desde la pestaña nueva y reabrir SQLite; debe conservar 100.
12. Guardar los registros de ambas pestañas y los diagnósticos antes de limpiar. No repetir tandas si los totales ya coinciden.

No cerrar ninguna pestaña ni eliminar la base sintética antes de recibir y registrar todas las confirmaciones. Si el relevo falla, conservar ambos registros y diagnósticos.


### Diagnóstico de solicitudes del broker (V8)

La interfaz V8 muestra el identificador del protocolo del SharedWorker. La revisión de diagnóstico usa `v8-broker-trace-1` y registra cada salto de una solicitud:

- `shared-forwarded`: el SharedWorker recibió la petición de una pestaña y la envió al Dedicated Worker propietario.
- `dedicated-received`: el puerto del Dedicated Worker recibió la petición.
- `dedicated-processing`: el Dedicated Worker comenzó a ejecutarla.
- `dedicated-completed`: el Dedicated Worker terminó la operación y prepara su respuesta.
- `Respuesta correlacionada`: el SharedWorker devolvió el resultado a la pestaña que originó la petición. La correlación usa primero `brokerRequestId` y, si no coincide, intenta `clientId + requestId`.
- `BROKER ORPHAN`: llegó una respuesta sin una solicitud pendiente coincidente; se conserva el identificador para diagnosticarla.

Si la traza se detiene en `shared-forwarded`, revisar la entrega al Dedicated Worker. Si llega a `dedicated-completed` pero no aparece la respuesta correlacionada, revisar el retorno y la asociación de IDs. No repetir una escritura cuya respuesta haya agotado el tiempo: primero consultar el total desde la pestaña propietaria para saber si el lote se confirmó.

**Recarga del coordinador:** recargar una página no actualiza una instancia SharedWorker que sigue viva. Los SharedWorkers se reutilizan cuando coinciden el origen, la URL del script y el nombre. Para cargar esta revisión de diagnóstico, no basta con recargar una de las dos páginas: deben cerrarse ambas pestañas de la sonda para que termine la instancia anterior y después abrirse de nuevo. La sonda mantiene la misma URL y nombre de Worker para evitar crear dos coordinadores que intenten abrir simultáneamente el mismo VFS.

La base V5 contiene datos sintéticos. Antes de cerrar ambas pestañas, verificar que no haya solicitudes en curso y que el total esté confirmado tras cierre/reapertura. Cerrar la última pestaña termina el contexto de Worker sin ejecutar una cesión cooperativa de SQLite; se registra como **terminación abrupta en reposo**, no como cierre limpio. Al abrir de nuevo, comprobar primero que se recupera el mismo total. No ejecutar limpieza ni habilitar nuevas escrituras hasta verificarlo.


### Resultado observado: terminación en reposo y recuperación (Galaxy A03 / Brave)

En la ejecución del 13 de noviembre de 2026 se cerraron las dos pestañas mientras la base estaba sin operaciones en curso, sin hacer una cesión cooperativa explícita. Al abrir de nuevo la sonda, se observó:

- El ID del SharedWorker y el ID del Dedicated Worker cambiaron, lo que confirma nuevas instancias.
- El archivo `/sharedworker-probe.sqlite3` apareció en el mismo directorio OPFS.
- Tamaño informado por `exportFile()`: 90.112 bytes.
- La tabla `writes` existía y SQLite recuperó las 100 filas.
- Las APIs OPFS requeridas volvieron a estar disponibles.
- Una consulta `status` atravesó `shared-forwarded`, `dedicated-received`, `dedicated-processing` y `dedicated-completed`; la respuesta fue correlacionada mediante `brokerRequestId` y devolvió 100 filas.

Esto valida recuperación después de terminar ambas pestañas **estando en reposo** y la ruta completa de solicitud/respuesta desde la pestaña propietaria. No valida todavía cierre durante una transacción, caída durante `COMMIT`, terminación aislada del Dedicated Worker con la página abierta, ni solicitud originada en una pestaña secundaria después de esta recuperación.

La primera consulta de la ejecución anterior había agotado el tiempo en el coordinador que seguía vivo después de recargar una página. Tras cerrar ambas pestañas, crear un SharedWorker nuevo y recuperar las 100 filas, la consulta desde la propietaria sí completó. El cambio de ID del SharedWorker y la posterior respuesta correcta son compatibles con reutilización de una instancia coordinadora anterior; no prueban por sí solos la causa exacta del primer timeout.

La etiqueta «Protocolo del coordinador» de la interfaz se conserva ahora al recibir el mensaje `owner-ready`, que no incluye por sí mismo ese campo. Antes, ese mensaje podía sobrescribir visualmente el protocolo ya anunciado por `state` con el texto «Coordinador anterior o sin diagnóstico», aunque la traza posterior demostrara que el protocolo nuevo estaba activo.


### Diagnóstico adicional: escrituras originadas en pestañas secundarias (V8 broker trace 2)

En la primera prueba con el protocolo `v8-broker-trace-1`, la pestaña secundaria completó consultas `status`, pero una solicitud `insertBatch` agotó el tiempo de 30 s. Después de reiniciar el navegador/Workers, SQLite volvió a mostrar 100 filas, no 125. Por tanto, la escritura secundaria no se considera confirmada y no debe repetirse sin consultar primero el total desde el propietario.

La revisión `v8-broker-trace-2` añade:
- `shared-received`: el SharedWorker recibió el mensaje de la pestaña, antes de comprobar el propietario.
- `shared-forwarded`: se registró la solicitud pendiente y se intentó enviar al Dedicated Worker.
- `shared-rejected`: el coordinador no encontró un propietario preparado y devuelve el motivo.
- `shared-forward-failed`: `postMessage()` al Dedicated Worker lanzó una excepción, que ahora se devuelve inmediatamente.
- `dedicated-received`, `dedicated-processing`, `dedicated-completed` y `dedicated-error`: etapas del Worker SQLite.
- `BROKER WATCHDOG`: a los 18 s informa el último salto alcanzado, sin cancelar ni repetir la operación.
- `request-cancelled-at-coordinator`: registra la cancelación de la correlación al agotar el tiempo de la página.

Interpretación:
- Sin `PAGE request-sent`: el botón no llegó a publicar la petición desde la página.
- `PAGE request-sent` sin `shared-received`: investigar el canal Window–SharedWorker o la instancia viva del coordinador.
- `shared-received` sin `shared-forwarded` ni `shared-rejected`: investigar el estado interno del coordinador.
- `shared-forwarded` sin `dedicated-received`: el envío no llegó al puerto del Dedicated Worker o el Worker quedó suspendido/terminó.
- `dedicated-processing` sin `dedicated-completed`: la operación se bloqueó dentro del Dedicated Worker/SQLite.
- `dedicated-completed` sin respuesta correlacionada: investigar el retorno y la asociación de la respuesta.
- `shared-forward-failed`: el error de envío se entrega a la página sin esperar al timeout.

El watchdog no cancela una transacción SQLite. Al vencer el timeout de la página, se elimina únicamente la correlación pendiente; no se reintenta automáticamente una escritura. Si una escritura termina con timeout, consultar el total desde el propietario antes de repetirla. Mantener el conjunto de referencia en 100 filas hasta identificar el salto que falla.


### Resultado observado: escritura desde pestaña secundaria confirmada (13-11-2026)

La ejecución posterior del Galaxy A03 / Brave completó una operación originada en una pestaña que mostraba «Otra pestaña», mientras la otra pestaña conservaba la propiedad SQLite. La instancia visible de la interfaz informó el protocolo `v8-broker-trace-1`.

Evidencia de la pestaña secundaria:
- `insertBatch` fue enviado con requestId `a387b58c-fab8-4a05-a934-1414f3fd12cc-1`.
- El SharedWorker lo reenvió mediante brokerRequestId `a387b58c-fab8-4a05-a934-1414f3fd12cc:3`.
- El Dedicated Worker confirmó `dedicated-received`, `dedicated-processing` y `dedicated-completed`.
- La notificación compartida informó 125 filas.
- La respuesta volvió correlacionada mediante `brokerRequestId`.
- La pestaña secundaria mostró `Escritura confirmada. Total: 125.`
- Desde esa misma pestaña se solicitó `reopenVerify`; la respuesta correlacionada confirmó 125 filas.
- Una consulta `status` posterior desde la pestaña secundaria también devolvió 125 filas.

Por tanto, queda demostrada al menos una ejecución completa de escritura, cierre/reapertura y consulta solicitados desde una pestaña no propietaria y ejecutados por el Dedicated Worker propietario. Esto demuestra el enrutamiento funcional de operaciones secundarias a través del SharedWorker.

Después se reinició la instancia y una nueva pestaña con el protocolo `v8-broker-trace-2` recuperó las 125 filas en un archivo de 90.112 bytes. Esa captura muestra una sola pestaña conectada y propietaria; documenta persistencia de los 125 registros tras otra terminación en reposo, pero **no** constituye una nueva prueba de escritura secundaria con `v8-broker-trace-2`.

Los timeouts anteriores de `insertBatch` siguen siendo evidencia válida de un fallo intermitente o dependiente de la instancia. Una ejecución exitosa no los borra ni demuestra todavía fiabilidad sostenida. La siguiente prueba debe repetir, en una instancia nueva `v8-broker-trace-2`, primero una consulta secundaria y luego una sola escritura secundaria controlada, observando `shared-received`, `shared-forwarded`, `shared-rejected`, `shared-forward-failed`, `BROKER WATCHDOG` y las etapas del Dedicated Worker. Consultar el total desde la propietaria después de cualquier timeout; nunca reintentar a ciegas.

### Resultado observado: escritura desde pestaña secundaria con broker trace 2 (13-11-2026)

En una ejecución posterior del Galaxy A03 / Brave, las dos pestañas mostraron el mismo ID de SharedWorker `9b684a43-c503-49a6-8fc8-a754a9d8004d`, dos pestañas conectadas y un único Dedicated Worker SQLite propietario, con ID `6e12676d-ed40-4309-9076-448dd498b245`. La pestaña desde la que se originó la escritura mostraba «Otra pestaña»; la otra mostraba «Esta pestaña · PROPIETARIA ACTIVA». Ambas reflejaban el protocolo `v8-broker-trace-2`.

Estado de partida y resultado:
- Al iniciar la sesión, la pestaña propietaria recuperó 125 filas del archivo SQLite persistente de 90.112 bytes.
- La pestaña secundaria consultó el estado y recibió 125 filas.
- Desde esa pestaña secundaria se envió una única operación `insertBatch`, con requestId `9956e91d-e2b1-46fd-969d-2b4b6be7dfed-2`.
- El SharedWorker registró `shared-received` y `shared-forwarded`; el brokerRequestId fue `9956e91d-e2b1-46fd-969d-2b4b6be7dfed:2`.
- El Dedicated Worker registró, en orden, `dedicated-received`, `dedicated-processing` y `dedicated-completed`, todos con correlación correcta.
- La respuesta volvió correlacionada mediante `brokerRequestId` y confirmó 150 filas. La pestaña secundaria mostró «Escritura confirmada. Total: 150».
- Desde esa misma pestaña secundaria, `reopenVerify` cerró y reabrió SQLite y confirmó 150 filas.
- Una consulta `status` posterior desde la pestaña secundaria volvió a confirmar 150.
- La pestaña propietaria recibió la actualización compartida a 150 y su propia consulta `status` devolvió 150.

Esto demuestra una escritura originada en una pestaña no propietaria y ejecutada por el único Dedicated Worker propietario bajo `v8-broker-trace-2`, con respuesta correctamente correlacionada, persistencia tras cierre/reapertura y consulta posterior desde la pestaña secundaria. No fue una escritura simultánea desde ambas pestañas: en esta ejecución solo se hizo una tanda desde la secundaria.

La pestaña propietaria informó `Bytes de instantánea importados: 0` al iniciar. En este caso no se estaba realizando un relevo; el archivo existente se recuperó directamente desde OPFS. Ese contador de importación no indica una base vacía.

**Estado de aceptación:** queda confirmada la ruta de escritura secundaria en v2. El relevo cooperativo con exportación/importación de instantánea bajo v2 sigue pendiente de una ejecución propia. También siguen vigentes los timeouts de ejecuciones anteriores; este éxito aislado no demuestra fiabilidad sostenida ni permite descartar fallos intermitentes.

Siguiente prueba: con ambas pestañas conectadas y 150 filas confirmadas, realizar una cesión explícita de propiedad. Verificar que la instantánea se exporta e importa y que el nuevo propietario recupera 150; insertar una sola tanda desde el nuevo propietario y confirmar 175 tras reabrir; consultar 175 desde la pestaña anterior e insertar allí una sola tanda, confirmando 200 desde ambas pestañas. Ante cualquier timeout, consultar el total desde la propietaria antes de repetir una escritura.

### Resultado observado: cesión de propiedad y escrituras a ambos lados con broker trace 2 (13-11-2026)

Prueba real en Samsung Galaxy A03 / Brave. Antes del relevo había 150 filas. Las dos pestañas compartían el SharedWorker `9b684a43-c503-49a6-8fc8-a754a9d8004d`. La cesión cooperativa liberó el VFS del propietario saliente y produjo la siguiente evidencia:

- Propietario saliente: Dedicated Worker `6e12676d-ed40-4309-9076-448dd498b245`.
- Antes de ceder: total 150; archivo SQLite encontrado; tamaño 98.304 bytes; instantánea exportada de 98.304 bytes.
- El propietario entrante recibió e importó 98.304 bytes.
- Nuevo propietario: Dedicated Worker `1bec83b8-c7e5-4a02-883f-b9b9255c0ef5`.
- El nuevo propietario confirmó que recuperó las 150 filas.

Después de la cesión:
1. El nuevo propietario insertó una tanda de 25: total 175.
2. Desde el nuevo propietario, `reopenVerify` cerró y reabrió SQLite y conservó 175 filas.
3. La pestaña anterior, ahora secundaria, consultó y recibió 175 filas.
4. Desde esa pestaña secundaria se insertó una tanda de 25: total 200.
5. La operación secundaria completó `shared-received`, `shared-forwarded`, `dedicated-received`, `dedicated-processing`, `dedicated-completed` y respuesta correlacionada por `brokerRequestId`.
6. La pestaña secundaria ejecutó `reopenVerify` y recuperó 200 filas.

La segunda captura muestra la pestaña anterior como «Otra pestaña», el nuevo propietario Dedicated Worker `1bec83b8-c7e5-4a02-883f-b9b9255c0ef5`, y el total compartido de 200. La pestaña propietaria informó 175 en la captura inmediatamente posterior a su primera tanda; la notificación posterior difundió 200 tras la escritura secundaria.

**Estado de aceptación V8 con broker trace 2:** demostrados en el dispositivo de referencia la cesión cooperativa con instantánea binaria verificada, la escritura/reapertura del nuevo propietario y la consulta/escritura/reapertura desde la pestaña que dejó de ser propietaria. El mismo coordinador y un único Dedicated Worker SQLite administraron ambas pestañas. Esto valida el flujo funcional del relevo y el acceso de la pestaña secundaria en esta ejecución. No demuestra todavía solicitudes de escritura simultáneas, equidad bajo contención, ni recuperación durante una transacción interrumpida; los timeouts anteriores siguen siendo evidencia que debe considerarse al valorar fiabilidad sostenida.

Siguiente fase: evaluar terminación abrupta del propietario durante reposo, durante escritura y durante `COMMIT`; terminación aislada del Dedicated Worker; suspensión/reanudación de una pestaña; bloqueo OPFS temporal; después, iniciar la prueba real de OPFS-WL con dos Dedicated Workers y Web Locks.

### Aceptación V8 con broker trace 2: transferencia, escritura del nuevo propietario y escritura secundaria (Galaxy A03 / Brave, 13-11-2026)

Esta ejecución completa la secuencia de relevo del protocolo v2. Estado inicial: dos pestañas conectadas, un único propietario SQLite y 150 filas confirmadas.

**Cesión cooperativa:**
- SharedWorker conservado: `9b684a43-c503-49a6-8fc8-a754a9d8004d`.
- Dedicated Worker saliente: `6e12676d-ed40-4309-9076-448dd498b245`.
- Archivo SQLite encontrado: `/sharedworker-probe.sqlite3`.
- Tamaño de archivo y de instantánea exportada: 98.304 bytes.
- Nuevo propietario Dedicated Worker: `1bec83b8-c7e5-4a02-883f-b9b9255c0ef5`.
- El nuevo propietario importó 98.304 bytes y recuperó las 150 filas.

**Operaciones posteriores:**
1. El nuevo propietario insertó 25 filas: 175.
2. `reopenVerify` desde el nuevo propietario confirmó 175.
3. La pestaña anterior consultó como secundaria y recibió 175.
4. La pestaña secundaria insertó 25: 200.
5. La solicitud secundaria completó todos los saltos de `v8-broker-trace-2`, con respuesta correlacionada por `brokerRequestId`.
6. `reopenVerify` desde la secundaria recuperó 200.
7. La siguiente captura de ambas pestañas mostró el mismo SharedWorker, dos conexiones, nuevo propietario y 200 filas.

**Conclusión de aceptación funcional:** en el dispositivo de referencia quedó demostrada una cesión cooperativa mediante instantánea SQLite binaria verificada bajo `v8-broker-trace-2`, una escritura y reapertura desde el nuevo propietario, y una consulta, escritura y reapertura desde la pestaña que dejó de ser propietaria. El conjunto sintético persistente terminó en 200 filas.

**Límites de la prueba:** las escrituras fueron secuenciales, no simultáneas. No se ha probado todavía equidad bajo contención, terminación del propietario durante una transacción ni caída aislada del Dedicated Worker y detección automática de esa caída. Los timeouts de ejecuciones anteriores siguen registrados y no se consideran anulados por este resultado exitoso.


### OPFS-WL AutoTest V1 — herramienta preparada; aceptación pendiente

Tras la aceptación real de Concurrency AutoTest V1, se añadió una sonda separada para la alternativa `opfs-wl`. Esta herramienta utiliza dos Dedicated Workers y dos conexiones SQLite independientes sobre un mismo archivo OPFS; no utiliza el SharedWorker ni el propietario único de SAH pool.

- Interfaz e instrucciones: [opfs-wl-auto-test/README.md](opfs-wl-auto-test/README.md).
- Instalador seguro: [install-opfs-wl-auto-test.py](install-opfs-wl-auto-test.py).
- Servidor independiente con COOP/COEP: [serve-opfs-wl.py](serve-opfs-wl.py).
- Usa el puerto 18768. El servidor actual de las sondas SAH pool en 18767 permanece separado y no se reinicia.
- Comprueba `crossOriginIsolated`, `SharedArrayBuffer`, `Atomics.waitAsync`, Web Locks, OPFS y la disponibilidad del VFS SQLite `opfs-wl`.
- Prueba dos conexiones independientes con 12 transacciones de 25 filas por cliente, cinco filas sintéticas de referencia, verificación de 605 filas desde ambos clientes, cierre/reapertura independiente y limpieza limitada al directorio del RUN_ID.
- Registra reintentos `SQLITE_BUSY`, latencias, secuencia de confirmación y estimación de memoria cuando el navegador exponga una API compatible.
- Compara la carga de una imagen pública de TMDB en modo no-CORS y CORS bajo COEP para detectar posibles incompatibilidades de imágenes externas. No llama a la API de TMDB ni transmite datos personales.

**Estado histórico de preparación:** la sonda se creó y verificó sintácticamente. Las ejecuciones reales posteriores y el estado vigente se documentan en las secciones siguientes. No declarar OPFS-WL compatible ni elegirla hasta completar la prueba.

La variante `require-corp` se prueba primero; `credentialless` queda disponible como comparación si las imágenes externas o la carga de recursos se ven afectadas. La herramienta no cambia la aplicación Prisma, las dependencias, sus versiones ni los datos de otras sondas.


### OPFS-WL AutoTest: primera ejecución fallida y diagnóstico (13-11-2026)

La primera ejecución real de `tools/storage-benchmark/opfs-wl-auto-test/` en Brave verificó COOP `same-origin`, COEP `require-corp`, `crossOriginIsolated`, SharedArrayBuffer, Atomics.waitAsync, Web Locks y OPFS. Sin embargo, falló al inicializar la primera conexión SQLite con el mensaje genérico `SQLite no devolvió una conexión válida`, antes de confirmar filas iniciales o empezar las transacciones. No se considera una prueba de escritura OPFS-WL ni una prueba de incompatibilidad del navegador.

RUN_ID: `prisma-opfs-wl-auto-6cc9edd7-5e0b-4621-a44b-aaa61c1dd2a3`. La herramienta conservó la carpeta OPFS exclusiva de esa ejecución. No se debe borrar ni reutilizar.

El diagnóstico de imágenes bajo COEP `require-corp` informó que un póster público de ejemplo falló sin CORS y cargó correctamente con CORS (500 × 750). Esto acredita el comportamiento de ese recurso y esos dos modos de carga, no de todas las imágenes externas de TMDB.

Se identificó una diferencia en el código de la sonda respecto al ejemplo oficial SQLite: la primera versión envolvía el constructor de `OpfsWlDb` en `sqlite3_js_retry_busy()`; el ejemplo oficial trata por separado el posible `SQLITE_BUSY` del constructor y utiliza el helper para las operaciones SQL. Se preparó una revisión diagnóstica 2 con ese flujo, nombre de archivo URI `file:<RUN_ID>/shared.sqlite3` y detalles ampliados de errores, puntero, estado de apertura, VFS registrados, intentos y códigos SQLite.

**Resultado de revisión 2:** la apertura de OpfsWlDb quedó demostrada en la segunda ejecución real, pero falló la verificación de la tabla writes. La sonda sigue sin aceptación; el diagnóstico detallado y la revisión 3 se documentan a continuación.

Documentación: [opfs-wl-auto-test/README.md](opfs-wl-auto-test/README.md).


### OPFS-WL AutoTest: segunda ejecución, apertura SQLite confirmada y fallo de esquema (13-11-2026)

La segunda ejecución real utilizó la revisión 2 del Worker y terminó **NO APROBADA** durante la inicialización, antes de las transacciones de carga.

- RUN_ID: `prisma-opfs-wl-auto-7639517d-9ebf-4c96-be3b-eb83142243af`.
- COOP `same-origin`, COEP `require-corp`, `crossOriginIsolated = true`.
- SharedArrayBuffer, Atomics.waitAsync, Web Locks y OPFS disponibles.
- Núcleo SQLite `3.54.1`; constructor `OpfsWlDb` disponible; VFS `opfs-wl` registrado.
- Worker A: `dbIsOpen = true`, puntero de tipo `number`, una apertura, cero reintentos BUSY.
- Error: `SQLITE_ERROR: no such table: writes`, desde `readCounts()` al terminar la inicialización del Worker A.
- No se confirmaron las cinco filas sintéticas, las 24 transacciones, los 605 registros, el cierre/reapertura ni la limpieza.

La página inicia B solo después de recibir `ready` de A; por eso la evidencia no apunta a una carrera de inicio entre ambos Workers. El diagnóstico confirma que la conexión está abierta, pero no confirma que el esquema haya quedado creado. No es evidencia de incompatibilidad de Brave ni de una falla del VFS `opfs-wl`.

La comprobación de imagen repitió el resultado anterior: el póster de TMDB no cargó en no-CORS, pero sí en CORS a 500 × 750. Se conserva `require-corp`; el resultado de un recurso no-CORS no justifica cambiar la política COEP.

RUN_ID y directorio OPFS de esta ejecución: **conservar íntegros para evidencia**; no borrar, limpiar datos del sitio ni reutilizar el nombre.

### Revisión 3: inicialización de esquema separada y diagnóstico adicional

Se preparó una nueva revisión que cambia solo el Worker de la sonda:

- Crea tabla e índice mediante `db.exec()` en autocommit, fuera de la transacción de siembra.
- Consulta `sqlite_schema` y exige que `writes` exista antes de leer o insertar filas.
- Inserta las cinco filas de referencia dentro de su propia transacción y verifica el total.
- Si falla, el diagnóstico incluye las tablas visibles y errores al consultar el esquema.

La revisión 3 es experimental y **no significa que OPFS-WL esté aprobada**. Su finalidad es aislar la creación del esquema y registrar evidencia más precisa.

Instalador seguro: [install-opfs-wl-auto-test-revision-3.py](install-opfs-wl-auto-test-revision-3.py). Descarga fijada al commit `8f3ef0b343680acf86713056117e7420f87cd28b`. Modifica únicamente el Worker. No toca SQLite WASM, dependencias, HTML, servidores, el puerto 18767 ni ningún directorio OPFS existente.

Con el servidor 18768 activo, basta recargar la página `http://127.0.0.1:18768/opfs-wl-auto-test/`; no reiniciar servidor. La siguiente prueba debe ejecutarse una sola vez en `require-corp` y reportarse íntegramente.

**Estado vigente:** apertura de conexión OPFS-WL observada con éxito, siembra/esquema aún no verificados y aceptación pendiente. Requisitos para considerar aprobación: dos conexiones, 24/24 transacciones, 605 filas verificadas por ambos clientes, cierre/reapertura y limpieza de solo el RUN_ID de prueba.


### OPFS-WL AutoTest: tercera ejecución, esquema todavía vacío (13-11-2026)

La ejecución con revisión 3 terminó **NO APROBADA** en la inicialización del Worker A:

- RUN_ID: `prisma-opfs-wl-auto-9dc4693d-7d38-4fd7-812a-8552f069fb3f`.
- Requisitos de aislamiento y APIs: todos disponibles bajo COOP `same-origin` y COEP `require-corp`.
- SQLite 3.54.1, constructor `OpfsWlDb`, VFS `opfs-wl`, conexión abierta y puntero válido: confirmados.
- La consulta a `sqlite_schema` devolvió `[]`, por lo que no existía la tabla `writes` visible en esa conexión después de la rutina de esquema.
- No se confirmaron filas de referencia, escrituras concurrentes, 605 filas, reapertura ni limpieza.

El fallo de la tabla no demuestra incompatibilidad de Brave ni del VFS. Se conserva el directorio OPFS del RUN_ID. El comportamiento de la imagen se mantuvo: el recurso TMDB de prueba falló no-CORS y cargó mediante CORS (500 × 750); se mantiene `require-corp`.

### OPFS-WL AutoTest: revisión 4 de diagnóstico DDL

La revisión 4 cambia únicamente el Worker de prueba. Ejecuta un bloque SQL como cadena directamente sobre la conexión, captura las sentencias reportadas por `db.exec({saveSql})) y registra antes/después `schema_version`, archivo SQLite, VFS efectivo, modo solo lectura y `database_list`. Si la tabla sigue sin aparecer, añade `page_count`, cambios totales y puntero SQLite.

Este enfoque permite distinguir mejor si el DDL se está preparando, sobre qué archivo/VFS trabaja la conexión y si la base es de solo lectura. Es un instrumento de diagnóstico, no una corrección cuya eficacia ya se haya probado.

Instalador: [install-opfs-wl-auto-test-revision-4.py](install-opfs-wl-auto-test-revision-4.py), fijado al commit `3fe38b4853a0c314810c7e979912714dfc7e6ee0`. Solo reemplaza el Worker de la sonda y no toca SQLite WASM, dependencias, HTML, servidores, puerto 18767, otras herramientas ni carpetas OPFS previas.

**Estado vigente:** apertura de conexión OPFS-WL demostrada; creación y persistencia del esquema aún no demostradas. OPFS-WL continúa sin aceptación hasta completar los dos Workers, 24/24 transacciones, 605 filas, reapertura y limpieza limitada al RUN_ID.


### OPFS-WL AutoTest: cuarta ejecución y revisión 5 (13-11-2026)

La ejecución con revisión 4 confirmó que la tabla `writes` existía, pero terminó **NO APROBADA** porque `readCounts()` devolvió cero filas para el RUN_ID `prisma-opfs-wl-auto-3f8f81ea-5c11-4f93-b078-8ae9123068a9`. La conexión SQLite seguía abierta, con `OpfsWlDb` y VFS `opfs-wl` disponibles.

**Corrección interpretativa:** ese campo `total` filtra por el RUN_ID actual y no equivale al total global de la tabla. El informe anterior no permite concluir que la tabla no contuviera filas con otro identificador. Se conserva el directorio OPFS de esa ejecución.

La revisión 5 agrega recuento global de filas, agrupación por RUN_ID/cliente y muestra de filas. También cambia la ruta de inserción inicial y de los lotes a un `INSERT` SQL multirregistro mediante `tx.exec()` dentro de `transaction("IMMEDIATE", ...)`, y exige cinco o 25 cambios según la operación. Es una ruta alternativa para aislar la causa; no significa que los métodos preparados anteriores sean incompatibles ni que OPFS-WL esté aprobada.

Instalador seguro: [install-opfs-wl-auto-test-revision-5.py](install-opfs-wl-auto-test-revision-5.py), fijado al commit `b4f3c9d62eb147cfd1d9e2f60428e7d7819d0e0d`. Modifica únicamente el Worker de la sonda, valida su SHA y el del servidor, y no toca SQLite WASM, dependencias, HTML, ningún servidor, la aplicación Prisma ni carpetas OPFS anteriores.

**Estado vigente:** conexión OPFS-WL y creación de la tabla observadas; siembra de filas para el RUN_ID y carga concurrente aún no aceptadas. La revisión 5 requiere una ejecución real para continuar el diagnóstico. Mantener COEP `require-corp`, conservar los RUN_ID anteriores y ejecutar con el servidor 18768 activo, sin reiniciarlo.


### OPFS-WL AutoTest: quinta ejecución y regresión de revisión 5 (13-11-2026)

La ejecución con revisión 5 terminó **NO APROBADA** con `SQLITE_ERROR: no such table: writes`, desde `readCounts()` llamado por `seedDatabase()`:

- RUN_ID: `prisma-opfs-wl-auto-66eee9ef-9c94-4c01-bc24-97a78ab19613`.
- Requisitos de aislamiento y APIs disponibles; SQLite 3.54.1, `OpfsWlDb`, VFS `opfs-wl`, conexión y puntero válidos.
- No hubo confirmación de filas de referencia, lotes concurrentes, 605 filas, reapertura ni limpieza.

La inspección del Worker publicado identificó una regresión introducida al preparar revisión 5: se sustituyó la rutina de inserción y, por error, también se eliminó de `seedDatabase()` el bloque `CREATE TABLE` y `CREATE INDEX`. Por eso la revisión intentó escribir/leer `writes` sin crearla. Es un defecto de la sonda, no una prueba de incompatibilidad del navegador o del VFS. La revisión 4 sí había creado la tabla correctamente.

La revisión 6 restaura el DDL y la comprobación de `sqlite_schema` antes de ejecutar la siembra multirregistro que se incorporó en revisión 5. Conserva los controles de cinco cambios iniciales, conteo global/por RUN_ID y 25 cambios por lote. El Worker pasó comprobación sintáctica; esto no sustituye una ejecución real en Brave.

Instalador seguro: [install-opfs-wl-auto-test-revision-6.py](install-opfs-wl-auto-test-revision-6.py), fijado al commit `cf09dbe573949376d223704e421f904e9d5370dd`. Solo reemplaza el Worker y no toca SQLite WASM, dependencias, HTML, servidores, SAH pool, la aplicación Prisma ni directorios OPFS de ejecuciones anteriores.

**Estado vigente:** la conexión OPFS-WL abre, la creación de esquema se demostró en revisión 4, revisión 5 tuvo una omisión DDL ya corregida en el código de revisión 6; todavía no hay aceptación de la prueba de escritura concurrente.

### OPFS-WL AutoTest: sexta ejecución y causa del callback omitido (13-11-2026)

La ejecución con revisión 6 abrió la conexión y confirmó la tabla writes, pero la siembra no se ejecutó: changesInsideTransaction y totalChangesInsideTransaction quedaron null, executedSeedSql vacío y los recuentos global/por RUN_ID en cero.

RUN_ID: prisma-opfs-wl-auto-49ac6a3d-23cf-4fcb-8940-70fa16c318ff. Requisitos de aislamiento y VFS confirmados; no hubo 24 transacciones, 605 filas, reapertura ni limpieza.

La inspección encontró que retryBusy() llamaba a sqlite3_js_retry_busy(-1, callback, ...). La implementación consultada de SQLite recorre for (let n = 1; n <= maxTimes; ++n); al pasar -1 no entra al bucle y omite el callback. Esto concuerda con las variables que quedaron sin asignar. Es una incompatibilidad entre el argumento -1 usado por la sonda y el bucle de implementación, no una prueba de fallo de OPFS-WL o del navegador. Fuente del código: https://chromium.googlesource.com/external/github.com/sqlite/sqlite/%2B/refs/heads/compile-commands/.

La revisión 7 cambia el helper a 120 intentos positivos y añade el contador retryCallbackCalls al diagnóstico y al informe de conexión. Conserva el DDL, la inserción multirregistro y las comprobaciones previas. El Worker pasó comprobación sintáctica; aún no se ha ejecutado en Brave.

Instalador: [install-opfs-wl-auto-test-revision-7.py](install-opfs-wl-auto-test-revision-7.py), fijado al commit b73eeff671db54022fbfaed3da4e3b573189ad42. Solo modifica el Worker de la sonda, verifica los hashes y no toca SQLite WASM, dependencias, HTML, los servidores, SAH pool, Prisma ni directorios OPFS anteriores.

**Estado vigente:** apertura, VFS y creación de esquema observados; causa probable del callback omitido localizada en el límite negativo de reintentos; ejecución real con límite positivo pendiente. OPFS-WL sigue sin aceptación.


### OPFS-WL AutoTest: séptima ejecución y diagnóstico de integridad (13-11-2026)

La revisión 7 llegó a ejecutar escrituras reales desde dos conexiones SQLite independientes al mismo archivo. Tras cuatro transacciones confirmadas (B1, A1, B2, A2), el siguiente lote de B terminó en `SQLITE_CORRUPT` (código 11, `database disk image is malformed`). RUN_ID: `prisma-opfs-wl-auto-973de902-311b-447c-8078-90e9c365b6d4`. La carpeta OPFS se conserva sin reparación ni limpieza. No se completaron 24 transacciones, la verificación de 605 filas ni la reapertura. OPFS-WL permanece **NO APROBADA**.

La investigación del código oficial de SQLite 3.54.1 encontró que `sqlite3_js_retry_busy()` implementa un bucle `n <= maxTimes`, mientras que la prueba oficial `ext/wasm/tests/opfs/concurrency/worker.js` aún la llama con `-1`. En esa versión, el callback queda omitido; por tanto, el mensaje de finalización de esa prueba no prueba por sí solo que se hayan ejecutado escrituras. La revisión 7 de Prisma pasa 120 intentos positivos y sí alcanzó operaciones transaccionales reales. Esto explica el problema de ejecución de la revisión 6, pero **no explica el SQLITE_CORRUPT posterior**.

El uso de `OpfsWlDb`, `DB.transaction("IMMEDIATE", ...)` y `DB.exec()` coincide con las APIs documentadas. La coordinación Web Locks, especialmente el cambio de bloqueo compartido a exclusivo, sigue bajo investigación; no se atribuye todavía la corrupción a una causa concreta.

Siguiente paso: sonda mínima y aislada, con RUN_ID nuevo, comparación de `opfs-wl` y `opfs`, una fila por operación, integridad entre fases y reapertura. No volver a cargar la base fallida ni limpiar ejecuciones previas.

Detalle y trazas: [OPFS-WL AutoTest README](opfs-wl-auto-test/README.md).

## Comparación funcional de OPFS-WL y OPFS clásico (13-11-2026)

La sonda con dos Dedicated Workers independientes produjo resultados distintos según el VFS:

- **OPFS clásico (`opfs`):** completó todas las fases. Tras autocommit concurrente, dos tandas `BEGIN IMMEDIATE` (una fila y 25 filas por Worker), cierre y reapertura de ambas conexiones, ambas verificaron `quick_check=ok`, `integrity_check=ok` y 57 filas (A=29, B=28).
- **OPFS-WL (`opfs-wl`):** ambos Workers reportaron una inserción concurrente, pero la verificación encontró 4 filas en vez de 5 (A=3, B=1). Las comprobaciones estructurales de esa instantánea devolvieron `ok`; no se identificó la causa y la sonda se detuvo antes de las fases posteriores.

OPFS clásico pasa **este escenario controlado** y queda como candidato principal para nuevas validaciones. OPFS-WL permanece sin aprobación. Ninguno de estos resultados, por sí solo, selecciona definitivamente la arquitectura de Prisma: faltan repetición con RUN_ID independientes, persistencia tras recargar, recuperación ante cierre abrupto y comparación final con SharedWorker + SAH pool.

RUN_ID OPFS-WL: `prisma-opfs-lock-diag-482fb3aa-5879-40e2-873d-044161ba69c7`.  
RUN_ID OPFS clásico: `prisma-opfs-lock-diag-b23f86e8-d6f0-4c14-bd66-13df45cb4bee`.

Informe detallado: [opfs-lock-diagnostic-results-2026-11-13.md](opfs-lock-diagnostic-results-2026-11-13.md). Ambos directorios OPFS se conservaron; no limpiar, reparar ni reutilizar esos RUN_ID.

## OPFS Persistence Probe V1: reapertura después de cerrar Brave (13-11-2026)

El usuario aportó el informe real de OPFS Persistence Probe V1. RUN_ID: `prisma-opfs-survival-a29c5f2e-f49f-4e57-85ed-e0106d31df25`.

- VFS `opfs`, SQLite 3.54.1 / paquete 3.54.1-build1.
- La base se creó con 57 registros sintéticos: A=29, B=28.
- La primera recarga volvió a abrir y verificar el mismo archivo.
- Tras el procedimiento manual de cierre completo declarado por el usuario, Brave volvió a abrir la URL preparada en fase `after-close-1`; una conexión SQLite nueva encontró los mismos 57 registros.
- SHA-256 esperado y observado: `feb1859f51eeef189df729862f4e14b3875cdc7d25c0f0063e0b1e7f4b8d524a`.
- `quick_check=["ok"]`, `integrity_check=["ok"]`, `distinctPayloads=57`.
- El historial persistido contiene `seed-created`, `after-reload` y `after-close-1`, con tres PAGE_BOOT_ID distintos.
- Metadatos: `journal_mode=delete`, `locking_mode=normal`, `synchronous=2`, `page_size=8192`, `readOnly=0`.

**Conclusión:** OPFS clásico aprobó la persistencia de datos confirmados a través de siembra, recarga y reapertura manual del navegador en este escenario. La fase `after-close-1` es declarada por el usuario; la página no puede certificar telemétricamente que el proceso de Brave terminó por completo.

La prueba no cubre terminación abrupta durante una transacción, antes/después de COMMIT, pérdida de energía, cierre forzado por Android, cuota agotada ni restauración de exportaciones. OPFS clásico sigue como candidato principal, no como arquitectura definitiva aprobada.

RUN_ID preservado; no borrar ni reutilizar. Informe: [opfs-persistence-results-2026-11-13.md](opfs-persistence-results-2026-11-13.md).
