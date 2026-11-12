# Alojamiento, dominio y origen — Prisma Web

**Estado:** decisión pendiente y bloqueante antes del primer despliegue con datos reales.

## 1. Requisito de origen

Prisma almacena datos mediante APIs del navegador asociadas al origen web. El origen está formado por protocolo, hostname y puerto; la ruta no crea un aislamiento de origen. Por tanto, alojar un proyecto bajo `https://elfast-dev.github.io/Prisma` no separa IndexedDB de otros proyectos bajo `https://elfast-dev.github.io`.

No utilizar un hostname provisional para el diario real. Antes de instalar Prisma con datos personales hay que decidir el origen HTTPS de producción y mantenerlo estable.

## 2. Recomendación inicial

Evaluar **Cloudflare Pages con integración GitHub**, usando un subdominio de proyecto único `*.pages.dev` o un dominio propio dedicado.

Ventajas documentadas:
- conexión directa con repositorio GitHub;
- despliegue automático por push;
- previews de ramas y Pull Requests;
- estados de build visibles en GitHub;
- hosting estático, sin necesidad de backend.

Fuentes oficiales:
- https://developers.cloudflare.com/pages/configuration/git-integration/
- https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/

La integración requiere autorizar e instalar la GitHub App de Cloudflare Pages sobre el repositorio seleccionado. No se presupone que la cuenta Cloudflare exista ni que ese permiso esté concedido.

## 3. Alternativas

- Dominio propio apuntando a Cloudflare Pages u otro hosting estático.
- GitHub Pages solo con un dominio personalizado dedicado; evitar el subdirectorio compartido de `github.io` para datos personales.
- Otro hosting estático que proporcione un hostname propio y soporte HTTPS, despliegue desde GitHub, previews y reglas de caché para PWA.

## 4. Requisitos de producción

- HTTPS obligatorio.
- Hostname dedicado y estable.
- Manifest y Service Worker con `start_url`/`scope` coherentes.
- No cambiar dominio/origen después de tener datos reales.
- No cachear HTML/API de forma que una actualización mezcle versiones de forma incompatible.
- Previews de PR no deben utilizar base de datos ni credenciales de producción.
- Producción solo desde la rama principal aprobada.

## 5. Decisión a tomar

Aprobar el proveedor de hosting y el nombre exacto del hostname antes de la primera instalación con datos importantes. La elección define el origen del almacenamiento y no es un detalle cosmético.
