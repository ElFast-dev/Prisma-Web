#!/usr/bin/env python3
"""Servidor local para probar SharedWorker + SQLite SAH pool sin COOP/COEP."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import mimetypes

ROOT = Path(__file__).resolve().parent
HOST = "127.0.0.1"
PORT = 18767

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
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"Prisma SharedWorker probe: http://{HOST}:{PORT}/coordination.html")
    print("COOP/COEP no se configuran: SAH pool no los necesita.")
    print("Mantén Termux abierto. Detén con Ctrl+C.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
    finally:
        server.server_close()
