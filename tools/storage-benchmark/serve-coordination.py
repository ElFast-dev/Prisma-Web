#!/usr/bin/env python3
"""Servidor aislado para probar SharedWorker + SQLite SAH pool en Prisma."""
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
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"Prisma coordination probe: http://{HOST}:{PORT}/coordination.html")
    print("COOP/COEP activados. Mantén Termux abierto; Ctrl+C para detener.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
    finally:
        server.server_close()
