# Prisma · comparación experimental de frameworks

Estas dos muestras son experimentos aislados; no son la aplicación Prisma. No usan SQLite, OPFS, IndexedDB, TMDB, internet ni datos personales. Comparan el mismo catálogo de 240 películas sintéticas, estilos, pantallas, navegación, búsqueda, filtros, orden, ficha, diálogo de calificación, temas Obsidiana/Cuarzo, manifiesto y Service Worker.

## Versiones fijadas

- Svelte 5.57.3, SvelteKit 3.2.0, adapter-static 4.0.1, plugin Svelte 7.3.1, Vite 8.0.12 y TypeScript 6.0.3.
- React 19.3.0 y React Router 8.5.1, con Vite 8.0.12 y TypeScript 6.0.3.

Node 24 satisface el mínimo Node 22.17 de SvelteKit 3. La versión mayor de SvelteKit exige TypeScript 6, Svelte 5.57.1+, Vite 8.0.12+ y plugin Svelte 7+. Bits UI queda fuera para no introducir una ventaja de dependencias solo para Svelte: ambas muestras utilizan el diálogo nativo HTML.

## Obtener la rama en Termux

Desde la carpeta local del repositorio:

    git status --short --branch
    git fetch origin
    git switch --track -c experiment/framework-comparison origin/experiment/framework-comparison

Este comando crea una rama local nueva y no cambia `main`. Si ya tienes la rama local creada, no repitas el último comando: usa `git switch experiment/framework-comparison` y `git pull --ff-only`.

## Construcción

    cd tools/framework-comparison/sveltekit
    npm install
    npm run build
    cd ../react-router
    npm install
    npm run build
    cd ..

No uses `--force` ni `--legacy-peer-deps`. Conserva los dos `package-lock.json` generados. La construcción no cambia versiones del producto.

## Medición del tamaño de archivos

Desde `tools/framework-comparison`:

    node measure.mjs sveltekit
    node measure.mjs react

El informe separa bytes brutos y gzip del total, JavaScript, CSS y HTML. Registra también los bytes transferidos en Network: gzip no equivale al tamaño servido cuando el servidor utiliza Brotli.

## Servidores locales

Desde `tools/framework-comparison`, inicia SvelteKit:

    node serve.mjs sveltekit

Abre Brave en `http://127.0.0.1:18820/`. Luego prueba directamente la ficha `http://127.0.0.1:18820/pelicula/25` y Personal `http://127.0.0.1:18820/personal`.

Detén únicamente este servidor con Ctrl+C. Para React Router:

    node serve.mjs react

Abre `http://127.0.0.1:18821/` y prueba directamente `http://127.0.0.1:18821/pelicula/25` y `http://127.0.0.1:18821/personal`.

El servidor local entrega el fallback estático correspondiente: `200.html` en SvelteKit y `index.html` en React Router. El hosting de React Router deberá dirigir las rutas válidas a `/index.html`; el hosting SvelteKit utilizará el fallback `200.html` del adaptador. Los puertos y orígenes de las muestras son distintos.

## Pruebas en Galaxy A03 / Brave

Para cada framework:
1. Abre la portada, navega a Personal y vuelve a Descubrir.
2. Abre directamente `/pelicula/25`, regresa y abre otra ficha.
3. Busca por título, género y año; prueba los filtros y los tres órdenes.
4. Abre y cierra el diálogo de calificación; prueba teclado y lector de pantalla.
5. Cambia Obsidiana/Cuarzo y vuelve a cargar para comprobar el tema guardado.
6. Espera a que el Service Worker controle la pestaña y comprueba instalación PWA si Brave ofrece la opción.
7. Carga el shell y la ficha con conexión; activa modo avión y vuelve a cargar una ruta profunda. Confirma si se muestra el shell offline y si los recursos están disponibles.

Haz tres rondas por candidato alternando el orden, con la misma orientación, red y estado de batería. Registra primera carga, cargas posteriores, bytes descargados, fluidez al desplazarse, respuesta al escribir, apertura de ficha y diálogo, memoria si está expuesta, errores de consola y estabilidad offline. No inventes cifras cuando Brave no proporcione mediciones fiables.

Los pósteres son gradientes y monogramas CSS sintéticos, sin descargas de imágenes. Esto aísla el coste de renderizado de la interfaz; no pretende medir la descarga de pósteres reales. Las notas de las fichas viven solo en memoria mientras la pantalla permanece abierta.

## Alcance PWA de esta muestra

Ambas incluyen manifest y Service Worker para comprobar registro, control, caché e instalación. No son todavía el mecanismo de actualización seguro de Prisma: no hay datos personales que proteger y no se debe usar este ensayo para aprobar una política productiva de actualización.

Ningún framework se declara ganador hasta completar builds, pruebas reales en el Galaxy A03, accesibilidad, rutas profundas, modo avión, mediciones y revisión de mantenibilidad.