# Prisma · comparación experimental de frameworks

Estas dos muestras son experimentos aislados; no son la aplicación Prisma, no usan SQLite/OPFS/IndexedDB, TMDB ni datos personales. Comparan las mismas 240 películas sintéticas, pantalla Personal (cuadrícula 2×2 y Gestionar listas), feed 3 columnas/portadas 2:3, búsqueda, filtro, orden, ficha, diálogo de calificación, navegación, temas Obsidiana/Cuarzo, manifiesto y Service Worker.

## Versiones fijadas

Svelte 5.57.3, SvelteKit 3.2.0, adapter-static 4.0.1, plugin Svelte 7.3.1, Vite 8.0.12, TypeScript 6.0.3. React 19.3.0 y React Router 8.5.1 con Vite 8.0.12 y TypeScript 6.0.3. Bits UI queda fuera para no agregar una ventaja de dependencia solo a Svelte: ambos usan el diálogo nativo HTML.

Node 24 satisface el mínimo de Node 22.17 de SvelteKit 3. SvelteKit 3 exige TypeScript 6, Svelte 5.57.1+, Vite 8.0.12+ y plugin Svelte 7+.

## Construcción en Termux

Desde la carpeta del repositorio:

    cd tools/framework-comparison/sveltekit
    npm install
    npm run build
    cd ../react-router
    npm install
    npm run build
    cd ..

No uses `--force` ni `--legacy-peer-deps`. Conserva los `package-lock.json` generados para reproducibilidad.

## Servidores de prueba

Desde `tools/framework-comparison` (una muestra a la vez):

    node serve.mjs sveltekit

Abre `http://127.0.0.1:18820/`. Detén solo ese servidor con Ctrl+C y después:

    node serve.mjs react

Abre `http://127.0.0.1:18821/`.

Las muestras usan puertos/orígenes distintos. No limpies el almacenamiento del sitio en plena prueba.

## Pruebas en Galaxy A03 / Brave

Para cada framework: abre la portada, navega a Personal, abre una película, regresa, busca, cambia filtro y orden, abre los diálogos con teclado/táctil, cambia ambos temas, recarga y espera a que el Service Worker controle la página. Prueba una URL profunda en modo avión después de cargar el shell con conexión. Instala solo si Brave ofrece su opción.

Haz tres rondas por candidato alternando el orden, misma orientación/red/estado de batería. Registra primera carga, cargas posteriores, bytes descargados, fluidez de scroll, respuesta al escribir, apertura de ficha/diálogo, uso de memoria si está expuesto, errores de consola y estabilidad offline. No inventes mediciones si Brave no las proporciona.

React Router SPA requiere reescribir rutas válidas a `/index.html` en el hosting. SvelteKit adapter-static genera `200.html` como fallback. El servidor experimental aplica el fallback local a ambos.

## Tamaño de la compilación

Tras crear ambos builds, desde esta carpeta:

    node measure.mjs sveltekit
    node measure.mjs react

Compara bytes brutos y gzip del total, JavaScript, CSS y HTML. Confirma además bytes transferidos en Network; gzip no equivale necesariamente al tamaño real servido, que puede utilizar Brotli.

Ningún framework se declara ganador hasta tener datos reales del Galaxy A03 y revisión de accesibilidad, PWA, mantenibilidad y fallos.