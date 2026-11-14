# Automatización de la comparación de frameworks

Este laboratorio pertenece exclusivamente a `tools/framework-comparison/`. No forma parte de la aplicación Prisma ni guarda datos personales.

## Ejecución automática en GitHub

El workflow `.github/workflows/framework-comparison.yml` instala, audita, compila y prueba las dos muestras cuando se actualiza la rama experimental o se abre una solicitud de integración hacia las ramas configuradas.

El flujo realiza:

1. Instalación reproducible de SvelteKit, React Router y las herramientas con `npm ci`.
2. Auditoría de dependencias con `npm audit --audit-level=high`.
3. Builds de producción y medición de archivos brutos y gzip.
4. Pruebas unitarias de invariantes del catálogo sintético con Vitest.
5. Pruebas de navegación y comportamiento con Playwright en Chromium móvil (360 × 800).
6. Pruebas de búsqueda, filtros, ordenación, rutas profundas, ficha, calificación y persistencia del tema.
7. Prueba de Service Worker y apertura offline de una ficha que ya se visitó con conexión.
8. Análisis axe de las pantallas principales; las infracciones críticas o graves bloquean el flujo.
9. Tres auditorías Lighthouse por cada URL de cada framework: Descubrir, Personal y ficha.
10. Conservación de informes HTML/JSON, resumen comparativo, trazas, capturas, resultados axe y archivos de bloqueo como artefactos de GitHub Actions.

## Lighthouse CI

Se usa Lighthouse CI 0.16.1. Cada candidato se sirve desde su build de producción en un servidor local de GitHub Actions y se mide con el mismo perfil móvil emulado. Se recogen tres ejecuciones por pantalla para reducir variaciones naturales; Lighthouse selecciona una ejecución representativa para el resumen.

Los informes se guardan exclusivamente en el sistema de archivos del ejecutor y se adjuntan a los artefactos de GitHub Actions durante 14 días. No se usa almacenamiento temporal público ni un servidor de informes externo.

Durante esta fase, Lighthouse es informativo: no se fijan límites de puntuación ni se bloquea la compilación por una nota variable. Primero se compararán los resultados representativos y las métricas individuales; los umbrales se decidirán cuando exista una línea base.

Las puntuaciones son de Chromium y emulación móvil, no mediciones del Galaxy A03 real. Sirven para comparar ambos builds en el mismo entorno, no para afirmar que el teléfono tendrá exactamente esos tiempos.

El resumen `lighthouse-summary.md` muestra las puntuaciones y métricas principales de las tres pantallas para cada candidato. Los informes detallados HTML y JSON permiten investigar diferencias.

## Archivos de bloqueo

Los tres `package-lock.json` están versionados en esta rama. GitHub Actions verifica la instalación reproducible con `npm ci`; en la primera actualización de una dependencia, `npm install` refresca el bloqueo y `npm ci` comprueba que puede reproducirse. Los cambios de lockfile se guardan únicamente en la rama experimental.

## Consultar resultados

En GitHub abre la pestaña **Actions**, selecciona **Framework comparison · automated checks** y entra en la ejecución más reciente. Descarga **Artifacts** para ver el informe HTML de Playwright, las trazas/capturas de fallos y la carpeta Lighthouse con todos los informes y el resumen.

## Alcance y límites

Playwright y Lighthouse usan Chromium en un ejecutor Linux con emulación móvil. Automatizan recorridos y comparan de manera consistente los dos candidatos, pero no sustituyen la comprobación de diferencias concretas de Brave Android ni las limitaciones reales del Galaxy A03.

axe automatiza reglas comprobables, no toda la accesibilidad. El laboratorio tampoco decide preferencias visuales: el propietario conserva la decisión sobre UI/UX.

No se declara ganador por una sola ejecución o por una puntuación aislada. La decisión debe considerar builds, pruebas funcionales, métricas Lighthouse repetidas, tamaño de recursos, estabilidad, accesibilidad y mantenibilidad.
