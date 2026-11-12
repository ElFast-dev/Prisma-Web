# Diseños anteriores a los SVG — Prisma

**Propósito:** conservar la dirección visual anterior a los SVG que fueron creados para la etapa Android y distinguirla de la simplificación posterior.

**Nota del propietario:** recuerda un diseño anterior a los SVG como el que más le gustaba. Los diseños conceptuales de la PWA deben reconstruirse directamente en la conversación para que pueda visualizarlos y elegir. **No se deben generar imágenes de interfaz con IA.**

## 1. Evidencia de GitHub y cronología

La revisión del historial de `ElFast-dev/Prisma` permitió recuperar varias instantáneas del documento visual:

| Fecha de Panamá | Commit | Qué registra |
|---|---|---|
| 6 de noviembre de 2026, 22:04 | [5f58be0](https://github.com/ElFast-dev/Prisma/commit/5f58be0d3104da78c174e81bdc7476f10562a02c) | Dirección minimalista original, sistema visual en descubrimiento y concepto anterior de Personal con cinco accesos. |
| 9 de noviembre de 2026, 15:44 | [2240f98](https://github.com/ElFast-dev/Prisma/commit/2240f982a28972207bc90a6b4daed161d7879bc3) | Aprobación de una composición más simplificada del MVP: cuatro filas para Personal y una búsqueda sin Feed ni filtros. |
| 9 de noviembre de 2026, 15:48 | [21c877d](https://github.com/ElFast-dev/Prisma/commit/21c877d78644de4f2d5e82476eb216053b168574) | Vinculación de los archivos SVG de conceptos visuales MVP. |
| 9 de noviembre de 2026, 16:11 | [93c99a1](https://github.com/ElFast-dev/Prisma/commit/93c99a12517f01438e217964f2f8cae6216f31e3) | Registro de placeholder genérico en los conceptos SVG. |

La diferencia no es una interpretación basada en nombres de archivos: se encuentra en las versiones históricas de `docs/DISENO/ESTADO_VISUAL.md` y sus commits. El contenido del 6 de noviembre describe la composición completa que precedió a la versión de MVP simplificada del 9 de noviembre.

## 2. Dirección anterior del 6 de noviembre

### Personal — centro visual de cinco accesos

La pantalla no mostraba un título redundante como «PRISMA» o «Personal». Comenzaba directamente con:

- Historial
- Pendientes
- Ocultos
- Estadísticas
- Gestionar listas

La composición de los cuatro accesos principales era una cuadrícula 2×2 de tarjetas cuadradas. «Gestionar listas» ocupaba una fila horizontal completa debajo.

Características documentadas:
- cuatro tarjetas de proporción 1:1;
- dos columnas con 12 px de separación;
- márgenes exteriores de 16 px;
- tarjetas con 16 px de espacio interior, radio de 14 px y contorno fino de 1 px;
- iconos lineales grandes de 32 px, ubicados arriba a la izquierda;
- contador pequeño, sin cápsula ni fondo, arriba a la derecha cuando correspondía;
- nombre de la sección en la parte inferior, alineado a la izquierda;
- iconos inactivos de Personal en Obsidiana: `#D0D0D0`;
- iconos activos con el azul de acento particular que estuviera aprobado para el componente;
- «Gestionar listas» como fila de 60 px de alto, con icono menor, nombre, contador y chevron discreto.

Los SVG posteriores que mostraban cuatro filas uniformes con descripción y chevron no representan esta composición.

### Descubrir — búsqueda integrada y Feed

La propuesta anterior describía una barra superior continua con tres funciones integradas en la misma superficie:
1. campo de búsqueda y lupa a la izquierda;
2. botón Filtros;
3. botón Ajustes a la derecha.

La barra tenía 52 px de altura, extremos redondeados y márgenes laterales de 16 px. Los tres elementos debían percibirse como una sola barra, no como tres tarjetas separadas.

Debajo se mostraba el Feed cinematográfico:
- cuadrícula de tres columnas;
- pósteres verticales con relación 2:3;
- 16 px de margen exterior;
- 12 px de separación horizontal y vertical;
- sin títulos ni rótulos bajo los pósteres;
- desplazamiento infinito;
- marcadores discretos en las portadas para identificar Vista o Pendiente;
- filtros por género, año, país, duración, idioma y puntuación cuando estuvieran disponibles.

Se contemplaban tres modos de contenido relacionados con Espectro: **Equilibrado**, **Afinidad** y **Exploración**. Esta era la visión de Descubrir completo, no la búsqueda limitada de la posterior composición MVP.

## 3. Elemento compartido y reconfirmado: píldora inferior

La navegación principal ya estaba definida como una píldora flotante con **Personal** y **Descubrir**:

- centrada horizontalmente;
- 240 × 64 px en la propuesta anterior;
- cápsula completa, radio de 32 px;
- dos espacios iguales;
- icono encima del nombre;
- sección activa identificada por icono y texto en el color de acento;
- sección inactiva en gris;
- sin una cápsula interior para el elemento activo;
- sin sombra;
- separada del área inferior de gestos.

El propietario ha reconfirmado expresamente que le gusta esta navegación flotante Personal/Descubrir. Su adaptación a PWA debe respetar safe areas y probarse en navegador standalone.

## 4. Simplificación del 9 de noviembre, inmediatamente anterior a los SVG

En el commit [2240f98](https://github.com/ElFast-dev/Prisma/commit/2240f982a28972207bc90a6b4daed161d7879bc3), el documento visual ya separaba el diseño completo de una composición simplificada para las primeras versiones:

**Personal MVP de esa revisión**
- cuatro filas verticales uniformes;
- Historial, Pendientes, Ocultos y Gestionar listas;
- icono a la izquierda, nombre y descripción al centro, chevron a la derecha;
- 80 dp de altura, 12 dp entre filas y 16 dp de margen lateral;
- Estadísticas quedaba fuera de esa composición inicial.

**Descubrir MVP de esa revisión**
- barra superior de búsqueda con lupa y Ajustes;
- filtros retirados de la barra inicial;
- Feed, recomendaciones, cuadrícula y filtros avanzados fuera de la primera experiencia;
- lista continua de resultados locales y TMDB.

Cuatro minutos después de esa aprobación se vinculaban las fuentes SVG. Por tanto, el diseño de cuatro filas y búsqueda simplificada está asociado a la etapa de SVG; no debe confundirse con la composición anterior del 6 de noviembre.

## 5. Confirmación expresa del propietario — Personal

El 12 de noviembre de 2026 el propietario confirmó que **esta es exactamente la composición de Personal anterior a los SVG que más le gustaba**. Queda elegida como dirección visual de Personal para la nueva Prisma Web:

- Historial, Pendientes, Ocultos y Estadísticas en cuadrícula 2×2 de tarjetas cuadradas.
- «Gestionar listas» como fila horizontal de ancho completo debajo.
- Sin convertir las cuatro tarjetas en filas con descripciones.
- Mantener la navegación inferior flotante Personal/Descubrir.
- Mostrar y adaptar esta composición a Obsidiana y Cuarzo.

Esta confirmación se refiere a la composición de Personal. No implica que todos los detalles de Descubrir, Feed, filtros, animaciones o medidas se hayan aprobado para la PWA; esos conceptos se presentarán para revisión.

## 6. Qué conservar y qué revisar en Prisma Web

**Conservar como dirección visual preferida por el propietario:**
- los temas Obsidiana y Cuarzo;
- la navegación inferior tipo píldora Personal/Descubrir;
- como referencia principal para conversar, la composición anterior de Personal de cuatro tarjetas 2×2 más Gestionar listas;
- la idea de Descubrir con búsqueda/Filtros/Ajustes integrados y Feed visual de pósteres.

**Revisar antes de aprobar o implementar:**
- las medidas nativas en dp/sp y su adaptación responsive;
- las dimensiones y comportamiento de la píldora en una PWA;
- el Feed, los filtros y los modos según el primer recorrido que se decida construir;
- las interacciones, accesibilidad, contraste, safe areas y estados reales.

La confirmación del propietario sobre Obsidiana/Cuarzo y la píldora no implica que cada detalle de las pantallas antiguas ya esté aprobado para la web. Se utilizará este diseño anterior como punto de partida visual, se mostrará una maqueta conceptual en la conversación y el propietario decidirá qué conservar.

## 6. Regla para los próximos conceptos

Los conceptos de interfaz se construirán directamente en la conversación con componentes visuales y maquetas estructuradas, sin generar imágenes por IA. Se mostrarán en Obsidiana y Cuarzo, con datos ficticios claramente identificados. El propietario podrá comparar, elegir y solicitar ajustes. No se marcará un diseño como definitivo hasta su aprobación expresa.
