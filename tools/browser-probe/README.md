# Sonda de compatibilidad del navegador

Herramienta independiente de la aplicación Prisma para el Samsung Galaxy A03 y Brave Android 1.99.56 / Chromium 157.0.8103.50. No tiene dependencias ni telemetría; utiliza datos sintéticos en un origen localhost.

## Descargar en Termux

```sh
mkdir -p "$HOME/prisma-browser-probe"
python - <<'PY'
from pathlib import Path
from urllib.request import urlopen
base = "https://raw.githubusercontent.com/ElFast-dev/Prisma-Web/main/tools/browser-probe/"
target = Path.home() / "prisma-browser-probe"
for name in ("index.html", "sw.js"):
    data = urlopen(base + name, timeout=30).read()
    (target / name).write_bytes(data)
    print("Descargado:", name, len(data), "bytes")
PY
```

## Ejecutar en el teléfono

En Termux:

```sh
python -m http.server 8765 --bind 127.0.0.1 --directory "$HOME/prisma-browser-probe"
```

Mantén esa sesión abierta y abre en Brave: `http://127.0.0.1:8765/`. No abras el archivo mediante `file://`.

## Pruebas

1. Ejecutar las pruebas básicas.
2. Solicitar persistencia mediante el botón correspondiente.
3. Registrar el Service Worker y recargar la página.
4. Descargar el JSON sintético y seleccionarlo mediante el selector Android.
5. Con Termux aún ejecutando el servidor, activar modo avión y recargar para probar la caché offline.
6. Descargar el informe JSON y compartirlo en la conversación.

Al terminar, usa «Limpiar datos de la sonda» para borrar únicamente la base, caché, Worker y carpeta OPFS con nombres propios de la herramienta. Detén el servidor con Ctrl+C.

## Limitaciones

- Brave puede modificar los valores de `StorageManager.estimate()`; no se consideran cuota exacta.
- OPFS y su acceso síncrono en Worker se prueban separadamente.
- `showOpenFilePicker` y `showSaveFilePicker` son opcionales; se prueba también el selector HTML estándar y la descarga Blob.
- La sonda prueba AES-GCM de Web Crypto, pero todavía no implementa ni mide Argon2id.
- Es una prueba técnica, no la aplicación Prisma ni una aprobación definitiva de arquitectura.
