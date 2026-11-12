> **Archivo histórico de la etapa Android.** Fuente sincronizada desde `feature/fase1-android-foundation` para preservar la última especificación/decisión disponible antes de retirar el repositorio anterior. No utilizar instrucciones técnicas Android como arquitectura vigente de Prisma Web.

# Prisma

**Diario cinematográfico personal para Android.** Prisma conserva la historia de cada espectador en el propio teléfono, ayuda a descubrir películas y aprende los gustos de forma local mediante su algoritmo **Espectro**.

## Autoridad del propietario y calidad del desarrollo

**El propietario humano es la única autoridad sobre Prisma. La IA es la colaboradora que analiza, diseña, crea y desarrolla la aplicación**, con iniciativa para detectar necesidades y sugerir mejoras justificadas. El propietario aprueba o rechaza cada propuesta. La IA no añade funciones por su cuenta y trabaja con autonomía dentro de lo ya aprobado.

La IA debe auditar periódicamente la arquitectura, el código, la seguridad, las dependencias y las pruebas. Si detecta problemas estructurales graves, debe aportar evidencia y comparar reparación, refactorización y reconstrucción limpia. No debe eliminar ni sustituir el trabajo existente sin autorización expresa del propietario. Una reconstrucción aprobada debe conservar los requisitos y datos, validar cada incremento y no afirmar que está «sin errores» sin evidencia.

Antes de cualquier tarea, todo agente debe leer AGENTS.md y docs/CONTEXTO_IA.md. La regla completa está en dichos documentos.

## REGLA DE ENTREGA FUNCIONAL — LAS PRUEBAS NO SON EL PRODUCTO

El objetivo de cada incremento es entregar una parte de Prisma que el propietario pueda abrir y utilizar realmente. **Las pruebas, los commits, la cantidad de casos automatizados y una CI verde son evidencia de calidad, no sustitutos de una función utilizable.**

- Desarrollar por recorridos verticales completos: pantalla y controles visibles → navegación → estado/ViewModel → dominio/repositorio → persistencia → actualización visible del resultado.
- No declarar una función implementada porque existan tablas Room, entidades, consultas DAO, métodos de repositorio, ViewModels o pruebas. Si el usuario no puede llegar a ella desde la aplicación y completar la acción, está pendiente de integración funcional.
- Cada incremento debe priorizar un flujo que el usuario pueda completar dentro de Prisma. Los tests se escriben junto al cambio para proteger el comportamiento nuevo y los recorridos afectados; no se crean rondas repetitivas de pruebas sin avance funcional correspondiente.
- No ejecutar una nueva CI solo para volver a demostrar lo mismo si no cambió el código, los tests o el entorno relevante. Investigar los fallos reales y usar pruebas focalizadas; mantener la regresión necesaria sin convertirla en el objetivo principal.
- La evidencia de progreso se expresa por lo que el usuario ya puede hacer en la aplicación, qué sigue sin estar conectado y qué impide terminarlo. No presentar el número de pruebas aprobadas como si describiera la funcionalidad visible.
- Un hito solo puede describirse como funcional cuando el recorrido aprobado está conectado de extremo a extremo, el usuario puede completarlo en el APK y las pruebas aplicables respaldan el comportamiento. Un APK que compila pero muestra controles inactivos, rutas sin destino o funciones accesibles solo desde pruebas no cumple ese criterio.
- Si una capacidad ya tiene su capa de datos probada pero carece de pantalla, controles o navegación, declararla **«lógica/datos implementados; interfaz y recorrido funcional pendientes»**. La prioridad siguiente es completar la integración aprobada, no seguir ampliando pruebas de esa capa sin necesidad.
- Mantener la paridad Obsidiana/Cuarzo en cada recorrido. No añadir acciones, accesos, botones, filtros ni otras funciones fuera del alcance aprobado.

## Estado actual

