# Prisma

**Diario cinematográfico personal, privado y local-first.**

Prisma se está reconstruyendo como una **Progressive Web App (PWA) instalable en Android**. El celular es el centro del producto: conserva el diario y las colecciones, ejecuta las estadísticas y Espectro, y permite trabajar sin conexión con los datos ya guardados.

## Estado del proyecto

**Estado:** Fundación documental — en preparación.

- Repositorio de trabajo: `ElFast-dev/Prisma-Web` (pendiente de renombrar a `ElFast-dev/Prisma`).
- El repositorio nuevo estaba vacío al iniciar esta migración.
- Todavía no hay aplicación web ni código de producto. **No comenzar la implementación hasta cerrar y aprobar los cimientos de Fase 0.**
- El repositorio Android anterior se conserva temporalmente como fuente histórica durante la migración; no es el repositorio de desarrollo futuro.

## Propósito

Prisma no pretende ser otra red social ni un catálogo genérico. Es un espacio personal para recordar qué películas viste, registrar cada visionado, organizar lo que quieres ver, comprender cómo evolucionan tus gustos y descubrir películas mediante **Espectro**, su algoritmo local y explicable.

## Principios no negociables

- Películas solamente en el alcance inicial; series y episodios quedan fuera.
- Sin cuenta de Prisma, backend propio, sincronización en la nube, anuncios ni telemetría de actividad personal.
- Historial, visionados, calificaciones, listas, estadísticas y perfil de Espectro permanecen en el dispositivo.
- Las funciones que dependen de datos ya guardados deben funcionar sin conexión.
- TMDB es una fuente externa de metadatos e imágenes, no el dueño del diario.
- Los datos personales deben poder exportarse y restaurarse mediante copias manuales cifradas.
- Obsidiana y Cuarzo mantienen paridad funcional.
- Las versiones públicas representan capacidades terminadas y aceptadas, no cantidad de commits ni builds.

## Fuentes de verdad

1. [Mandato para agentes](AGENTS.md)
2. [Contexto operativo](docs/CONTEXTO_IA.md)
3. [Requisitos de producto](docs/PRODUCTO/REQUISITOS.md)
4. [Arquitectura PWA](docs/TECNICO/ARQUITECTURA.md)
5. [Almacenamiento y seguridad](docs/TECNICO/ALMACENAMIENTO_Y_SEGURIDAD.md)
6. [Política de versionado](docs/TECNICO/VERSIONADO.md)
7. [Roadmap](docs/ROADMAP.md)
8. [Estado visual](docs/DISENO/ESTADO_VISUAL.md)
9. [Licencia y autorización particular de TMDB](docs/LICENCIAS/TMDB_PRISMA.md)
10. [Migración de repositorios](docs/MIGRACION_REPOSITORIOS.md)
12. [Registro de decisiones](docs/DECISIONES/REGISTRO.md)
13. [Modelo conceptual de datos](docs/TECNICO/MODELO_DE_DATOS.md)
14. [Pruebas y calidad](docs/TECNICO/PRUEBAS_Y_CALIDAD.md)
15. [Alojamiento y origen](docs/TECNICO/ALOJAMIENTO_Y_ORIGEN.md)
11. [Archivo de la etapa Android](docs/ARCHIVO/ANDROID/)

## Versionado

No se publica una versión de producto durante la preparación documental. La primera versión utilizable se definirá como un hito funcional en `docs/TECNICO/VERSIONADO.md`; `1.0.0` queda reservada para la primera versión que complete y supere la aceptación de todo el alcance aprobado para Prisma 1.0.

## Desarrollo

La primera tarea de esta etapa es cerrar los fundamentos: producto, arquitectura, almacenamiento, seguridad, copias, dominio de publicación, proceso de actualización, versionado y criterios de aceptación. Solo después se iniciará el código de la PWA.
