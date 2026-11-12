> **Descubrir — composición confirmada por el propietario (12 de noviembre de 2026):** barra superior integrada con búsqueda, Filtros y Ajustes; Feed continuo de tres columnas con pósteres verticales 2:3 y sin títulos debajo; píldora flotante Personal/Descubrir. Se conserva en Obsidiana y Cuarzo. Marcadores, filtros detallados, mosaico alternativo y modos de Espectro se especificarán aparte. Ver [concepto anterior a SVG](CONCEPTO_ANTERIOR_A_SVG.md).

> **Personal — composición confirmada por el propietario (12 de noviembre de 2026):** cuatro tarjetas cuadradas en una cuadrícula 2×2 (Historial, Pendientes, Ocultos y Estadísticas), con «Gestionar listas» como fila de ancho completo debajo. Es exactamente el diseño anterior a los SVG que más le gustaba. No sustituirlo por las cuatro filas de la simplificación posterior. Ver [historial de conceptos](HISTORIAL_CONCEPTOS_ANTES_SVG.md).

> **Preferencia visual reconfirmada:** el propietario recuerda y prefiere un diseño anterior a los SVG posteriores. El registro recuperado del 6 de noviembre muestra Personal con cuatro tarjetas cuadradas en una cuadrícula 2×2 y «Gestionar listas» en una fila completa debajo; Descubrir tenía búsqueda, Filtros y Ajustes en una barra integrada y un Feed de pósteres en tres columnas. El 9 de noviembre se simplificó el MVP a cuatro filas de Personal y una búsqueda con resultados, antes de vincular los SVG. Esta cronología está en [HISTORIAL_CONCEPTOS_ANTES_SVG.md](HISTORIAL_CONCEPTOS_ANTES_SVG.md). El diseño anterior será la referencia de los próximos conceptos; su adaptación final a PWA se presentará en la conversación para que el propietario elija.
>
> **No generar imágenes de interfaz con IA.** Los conceptos se recrean directamente en la conversación con maquetas/composiciones de interfaz comparables en Obsidiana y Cuarzo.

> **Confirmación del propietario — 12 de noviembre de 2026:** se conservan expresamente los temas **Obsidiana** y **Cuarzo** como identidad visual de Prisma. Sus paletas recuperadas del proyecto anterior están detalladas en [TEMAS_OBSIDIANA_Y_CUARZO.md](TEMAS_OBSIDIANA_Y_CUARZO.md). No se reabren sus nombres ni se sustituyen sus colores por una propuesta nueva sin petición del propietario.
>
> La visión completa de la IA anterior, con la distinción entre conceptos previamente aprobados, propuestas futuras y decisiones pendientes, está en [VISION_HEREDADA.md](VISION_HEREDADA.md). La antigua rama registró aprobaciones de algunas composiciones; estas se conservan como antecedentes reales, pero su adaptación a PWA se revisa en contexto web antes de implementarlas. Las preferencias de los dos temas sí han sido reconfirmadas ahora.

# Estado visual — Prisma

**Estado:** material visual heredado en revisión para PWA. No es una especificación final aprobada para web.

## Cómo utilizar lo existente

Los SVG, conceptos de pantalla, paletas, medidas y composiciones proceden de la etapa anterior. Se conservan como referencias para no perder trabajo, pero no se trasladan automáticamente a la aplicación.

Cada elemento debe revisarse:
- ¿Resuelve bien el recorrido real?
- ¿Se adapta a Chrome Android, instalación standalone y distintos tamaños?
- ¿Es accesible con zoom, texto grande, contraste y áreas táctiles?
- ¿Aporta claridad o añade complejidad?
- ¿Existe una alternativa web más simple y usable?

Cuando una propuesta antigua no sea la mejor, se rediseña. No se conserva solo por haber sido aprobada en Android.

## Identidad visual candidata

Se pueden explorar como punto de partida el carácter cinematográfico, sobrio y legible, los temas Obsidiana y Cuarzo, Inter si su licencia/tamaño/carga offline resultan convenientes e iconografía vectorial sencilla.

Ningún color, peso tipográfico, medida o componente queda congelado hasta que el propietario apruebe la adaptación web.

## Navegación y pantallas

Personal, Descubrir, Historial, Pendientes, Ocultos, listas, fichas y Ajustes son conceptos heredados que requieren revisión de prioridad y flujo.

Las composiciones SVG no son pantallas finales. No se traducen medidas Android a CSS de forma mecánica. Primero se valida el contenido y el recorrido; después se define una interfaz responsive y se prueba en el teléfono.

