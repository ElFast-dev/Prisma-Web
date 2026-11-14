# Prisma · SAH Pool Persistence Probe V1

Prueba aislada de persistencia para SQLite WASM 3.54.1 usando el VFS `opfs-sahpool`. Compara el resultado con `opfs` a través de creación, cierre de la conexión, recarga de la página y reapertura manual de Brave.

## Requisitos

- Proyecto `~/prisma-storage-benchmark` con `node_modules/@sqlite.org/sqlite-wasm` 3.54.1-build1 en la raíz.
- Servidor `serve-opfs-wl.py` ya activo en puerto 18768.
- OPFS, Dedicated Worker y Web Crypto disponibles en Brave.
- No hace falta habilitar SharedArrayBuffer o COOP/COEP específicamente para SAH pool; el servidor actual conserva sus cabeceras habituales.

No instala dependencias, no reinicia servidores ni toca el VFS SAH pool principal, las bases V8 o pruebas anteriores.

## URL

`http://127.0.0.1:18768/sahpool-persistence-probe/`

Instalar esta carpeta en la raíz publicada por el puerto 18768: `~/prisma-storage-benchmark/sahpool-persistence-probe/`.

## Protección del almacenamiento

La herramienta registra e instala exactamente estas opciones:

- `name: "prisma_sahpool_persistence_v1"`
- `directory: "/prisma-sahpool-persistence-probe-v1"`
- `initialCapacity: 6`
- `clearOnInit: false`
- `preserveOnInitFailure: true`

La carpeta es separada del VFS principal de Prisma. `clearOnInit=false` evita limpiar el pool al abrir. `preserveOnInitFailure=true` hace que un fallo de inicialización cierre los manejadores que se hayan abierto pero preserve el almacenamiento subyacente, en lugar de borrar el VFS. Estas opciones están disponibles en SQLite WASM 3.54.1. El VFS usa un nombre de archivo virtual absoluto `/<RUN_ID>.sqlite3`.

No se llama a `removeVfs()`, `unlink()`, `wipeFiles()` ni a ninguna función de limpieza. No hay botón de borrado. No intentes reparar un RUN_ID que falle.

## Protocolo

1. Abre la URL base sin parámetro `run`. Se genera un RUN_ID aleatorio y se instala el VFS SAH pool con las opciones protegidas.
2. Pulsa «Crear base sintética de 57 registros». Guarda 29 filas A, 28 filas B, un manifiesto con la huella SHA-256 y una tabla de historial de sesiones. Ejecuta `quick_check` e `integrity_check`, y cierra la conexión.
3. Pulsa «Recargar y verificar persistencia». Un nuevo contexto de página y Dedicated Worker vuelve a instalar el mismo VFS sin borrar el directorio y abre la misma ruta virtual. Debe recuperar los mismos registros y la misma huella.
4. Después de aprobar la recarga, pulsa «Preparar prueba tras cerrar Brave». Copia la URL completa, cierra Brave por completo y vuelve a abrir exactamente esa dirección.
5. Comparte el informe completo, incluido RUN_ID, SHA-256, conteos, historial de sesiones, opciones del VFS y datos de capacidad del pool.

La fase `after-close-N` se declara manualmente; la página no puede certificar por sí sola el cierre completo del proceso Brave.

## Resultados esperados

- SQLite core 3.54.1, paquete 3.54.1-build1, VFS `prisma_sahpool_persistence_v1`.
- 57 filas únicas: A=29 y B=28.
- SHA-256 esperado igual al observado después de cada reapertura.
- `quick_check=["ok"]`, `integrity_check=["ok"]`.
- `journal_mode=delete`, `synchronous=2` (FULL), `readOnly=0`.
- Pool con capacidad informada y el archivo virtual esperado en `getFileNames()` cuando esté asignado.
- Historial de sesiones con `seed-created`, `after-reload` y `after-close-N` conforme se ejecuten.

## Alcance

Esta prueba mide persistencia del archivo virtual SAH pool entre sesiones de página/navegador. No mide concurrencia de varias pestañas ni fallos de energía. El diseño de Prisma mantiene un único propietario SQLite en SharedWorker/worker coordinado; SAH pool no debe abrirse independientemente desde varias pestañas. La concurrencia entre clientes debe permanecer mediada por el propietario único.

La prueba no aprueba por sí sola toda la arquitectura de Prisma. Después de ejecutarla se compararán los resultados con OPFS clásico y se cerrará la decisión del VFS/propietario.

**Estado al publicar:** paquete preparado y validado estáticamente; pendiente de ejecución real en Brave.

## Paquete de instalación entregado

El ZIP verificado de esta revisión se entrega como adjunto de la conversación, no como blob binario de GitHub. Se retiró el primer blob remoto porque su tamaño no coincidía con los bytes locales.

- Archivo: `sahpool-persistence-probe-v1.zip`.
- Tamaño: 13.053 bytes.
- SHA-256: `4782c65f400c9267e5172975992614d3cd676faa3d5720786eee6439c354dea2`.
- Incluye exactamente `README.md`, `index.html` y `src/persistence-worker.js`; los bytes del ZIP se comprobaron contra las fuentes locales.

Antes de extraerlo, verifica el SHA-256 en Termux:

```bash
sha256sum "$HOME/storage/downloads/sahpool-persistence-probe-v1.zip"
```

El resultado debe coincidir exactamente con el valor indicado arriba. La aceptación real de esta revisión se completó y está documentada en la sección siguiente; el ZIP binario se mantiene como adjunto de la conversación y no se publica en GitHub porque la transferencia remota anterior no superó la comprobación de tamaño.

## Aceptación real en Brave · 13-11-2026

Ejecución aportada por el propietario:

- RUN_ID: `prisma-sahpool-survival-b1bb9d6f-2558-4d1d-a2a8-a75744cebc2a`.
- Fase final declarada: `after-close-1`.
- Tres PAGE_BOOT_ID distintos: siembra, después de recargar y después de la reapertura manual de Brave declarada por el propietario.
- SQLite núcleo 3.54.1 / paquete 3.54.1-build1.
- VFS `prisma_sahpool_persistence_v1`, capacidad 6, un archivo virtual asignado.
- Opciones verificadas: `clearOnInit=false`, `preserveOnInitFailure=true`.
- 57 registros recuperados (A=29, B=28, 57 payloads distintos).
- SHA-256 esperado y observado idéntico: `a9d09c499384dc4deeaadfeffd9d68f9a0860eec4648bd5144a1862638c33d76`.
- `quick_check=["ok"]` y `integrity_check=["ok"]`.
- `journal_mode=delete`, `synchronous=2`, `readOnly=0`.

**Resultado real: PASS** para persistencia tras cierre de conexión, recarga y reapertura manual de Brave declarada por el propietario.

**Límite:** `after-close-1` se declara manualmente. La página no certifica el cierre completo del proceso Brave/Android. La prueba tampoco demuestra varias instalaciones SAH pool concurrentes; la arquitectura debe usar un único propietario SQLite activo y coordinar las demás pestañas desde la aplicación.

Informe completo: [sahpool-persistence-results-2026-11-13.md](../sahpool-persistence-results-2026-11-13.md).

El RUN_ID y el directorio VFS quedan preservados. No borrar ni reutilizar.
