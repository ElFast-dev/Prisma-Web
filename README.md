# Prisma

**Diario cinematográfico personal. PWA en preparación.**

Prisma se está reconstruyendo con una prioridad: llegar a ser una aplicación que se pueda usar de verdad, sin repetir el estancamiento del proyecto anterior.

## Estado actual

- Repositorio de trabajo: `ElFast-dev/Prisma-Web`; pendiente el cambio administrativo de nombre a `ElFast-dev/Prisma`.
- El repositorio Android anterior todavía existe. Su eliminación sigue pendiente de la acción manual del propietario.
- No hay aplicación web ni código de producto todavía.
- Estamos replanteando los fundamentos. No se debe empezar a programar pantallas ni una PWA parcial hasta cerrar y aprobar las decisiones imprescindibles.
- Prisma debe costar **0 USD**. Cloudflare Pages está rechazado. El alojamiento gratuito aún no está aprobado.

## Regla central

El repositorio Android es un archivo histórico, no el molde del nuevo producto. Sus tecnologías, arquitectura, procesos, versiones, requisitos detallados y diseños solo se reutilizan después de demostrar que siguen siendo la mejor opción para la PWA.

La guía vigente es [Replanteamiento y reglas](docs/REPLANTEAMIENTO_Y_REGLAS.md).

## Cómo se trabajará

1. Resolver solo los fundamentos necesarios para construir una aplicación completa y segura.
2. Elegir las soluciones más simples que cumplan los requisitos reales.
3. Desarrollar un recorrido de usuario completo cada vez, desde la interfaz hasta el almacenamiento y la reapertura.
4. Verificarlo en Android, con y sin conexión cuando corresponda.
5. Ampliar la aplicación cuando la capacidad anterior ya sea utilizable.

No se considera progreso suficiente acumular documentación, scaffolding, abstracciones, números de versión o pipelines sin una mejora que se pueda usar.

## Fuentes activas

1. [Mandato de trabajo](AGENTS.md)
2. [Replanteamiento y reglas](docs/REPLANTEAMIENTO_Y_REGLAS.md)
3. [Requisitos de producto — todavía revisables](docs/PRODUCTO/REQUISITOS.md)
4. [Plan de trabajo](docs/ROADMAP.md)
5. [Arquitectura — opciones por validar](docs/TECNICO/ARQUITECTURA.md)
6. [Identificación de entregas](docs/TECNICO/VERSIONADO.md)
7. [Alojamiento y origen — decisión pendiente](docs/TECNICO/ALOJAMIENTO_Y_ORIGEN.md)
8. [Registro de decisiones](docs/DECISIONES/REGISTRO.md)
9. [Estado visual — referencias por revalidar](docs/DISENO/ESTADO_VISUAL.md)
10. [Migración de repositorios](docs/MIGRACION_REPOSITORIOS.md)

Los demás documentos técnicos apoyan estas fuentes, pero sus propuestas no están aprobadas por el mero hecho de existir. `docs/ARCHIVO/ANDROID/` es solo histórico.

## Entregas

No se mantiene un mapa de versiones futuras. Una edición pública se asignará únicamente cuando Prisma incorpore una capacidad real, coherente y aceptada. Los commits y builds internos se identifican técnicamente y no se presentan como versiones del producto.
