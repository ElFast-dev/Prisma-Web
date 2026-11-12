# Requisitos de producto — Prisma Web

**Estado:** borrador de producto en revisión; no es una lista de funciones aprobadas.  
**Fecha de revisión:** 12 de noviembre de 2026.  
**Plataforma de trabajo:** PWA para uso principal en Android.  
**Referencia histórica completa:** `docs/ARCHIVO/ANDROID/REQUISITOS.md`.

## 1. Visión

Prisma es un espacio cinematográfico personal, privado y ordenado para registrar la vida del usuario como espectador. Debe recordar qué películas ha visto, cuántas veces, cuándo las vio y qué puntuación dio a cada visionado; ayudar a decidir qué ver y mostrar cómo evolucionan sus gustos.

No debe sentirse como otro catálogo ni como una red social. Debe ser cinematográfico, limpio, honesto, útil sin conexión y libre de spoilers cuando la protección correspondiente esté activada.

**Espectro** es el algoritmo propio de aprendizaje y recomendaciones de Prisma. Aprende localmente a partir de las acciones y metadatos cinematográficos disponibles, explica sus recomendaciones con evidencias y no envía el historial a servicios externos.

## 2. Público y plataforma

- Aplicación personal cuyo dispositivo principal es un teléfono Android.
- Distribución como PWA instalable; experiencia optimizada primero para Chrome Android, con degradación clara cuando una API no esté disponible.
- El navegador aloja la aplicación; el teléfono conserva y procesa los datos.
- No se requiere una cuenta de Prisma ni un backend propio.
- Alcance inicial candidato: películas. La decisión sobre series y episodios se revisará antes de fijar el alcance de la primera entrega.
- La aplicación debe adaptarse a tamaños de pantalla y densidades diferentes sin romper los recorridos.

## 3. Principios no negociables

1. La base local del dispositivo es la fuente de verdad de todos los datos personales.
2. Historial, fechas de visionado, calificaciones, listas, estadísticas y perfil de Espectro no salen del dispositivo.
3. No hay cuenta, backend propio, sincronización en nube, funciones sociales, anuncios ni telemetría de comportamiento.
4. La conexión se utiliza para solicitudes explícitas a TMDB y para recibir versiones web de Prisma. No se transmite actividad personal.
5. El diario y las listas con datos guardados se pueden consultar y modificar sin conexión.
6. Los datos remotos consultados se conservan localmente, dentro de la capacidad física y la cuota concedida por el navegador.
7. Las copias portables se generan manualmente y se cifran; no se confía la única copia de los datos al almacenamiento del navegador.
8. Nunca se inventan metadatos, disponibilidad, puntuaciones ni enlaces. Los datos ausentes se representan como ausentes.
9. Obsidiana y Cuarzo tienen la misma cobertura funcional y prioridad.
10. No introducir SDK, servicios, analítica o dependencias externas sin justificación y aprobación.

## 4. Primer recorrido funcional acordado

La primera capacidad vertical que guiará el desarrollo y las pruebas será el diario local básico:

**Crear manualmente una película → añadirla a Historial → registrar uno o varios visionados → calificar cada visionado → abrir Visionados para consultar sus registros → cerrar y reabrir Prisma y comprobar que los datos siguen disponibles → repetir el trabajo sin conexión.**

Alcance de ese recorrido:
- Alta manual de una película con título obligatorio y año opcional.
- Identidad local estable, independiente del título.
- Incorporación al Historial.
- Visionados múltiples como registros independientes.
- Fechas con precisión explícita: día conocido sin hora, instante exacto o instante estimado.
- Calificación personal entera de 1 a 10 por visionado; las estrellas solo aparecen en el selector, no en la ficha.
- Si hay varios visionados, el usuario elige a cuál asignar o modificar la nota. Si aún no existe ninguno, la calificación queda provisional y se asocia al siguiente.
- Acceso «Visionados» que abre la vista con registros individuales.
- Persistencia local y consulta/modificación offline del diario guardado.
- Exportación y restauración manual cifrada, verificada antes de almacenar datos personales reales.
- Temas Obsidiana y Cuarzo para las pantallas implementadas.

