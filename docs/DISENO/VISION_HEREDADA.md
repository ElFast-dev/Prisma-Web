# Visión visual y funcional heredada — Prisma

**Propósito:** reconstruir la visión que se definió con la IA anterior sin confundir decisiones aprobadas, ideas futuras y detalles técnicos exclusivos de Android.

**Fuentes revisadas:** `feature/fase1-android-foundation` del repositorio anterior, con sus requisitos, estado visual, conceptos SVG y código de las pantallas Android. La rama contenía la versión documental/visual más completa y un diario local parcialmente implementado.

## 1. Qué es Prisma

Prisma se concibió como un **espacio cinematográfico personal y privado**, no como una red social ni como un catálogo genérico.

Su núcleo es conservar la experiencia del usuario como espectador:
- qué películas ha visto;
- cuántas veces ha visto cada película;
- cuándo comenzó cada visionado;
- qué valoración dio a cada visionado;
- qué películas quiere ver;
- qué decidió ocultar;
- cómo cambian sus gustos con el tiempo.

Las funciones de aprendizaje y recomendaciones se agrupan bajo el nombre **Espectro**. El enfoque definido es local: las señales del usuario y el perfil de Espectro no se envían a servicios externos.

**La película es la unidad principal, pero el visionado es un registro individual.** Volver a ver una película no debe sobrescribir fechas ni valoraciones anteriores.

## 2. Identidad visual confirmada: Obsidiana y Cuarzo

El propietario ha confirmado expresamente que le gustan ambos temas y quiere conservarlos.

- **Obsidiana:** modo oscuro, grafito frío y azul.
- **Cuarzo:** modo claro, marfil mineral y azul.
- Los dos temas deben tener igual prioridad, cobertura y calidad.
- Una pantalla no puede estar terminada visualmente en un tema y descuidada en el otro.

Las paletas cromáticas recuperadas están en [TEMAS_OBSIDiana_Y_CUARZO.md](TEMAS_OBSIDIANA_Y_CUARZO.md). Los valores de color se conservan como dirección confirmada. La tipografía Inter, la escala, los radios, el espaciado y las animaciones son decisiones históricas útiles que se deben validar para web, no trasladar mecánicamente desde Android.

## 3. Dirección estética que se definió

La dirección general anterior era:

- minimalista, limpia, elegante y cinematográfica;
- espacio y jerarquía antes que decoración;
- pocas superficies y ausencia de tarjetas pesadas innecesarias;
- iconografía lineal y ligera;
- información honesta: no mostrar datos inventados ni controles que no hagan nada;
- avisos contextuales discretos, integrados y no bloqueantes;
- misma estructura y comportamiento en Obsidiana y Cuarzo, con colores adaptados.

El diseño se trataba como iterativo: el propietario podía pedir cambios, comparar conceptos en su contexto real y aprobar una propuesta antes de convertirla en diseño definitivo. Las nuevas propuestas deben mostrar los dos temas en paralelo y explicar qué cambia y qué recomienda el asistente.

## 4. Estructura general de navegación

La aplicación anterior tenía dos secciones principales:
- **Personal**
- **Descubrir**

La sección inicial propuesta era Descubrir.

La navegación inferior se diseñó como una píldora flotante, centrada y separada del borde inferior; no como una barra de ancho completo. La referencia histórica era 240 × 64 px, con icono encima del nombre y dos áreas iguales. La píldora podía ocultarse al desplazarse hacia abajo y reaparecer al desplazarse hacia arriba.

La forma exacta, dimensiones y animaciones deben comprobarse en una PWA: navegador standalone, barras de sistema, áreas seguras, zoom y pantallas de distinto tamaño. La idea de la píldora flotante se conserva como concepto visual importante, no como instrucción de copiar medidas Android sin probarlas.

## 5. Personal: dos composiciones diferentes que no deben confundirse

El repositorio distinguía expresamente dos etapas:

### Primera experiencia / MVP anterior

La pantalla Personal tenía cuatro filas horizontales en una columna:
1. **Historial** — «Películas que ya has visto».
2. **Pendientes** — «Películas que quieres ver después».
3. **Ocultos** — «Películas que has decidido ocultar».
4. **Gestionar listas** — «Crea y organiza tus listas».

Cada fila incluía icono a la izquierda, nombre y descripción en el centro y chevron a la derecha. La composición se diseñó con cuatro filas uniformes, sin título redundante ni acceso deshabilitado.

### Experiencia completa prevista

Para una evolución posterior se había propuesto:
- Historial, Pendientes, Ocultos y Estadísticas en una cuadrícula de dos columnas;
- Gestionar listas como fila horizontal de ancho completo debajo.

**No son dos diseños contradictorios:** el documento anterior los asignaba a etapas distintas. No se debe trasladar la cuadrícula de cinco accesos a una primera entrega sin revisar el alcance y validar el diseño web.

## 6. Descubrir: búsqueda primero, Feed después

### Descubrir inicial

