# Alojamiento y origen — Prisma

**Estado:** decisión pendiente.  
**Restricción obligatoria:** coste total de 0 USD.  
**Cloudflare Pages:** rechazado por el propietario.

## Condiciones obligatorias

- Precio de 0 USD sin período de prueba.
- No exigir tarjeta ni método de pago para publicar y mantener el sitio.
- No activar facturación automática ni consumo variable.
- No depender de funciones, bases de datos o almacenamiento que requieran un plan superior.
- Servir archivos estáticos por HTTPS.
- Permitir un origen estable para la PWA.
- Explicar las cuotas y qué sucede al alcanzarlas.
- No obligar a comprar un dominio; se prefiere el subdominio gratuito del proveedor.

Una alternativa que detenga una función esencial hasta contratar un plan superior queda descartada. Si una cuota puede suspender toda la aplicación, el riesgo debe quedar documentado y ser aceptado expresamente.

## Candidato principal: GitHub Pages

GitHub Pages puede publicar archivos estáticos desde un repositorio público con GitHub Free. El repositorio actual es público. No se necesita comprar dominio y los sitios `github.io` admiten HTTPS.

URL de proyecto candidata cuando el repo tenga el nombre final:

`https://elfast-dev.github.io/Prisma/`

La PWA tendría que funcionar bajo `/Prisma/`: base de recursos, `start_url`, `scope`, manifest y alcance del Service Worker deben configurarse y probarse. No se implementará hasta comprobarlo en Chrome Android.

Límites oficiales documentados:
- tamaño máximo publicado de 1 GB;
- ancho de banda flexible de 100 GB por mes;
- límite flexible de 10 compilaciones por hora, exceptuado cuando se usa un workflow personalizado de GitHub Actions;
- despliegues que tarden más de 10 minutos expiran.

Si se exceden las cuotas, GitHub puede limitar o dejar de servir el sitio. No se debe suponer disponibilidad ilimitada. Los runners estándar de GitHub Actions en repositorios públicos son gratuitos.

## Riesgo de origen compartido

`https://elfast-dev.github.io/Prisma/` y otros sitios de proyecto del mismo usuario comparten el origen `https://elfast-dev.github.io`. La ruta `/Prisma/` no crea un límite de seguridad separado para IndexedDB, Cache Storage ni otras APIs asociadas al origen.

Por tanto:
- no afirmar que el subdirectorio aísla los datos;
- no alojar contenido ajeno o no confiable bajo el mismo hostname;
- comprobar si la cuenta ya publica otros sitios GitHub Pages;
- aceptar expresamente si ese nivel de aislamiento es suficiente para el diario local.

La conexión GitHub consultada mostró los repositorios `Prisma` y `Prisma-Web`; eso no basta para demostrar que no existan otras publicaciones Pages en la cuenta.

## Opciones descartadas o no seleccionadas

- **Cloudflare Pages:** rechazado expresamente.
- **Netlify Free, Render Free y Vercel Hobby:** no se eligen por defecto. Sus niveles gratuitos tienen cuotas y condiciones propias. Antes de considerarlos hay que verificar qué ocurre al agotarlas y si una capacidad esencial exige pagar.
- **Dominio propio:** no se presupone que el propietario tenga uno y no se comprará uno para Prisma.

## Producción, previews y datos

- No guardar datos reales en una preview o URL temporal.
- No usar tokens reales de TMDB en pruebas o previews.
- Mantener estable el hostname de producción una vez que existan datos.
- Las previews no acceden a credenciales ni al diario de producción.
- Todo cambio de origen requiere exportación, restauración y verificación antes de abandonar el origen anterior.

## Decisión pendiente

GitHub Pages es solo un candidato. Antes de habilitar Pages se debe aprobar la URL exacta, aceptar el origen compartido y sus límites, y definir cómo se publicará desde el repositorio `Prisma`. No conectar ningún hosting hasta cerrar estos puntos.

## Fuentes oficiales

- [Crear un sitio GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Límites de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Facturación de GitHub Actions](https://docs.github.com/en/billing/concepts/product-billing/github-actions)
- [HTTPS en GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
