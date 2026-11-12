# Prisma

**Diario cinematográfico personal para Android.** Prisma conserva la historia de cada espectador en el propio teléfono, ayuda a descubrir películas y aprende los gustos de forma local mediante su algoritmo **Espectro**.

## Regla principal de autoridad y colaboración

**El propietario humano es la única autoridad y quien toma las decisiones finales sobre Prisma. La IA es la colaboradora encargada de analizar, diseñar, crear y desarrollar la aplicación.** La IA debe aportar criterio, detectar necesidades y sugerir ideas o mejoras útiles, explicando sus razones, beneficios, costes y riesgos; el propietario decide qué se aprueba, se rechaza o se pospone. Una sugerencia de la IA nunca equivale a una aprobación ni autoriza su implementación. La IA trabaja con autonomía dentro del alcance ya aprobado, pero no añade, elimina, sustituye ni cambia funciones o fases sin autorización expresa del propietario. Esta regla prevalece sobre cualquier recomendación o documento que la contradiga.

Antes de cualquier tarea, todo agente de IA debe leer el mandato obligatorio de la raíz (AGENTS.md) y la guía completa de contexto (docs/CONTEXTO_IA.md). Esta comprobación se hace antes de analizar, diseñar, programar o modificar cualquier cosa.

La IA también debe auditar de forma continua la arquitectura, la calidad del código, las dependencias, la seguridad y las pruebas. Si detecta problemas estructurales graves, debe demostrarlo, comparar reparación frente a reconstrucción y recomendar la mejor opción. Nunca eliminará ni sustituirá el trabajo existente sin autorización expresa del propietario. Una reconstrucción aprobada debe conservar los requisitos y datos, validar cada incremento y no declarar «sin errores» sin evidencia de pruebas.

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
- La especificación formal de Fase 1 y su inicio fueron aprobados expresamente el 9 de noviembre de 2026; la fase está en curso.
- La programación ha comenzado; todavía no se ha generado una compilación.
- Las decisiones confirmadas están en [Requisitos del producto](docs/PRODUCTO/REQUISITOS.md).
- Las propuestas y las preguntas abiertas se identifican por separado; una sugerencia del asistente no se considera aprobada sin confirmación expresa.
- Antes de programar una fase, se crea su especificación breve, se presenta al propietario y se espera su aprobación explícita.

## Documentos principales

- [Guía breve de contexto y reglas para el asistente](docs/CONTEXTO_IA.md)
- [Requisitos del producto](docs/PRODUCTO/REQUISITOS.md)
- [Diseño técnico](docs/TECNICO/DISENO_TECNICO.md)
- [Roadmap](docs/ROADMAP.md)
- [Autorización particular de TMDB comunicada para Prisma](docs/LICENCIAS/TMDB_PRISMA.md)
- [Estado y decisiones visuales](docs/DISENO/ESTADO_VISUAL.md)
- [Referencias técnicas oficiales](docs/REFERENCIAS_TECNICAS.md)

## Reglas de trabajo

1. Todo el código y la documentación viven en este repositorio.
2. Antes de cualquier acción, leer AGENTS.md y docs/CONTEXTO_IA.md; comprobar la rama, el commit y el estado real del trabajo. Consultar las secciones pertinentes de los documentos fuente.
3. Avanzar las fases estrictamente en el orden del roadmap.
4. No preparar ni programar trabajo de fases posteriores mientras una fase anterior siga activa.
5. Antes de cada fase, redactar una especificación con alcance, versiones, entregables, dependencias y criterios de aceptación. El propietario aprueba esa especificación.
6. El cierre de una fase y el inicio de la siguiente son autorizaciones distintas. Cuando haga falta autorización, explicar qué se solicita, por qué corresponde ahora, qué habilita y qué ocurre si se aplaza; esperar la decisión antes de ejecutar. No pedir permiso para pasos rutinarios ya aprobados.
7. No programar hasta tener aprobada la especificación de la fase y autorización explícita para iniciarla.
8. Cada versión debe ser un incremento pequeño y comprobable. Registrar cada versión en GitHub con una explicación sencilla y, cuando sea viable, un APK instalable.
9. Mantener requisitos y decisiones visuales sincronizados con lo acordado. Si algo cambia, actualizar los documentos y explicarlo.
10. Mostrar conceptos visuales en la conversación; no usar imágenes generadas por IA para sustituir los diseños. No cerrar una pantalla sin aprobación.
11. No añadir funciones sugeridas hasta que el propietario las apruebe.
12. Los conceptos visuales deben tener calidad de presentación, contexto completo, jerarquía clara y alternativas realmente distinguibles. Cuando el propietario pida mejores conceptos, rehacerlos con una mejora visible y respetar las decisiones ya aprobadas. La regla detallada está en `docs/DISENO/ESTADO_VISUAL.md`.
13. **Regla del Porqué:** toda función, decisión, elemento visual, interacción, dependencia, proceso o cambio debe tener una razón explícita y comprensible. Al proponerlo o incorporarlo, explicar qué problema resuelve, qué beneficio aporta y por qué se prefiere frente a alternativas relevantes. Si no existe una justificación útil, no se añade. El propietario puede preguntar «¿Por qué?» en cualquier momento y debe recibir una explicación concreta, incluidas sus ventajas, límites y consecuencias.

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

## Versionado

Todas las versiones distribuidas de Prisma se publicarán en GitHub Releases con un changelog obligatorio en español y un APK instalable. El mismo changelog de cada Release se podrá consultar dentro de Prisma, tanto al revisar una actualización como en el historial de versiones. El actualizador solo buscará versiones cuando el usuario pulse «Buscar actualizaciones» desde Ajustes; no realizará consultas automáticas al iniciar ni en segundo plano. La instalación respetará las autorizaciones y confirmaciones del sistema Android.

Prisma usa Semantic Versioning (SemVer) con una única secuencia pública y global para toda la aplicación. La numeración es continua entre fases: cada fase puede contener varias versiones, pero al comenzar otra fase no se reinicia ni se repite la numeración. Antes de completar el producto, las versiones serán 0.x.y; cada entrega con funcionalidad nueva incrementará el número menor y cada corrección sin ampliar funcionalidad incrementará el número de parche. La versión 1.0.0 será la primera que cumpla todo el alcance aprobado. Después se continuará con 1.1.0, 1.2.0, etc. para mejoras, y 1.0.1, 1.0.2, etc. para correcciones. Cada versión entregada debe corresponder a un incremento pequeño, verificable y aprobado.
