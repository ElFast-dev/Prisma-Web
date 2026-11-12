# Roadmap — Prisma Web

**Estado actual:** Fase 0 — cimientos y migración documental.  
**Fecha de revisión:** 12 de noviembre de 2026.  
**Regla:** no comenzar la implementación de la aplicación hasta que Fase 0 se cierre y el propietario apruebe su salida.

## Reglas generales

- Cada fase define objetivo, alcance, exclusiones, dependencias, entregables y criterios de aceptación.
- Cerrar una fase no autoriza automáticamente iniciar la siguiente.
- No adelantar funciones de fases futuras.
- La salida de fase requiere documentos sincronizados, criterios P0/P1 verificados, pendientes P2/P3 registrados y aprobación expresa del propietario.
- El progreso se informa por lo que el propietario puede hacer dentro de Prisma, no por número de commits, archivos, tests o ejecuciones CI.
- Los hitos de desarrollo usan IDs Fase-Hito; no se escriben como SemVer.
- Las versiones públicas solo se crean al completar una entrega funcional, según [VERSIONADO.md](TECNICO/VERSIONADO.md).

## Fase 0 — Cimientos de Prisma Web

**Estado:** EN CURSO.  
**Objetivo:** definir y verificar las bases de producto, tecnología, seguridad, datos, diseño, versionado y mantenimiento antes de programar la PWA.

### Hitos de Fase 0

| ID | Trabajo | Estado |
|---|---|---|
| F0-H1 | Migración documental y autoridad del repositorio | Documentación trasladada; falta operación administrativa de GitHub: eliminar repo Android y renombrar Prisma-Web |
| F0-H2 | Producto, alcance MVP/1.0 y decisiones visuales | Base documental creada; requiere revisión y aprobación final del propietario |
| F0-H3 | Arquitectura, modelo de datos, almacenamiento, seguridad y copias | Propuestas documentadas; pendientes de aprobación y pruebas de viabilidad |
| F0-H4 | Hosting, origen, actualización PWA, CI y mantenimiento | Cloudflare Pages recomendado como propuesta; origen exacto pendiente |
| F0-H5 | Versionado, aceptación, pruebas y puerta de implementación | Política funcional redactada; pendiente aprobación del propietario |

### Entregables

1. Mandato de agentes y contexto de IA actualizados a PWA.
2. Requisitos de producto: identidad, alcance, MVP, 1.0.0, funciones y exclusiones.
3. Registro de decisiones, separando aprobado, heredado y propuesto.
4. Arquitectura modular PWA, estrategia offline y compatibilidad Android.
5. Modelo conceptual de datos e invariantes.
6. IndexedDB, cachés, cuota, persistencia, migraciones y almacenamiento.
7. Seguridad web, token TMDB, cifrado de copias, restauración y recuperación.
8. Hosting y origen HTTPS canónico estable.
9. Política de actualización del Service Worker, control de previews y rollback.
10. Sistema de hitos Fase-Hito y SemVer funcional.
11. Estrategia de pruebas en navegador automatizado y teléfono real.
12. Diseño visual adaptado a CSS responsive y activos aprobados.
13. Migración documental completa y verificada desde todas las ramas útiles del repo Android.

### Exclusiones

No crear React app, pantallas, componentes de producto, Service Worker productivo, esquema de base de datos en código, funciones del diario ni prototipos que aparenten ser la aplicación. La preparación de documentos y activos visuales sí forma parte de esta fase.

### Criterios de salida

- Fuentes activas y archivo histórico completos y coherentes.
- No quedan instrucciones Android contradictorias en documentos activos.
- El propósito, MVP, exclusiones y alcance 1.0.0 están claros y aprobados.
- Arquitectura, modelo de datos, origen, almacenamiento, seguridad, copias y actualizaciones tienen decisiones aprobadas.
- Política de versionado y mapa de hitos aprobados.
- Plan de pruebas y aceptación aprobado.
- No quedan riesgos P0/P1 sin tratamiento.
- Repositorio canónico renombrado a Prisma y antiguo repositorio Android retirado conforme a la migración.
- El propietario aprueba expresamente cerrar Fase 0 e iniciar Fase 1.

## Fase 1 — Base PWA instalable

**Objetivo:** establecer la base ejecutable de la PWA en el origen definitivo, sin simular todavía las funciones del diario.

### Hitos

- **F1-H1 — Shell instalable:** manifest, iconos aprobados, navegación inicial, estructura responsive, temas Obsidiana/Cuarzo y pantalla raíz funcional a nivel de navegación.
- **F1-H2 — Ciclo de vida web:** shell offline, Service Worker, detección y aplicación controlada de actualizaciones, diagnóstico de cuota/persistencia y entorno de previews separado.

### Exclusiones

No mostrar películas, resultados TMDB, historial, estadísticas o controles que no estén conectados a una capacidad real.

### Criterios de salida

- Instalación desde Chrome Android, apertura standalone y fallback en pestaña.
- Shell abre sin conexión después de la primera carga.
- Obsidiana y Cuarzo tienen paridad.
- Actualización no interrumpe una operación ni mezcla recursos incompatibles.
- Diagnóstico de almacenamiento distingue cuota estimada, persistencia concedida/denegada y errores.
- Pruebas en dispositivo real y sin defectos P0/P1.
- Esta fase no crea una versión pública SemVer por sí sola.

