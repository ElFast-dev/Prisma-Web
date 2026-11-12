# Arquitectura — Prisma PWA

**Estado:** criterios de evaluación; ninguna tecnología de interfaz está aprobada todavía.

## Objetivo

La PWA debe ser una aplicación cliente que pueda instalarse en Android, conservar sus datos localmente y seguir siendo útil sin conexión para las funciones basadas en información ya guardada.

No se presupone un servidor de Prisma. El alojamiento entrega archivos estáticos y cuesta 0 USD. No se incorpora backend, sincronización en nube, telemetría ni servicio de cuenta.

## Elegir tecnología por necesidad

React + TypeScript + Vite fue una propuesta inicial, no una decisión. Antes de elegir se compararán:
- JavaScript/TypeScript modular con DOM nativo;
- un framework de interfaz, solo si la complejidad real de estado, navegación y componentes lo justifica.

La decisión se basará en la complejidad de los recorridos, facilidad de mantenimiento, accesibilidad, tamaño del build, rendimiento en el teléfono, compatibilidad PWA/offline, pruebas y disponibilidad gratuita.

No añadir un framework por moda ni evitarlo por dogma. Elegir lo mínimo que permita mantener la aplicación sin duplicar lógica.

## Organización del código

Separar con claridad interfaz/navegación, reglas de producto, persistencia y APIs del navegador/conectividad externa. No crear de inicio microservicios, sistemas de plugins, contenedores de dependencias, buses de eventos, capas genéricas ni carpetas vacías. La estructura crece cuando una necesidad real lo exija.

## Datos locales

IndexedDB es una opción candidata para datos estructurados y relaciones; debe validarse con las consultas y el volumen real antes de congelar el esquema.

Separar datos personales no reconstruibles, metadatos externos que puedan descargarse otra vez e imágenes/recursos temporales. Una caché nunca será la única copia de información personal.

No introducir OPFS ni SQLite/WASM sin evidencia de que IndexedDB no cubre los casos necesarios.

## Capacidades PWA

Evaluar y probar HTTPS, manifest, instalación, Service Worker, alcance correcto, apertura offline, cuota de almacenamiento, persistencia concedida o denegada, actualización segura y compatibilidad con Chrome Android.

No asumir acceso equivalente a una aplicación nativa ni afirmar que una PWA utiliza Android Keystore.

## Cómputo y dependencias

Web Workers, WebAssembly y bibliotecas especializadas son opcionales. Se incorporan solo si una medición o requisito concreto lo justifica. Mantener dependencias mínimas, fijadas y auditables. Ningún script CDN, analítica o paquete externo se incluye sin necesidad clara.

## Seguridad, copias y TMDB

Web Crypto es una opción para cifrado, pero el formato de copia, KDF, parámetros y biblioteca no están decididos. No adoptar Argon2id/WASM ni parámetros preestablecidos sin benchmark en Android y revisión de seguridad.

Las credenciales externas nunca deben quedar en texto plano o en el repositorio. Las solicitudes a TMDB, si forman parte del alcance aprobado, no deben transmitir el diario personal.

## Hosting y origen

El hosting debe ser estático, HTTPS y costar 0 USD. Cloudflare Pages está rechazado. GitHub Pages está en evaluación; véase [Alojamiento y origen](ALOJAMIENTO_Y_ORIGEN.md).

## Criterio para congelar la arquitectura

La arquitectura se aprueba cuando la tecnología elegida resuelve el primer recorrido, tiene un camino claro para almacenamiento/recuperación/offline y no necesita servicios pagados. No hace falta decidir hoy la arquitectura de funciones que todavía no se han aprobado.
