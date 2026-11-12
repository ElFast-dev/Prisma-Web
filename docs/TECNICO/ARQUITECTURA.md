# Arquitectura — Prisma PWA

**Estado:** criterios de evaluación; ninguna tecnología de interfaz está aprobada todavía.

## Objetivo

La PWA debe ser una aplicación cliente que pueda instalarse en Android, conservar sus datos localmente y seguir siendo útil sin conexión para las funciones basadas en información ya guardada.

No se presupone un servidor de Prisma. El alojamiento entrega archivos estáticos y cuesta 0 USD. No se incorpora backend, sincronización en nube, telemetría ni servicio de cuenta.

## Selección de tecnología: máxima calidad demostrable

No se fija de antemano un stack. React + TypeScript + Vite fue una propuesta inicial, no una decisión. Tampoco se da preferencia automática al DOM nativo, a herramientas básicas o a una arquitectura reducida.

Para cada área se deben comparar las opciones modernas y maduras que puedan resolver el problema, incluidas arquitecturas de interfaz, almacenamiento, procesamiento, cifrado, pruebas y distribución. La elección debe justificar por qué es la mejor para Prisma, no solo por qué es fácil de empezar.

### Criterios obligatorios de evaluación

1. Seguridad y protección de datos.
2. Rendimiento medido en Android real, fluidez de interfaz, memoria, consumo y tamaño de descarga.
3. Estabilidad, madurez, mantenimiento activo y calidad del ecosistema.
4. Compatibilidad con PWA, Chrome Android, instalación, offline y APIs del navegador.
5. Experiencia de usuario, accesibilidad y capacidad de implementar interacciones complejas sin degradación.
6. Mantenibilidad a largo plazo, migraciones, documentación y facilidad de depuración.
7. Licencia clara, cadena de suministro verificable y coste total de 0 USD.
8. Capacidad para evolucionar el producto sin reescrituras evitables.

No escoger lo más nuevo por moda, ni lo más conocido por inercia, ni lo más simple para reducir trabajo. La mejor solución puede ser compleja cuando la necesidad lo exige. Una opción básica solo se acepta si la comparación demuestra que no sacrifica calidad y es realmente la mejor para el caso.

Cada decisión tecnológica importante debe incluir alternativas evaluadas, ventajas, desventajas, riesgos, pruebas o benchmarks relevantes y razón de descarte de las otras opciones. Las pruebas deben realizarse en el teléfono Android objetivo cuando rendimiento o compatibilidad puedan cambiar la decisión.

## Organización del código

Separar con claridad interfaz/navegación, reglas de producto, persistencia y APIs del navegador/conectividad externa. No crear de inicio microservicios, sistemas de plugins, contenedores de dependencias, buses de eventos, capas genéricas ni carpetas vacías. La estructura crece cuando una necesidad real lo exija.

## Almacenamiento local y datos

IndexedDB, bibliotecas de acceso tipado y transaccional, OPFS y soluciones basadas en SQLite/WASM son candidatas a comparar según el volumen, consultas, relaciones, integridad, velocidad y recuperación que necesite Prisma. Ninguna queda elegida de antemano por ser la API más básica, la más conocida o la que requiera menos código.

La evaluación debe considerar:
- integridad transaccional y resistencia a fallos;
- consultas, índices, búsquedas y crecimiento de datos;
- rendimiento y memoria en Android real;
- límites de cuota, persistencia y comportamiento offline;
- facilidad de migración, exportación, recuperación y depuración;
- madurez, mantenimiento, seguridad, licencia y coste de 0 USD.

Separar datos personales no reconstruibles, metadatos externos que puedan descargarse otra vez e imágenes/recursos temporales. Una caché nunca será la única copia de información personal. La solución final debe elegirse por superioridad demostrable para el caso real, no por prejuicio a favor de lo básico o de lo complejo.

## Comparativa de arquitectura de interfaz

**Revisión documental:** 12 de noviembre de 2026.  
**Estado:** shortlist de tecnologías y recomendación provisional. No se ha seleccionado stack ni se ha iniciado una aplicación.

Prisma necesita una interfaz móvil de alto cuidado visual, con navegación cinematográfica, transiciones cuidadas, listas y fichas ricas, estados complejos, accesibilidad, funcionamiento offline y una base que pueda mantenerse durante años. Por ello, no se decide por popularidad, por el framework que tenga el benchmark más llamativo ni por el que permita empezar con menos archivos.

### Candidata principal — Svelte 5 + SvelteKit 3

Estado verificado en esta revisión:
- SvelteKit **3.2.0**, publicación del 10 de noviembre de 2026.
- Svelte **5.57.1**, versión indicada por el informe oficial de octubre de 2026.
- `@sveltejs/adapter-static` **4.0.1**, disponible en el catálogo oficial de paquetes.
- Bits UI **2.20.2**, primitivas accesibles sin estilos que permiten construir componentes con el aspecto propio de Prisma.

Fuentes oficiales: [SvelteKit 3](https://svelte.dev/blog/sveltekit-3-is-here), [releases SvelteKit](https://github.com/sveltejs/kit/releases), [estado de Svelte](https://svelte.dev/blog/whats-new-in-svelte-october-2026), [paquetes y adaptadores](https://svelte.dev/packages), [Bits UI](https://www.bits-ui.com/docs/introduction).

**Ventajas para Prisma**
- El compilador de Svelte transforma componentes en actualizaciones directas del DOM; su modelo de reactividad con runes está diseñado para cambios localizados.
- SvelteKit integra en el mismo marco rutas, carga/navegación, generación estática y ciclo de vida de la aplicación.
- El Service Worker se puede declarar en `src/service-worker/index.ts`; SvelteKit lo empaqueta y registra automáticamente y ofrece la versión y el manifiesto de assets para gestionar cachés por despliegue.
- `adapter-static` genera archivos estáticos; no necesita servidor de aplicaciones ni funciones de pago en producción.
- Bits UI ofrece controles headless accesibles y completamente personalizables. Prisma puede definir su propio lenguaje visual en CSS sin heredar un sistema de tarjetas o botones prefabricado.
- Las transiciones, animaciones y estados visuales pueden componerse con las capacidades de Svelte y las APIs del navegador, sin imponer un kit visual.

**Riesgos y puntos que verificar**
- SvelteKit 3 acaba de pasar a versión mayor estable el 1 de octubre; aunque ya hay versiones 3.2.x, debe pasar un período de validación práctica y revisar que las bibliotecas críticas sean compatibles.
- El ecosistema de Svelte es menor que el de React. Hay que confirmar que las funciones complejas necesarias (listas grandes, gestos, componentes accesibles, gráficos, animaciones y pruebas) tengan bibliotecas de calidad y mantenimiento adecuados.
- El código compilado no elimina por sí solo el coste de una mala arquitectura, de grandes imágenes ni de animaciones que fuercen el layout.
- El adaptador estático y el subdirectorio de GitHub Pages deben probarse con `base path`, rutas directas, refresh, fallback y Service Worker; no se debe asumir que cualquier hosting de archivos resuelve la navegación SPA.

### Alternativa fuerte — React 19.3 + React Router 8.5

React **19.3** está disponible desde el 9 de septiembre de 2026. Sus View Transitions ya son API estable y permiten animar apariciones, salidas, movimientos y elementos compartidos. React Router **8.5.0** documenta la integración con ese componente y dispone de modo SPA sin runtime SSR. El React Compiler añade optimización automática durante la compilación.

Fuentes: [React 19.3](https://react.dev/blog/2026/09/09/react-19-3), [versiones de React](https://react.dev/versions), [React Router: SPA](https://reactrouter.com/how-to/spa), [View Transitions con React Router](https://reactrouter.com/how-to/view-transitions), [React Router changelog](https://reactrouter.com/changelog), [React Compiler](https://react.dev/learn/react-compiler/introduction).

**Ventajas:** el ecosistema más amplio de las opciones evaluadas, gran oferta de bibliotecas, herramientas de depuración y componentes complejos; TypeScript muy extendido; API estable para View Transitions y amplia experiencia de producción.

**Costes/riesgos:** hay que seleccionar y mantener React, React Router, la integración de Service Worker/PWA, la librería de componentes y el sistema de estado. React ofrece mucha libertad, pero esa libertad implica más decisiones y disciplina para evitar renders/estados mal coordinados. El React Compiler ayuda con optimizaciones, no reemplaza una arquitectura correcta.

React es la alternativa de menor riesgo por amplitud de ecosistema y debe seguir en la comparación final. No se descarta por tamaño o popularidad.

### Opción madura — Vue 3 + Vue Router + Pinia

Vue 3 ofrece Composition API, reactividad y compilación de plantillas con tree-shaking. Vue Router y Pinia son librerías oficiales mantenidas por el equipo del ecosistema, con TypeScript y DevTools. Las guías oficiales describen optimización de carga, listas grandes y estructuras reactivas extensas.

Fuentes: [FAQ de Vue](https://vuejs.org/about/faq), [rendimiento](https://vuejs.org/guide/best-practices/performance), [estado y Pinia](https://vuejs.org/guide/scaling-up/state-management).

**Ventajas:** ecosistema maduro y equilibrado, reactividad granular en las dependencias y buen soporte para aplicaciones grandes. La separación de plantillas, lógica y CSS puede favorecer una interfaz ordenada.

**Costes/riesgos:** para Prisma hay que combinar Vue con router, Pinia y la infraestructura PWA. Es una base viable y no una opción inferior, pero no muestra por ahora una ventaja clara frente a la integración PWA/estática de SvelteKit ni la amplitud de React.

### Opción de alto rendimiento — Solid

Solid usa reactividad granular; los cambios pueden actualizar directamente los nodos dependientes sin repetir el renderizado general de un componente, y el proyecto publica buenos resultados en benchmarks de interfaz.

Sin embargo, a fecha de esta revisión **Solid 2.0 está en Release Candidate 2.0.0-rc.21**, no en versión estable. SolidStart se está retirando en favor del nuevo modo `start`, lo cual aumenta el riesgo de adoptar justo ahora una plataforma de aplicación que está cambiando.

Fuentes: [reactividad granular](https://docs.solidjs.com/advanced-concepts/fine-grained-reactivity), [anuncio Solid 2 RC](https://www.solidjs.com/blog), [releases](https://github.com/solidjs/solid/releases).

**Conclusión:** es una tecnología técnicamente importante y merece mantenerse vigilada, pero no se seleccionará una release candidate como cimiento del producto. Se puede reevaluar cuando Solid 2 y su stack de aplicación sean estables y tengan la madurez necesaria.

### Opción integral — Angular 22

Angular 22 ofrece un marco completo, CLI, router, formularios, inyección de dependencias, herramientas de pruebas, soporte empresarial y detección de cambios zoneless. El modo zoneless es predeterminado desde Angular 21 y reduce el coste asociado a ZoneJS.

Fuentes: [releases y soporte](https://angular.dev/reference/releases), [zoneless](https://angular.dev/guide/zoneless), [roadmap](https://angular.dev/roadmap).

**Ventajas:** convenciones fuertes, arquitectura integral, herramientas oficiales y soporte de largo plazo.

**Costes/riesgos:** su estructura y ecosistema están optimizados para aplicaciones grandes/equipos y pueden añadir peso y ceremonia que no mejoran el primer recorrido de una PWA personal. Sigue siendo técnicamente capaz, pero hoy no es la candidata mejor equilibrada para Prisma.

### Comparación resumida

| Criterio | SvelteKit 3 | React 19.3 | Vue 3 | Solid 2 | Angular 22 |
|---|---|---|---|---|---|
| Actualizaciones de UI | Compiladas y granulares | Reactividad por componentes; compiler optimiza | Granulares por dependencias | Muy granulares | Signals + zoneless |
| Rutas integradas | Sí | React Router independiente | Vue Router oficial | Router/stack externo | Sí |
| Service Worker integrado al framework | Sí | Se añade por herramienta/infraestructura | Se añade por herramienta/infraestructura | Se añade por herramienta/infraestructura | Angular PWA package |
| Generación estática | Adapter oficial | SPA/SSG según modo y herramientas | SSG mediante tooling | Según stack | SSR/SSG |
| Componentes personalizables | Bits UI headless | Amplio ecosistema headless | Ecosistema amplio | Ecosistema menor | CDK/Material |
| Madurez de versión evaluada | Kit 3 muy reciente | Alta | Alta | 2 aún RC | Alta |
| Principal ventaja | Integración compacta para PWA | Ecosistema y flexibilidad | Equilibrio y madurez | Rendimiento fino | Plataforma integral |
| Principal reserva | Nuevo major y ecosistema menor | Más piezas por ensamblar | Integración distribuida entre paquetes | Estabilidad del nuevo major | Sobrecarga para el alcance |

La fila de Service Worker se refiere a integración oficial del marco, no a una afirmación de que otras opciones no puedan usar un Service Worker. Cualquiera de ellas puede producir una PWA.

### Recomendación provisional

**Svelte 5 + SvelteKit 3 + adapter-static es la primera candidata para un prototipo de validación de Prisma. React 19.3 + React Router 8.5 es la alternativa de comparación obligatoria.**

Esta recomendación se basa en la integración de rutas, construcción estática y Service Worker, en las actualizaciones compiladas de Svelte y en la disponibilidad de primitives headless para una interfaz muy personalizada. No es una aprobación definitiva del propietario y no autoriza aún crear la aplicación.

No se añadirá automáticamente Tailwind, shadcn, un kit de diseño, gestor de estado global ni biblioteca de animación. Primero se hará una prueba visual con los sistemas de componentes necesarios; se incorporarán paquetes adicionales solo si mejoran de forma demostrable el resultado.

### Prototipo técnico de decisión — sin datos reales

Antes de cerrar el stack, preparar la misma muestra de interfaz en SvelteKit y React, con idéntico diseño y comportamiento:
1. navegación principal y transiciones entre pantallas;
2. una lista larga de películas con búsqueda, orden y estado;
3. ficha con imagen, acciones y un diálogo accesible;
4. cambio de tema, tamaño de texto y movimiento reducido;
5. Service Worker, instalación y apertura offline;
6. carga inicial, bytes transferidos, memoria, fluidez, latencia de interacción y consumo en el teléfono Android.

Usar el benchmark comunitario oficial solo como filtro inicial: mide operaciones sobre listas DOM, memoria y arranque, pero sus propios autores advierten que los resultados dependen del navegador y del método y que son solo una parte de la decisión. Los resultados publicados para Chrome 156 no sustituyen las mediciones sobre la interfaz y el teléfono real de Prisma. Fuente: [JS Framework Benchmark, Chrome 156](https://krausest.github.io/js-framework-benchmark/index.html).

La elección definitiva se documentará cuando el prototipo demuestre una diferencia práctica. Si ambos cumplen, escoger el que proporcione mejor combinación de experiencia visual, mantenimiento y estabilidad a largo plazo.
## Comparativa de almacenamiento: resultado de investigación

**Revisión documental:** 12 de noviembre de 2026.  
**Estado:** recomendación técnica provisional; requiere benchmark en el Android objetivo antes de aprobarse. Las versiones que se citan describen el estado consultado, no una fijación de dependencias para el futuro proyecto.

### Candidata A — Dexie 4.4.7 sobre IndexedDB

Dexie es una capa de base de datos madura sobre IndexedDB, no una base de datos distinta ni una sincronización en la nube. Aporta consultas por índices, transacciones, observación reactiva y migraciones de esquema. La versión estable más reciente verificada en esta revisión es **4.4.7**, publicada el 19 de octubre de 2026. El paquete principal `dexie` declara licencia Apache-2.0. Para mantener coste cero y privacidad local se usaría únicamente el paquete principal; no se integraría Dexie Cloud ni su complemento de sincronización. Fuentes: [releases](https://github.com/dexie/Dexie.js/releases), [paquete y licencia](https://github.com/dexie/Dexie.js/blob/master/package.json), [migraciones](https://dexie.org/docs/Version/Version), [transacciones](https://dexie.org/docs/Dexie/Dexie.transaction()).

Un punto relevante para el diario es `chromeTransactionDurability: "strict"`, opción de Dexie que permite solicitar en Chrome una mayor garantía de escritura para transacciones. La modalidad `strict` pide confirmar que los cambios se han escrito en almacenamiento persistente antes de considerar completada la transacción; tiene un coste potencial en velocidad y energía. Debe reservarse para las operaciones de datos personales donde la reducción del riesgo justifique ese coste, y medirse en el teléfono. No convierte el almacenamiento del navegador en una copia de seguridad ni protege contra el borrado de datos del sitio. Fuentes: [opción de Dexie](https://dexie.org/docs/Dexie/Dexie), [durabilidad de IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/transaction).

**Ventajas para Prisma**
- Se integra directamente con el almacenamiento web del navegador y el modelo PWA.
- Dispone de índices, transacciones y migraciones sin montar una capa SQL/WebAssembly.
- Permite solicitar durabilidad estricta en las escrituras críticas de Chrome.
- Tiene una biblioteca mantenida, TypeScript y licencia gratuita.
- No requiere cabeceras COOP/COEP ni acceso a OPFS.

**Límites**
- No es SQL: las consultas complejas, agregaciones y relaciones avanzadas deben modelarse y ejecutarse con criterio.
- IndexedDB tiene reglas de duración de transacciones que exigen diseñar cuidadosamente el código asíncrono.
- La duración `strict` puede aumentar latencia y consumo; no conviene aplicarla indiscriminadamente.
- Continúa sujeto a cuota, persistencia y políticas de almacenamiento del navegador.

### Candidata B — SQLite 3.55.0 en WebAssembly con OPFS

SQLite ofrece un motor SQL relacional completo, restricciones, índices, consultas y transacciones ACID. La documentación oficial del proyecto SQLite Wasm registra la versión **3.55.0** el 1 de noviembre de 2026. El núcleo de SQLite está en dominio público. Fuentes: [noticias oficiales SQLite Wasm](https://www.sqlite.org/wasm/doc/trunk/news.md), [licencia del núcleo SQLite](https://www.sqlite.org/copyright.html).

Para persistir desde una PWA se utiliza OPFS, que solo está disponible desde un Worker. No existe una única variante OPFS; cada VFS tiene compromisos diferentes:

- **`opfs`:** permite concurrencia moderada, pero requiere `SharedArrayBuffer` y cabeceras COOP/COEP para aislamiento de origen. La documentación de SQLite advierte de bloqueos y de que hay que gestionar `SQLITE_BUSY` y mantener transacciones breves.
- **`opfs-wl`:** incorporada en SQLite 3.53.0; usa Web Locks para coordinar accesos y ofrece cola FIFO. Requiere `Atomics.waitAsync()`, que trabaja sobre `SharedArrayBuffer`; por tanto, no debe asumirse que evita el requisito de aislamiento del documento.
- **`opfs-sahpool`:** no requiere COOP/COEP y ofrece el mayor rendimiento en operaciones por lotes de las variantes descritas por SQLite. Su desventaja es que no permite varias conexiones simultáneas normales a la misma base; la segunda pestaña/instancia puede no poder abrirla sin coordinación explícita a nivel de aplicación.

Fuentes: [guía oficial de persistencia OPFS](https://sqlite.org/wasm/doc/tip/persistence.md), [aislamiento de origen](https://developer.mozilla.org/en-US/docs/Web/API/Window/crossOriginIsolated), [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer).

**Ventajas para Prisma**
- SQL completo y modelo relacional natural para películas, visionados, listas y relaciones.
- Potente para consultas, agregaciones, búsquedas y análisis de grandes conjuntos de datos.
- Motor ampliamente probado, formato de base de datos estable y núcleo de dominio público.
- Puede ser una base potente para futuras estadísticas y cálculos de Espectro.

**Límites**
- Añade WebAssembly, un Worker, puente JS/SQL y una ruta de persistencia OPFS que hay que mantener.
- Cada VFS trae restricciones concretas de cabeceras, concurrencia o instancias simultáneas.
- `opfs-sahpool` necesita una política explícita para evitar dos instancias de Prisma intentando abrir la misma base.
- La inicialización, el tamaño descargado, consumo de memoria, exportación y recuperación deben medirse en Android real.
- Los errores de cuota OPFS se pueden manifestar como errores de E/S de SQLite; el motor no gestiona por sí mismo la interfaz de cuota ni los avisos al usuario.

### Candidata C — idb sobre IndexedDB

`idb` es un envoltorio pequeño que convierte la API de IndexedDB en promesas, conservando prácticamente su modelo nativo. Su tamaño publicado por el proyecto es cercano a 1,19 kB comprimido Brotli. Es útil como capa delgada, pero deja más responsabilidad de esquema, consultas, migraciones y ergonomía al código de Prisma. Para la complejidad del diario no ofrece por sí solo la misma capa de producto que Dexie. Fuente: [proyecto idb](https://github.com/jakearchibald/idb).

### Recomendación provisional

Para el primer diario local, **Dexie 4.x sobre IndexedDB es la candidata preferente**, con transacciones y durabilidad estricta en las operaciones críticas donde Android/Chrome lo soporte y las mediciones justifiquen el coste.

No se elige porque sea la alternativa más básica. Se elige provisionalmente porque combina una biblioteca madura, migraciones y transacciones, almacenamiento nativo del navegador y menos restricciones de despliegue/concurrencia que SQLite OPFS. No añade sincronización ni requiere servicios externos.

**SQLite 3.55.0 + OPFS no queda descartado.** Se mantiene como alternativa avanzada prioritaria si el benchmark demuestra una ventaja relevante en consultas, estadísticas o grandes volúmenes sin perjudicar la carga inicial, la memoria, el uso en Android ni la apertura de varias instancias.

No se deben mantener dos bases autoritativas ni sincronizarlas entre sí. La decisión final elegirá un único almacenamiento canónico.

### Pruebas obligatorias antes de congelar la elección

Comparar ambas alternativas con los mismos datos sintéticos representativos y en el teléfono Android objetivo:

1. Arranque en frío, bytes descargados, memoria máxima y tiempo de apertura de la base.
2. Búsqueda local por título, consulta de historial, filtro de listas y agregaciones; medir latencia mediana y P95.
3. Alta/actualización de una película, registro de visionado y cambios relacionados en una única transacción.
4. Importación/exportación completa, restauración, cierre inesperado y recuperación ante fallo.
5. Migración de esquema con datos existentes y rollback seguro.
6. Dos pestañas/instancias simultáneas, pérdida de foco, suspensión/reanudación y cierre de Worker.
7. Cuota limitada, persistencia concedida/denegada, almacenamiento lleno y modo avión.

Los datos personales deben usar la mayor durabilidad compatible con una experiencia razonable; los metadatos reconstruibles y las cachés pueden utilizar políticas menos costosas. Ningún resultado de benchmark sustituye la prueba de integridad ni la copia de seguridad restaurable.

## Capacidades PWA

Evaluar y probar HTTPS, manifest, instalación, Service Worker, alcance correcto, apertura offline, cuota de almacenamiento, persistencia concedida o denegada, actualización segura y compatibilidad con Chrome Android.

No asumir acceso equivalente a una aplicación nativa ni afirmar que una PWA utiliza Android Keystore.

## Cómputo y dependencias

Web Workers, WebAssembly y bibliotecas especializadas no se descartan por ser más avanzados: se evalúan como herramientas de primera clase cuando puedan aportar rendimiento, seguridad o mejor experiencia. Se incorporan cuando la evidencia indique que son la mejor solución. Las dependencias deben ser de calidad alta, mantenidas, auditables, fijadas y con licencia compatible; no se limita arbitrariamente su número, pero cada una necesita una justificación de valor y riesgo. Ningún script CDN o analítica personal se añade sin aprobación.

## Seguridad, copias y TMDB

Web Crypto es una opción para cifrado, pero el formato de copia, KDF, parámetros y biblioteca no están decididos. No adoptar Argon2id/WASM ni parámetros preestablecidos sin benchmark en Android y revisión de seguridad.

Las credenciales externas nunca deben quedar en texto plano o en el repositorio. Las solicitudes a TMDB, si forman parte del alcance aprobado, no deben transmitir el diario personal.

## Hosting y origen

El hosting debe ser estático, HTTPS y costar 0 USD. Cloudflare Pages está rechazado. GitHub Pages está en evaluación; véase [Alojamiento y origen](ALOJAMIENTO_Y_ORIGEN.md).

## Criterio para congelar la arquitectura

La arquitectura se aprueba cuando la solución seleccionada ha sido comparada con alternativas de primer nivel, demuestra calidad y rendimiento para el primer recorrido, protege los datos, ofrece un camino claro para recuperación/offline y no necesita servicios pagados. No hace falta congelar hoy la arquitectura de funciones que todavía no se han aprobado; se seleccionará la mejor solución cuando exista el requisito que la necesita.
