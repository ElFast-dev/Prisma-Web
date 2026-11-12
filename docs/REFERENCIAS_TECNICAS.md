# Referencias técnicas de Prisma Web

Fuentes oficiales consultadas para el diseño de la PWA. Las decisiones concretas y las pruebas en el teléfono prevalecen sobre suposiciones.

## Almacenamiento web

- MDN — StorageManager, cuotas y persistencia: https://developer.mozilla.org/en-US/docs/Web/API/StorageManager
- MDN — StorageManager.persist(): https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist
- MDN — Cuotas y criterios de eliminación: https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
- MDN — IndexedDB: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
- MDN — OPFS: https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system

## Almacenamiento local — investigación actualizada

- Dexie — versiones publicadas: https://github.com/dexie/Dexie.js/releases
- Dexie — esquema y migraciones: https://dexie.org/docs/Version/Version
- Dexie — transacciones: https://dexie.org/docs/Dexie/Dexie.transaction()
- Dexie — opciones de constructor y durabilidad Chrome: https://dexie.org/docs/Dexie/Dexie
- idb — wrapper de IndexedDB: https://github.com/jakearchibald/idb
- SQLite Wasm — novedades y versiones: https://www.sqlite.org/wasm/doc/trunk/news.md
- SQLite Wasm — persistencia OPFS y VFS: https://sqlite.org/wasm/doc/tip/persistence.md
- SQLite — dominio público: https://www.sqlite.org/copyright.html
- MDN — IndexedDB transacciones y durabilidad: https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/transaction
- MDN — IDBTransaction.durability: https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction/durability
- MDN — Storage API, cuotas y eviction: https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
- MDN — crossOriginIsolated: https://developer.mozilla.org/en-US/docs/Web/API/Window/crossOriginIsolated
- MDN — Atomics.waitAsync: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/waitAsync

## Seguridad

- MDN — Web Crypto API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
- MDN — CryptoKey.extractable: https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey/extractable
- OWASP — Password Storage Cheat Sheet (parámetros Argon2id/PBKDF2): https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- MDN — Content Security Policy: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP

## PWA y procesamiento

- MDN — Service Worker API: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- MDN — Web Workers: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
- Chrome Developers — File System Access API: https://developer.chrome.com/docs/capabilities/web-apis/file-system-access
- MDN — Web App Manifest: https://developer.mozilla.org/en-US/docs/Web/Manifest
- MDN — Service Worker API: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

No se selecciona todavía ninguna biblioteca PWA específica. Estas referencias explican APIs web; no prescriben React, Vite ni un plugin.

## GitHub

- GitHub Docs — Renombrar repositorios: https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository
- GitHub REST — Repositorios (actualizar/eliminar requieren permisos de administración): https://docs.github.com/en/rest/repos/repos

## TMDB

- Autenticación: https://developer.themoviedb.org/docs/authentication-application
- Búsqueda: https://developer.themoviedb.org/docs/finding-data
- Imágenes: https://developer.themoviedb.org/docs/image-basics
- Referencia de API: https://developer.themoviedb.org/reference/intro/getting-started

## Notas

Las cuotas del navegador son variables, no una reserva de capacidad. La persistencia puede denegarse y el usuario siempre puede borrar los datos del sitio. File System Access y OPFS son APIs de capacidades que deben detectarse en ejecución. Web Crypto no es equivalente a Android Keystore.


## Hosting y origen

Cloudflare Pages fue rechazado por el propietario; sus enlaces dejan de ser una recomendación activa.

- MDN — Origin: https://developer.mozilla.org/en-US/docs/Glossary/Origin
- GitHub Docs — Crear un sitio GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- GitHub Docs — Límites de GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- GitHub Docs — Facturación de GitHub Actions: https://docs.github.com/en/billing/concepts/product-billing/github-actions
- GitHub Docs — HTTPS en GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https

Los proveedores y límites se vuelven a verificar antes de habilitar un alojamiento. No asumir que un plan gratuito es ilimitado ni que es aceptable para el proyecto.
