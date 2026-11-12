# Concepto visual anterior a los SVG — Prisma

**Origen:** decisiones visuales del 5 al 7 de noviembre de 2026, recuperadas del historial Git del repositorio Android.  
**Estado:** concepto histórico localizado; se conserva para reconstrucción y comparación. No es aún una aprobación de pantalla PWA.

> **Preferencia del propietario, confirmada el 12 de noviembre de 2026:** esta es la dirección visual anterior a los SVG que recuerda como su favorita. Obsidiana y Cuarzo se conservan. Los próximos conceptos se reconstruyen directamente en la conversación para que pueda visualizarlos y elegir; **no se deben generar imágenes de interfaz con IA**.

## 1. Por qué existe este documento

La IA anterior pasó de una visión visual amplia de Prisma a una composición MVP simplificada. En esa evolución se dibujaron SVG para describir las versiones básicas. El propietario ha aclarado que el diseño que le gustaba era el anterior a esa simplificación/SVG.

Este documento recupera ese concepto previo. Los SVG actuales no deben tratarse como referencia estética principal ni como sustitutos del concepto original. La dirección confirmada de color sigue siendo Obsidiana y Cuarzo; la estructura visual descrita aquí es el concepto histórico que se debe mostrar de nuevo al propietario.

## 2. Personal — concepto completo de cinco accesos

La pantalla se concibió como un centro personal de navegación, no como una lista de enlaces.

### Distribución

- Cuatro tarjetas casi cuadradas, relación 1:1, en una cuadrícula de dos columnas.
- Primera fila: Historial y Pendientes.
- Segunda fila: Ocultos y Estadísticas.
- Gestionar listas ocupa una fila horizontal completa debajo de la cuadrícula.
- La pantalla comienza directamente con los accesos; sin logotipo «PRISMA», título repetido «Personal» ni eslogan/subtítulo.
- Márgenes laterales: 16 unidades de diseño; margen superior: 16 desde el área segura; espacio entre las tarjetas: 12; separación entre la cuadrícula y Gestionar listas: 12.
- La primera exploración había elegido tarjetas transparentes con contorno fino; esa opción se sustituyó después por superficies sólidas adaptadas a cada tema. El último estado visual registrado conserva tarjetas casi cuadradas con superficie `#222222` en Obsidiana y `#FFFFFF` en Cuarzo, contorno fino de 1 px y radio de 14.

### Composición interior de cada tarjeta

- Icono lineal minimalista grande (32 px) arriba a la izquierda.
- Contador pequeño (12 px), sin fondo ni cápsula, arriba a la derecha cuando corresponda.
- Nombre de sección abajo, alineado a la izquierda (16 px, peso 500).
- No se añaden descripciones largas.
- Los iconos son el elemento gráfico principal; no se usan collages de pósteres ni placas geométricas detrás del icono.
- Historial cuenta películas únicas, no número de visionados.
- Pendientes y Ocultos muestran el número de películas correspondientes.
- Estadísticas no muestra contador.

### Símbolos elegidos

- Historial: reloj lineal con flecha de retorno integrada.
- Pendientes: marcador (*bookmark*) lineal.
- Ocultos: ojo lineal atravesado por una diagonal.
- Estadísticas: tres barras verticales ascendentes.

### Gestionar listas

- Fila horizontal de ancho completo, 60 px de alto.
- Icono lineal de lista a la izquierda, 20 px.
- Nombre a continuación, 14 px/500.
- Contador discreto y chevron fino de 16 px al extremo derecho.
- Padding horizontal de 16 px; 12 px entre icono/nombre y entre contador/chevron.
- Icono, texto, contador y chevron centrados verticalmente.
- El contador muestra el número de listas personalizadas.

## 3. Tratamiento cromático de Personal

### Obsidiana

- Fondo: `#171A20`.
- Tarjetas: `#222222`, contorno de 1 px `#353535`.
- Iconos inactivos: `#D0D0D0`.
- Nombre: `#F0F0F0`.
- Contadores: `#D0D0D0`.
- Chevron de Gestionar listas: `#888888`.
- Pulsación de tarjetas: superficie `#2B2B2B`, sin escala ni desplazamiento.

### Cuarzo

- Fondo: `#F4F1EA`.
- Tarjetas y fila: `#FFFFFF`, contorno de 1 px `#DDD8CE`.
- Iconos inactivos: `#8A857B`.
- Nombre: `#292B2F`.
- Contadores y chevron: `#706C64`.
- Pulsación: `#ECE7DE`.

Ambos temas conservan geometría, jerarquía y medidas equivalentes.

## 4. Navegación inferior flotante

La navegación original seleccionada es una píldora compacta y realmente flotante, con Personal y Descubrir:

- Ancho: 240 px.
- Alto: 64 px.
- Cápsula exterior completa, radio 32 px.
- Contorno de 1 px.
- Dos espacios iguales de 120 px.
- Icono lineal de 20 px encima del nombre de 12 px.
- Separación icono/etiqueta de 4 px.
- Personal: icono de usuario lineal, cabeza circular y hombros en una curva abierta.
- Descubrir: constelación de tres destellos lineales.
- Centrada respecto a toda la pantalla; separada 16 px del área inferior del sistema.
- Sin sombra y sin barra de ancho completo.
- La sección activa cambia solo el color y el peso del icono/texto; no aparece una segunda cápsula interior ni un fondo adicional.
- Obsidiana: superficie `#222222`, contorno `#353535`, activo azul `#5B9BD5`, inactivo `#BDBDBD`.
- El cambio de sección se acompaña de una transición cromática de 200 ms.
- Al desplazarse hacia abajo se oculta tras acumular 24 px; al desplazarse hacia arriba reaparece.

