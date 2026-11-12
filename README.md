# Prisma

**Diario cinematográfico personal, privado y local-first.**

Prisma se está reconstruyendo como una **Progressive Web App (PWA) instalable en Android**. El celular es el centro del producto: conserva el diario y las colecciones, ejecuta las estadísticas y Espectro, y permite trabajar sin conexión con los datos ya guardados.

## Estado del proyecto

**Estado:** Fase 0 — cimientos documentales en preparación.

- Repositorio de trabajo actual: `ElFast-dev/Prisma-Web`; pendiente de renombrar a `ElFast-dev/Prisma`.
- Repositorio Android anterior: migración documental completada en este repo; su eliminación queda pendiente del paso administrativo manual descrito en [Migración](docs/MIGRACION_REPOSITORIOS.md).
- Todavía no hay aplicación web ni código de producto. **No comenzar la implementación hasta cerrar y aprobar los cimientos de Fase 0.**
- No se ha desplegado Prisma en un origen web ni se deben guardar datos personales en previews/proyectos provisionales.

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
4. [Roadmap](docs/ROADMAP.md)
5. [Arquitectura PWA](docs/TECNICO/ARQUITECTURA.md)
6. [Modelo de datos](docs/TECNICO/MODELO_DE_DATOS.md)
7. [Almacenamiento y seguridad](docs/TECNICO/ALMACENAMIENTO_Y_SEGURIDAD.md)
8. [Política de versionado](docs/TECNICO/VERSIONADO.md)
9. [Pruebas y calidad](docs/TECNICO/PRUEBAS_Y_CALIDAD.md)
10. [Alojamiento y origen](docs/TECNICO/ALOJAMIENTO_Y_ORIGEN.md)
11. [Estado visual](docs/DISENO/ESTADO_VISUAL.md)
12. [Activos visuales e iconografía](docs/DISENO/README.md)
13. [Licencia Inter](docs/LICENCIAS/FUENTE_INTER.md)
14. [Autorización particular de TMDB](docs/LICENCIAS/TMDB_PRISMA.md)
15. [Registro de decisiones](docs/DECISIONES/REGISTRO.md)
16. [Referencias técnicas](docs/REFERENCIAS_TECNICAS.md)
17. [Migración de repositorios](docs/MIGRACION_REPOSITORIOS.md)
18. [Archivo histórico Android](docs/ARCHIVO/ANDROID/README.md)

## Versionado

No se publica una versión de producto durante la preparación documental. La primera versión utilizable se definirá como un hito funcional en `docs/TECNICO/VERSIONADO.md`; `1.0.0` queda reservada para la primera versión que complete y supere la aceptación de todo el alcance aprobado para Prisma 1.0.

## Desarrollo

La tarea actual es cerrar los cimientos: producto, arquitectura, almacenamiento, seguridad, copias, origen de publicación, proceso de actualización, versionado y criterios de aceptación. Solo después se iniciará el código de la PWA.
