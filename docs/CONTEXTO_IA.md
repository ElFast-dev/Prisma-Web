# Contexto operativo — Prisma

**Estado:** reconstrucción de fundamentos. No hay aplicación implementada.

## Dirección

Prisma se está preparando como PWA para uso principal en Android. El repositorio de trabajo es `ElFast-dev/Prisma-Web`, pendiente de renombrarse a `ElFast-dev/Prisma`.

El coste para el propietario debe permanecer en 0 USD. Cloudflare Pages está rechazado. No hay alojamiento ni origen de producción aprobados.

## Autoridad

El propietario aprueba el producto, el alcance, las decisiones importantes y las entregas. Las instrucciones explícitas recientes prevalecen. No confundir una recomendación de IA con una decisión del propietario.

## Material del proyecto anterior

`docs/ARCHIVO/ANDROID/` es un archivo de consulta, no una especificación activa. Los requisitos, modelos, procesos, versiones, tecnologías y diseños heredados se deben revisar desde cero antes de reutilizarlos.

Las propuestas nuevas de Prisma-Web tampoco son vinculantes por existir. En especial, React/Vite, IndexedDB, Argon2id, Workers, OPFS, Cloudflare y SemVer no se consideran automáticamente aprobados. Cloudflare y el sistema anterior de SemVer están descartados.

## Fuentes de verdad

1. `AGENTS.md`: reglas de trabajo.
2. `docs/REPLANTEAMIENTO_Y_REGLAS.md`: coste cero, clasificación de material y criterio para evitar estancamiento.
3. `docs/PRODUCTO/REQUISITOS.md`: alcance candidato que aún debe revisarse.
4. `docs/ROADMAP.md`: resultados necesarios, sin hitos artificiales.
5. `docs/TECNICO/ARQUITECTURA.md`: alternativas técnicas, no stack aprobado.
6. `docs/TECNICO/ALOJAMIENTO_Y_ORIGEN.md`: hosting y origen pendiente.
7. `docs/TECNICO/VERSIONADO.md`: modelo simplificado de ediciones funcionales.
8. `docs/DISENO/ESTADO_VISUAL.md`: referencias visuales que necesitan validación web.
9. `docs/DECISIONES/REGISTRO.md`: decisiones expresas, propuestas y descartes.

Los documentos técnicos restantes son notas de apoyo y deben leerse solo cuando el tema esté en curso. No repetir información en varias fuentes.

## Criterio de progreso

Una tarea cuenta como terminada cuando produce una decisión necesaria o una capacidad verificable por el propietario. En una función, comprobar el recorrido real, la persistencia tras cerrar/reabrir y el comportamiento offline cuando sea requisito.

No equiparar commits, documentos, scaffolding, pruebas o CI verde con avance funcional.
