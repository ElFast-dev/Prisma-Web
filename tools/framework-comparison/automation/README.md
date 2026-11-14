# Automatización de la comparación de frameworks

Este laboratorio pertenece exclusivamente a `tools/framework-comparison/`. No forma parte de la aplicación Prisma ni guarda datos personales.

## Ejecución automática en GitHub

El workflow `.github/workflows/framework-comparison.yml` instala, audita, compila y prueba las dos muestras cuando se actualiza la rama experimental o se abre una solicitud de integración hacia las ramas configuradas.

El flujo realiza:

1. Instalación reproducible de SvelteKit, React Router y el laboratorio con `npm ci`.
2. Auditoría de dependencias con `npm audit --audit-level=high`.
3. Builds de producción y medición de archivos brutos y gzip.
4. Pruebas unitarias de invariantes del catálogo sintético con Vitest.
5. Pruebas de navegación y comportamiento con Playwright en Chromium móvil (360 × 800).
6. Pruebas de búsqueda, filtros, ordenación, rutas profundas, ficha, calificación y persistencia del tema.
7. Prueba de Service Worker y apertura offline de una ficha que ya se visitó con conexión.
8. Análisis axe de las pantallas principales; las infracciones críticas o graves bloquean el flujo.
9. Conservación del informe HTML, trazas, capturas, resultados axe y archivos de bloqueo como artefactos de GitHub Actions.

## Archivos de bloqueo

Los tres `package-lock.json` ya están versionados en esta rama. Las ejecuciones normales utilizan `npm ci`, que reproduce exactamente las dependencias registradas y falla si el manifiesto y el bloqueo no coinciden.

GitHub Actions conserva los archivos de bloqueo como artefactos de diagnóstico. La automatización también puede registrar en la rama experimental los archivos que genere una primera instalación en un evento de actualización de rama. No se escriben cambios en `main`.

## Consultar resultados

En GitHub abre la pestaña **Actions**, selecciona **Framework comparison · automated checks** y entra en la ejecución más reciente. Los informes se descargan desde **Artifacts**. Una prueba fallida conserva la traza y, cuando corresponde, capturas y vídeo. Los artefactos se conservan durante 14 días.

## Alcance y límites

Las pruebas de Playwright usan Chromium emulado en un ejecutor Linux de GitHub. Automatizan los mismos recorridos en ambas muestras, pero no sustituyen por sí solas la aceptación final en Brave del Galaxy A03.

axe automatiza reglas comprobables, no toda la accesibilidad. El laboratorio tampoco decide preferencias visuales: el propietario conserva la decisión sobre UI/UX.

No se declara ganador por una sola ejecución. La decisión debe considerar los builds, los recorridos automáticos, el comportamiento PWA, las mediciones y la mantenibilidad. Las diferencias específicas de Brave Android deben quedar identificadas por separado.
