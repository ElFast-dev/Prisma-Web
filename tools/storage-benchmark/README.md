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
2. Pulsa «Conectar al SharedWorker» en ambas.
3. Comprueba que las dos muestran el mismo ID del Worker y que el contador llega a 2 conexiones.
4. Pulsa una sola vez «Insertar 25 registros» en cada pestaña.
5. Comprueba que ambas reciben el mismo total de 50 registros.
6. Pulsa «Cerrar y reabrir SQLite» y verifica que siguen existiendo los 50 registros.
7. Cuando ambas pestañas hayan terminado, pulsa «Eliminar la base sintética» desde una sola pestaña y conserva el resultado de `removeVfs()`.
8. Detén el servidor con Ctrl+C.

Si los IDs de Worker son distintos, no se ha demostrado que Brave comparta el SharedWorker. Si hay errores de escritura, discrepancias de conteo o fallos de reapertura, conserva el registro y no repitas la prueba con datos personales.

Esta prueba valida el actor compartido y el acceso a SAH pool desde dos pestañas. No sustituye las pruebas posteriores de cierre abrupto del Worker, recuperación tras reiniciar Brave ni funcionamiento en el origen HTTPS definitivo.

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
