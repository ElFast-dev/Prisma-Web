# Revisión de Firebase Hosting clásico en Spark · 13 de noviembre de 2026

**Estado: candidato para hosting estático; no aprobado ni creado.** Cloudflare Pages permanece rechazado. No crear proyecto, sitio, dominio, facturación ni despliegue desde este trabajo.

## Qué incluye Spark

La página oficial indica que Spark es el plan sin coste y no requiere método de pago. Para Firebase Hosting clásico:
- Hasta 10 GB de almacenamiento de contenido Hosting sin coste.
- Hasta 10 GB al mes de transferencia CDN sin coste.
- Los límites son del proyecto, no de cada sitio.
- Cada archivo individual no puede superar 2 GB.
- En Spark, al agotar 10 GB de almacenamiento, no se pueden publicar nuevas versiones hasta liberar versiones antiguas o cambiar de plan.
- En Spark, al superar 10 GB/mes de transferencia, tras un breve periodo de gracia los sitios pueden quedar deshabilitados hasta el siguiente mes.
- Al permanecer en Spark el exceso no se factura. Pasar a Blaze cambia a facturación por uso y queda prohibido para Prisma.

Los límites no garantizan disponibilidad continua: el principal riesgo del nivel gratuito es que el sitio puede quedar bloqueado temporalmente al agotar la cuota.

## Cambio de creación de sitio desde el 15-10-2026

Firebase ya no crea automáticamente el sitio Hosting predeterminado al crear un proyecto nuevo o añadir Firebase a un proyecto Cloud. El sitio se crea bajo demanda.

La primera Hosting Site creada en el proyecto pasa a ser el sitio predeterminado. El ID genera estos subdominios:
- SITE_ID.web.app
- SITE_ID.firebaseapp.com

La documentación indica que no se puede cambiar ni eliminar el sitio predeterminado una vez creado. Por eso hay que aprobar el Site ID exacto antes de ejecutar firebase hosting:sites:create SITE_ID o cualquier flujo que lo cree implícitamente.

No seleccionar ni reservar un ID por iniciativa del agente. No crear una Firebase Web App ni activar Authentication para esta PWA estática; ninguna es necesaria para publicar archivos y algunos flujos pueden provocar la creación implícita del sitio.

## Límites de alcance

- Solo archivos estáticos.
- Sin Cloud Functions, backend, Firestore, Storage, Authentication, Analytics ni otros servicios remotos.
- SQLite/OPFS permanece exclusivamente en el navegador del propietario.
- No asociar tarjeta ni activar Blaze.
- Utilizar el hostname web.app estable que proporcione el Site ID aprobado. No hace falta comprar dominio para empezar.

## Fuentes oficiales

- Precios: https://firebase.google.com/pricing
- Cuotas Hosting: https://firebase.google.com/docs/hosting/usage-quotas-pricing
- Sitio predeterminado y cambio del 15-10-2026: https://firebase.google.com/docs/hosting/default-site
- Sitios múltiples e IDs: https://firebase.google.com/docs/hosting/multisites

## Condición pendiente

Antes de crear nada, el propietario debe aprobar expresamente el Project ID exacto y el Site ID exacto. Después se comprobará la disponibilidad y que la cuenta permanece en Spark, sin tarjeta ni facturación.