## Iconografía y archivos de referencia

Los archivos en `CONCEPTOS_MVP/`, `CONCEPTOS_FASE2/` e `ICONOGRAFIA/` siguen disponibles como material histórico. La palabra «aprobado» en un nombre de carpeta o README describe la selección antigua, no la aprobación de su uso en la PWA.

No eliminar ni sustituir los originales hasta que exista una revisión visual nueva y el propietario apruebe los cambios.


## Descubrir — panel de Filtros

**Estado:** dirección visual y organización aprobadas por el propietario el 12 de noviembre de 2026. No constituye implementación ni fija la tecnología del componente.

- El embudo de la barra integrada abre un panel inferior expandido (*bottom sheet*) superpuesto a Descubrir; como referencia conceptual ocupa aproximadamente el 90 % de la altura disponible en móvil.
- El Feed permanece detrás de una capa de atenuación; conserva su posición y no se reinicia al abrir o cerrar el panel.
- La cabecera del panel permanece visible, el contenido de filtros tiene desplazamiento propio y la acción principal permanece fija en la parte inferior.
- Los filtros se organizan en secciones desplegables separadas por divisores discretos, no en tarjetas independientes.
- Criterios contemplados: Géneros (selección múltiple), Año de estreno (Desde/Hasta), País de producción (búsqueda y selección múltiple), Duración (mínimo/máximo), Idioma original (búsqueda y selección múltiple) y Puntuación TMDB (umbral mínimo).
- Dentro de un criterio de selección múltiple se contempla OR; entre criterios diferentes se contempla AND. Los criterios vacíos no restringen resultados.
- La edición permanece provisional hasta pulsar «Mostrar resultados». «Restablecer» limpia todos los criterios. Cerrar con X o Atrás descarta cambios no aplicados; si existen, se confirma el descarte.
- El recuento de resultados solo se mostrará cuando pueda calcularse de forma fiable. No se inventarán coincidencias ni valores de metadatos ausentes.
- La misma geometría y jerarquía se presenta en Obsidiana y Cuarzo, adaptando exclusivamente las superficies, textos, contornos y acentos a sus paletas confirmadas.

No se incorporan en este panel los modos Equilibrado/Afinidad/Exploración ni los filtros para ocultar Vista/Pendiente: se mantienen fuera de esta decisión hasta revisar su alcance por separado.


## Ajustes

**Estado:** dirección de organización visual aprobada por el propietario el 12 de noviembre de 2026; no es una especificación de cada subpantalla ni una implementación.

- Pantalla titulada «Ajustes», con navegación de regreso y sin la píldora inferior.
- Tres grupos principales, separados visualmente sin acumular tarjetas: **Apariencia**, **Conexiones** y **Datos locales**.
- Apariencia contiene «Tema de apariencia» y un selector segmentado de dos opciones: Obsidiana y Cuarzo. El estado seleccionado usa el acento del tema; el cambio se concibe inmediato.
- Conexiones contiene la entrada TMDB, con descripción breve y un estado ilustrativo de configuración; el estado real deberá provenir de la configuración y verificación reales.
- Datos locales ofrece entradas a «Almacenamiento» y «Copias de seguridad».
- Se conserva una nota de privacidad discreta: el diario personal permanece en el dispositivo; TMDB no recibe el historial, listas, calificaciones ni perfil personal.
- No se incorporan todavía idioma, región, protección de spoilers, mosaico alternativo, modos de Espectro ni actualizaciones dentro de la aplicación.
- La composición, geometría y jerarquía se mantienen equivalentes en Obsidiana y Cuarzo, con sus respectivas paletas.

## Navegación principal — visibilidad de la píldora

**Estado:** confirmado por el propietario el 12 de noviembre de 2026.

- La píldora flotante con «Personal» y «Descubrir» pertenece exclusivamente al nivel raíz de navegación.
- Se muestra en la pantalla principal de Personal y en la pantalla principal de Descubrir.
- Se oculta al entrar en una vista secundaria o de detalle: Historial, Pendientes, Ocultos, Gestionar listas, contenido/edición de listas, Ajustes, almacenamiento, copias de seguridad y ficha cinematográfica.
- Las vistas secundarias conservan un mecanismo claro para regresar a su contexto anterior (por ejemplo, flecha de regreso); la píldora no sustituye esa navegación contextual.
- Su geometría y carácter flotante aprobados no cambian. Esta regla controla únicamente dónde aparece.



## Ficha cinematográfica

