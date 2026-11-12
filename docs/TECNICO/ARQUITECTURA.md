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
