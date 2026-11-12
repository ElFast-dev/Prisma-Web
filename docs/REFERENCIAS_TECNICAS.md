# Referencias técnicas de Prisma Web

Fuentes oficiales consultadas para el diseño de la PWA. Las decisiones concretas y las pruebas en el teléfono prevalecen sobre suposiciones.

## Almacenamiento web

- MDN — StorageManager, cuotas y persistencia: https://developer.mozilla.org/en-US/docs/Web/API/StorageManager
- MDN — StorageManager.persist(): https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist
- MDN — Cuotas y criterios de eliminación: https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
- MDN — IndexedDB: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
- MDN — OPFS: https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system

## Seguridad

- MDN — Web Crypto API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
- MDN — CryptoKey.extractable: https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey/extractable
- OWASP — Password Storage Cheat Sheet (parámetros Argon2id/PBKDF2): https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- MDN — Content Security Policy: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP

## PWA y procesamiento

- MDN — Service Worker API: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- MDN — Web Workers: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
- Chrome Developers — File System Access API: https://developer.chrome.com/docs/capabilities/web-apis/file-system-access
- vite-plugin-pwa — documentación: https://vite-pwa-org.netlify.app/
- vite-plugin-pwa — React update prompt: https://vite-pwa-org.netlify.app/frameworks/react

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

- MDN — Origin: https://developer.mozilla.org/en-US/docs/Glossary/Origin
- Cloudflare Pages — Integración GitHub: https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/
- Cloudflare Pages — Integración Git: https://developers.cloudflare.com/pages/configuration/git-integration/
