#!/usr/bin/env python3
"""Servidor aislado para la sonda SQLite OPFS-WL; no afecta al puerto 18767."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlsplit
import mimetypes

ROOT = Path(__file__).resolve().parent
HOST = "127.0.0.1"
PORT = 18768

class Handler(SimpleHTTPRequestHandler):
    extensions_map = {
        **mimetypes.types_map,
        ".mjs": "text/javascript; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".wasm": "application/wasm",
        ".css": "text/css; charset=utf-8",
        ".html": "text/html; charset=utf-8",
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        query = parse_qs(urlsplit(self.path).query)
        requested = query.get("coep", ["require-corp"])[0]
        coep = requested if requested in ("require-corp", "credentialless") else "require-corp"

        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", coep)
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print("Prisma · servidor aislado OPFS-WL")
    print(f"Servidor: http://{HOST}:{PORT}/opfs-wl-auto-test/")
    print(f"Variante credentialless: http://{HOST}:{PORT}/opfs-wl-auto-test/?coep=credentialless")
    print("COOP: same-origin")
    print("COEP: require-corp (por defecto) o credentialless (según la URL)")
    print("Puerto 18767 de Concurrency AutoTest no se modifica.")
    print("Mantén Termux abierto. Detén este servidor con Ctrl+C.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor OPFS-WL detenido.")
    finally:
        server.server_close()
