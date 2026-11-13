#!/usr/bin/env python3
"""Actualiza solo el Worker OPFS-WL con inicialización de esquema reforzada."""
from hashlib import sha1
from pathlib import Path
from tempfile import TemporaryDirectory
from urllib.request import Request, urlopen
import os

ROOT = Path.home() / "prisma-storage-benchmark"
BASE = (
    "https://raw.githubusercontent.com/ElFast-dev/Prisma-Web/"
    "0cadfb672655a6bb82b6da47540ee68a04589a8a/tools/storage-benchmark/"
)

FILES = {
    "opfs-wl-auto-test/src/opfs-wl-db-worker.js": {
        "expected_current": {
            "dae96e4f1549844791dce4ac219606a5c1371085",
            "fef9b816b1380ff009aafc37a4ac3027a7b0fc9e",
        },
        "target": "704344f9302262b94d9d30e2419a2ffb5cd22323",
    },
}

SERVER = {
    "path": "serve-opfs-wl.py",
    "sha": "b34bcb4c8b174b6d702e1e42197fdf2bb527a9bd",
}


def git_blob_sha(data):
    header = b"blob " + str(len(data)).encode("ascii") + b"\0"
    return sha1(header + data).hexdigest()


def stop(message):
    raise SystemExit("\nACTUALIZACIÓN CANCELADA: " + message)


if not ROOT.is_dir():
    stop("No existe " + str(ROOT) + ". No se ha escrito ningún archivo.")
if not (ROOT / "serve-coordination.py").is_file():
    stop("No se encontró serve-coordination.py; se esperaba el entorno existente.")
if not (ROOT / "node_modules/@sqlite.org/sqlite-wasm/dist/index.mjs").is_file():
    stop("Falta SQLite WASM instalado. No se modificó ninguna dependencia.")

server_path = ROOT / SERVER["path"]
if not server_path.is_file() or git_blob_sha(server_path.read_bytes()) != SERVER["sha"]:
    stop("serve-opfs-wl.py no coincide con la versión verificada. No se sobrescribió.")

downloaded = {}
for relative, spec in FILES.items():
    url = BASE + relative
    try:
        request = Request(url, headers={"User-Agent": "Prisma-OPFS-WL-Revision-3"})
        with urlopen(request, timeout=30) as response:
            data = response.read()
    except Exception as error:
        stop("No se pudo descargar " + relative + ": " + str(error))

    actual = git_blob_sha(data)
    if actual != spec["target"]:
        stop(
            "La descarga de " + relative + " no coincide con el SHA esperado. " +
            "Esperado=" + spec["target"] + "; recibido=" + actual
        )
    downloaded[relative] = data

conflicts = []
for relative, spec in FILES.items():
    target = ROOT / relative
    if target.is_symlink():
        conflicts.append(relative + " (enlace simbólico)")
    elif target.exists():
        if not target.is_file():
            conflicts.append(relative + " (no es un archivo)")
        elif git_blob_sha(target.read_bytes()) not in spec["expected_current"]:
            conflicts.append(relative + " (contenido local distinto de V1 y revisión 2)")
if conflicts:
    stop(
        "Se detectaron cambios locales. No se sobrescribió nada: " +
        ", ".join(conflicts)
    )

updated = []
unchanged = []
with TemporaryDirectory(prefix=".prisma-opfs-wl-revision-3-", dir=str(ROOT)) as temp_name:
    temp_root = Path(temp_name)
    for relative, data in downloaded.items():
        staged = temp_root / relative
        staged.parent.mkdir(parents=True, exist_ok=True)
        staged.write_bytes(data)

    for relative, spec in FILES.items():
        target = ROOT / relative
        if target.is_file() and git_blob_sha(target.read_bytes()) == spec["target"]:
            unchanged.append(relative)
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        os.replace(str(temp_root / relative), str(target))
        updated.append(relative)

print("OPFS-WL AUTOTEST · REVISIÓN 3 INSTALADA Y VERIFICADA")
print("Archivos actualizados: " + str(len(updated)))
for name in updated:
    print("  + " + name)
print("Archivos que ya estaban actualizados: " + str(len(unchanged)))
for name in unchanged:
    print("  = " + name)
print("SQLite WASM y sus dependencias no se modificaron.")
print("No se reinició ningún servidor.")
print("El servidor del puerto 18768 puede seguir activo: el Worker se lee en cada solicitud.")
print("No se tocó ninguna carpeta ni archivo OPFS de ejecuciones anteriores.")
print("En Brave, recarga una sola vez:")
print("  http://127.0.0.1:18768/opfs-wl-auto-test/")
print("Ejecuta una vez y comparte el informe completo, incluidos los diagnósticos.")