## Fase 2 — Diario local

**Objetivo:** hacer que Prisma sea útil para registrar películas sin depender de TMDB.

### Hitos

- **F2-H1 — Películas locales:** alta manual, identidad estable, búsqueda local sin conexión, persistencia y prevención de duplicados.
- **F2-H2 — Historial y Pendientes:** registros de visionado independientes, fecha/hora conocida o desconocida, transición a Historial y consulta individual.
- **F2-H3 — Organización personal:** calificación por visionado, Ocultos/restauración, listas personalizadas manuales, búsqueda y recorridos completos de la interfaz.
- **F2-H4 — Protección portable:** exportación cifrada, validación de integridad, importación segura, copia previa y restauración probada.

### Criterios de aceptación

- El recorrido diario se completa desde pantallas reales y guarda en IndexedDB.
- Cerrar/reabrir y reiniciar el navegador conserva datos dentro de los límites documentados del almacenamiento web.
- Modo avión permite consultar y modificar el diario local.
- Visionados repetidos no sobrescriben registros previos.
- Ocultar/restaurar conserva estado anterior y no borra datos.
- Listas no duplican películas y su eliminación no elimina Movie ni Viewing.
- Exportar e importar funcionan; contraseña incorrecta, archivo alterado o versión incompatible no sobrescribe la base actual.
- Ambos temas mantienen paridad.

**Primera preversión propuesta:** `0.1.0-alpha.1`, únicamente si este recorrido es útil, verificable y seguro como se describe en VERSIONADO.md.

## Fase 3 — Catálogo TMDB esencial y cierre del MVP

**Objetivo:** incorporar búsqueda cinematográfica remota y enriquecimiento de metadatos sin convertir TMDB en la fuente de verdad del diario.

### Hitos

- **F3-H1 — Credencial y búsqueda:** introducción del token por el usuario, cifrado local, validación, estados diferenciados, búsqueda y cancelación de consultas obsoletas.
- **F3-H2 — Fichas y caché:** selección supervisada ante coincidencias ambiguas, metadatos básicos, imágenes cacheadas y fallback offline.

### Criterios de salida

- TMDB no es necesario para el diario local.
- Las solicitudes remotas no transmiten historial, listas, calificaciones, estadísticas o perfil Espectro.
- No se guardan resultados remotos hasta una acción explícita.
- Metadatos e imágenes consultados quedan disponibles offline dentro de los límites físicos del teléfono.
- Token nunca se persiste en texto plano ni aparece en logs.
- Errores de red, falta de token y cero resultados se distinguen.
- Se cumplen íntegramente los criterios MVP de REQUISITOS.md, incluida copia/restauración cifrada y paridad de temas.

**Primera versión estable propuesta:** `0.1.0`, solo después de aceptar el MVP completo.

## Fase 4 — Organización avanzada

**Objetivo:** gestión avanzada de listas y organización del diario, según decisiones aprobadas.

Incluye colores, collages, fijación, orden manual, filtros y contadores avanzados cuando la especificación visual y funcional de cada pantalla esté aprobada.

**Versión objetivo propuesta:** `0.2.0`.

## Fase 5 — Experiencia cinematográfica completa

**Objetivo:** completar Descubrir avanzado, ficha ampliada, créditos, tráileres, colecciones, películas relacionadas, disponibilidad por región cuando existan datos válidos y protección de spoilers según requisitos.

**Versión objetivo propuesta:** `0.3.0`.

## Fase 6 — Estadísticas

**Objetivo:** estadísticas y comprensión de gustos calculadas localmente, reproducibles y respaldadas por datos reales; explicar muestras insuficientes y evitar conclusiones no sustentadas.

**Versión objetivo propuesta:** `0.4.0`.

## Fase 7 — Espectro

**Objetivo:** implementar el algoritmo local de aprendizaje y recomendaciones, con explicaciones sustentadas, confianza, control de muestras pequeñas y modos Afinidad, Equilibrado y Exploración.

Espectro no envía historial ni perfil personal a ningún servicio externo. El motor se desarrolla a partir de datos reales ya guardados y pruebas de relevancia.

**Versión objetivo propuesta:** `0.5.0`.

## Fase 8 — Experiencia de versiones y Prisma 1.0.0

**Objetivo:** historial/changelog dentro de Prisma, actualización PWA controlada, regresión integral, seguridad, accesibilidad, rendimiento, migraciones y recuperación.

**Versión objetivo propuesta:** `0.6.0` para la experiencia de versiones, si constituye una capacidad visible y aceptada. `1.0.0` queda reservada para completar todo el alcance aprobado de la versión completa.

## Registro de aprobación

- PWA como plataforma principal: aprobado por instrucción expresa del propietario.
- Prisma-Web como repositorio nuevo: aprobado; eliminación del viejo y renombrado están en curso, con un paso manual pendiente.
- Primero los cimientos y después el código: aprobado.
- Versionado ligado a avances reales: aprobado como principio; la política concreta y el mapa de versiones todavía requieren aprobación.
- Hosting/origen, librería IndexedDB, parámetros KDF y mapa de versiones: propuestas, no decisiones cerradas.