- Fase 0 (definición del producto) cerrada con aprobación del propietario el 9 de noviembre de 2026.
- Fase 1 (fundamentos Android y entrega continua) completada el 10 de noviembre de 2026 tras superar CI #129 y confirmar los 14 escenarios de validación física en el Galaxy A03. Fase 2 está autorizada y en desarrollo desde el 10 de noviembre de 2026; el primer incremento se centra en Room, alta manual y búsqueda local offline.
- La rama de trabajo `feature/fase1-android-foundation` contiene la implementación Android inicial y sigue separada de `main`.
- La CI de aceptación, [#129](https://github.com/ElFast-dev/Prisma/actions/runs/42948770174), terminó con `success` en 7 min 31 s: build/lint/JVM, matriz API 26/API 37, validación de `versionCode`, BackupManager y publicación del APK interno. El recorrido físico de aceptación en el Galaxy A03 también quedó completado y registrado.
- CI publicó un APK interno actualizable de `dev.elfast.prisma.internalfix2`; los artefactos de Actions son temporales y no sustituyen una GitHub Release pública. `main` permanece sin integrar estos cambios.
- Las decisiones confirmadas están en [Requisitos del producto](docs/PRODUCTO/REQUISITOS.md).
- Las propuestas y las preguntas abiertas se identifican por separado; una sugerencia del asistente no se considera aprobada sin confirmación expresa.
- Antes de programar una fase, se crea su especificación breve, se presenta al propietario y se espera su aprobación explícita.

## Documentos principales

- [Guía breve de contexto y reglas para el asistente](docs/CONTEXTO_IA.md)
- [Requisitos del producto](docs/PRODUCTO/REQUISITOS.md)
- [Diseño técnico](docs/TECNICO/DISENO_TECNICO.md)
- [Roadmap](docs/ROADMAP.md)
- [Operación y capacidades de GitHub](docs/TECNICO/OPERACION_GITHUB.md)
- [Autorización particular de TMDB comunicada para Prisma](docs/LICENCIAS/TMDB_PRISMA.md)
- [Estado y decisiones visuales](docs/DISENO/ESTADO_VISUAL.md)
- [Conceptos visuales de Fase 2 — Historial y Pendientes](docs/DISENO/CONCEPTOS_FASE2/README.md)
- [Referencias técnicas oficiales](docs/REFERENCIAS_TECNICAS.md)

## Reglas de trabajo

1. Todo el código y la documentación viven en este repositorio.
2. Antes de cualquier acción, leer `AGENTS.md` y `docs/CONTEXTO_IA.md`; comprobar la rama, el commit y el estado real del trabajo. Auditar la calidad antes de ampliar capacidades importantes.
3. Avanzar las fases estrictamente en el orden del roadmap.
4. No preparar ni programar trabajo de fases posteriores mientras una fase anterior siga activa.
5. Antes de cada fase, redactar una especificación con alcance, versiones, entregables, dependencias y criterios de aceptación. El propietario aprueba esa especificación.
6. El cierre de una fase y el inicio de la siguiente son autorizaciones distintas. Cuando haga falta autorización, explicar qué se solicita, por qué corresponde ahora, qué habilita y qué ocurre si se aplaza; esperar la decisión antes de ejecutar. No pedir permiso para pasos rutinarios ya aprobados.
7. No programar hasta tener aprobada la especificación de la fase y autorización explícita para iniciarla.
8. Identificar el desarrollo mediante fases e hitos; identificar los APK internos con CI, SHA y variante. Solo crear una versión SemVer cuando exista una entrega de producto aprobada que supere su puerta de aceptación.
9. Mantener requisitos y decisiones visuales sincronizados con lo acordado. Si algo cambia, actualizar los documentos y explicarlo.
10. Mostrar conceptos visuales en la conversación; no usar imágenes generadas por IA para sustituir los diseños. No cerrar una pantalla sin aprobación.
11. No añadir funciones sugeridas hasta que el propietario las apruebe.
12. Los conceptos visuales deben tener calidad de presentación, contexto completo, jerarquía clara y alternativas realmente distinguibles. Cuando el propietario pida mejores conceptos, rehacerlos con una mejora visible y respetar las decisiones ya aprobadas. La regla detallada está en `docs/DISENO/ESTADO_VISUAL.md`.
13. **Regla del Porqué:** justificar decisiones relevantes de producto, arquitectura, seguridad y coste. Explicar el problema, el beneficio, los límites y la alternativa cuando cambien el comportamiento o el riesgo; los cambios rutinarios no requieren informes extensos.
14. **Multitarea segura:** avanzar en paralelo investigación, implementación y pruebas independientes; aislar cambios y mantener un solo escritor por archivo, rama, emulador o recurso. Android CI conserva la ejecución activa y reemplaza una ejecución pendiente obsoleta por la actualización más reciente. La regla operativa completa está en `docs/CONTEXTO_IA.md`.
15. **Progreso máximo:** acotar cada hipótesis a dos ciclos enfocados; una evidencia nueva puede justificar otra hipótesis, sin detener el proyecto. No esperar CI para avanzar en tareas independientes; cada ciclo deja un resultado tangible. No recortar funciones aprobadas ni controles obligatorios.
16. **CI eficiente sin perder cobertura:** la ejecución completa debe apuntar a 10 minutos o menos; API 26 y API 37 se validan en paralelo con límites por etapa. El timeout nunca cuenta como prueba superada y el APK final solo se publica cuando todas las suites obligatorias pasan. Detalle en `docs/CONTEXTO_IA.md`.

## Principios no negociables

- Películas solamente en el alcance inicial; series y episodios quedan fuera.
- Historial, calificaciones, estadísticas y aprendizaje de Espectro permanecen en el dispositivo.
- No se necesita una cuenta de Prisma ni un servidor de Prisma.
- Debe funcionar sin conexión para las funciones basadas en datos ya guardados.
- No inventar información, puntuaciones, disponibilidad ni enlaces.
- No mostrar valores técnicos inválidos como duración de -1 minuto.
- Las búsquedas y solicitudes de información a TMDB salen del dispositivo; el historial personal no se envía.
- Las copias de seguridad son exportaciones manuales cifradas; Prisma no sincroniza datos personales mediante una nube propia.
- Las actualizaciones se distribuyen mediante GitHub Releases y pueden gestionarse desde la propia aplicación, respetando el instalador y las autorizaciones del sistema Android.

## Desarrollo, compilaciones y versiones de producto

El roadmap se identifica con fases e hitos (por ejemplo, F2-H2), no con números SemVer. Los antiguos 0.2.0–0.9.0 se conservan en el historial como alias de desarrollo; no fueron Releases de producto.

Las compilaciones internas se identifican mediante GitHub Actions CI, SHA del commit y variante Android (por ejemplo, PRISMA-DEV · CI #219 · 6315ba6 · internalFix2Debug). Son artefactos de pruebas, no versiones del producto.

SemVer se reserva para entregas instalables aprobadas. La primera alpha requiere el recorrido local básico completo; una versión estable 0.x.y requiere cumplir todo el MVP de la sección 17 de Requisitos; 1.0.0 requiere además el alcance completo de la sección 18. No se publican tags ni Releases por cerrar fases o superar CI.

La política técnica completa, los criterios, la secuencia de versionCode y los valores Android comprobados están en [Versionado del producto y compilaciones internas](docs/TECNICO/VERSIONADO_Y_COMPILACIONES.md). La instalación del MVP se realiza mediante Android; el actualizador integrado se mantiene fuera del MVP.
