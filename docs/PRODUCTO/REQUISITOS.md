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

## 4. Primera entrega candidata — alcance por revisar

La primera entrega candidata debería permitir completar de principio a fin este recorrido, si el propietario confirma que sigue siendo la prioridad:

**Crear una película manualmente o encontrarla con TMDB → guardarla en Pendientes → registrar uno o varios visionados con fecha y calificación → encontrarla en Historial → ocultarla y restaurarla conservando el estado previo → crear una lista personalizada y añadir/quitar películas → consultar y modificar el diario sin conexión → exportar una copia cifrada y restaurarla sin perder datos.**

Incluye:
- PWA instalable, navegación Personal/Descubrir y temas Obsidiana/Cuarzo.
- Catálogo local y alta manual con título obligatorio y año opcional.
- Historial, Pendientes y Ocultos con búsqueda local.
- Registros de visionado independientes; un nuevo visionado no sobrescribe los anteriores.
- Fecha/hora cuando se conozca y calificación personal por visionado.
- Restauración de películas ocultas a su estado previo.
- Listas personalizadas básicas: crear, renombrar, eliminar, añadir y quitar películas sin duplicados.
- TMDB esencial: token configurado por el usuario, búsqueda por título, selección supervisada ante coincidencias ambiguas y datos básicos disponibles.
- Caché local de metadatos e imágenes consultadas.
- Funcionamiento offline para datos guardados.
- Exportación/restauración manual cifrada, comprobación de integridad y recuperación ante fallos.
- Gestión visible del espacio usado, cuota estimada y resultado de almacenamiento persistente.
- Publicación web con changelog en español. No requiere APK ni instalación desde una tienda.

**No se considerará utilizable una entrega que sea** una base de datos sin pantallas conectadas, una interfaz con controles inactivos, un prototipo que pierde datos al cerrar o una búsqueda offline que solo muestra datos simulados.

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
