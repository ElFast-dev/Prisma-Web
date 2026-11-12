> **Adaptación PWA:** estas referencias fueron aprobadas para Prisma y se conservan en la migración web. Sus composiciones y jerarquías aprobadas se mantienen; las unidades Android (dp/sp) se traducen a CSS responsive y se validan en pantalla real. Las menciones a Compose, CI y a los hitos numéricos 0.4.0/0.5.0 pertenecen a la historia de desarrollo Android y no representan implementación ni versiones publicadas de Prisma Web.

# Conceptos visuales de Fase 2 — Historial, Pendientes y ficha local

Los SVG de esta carpeta son referencias vectoriales dibujadas manualmente. Las propuestas de pantallas se presentan con los dos temas de Prisma y conservan la dirección visual aprobada del producto.

## Vistas aprobadas: Historial y Pendientes

El 11 de noviembre de 2026, el propietario confirmó la dirección visual presentada. Queda aprobada la composición principal de:

- [Historial · Obsidiana](prisma-fase2-historial-obsidiana.svg) y [Historial · Cuarzo](prisma-fase2-historial-cuarzo.svg).
- [Pendientes · Obsidiana](prisma-fase2-pendientes-obsidiana.svg) y [Pendientes · Cuarzo](prisma-fase2-pendientes-cuarzo.svg).

La aprobación incluye el encabezado con regreso, el título, el buscador local, el contador de películas, la lista vertical abierta y continua, la miniatura 56 × 84 dp, el título 14 sp/500, el año 12 sp/400, los metadatos específicos de cada lista y la navegación inferior con Personal seleccionado. Obsidiana y Cuarzo comparten estructura, jerarquía y comportamiento; solo adaptan los roles cromáticos de cada tema.

## Reglas de contenido aprobadas

- **Historial:** una fila por película, sin duplicados; contador de visionados y fecha del más reciente. Los registros individuales se conservan y consultan por separado desde la ficha.
- **Pendientes:** una fila por película, sin duplicados; fecha de incorporación y orden del más reciente al más antiguo.
- Los ejemplos de los SVG son ficticios. Los pósteres son ilustraciones vectoriales originales para las propuestas y no representan datos reales guardados en Prisma.

## Estados vacíos y búsquedas sin coincidencias — aprobados e implementados

El propietario aprobó los cuatro conceptos el 11 de noviembre de 2026. La aprobación cubre Historial y Pendientes en Obsidiana y Cuarzo, manteniendo la estructura principal ya aprobada:

- Estado vacío: prisma lineal, título y mensaje contextual específico de cada lista.
- Búsqueda sin coincidencias: lupa discreta, consulta conservada en el campo y mensaje neutral para probar otro título.
- Sin botones ni acciones adicionales.

La implementación quedó en el commit de código `137187d3c62687cf3feba67f8ab423cb89a7ec34` y se validó en **CI #199**. En ambas APIs pasaron `historyAndPendingEmptyStatesShowTheApprovedPrismIllustration` y `historyAndPendingNoResultsKeepTheSearchQueryInQuartz`. Se reutilizan `PrismaEmptyPrism` y `PrismaIconKind.SEARCH`.

**Importante sobre los iconos:** esta aprobación valida la composición y el comportamiento de los estados, no convierte las siluetas actuales en arte final. El diseño definitivo corresponde al propietario; consultar [la guía de iconografía](../ICONOGRAFIA/README.md).

## Ficha local mínima 0.4.0 — Concepto A aprobado

El 11 de noviembre de 2026, el propietario aprobó expresamente el **Concepto A — resumen primero**, en Obsidiana y Cuarzo. Los archivos A se refinaron para alinearlos con la especificación de ficha cinematográfica que Prisma ya tenía desde antes. Esta aprobación no reemplaza ni invalida las decisiones visuales anteriores: define únicamente la composición mínima local que se implementa en 0.4.0.

- [Ficha A · Obsidiana](prisma-ficha-local-a-obsidiana.svg)
- [Ficha A · Cuarzo](prisma-ficha-local-a-cuarzo.svg)

