# Prisma · comparación experimental de frameworks

Estas dos muestras son experimentos aislados; no son la aplicación Prisma. No usan SQLite, OPFS, IndexedDB, TMDB, internet ni datos personales. Comparan el mismo catálogo de 240 películas sintéticas, estilos, pantallas, navegación, búsqueda, filtros, orden, ficha, diálogo de calificación, temas Obsidiana/Cuarzo, manifiesto y Service Worker.

## Versiones fijadas y verificadas

- Svelte 5.57.3, SvelteKit 3.2.0, adapter-static 4.0.1, plugin Svelte 7.3.1, Vite 8.3.8 y TypeScript 6.0.3.
- React y React DOM 19.3.1, React Router y herramientas de framework 8.5.1, Vite 8.3.8 y TypeScript 6.0.3.
- Tipos React: @types/react 19.3.0 y @types/react-dom 19.2.7.
- Tipos Node para la muestra React Router: @types/node 24.19.2.
- Dependencia de detección de bots de React Router: isbot 5.2.3.
- Automatización: Playwright 1.65.0 y @axe-core/playwright 4.14.0.

Node 24 satisface el mínimo Node 22.17 de SvelteKit 3. SvelteKit 3 exige TypeScript 6, Svelte 5.57.1+, Vite 8.0.12+ y plugin Svelte 7+. Vite 8.3.8 es la versión estable más reciente verificada, no solo el mínimo requerido. React 19.3.1 es el parche estable más reciente que sustituye al 19.3.0 indicado inicialmente; React Router 8.5.1 es el release estable más reciente comprobado.

Bits UI queda fuera para no introducir una ventaja de dependencias solo para Svelte: ambas muestras utilizan el diálogo nativo HTML. Las versiones quedan fijas para que el ensayo compare una combinación concreta y reproducible, no rangos que puedan cambiar durante la ejecución.

## Instalación local

Los tres proyectos ya tienen sus archivos `package-lock.json` guardados en GitHub. Para preparar el entorno local se utiliza `npm ci`, que instala las versiones exactas indicadas por el lockfile.

Desde la raíz del repositorio:

    npm ci --prefix tools/framework-comparison/sveltekit
    npm ci --prefix tools/framework-comparison/react-router
    npm ci --prefix tools/framework-comparison/e2e

Para compilar las dos muestras:

    npm run build --prefix tools/framework-comparison/sveltekit
    npm run build --prefix tools/framework-comparison/react-router

No uses `--force` ni `--legacy-peer-deps`. Si se modifica una dependencia en alguno de los `package.json`, el workflow `Prepare framework lockfiles` genera los lockfiles sin instalar `node_modules`, los guarda en la rama y después inicia CI sobre el commit actualizado. No hay que regenerarlos manualmente.

## Cómo se optimizó CI

### Ejecución habitual

El workflow `.github/workflows/framework-comparison-ci.yml` ejecuta dos trabajos en paralelo: uno para SvelteKit y otro para React Router. Cada trabajo:

1. Recupera la caché de paquetes npm asociada a sus lockfiles.
2. Ejecuta un único `npm ci` para el framework.
3. Compila y mide el resultado de producción; React Router también pasa TypeScript.
4. Ejecuta un único `npm ci` para las herramientas E2E.
5. Instala Chromium y ejecuta los 14 escenarios del framework seleccionado.
6. Guarda el informe de Playwright, las trazas y las capturas de los fallos como artefactos de GitHub durante 14 días.

La caché reutiliza descargas de npm, no la carpeta `node_modules`. Cada trabajo vuelve a hacer una instalación limpia desde su lockfile. Playwright recomienda no almacenar los binarios de sus navegadores en caché por defecto porque restaurarlos puede tardar tanto como descargarlos; por eso Chromium se instala en el runner que lo necesita.

La suite compartida comprueba portada, diseño adaptable a móvil y escritorio, navegación, uso de filtros con teclado, búsqueda por título/género/año y búsquedas sin coincidencias, filtros y orden real por año, calificación, rutas inexistentes, persistencia del tema, manifiesto PWA, Service Worker, funcionamiento offline, errores JavaScript y accesibilidad con axe-core. Cada uno de los 14 escenarios se ejecuta contra ambos frameworks.

### Preparación de lockfiles

