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
- [ ] Comparar Dexie/IndexedDB con alternativas SQLite/WASM viables en Brave en el Galaxy A03 (4 GB RAM); el propietario puede liberar almacenamiento antes de las pruebas. OPFS queda condicionado a una detección funcional en Brave.
- [ ] Cerrar el modelo conceptual de películas, visionados y calificaciones provisionales.
- [ ] Aprobar persistencia, formato de copia cifrada, KDF, cifrado autenticado y recuperación segura.
- [ ] Elegir el alojamiento estático y aprobar el origen HTTPS definitivo sin riesgo de facturación.
- [ ] Definir actualización PWA sin interrumpir operaciones ni mezclar archivos incompatibles.
- [x] Registrar el navegador de referencia: Brave 1.99.56 / Chromium 157.0.8103.50.
- [ ] Ejecutar pruebas de aceptación en el Galaxy A03 con ese navegador.
- [ ] Recibir autorización expresa para iniciar el código de producto.

## Recomendaciones técnicas preliminares

- **Framework:** comparar Svelte 5.57.1 + SvelteKit 3.2.0 con React 19.3.0 + React Router 8.5.1. No seleccionar por popularidad ni por menor número de archivos.
- **Almacenamiento:** Dexie 4.4.7 sobre IndexedDB es la candidata para el diario inicial; alternativas SQLite/WASM se evaluarán con compatibilidad real en Brave. OPFS solo se considerará si la API está expuesta y pasa pruebas en ese navegador.
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
