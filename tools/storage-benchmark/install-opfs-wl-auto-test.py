#!/usr/bin/env python3
"""Instala OPFS-WL AutoTest V1 sin reemplazar archivos locales distintos."""
from hashlib import sha1
from pathlib import Path
from tempfile import TemporaryDirectory
from urllib.request import Request, urlopen
from urllib.error import URLError
import os
import socket

ROOT = Path.home() / "prisma-storage-benchmark"
BASE = (
    "https://raw.githubusercontent.com/ElFast-dev/Prisma-Web/"
    "af7c8bce0d10db2b8bb6ffe13edc7e84a6568d27/tools/storage-benchmark/"
)
FILES = {
    "opfs-wl-auto-test/index.html": "03e4f9c0fc2eaf2dcbb053dbbcc2eb810ead2afd",
    "opfs-wl-auto-test/src/opfs-wl-db-worker.js": "dae96e4f1549844791dce4ac219606a5c1371085",
    "opfs-wl-auto-test/README.md": "b518053cdebe6424201c2513ef02d9c90df984f7",
    "serve-opfs-wl.py": "b34bcb4c8b174b6d702e1e42197fdf2bb527a9bd",
}

def git_blob_sha(data):
    header = b"blob " + str(len(data)).encode("ascii") + b"\0"
    return sha1(header + data).hexdigest()

def stop(message):
    raise SystemExit("\nINSTALACIÓN CANCELADA: " + message)

if not ROOT.is_dir():
    stop("No existe " + str(ROOT) + ". No se ha escrito ningún archivo.")
if not (ROOT / "serve-coordination.py").is_file():
    stop("No se encontró serve-coordination.py. Se esperaba el entorno de pruebas existente.")
if not (ROOT / "node_modules/@sqlite.org/sqlite-wasm/dist/index.mjs").is_file():
    stop("Falta SQLite WASM instalado. No se han tocado dependencias ni archivos.")

downloaded = {}
for relative, expected_sha in FILES.items():
    url = BASE + relative
    try:
        request = Request(url, headers={"User-Agent": "Prisma-OPFS-WL-Installer"})
        with urlopen(request, timeout=30) as response:
            data = response.read()
    except Exception as error:
        stop("No se pudo descargar " + relative + ": " + str(error))
    actual_sha = git_blob_sha(data)
    if actual_sha != expected_sha:
        stop(
            "Falló la verificación de integridad de " + relative +
            ". SHA esperado=" + expected_sha + "; SHA descargado=" + actual_sha +
            ". No se ha modificado ningún archivo."
        )
    downloaded[relative] = data

conflicts = []
for relative, expected_sha in FILES.items():
    target = ROOT / relative
    if target.is_symlink():
        conflicts.append(relative + " (enlace simbólico)")
    elif target.exists():
        if not target.is_file():
            conflicts.append(relative + " (no es un archivo)")
        elif git_blob_sha(target.read_bytes()) != expected_sha:
            conflicts.append(relative + " (contenido local diferente)")
if conflicts:
    stop(
        "Hay archivos locales distintos; no se sobrescribió ninguno: " +
        ", ".join(conflicts)
    )

written = []
unchanged = []
with TemporaryDirectory(prefix=".prisma-opfs-wl-install-", dir=str(ROOT)) as temp_name:
    temp_root = Path(temp_name)
    for relative, data in downloaded.items():
        temp_file = temp_root / relative
        temp_file.parent.mkdir(parents=True, exist_ok=True)
        temp_file.write_bytes(data)

    for relative, expected_sha in FILES.items():
        target = ROOT / relative
        if target.is_file() and git_blob_sha(target.read_bytes()) == expected_sha:
            unchanged.append(relative)
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        os.replace(str(temp_root / relative), str(target))
        written.append(relative)

print("OPFS-WL AUTOTEST V1 INSTALADA Y VERIFICADA")
print("Archivos nuevos/actualizados: " + str(len(written)))
for name in written:
    print("  + " + name)
print("Archivos que ya estaban actualizados: " + str(len(unchanged)))
for name in unchanged:
    print("  = " + name)

url = "http://127.0.0.1:18768/opfs-wl-auto-test/"
try:
    with socket.create_connection(("127.0.0.1", 18768), timeout=1):
        pass
    try:
        request = Request(url, headers={"Cache-Control": "no-cache"})
        with urlopen(request, timeout=3) as response:
            ready = response.status == 200
        if ready:
            print("Servidor OPFS-WL activo y página accesible. No hace falta reiniciarlo.")
        else:
            print("El servidor responde, pero no confirmó la página OPFS-WL.")
    except URLError as error:
        print("El puerto 18768 responde, pero la página no está accesible: " + str(error))
except OSError:
    print("Archivos verificados. El servidor OPFS-WL aún no está iniciado.")
    print("Para iniciarlo en una nueva sesión de Termux:")
    print('  cd "$HOME/prisma-storage-benchmark"')
    print("  python serve-opfs-wl.py")

print("El servidor del puerto 18767 no se ha detenido ni reiniciado.")
print("Abre en Brave: " + url)
print("Usa únicamente datos sintéticos; V4, V8 y los datos de Prisma permanecen aislados.")