La alta manual se incluye para validar el diario sin exigir una API externa. TMDB, el feed de Descubrir y sus filtros no son dependencias de este primer recorrido; se incorporarán después. El historial, las calificaciones y las listas nunca se transmiten a TMDB.

Este alcance inicial no convierte automáticamente en parte de la primera entrega pública las funciones futuras de Pendientes, Ocultos, listas, estadísticas o Espectro. Se priorizarán después, sin asignar versiones anticipadas.

**Criterio de utilidad:** no se guardarán datos personales reales en una versión que todavía no pueda exportarlos y restaurarlos íntegramente. No se considerará completo un prototipo con datos simulados, controles inactivos o persistencia no verificada.

## 5. Funciones candidatas posteriores (no aprobadas automáticamente)

- Estadísticas y visualizaciones completas de hábitos cinematográficos.
- Espectro: aprendizaje local, recomendaciones personalizadas explicables y modos Afinidad, Equilibrado y Exploración.
- Gestión avanzada de listas: colores, collages, fijación, reordenación, filtros y contadores avanzados.
- Feed de descubrimiento avanzado y filtros complejos.
- Ficha ampliada: créditos, tráileres, colecciones, películas relacionadas y disponibilidad de streaming según datos disponibles.
- Configuración avanzada de región e idioma.
- Protección avanzada de spoilers.
- Historial de versiones y experiencia de actualización dentro de Prisma, compatible con el mecanismo de actualizaciones web controladas.

No existe un mapa de versiones futuras. La composición de entregas se definirá después de validar el primer recorrido útil. Las listas inteligentes que añaden o retiran películas automáticamente siguen siendo una idea sin aprobar.

## 6. Experiencia y navegación

Se conserva la estructura aprobada de dos secciones principales:
- **Personal:** Historial, Pendientes, Ocultos y Gestionar listas en la primera entrega, si se confirma ese alcance.
- **Descubrir:** búsqueda de películas y acceso a su ficha.

Estadísticas es una función candidata posterior a la primera entrega. No se muestra un acceso vacío o deshabilitado.

Los nombres propios se mantienen: **Espectro**, **Obsidiana** y **Cuarzo**. La interfaz y los mensajes se mantienen en español.

## 7. Integridad de los datos

- Identidad estable de película independiente de título y año; los registros locales manuales deben poder vincularse después a TMDB sin duplicar ni perder visionados.
- Cada visionado es una entidad individual.
- Las operaciones que mueven películas entre estados deben ser atómicas.
- Las migraciones de esquema deben ser versionadas, transaccionales y probadas con copias reales anonimizadas.
- Un fallo de TMDB no debe bloquear el diario local.
- Una restauración se valida por completo antes de modificar la base actual.

## 8. Criterios candidatos de aceptación

- Los recorridos aprobados se completan desde pantallas visibles en un teléfono Android.
- Los datos sobreviven a cierre, reapertura y reinicio del dispositivo dentro de los límites documentados del almacenamiento web.
- El flujo diario funciona sin red con datos guardados.
- La exportación cifrada puede restaurarse en una instalación/origen compatible.
- Una contraseña incorrecta, archivo alterado o versión incompatible no sobrescribe los datos existentes.
- Cuota insuficiente, persistencia denegada y errores del navegador se comunican sin borrar datos personales.
- No hay P0/P1 abiertos en seguridad, pérdida de datos o recorridos obligatorios.
- Obsidiana y Cuarzo mantienen paridad.
- Rendimiento, accesibilidad y compatibilidad se verifican en dispositivos reales, incluido el teléfono del propietario.

## 9. Revisión del material heredado

El archivo Android conserva decisiones y requisitos anteriores para consulta. Ninguno se convierte en especificación web solo porque no dependa de Kotlin o Compose. Revalidar utilidad, prioridad y experiencia PWA, y registrar únicamente las decisiones que el propietario vuelva a confirmar.

**Pendiente:** elegir el primer recorrido realmente útil, aprobar su alcance y cerrar los fundamentos técnicos y de coste cero. No se utiliza un mapa de versiones SemVer.
