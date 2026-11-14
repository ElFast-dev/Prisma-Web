# Prisma · comparación experimental de frameworks

Estas dos muestras son experimentos aislados; no son la aplicación Prisma. No usan SQLite, OPFS, IndexedDB, TMDB, internet ni datos personales. Comparan el mismo catálogo de 240 películas sintéticas, estilos, pantallas, navegación, búsqueda, filtros, orden, ficha, diálogo de calificación, temas Obsidiana/Cuarzo, manifiesto y Service Worker.

## Versiones fijadas y verificadas

- Svelte 5.57.3, SvelteKit 3.2.0, adapter-static 4.0.1, plugin Svelte 7.3.1, Vite 8.3.8 y TypeScript 6.0.3.
- React y React DOM 19.3.1, React Router y herramientas de framework 8.5.1, Vite 8.3.8 y TypeScript 6.0.3.
- Tipos React: @types/react 19.3.0 y @types/react-dom 19.2.7.

Node 24 satisface el mínimo Node 22.17 de SvelteKit 3. SvelteKit 3 exige TypeScript 6, Svelte 5.57.1+, Vite 8.0.12+ y plugin Svelte 7+. Vite 8.3.8 es la versión estable más reciente verificada, no solo el mínimo requerido. React 19.3.1 es el parche estable más reciente que sustituye al 19.3.0 indicado inicialmente; React Router 8.5.1 es el release estable más reciente comprobado.

Bits UI queda fuera para no introducir una ventaja de dependencias solo para Svelte: ambas muestras utilizan el diálogo nativo HTML. Las versiones quedan fijas para que el ensayo compare una combinación concreta y reproducible, no rangos que puedan cambiar durante la ejecución.

## Construcción local opcional

Los archivos de bloqueo están versionados en esta rama. Desde cada carpeta del candidato:

    cd tools/framework-comparison/sveltekit
    npm ci
    npm run build

    cd ../react-router
    npm ci
    npm run build

No uses `--force` ni `--legacy-peer-deps`. Los builds no incrementan versiones del producto.

## Medición del tamaño de archivos

Desde `tools/framework-comparison`:

    node measure.mjs sveltekit
    node measure.mjs react

El informe separa bytes brutos y gzip del total, JavaScript, CSS y HTML. Registra también los bytes transferidos en Network: gzip no equivale al tamaño servido cuando el servidor utiliza Brotli.

## Servidores locales

Desde `tools/framework-comparison`, inicia SvelteKit:

    node serve.mjs sveltekit

Abre Brave en `http://127.0.0.1:18820/`. Prueba también directamente `/pelicula/25` y `/personal` en ese mismo origen.

Detén únicamente este servidor con Ctrl+C. Para React Router:

    node serve.mjs react

Abre `http://127.0.0.1:18821/` y prueba directamente `/pelicula/25` y `/personal`.

El servidor local entrega el fallback estático correspondiente: `200.html` en SvelteKit y `index.html` en React Router. El hosting de React Router deberá dirigir las rutas válidas a `/index.html`; el hosting SvelteKit utilizará su fallback `200.html`. Los puertos y orígenes de las muestras son distintos.

## Pruebas en Galaxy A03 / Brave

Las pruebas repetitivas de comportamiento, búsqueda, filtros, calificación, persistencia, rutas y modo offline se automatizan primero en GitHub Actions. La aceptación de navegador en el Galaxy A03 se reserva para diferencias que Chromium emulado no puede representar con fidelidad, como compatibilidad concreta de Brave, integración de instalación y restricciones reales del dispositivo.

Los pósteres son gradientes y monogramas CSS sintéticos, sin descargas de imágenes. Esto aísla el coste de renderizado de la interfaz; no pretende medir la descarga de pósteres reales. Las notas de las fichas viven solo en memoria mientras la pantalla permanece abierta.

## Alcance PWA de esta muestra

Ambas incluyen manifiesto y Service Worker para comprobar registro, control, caché e instalación. No implementan todavía el mecanismo seguro de actualización de Prisma: estas muestras no contienen datos personales ni transacciones que proteger. No deben usarse para aprobar una política productiva de actualización.

## Automatización en GitHub

La rama `experiment/framework-comparison-ci` incorpora pruebas automáticas sin intervención manual:

- GitHub Actions instala, audita y compila las dos muestras.
- Vitest comprueba las invariantes del catálogo sintético.
- Playwright ejecuta en Chromium móvil los mismos recorridos sobre SvelteKit y React Router.
- axe analiza accesibilidad y bloquea infracciones críticas o graves.
- Los informes, trazas, capturas y archivos de bloqueo se conservan como artefactos de la ejecución.
- Los `package-lock.json` forman parte del repositorio; las instalaciones reproducibles usan `npm ci`.

Consulta los resultados en la pestaña **Actions** del repositorio, en el workflow **Framework comparison · automated checks**. El detalle de instalación y cobertura está en [automation/README.md](automation/README.md).

Las pruebas en Chromium emulado no sustituyen completamente la aceptación final en Brave del Galaxy A03. Ningún framework se declara ganador hasta revisar los resultados automáticos, las diferencias de plataforma, las mediciones y la mantenibilidad.