**Estado:** estructura visual confirmada por el propietario el 12 de noviembre de 2026 y afinada para mantener controles personales compactos.

- Cabecera panorámica a todo el ancho, con imagen, degradado inferior, título superpuesto y metadatos básicos disponibles.
- Flecha de regreso en un control circular semitransparente arriba a la izquierda y menú de opciones arriba a la derecha.
- Se mantiene el orden de contenido: **acciones principales/estado personal (Historial/Pendientes) → sinopsis → botón de calificación → acceso a Visionados**.
- El estado personal continúa visible en la ficha mediante las acciones correspondientes (Historial/Pendientes); no se traslada a otra pantalla ni se oculta.
- La calificación no es una sección de la ficha. Se representa mediante un botón compacto: antes de asignar una nota dice **«Calificar»**; después de confirmar una puntuación, el mismo botón muestra solo el número, por ejemplo **«7/10»**. Al pulsarlo se abre el selector para establecer o modificar la nota.
- No se muestran estrellas en la ficha. Las diez estrellas aparecen únicamente dentro del panel de selección/edición de calificación.
- La asignación de la nota sigue las reglas específicas de los visionados: si hay varios, se elige el registro destino; si no existe ninguno, la nota queda provisional para el siguiente visionado.
- «Visionados» se presenta como una fila o botón compacto pulsable; puede mostrar un contador (por ejemplo, «Visionados · 3»). No muestra las filas de visionados en la ficha.
- Al pulsar «Visionados» se abre una vista secundaria dedicada con los registros individuales en orden cronológico descendente, indicando fecha, hora cuando se conoce y calificación de cada visionado.
- Desde esa vista se puede consultar cada repetición sin sobrescribir los registros anteriores.
- La píldora inferior Personal/Descubrir no aparece en la ficha ni en la vista de visionados. La navegación secundaria utiliza regreso contextual.
- La misma estructura se presenta en Obsidiana y Cuarzo, con sus paletas confirmadas.
- Títulos, imágenes, fechas, metadatos, contadores y estados de estas maquetas son datos de ejemplo; en la aplicación solo se presentarán valores reales disponibles.


## Ficha cinematográfica — Registrar visionado

**Estado:** dirección de interacción confirmada por el propietario el 12 de noviembre de 2026.

- «Registrar visionado» abre un panel inferior compacto sobre la ficha, sin navegar a otra pantalla.
- Ofrece cuatro opciones de selección única: **Ahora**, **Día de estreno**, **Seleccionar fecha** y **Ajustar al inicio**.
- La selección de fecha y hora se integra dentro del mismo panel; no abre una segunda ventana.
- «Ahora» utiliza la fecha y hora local del dispositivo.
- «Día de estreno» utiliza solo una fecha de calendario; no inventa una hora.
- «Seleccionar fecha» permite indicar fecha y hora de inicio.
- «Ajustar al inicio» resta la duración conocida a la hora actual y muestra el resultado como estimación antes de guardar. Si se desconoce la duración, no ofrece un cálculo ficticio.
- La acción final es explícita: «Registrar visionado».
- Cada registro creado es independiente. Una repetición nunca sobrescribe fechas, horas ni calificaciones anteriores.
- La estructura y estados se presentan en Obsidiana y Cuarzo, sin píldora inferior.



## Ficha cinematográfica — Calificación personal

**Estado:** dirección de interacción confirmada por el propietario el 12 de noviembre de 2026.

- La acción «Calificar» abre un panel compacto sobre la ficha.
- La escala se compone de diez estrellas enteras, sin fracciones; al seleccionar una estrella se actualiza el número visible en el centro (por ejemplo, «7 / 10»).
- El usuario confirma mediante una acción explícita «Guardar calificación» o «Calificar».
- Si existe un único visionado, la nota corresponde a ese registro.
- Si existen varios visionados, el panel presenta sus fechas/horas y calificaciones actuales, y exige seleccionar el registro destino antes de confirmar. No se asigna ni modifica una nota en otro visionado por defecto.
- Si aún no hay visionados, la calificación se guarda como provisional y se asocia al siguiente visionado que se registre.
- Cada visionado conserva su propia calificación; modificar una puntuación afecta solo al registro elegido.
- La puntuación personal más reciente es la que se presenta como resumen en la ficha; si todavía no hay visionados, se presenta la calificación provisional.
- La escala y jerarquía se mantienen equivalentes en Obsidiana y Cuarzo. Los colores de estrella y superficies respetan las paletas aprobadas.
- Las calificaciones personales son datos locales y no se envían a TMDB.