La propuesta para la primera experiencia era una búsqueda única en la parte superior:
- lupa a la izquierda;
- campo «Buscar...»;
- engranaje de Ajustes a la derecha;
- una sola superficie continua, no tres tarjetas;
- lista única y continua de resultados;
- miniatura de póster, título y año;
- etiqueta discreta «En tu Prisma» solo para películas guardadas localmente;
- sin filtros ni Feed avanzado en esa primera experiencia.

La búsqueda local debía funcionar sin conexión. Si TMDB estaba disponible, sus resultados se mezclaban con los locales sin ocultarlos durante la consulta. Los estados de token, error remoto y falta de conexión se distinguían entre sí; nunca se debía presentar un error como «cero resultados».

Los SVG originales del concepto se conservan en:
- [Descubrir — Obsidiana](CONCEPTOS_MVP/prisma-mvp-descubrir-obsidiana.svg)
- [Descubrir — Cuarzo](CONCEPTOS_MVP/prisma-mvp-descubrir-cuarzo.svg)

### Feed completo posterior

La experiencia futura de Descubrir se había planteado como un Feed visual:
- cuadrícula de tres columnas;
- pósteres verticales en proporción 2:3;
- sin texto bajo los pósteres;
- paginación infinita;
- marcadores de estado en las portadas;
- filtros por género, año, país, duración, idioma y puntuación de TMDB.

Había tres modos de contenido:
- **Equilibrado:** modo predeterminado.
- **Afinidad:** prioriza películas cercanas a los gustos del usuario.
- **Exploración:** introduce películas menos parecidas a sus patrones habituales.

Los tres modos se conectan con Espectro. El Feed completo es una visión posterior y no debe confundirse con la búsqueda inicial.

## 7. Ficha cinematográfica y diario

La ficha se diseñó como una vista cinematográfica, no como una ficha técnica llena de tarjetas:
- imagen horizontal a todo lo ancho;
- degradado oscuro inferior;
- flecha de regreso dentro de un círculo semitransparente;
- título blanco sobre la cabecera;
- claqueta gris sobre fondo oscuro cuando no hay imagen disponible;
- pocas superficies, márgenes coherentes.

En la ficha local se seleccionó el **Concepto A — resumen primero**. La acción principal depende del estado:
- sin visionados: «AGREGAR A HISTORIAL»;
- con visionados: «REGISTRAR OTRO VISIONADO»;
- Pendientes puede agregarse o retirarse desde la ficha;
- retirar de Pendientes exige confirmación y no elimina la película ni sus visionados.

La sección VISIONADOS muestra registros independientes, del más reciente al más antiguo. Se presenta la hora solo cuando existe; si no, «Hora no registrada». El título y el año se muestran una sola vez.

Conceptos conservados:
- [Ficha local A — Obsidiana](CONCEPTOS_FASE2/prisma-ficha-local-a-obsidiana.svg)
- [Ficha local A — Cuarzo](CONCEPTOS_FASE2/prisma-ficha-local-a-cuarzo.svg)
- [Registro de visionado — Obsidiana](CONCEPTOS_FASE2/prisma-ficha-registro-obsidiana.svg)
- [Registro de visionado — Cuarzo](CONCEPTOS_FASE2/prisma-ficha-registro-cuarzo.svg)

El Concepto B quedó documentado como alternativa no seleccionada en la etapa anterior. Se conserva solo como historial, no como otra versión que haya que implementar.

## 8. Historial, Pendientes y Ocultos

### Historial
- Una fila por película, sin duplicados.
- Contador de visionados.
- Fecha del visionado más reciente.
- Los registros individuales y sus calificaciones se consultan en la ficha.

### Pendientes
- Una fila por película.
- Fecha de incorporación.
- Orden inicial: más reciente primero.
- Registrar un visionado mueve la película a Historial.
- Retirar de Pendientes no elimina otros datos.

### Ocultos
- Las películas ocultas dejan de aparecer en Descubrir y en recomendaciones habituales.
- Ocultar no elimina visionados, historial, calificaciones ni metadatos.
- Se conserva el estado anterior: Vista, Pendiente o sin marcador.
- «MOSTRAR DE NUEVO» restaura el estado anterior.

Los conceptos de pantalla y estados se conservan:
- [Historial — Obsidiana](CONCEPTOS_FASE2/prisma-fase2-historial-obsidiana.svg)
- [Historial — Cuarzo](CONCEPTOS_FASE2/prisma-fase2-historial-cuarzo.svg)
- [Pendientes — Obsidiana](CONCEPTOS_FASE2/prisma-fase2-pendientes-obsidiana.svg)
- [Pendientes — Cuarzo](CONCEPTOS_FASE2/prisma-fase2-pendientes-cuarzo.svg)

También se diseñaron estados vacíos y búsquedas sin coincidencias para Historial y Pendientes en ambos temas. Los archivos se conservan en la misma carpeta con sufijo `-estados-`.

## 9. Listas personalizadas

El concepto tenía dos niveles:

**Gestión básica:** crear, renombrar y eliminar listas; añadir o quitar películas; una película puede pertenecer a varias listas, pero no duplicarse dentro de una misma.

