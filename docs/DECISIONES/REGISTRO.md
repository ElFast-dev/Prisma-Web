# Registro de decisiones — Prisma Web

**Última revisión:** 12 de noviembre de 2026.

Este registro separa decisiones del propietario, decisiones heredadas que siguen vigentes y propuestas técnicas. Una propuesta no se considera aprobada por aparecer en esta documentación.

## Decisiones expresas del propietario

| ID | Decisión | Estado |
|---|---|---|
| P-001 | Prisma se desarrollará primero como PWA para utilizar el teléfono como dispositivo principal de ejecución, almacenamiento y procesamiento. | Aprobada |
| P-002 | `ElFast-dev/Prisma-Web` será el nuevo repositorio principal; el antiguo `ElFast-dev/Prisma` dejará de utilizarse y se eliminará después de comprobar la migración; el nuevo se renombrará a `Prisma`. | Aprobada; migración en curso |
| P-003 | Antes de crear la aplicación se completarán sus cimientos de producto, arquitectura, almacenamiento, seguridad, versionado, pruebas y organización. | Aprobada |
| P-004 | Las versiones deben corresponder al avance real y capacidades terminadas, no aumentar por commits o builds arbitrarios. | Aprobada |

## Decisiones de producto heredadas que siguen vigentes

- Diario cinematográfico personal, solo películas.
- Datos personales, historial, calificaciones, listas, estadísticas y perfil Espectro en el dispositivo.
- Sin cuenta, backend propio, nube, funciones sociales, anuncios ni telemetría personal.
- Offline para datos guardados.
- TMDB como fuente externa de metadatos/imágenes, no del diario.
- Copias manuales cifradas.
- Espectro local y explicable.
- Temas Obsidiana y Cuarzo con paridad.
- Identidad visual y reglas funcionales no dependientes de Android preservadas en el archivo de decisiones anterior y el estado visual actual.

## Propuestas técnicas para aprobar antes de implementar

| ID | Propuesta | Motivo | Estado |
|---|---|---|---|
| T-001 | React + TypeScript + Vite; frontend estático modular. | Desarrollo rápido y mantenible por IA, tipado y build sencillo. | Propuesta |
| T-002 | IndexedDB como base autoritativa; Cache Storage para shell e imágenes; OPFS solo si una necesidad medida lo justifica. | Menos complejidad y separación entre datos personales y caché. | Propuesta |
| T-003 | Web Workers para búsqueda pesada, estadísticas y Espectro. | Evitar bloquear la interfaz. | Propuesta |
| T-004 | Exportación `.prisma` con Argon2id + AES-256-GCM, sujeto a benchmark de teléfono y revisión criptográfica. | Copia portable cifrada. | Propuesta |
| T-005 | Hosting estático con origen dedicado; primera opción a evaluar: Cloudflare Pages conectado al repositorio y hostname exclusivo `*.pages.dev` o dominio propio. | Despliegues automáticos, previews y aislamiento del almacenamiento por origen. | Propuesta |
| T-006 | Actualización PWA controlada: detectar nueva versión, informar y pedir acción explícita para activarla. | Mantener control del usuario y evitar recarga durante una operación. | Propuesta |
| T-007 | Mapa de hitos SemVer de `VERSIONADO.md`. | Hacer que cada número represente una capacidad verificable. | Propuesta |

## Decisiones bloqueantes pendientes

1. Aprobación final del mapa de versiones `0.1.0` a `0.7.0` y de sus entregables.
2. Alojamiento y origen HTTPS de producción. No instalar la PWA con datos reales hasta fijarlo.
3. Confirmar el proveedor de hosting y autorizar la conexión de su GitHub App a este repositorio.
4. Benchmark de Argon2id/WASM en el teléfono antes de congelar parámetros de la exportación.
5. Elegir la biblioteca mínima para operar IndexedDB (API directa, `idb` o Dexie) en la especificación de implementación, con justificación y lockfile.

## Registro de cambios

- 2026-11-12: apertura de Prisma Web; PWA y repositorio nuevo aprobados por el propietario; propuestas técnicas iniciales documentadas.
