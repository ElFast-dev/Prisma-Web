#!/usr/bin/env python3
"""Instala la sonda de concurrencia de Prisma sin sobrescribir cambios locales."""
from hashlib import sha1
from pathlib import Path
from tempfile import TemporaryDirectory
from urllib.request import Request, urlopen
from urllib.error import URLError
import os
import socket

ROOT = Path.home() / "prisma-storage-benchmark"
DEST = ROOT / "concurrency-auto-test"
BASE = "https://raw.githubusercontent.com/ElFast-dev/Prisma-Web/360eeb656eb412c0f72c0d3cbaab39e4301cd475/tools/storage-benchmark/concurrency-auto-test/"
FILES = {
    "index.html": "02814721fbd8c9990655d83afcb508743289f496",
    "client.html": "4dce02a125e73c988778e9f453d433ae2a2f8a41",
    "src/auto-client.js": "7030668f7dd840f95ab258bfeb878705d2bb4a09",
    "src/auto-shared-worker.js": "f16e90076c793d027292cec86aa9198e47b9915b",
    "src/auto-db-worker.js": "72ffd800cb1489954841990cf843d161f10b50e4",
    "README.md": "b16ed5f4ed7915a3bbb9f5a08ae5d3178fc9f137",
}

def git_blob_sha(data):
    header = b"blob " + str(len(data)).encode("ascii") + b"\0"
    return sha1(header + data).hexdigest()

def stop(message):
    raise SystemExit("\nINSTALACIÓN CANCELADA: " + message)

if not ROOT.is_dir():
    stop("No existe " + str(ROOT) + ". No se ha escrito ningún archivo.")
if not (ROOT / "serve-coordination.py").is_file():
    stop("No se encontró serve-coordination.py en la carpeta del benchmark.")
if not (ROOT / "node_modules/@sqlite.org/sqlite-wasm/dist/index.mjs").is_file():
    stop("Falta SQLite WASM instalado. No se han tocado dependencias ni archivos.")

downloaded = {}
for relative, expected_sha in FILES.items():
    url = BASE + relative
    try:
        request = Request(url, headers={"User-Agent": "Prisma-Concurrency-Probe-Installer"})
        with urlopen(request, timeout=30) as response:
            data = response.read()
    except Exception as error:
        stop("No se pudo descargar " + relative + ": " + str(error))
    actual_sha = git_blob_sha(data)
    if actual_sha != expected_sha:
        stop("La verificación de integridad falló para " + relative + ". SHA esperado=" + expected_sha + "; SHA descargado=" + actual_sha + ". No se ha modificado ningún archivo.")
    downloaded[relative] = data

conflicts = []
for relative, expected_sha in FILES.items():
    target = DEST / relative
    if target.is_symlink():
        conflicts.append(relative + " (enlace simbólico)")
    elif target.exists():
        if not target.is_file():
            conflicts.append(relative + " (no es un archivo)")
        elif git_blob_sha(target.read_bytes()) != expected_sha:
            conflicts.append(relative + " (contenido local diferente)")
if conflicts:
    stop("Se detectaron archivos locales distintos; no se sobrescribió ninguno: " + ", ".join(conflicts))

written = []
unchanged = []
with TemporaryDirectory(prefix=".prisma-concurrency-install-", dir=str(ROOT)) as temp_name:
    temp_root = Path(temp_name)
    for relative, data in downloaded.items():
        temp_file = temp_root / relative
        temp_file.parent.mkdir(parents=True, exist_ok=True)
        temp_file.write_bytes(data)
    for relative, expected_sha in FILES.items():
        target = DEST / relative
        if target.is_file() and git_blob_sha(target.read_bytes()) == expected_sha:
            unchanged.append(relative)
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        os.replace(str(temp_root / relative), str(target))
        written.append(relative)

print("SONDA DE CONCURRENCIA INSTALADA Y VERIFICADA")
print("Archivos nuevos/actualizados: " + str(len(written)))
for name in written:
    print("  + " + name)
print("Archivos que ya estaban actualizados: " + str(len(unchanged)))
for name in unchanged:
    print("  = " + name)

url = "http://127.0.0.1:18767/concurrency-auto-test/"
try:
    with socket.create_connection(("127.0.0.1", 18767), timeout=1):
        pass
    try:
        request = Request(url, headers={"Cache-Control": "no-cache"})
        with urlopen(request, timeout=3) as response:
            ready = response.status == 200
        if ready:
            print("Servidor local activo y página accesible. No hace falta reiniciarlo.")
        else:
            print("El servidor responde, pero no confirmó la página nueva. Revisa la ruta antes de ejecutarla.")
    except URLError as error:
        print("El servidor responde, pero la ruta aún no está accesible: " + str(error))
except OSError:
    print("Archivos instalados. El servidor local no está activo.")
    print("Para iniciarlo: python " + str(ROOT / "serve-coordination.py"))

print("Abre en Brave: " + url)
print("La prueba utiliza solo datos sintéticos. No toca V4, V8 ni datos de Prisma.")
