# Visión visual y funcional heredada — Prisma

**Propósito:** reconstruir la visión que se definió con la IA anterior sin confundir decisiones aprobadas, ideas futuras y detalles técnicos exclusivos de Android.

**Fuentes revisadas:** `feature/fase1-android-foundation` del repositorio anterior, con sus requisitos, estado visual, conceptos SVG y código de las pantallas Android. La rama contenía la versión documental/visual más completa y un diario local parcialmente implementado.

## 1. Qué es Prisma

> La composición visual concreta anterior a la simplificación SVG está reconstruida en [CONCEPTO_ANTERIOR_A_SVG.md](CONCEPTO_ANTERIOR_A_SVG.md). Ese documento recupera las decisiones históricas con enlaces a sus commits originales.

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

Las paletas cromáticas recuperadas están en [TEMAS_OBSIDIANA_Y_CUARZO.md](TEMAS_OBSIDIANA_Y_CUARZO.md). Los valores de color se conservan como dirección confirmada. La tipografía Inter, la escala, los radios, el espaciado y las animaciones son decisiones históricas útiles que se deben validar para web, no trasladar mecánicamente desde Android.

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

## 5. Personal: el concepto anterior a los SVG y la simplificación posterior

La rama histórica conserva dos composiciones distintas. La que aparece antes de los SVG, en el estado visual del 6 de noviembre, era más completa y es la referencia que el propietario recuerda como la que más le gustaba.

### Diseño anterior (6 de noviembre): cinco accesos

- Historial, Pendientes, Ocultos y Estadísticas en cuatro tarjetas cuadradas dentro de una cuadrícula 2×2.
- Gestionar listas en una fila horizontal de ancho completo debajo de las cuatro tarjetas.
- Las tarjetas principales utilizaban iconos lineales grandes arriba a la izquierda, contador discreto arriba a la derecha y nombre abajo, alineado a la izquierda.
- No mostraba un título redundante como «PRISMA» o «Personal».
- La composición usaba un ritmo compacto, superficies diferenciadas, contornos sutiles y una jerarquía visual orientada a iconos.

Este concepto está registrado en [HISTORIAL_CONCEPTOS_ANTES_SVG.md](HISTORIAL_CONCEPTOS_ANTES_SVG.md) y en el commit [5f58be0 — dirección visual minimalista](https://github.com/ElFast-dev/Prisma/commit/5f58be0d3104da78c174e81bdc7476f10562a02c).

### Simplificación posterior (9 de noviembre): MVP de cuatro filas

Inmediatamente antes de vincular los SVG, el documento de diseño se había simplificado para el MVP:
1. Historial — «Películas que ya has visto».
2. Pendientes — «Películas que quieres ver después».
3. Ocultos — «Películas que has decidido ocultar».
4. Gestionar listas — «Crea y organiza tus listas».

Cada acceso era una fila horizontal con icono a la izquierda, nombre y descripción en el centro y chevron a la derecha. Estadísticas quedaba fuera de esta primera composición.

Esta variante está registrada en el commit [2240f98 — aprobación visual MVP](https://github.com/ElFast-dev/Prisma/commit/2240f982a28972207bc90a6b4daed161d7879bc3). Las fuentes SVG se vincularon después, en el commit [21c877d](https://github.com/ElFast-dev/Prisma/commit/21c877d78644de4f2d5e82476eb216053b168574).

**No confundir las dos composiciones:** la cuadrícula 2×2 más Gestionar listas es el diseño anterior al SVG; las cuatro filas con descripciones son la simplificación posterior del MVP. El propietario ha indicado que prefiere el diseño anterior al SVG como referencia visual. Debe recrearse para la PWA en la conversación y quedar sujeto a su elección final.

## 6. Descubrir: concepto anterior y simplificación posterior

### Diseño anterior (6 de noviembre): búsqueda y Feed integrados

La composición anterior situaba una única barra continua en la parte superior con:
- campo de búsqueda y lupa a la izquierda;
- Filtros integrado en la misma superficie;
- Ajustes a la derecha.

Debajo aparecía un Feed cinematográfico de tres columnas:
- pósteres verticales en proporción 2:3;
- márgenes exteriores de 16 px y separaciones de 12 px;
- sin títulos ni rótulos debajo de los pósteres;
- desplazamiento infinito;
- marcadores visuales de estado Vista/Pendiente;
- filtros por género, año, país, duración, idioma y puntuación cuando los datos estuvieran disponibles.

Se contemplaban tres modos de contenido:
- **Equilibrado:** modo general.
- **Afinidad:** prioriza películas cercanas a los gustos del usuario.
- **Exploración:** introduce películas menos parecidas a sus patrones habituales.

Los modos se conectaban con Espectro. Esta composición es parte de la dirección visual anterior a los SVG, no una invención posterior.

### Simplificación posterior (9 de noviembre): búsqueda como primera experiencia

En la revisión inmediatamente anterior a los SVG, Descubrir se redujo para el MVP a:
- barra continua con búsqueda y Ajustes;
- filtros retirados de la primera experiencia;
- lista unificada y continua de resultados locales y TMDB;
- miniatura, título y año;
- indicación «En tu Prisma» para películas guardadas;
- sin Feed, cuadrícula, recomendaciones ni filtros avanzados en la primera experiencia.

La visión anterior y la simplificación están fechadas y enlazadas en [HISTORIAL_CONCEPTOS_ANTES_SVG.md](HISTORIAL_CONCEPTOS_ANTES_SVG.md). La composición anterior debe volver a presentarse como concepto en la conversación; el propietario decidirá cómo adaptarla a la PWA.
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

## 13. Estado real de la implementación Android anterior

La rama más avanzada consultada fue `feature/fase1-android-foundation`. Su árbol contenía 150 archivos, entre código Kotlin/Compose, Room, pruebas, documentación y conceptos SVG. Esto demuestra que hubo implementación real, pero no que el producto completo se hubiera terminado ni que existiera una entrega estable y utilizable.

El roadmap de esa rama registraba:
- **Base local:** validada; Room, alta manual, título/año, persistencia, búsqueda offline y prevención de duplicados.
- **Ficha local / Historial / Pendientes:** F2-H2 cerrado con aceptación del propietario el 11 de noviembre de 2026; incluía acceso a la ficha, consulta de visionados, registro local y retirada de Pendientes con confirmación.
- **Calificaciones, Ocultos/restauración y listas manuales básicas:** F2-H3 en integración, con CI y aceptación pendientes en el último estado documentado.
- **TMDB:** token cifrado y ciclo de vida seguro todavía posterior; búsqueda y enriquecimiento de datos también pendientes.
- **Copias manuales cifradas y restauración:** seguían pendientes en la fase de protección de datos.
- **Estadísticas y Espectro:** no estaban implementados como funciones completas; pertenecían a una etapa posterior.

La rama también contenía temas Compose, selector de apariencia, navegación Personal/Descubrir, pantalla Personal, búsqueda/alta manual en Descubrir, pantallas locales de Historial/Pendientes, ficha y estructura de listas. El hecho de que una ruta o pantalla existiera en código no prueba que el recorrido estuviera completo, que todos los estados funcionaran ni que el APK pudiera utilizarse sin problemas.

**Lección para Prisma Web:** distinguir siempre entre:
1. concepto visual;
2. pantalla construida;
3. flujo conectado a datos;
4. persistencia y recuperación verificadas;
5. recorrido completo probado en el teléfono;
6. capacidad aceptada y publicada.

No anunciar una función como terminada por existir un archivo, una ruta, un test o un resultado de CI.

---

## 14. Qué estaba aprobado, qué era futuro y qué quedó pendiente

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
