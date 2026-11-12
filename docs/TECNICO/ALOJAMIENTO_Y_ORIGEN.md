# Alojamiento, dominio y origen — Prisma Web

**Estado:** decisión pendiente y bloqueante antes del primer despliegue con datos reales.  
**Recomendación técnica actual:** Cloudflare Pages con integración GitHub y un subdominio dedicado `*.pages.dev`, o un dominio propio dedicado conectado a Cloudflare Pages.

## 1. Requisito de origen

Prisma almacena datos mediante APIs del navegador asociadas al origen web. El origen está formado por protocolo, hostname y puerto; la ruta no crea un aislamiento de origen. Por tanto, alojar un proyecto bajo `https://elfast-dev.github.io/Prisma` no separa IndexedDB de otros proyectos bajo `https://elfast-dev.github.io`.

No utilizar un hostname provisional para el diario real. Antes de instalar Prisma con datos personales hay que decidir el origen HTTPS de producción y mantenerlo estable.

## 2. Primera opción: Cloudflare Pages

Recomiendo evaluar Cloudflare Pages con GitHub Integration.

La documentación oficial confirma:
- conexión de un proyecto Pages a un repositorio GitHub;
- despliegue automático al hacer push a una rama;
- despliegues de vista previa para ramas y Pull Requests;
- URLs de preview por commit/branch;
- estado de despliegue y checks visibles en el repositorio GitHub;
- hostname de proyecto bajo `*.pages.dev`.

Para Prisma esto permite que la IA publique cambios web y que Cloudflare reconstruya y despliegue la PWA sin generar APK. Las previews permiten revisar una propuesta antes de promoverla a producción.

**Precaución:** Cloudflare indica que, una vez creado un proyecto mediante Git Integration, no se puede cambiar ese mismo proyecto a Direct Upload. Conviene crear el proyecto con Git Integration desde el principio. La integración requiere instalar/autorizar la GitHub App de Cloudflare y conceder acceso al repositorio correspondiente.

Fuentes oficiales:
- https://developers.cloudflare.com/pages/configuration/git-integration/
- https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/
- https://developers.cloudflare.com/pages/configuration/preview-deployments/
- https://developers.cloudflare.com/pages/platform/known-issues/

## 3. Hostname propuesto

Primera opción a comprobar al crear el proyecto: `https://prisma.pages.dev`.

No se afirma que esté disponible. Cloudflare asigna un subdominio único al proyecto; si el nombre está ocupado, escoger un nombre estable y exclusivo para Prisma, por ejemplo `prisma-elfast.pages.dev`, y registrarlo aquí antes del primer despliegue que almacene datos reales.

Alternativa preferida a largo plazo: un subdominio de dominio propio dedicado (si el propietario dispone de uno), apuntando a Cloudflare Pages. No inventar ni asumir que el usuario posee un dominio.

**No conectar el repositorio a Cloudflare Pages hasta que se haya renombrado `Prisma-Web` a `Prisma`**, para evitar tener que reparar la integración por el cambio de nombre del repositorio.

## 4. Producción y previews

- La rama `main` será la rama de producción.
- Los Pull Requests y ramas de trabajo obtendrán previews de Cloudflare.
- Cada preview es un origen distinto: no debe leer, importar ni utilizar la base de datos de producción.
- No usar tokens reales de TMDB ni secretos productivos en previews.
- La aplicación debe detectar el entorno y deshabilitar import/export de datos reales en previews.
- El manifiesto y Service Worker de producción deben tener `start_url` y `scope` correspondientes al hostname canónico.
- Nunca instalar la preview como aplicación principal ni guardar el diario personal en ella.

## 5. Requisitos de producción

- HTTPS obligatorio.
- Hostname dedicado y estable.
- No cambiar protocolo, hostname o puerto después de guardar datos reales.
- No publicar el mismo Service Worker en el hostname de producción y en previews.
- No cachear HTML/API de forma que una actualización mezcle versiones incompatibles.
- Previews no utilizan la base de datos ni credenciales de producción.
- Producción solo desde la rama principal aprobada.
- Cambios de hosting/origen requieren plan de migración de datos probado y autorización del propietario.

## 6. Alternativas

- Dominio propio conectado a Cloudflare Pages u otro hosting estático.
- GitHub Pages con dominio personalizado dedicado; evitar el subdirectorio compartido `usuario.github.io/Prisma` para datos personales.
- Otro hosting estático con hostname propio, HTTPS, integración GitHub, previews y reglas de caché apropiadas para PWA.

## 7. Decisión necesaria

Antes de Fase 1 y de guardar datos reales, aprobar:
1. proveedor de hosting;
2. hostname exacto;
3. rama de producción;
4. política de preview;
5. estrategia de migración si el origen debe cambiar en el futuro.

La elección define el origen de IndexedDB, Cache Storage y OPFS y no es un detalle cosmético.

## Fuentes de origen web

- MDN — definición de origen: https://developer.mozilla.org/en-US/docs/Glossary/Origin
- MDN — separación de IndexedDB por origen: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Terminology
- GitHub Docs — renombrar repositorios: https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository
