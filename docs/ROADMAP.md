# Plan de trabajo — Prisma

**Estado:** preparación técnica enfocada en el primer recorrido funcional. No hay código de producto todavía.  
**Regla:** no iniciar la aplicación hasta cerrar las decisiones técnicas bloqueantes y recibir aprobación expresa del propietario.

## Recorrido funcional inicial acordado

El primer recorrido que guiará las pruebas y la arquitectura es:

1. Crear manualmente una película en el dispositivo (título obligatorio; año opcional).
2. Incorporarla al Historial.
3. Registrar uno o varios visionados independientes, con las modalidades de fecha/hora ya acordadas.
4. Calificar un visionado con la escala personal de 1 a 10; una repetición no sobrescribe otra.
5. Abrir «Visionados» y consultar cada registro.
6. Cerrar y volver a abrir Prisma; comprobar que película, visionados y notas siguen guardados.
7. Repetir las operaciones locales sin conexión.
8. Antes de guardar datos personales reales, exportar una copia cifrada y restaurarla en una base de prueba, verificando que no se pierdan ni dupliquen registros.

La alta manual permite probar el diario sin depender de TMDB, una API externa o conectividad. TMDB, Descubrir y sus filtros se incorporarán después, sin transmitir nunca el historial ni el perfil personal.

Este recorrido es una primera capacidad vertical, no una definición de todas las funciones de la primera versión pública. Pendientes, Ocultos, listas, estadísticas, Espectro y el feed avanzado se planifican por separado. Las pantallas ya aprobadas no se rediseñan por este recorte técnico.

## Fundamentos: estado actual

- [x] Seleccionar el primer recorrido funcional.
- [x] Conservar las composiciones visuales y comportamientos aprobados para ese recorrido.
- [x] Confirmar que la aplicación será local-first, sin cuenta ni backend propio y con coste de 0 USD.
- [ ] Comparar SvelteKit 3 y React Router 8 con la misma muestra y el mismo comportamiento en el Galaxy A03, usando Brave 1.99.56 / Chromium 157.0.8103.50 como navegador de aceptación.
- [x] Ejecutar benchmark Dexie 4.4.7 vs SQLite WASM 3.54.1-build1 + OPFS SAH pool en 1k, 5k y 10k películas; integridad correcta en las tres cargas.
- [x] Verificar removeVfs() y ausencia del directorio OPFS temporal en 1k, 5k y 10k.
- [ ] Verificar que no queden bases IndexedDB del benchmark (enumeración posterior a la ejecución).
- [x] Evaluar OPFS-WL/SharedWorker/Web Locks para concurrencia multi-pestaña en Brave: OPFS-WL no aprobado por `SQLITE_CORRUPT`; SharedWorker + un único propietario Dedicated Worker SAH pool pasó las pruebas cooperativas.
- [ ] Cerrar el modelo conceptual de películas, visionados y calificaciones provisionales.
- [ ] Verificar el marcador IndexedDB tras recarga, offline real, fallback de importación/exportación y persistencia en el origen HTTPS final.
- [ ] Aprobar formato de copia cifrada, KDF, cifrado autenticado y recuperación segura.
- [ ] Elegir el alojamiento estático y aprobar el origen HTTPS definitivo sin riesgo de facturación.
- [ ] Definir actualización PWA sin interrumpir operaciones ni mezclar archivos incompatibles.
- [x] Registrar el navegador de referencia: Brave 1.99.56 / Chromium 157.0.8103.50.
- [ ] Ejecutar pruebas de aceptación en el Galaxy A03 con ese navegador.
- [ ] Recibir autorización expresa para iniciar el código de producto.

\n\n- [x] Obtener aprobación expresa del propietario para SQLite WASM + OPFS SAH pool con propietario único coordinado mediante SharedWorker (13-11-2026).\n- [ ] Validar el mismo VFS/propietario en el origen HTTPS definitivo, incluyendo `persist()`, `persisted()`, cuota y reapertura tras actualizar la PWA.\n\n## Recomendaciones técnicas preliminares

- **Framework:** comparar Svelte 5.57.1 + SvelteKit 3.2.0 con React 19.3.0 + React Router 8.5.1. No seleccionar por popularidad ni por menor número de archivos.
- **Almacenamiento:** **aprobado por el propietario el 13-11-2026:** SQLite WASM 3.54.1-build1 + OPFS SAH pool, con un único propietario SQLite en Dedicated Worker, coordinado entre pestañas mediante SharedWorker. Escrituras serializadas en el propietario; no abrir SAH pool desde cada pestaña. Evidencia: ventaja 2,70×–4,40× en inserciones; transferencia V8 de 200 registros; 24/24 solicitudes y 605 filas con un propietario; Recovery AutoTest V1; persistencia de 57 registros con SHA-256 coincidente después de recarga y reapertura manual declarada. OPFS-WL no aprobado por `SQLITE_CORRUPT`. Dexie permanece como alternativa de contingencia.
- **Hosting:** Firebase Hosting clásico en Spark es el candidato actual por su hostname web.app propio y porque Spark no exige método de pago. Debe aprobarse el proyecto/site ID y aceptar los límites de 10 GB de almacenamiento y 10 GB/mes de transferencia; al agotarlos, el servicio se bloquea o pausa en lugar de cobrar mientras no se active Blaze.
- **Copias:** se estudia un archivo versionado cifrado con Argon2id y AES-256-GCM; ningún parámetro ni biblioteca queda fijado hasta medirlo y revisarlo.

## Construir la primera capacidad utilizable

Una vez aprobados los fundamentos:

- implementar el recorrido completo anterior, no un conjunto de pantallas sueltas;
- conectar interfaz, reglas, almacenamiento y recuperación;
- incluir estados vacíos, errores y validación;
- probar persistencia y offline en Android;
- no guardar datos personales reales hasta que exportación/restauración hayan pasado las pruebas;
- no añadir controles que todavía no tengan una función real.

## Ampliar Prisma

Después de estabilizar la primera capacidad, añadir por prioridad: TMDB y Descubrir, Pendientes y Ocultos/restauración, listas, estadísticas y Espectro. No hay fases con números ni versiones reservadas.

## Criterio de aceptación

Una capacidad está lista cuando el usuario puede completarla, los datos permanecen tras cerrar/reabrir, los fallos no destruyen información, funciona en Android y en Obsidiana/Cuarzo, el comportamiento offline prometido se comprueba y la recuperación está validada cuando corresponda.

No equivale a progreso un commit, una pantalla estática, un build, una prueba aislada o documentación adicional.

## Actualización de almacenamiento · 13 de noviembre de 2026

La prueba espejo SAH pool ya se ejecutó en Brave:

- RUN_ID: `prisma-sahpool-survival-b1bb9d6f-2558-4d1d-a2a8-a75744cebc2a`.
- 57 filas recuperadas (A=29, B=28), SHA-256 esperado y observado coincidentes.
- `quick_check` e `integrity_check`: `ok`.
- `clearOnInit=false`, `preserveOnInitFailure=true`.
- Persistencia verificada tras cierre de conexión, recarga y reapertura manual declarada por el propietario; esta última fase no demuestra por sí sola que Android haya terminado totalmente el proceso Brave.

La comparación de almacenamiento queda cerrada como **recomendación técnica**: SQLite WASM + SAH pool con un único propietario Dedicated Worker coordinado entre clientes por SharedWorker. OPFS-WL no se acepta. Véase [el informe de persistencia SAH pool](../tools/storage-benchmark/sahpool-persistence-results-2026-11-13.md) y la [recomendación arquitectónica](TECNICO/ARQUITECTURA.md).

**El propietario ya aprobó el candidato de almacenamiento, pero esto no autoriza todavía el inicio del código de producto.** Según `AGENTS.md`, aún necesitan cierre/aprobación expresa: comparación del framework en el Galaxy A03, marcador y restos IndexedDB del benchmark, modelo conceptual definitivo, exportación/restauración cifrada y recuperación sin sobrescritura, hosting gratuito y origen HTTPS estable, actualización segura de la PWA y criterios de aceptación del primer recorrido. La autorización expresa final del propietario sigue siendo el último paso antes de crear la aplicación, pantallas o base de datos productiva.
