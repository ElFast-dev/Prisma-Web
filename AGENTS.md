# Mandato de trabajo — Prisma

## Autoridad

El propietario es la única autoridad para aprobar el producto, el alcance, el diseño, el alojamiento y las entregas. Las instrucciones recientes y explícitas prevalecen sobre documentos anteriores.

Una propuesta técnica no queda aprobada por estar documentada. No volver a preguntar decisiones que ya estén aprobadas, pero tampoco convertir decisiones antiguas en requisitos vigentes si el propietario ha pedido replantearlas.

## Directrices confirmadas

- Prisma se está reconstruyendo como PWA para uso principal en Android.
- Antes de programar se cierran los fundamentos imprescindibles.
- El coste total para el propietario debe ser 0 USD.
- El repositorio nuevo será el principal y cambiará de nombre a `Prisma`.
- El avance debe medirse por funciones completas que el usuario pueda utilizar.

La guía que prevalece sobre documentos heredados es [Replanteamiento y reglas](docs/REPLANTEAMIENTO_Y_REGLAS.md).

## Consultas, recomendaciones y decisiones

- Se puede y se debe consultar al propietario cuando una duda afecte de forma material al producto, la experiencia, los datos, la privacidad, el coste o la identidad visual.
- Hacer **una sola pregunta por turno**. No agrupar preguntas independientes ni presentar formularios largos. Preguntar únicamente lo necesario para desbloquear el siguiente paso.
- Antes de preguntar, revisar el contexto y los documentos para no repetir cuestiones ya contestadas. Si la respuesta puede inferirse con seguridad o la decisión es reversible y técnica, avanzar con una recomendación razonada.
- Acompañar las dudas importantes con una recomendación concreta cuando exista una opción claramente superior; explicar brevemente el beneficio y el sacrificio relevante, sin convertir cada decisión en una lista interminable de alternativas.
- Sugerir mejoras solo cuando aporten valor real a Prisma: mejor experiencia, calidad, seguridad, accesibilidad, rendimiento o coherencia. No proponer cambios por novedad, moda ni para mantener una conversación artificialmente abierta.
- Para una misma decisión, limitar el proceso a **dos rondas de aclaración/refinamiento**. Después, presentar la recomendación mejor sustentada y dejar la decisión concreta pendiente del propietario si necesita su aprobación. No insistir ni reabrir el tema salvo que aparezca evidencia nueva o el propietario lo solicite.
- Si una decisión no es bloqueante, registrarla como pendiente y continuar con el trabajo independiente. No detener todo Prisma por preferencias menores.
- Las decisiones de interfaz deben buscar que Prisma se vea y se comporte como el propietario desea. Antes de implementar una composición importante, mostrar una propuesta visual concreta y solicitar su opinión con una pregunta cada vez. Convertirla en diseño definitivo solo tras su aprobación; luego desarrollar y ajustar mediante iteraciones acotadas, no infinitas.
- No empezar una nueva ronda de diseño solo por gusto del agente. Cada revisión debe responder a una observación concreta del propietario o a un problema de usabilidad, accesibilidad o calidad verificable.

## No heredar sin revisar

El repositorio Android y sus documentos son material histórico. No copiar automáticamente su arquitectura, herramientas, procesos, versionado, modelo de datos, pantallas ni criterios de aceptación.

Las propuestas elaboradas para la PWA también deben justificarse. No tratar React, Vite, IndexedDB, Workers, OPFS, Argon2id ni una estructura concreta de carpetas como decisiones aprobadas hasta que se demuestre que hacen falta.

Los diseños y SVG existentes son referencias candidatas. Hay que comprobarlos en contexto web y móvil antes de convertirlos en especificaciones obligatorias.

## Regla de coste cero

No introducir planes de pago, dominios comprados, suscripciones, servicios con cobro variable, renovaciones ni facturación automática. Una cuota gratuita no sirve si una capacidad esencial obliga a pagar para seguir funcionando. Documentar límites, consecuencias y requisitos de tarjeta de cualquier servicio considerado.

**Cloudflare Pages está rechazado.** No conectarlo ni volver a proponerlo como opción aprobable.

## Fundamentos antes del código

No crear aplicación, pantallas, componentes de producto, Service Worker productivo ni bases de datos físicas hasta que el propietario apruebe:
- primer recorrido útil y alcance inicial;
- diseño web revisado;
- tecnología y arquitectura de alta calidad, justificadas por comparación y pruebas;
- persistencia, seguridad, exportación y recuperación;
- hosting de 0 USD y origen HTTPS estable;
- actualización de la PWA;
- pruebas y criterios de aceptación.

No convertir esta preparación en una fase documental infinita. Resolver únicamente lo necesario para empezar sin decisiones peligrosas o bloqueantes.

## Forma de desarrollar

- Priorizar recorridos verticales completos: interfaz → regla de negocio → persistencia → resultado visible al reabrir.
- Terminar y verificar una capacidad antes de empezar otra de tamaño comparable.
- No crear pantallas con controles inactivos ni datos ficticios presentados como reales.
- No añadir capas, patrones, dependencias, workers o abstracciones por anticipado; pero tampoco escoger soluciones básicas por comodidad: comparar opciones modernas y maduras y adoptar la mejor que cumpla calidad y coste cero.
- No generar múltiples rondas de CI idénticas ni tests que no protejan un comportamiento concreto.
- Comprobar el comportamiento real en Android, en los temas aprobados y offline cuando corresponda.
- Si una API del navegador no está disponible, ofrecer una alternativa clara; no fingir capacidades nativas.

## Calidad y protección de datos

- Nunca exponer diario, credenciales, copias descifradas o tokens en logs, artefactos públicos o telemetría.
- Nunca borrar datos personales para recuperar espacio.
- No prometer persistencia garantizada: mostrar los límites reales del navegador y probarlos.
- Validar una restauración por completo antes de modificar datos existentes.
- Un defecto que pueda perder datos, filtrar información o dejar inaccesible el diario bloquea la entrega afectada.

## Entregas y versiones

Usar [Versionado semántico](docs/TECNICO/VERSIONADO.md) conforme a SemVer 2.0. Incrementar MAYOR/MENOR/PARCHE según compatibilidad, funcionalidad compatible y correcciones. No reservar números para fases ni incrementarlos por commits, CI, documentación, refactors o builds. Publicar solo entregas completas, verificadas y aceptadas.

## Trabajo en GitHub

Antes de modificar un archivo, recuperar su contenido actual y SHA. No sobrescribir cambios concurrentes. Mantener los cambios pequeños, claros y recuperables. No eliminar el repositorio Android ni renombrar el nuevo hasta que el propietario haya verificado el contenido migrado y realice las acciones administrativas necesarias.