El workflow `.github/workflows/prepare-framework-lockfiles.yml` se activa cuando cambian los manifiestos de dependencias o la configuración de CI. Ejecuta `npm install --package-lock-only --ignore-scripts` para actualizar solo los lockfiles; no instala paquetes en `node_modules`. Si hay diferencias, los guarda en un commit de la misma rama y dispara la batería normal contra ese commit.

### Auditoría de seguridad

La auditoría está separada en `.github/workflows/dependency-security.yml`. Se ejecuta para cambios de dependencias en solicitudes de integración y tiene una programación semanal cuando el workflow esté en la rama principal del repositorio. También se puede lanzar manualmente desde GitHub Actions una vez disponible en la rama predeterminada.

Dependabot revisa semanalmente las dependencias npm de los tres proyectos y las acciones de GitHub Actions. Las actualizaciones se proponen como cambios revisables; no se aceptan automáticamente sin pasar por CI.

### Revisión integral multibrowser

Las ejecuciones habituales utilizan Chromium para obtener resultados rápidos y comparables en cada cambio. Cuando se necesite una revisión más amplia —por ejemplo, antes de proponer la integración o tras cambiar navegación, PWA, CSS o diálogos— se puede iniciar manualmente `Framework comparison CI` desde GitHub Actions y activar el parámetro `full_suite`. Esa modalidad amplía la matriz a Chromium, Firefox y WebKit para los dos frameworks (seis trabajos paralelos). Firefox utiliza un perfil de navegador de escritorio con viewport móvil porque Playwright no implementa en Firefox la misma emulación móvil de Chromium/WebKit; las pruebas de diseño siguen comprobando el ancho de 360 y 320 píxeles.

No se ejecutan los tres navegadores en cada push porque son más costosos y el retorno de esa cobertura adicional es mayor en cambios que afectan a compatibilidad de navegador. La suite rápida continúa siendo obligatoria; la integral complementa, no reemplaza, esa comprobación.

### Evidencias

Cuando una prueba falla, Playwright conserva capturas, vídeos cuando están disponibles y trazas que permiten inspeccionar los pasos del navegador. Los informes de cada framework se descargan por separado desde la ejecución de GitHub Actions.

## Medición del tamaño de archivos

Desde `tools/framework-comparison`:

    node measure.mjs sveltekit
    node measure.mjs react

El informe separa bytes brutos y gzip del total, JavaScript, CSS y HTML. Registra también los bytes transferidos en Network: gzip no equivale al tamaño servido cuando el servidor utiliza Brotli.

## Servidores locales

Desde `tools/framework-comparison`, inicia SvelteKit:

    node serve.mjs sveltekit

Abre Brave en `http://127.0.0.1:18820/`. Las rutas de prueba son `/pelicula/25` y `/personal`.

Detén únicamente este servidor con Ctrl+C. Para React Router:

    node serve.mjs react

Abre `http://127.0.0.1:18821/` y prueba las mismas rutas.

El servidor local entrega el fallback estático correspondiente: `200.html` en SvelteKit y `index.html` en React Router. El hosting de React Router deberá dirigir las rutas válidas a `/index.html`; el hosting SvelteKit utilizará su fallback `200.html`. Los puertos y orígenes de las muestras son distintos.

## Pruebas en el Galaxy A03 / Brave

La emulación móvil de Playwright no equivale a una prueba en el dispositivo físico ni reproduce Brave Android, el comportamiento de OPFS del sistema o las condiciones reales de memoria. Las pruebas físicas se reservarán para aceptación específica del dispositivo, rendimiento percibido y APIs que no puedan reproducirse de forma fiable en CI. No se necesitan rondas manuales repetitivas para verificar las funciones comunes: esa tarea corresponde a la automatización.

## Alcance PWA de esta muestra

Ambas incluyen manifiesto y Service Worker para comprobar registro, control, caché e instalación. No implementan todavía el mecanismo seguro de actualización de Prisma: estas muestras no contienen datos personales ni transacciones que proteger. No deben usarse para aprobar una política productiva de actualización.

Los pósteres son gradientes y monogramas CSS sintéticos, sin descargas de imágenes. Esto aísla el coste de renderizado de la interfaz; no pretende medir la descarga de pósteres reales. Las notas de las fichas viven solo en memoria mientras la pantalla permanece abierta.

Ningún framework se declara ganador hasta completar builds, pruebas automatizadas, mediciones, aceptación de Brave en el Galaxy A03 y revisión de mantenibilidad.