Para Cuarzo se conserva la misma geometría, con colores adaptados a la paleta clara. La especificación histórica más detallada de navegación fue registrada primero en Obsidiana; la adaptación web debe mostrarse en ambos temas antes de cerrarse.

## 5. Descubrir — la visión cinematográfica completa

La visión completa de Descubrir era un Feed visual, no solamente un buscador.

- Una barra superior horizontal continua que reúne búsqueda, Filtros y Ajustes.
- El Feed comienza debajo de la barra.
- Cuadrícula predeterminada de tres columnas.
- Pósteres verticales en proporción 2:3.
- Alternativa de mosaico de tres columnas que mezcla pósteres verticales con imágenes horizontales de doble o triple ancho.
- Desplazamiento infinito.
- Los pósteres no llevan títulos ni descripciones debajo; el arte de las películas es el protagonista.
- Marcador azul para Vista y gris para Pendiente.
- Los filtros se habían concebido como controles por género, año, país, duración, idioma y puntuación.
- Los tres modos de descubrimiento eran Equilibrado, Afinidad y Exploración, conectados con Espectro.

La composición inicial del buscador continuo con resultados era una reducción posterior para el MVP, no el diseño completo del Feed.

## 6. Ficha cinematográfica — dirección original

- Cabecera de imagen horizontal a todo el ancho.
- Degradado oscuro inferior para integrar título blanco y acciones.
- Controles circulares semitransparentes.
- Datos básicos en una línea, separados por barras.
- Secciones organizadas mediante espacio, no por una acumulación de tarjetas.
- Tarjetas reservadas para plataformas y componentes donde aportaran claridad.
- Si falta imagen, claqueta gris sobre fondo gris oscuro.
- En la ficha local se desarrolló posteriormente el concepto A «resumen primero», con visionados independientes.

## 7. Distinción respecto al diseño simplificado posterior

El historial registra dos composiciones de Personal con propósitos diferentes:

| Concepto anterior completo | Reducción posterior para MVP |
|---|---|
| 4 tarjetas casi cuadradas en 2×2: Historial, Pendientes, Ocultos, Estadísticas | 4 filas horizontales: Historial, Pendientes, Ocultos, Gestionar listas |
| Gestionar listas debajo, como fila independiente | Gestionar listas es la cuarta fila de la columna |
| Sin descripciones largas, contadores discretos | Nombre, descripción y chevron |
| Diseñado como centro Personal completo | Diseñado como entrada mínima de la primera versión |

El SVG que muestra la columna de cuatro filas pertenece a la reducción posterior. No sustituye el concepto anterior ni demuestra que el propietario haya cambiado su preferencia visual. La tarjeta sólida con borde fino es la última especificación registrada antes de esa reducción; la alternativa transparente fue una exploración anterior que se descartó posteriormente.

## 8. Fuentes históricas verificables

- [Selección del concepto A de Personal (5 nov 2026)](https://github.com/ElFast-dev/Prisma/commit/0c0945d69671e8525d518c071a9c4a8d4b1932b6)
- [Distribución 2×2 y fila de listas aprobada](https://github.com/ElFast-dev/Prisma/commit/51215e749635a7395c9cba171c9d8a8d085d7259)
- [Composición interna de icono/contador/nombre](https://github.com/ElFast-dev/Prisma/commit/367d4e31894cae6c27b27f427cd724207b888348)
- [Tarjetas casi cuadradas](https://github.com/ElFast-dev/Prisma/commit/35400bc76f894f7c532cc700912d45524e586628)
- [Primera exploración de tarjetas transparentes con borde fino](https://github.com/ElFast-dev/Prisma/commit/a3d1870b4eccb63941d575d6819fd9d6ffeebaaa)
- [Iconografía lineal minimalista](https://github.com/ElFast-dev/Prisma/commit/c35c2c58ae047e9aa8fd4a6473084422e16a4fb8)
- [Personal sin encabezado y con contadores](https://github.com/ElFast-dev/Prisma/commit/d91b52e98e88d428db156d8a850f359f0098b60b)
- [Píldora inferior compacta de 240×64](https://github.com/ElFast-dev/Prisma/commit/397a63faf730c580aae1aa1981359bbce346de7d)
- [Color de selección de la píldora](https://github.com/ElFast-dev/Prisma/commit/1ce9c5cae3a9a3ac800a0cc7057387f4d13613fd)

Esta recuperación describe lo que se registró en el proyecto anterior. El propietario confirmó expresamente el 12 de noviembre de 2026 que la cuadrícula de Personal (Historial, Pendientes, Ocultos y Estadísticas) con la fila completa Gestionar listas debajo es exactamente la composición anterior a los SVG que más le gustaba. También ha reconfirmado los temas Obsidiana/Cuarzo y la píldora flotante Personal/Descubrir. La composición histórica de Descubrir se presentará por separado en una maqueta conversacional para que el propietario la confirme o ajuste antes de aprobarla para la PWA.
