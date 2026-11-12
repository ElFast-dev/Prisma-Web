# Modelo de datos — Prisma

**Estado:** contrato conceptual del primer recorrido; no constituye un esquema físico ni autoriza crear la base de datos antes de la aprobación técnica.

## Entidades necesarias para el primer recorrido

### Película local

- Identificador local estable (UUID), independiente del título y del año.
- Título obligatorio; año opcional.
- Información descriptiva/metadatos opcionales, claramente distinguibles entre dato introducido por el usuario y dato externo.
- La identidad local no cambia al vincular posteriormente un ID de TMDB.
- La película y sus visionados se conservan como entidades separadas.

### Visionado

Cada reproducción es un registro independiente, con identificador propio y vínculo a la película.

Campos conceptuales:
- Película a la que pertenece.
- Momento de inicio.
- Precisión temporal explícita: solo día, fecha/hora exacta o fecha/hora estimada.
- Origen del momento: ahora, fecha de estreno, selección manual o ajuste estimado por duración.
- Calificación personal opcional entera de 1 a 10.
- Fechas de creación/modificación necesarias para ordenar y auditar cambios.

No transformar una fecha que solo conoce el día en una hora ficticia. Para instantes concretos se conserva el instante inequívoco y la información necesaria para presentarlo correctamente en la zona horaria local. Un cálculo basado en duración se marca como estimado.

### Calificación provisional

Si el usuario califica una película antes de tener un visionado, la nota queda provisionalmente vinculada a la película. Al crear el siguiente visionado se transfiere a ese registro en la misma operación y se elimina el estado provisional. Cuando ya existen varios visionados, el usuario elige expresamente el registro que desea calificar. Una edición afecta solo al visionado seleccionado.

## Invariantes de integridad

- Cada visionado conserva su identidad y no se sobrescribe al crear una repetición.
- Una película puede tener cero, uno o muchos visionados.
- Eliminar o modificar una calificación no altera fecha ni identidad del visionado.
- La calificación provisional solo existe mientras la película no tenga visionados; se consume al crear el siguiente.
- Cambiar el estado de una película no elimina registros de visionado.
- Vincular la película local con metadatos externos no duplica la película ni pierde datos introducidos por el usuario.
- Una operación que crea un visionado y consume una calificación provisional debe ser atómica.
- Las restauraciones validan identidades, relaciones y duplicados antes de tocar datos existentes.

## Ampliaciones posteriores

Estados Pendientes/Ocultos y su restauración, listas, TMDB y cachés, estadísticas y Espectro se incorporan al modelo cuando el alcance de cada función se apruebe. No crear entidades especulativas para funciones futuras.

## Regla

Mantener el modelo independiente de Dexie/IndexedDB o SQLite/OPFS hasta terminar la comparación. No crear stores, tablas, índices ni migraciones físicas antes de aprobar el almacenamiento canónico.
