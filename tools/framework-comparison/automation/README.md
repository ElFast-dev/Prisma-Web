# Automatización de la comparación de frameworks

Este laboratorio pertenece exclusivamente a `tools/framework-comparison/`. No forma parte de la aplicación Prisma ni guarda datos personales.

## Ejecución automática en GitHub

El workflow `.github/workflows/framework-comparison.yml` instala, compila y prueba las dos muestras cuando se actualiza la rama experimental o se abre una solicitud de integración hacia `main`.

El flujo realiza:

1. Instalación de dependencias de SvelteKit y React Router.
2. Builds de producción y medición de archivos brutos y gzip.
3. Pruebas unitarias de invariantes del catálogo con Vitest.
4. Pruebas de navegación y comportamiento con Playwright en Chromium, usando un viewport móvil de 360 × 800.
5. Pruebas de búsqueda, filtros, ordenación, rutas profundas, ficha, calificación, temas y persistencia del tema.
6. Prueba automatizada de Service Worker y navegación offline.
7. Análisis axe de las pantallas principales; las infracciones críticas o graves bloquean el flujo.
8. Conservación del informe HTML, trazas, capturas, resultados axe y archivos de bloqueo como artefactos de GitHub Actions.

## Consultar resultados

En GitHub abre la pestaña **Actions**, selecciona **Framework comparison · automated checks** y entra en la ejecución más reciente. Los informes se descargan desde **Artifacts**. Una prueba fallida conserva la traza y, cuando corresponde, capturas y vídeo.

Los archivos de bloqueo se generan en la primera ejecución y se entregan como artefacto para incorporarlos a la rama experimental. Después se cambiará la instalación de CI a `npm ci`, que exige esos archivos.

## Alcance y límites

Las pruebas de Playwright usan Chromium emulado en un ejecutor Linux de GitHub. Esto automatiza los mismos recorridos en ambas muestras, pero no sustituye la aceptación final en Brave del Galaxy A03.

axe automatiza reglas comprobables, no toda la accesibilidad. El laboratorio tampoco decide preferencias visuales: el propietario conserva la decisión sobre UI/UX.

No se declara ganador por el resultado de una sola compilación o ejecución. Se mantienen las tres rondas reales en el Galaxy A03 y las mediciones comparables de las dos muestras.