**Gestión avanzada futura:**
- ocho colores identificativos;
- tarjetas horizontales con collage automático de pósteres;
- listas fijadas;
- orden manual mediante arrastre;
- cuadrícula de tres columnas en el contenido;
- búsqueda local, filtros y ordenación;
- añadir varias películas en una sola operación.

Los conceptos avanzados no tienen que implementarse de golpe. Se revisará qué aporta valor y cómo debe verse en la PWA.

## 10. Estadísticas y Espectro

**Estadísticas** se planteó como una forma de comprender al espectador:
- películas vistas y total de visionados;
- tiempo dedicado al cine;
- géneros y directores más frecuentes;
- evolución de calificaciones;
- actividad por meses y años;
- preferencias por duración, país e idioma.

Las observaciones debían explicar por qué se llega a una conclusión y mostrar los datos que la sustentan. Si la muestra era insuficiente, Prisma debía decirlo.

**Espectro** es el algoritmo propio de recomendaciones:
- aprende del Historial, repeticiones, calificaciones, Pendientes y otras señales locales aprobadas;
- conserva el perfil en el dispositivo;
- recomienda películas y explica por qué;
- respalda las explicaciones con películas, géneros, directores o puntuaciones reales;
- excluye películas ocultas;
- ofrece los modos Afinidad, Equilibrado y Exploración.

No estaba planteado como un chatbot ni como una función que enviara el diario a un modelo remoto.

## 11. TMDB, ajustes y privacidad

TMDB se concibió como proveedor de metadatos e imágenes, no como dueño del diario. El usuario introduciría un token opcional desde Ajustes. Si no hay token o conexión:
- el diario local sigue funcionando;
- las películas guardadas siguen disponibles;
- la búsqueda manual y el alta local deben continuar disponibles;
- los errores remotos no deben borrar ni sustituir resultados locales.

Se contemplaron ajustes de:
- Obsidiana/Cuarzo;
- token de TMDB;
- idioma;
- región de disponibilidad;
- protección de spoilers.

El diseño de Ajustes quedó pendiente en la etapa anterior. Los detalles nativos de Android Keystore, DataStore, APK y actualizaciones desde GitHub Releases no se trasladan a la PWA: deben replantearse con las capacidades reales de web y el requisito de coste cero.

## 12. Sistema de iconografía heredado

La selección histórica incluía:
- Personal;
- Descubrir;
- Historial;
- Pendientes;
- Ocultos;
- Gestionar listas;
- Chevron;
- Buscar;
- Ajustes;
- Volver;
- ilustración Prisma vacío con diamante facetado.

El engranaje de Ajustes fue corregido a seis dientes. Los maestros SVG se conservan como referencias; deben revisarse en contexto web antes de considerarlos arte final. El icono de instalación PWA es una pieza distinta y no tenía una dirección de marca aprobada.

## 13. Qué estaba aprobado, qué era futuro y qué quedó pendiente

| Área | Estado registrado en la etapa anterior |
|---|---|
| Nombres y paletas Obsidiana/Cuarzo | El propietario los vuelve a confirmar para Prisma Web |
| Personal de cuatro filas | Composición MVP registrada como aprobada |
| Descubrir de búsqueda continua | Composición MVP registrada como aprobada |
| Historial/Pendientes | Composiciones en ambos temas registradas como aprobadas |
| Estados vacíos de Historial/Pendientes | Conceptos registrados como aprobados |
| Ficha local Concepto A | Selección registrada como aprobada |
| Feed, filtros y modos | Experiencia posterior; requiere revalidar prioridad y diseño web |
| Estadísticas | Función futura; detalle y visualización no cerrados |
| Espectro | Concepto de producto definido; algoritmo y UI no implementados |
| Gestión avanzada de listas | Concepto futuro con decisiones parciales |
| Pantalla completa de Ajustes | Pendiente de diseño |
| Personal completo de cinco accesos | Concepto futuro, distinto del MVP de cuatro filas |
| Icono de instalación / marca | Pendiente |
| Adaptación de toda la interfaz a PWA | Debe revisarse y probarse; no se hereda Compose |

Este estado se reconstruyó desde los registros anteriores. Antes de desarrollar una pantalla, se debe comprobar si el propietario desea conservar esa composición, mejorarla o rediseñarla para web.

## 14. Qué no se traslada desde Android

No se reutilizan automáticamente:
- Kotlin, Jetpack Compose, Room, DataStore ni Android Keystore;
- unidades `dp/sp` como si fueran píxeles CSS;
- código de pantallas Android como estructura de componentes web;
- procesos de Gradle, APK, versionCode/versionName ni CI Android;
- sistema de actualizaciones que descarga e instala APK;
- detalles de seguridad, backup y cifrado propios de la plataforma nativa.

Se conserva la visión del producto, los nombres, las preferencias visuales confirmadas y los conceptos que sigan siendo útiles. Cada implementación web se decide con tecnologías actuales, coste cero y pruebas reales en Android.