### Qué conserva del diseño original de Prisma

- Cabecera horizontal a todo lo ancho, con degradado inferior.
- Título grande blanco sobre la cabecera y flecha de regreso dentro de un control circular semitransparente.
- Claqueta gris sobre fondo gris oscuro como sustituto mientras no exista una imagen autorizada y disponible.
- Márgenes laterales coherentes y pocas superficies: se evita introducir tarjetas pesadas.
- Obsidiana y Cuarzo conservan la misma estructura, dimensiones y jerarquía; la cabecera cinematográfica permanece oscura en ambos temas para mantener la lectura del título.

### Refinamientos aprobados para esta ficha mínima

- El título y el año aparecen una sola vez; se eliminó la repetición del año que mostraba la propuesta inicial.
- El resumen del diario presenta el estado de Historial, el contador y el visionado más reciente cuando existen registros.
- La acción principal muestra «AGREGAR A HISTORIAL» cuando todavía no hay visionados y «REGISTRAR OTRO VISIONADO» cuando ya existen. Cada confirmación crea un registro independiente; nunca reemplaza los anteriores.
- «AGREGAR A PENDIENTES» se mantiene como acción secundaria cuando la película todavía no pertenece a esa lista. Si ya pertenece, se ofrece «RETIRAR DE PENDIENTES» únicamente desde la ficha y con confirmación.
- La sección «VISIONADOS» conserva filas sencillas y separadas, ordenadas de más reciente a más antiguo. La fecha aparece siempre; la hora solo se presenta cuando está guardada. Si falta, se indica «Hora no registrada».
- En 0.4.0 no se muestra menú de tres puntos vacío: Ocultos y otras acciones se incorporan únicamente en las versiones aprobadas para esas funciones.
- No se muestran metadatos remotos, póster real, género, duración, sinopsis no disponible, puntuaciones ni datos inventados.

### Diálogos y registro local

- Registrar visionado — [Obsidiana](prisma-ficha-registro-obsidiana.svg) · [Cuarzo](prisma-ficha-registro-cuarzo.svg). En 0.4.0 se ofrecen solo «Ahora» y «Seleccionar fecha».
- Confirmar retirada de Pendientes — [Obsidiana](prisma-ficha-retirar-pendientes-obsidiana.svg) · [Cuarzo](prisma-ficha-retirar-pendientes-cuarzo.svg). La confirmación elimina solo la relación con Pendientes; cancelar no modifica datos. El texto usado en la implementación aclara que la película y sus visionados se conservan.

Con «Ahora» se registra el instante local del teléfono. «Seleccionar fecha» permite indicar la fecha de inicio y guardar también una hora o conservarla desconocida. No se genera una hora estimada ni se convierte la fecha seleccionada en una hora ficticia. «Día de estreno» y «Ajustar al inicio» permanecen fuera de 0.4.0 y solo se mostrarán cuando 0.7.0 proporcione, respectivamente, una fecha de estreno verificada o una duración válida.

### Alternativa no seleccionada

- [Concepto B · Obsidiana](prisma-ficha-local-b-obsidiana.svg)
- [Concepto B · Cuarzo](prisma-ficha-local-b-cuarzo.svg)

B queda archivado como alternativa no seleccionada. No se implementará en paralelo ni se usará para reabrir la decisión A.

## Alcance de esta aprobación

La aprobación de A habilita su integración en Compose para 0.4.0. No aprueba ni adelanta calificaciones, Ocultos/restauración, listas manuales, TMDB, imágenes reales, Estadísticas ni ninguna otra función de 0.5.0 o versiones posteriores.

La composición principal de Historial/Pendientes y sus estados vacíos/sin coincidencias siguen implementados y validados. Sus listas conservan el póster provisional hasta que llegue la integración de imágenes de 0.7.0. Las pantallas y componentes continúan sujetos al proceso iterativo de [ESTADO_VISUAL.md](../ESTADO_VISUAL.md).
