# Modelo conceptual de datos — Prisma

**Estado:** propuesta base para aprobación de Fase 0.  
**Objetivo:** definir entidades e invariantes antes de crear el esquema IndexedDB.

## 1. Reglas

- Una película tiene un identificador local estable, independiente del título.
- El identificador TMDB es opcional; una película manual debe poder enriquecerse y vincularse a TMDB sin duplicar ni perder datos propios.
- Los visionados son registros independientes: registrar otro visionado nunca sobrescribe uno anterior.
- Historial no es una lista de títulos duplicados: cada película aparece una vez y contiene cero o más visionados.
- Ocultar conserva el estado anterior y no borra ningún dato.
- Las listas personalizadas son independientes de Pendientes, Historial y Ocultos; una película puede pertenecer a varias listas, sin duplicarse dentro de la misma.
- Espectro usa datos locales; su perfil puede recalcularse y nunca sustituye la fuente original de eventos.

## 2. Entidades conceptuales

### Movie
Identidad local, título, año opcional, estado de biblioteca, identificador TMDB opcional, metadatos disponibles, fechas de creación/actualización y referencias de imágenes locales.

### Viewing
Identificador propio, Movie ID, fecha/hora del visionado (si se conoce), zona horaria o contexto necesario para conservar la fecha local, calificación individual y notas solo si ya están aprobadas en requisitos. Una película puede tener muchos Viewing.

### HiddenState
Movie ID, instante de ocultación y estado previo (Vista/Pendiente/sin marcador) para restaurar exactamente el estado anterior. Ocultar no elimina Viewing ni listas.

### CustomList
Identificador, nombre, descripción opcional y campos de organización permitidos por la fase. Sus restricciones de unicidad y longitud se conservan según requisitos.

### CustomListMovie
Relación entre CustomList y Movie, con restricción única compuesta para impedir duplicados dentro de la misma lista.

### MovieMetadata
Datos de catálogo obtenidos de TMDB, con procedencia, fecha de consulta y campos disponibles. No se debe tratar un dato remoto ausente como si fuera un valor inventado.

### AppPreference
Tema Obsidiana/Cuarzo y otras preferencias locales aprobadas. No mezclar preferencias con entidades cinematográficas.

### SpectrumProfile
Perfil derivado localmente y versionado, acompañado de fecha/versión del algoritmo. Se puede reconstruir desde las señales originales y no contiene telemetría remota.

## 3. Relaciones

- Movie 1:N Viewing.
- Movie N:M CustomList mediante CustomListMovie.
- Movie 1:0..1 HiddenState activo.
- Movie 1:0..1 MovieMetadata enlazado a TMDB (el metadato puede ser parcial).
- AppPreference y SpectrumProfile son registros locales independientes.

## 4. Índices e invariantes necesarios

- Índice de búsqueda normalizada por título local (insensible a mayúsculas/minúsculas y tildes).
- Índice de Movie por TMDB ID para evitar duplicados cuando exista ID estable.
- Índice de Viewing por Movie ID y fecha para consultas de historial y estadísticas.
- Índices de asociación por CustomList ID y Movie ID.
- Operaciones de cambio de estado y asociación ejecutadas en transacciones.
- No eliminar una Movie al quitarla de una lista.
- Al borrar una CustomList, eliminar solo la lista y sus relaciones, nunca Movie ni Viewing.
- La calificación pertenece al Viewing, no a Movie.
- Las fechas se almacenan en un formato inequívoco y se muestran respetando la semántica local de la fecha de visionado.

## 5. Esquema físico y migraciones

La versión física de IndexedDB, nombres de stores, índices y versiones de migración se definen en la especificación técnica de la fase que vaya a implementar el diario. Cada migración debe ser monotónica, reversible mediante copia o recuperación, y probada con fixtures de versiones anteriores. Nunca destruir la base anterior antes de validar la nueva.

## 6. Pendientes antes de congelar

- Revisar todos los casos históricos de fechas/horas y visionados repetidos.
- Confirmar semántica de una película que vuelve a añadirse a Pendientes después de haber sido vista.
- Definir la estrategia de normalización de títulos y acentos.
- Definir el límite y formato exacto de campos de metadatos TMDB.
- Determinar qué parte de SpectrumProfile se persiste y qué parte se calcula bajo demanda.

No empezar la codificación del esquema hasta aprobar estos invariantes.
