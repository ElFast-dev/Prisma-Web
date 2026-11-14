# Prisma · comparación experimental de frameworks

Estas dos muestras son experimentos aislados; no son la aplicación Prisma. No usan SQLite, OPFS, IndexedDB, TMDB, internet ni datos personales. Comparan el mismo catálogo de 240 películas sintéticas, estilos, pantallas, navegación, búsqueda, filtros, orden, ficha, diálogo de calificación, temas Obsidiana/Cuarzo, manifiesto y Service Worker.

## Versiones fijadas y verificadas

- Svelte 5.57.3, SvelteKit 3.2.0, adapter-static 4.0.1, plugin Svelte 7.3.1, Vite 8.3.8 y TypeScript 6.0.3.
- React y React DOM 19.3.1, React Router y herramientas de framework 8.5.1, Vite 8.3.8 y TypeScript 6.0.3.
- Tipos React: @types/react 19.3.0 y @types/react-dom 19.2.7.
- Dependencia de detección de bots de React Router: isbot 5.2.3.
- Automatización: Playwright 1.65.0 y @axe-core/playwright 4.14.0.

Node 24 satisface el mínimo Node 22.17 de SvelteKit 3. SvelteKit 3 exige TypeScript 6, Svelte 5.57.1+, Vite 8.0.12+ y plugin Svelte 7+. Vite 8.3.8 es la versión estable más reciente verificada, no solo el mínimo requerido. React 19.3.1 es el parche estable más reciente que sustituye al 19.3.0 indicado inicialmente; React Router 8.5.1 es el release estable más reciente comprobado.

Bits UI queda fuera para no introducir una ventaja de dependencias solo para Svelte: ambas muestras utilizan el diálogo nativo HTML. Las versiones quedan fijas para que el ensayo compare una combinación concreta y reproducible, no rangos que puedan cambiar durante la ejecución.

## Obtener la rama en Termux

Desde la carpeta local del repositorio:

    git status --short --branch
    git fetch origin
    git switch --track -c experiment/framework-comparison origin/experiment/framework-comparison

Esto crea una rama local nueva y no cambia `main`. Si ya tienes la rama local creada, no repitas el último comando: usa `git switch experiment/framework-comparison` y `git pull --ff-only`.

## Construcción local de las muestras

    cd tools/framework-comparison/sveltekit
    npm install
    npm run build
    cd ../react-router
    npm install
    npm run build
    cd ..

No uses `--force` ni `--legacy-peer-deps`. Conserva ambos `package-lock.json` generados. La construcción no cambia versiones del producto.

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

## Pruebas automatizadas en GitHub

El workflow `.github/workflows/framework-comparison-ci.yml` ejecuta automáticamente ambos builds y una batería compartida de pruebas en cada push a `experiment/automated-testing`, en las solicitudes de integración hacia `experiment/framework-comparison` y cuando se inicia manualmente desde GitHub Actions.

La batería usa Playwright 1.65.0 en Chromium con una ventana móvil simulada de 360 × 800 píxeles. Los mismos escenarios se ejecutan contra SvelteKit y React Router:

- Portada, catálogo completo de 240 elementos y ausencia de desplazamiento horizontal.
- Navegación a Personal, regreso a Descubrir y apertura directa de rutas profundas.
- Búsqueda por título, género y año.
- Filtros por estado y ordenación por año.
- Apertura del diálogo y guardado de una calificación.
- Cambio a Cuarzo y persistencia después de recargar.
- Manifiesto PWA y registro de un Service Worker activo.
- Apertura de una ruta profunda después de cargar la aplicación y desconectar la red.
- Ausencia de excepciones JavaScript no controladas.
- Auditoría automática de accesibilidad con axe-core; el bloqueo inicial se aplica a infracciones críticas y graves, mientras el informe conserva también las de menor impacto.

El workflow instala dependencias, genera sus archivos de bloqueo en el entorno de CI, verifica una instalación limpia con `npm ci`, ejecuta `npm audit`, compila cada muestra y publica los informes, trazas y archivos de bloqueo como artefactos de GitHub durante 14 días. Los archivos generados no se incorporan automáticamente al repositorio.

Dependabot revisa semanalmente las dependencias de los tres proyectos. Las actualizaciones propuestas se revisan mediante los mismos builds y pruebas antes de aceptarse.

## Pruebas en el Galaxy A03 / Brave

La emulación móvil de Playwright no equivale a una prueba en el dispositivo físico ni reproduce Brave Android, el comportamiento de OPFS del sistema o las condiciones reales de memoria. Las pruebas físicas se reservarán para aceptación específica del dispositivo, rendimiento percibido y APIs que no puedan reproducirse de forma fiable en CI. No se necesitan rondas manuales repetitivas para verificar las funciones comunes: esa tarea corresponde a la automatización.

## Alcance PWA de esta muestra

Ambas incluyen manifiesto y Service Worker para comprobar registro, control, caché e instalación. No implementan todavía el mecanismo seguro de actualización de Prisma: estas muestras no contienen datos personales ni transacciones que proteger. No deben usarse para aprobar una política productiva de actualización.

Los pósteres son gradientes y monogramas CSS sintéticos, sin descargas de imágenes. Esto aísla el coste de renderizado de la interfaz; no pretende medir la descarga de pósteres reales. Las notas de las fichas viven solo en memoria mientras la pantalla permanece abierta.

Ningún framework se declara ganador hasta completar builds, pruebas automatizadas, mediciones, aceptación de Brave en el Galaxy A03 y revisión de mantenibilidad.
