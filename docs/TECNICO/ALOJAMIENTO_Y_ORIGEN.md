# Alojamiento y origen — Prisma

**Estado:** investigación comparativa actualizada el 12 de noviembre de 2026; falta aprobación del propietario del hosting y hostname definitivo.  
**Coste obligatorio:** 0 USD, sin tarjeta, billing account ni consumo que pueda generar cargos.  
**Cloudflare Pages:** rechazado expresamente; no volver a recomendarlo.

## Condiciones de aceptación

- Hosting estático HTTPS, estable y con un hostname propio para Prisma.
- Sin backend, base de datos remota, autenticación remota ni almacenamiento de diario.
- Sin método de pago ni facturación automática.
- La cuota debe tener un límite duro: al agotarse, se suspende el servicio, pero nunca se genera un cargo.
- El origen debe aislar el IndexedDB/OPFS de otros proyectos no confiables.
- El hostname de producción se fija antes de guardar datos personales reales.

La persistencia del navegador se separa por origen (esquema + host + puerto), no por ruta. Una aplicación en una ruta /Prisma/ sobre github.io comparte el origen con otros sitios de proyecto del mismo usuario; el subdirectorio no crea aislamiento. Fuente: [MDN — Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy).

## Comparativa verificada

### 1. Firebase Hosting clásico — Spark

**Candidato recomendado actualmente.**

- El plan Spark es gratuito y no requiere método de pago. Se usará exclusivamente Firebase Hosting clásico para archivos estáticos; no se activarán App Hosting, Functions, Firestore, Storage ni servicios de pago.
- Cada Hosting site puede tener un hostname SITE_ID.web.app y su alias SITE_ID.firebaseapp.com. Se elegirá uno solo como URL canónica y se mantendrá estable.
- Desde el 15 de octubre de 2026, Firebase ya no crea automáticamente el sitio Hosting predeterminado al crear el proyecto; debe crearse explícitamente. Esto no impide usar el hosting estático, pero es un paso de configuración adicional.
- Cuota gratuita: 10 GB de contenido almacenado y 10 GB/mes de transferencia CDN por proyecto.
- En Spark, si se alcanza el límite de almacenamiento no se pueden desplegar nuevos contenidos hasta liberar espacio; si se alcanza el límite de transferencia, después de un breve período de gracia los sitios se desactivan hasta el mes siguiente. No hay facturación mientras el proyecto permanezca en Spark. Cambiar a Blaze permitiría cargos; queda prohibido para Prisma.

**Ventajas:** hostname separado, HTTPS, cuota clara, sin tarjeta y sin cobro automático; 10 GB/mes es suficiente como candidato para una PWA personal estática con imágenes cinematográficas servidas directamente por el catálogo externo y no desde Hosting.

**Riesgos:** 10 GB/mes es menor que otros niveles gratuitos; al agotarse se pierde disponibilidad hasta el reinicio mensual. El propietario debe aprobar el ID de proyecto/sitio y mantener Spark sin vincular facturación.

Fuentes oficiales: [Firebase Pricing — Spark sin método de pago](https://firebase.google.com/pricing), [cuotas de Hosting](https://firebase.google.com/docs/hosting/usage-quotas-pricing), [dominio del sitio predeterminado](https://firebase.google.com/docs/hosting/default-site), [inicio rápido y rewrite SPA](https://firebase.google.com/docs/hosting/quickstart).

### 2. Vercel Hobby

- Precio publicado: 0 USD; el plan Hobby se limita a proyectos personales o no comerciales.
- La tabla de precios incluye 100 GB/mes de transferencia rápida y 1 millón de solicitudes CDN mensuales.
- Cuando una cuenta Hobby supera el uso gratuito, los proyectos se pausan; el plan Hobby no permite comprar uso adicional.
- Sus términos reservan a Vercel la capacidad de suspender o retirar proyectos/despliegues Hobby con o sin aviso, a su discreción.

**Conclusión:** técnicamente válido para una PWA personal y con límites más amplios que Firebase, pero sus condiciones de suspensión discrecional lo hacen menos conveniente como origen de un diario que debe permanecer disponible. No se elige como primera opción.

Fuentes: [precios Vercel](https://vercel.com/pricing), [límites/plan Hobby](https://vercel.com/docs/plans/hobby), [términos — Hobby](https://vercel.com/legal/terms).

### 3. GitHub Pages

- Disponible gratis para repositorios públicos.
- Límite publicado de 1 GB por sitio, 100 GB/mes de ancho de banda suave y 10 builds por hora (con excepción para workflow personalizado de GitHub Actions).
- Los sitios de proyecto se alojan normalmente bajo una ruta del usuario; todos comparten el hostname USUARIO.github.io como origen.

**Conclusión:** no recomendado para Prisma por el origen compartido. Una ruta distinta no separa IndexedDB, Cache Storage ni OPFS de otros proyectos en el mismo hostname. La cuota de ancho de banda también es suave, no un límite duro de continuidad.

Fuente oficial: [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

### 4. Netlify Free

- 0 USD con 300 créditos mensuales.
- Al agotarse la cuota, los sitios/proyectos de la cuenta entran en pausa hasta el siguiente ciclo. El recargo automático es una opción, no debe activarse.
- Aunque el plan gratuito tiene límites duros, la pausa conjunta de todos los proyectos de la cuenta añade un riesgo innecesario.

**Conclusión:** técnicamente sirve, pero no es preferible para el origen estable de Prisma.

Fuentes: [precios](https://www.netlify.com/pricing/), [FAQ de créditos](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans/).

### 5. Render Static Sites

- Los sitios estáticos son gratuitos y cada uno recibe una URL onrender.com única.
- El plan Hobby incluye 5 GB mensuales de ancho de banda saliente por workspace. Si se agrega un método de pago y se supera la cuota, se factura el exceso; sin método de pago, los servicios se suspenden hasta el mes siguiente.
- También hay límites compartidos de minutos de pipeline.

**Conclusión:** la cuota de 5 GB y el riesgo de sobrecoste al asociar un método de pago lo hacen menos adecuado.

Fuentes: [Static Sites](https://render.com/docs/static-sites), [Outbound Bandwidth](https://render.com/docs/outbound-bandwidth), [Free plan](https://render.com/docs/free).

## Recomendación y guardas de coste

Firebase Hosting clásico en Spark es la primera opción que propongo. El plan debe permanecer en Spark durante toda la vida de Prisma; no añadir tarjeta ni asociar facturación de Google Cloud. Si el producto se acerca a los límites, se optimizará o se evaluará otra opción gratuita antes de cualquier cambio de plan.

No se ha creado el proyecto Firebase, no se ha reservado un site ID y no se ha conectado ningún hosting. El propietario debe aprobar la alternativa y el hostname exacto antes de usarlo como origen de producción.

## Origen, privacidad y despliegues

- Una única URL canónica de producción; no alternar entre web.app y firebaseapp.com.
- Un proyecto Firebase dedicado solo a Prisma Hosting; sin datos del diario en Google/Firebase.
- Las previews no reciben datos reales ni credenciales.
- La configuración es estática; ningún endpoint recibe películas, visionados, calificaciones o listas.
- Los archivos de backup cifrados nunca se envían al proveedor de hosting.
- Toda migración futura de origen requiere exportación, restauración y comprobación antes de abandonar el origen anterior.
