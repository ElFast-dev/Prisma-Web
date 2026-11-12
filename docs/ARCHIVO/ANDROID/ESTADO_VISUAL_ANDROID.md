> **Archivo histórico de decisiones visuales Android.** La versión PWA activa y adaptada está en `docs/DISENO/ESTADO_VISUAL.md`.

# Estado visual — Prisma

**Estado:** el concepto visual MVP de Personal y la composición de búsqueda/resultados de Descubrir están aprobados en Obsidiana y Cuarzo. Los estados vacíos, avisos contextuales y pantallas de etapas posteriores conservan sus pendientes específicos.  
**Última actualización:** 11 de noviembre de 2026.

## Reglas de diseño

### La interfaz es provisional e iterativa

La interfaz de Prisma no queda congelada por sus primeras implementaciones. Las pantallas y componentes visuales pueden revisarse y rediseñarse cuando el propietario no esté conforme con el resultado. Ninguna implementación visual se considera intocable ni definitiva por el solo hecho de estar programada.

- **Se conserva lo acordado:** los requisitos funcionales, flujos, comportamiento, datos, restricciones, decisiones aprobadas y alcance documentados siguen siendo la base del proyecto. Un cambio de apariencia no autoriza a eliminar, degradar o alterar silenciosamente esas funciones o decisiones.
- **Se puede cambiar la presentación:** distribución, jerarquía, espaciado, tipografía, colores, iconografía, componentes y navegación visual pueden replantearse, respetando los requisitos funcionales y las decisiones cuya modificación requiera aprobación.
- **Conceptos antes de cambios importantes:** para una pantalla nueva o un rediseño significativo, preparar propuestas conceptuales trabajadas que permitan visualizar y comparar alternativas antes de programarlas. Las propuestas deben mostrarse en su contexto real y contemplar Obsidiana y Cuarzo.
- **Aprobación expresa:** una propuesta no se convierte en diseño aprobado por haber sido presentada, recomendada o implementada. El propietario elige o solicita ajustes; no se implementa una pantalla cuyo concepto siga pendiente de aprobación.
- **Iteración después de implementar:** si el resultado en la aplicación no gusta, se revisa con el propietario, se preparan alternativas conceptuales cuando el cambio lo amerite, se actualiza el artefacto visual de referencia y se modifica la implementación. Después se vuelven a ejecutar las validaciones afectadas.
- **Sin pérdida de decisiones:** antes de cada revisión se consultan los requisitos de producto, este estado visual y las especificaciones técnicas; solo se cambia aquello que el propietario haya pedido revisar. Una preferencia visual nueva no borra acuerdos funcionales previos.

Esta regla aplica a toda Prisma y permanece vigente durante las fases de desarrollo y mantenimiento.


## Regla permanente para crear conceptos visuales

Cada vez que se presenten conceptos visuales para Prisma, deben ser propuestas trabajadas y de calidad de presentación, no simples bocetos repetidos o variaciones superficiales.

**Dirección visual general:** Prisma debe ser minimalista, limpio y elegante. La composición prioriza la claridad, la jerarquía y el espacio; cada elemento, control o detalle debe responder a una finalidad lógica y útil. Se evitan adornos, duplicaciones y complejidad que no aporte valor. La simplicidad no debe perjudicar la legibilidad, la accesibilidad ni la comprensión.

Criterios obligatorios:
- Revisar primero este documento y los requisitos de producto para respetar todas las decisiones aprobadas y no reabrirlas accidentalmente.
- Mostrar la pantalla o componente dentro de su contexto real de uso, con composición completa y jerarquía visual clara.
- Cuando se comparen alternativas, mantener constantes los elementos ya aprobados y cambiar únicamente la variable que se está evaluando, salvo que la comparación solicite explícitamente explorar direcciones distintas.
- En cada comparación de alternativas, indicar también cuál recomienda el asistente para Prisma y explicar brevemente el criterio. La recomendación es orientación profesional, no una aprobación ni sustituye la decisión expresa del propietario.
- Al presentar o comparar un componente compartido por ambos temas, mostrarlo en Obsidiana y Cuarzo en paralelo. Mantener equivalente su estructura, jerarquía y comportamiento; ajustar los valores visuales propios de cada tema para conservar contraste, legibilidad e identidad, sin forzar colores idénticos.
- Hacer que las alternativas sean visualmente distinguibles y que cada una tenga una intención de diseño reconocible; evitar duplicados que solo cambien una cifra sin que la diferencia se perciba.
- Cuidar proporciones, alineaciones, ritmo de espaciado, márgenes, tipografía, iconografía y estados, manteniendo coherencia entre la intención funcional, las reglas de producto, el comportamiento de interacción y su representación visual. Ningún componente debe diseñarse de forma aislada ni sugerir algo que la lógica de Prisma no respalde.
- Utilizar datos de ejemplo claramente identificados como ficticios; nunca presentarlos como datos reales del usuario.
- Explicar brevemente qué diferencia a cada concepto y qué efecto produce en la experiencia.
- Si el propietario pide «mejores diseños conceptuales», rehacer la propuesta con una mejora visible de calidad, detalle y composición; no responder repitiendo esencialmente el mismo boceto.
- Los conceptos se construyen directamente en la conversación con componentes visuales; no se sustituyen por imágenes generadas por IA.
- No declarar una pantalla aprobada hasta que el propietario confirme expresamente el diseño completo.

Esta regla aplica a todos los conceptos futuros de Prisma, no solo a la pantalla Personal.

- El propietario dirige la decisión visual.
- Los conceptos de pantalla se muestran en la conversación, no se sustituyen por imágenes generadas con IA.
- El sistema de diseño es la referencia principal para color, tipografía, botones, espaciado, iconos y estilo.
- Antes de diseñar una pantalla nueva, se consulta el sistema de diseño; si falta un componente, se propone y aprueba antes de usarlo.
- Cada pantalla se presenta para aprobación antes de cerrarla.
- Si se modifica una decisión aprobada, se actualiza el mismo artefacto de referencia, no se crean duplicados.
- Las decisiones aprobadas también se guardan en este repositorio para conservar memoria entre conversaciones.

## Requisitos visuales ya acordados

### Sistema tipográfico global — familia seleccionada

- Familia tipográfica global: **Inter** (selección aprobada). Se utilizará como familia de referencia para la interfaz de Prisma.
- Pesos globales aprobados para Inter: **regular (400), medio (500) y seminegrita (600)**. La asignación actual de pesos queda definida así: los títulos de sección utilizan **medio (500)** (opción A aprobada), y el texto normal, secundario y auxiliar utiliza **regular (400)** (opción A aprobada). Esta decisión no obliga a utilizar los tres pesos en cada pantalla.
- Tamaño de referencia para el texto normal de lectura continua: **16 px** (opción B aprobada). Es la base de la escala tipográfica global; no reemplaza los tamaños específicos ya definidos para títulos, años, contadores, navegación ni otros componentes. El peso tipográfico de referencia para este texto normal es **regular (400)** (opción A aprobada). La altura de línea queda fijada en **24 px** (opción B aprobada), equivalente a 1,5 veces el tamaño de fuente. El espaciado entre caracteres (*letter spacing*) queda fijado en **0 px adicionales** (opción A aprobada), conservando el espaciado natural de Inter.
- Tamaño de referencia para el texto secundario: **14 px** (opción A aprobada). Es el segundo nivel general de la jerarquía tipográfica y no reemplaza tamaños específicos ya definidos para componentes, como los años y contadores de 12 px o los textos de 14 px con reglas propias. La altura de línea de referencia para este texto secundario queda fijada en **20 px** (opción B aprobada). El peso tipográfico de referencia para este texto secundario es **regular (400)** (opción A aprobada). El espaciado entre caracteres (*letter spacing*) queda fijado en **0 px adicionales** (opción A aprobada), conservando el espaciado natural de Inter. Esta referencia no modifica las reglas tipográficas específicas de otros componentes.
- Tamaño de referencia para el texto auxiliar: **12 px** (opción A aprobada). Es el tercer nivel general para información breve, etiquetas y metadatos. Se distingue del texto secundario de 14 px y no sustituye los tamaños específicos ya definidos para componentes, incluidos contadores, años y otros textos de 12 px con reglas propias. La altura de línea queda fijada en **18 px** (opción B aprobada) y su peso en **regular (400)** (opción A aprobada); el espaciado entre caracteres (*letter spacing*) queda fijado en **0 px adicionales** (opción A aprobada), conservando el espaciado natural de Inter.
- Tamaño de referencia para títulos de sección: **22 px** (opción B aprobada). Se aplica a encabezados generales de secciones y pantallas, como «Historial» o «Estadísticas». No sustituye tamaños ya definidos para títulos de películas ni otros encabezados o componentes con especificación propia. La altura de línea de referencia para estos títulos de sección queda fijada en **28 px** (opción B aprobada) y su peso tipográfico es **medio (500)** (opción A aprobada). El espaciado entre caracteres (*letter spacing*) queda fijado en **0 px adicionales** (opción A aprobada), conservando el espaciado natural de Inter. Esta referencia no modifica las reglas tipográficas específicas de otros encabezados o componentes.
- Las decisiones tipográficas particulares ya aprobadas para Personal, navegación y resultados de búsqueda se conservan exactamente como están documentadas. La definición de la escala global no debe contradecirlas ni modificarlas sin una nueva aprobación.

### Temas de apariencia — Obsidiana y Cuarzo

- **Obsidiana:** nombre aprobado para el modo oscuro.
- **Cuarzo:** nombre aprobado para el modo claro.
- **Paridad entre temas:** Obsidiana y Cuarzo son temas de primera clase y deben mantenerse a la par en prioridad, cobertura funcional y calidad visual. Ninguno es secundario ni debe recibir menos cuidado. Todos los componentes, estados y flujos deben contemplarse en ambos temas; sus colores y tratamientos pueden diferir cuando sea necesario para respetar el contraste, la legibilidad y la identidad propia de cada uno.
- La aprobación confirma los nombres de los dos temas, no sus paletas completas, el selector ni sus reglas de comportamiento. La paleta de Cuarzo se define progresivamente y cada rol requiere aprobación independiente.

#### Obsidiana — fondo, superficie elevada y acento aprobados

- **Fondo principal global:** `#171A20` (RGB 23, 26, 32), alternativa B «Grafito frío», aprobado.
- **Superficie elevada global:** `#242A35` (RGB 36, 42, 53), alternativa B «Grafito azulado», aprobada.
- **Contorno global de superficies elevadas:** `#353535` (RGB 53, 53, 53), grosor **1 px**, alternativa A aprobada. Se aplica a superficies elevadas globales de Obsidiana cuando el componente no tenga una regla particular de contorno aprobada. No modifica automáticamente componentes con contornos propios ni componentes cuya superficie esté definida como carente de contorno.
- **Acento principal global:** `#70AEE0` (RGB 112, 174, 224), alternativa B «Azul luminoso», aprobada. Refleja la preferencia cromática general del propietario por el azul.
- **Referencia azul anterior:** `#5B9BD5` (RGB 91, 155, 213), conservada como referencia y en componentes concretos que ya la tienen aprobada; no sustituye al nuevo acento global ni se cambia automáticamente en esos componentes.
- **Referencia anterior de fondo:** `#131313` (RGB 19, 19, 19), sustituida por el fondo principal aprobado `#171A20`.

La superficie elevada global queda aprobada en `#242A35`, con contorno global de `#353535` de 1 px cuando no exista una regla particular de componente, y el acento global en `#70AEE0`. Las especificaciones particulares de componentes que ya cuentan con aprobación expresa se conservan tal como están documentadas y no se modifican automáticamente; los usos particulares del azul anterior `#5B9BD5` permanecen como excepciones expresas hasta que se revisen individualmente.

#### Obsidiana — jerarquía cromática global de texto aprobada

- **Texto principal:** `#F0F0F0` (RGB 240, 240, 240), alternativa A aprobada.
- **Texto secundario:** `#BDBDBD` (RGB 189, 189, 189), alternativa A aprobada.
- **Texto auxiliar:** `#9B9B9B` (RGB 155, 155, 155), alternativa A aprobada.
- Estos tres tonos forman la jerarquía global de texto de Obsidiana. Los colores particulares ya aprobados para componentes concretos se conservan cuando sus reglas específicas indiquen un tratamiento distinto.

#### Obsidiana — iconos inactivos globales aprobados

- **Iconos inactivos globales:** `#BDBDBD` (RGB 189, 189, 189), alternativa A aprobada. Se aplica a iconografía inactiva de Obsidiana cuando el componente no tenga un color particular aprobado. Se mantiene la excepción específica de los iconos inactivos de las tarjetas de Personal en `#D0D0D0`.

#### Obsidiana — contenido, superficie y contorno de controles deshabilitados aprobados

- **Contenido deshabilitado (texto e iconos):** `#888888` (RGB 136, 136, 136), alternativa A aprobada. Se aplica al contenido interno de controles deshabilitados.
- **Superficie deshabilitada:** `#1D222B` (RGB 29, 34, 43), alternativa B «Grafito profundo», aprobada. Se utiliza como superficie propia del control deshabilitado sobre los fondos y superficies normales de Obsidiana. El control deshabilitado no lleva contorno visible (opción A aprobada) ni recibe opacidad adicional: **100 % (opción A aprobada)**.
- **Superficie durante la pulsación:** `#2B303A` (RGB 43, 48, 58), alternativa A «Grafito iluminado», aprobada. Es un cambio transitorio para elementos interactivos cuya superficie normal sea la superficie elevada global `#242A35`; al terminar la pulsación recuperan la superficie normal. Duración de la transición: **100 ms al pulsar y 160 ms al soltar (alternativa A aprobada)**. Curva de aceleración para ambas fases: **ease-out**, con curva Bézier exacta **`cubic-bezier(0, 0, 0.2, 1)` (alternativa A aprobada)**. La temporización y la curva son comunes a Obsidiana y Cuarzo para el tratamiento estándar de superficies durante la pulsación. No reemplaza los comportamientos ni las animaciones particulares ya aprobados para componentes existentes.

#### Obsidiana — separadores internos aprobados

- **Separadores internos:** `#353535` (RGB 53, 53, 53), alternativa A aprobada. Reutiliza un neutro ya presente en componentes del tema y evita introducir un color adicional sin necesidad. Grosor: **1 px**, igual que en Cuarzo. Separación respecto al contenido adyacente: **8 px por encima y 8 px por debajo (alternativa A aprobada)**, igual que en Cuarzo.

#### Cuarzo — roles cromáticos aprobados hasta ahora

- **Fondo principal:** `#F4F1EA` (RGB 244, 241, 234), concepto A «Marfil mineral».
- **Superficies** — tarjetas, secciones, contenedores y listas: `#FFFFFF` (RGB 255, 255, 255), opción A «Blanco cristalino».
- **Contorno de superficies:** `#DDD8CE` (RGB 221, 216, 206), 1 px, opción A «Borde mineral discreto». Se usa para delimitar las superficies de Cuarzo cuando corresponda y no sustituye contornos particulares ya aprobados para componentes.
- **Texto principal:** `#292B2F` (RGB 41, 43, 47), opción A «Grafito mineral».
- **Texto secundario:** `#68655F` (RGB 104, 101, 95), opción A «Gris mineral cálido».
- **Texto auxiliar:** `#706C64` (RGB 112, 108, 100), opción A «Piedra suave».
- **Acento principal** — botones, iconos en estado activo, destacados y calificaciones: `#356F9F` (RGB 53, 111, 159), opción A «Azul mineral».
- **Iconos inactivos:** `#8A857B` (RGB 138, 133, 123), opción A «Piedra cálida». Neutro para iconografía inactiva en Cuarzo; no sustituye los colores particulares ya aprobados para Obsidiana ni las reglas específicas de componentes como Personal.
- **Contenido de controles deshabilitados (texto e iconos):** `#9D998F` (RGB 157, 153, 143), opción A «Piedra desactivada». Se aplica solo al contenido interno del control y es distinto del icono inactivo `#8A857B`.
- **Superficie de controles deshabilitados:** `#F0EDE6` (RGB 240, 237, 230), opción B «Piedra apagada». Se aplica a la superficie de controles deshabilitados en Cuarzo. Contorno aprobado: **sin contorno visible (opción A)**. No se aplica opacidad adicional: **100 %** (opción A aprobada); se conservan íntegros los colores aprobados del contenido y de la superficie.
- **Separadores internos:** `#E8E3DA` (RGB 232, 227, 218), opción B «Separación delicada». Se utiliza para dividir internamente secciones y grupos de información. Grosor aprobado: **1 px (opción A)**. Separación respecto al contenido adyacente: **8 px por encima y 8 px por debajo (alternativa A aprobada)**, igual que en Obsidiana.
- **Superficie durante la pulsación:** `#ECE7DE` (RGB 236, 231, 222), opción A «Marfil sombreado». Cambio transitorio para elementos interactivos cuya superficie normal sea `#FFFFFF`; al terminar la pulsación recuperan su superficie normal. Utiliza la temporización y la curva de aceleración comunes aprobadas: **100 ms al pulsar y 160 ms al soltar**, con **ease-out en ambas fases y curva Bézier `cubic-bezier(0, 0, 0.2, 1)`**. No reemplaza los comportamientos ni las animaciones particulares ya aprobados para componentes existentes.

Estas decisiones definen el fondo principal, las superficies, los textos principal, secundario y auxiliar de Cuarzo, el contorno de superficie de 1 px, el acento principal, el neutro para iconos inactivos, el contenido y la superficie de controles deshabilitados, el color de separadores internos y la superficie transitoria durante la pulsación. El contenido deshabilitado utiliza `#9D998F` y su superficie `#F0EDE6`; los controles deshabilitados no llevan contorno visible (opción A aprobada) ni reciben opacidad adicional (**100 %**, opción A aprobada). Se conservan íntegros los colores aprobados del contenido y de la superficie. Los separadores internos están aprobados en **1 px** en ambos temas: `#353535` en Obsidiana y `#E8E3DA` en Cuarzo. La separación respecto al contenido adyacente es de **8 px por encima y 8 px por debajo (alternativa A aprobada)** en ambos temas. Otros neutros, otros bordes no cubiertos por estos roles y otros estados de este tema siguen pendientes de definición y aprobación.

### Regla compartida — sombras de superficies generales

Las superficies elevadas generales de **Obsidiana y Cuarzo no llevan sombra global** (alternativa A aprobada). La diferenciación entre niveles se resuelve mediante los colores de fondo y superficie, así como los contornos aprobados cuando correspondan. Esta regla no elimina ni modifica sombras de contacto expresamente aprobadas para componentes concretos, como la sombra del marcapáginas; las excepciones particulares se conservan sin extenderlas a otros elementos.

### Regla compartida — radio base de superficies generales

- **Radio base:** **14 px** para las superficies generales de Obsidiana y Cuarzo (alternativa A aprobada).
- El valor se aplica como referencia predeterminada a las superficies generales que no tengan un radio particular aprobado.
- Los componentes con radios específicos ya aprobados conservan sus medidas. Esta regla no ordena cambiar todos los radios ni homogeneizar elementos con geometría propia.

### Regla compartida — escala global de espaciado

- **Unidad modular base:** **4 px** (opción A aprobada), común a Obsidiana y Cuarzo.
- **Escala de referencia:** **4, 8, 12, 16, 20, 24, 32, 40, 48 y 64 px**. Orienta la elección de márgenes, separaciones y espacios interiores para nuevos componentes y composiciones.
- Es una guía de consistencia, no una lista exclusiva ni una orden de sustituir medidas existentes. Las especificaciones particulares ya aprobadas se mantienen intactas, incluidos los valores que no sean múltiplos de 4.
- Ambos temas comparten la misma lógica y cobertura de espaciado.

### Regla compartida — estilo global de iconografía

- **Estilo global:** lineal, con formas limpias y ligeras; las siluetas sólidas rellenas no son el lenguaje general.
- **Grosor de trazo predeterminado:** **1,75 dp**. Se aplica a iconos nuevos sin grosor particular aprobado.
- **Tamaño predeterminado:** **24 × 24 dp**. Los componentes conservan sus tamaños particulares aprobados; por ejemplo, navegación inferior de **20 dp** y tarjetas principales de Personal de **32 dp**.
- **Detalle:** esencial; se utilizan las líneas y formas necesarias para reconocer y comunicar la función, sin adornos innecesarios.
- **Construcción geométrica:** híbrida, combinando estructuras geométricas claras con curvas suaves y discretas.
- **Ocupación del marco:** ajuste óptico; cada símbolo se compone para lograr peso visual y legibilidad equilibrados dentro del marco asignado.
- **Terminaciones y uniones:** redondeadas por defecto (`stroke-linecap: round` y `stroke-linejoin: round`).
- Estas referencias se aplican con la misma lógica a Obsidiana y Cuarzo. Se conservan sin cambios las excepciones particulares ya aprobadas, incluidas las geometrías, tamaños, colores, grosores, terminaciones y uniones de cada componente; la navegación inferior, por ejemplo, mantiene su grosor particular de **1,4 dp**.

### Regla compartida — interpretación de unidades Android

Las medidas expresadas como `px` en este documento son magnitudes nominales del sistema de diseño, no píxeles físicos. En Android se conserva su valor numérico y se implementan con `dp` para geometría, dimensiones, espacios y trazos, y con `sp` para tipografía, interlineado y espaciado entre caracteres. La regla técnica de conversión está en `docs/TECNICO/DISENO_TECNICO.md`, sección 2.1.

### Personal: pantalla principal (composición MVP aprobada; pantalla completa pendiente)

La composición del MVP queda aprobada como cuatro accesos en una columna vertical. Cada acceso es una fila horizontal uniforme que muestra un icono a la izquierda, nombre y descripción breve en el centro y chevron a la derecha. Los accesos son Historial, Pendientes, Ocultos y Gestionar listas. No se muestra Estadísticas, un acceso deshabilitado ni se deja un espacio vacío artificial. La propuesta visual de esta pantalla fue aprobada el 9 de noviembre de 2026 para las primeras versiones de Prisma; sus dimensiones, superficies, tipografía y textos se detallan a continuación.

La experiencia completa conservará cinco accesos al incorporar Estadísticas en su fase posterior.

#### Archivos fuente del concepto aprobado

Los prototipos de referencia se conservan como SVG editables en `CONCEPTOS_MVP/` dentro de este directorio:
- `prisma-mvp-personal-obsidiana.svg` y `prisma-mvp-personal-cuarzo.svg`.
- `prisma-mvp-descubrir-obsidiana.svg` y `prisma-mvp-descubrir-cuarzo.svg`.

Los mockups muestran únicamente la interfaz MVP. No sustituyen ni recortan la experiencia completa definida para las fases posteriores.

#### Propuesta visual MVP aprobada — primeras versiones

- Presentación: cuatro filas horizontales uniformes en una sola columna, sin encabezado redundante ni título «Personal» repetido.
- Contenido de cada fila: icono lineal a la izquierda, nombre y descripción breve en el centro, chevron discreto a la derecha. El contenido se centra verticalmente.
- Textos aprobados: **Historial** / «Películas que ya has visto»; **Pendientes** / «Películas que quieres ver después»; **Ocultos** / «Películas que has decidido ocultar»; **Gestionar listas** / «Crea y organiza tus listas».
- Geometría aprobada: altura de fila **80 dp**, separación vertical **12 dp**, margen horizontal exterior **16 dp**, radio de esquina **14 dp** y contorno de **1 dp**.
- Superficies: Obsidiana utiliza la superficie elevada global `#242A35` con contorno `#353535`; Cuarzo utiliza `#FFFFFF` con contorno `#DDD8CE`.
- Iconos: estilo lineal, **24 dp**, trazo de **1,75 dp**; inactivos `#D0D0D0` en Obsidiana y `#8A857B` en Cuarzo.
- Nombres: **16 sp**, peso medio (500); color `#F0F0F0` en Obsidiana y `#292B2F` en Cuarzo.
- Descripciones: **14 sp**, peso regular (400); color secundario `#BDBDBD` en Obsidiana y `#68655F` en Cuarzo.
- Chevron: **16 dp**, color auxiliar `#9B9B9B` en Obsidiana y `#706C64` en Cuarzo.
- La primera fila comienza a **16 dp** del límite inferior del área segura superior. La adaptación a pantallas de distintas alturas conserva los márgenes y la separación entre filas.
- La respuesta al pulsar reutiliza la respuesta global de superficies interactivas; no cambia la escala ni desplaza el contenido.
- Esta composición se utiliza en las primeras versiones del MVP. No modifica ni sustituye la experiencia completa de cinco accesos descrita más adelante.


**Todas las especificaciones visuales que siguen hasta «Navegación y Descubrir» describen exclusivamente la experiencia completa con cinco accesos; no prevalecen sobre la composición MVP aprobada de cuatro filas horizontales uniformes en una columna vertical.**

Las medidas, composición y variantes que siguen describen la experiencia completa con Estadísticas. Para el MVP prevalece la composición aprobada de cuatro filas horizontales uniformes en una columna vertical, con icono a la izquierda, nombre y descripción breve en el centro y chevron a la derecha. No trasladar a la pantalla MVP la cuadrícula de dos columnas, el acceso independiente de Gestionar listas ni los contadores de esa composición completa.

- Al tocar Personal desde la píldora inferior, se abre un centro de navegación con los accesos disponibles en la versión instalada.
- Los accesos de la experiencia completa son Historial, Pendientes, Ocultos, Estadísticas y Gestionar listas.
- No se abre Historial directamente.
- En la experiencia completa, la distribución aprobada es: Historial, Pendientes, Ocultos y Estadísticas son cuatro tarjetas grandes en una cuadrícula de dos columnas; Gestionar listas es un acceso horizontal de ancho completo debajo.
- Márgenes laterales exteriores de Personal: **16 px** a izquierda y derecha, medidos desde los bordes de la pantalla hasta los extremos de las tarjetas y de la fila «Gestionar listas».
- Margen superior de Personal: **16 px** desde el final del área segura superior hasta la primera fila de tarjetas.
- La separación vertical entre la segunda fila de tarjetas (Ocultos y Estadísticas) y el acceso horizontal «Gestionar listas» es de **12 px**.
- **Símbolo de «Gestionar listas»:** icono lineal de lista con tres indicadores y tres líneas horizontales (opción A aprobada). La decisión define únicamente la representación del símbolo y conserva el tamaño particular de **20 px** y las demás especificaciones ya aprobadas. En Obsidiana, su color inactivo es `#D0D0D0`; en Cuarzo, `#8A857B`.
- Presentación de «Gestionar listas»: **concepto B seleccionado**. Se representa como una fila horizontal de ancho completo, con icono de **20 px**, **12 px de separación horizontal respecto al nombre**, contador discreto y un **chevron fino y discreto de 16 px** alineado al extremo derecho. El nombre utiliza **14 px**, peso **medio (500)**. La fila tiene una **altura de 60 px**, margen interior horizontal de **16 px** y separación de **12 px** entre contador y chevron; el contador utiliza peso **regular (400)**. El icono, el nombre, el contador y el chevron quedan centrados verticalmente. **En Obsidiana**, el icono utiliza `#D0D0D0`, el chevron `#888888`, el nombre `#F0F0F0`, la superficie `#222222` y el contorno `#353535` de 1 px y radio de 14 px. Su estado de pulsación particular utiliza la superficie `#2B2B2B` y contorno `#454545` de 1 px, sin acento azul. En Cuarzo se aplica la adaptación cromática específica registrada a continuación; se conservan la geometría, las dimensiones y la disposición de la fila.
- **Adaptación cromática de Personal en Cuarzo (aprobada):** las cuatro tarjetas y la fila «Gestionar listas» utilizan superficies `#FFFFFF` y contornos `#DDD8CE` de 1 px. Los cinco iconos inactivos utilizan `#8A857B`; los nombres de las cuatro tarjetas y de la fila utilizan `#292B2F`; los contadores y el chevron de la fila utilizan `#706C64`.
- Los iconos activos de Personal en Cuarzo utilizan el acento global aprobado `#356F9F`. Las superficies blancas interactivas aplican la respuesta global de pulsación `#ECE7DE`. Esta variante cromática no modifica las dimensiones, la tipografía, la estructura ni las reglas particulares aprobadas para Obsidiana.
- Concepto elegido para las cuatro tarjetas: **A, iconos grandes y minimalistas**. Se descarta para esta pantalla la alternativa de collages de pósteres.
- **Respuesta de pulsación de las cuatro tarjetas (opción A aprobada):** iluminación sutil, sin compresión ni cambio de escala. En Obsidiana, la superficie pasa transitoriamente de `#222222` a `#2B2B2B`; en Cuarzo, de `#FFFFFF` a `#ECE7DE`. El contorno y su color, el radio, las posiciones, los tamaños y la composición permanecen estables. Al soltar, la superficie vuelve a su color normal. La transición utiliza los tiempos globales aprobados (**100 ms al pulsar y 160 ms al soltar**) y la curva `cubic-bezier(0, 0, 0.2, 1)` en ambas fases. La fila «Gestionar listas» mantiene su tratamiento particular y no se modifica con esta decisión.
- Los iconos son los elementos gráficos principales de las cuatro tarjetas; los contadores se mantienen pequeños y discretos.
- Estilo de iconografía: **A, lineal y minimalista**, sin placas ni fondos geométricos detrás del símbolo.
- **Grosor del trazo de los cinco símbolos de Personal:** **1,75 dp**, por aplicación de la referencia global aprobada al no existir un grosor numérico particular distinto para estos iconos. El trazo conserva un aspecto fino y legible. La navegación inferior mantiene su excepción particular de **1,4 dp**.
- Tamaño: **A, 32 px, grande y equilibrado**. Los iconos deben destacar con claridad dentro de las tarjetas, manteniendo espacio libre suficiente y sin competir con el nombre. Se descarta el tamaño extra grande de 40 px.
- Color de iconos: **A, monocromático**. Los cuatro iconos utilizarán un mismo tono en estado inactivo; no habrá un color distinto por sección. **En Obsidiana**, el color inactivo es **`#D0D0D0`** y el activo conserva la excepción particular **`#5B9BD5`**. En Cuarzo, el inactivo utiliza `#8A857B` y el activo el acento global `#356F9F`.
- Composición interna aprobada: icono grande arriba a la izquierda, contador discreto arriba a la derecha cuando corresponda y nombre de la sección abajo.
- **Símbolo de Historial:** reloj lineal con flecha de retorno integrada en el contorno del reloj (aprobado). La especificación se limita al símbolo; conserva el tamaño particular de **32 px** y las demás reglas compartidas de las tarjetas de Personal.
- **Símbolo de Pendientes:** marcador lineal (*bookmark*) como representación de una película guardada para verla después (opción A aprobada). La especificación se limita al símbolo; conserva el tamaño particular de **32 px** y las demás reglas compartidas de las tarjetas de Personal.
- **Símbolo de Ocultos:** ojo lineal atravesado por una línea diagonal (opción A aprobada), que comunica que la película está oculta. La especificación se limita al símbolo; conserva el tamaño particular de **32 px** y las demás reglas compartidas de las tarjetas de Personal.
- **Símbolo de Estadísticas:** tres barras verticales lineales de distinta altura, ascendentes de izquierda a derecha (opción A aprobada), como representación de datos y métricas personales. La especificación se limita al símbolo; conserva el tamaño particular de **32 px** y las demás reglas compartidas de las tarjetas de Personal.
- Separación vertical entre el icono y el nombre de las tarjetas: **20 px**, equilibrada y compacta.
- Tamaño de los contadores de las tarjetas de Personal: **concepto A, 12 px**, pequeños y discretos, sin cápsula ni fondo.
- Tipografía de los nombres de las cuatro tarjetas de Personal: **16 px, peso medio (500) y altura de línea de 20 px** (opción A aprobada). Es una regla particular de este componente; no sustituye ni amplía por sí sola los niveles de la escala tipográfica global.
- Color de los nombres de las cuatro tarjetas de Personal: **en Obsidiana, `#F0F0F0`** (blanco suave); en Cuarzo, `#292B2F`. Estos valores se limitan a los nombres de las tarjetas y no definen por sí solos todos los colores de texto de la aplicación.
- Alineación de los nombres de las cuatro tarjetas: **concepto A, alineados a la izquierda**, respetando el margen interior de 16 px.
- Proporción de las cuatro tarjetas: **A, cuadradas con relación de aspecto 1:1**. Se descarta la alternativa ligeramente vertical.
- Tratamiento de superficie de las cuatro tarjetas: **en Obsidiana**, superficie particular `#222222`; en **Cuarzo**, superficie `#FFFFFF`. En ambos temas se conserva un contorno fino de 1 px; los colores de contorno son `#353535` y `#DDD8CE`, respectivamente. Esta decisión sustituye el fondo transparente elegido anteriormente.
- Grosor del contorno de las tarjetas de Personal: **A, delicado, 1 px**. Se descarta la alternativa de 1.5 px.
- Color del contorno de las tarjetas de Personal: **en Obsidiana, `#353535`**; en **Cuarzo, `#DDD8CE`**. Son reglas particulares de estas tarjetas y no definen automáticamente todos los bordes de la aplicación.
- Radio de las esquinas: **A, redondeo sutil de 14 px**. Se descarta el redondeo amplio de 26 px.
- Separación entre las cuatro tarjetas: **A, compacta, 12 px**. Se descarta la alternativa amplia de 20 px.
- Espacio interior de las cuatro tarjetas: **A, compacto, 16 px** entre el contenido y el contorno.
- En la experiencia completa, la pantalla comienza directamente con los cinco accesos: no debe mostrar «PRISMA», un título repetido «Personal» ni un eslogan/subtítulo como «Tu historia como espectador».
- Historial, Pendientes y Ocultos muestran un contador discreto de películas; Historial cuenta películas únicas, no visionados.
- Estilo de los contadores: **A, número integrado sin fondo ni cápsula**, con tipografía discreta y alineación en la esquina superior derecha.
- Color de los contadores de Historial, Pendientes, Ocultos y Gestionar listas: **en Obsidiana, `#D0D0D0`**; en **Cuarzo, `#706C64`**. El color es uniforme en los cuatro accesos de cada tema.
- Gestionar listas muestra un contador discreto de listas personalizadas. Estadísticas no muestra contador en el centro de navegación.
- Los resultados de búsqueda del MVP mantienen únicamente póster, título y año; solo las películas guardadas muestran «En tu Prisma» junto al año. No se trasladan a estas filas los marcapáginas ni las etiquetas de estado aprobados para el Feed posterior al MVP.
- La aprobación cubre la distribución y estas decisiones parciales de las tarjetas, no el aspecto final: la pantalla sigue en borrador hasta definir y aprobar el sistema visual completo y los detalles visuales que aún falten. La familia Inter y la escala tipográfica global de cuatro niveles ya están definidas; esta aprobación tipográfica no cierra por sí sola el diseño final de Personal.
- Siguen pendientes la definición global de los demás tonos de texto y neutros, los colores de estados adicionales, las especificaciones de trazo que aún no estén cerradas, las reglas para completar la paleta del tema claro Cuarzo y otros componentes del sistema visual. Ya están definidos la familia Inter y sus cuatro niveles tipográficos globales, los tres roles cromáticos base de Dark Mode y los colores específicos de iconos inactivos, contorno y nombres de las tarjetas de Personal. Las dimensiones y los detalles ya aprobados para componentes concretos se conservan sin cambios.

### Navegación y Descubrir

#### Implementación Android de Fase 1 — estructura inicial

- La navegación inferior se implementa como píldora flotante centrada de 240 × 64 dp, con dos espacios iguales de 120 dp, iconos lineales de 20 dp, etiquetas de 12 sp y separación de 4 dp. La sección inicial es Descubrir; los colores activos/inactivos y las transiciones siguen las decisiones aprobadas de cada tema.
- Personal implementa únicamente las cuatro filas MVP aprobadas, manteniendo sus dimensiones, iconos, textos, superficies y colores definidos en esta sección. No añade Estadísticas ni las tarjetas cuadradas de la experiencia completa.
- Descubrir implementa solo la barra superior aprobada: 52 dp de alto, radio 14 dp, márgenes laterales de 16 dp, lupa y engranaje de Ajustes dentro de la misma superficie. El texto visible del campo es exactamente `Buscar...` en ambos temas.
- La Activity trabaja de borde a borde. Personal y Descubrir respetan `safeDrawing` arriba y en los laterales: los 16 dp superiores de sus composiciones se miden desde el límite seguro inferior de la barra de estado. La píldora inferior aplica el inset real de navegación y conserva 16 dp adicionales hasta el área del sistema, tanto con gestos como con navegación de tres botones. Los iconos de las barras del sistema adoptan contraste según Obsidiana/Cuarzo.
- Esta entrega es una estructura visual y de navegación de Fase 1, no la implementación del diario ni de la búsqueda. Las filas de Personal no aparentan ejecutar acciones aún no disponibles; tampoco se muestran resultados ni pósteres ficticios.


La navegación conserva Personal y Descubrir. El Feed, sus modos, filtros, mosaico y paginación son posteriores al MVP.

#### Composición de Descubrir para el MVP (aprobada)

- La pantalla utiliza una única barra de búsqueda en la parte superior. El campo ocupa el espacio principal, con icono de lupa a la izquierda y el texto indicativo «Buscar...».
- A la derecha de la misma barra aparece un engranaje lineal de Ajustes. Al pulsarlo se abre Ajustes, donde se configura TMDB y las demás preferencias disponibles en la versión instalada.
- La barra conserva el carácter continuo y minimalista; no se presenta como tres tarjetas independientes.
- No se muestra el icono de Filtros en el MVP.
- Debajo aparece una única lista continua y mezclada de resultados; no hay bloques, encabezados ni separadores por procedencia.
- Todas las filas comparten el mismo diseño: miniatura de póster, título y año.
- Las películas guardadas localmente muestran el texto secundario y discreto «En tu Prisma» junto al año. Los resultados remotos no guardados muestran el año sin una etiqueta de procedencia.
- Los resultados locales aparecen inmediatamente. Cuando hay conexión y token verificado, los resultados de TMDB se incorporan a la misma lista a medida que llegan; no se reemplazan ni ocultan los resultados locales durante la consulta.
- **Carga aprobada:** mientras TMDB busca, aparece un indicador giratorio discreto dentro de la barra, a su derecha. No se muestra una pantalla de carga ni un mensaje separado; el teclado permanece abierto mientras el usuario escribe. Cuando termina la consulta remota, el indicador desaparece.
- Si cambia la consulta, se ignoran las respuestas que correspondan a consultas anteriores y nunca se mezclan con los resultados vigentes.
- El conjunto se presenta en un único orden por relevancia de búsqueda. Se priorizan coincidencias exactas y más fuertes; en caso de empate se favorece el registro local. El orden debe ser estable mientras no cambie la consulta.
- No se muestran dos filas para la misma película cuando el registro local ya está vinculado al mismo identificador TMDB: prevalece el registro local y conserva la indicación «En tu Prisma».
- La búsqueda local funciona sin conexión. Si no hay conexión o no existe un token verificado, los resultados locales siguen disponibles y los resultados remotos no se simulan.
- No hay Feed, recomendaciones, cuadrícula de portadas, filtros ni paginación infinita en el MVP.
- La composición y jerarquía son comunes a Obsidiana y Cuarzo; se adaptan superficies, textos e iconos a los roles cromáticos aprobados de cada tema.

**Estado inicial aprobado:** cuando no hay consulta, se muestra una ilustración sencilla, el mensaje «Busca una película» y la acción «AÑADIR PELÍCULA MANUALMENTE». La acción reutiliza el alta manual existente y está disponible sin conexión.

**Estado sin resultados aprobado:** después de completar las fuentes disponibles sin coincidencias, se muestra una ilustración sencilla, «No encontramos películas», «Prueba con otro título.» y «AÑADIR PELÍCULA MANUALMENTE». La consulta permanece en la barra para que el usuario pueda corregirla. No se presenta este estado como si TMDB hubiera devuelto cero resultados cuando no pudo consultarse por falta de conexión o token.

**Error durante consulta remota aprobado:** la lista unificada se conserva y los resultados locales nunca desaparecen por un fallo de TMDB. Si hay resultados locales, debajo de la lista aparece una indicación discreta con «No se pudo consultar TMDB», «No pudimos completar la búsqueda remota.» y «REINTENTAR», sin abrir otra pantalla ni crear un bloque de resultados distinto. Si no hay resultados locales, se muestra una ilustración sencilla, «No se pudo consultar TMDB», «No pudimos completar la búsqueda. Inténtalo de nuevo.», «REINTENTAR» y «AÑADIR PELÍCULA MANUALMENTE». La consulta permanece en la barra y se puede editar. El reintento es manual y repite la consulta vigente; no hay reintentos automáticos indefinidos. Si el problema confirmado es un token no válido, se utiliza el estado existente «Token no válido». La presentación conserva el mismo comportamiento en Obsidiana y Cuarzo, adaptando sus roles cromáticos.

**Ausencia de conexión a Internet aprobada:** cuando hay resultados locales, estos permanecen visibles en la lista unificada y aparece debajo de la barra una indicación discreta con el icono de conexión desactivada y el texto «Sin conexión a Internet». No se muestra el spinner. Cuando no hay coincidencias locales, se muestra una ilustración sencilla, «Sin conexión a Internet», el texto «Ahora no puedes consultar películas en TMDB. Puedes seguir utilizando las películas guardadas en tu Prisma o añadir una manualmente.» y la acción «AÑADIR PELÍCULA MANUALMENTE». No se utiliza «No encontramos películas» ni un mensaje de error de TMDB. La consulta permanece en la barra y puede editarse. Cuando vuelve el acceso a Internet, si hay un token verificado y la consulta sigue vigente, se realiza una única nueva búsqueda remota; durante ella aparece el spinner dentro de la barra y los resultados locales permanecen visibles. No se muestran reintentos automáticos repetidos. Obsidiana y Cuarzo comparten la composición y adaptan sus colores a cada tema.

**Ausencia de token TMDB verificado aprobada:** se reutiliza el aviso horizontal, discreto y no bloqueante ya definido en los requisitos: «Conecta TMDB» / «Configura tu token de TMDB para explorar el catálogo» / «CONFIGURAR TMDB». Aparece sin sustituir ni ocultar resultados locales; cuando no hay coincidencias locales tampoco se muestra «No encontramos películas», y el alta manual permanece disponible. El aviso y el comportamiento son iguales en Obsidiana y Cuarzo, adaptando sus roles cromáticos. No aparece el indicador de carga hasta que exista un token verificado. Al verificarse correctamente, si la consulta sigue vigente y hay conexión, comienza una única búsqueda remota y se utiliza el indicador habitual dentro de la barra. Los estados «Pendiente de verificación», «Token no válido» y «Error de conexión» conservan sus significados propios; un token anterior verificado sigue activo mientras se valida su reemplazo.

**Borrado de la consulta aprobado:** al eliminar todo el texto, la pantalla vuelve al estado inicial aprobado, con ilustración sencilla, «Busca una película» y «AÑADIR PELÍCULA MANUALMENTE». Desaparecen los resultados de la consulta anterior y sus mensajes contextuales de carga, error remoto, ausencia de conexión y configuración de TMDB. No se eliminan películas guardadas. El campo mantiene el foco y el teclado permanece abierto para escribir otra consulta. No se muestra spinner ni se ejecuta ninguna búsqueda mientras el campo esté vacío. Obsidiana y Cuarzo conservan la misma composición, con adaptación de sus roles cromáticos.

#### Jerarquía visual consolidada de Descubrir (MVP)

- **Dirección conceptual seleccionada:** **Concepto A — Continuidad silenciosa**. Los avisos utilizan un tratamiento **integrado y discreto**. La composición visual de la búsqueda y la lista de resultados del MVP se presentó y aprobó el 9 de noviembre de 2026 en Obsidiana y Cuarzo. Se respetan las medidas y jerarquías detalladas a continuación. La aprobación no resuelve la posición/composición de estados vacíos ni del aviso «Conecta TMDB», que mantienen sus pendientes P2 de Fase 3.

La composición aprobada se lee en este orden: **barra única de búsqueda y Ajustes → contenido de estado contextual cuando corresponda → lista continua de resultados**. No se introducen tarjetas de fuente, encabezados de origen, Feed, filtros ni secciones paralelas.

- **Barra:** un único contenedor continuo. La lupa queda a la izquierda del campo «Buscar...» y el engranaje de Ajustes a la derecha. El campo ocupa el espacio flexible. El spinner remoto, cuando corresponde, se integra dentro de la propia barra, antes del área táctil de Ajustes y sin convertirse en una pantalla o panel de carga. No se muestra Filtros en el MVP.
- **Iconos de búsqueda y Ajustes:** ambos dibujos miden **18 × 18 dp** y se centran verticalmente en la barra. Se utiliza estilo lineal fino con grosor de trazo de **1,4 dp**, terminaciones redondeadas y uniones redondeadas.
- **Lupa:** icono lineal de 18 × 18 dp, colocado a la izquierda del campo. Su espacio de alineación reserva **48 dp** de ancho y centra el dibujo. La lupa es decorativa y no constituye un botón independiente: el campo de búsqueda comienza a continuación y mantiene su propia zona de entrada.
- **Engranaje de Ajustes:** dibujo lineal reconocible de seis dientes exteriores simplificados y de proyección corta, con abertura central de **4 dp**. El contorno exterior forma una sola silueta dentada cerrada; los dientes sobresalen del cuerpo y quedan unidos entre sí. No se dibujan radios interiores ni un aro independiente, para evitar que el símbolo se perciba como un timón o rueda de barco. Se centra en un área táctil de **48 × 48 dp**, alineada al extremo derecho de la barra. Esa área táctil queda dentro de la altura de 52 dp, con 2 dp libres arriba y abajo; el dibujo permanece en 18 × 18 dp para no sobredimensionar el icono.
- La referencia manual `prisma-mvp-descubrir-obsidiana.svg` y su equivalente Cuarzo muestran la silueta dentada continua revisada; ambos temas conservan idéntica geometría, tamaño y grosor de trazo. **Aprobación visual:** el propietario confirmó que la forma final se ve correcta el 9 de noviembre de 2026; esta decisión queda cerrada.
- **Distribución horizontal aprobada:** la barra mantiene un margen exterior de **16 dp** a izquierda y derecha. El slot visual de la lupa ocupa **48 dp**; entre ese slot y el inicio del texto hay **8 dp**. El campo de búsqueda ocupa todo el ancho flexible disponible; entre el final del campo y el slot de Ajustes hay otros **8 dp**. El slot derecho de Ajustes ocupa **48 dp** y contiene centrada su área táctil de 48 × 48 dp. Los dos slots se alinean verticalmente en el centro de la barra. La lupa no es un control independiente y el slot derecho conserva la acción de Ajustes.
- **Cálculo de ancho flexible:** con estas reglas, el ancho disponible para el campo se obtiene restando al ancho de pantalla **144 dp** (32 dp de márgenes exteriores, 96 dp de slots y 16 dp de separaciones). El campo se adapta al ancho restante; no se fija una anchura absoluta.
- **Paridad temática de iconos:** los dos iconos mantienen geometría, tamaño, trazo y alineación en Obsidiana y Cuarzo. En Obsidiana utilizan el color de icono/texto secundario `#BDBDBD`; en Cuarzo utilizan `#68655F`.
- **Altura de la barra:** **52 dp**, aprobada.
- **Posición vertical de la barra:** su borde superior queda a **16 dp** del límite inferior del área segura superior del sistema. La referencia es el inset superior real informado por Android, no el borde físico de la pantalla ni una altura fija de la barra de estado. El fondo de Prisma puede dibujarse detrás de la barra de estado mediante diseño de borde a borde; la barra y el resto del contenido interactivo respetan el área segura. En Jetpack Compose se utilizará `WindowInsets.safeDrawing` (o el mecanismo equivalente definido en la Fase 1) sin aplicar el inset superior dos veces.
- **Radio de las esquinas de la barra:** **14 dp**, aprobado.
- **Separación vertical con aviso:** **12 dp** entre el borde inferior de la barra y el inicio del aviso contextual cuando corresponda; **12 dp** entre el final de ese aviso y el inicio de la primera fila. La posición exacta del aviso de token sigue pendiente.
- **Primera fila sin aviso:** cuando no hay un aviso contextual entre la barra y los resultados, la primera fila comienza **16 dp** debajo del borde inferior de la barra. Esta distancia se aplica por igual en Obsidiana y Cuarzo y no altera la ubicación aún pendiente del aviso de token.
- **Lista:** filas uniformes, cada una con póster, título y año. Las especificaciones ya aprobadas de las filas se mantienen en `REQUISITOS.md`, sección 6: miniatura 56 × 84 px (dimensión del recurso rasterizado), proporción 2:3, radio 2 dp, separación póster/texto 12 dp, márgenes laterales de fila 16 dp y separación entre filas 12 dp. Se conservan todos los valores numéricos nominales: la geometría se implementa en dp y la tipografía en sp. El título usa 14 sp/500 y el año 12 sp/400. No se muestran marcapáginas ni distintivos superpuestos sobre el póster en los resultados del MVP. «En tu Prisma» aparece únicamente junto al año de películas guardadas.
- **Color tipográfico:** se reutilizan roles globales, sin crear una paleta particular para Descubrir. En Obsidiana: texto principal `#F0F0F0`, secundario `#BDBDBD` y auxiliar `#9B9B9B`. En Cuarzo: principal `#292B2F`, secundario `#68655F` y auxiliar `#706C64`. La jerarquía y el contraste se conservan en ambos temas.
- **Estados con filas:** carga, error remoto, ausencia de conexión y aviso de token no crean una segunda lista ni alteran el diseño de las filas. La ausencia de conexión se indica debajo de la barra; el error remoto con resultados locales se comunica debajo de la lista. El aviso de token conserva su carácter horizontal, discreto y no bloqueante; su posición exacta dentro de la composición sigue pendiente. El indicador de carga permanece integrado en la barra. Ninguno de estos estados crea tarjetas de resultados separadas.
- **Lenguaje ilustrativo aprobado para estados vacíos:** familia geométrica propia basada en un prisma facetado reconocible, con facetas suaves, trazos finos consistentes y como máximo un símbolo secundario pequeño por estado. Las facetas utilizan planos discretos, sin sombras, gradientes ni elementos decorativos. Cada ilustración debe comunicar un significado distinto, no repetir el mismo dibujo añadiendo un icono arbitrario.
- **Estados con ilustración central:** estado inicial (prisma atravesado por un rayo de luz); sin resultados (prisma acompañado de una lupa pequeña con lente vacía); error remoto sin resultados (prisma y trayectoria remota interrumpida mediante un pequeño corte visual, sin X roja); ausencia de conexión sin resultados (prisma y símbolo Wi-Fi mínimo desconectado).
- **Sin ilustración central:** «Conecta TMDB» permanece como aviso horizontal textual, integrado y discreto; no recibe una quinta ilustración porque representa una tarea de configuración. Tampoco se muestran ilustraciones grandes para error remoto o desconexión cuando permanecen resultados locales: se conservan los avisos discretos junto al contenido.
- **Paridad entre temas:** se comparte exactamente la geometría de cada ilustración en Obsidiana y Cuarzo; solo se adaptan los roles cromáticos de contornos, facetas y acentos.
- **Tamaño de referencia aprobado:** cada ilustración central utiliza un área de referencia de **96 × 96 dp**, cuadrada. Esta medida define el tamaño conceptual base del dibujo, no la separación con el texto ni la composición completa del estado.
- **Alcance de esta aprobación:** se aprueban el lenguaje visual, el significado de la familia y el tamaño de referencia de 96 × 96 dp; siguen pendientes la posición, separación respecto al título, texto y acción, la adaptación proporcional si el contexto requiere ajustar el dibujo y la composición completa de cada estado.
- **Estados sin filas con ilustración central:** estado inicial, sin resultados válidos, error remoto sin resultados y ausencia de conexión sin resultados. La ausencia de token verificado no añade una ilustración central: conserva únicamente el aviso textual «Conecta TMDB» con el pequeño símbolo de configuración que corresponda. No se reutiliza «No encontramos películas» cuando una fuente necesaria no se pudo consultar.
- **Borrado:** vuelve al estado inicial y retira los estados contextuales de la búsqueda anterior. Mantiene el foco y el teclado.
- **Interacción:** la fila completa constituye la zona táctil y abre la ficha; el póster no contiene controles independientes.

La composición y el orden funcional son los mismos en Obsidiana y Cuarzo. Se adaptan fondo, superficies, texto, iconos y estados mediante los roles cromáticos ya aprobados; no se crea una variante de estructura para el tema claro.

**Pendiente para la revisión conceptual visual:** ubicación y separación de las ilustraciones aprobadas respecto al título, texto auxiliar y acción, composición completa de cada estado y ubicación exacta del aviso de token. El tamaño de referencia de 96 × 96 dp ya está aprobado. El ritmo vertical de resultados ya está aprobado: **16 dp** entre barra y primera fila cuando no hay aviso; **12 dp** entre barra y aviso y otros **12 dp** entre aviso y primera fila cuando el aviso se coloca en ese espacio. La coherencia de unidades de las filas queda resuelta por la regla compartida: los valores geométricos nominales de **16 px** de margen lateral, **12 px** de separación entre filas, **12 px** entre póster y texto y **2 px** de radio se implementan en `dp` con el mismo valor; los tamaños tipográficos nominales de **14 px** y **12 px** se implementan en `sp`. El póster conserva **56 × 84 px** por ser un recurso rasterizado. No cambia ninguna magnitud aprobada. La altura de la barra (52 dp), su radio (14 dp), su posición a 16 dp después del área segura superior, el fondo de borde a borde detrás de la barra de estado, el ritmo vertical aprobado (16 dp entre barra y primera fila sin aviso; 12 dp a cada lado del aviso cuando se intercala), los iconos de 18 × 18 dp con trazo de 1,4 dp, el área táctil y los slots de 48 dp, las separaciones horizontales de 8 dp y el margen exterior de 16 dp ya están aprobados. El póster de 56 × 84 px ya establece la altura mínima de cada fila; queda revisar su integración y alineación en la composición completa. También debe resolverse cómo se presenta la coincidencia simultánea de condiciones (por ejemplo, ausencia de conexión y de token verificado, o pérdida de conexión durante una petición remota), sin inventar una prioridad no aprobada. La dirección Concepto A — Continuidad silenciosa y el tratamiento integrado y discreto de avisos están seleccionados; las medidas restantes y la pantalla completa siguen pendientes de aprobación. La revisión conceptual deberá mostrar Obsidiana y Cuarzo con la misma composición antes de cerrar esas decisiones.


#### Experiencia completa de Descubrir (posterior al MVP)

- Descubrir es la sección inicial.
- En la parte superior, **una única barra horizontal continua**: campo de búsqueda a la izquierda, con una **lupa lineal de 18 px y color `#BDBDBD`** (opción A seleccionada) antes del texto indicativo «Buscar...» (**14 px**, opción A seleccionada y color **`#BDBDBD`**, opción B seleccionada), con una separación horizontal de **8 px** respecto a este (opción A seleccionada), y dentro del mismo contenedor y superficie, icono de Filtros con forma de **embudo clásico alargado** (opción B seleccionada), con laterales suavemente curvos, con una curvatura sutil (opción A seleccionada), salida inferior larga y estrecha, con cuello recto de **6 px** (opción B seleccionada), boca superior de **13 px de ancho** (opción B seleccionada) y salida inferior de **3 px** (opción A seleccionada) e icono de Ajustes a la derecha; Ajustes debe representarse mediante un **engranaje lineal reconocible de geometría minimalista y compacta, con seis dientes exteriores simplificados, discretos y de proyección corta, y abertura central de 4 px de diámetro** (opción A seleccionada), no mediante el símbolo circular simplificado de las propuestas anteriores (`[Buscar...  (Filtros) (Ajustes)]`). Los tres elementos deben percibirse como partes integradas de una sola barra, no como controles o tarjetas independientes. Altura: **52 px** (opción B seleccionada). Radio de las esquinas: **26 px** (opción B seleccionada), con extremos completamente redondeados. Tamaño de los iconos de Filtros y Ajustes: **18 × 18 px**, con la misma escala visual aparente; el embudo debe ajustarse ópticamente para no percibirse más grande que el engranaje de Ajustes, color **`#BDBDBD`** (opción B seleccionada) y estilo **lineal fino, con un grosor de trazo de 1,4 px** (opción A seleccionada) y terminaciones de trazo **redondeadas** (`stroke-linecap: round`, opción A seleccionada), además de **uniones redondeadas** (`stroke-linejoin: round`, opción A seleccionada). Margen interior entre los bordes de la barra y sus elementos: **12 px** (opción A seleccionada). Separación horizontal entre los iconos de Filtros y Ajustes: **12 px** (opción A seleccionada). **Tratamiento de superficie de la barra: opción B seleccionada, sin contorno visible; utiliza únicamente la superficie `#222222` sobre el fondo `#171A20`.** Margen lateral exterior seleccionado: **16 px** a izquierda y derecha, medido desde los bordes de la pantalla hasta los extremos del contenedor.
- Feed debajo del buscador.
- Separación vertical entre el borde inferior de la barra superior y el borde superior de la primera fila de pósteres: **16 px** (opción B seleccionada).
- Píldora flotante inferior, separada de los bordes, con Personal y Descubrir.
- Altura de la píldora flotante inferior: **64 px**.
- Ancho de la píldora flotante inferior: **240 px** (concepto A, formato compacto).
- Distribución horizontal de Personal y Descubrir dentro de la píldora: **concepto A seleccionado**, dos espacios iguales de **120 px** cada uno; cada sección centra su conjunto de icono y nombre dentro de su mitad.
- Forma exterior de la píldora flotante inferior: **concepto A seleccionado**, cápsula completa con radio de **32 px**.
- Grosor del contorno exterior de la cápsula de navegación inferior: **1 px**, color **`#353535`**.
- Tratamiento visual de la navegación inferior: **concepto B seleccionado**. La píldora exterior conserva la superficie **`#222222`** y un contorno de **1 px** en color **`#353535`**. La sección activa se distingue solo por el icono y el texto en azul de acento **`#5B9BD5`**, colocados directamente sobre la superficie común, sin cápsula ni fondo interior adicional. La sección inactiva utiliza icono y texto en gris **`#BDBDBD`**. El concepto define este tratamiento de selección, no aprueba todavía el diseño completo de la navegación ni de la pantalla.
- Cambio entre Personal y Descubrir: **opción B seleccionada, transición cromática suave**. El azul de acento `#5B9BD5` se transfiere gradualmente a la nueva sección activa y la sección anterior recupera el gris `#BDBDBD`. El cambio afecta únicamente al color: iconos, etiquetas y sus posiciones permanecen estables, sin desplazamientos ni fondos interiores. Duración de la transición cromática: **200 ms**. Curva de aceleración seleccionada: **`ease-in-out`**, con inicio y final suaves. Curva Bézier exacta: `cubic-bezier(0.42, 0, 0.58, 1)`.
- Disposición interna de cada elemento de la navegación inferior: **concepto B seleccionado**. El icono se coloca encima del nombre y ambos quedan centrados horizontalmente. Esta decisión complementa el tratamiento cromático anterior, pero no aprueba todavía la composición completa de la navegación.
- Respuesta visual al pulsar una sección de la navegación inferior: **opción B seleccionada**. El conjunto formado por el icono y el nombre se comprime sutilmente hasta una escala de **0,96** mientras se mantiene la pulsación y recupera su escala normal (**1,0**) al soltar. Duración: **100 ms para la compresión** y **160 ms para la recuperación**. No se añade fondo, cápsula interior ni cambio de color distinto al estado activo ya definido. Curvas de aceleración: **ease-out para la compresión y ease-out para la recuperación**.
- Tamaño de los nombres «Personal» y «Descubrir» en la navegación inferior: **12 px** en ambas secciones.
- Separación vertical entre el icono y el nombre de cada sección de la navegación inferior: **4 px**.
- Peso tipográfico en la navegación inferior: sección activa **medio (500)**; sección inactiva **regular (400)**. El cambio de peso acompaña al color de estado y no añade una cápsula interior.
- Tamaño de los iconos de Personal y Descubrir en la navegación inferior: **20 px** en ambas secciones.
- Estilo gráfico de los iconos de Personal y Descubrir en la navegación inferior: **opción A seleccionada, iconografía lineal**, basada en trazos y no en siluetas rellenas.
- Grosor del trazo de los iconos de la navegación inferior: **opción A seleccionada, 1,4 px**, fino y ligero.
- Terminaciones de los trazos de los iconos de la navegación inferior: **opción A seleccionada, redondeadas** (`stroke-linecap: round`), para conservar un acabado suave y delicado.
- Uniones entre segmentos de los trazos de los iconos de la navegación inferior: **opción A seleccionada, redondeadas** (`stroke-linejoin: round`), para mantener continuidad visual en los cambios de dirección.
- Símbolo de la sección **Personal** en la navegación inferior: **silueta lineal de usuario**. Geometría aprobada: **cabeza circular y hombros abiertos mediante una curva continua, sin círculo exterior** (opción A, usuario minimalista).
- Símbolo de la sección **Descubrir** en la navegación inferior: **tres destellos lineales de diferentes tamaños, formando una pequeña constelación** (opción B seleccionada), asociados al descubrimiento y las recomendaciones.
- Separación inferior de la píldora flotante respecto al área de gestos del sistema: **16 px** (concepto A), medida desde el borde inferior de la píldora hasta el límite superior del área de gestos.
- Posición horizontal de la píldora flotante inferior: **opción A seleccionada, centrada respecto al ancho total de la pantalla**; su eje central coincide con el eje central horizontal de la pantalla y no depende de los márgenes del contenido.
- La navegación inferior debe percibirse como una **píldora realmente flotante**, independiente del borde inferior y del contenido; no debe convertirse en una barra fija de ancho completo. La píldora **no lleva sombra**. Su sensación flotante se logra mediante su separación respecto al borde inferior y al contenido, junto con el contraste entre la superficie `#222222` y el fondo `#171A20`.
- Al desplazarse hacia abajo por el contenido, la píldora de navegación inferior **se oculta**.
- La ocultación no se activa con el primer movimiento: espera a que el desplazamiento acumulado hacia abajo alcance **24 px**. Los movimientos inferiores a ese umbral mantienen la píldora visible.
- Cuando el usuario invierte el sentido del desplazamiento y comienza a deslizar hacia arriba, la píldora de navegación inferior **reaparece inmediatamente**, incluso si todavía se encuentra a mitad del contenido.
- Si la píldora todavía está ejecutando la animación de reaparición y el usuario vuelve a desplazar hacia abajo, la animación de entrada **se interrumpe inmediatamente y cambia de dirección desde la posición visual alcanzada**, sin esperar a completar los 280 ms. El umbral de 24 px se mantiene para iniciar la ocultación cuando la píldora ya está completamente visible.
- La ocultación y reaparición utilizan una **animación de deslizamiento vertical**: al ocultarse, la píldora se desplaza hacia abajo y sale de la pantalla; al reaparecer, entra desde abajo hasta recuperar su posición habitual. Duración de la animación: **180 ms para la desaparición** y **280 ms para la reaparición**. Curvas de aceleración diferenciadas: **desaparición con aceleración progresiva (ease-in)**, que comienza suavemente y gana velocidad al salir hacia abajo; **reaparición con desaceleración progresiva (ease-out)**, que entra con rapidez y se suaviza al recuperar su posición habitual. Curvas Bézier seleccionadas, de intensidad equilibrada: **desaparición** `cubic-bezier(0.4, 0, 1, 1)` y **reaparición** `cubic-bezier(0, 0, 0.2, 1)`. La salida mantiene una aceleración progresiva y la entrada una desaceleración progresiva.

- Feed predeterminado de tres columnas.
- Proporción de las portadas verticales del Feed: **2:3** (opción A seleccionada, formato cinematográfico clásico).
- Margen exterior del Feed: **16 px** a izquierda y derecha, medido desde los bordes de la pantalla hasta los extremos de la cuadrícula (opción B seleccionada).
- Separación horizontal entre pósteres de columnas adyacentes: **12 px** (opción B seleccionada).
- Separación vertical entre filas consecutivas de pósteres: **12 px** (opción B seleccionada).
- En las propuestas visuales del Feed no se muestran rótulos o encabezados como «Películas» ni subtítulos como «Para descubrir».
- Cada elemento del Feed muestra únicamente la portada, sin título, año, descripción ni ningún otro texto debajo de la imagen. Se mantienen los marcadores de estado aprobados cuando correspondan.
- Diseño alternativo de mosaico de tres columnas, mezclando pósteres verticales con imágenes horizontales de doble o triple ancho.
- Desplazamiento infinito.
- Marcapáginas azul `#5B9BD5` para Vista y gris `#D0D0D0` para Pendiente.
- Ubicación del marcapáginas: esquina superior derecha de cada portada. La distancia de **2 px** hacia el interior se mide desde el borde derecho de la portada hasta el extremo exterior visible del contorno del marcapáginas.
- El marcapáginas sobresale exactamente **6 px por encima del borde superior** de la portada, medidos hasta el extremo exterior visible de su contorno; debe leerse como una **pestaña física que marca la película**, no como un icono flotante superpuesto.
- Silueta seleccionada: **cinta clásica con muesca cóncava en V en el extremo inferior** (opción A). La anchura exterior visible total es de **16 px** (opción B), incluyendo el contorno. La profundidad exterior visible de la parte interior de la cinta es de **22 px**, medida desde el borde superior de la portada hasta el extremo exterior visible de las dos esquinas inferiores, sin contar los **6 px** que sobresalen por encima. La profundidad exterior visible de la muesca en V es de **6 px** (opción B), medida desde la línea que une las dos esquinas inferiores exteriores hasta el extremo exterior visible del vértice interior.
- **Orientación obligatoria de la muesca:** la V inferior es un recorte cóncavo que entra hacia dentro del cuerpo de la cinta. Su vértice interior apunta **hacia arriba**, en dirección al borde superior de la portada y al cuerpo de la pestaña; queda más alto que las dos esquinas inferiores exteriores. Por tanto, las esquinas exteriores quedan por debajo del vértice. **Nunca se debe invertir la V con el vértice apuntando hacia abajo o hacia fuera.**
- Radio exterior visible de las dos esquinas superiores de la cinta: **1 px** (opción B seleccionada). La forma y profundidad de la muesca inferior en V permanecen sin cambios.
- Terminación del vértice interior de la muesca: **aguda y definida** (opción A seleccionada), sin redondeo adicional ni tramo plano; el vértice apunta hacia dentro de la cinta.
- Tratamiento de las dos uniones inferiores exteriores entre los laterales y las diagonales de la muesca: **angular** (opción A seleccionada), con encuentros rectos, sin redondeo ni bisel. El vértice interior agudo de la muesca permanece orientado hacia dentro.
- Trayectoria de los dos lados diagonales de la muesca interior: **recta** (opción A seleccionada), sin curvatura; forman una V cóncava clásica con el vértice dirigido hacia dentro de la cinta.
- Simetría de la muesca interior: **opción A seleccionada, simétrica respecto al eje vertical central de la cinta**. El vértice interior queda centrado en el ancho exterior visible de 16 px y las dos diagonales tienen la misma inclinación; la geometría izquierda y derecha es un reflejo respecto a ese eje.
- Acabado interior de la cinta: **color sólido uniforme** (opción A seleccionada), sin degradado ni reflejo central.
- Sombra del marcapáginas: **sombra de contacto muy sutil**, color **`#000000`** (opción A), opacidad de **12 %** y radio de desenfoque de **0,5 px** (opción A); permanece pegada al contorno de la pestaña, con desplazamiento de **0 px**, y la separa visualmente de la portada sin producir un efecto elevado o artificial.
- Extensión de la sombra: **opción B seleccionada, solo en el contorno en contacto con la superficie de la portada**. Se aplica a los tramos del perímetro situados dentro de los límites de la imagen; se excluyen el borde superior y cualquier tramo de la pestaña que sobresalga por encima de la portada. No se modifica la intensidad, el desenfoque ni el desplazamiento ya aprobados.
- Todas las cotas geométricas del marcapáginas se refieren a su envolvente exterior visible e incluyen el contorno. El trazado interior debe ajustarse para que, una vez aplicado el contorno centrado, se mantengan exactamente esas dimensiones exteriores.
- Grosor del contorno del marcapáginas: **0,6 px** (opción B seleccionada).
- Posición del contorno respecto a la silueta: **centrado** (opción A seleccionada); con un grosor total de 0,6 px, se distribuye 0,3 px hacia el interior y 0,3 px hacia el exterior del límite de la forma.
- Tratamiento de las uniones del trazo del contorno: **angular** (opción A seleccionada), con encuentros nítidos y vértices definidos, sin redondeo ni bisel. Esta decisión regula únicamente la unión del trazo; no altera la silueta, la V cóncava simétrica, las dimensiones ni el grosor de 0,6 px ya aprobados.
- Tratamiento cromático del contorno: **tonal** (opción A seleccionada); cada borde utiliza un tono más oscuro que el relleno de su propio marcapáginas. Contorno azul de Vista: **`#3E78A7`** (opción A). Contorno gris de Pendiente: **`#A8A8A8`** (opción A).
- Comportamiento en el Feed de Descubrir: el marcapáginas es un **indicador visual exclusivamente informativo**, sin acción propia ni zona táctil independiente. La interacción táctil corresponde a la portada completa, que abre la ficha de la película; el estado Vista/Pendiente se modifica desde las acciones de esa ficha.
- Comportamiento en «También podría gustarte»: se mantiene el mismo criterio informativo del Feed de Descubrir. El marcapáginas no tiene acción ni zona táctil independiente; toda la portada abre la ficha de la película relacionada. Los cambios de estado se realizan desde las acciones de esa ficha.
- Aparición del marcapáginas al restaurar una película oculta: **directa** (opción A seleccionada), sin animación ni fundido de opacidad. Se muestra de inmediato el color del estado recuperado —Vista `#5B9BD5`, Pendiente `#D0D0D0`— o no se muestra si la película vuelve sin estado. La restauración no cambia el estado recuperado.
- Actualización del marcapáginas al volver a Descubrir después de modificar el estado desde la ficha: **directa, sin animación**. Se muestra inmediatamente el estado final (Vista: relleno `#5B9BD5`, contorno `#3E78A7`; Pendiente: relleno `#D0D0D0`, contorno `#A8A8A8`) o deja de mostrarse si ya no pertenece a ninguno de los dos estados. Esta regla cubre la asignación inicial, el cambio Vista/Pendiente y la eliminación del estado. No se animan el color, la opacidad, la entrada ni la salida, porque la modificación ocurre dentro de la ficha y Descubrir no está visible durante la acción.

### Buscador: resultados (MVP)

- Cada fila muestra únicamente póster, título y año. Las películas guardadas muestran además «En tu Prisma» junto al año; los resultados remotos nuevos no llevan esa indicación.
- Miniatura del póster: **56 × 84 px**, proporción **2:3** y radio de **2 px**.
- Separación horizontal entre póster y bloque de texto: **12 px**. Márgenes laterales de cada fila: **16 px**, alineados con los extremos de la barra de búsqueda.
- El bloque de título y año se centra verticalmente respecto al póster y mantiene alineación a la izquierda.
- Título: **14 px**, peso **medio (500)**, máximo dos líneas; si se excede, se trunca al final de la segunda línea con puntos suspensivos. Año e indicación «En tu Prisma»: **12 px**, peso **regular (400)**. Separación entre título y año: **2 px**.
- Separación vertical entre filas consecutivas: **12 px**.
- Los colores tipográficos reutilizan los roles aprobados de cada tema: principal para el título y secundario para el año y «En tu Prisma».
- No se muestran marcapáginas, etiquetas «Oculta», insignias de estado ni controles superpuestos sobre el póster en los resultados del MVP.
- Toda la fila —póster, título y año— constituye una sola zona táctil y abre la ficha de la película. No hay acciones independientes sobre la miniatura.

### Buscador: respuesta visual al mantener pulsada una fila

- Estado de pulsación seleccionado: **iluminación sutil y transitoria** de la fila completa, con radio medio (`md`) y sin contorno. El tratamiento cromático debe adaptarse a Obsidiana y Cuarzo; no se aplica un gris oscuro fijo a ambos temas ni se utiliza el azul de acento. Al soltar, la fila vuelve a su apariencia normal. No se convierte en una tarjeta permanente.

### Personal: listas personalizadas

- «Gestionar listas» es una sección propia de Personal para crear y administrar listas cinematográficas personalizadas.
- Cada lista muestra un nombre obligatorio y una descripción opcional.
- Cada lista tiene un color identificativo elegible al crearla, visible discretamente junto al nombre y en detalles.
- Los colores se seleccionan de una paleta predeterminada y curada por Prisma, no de un selector libre.
- Paleta aprobada y compartida por Obsidiana/Cuarzo: Azul `#70AEE0`, Turquesa `#58ADA5`, Verde `#79A982`, Amarillo `#D4B15F`, Naranja `#D68C61`, Coral `#CC7F87`, Violeta `#A18AC7` y Gris `#9199A4`. Azul es el valor seleccionado por defecto. Los ocho colores pueden reutilizarse libremente entre listas.
- Cada lista puede mostrar la acción «FIJAR»; no se rotulará como «Favoritas».
- Las listas fijadas se muestran primero en «Gestionar listas», por encima de las no fijadas. Las listas nuevas comienzan sin fijar.
- Cada tarjeta tiene un menú de tres puntos con «EDITAR», «FIJAR»/«DESFIJAR» y «ELIMINAR». Las acciones de fijar/desfijar son inmediatas y una lista fijada muestra una chincheta discreta junto al nombre.
- La tarjeta completa abre la lista; el menú de tres puntos y el control de arrastre conservan zonas de interacción independientes.
- Las listas se pueden reordenar entre sí mediante arrastre, siempre dentro de su grupo (fijadas o no fijadas); las fijadas permanecen arriba. Para mover una lista de grupo se utiliza «FIJAR» o «DESFIJAR».
- El color de identidad no modifica los colores de los pósteres que componen el collage.
- La tarjeta de cada lista usa una composición horizontal en una columna: collage automático de pósteres a la izquierda y datos a la derecha. El collage representa siempre la lista completa y no cambia al buscar, filtrar u ordenar.
- La portada de cada lista es un collage de pósteres de las películas incluidas; se actualiza al cambiar el contenido.
- La acción de eliminar una lista no elimina las películas ni sus datos; solo retira la lista y las asociaciones de pertenencia.
- Antes de confirmar la eliminación, se presenta una ventana con el nombre de la lista y las opciones «CANCELAR» y «ELIMINAR».
- Las portadas se pueden reordenar manualmente mediante arrastre.
- Se podrá cambiar temporalmente el criterio de ordenación sin perder el orden manual guardado.
- Dentro de una lista, las películas se presentan en una cuadrícula de tres columnas con pósteres verticales 2:3, sin texto superpuesto.
- Cada lista ofrece controles de filtros propios, separados de los de otras listas y de Descubrir.
- Cuando sea lógico, los controles permitirán combinar condiciones con AND u OR.
- AND aparece seleccionado inicialmente; OR se ofrece como alternativa visible cuando la combinación lo admita.
- El panel de filtros de cada lista parte de los filtros de Descubrir y puede crecer con filtros adicionales que se aprueben; su contenido se definirá al diseñar esa pantalla.
- La creación y edición reutilizan un formulario de una sola pantalla: nombre obligatorio, descripción opcional y selección de color; azul aparece seleccionado inicialmente. En el MVP, que no incluye la paleta ni los colores personalizados, el formulario básico se limita a nombre y descripción.
- Al crear correctamente se muestra «Lista creada correctamente» y se abre su contenido. Al editar se rellenan los valores actuales y el botón principal dice «GUARDAR CAMBIOS».
- Dentro de «AÑADIR PELÍCULAS», cada resultado muestra póster, título, año y casilla de selección. La selección múltiple se confirma desde un botón fijo inferior «AÑADIR A LA LISTA», que muestra el total seleccionado y se deshabilita cuando no hay selección.
- Las películas ya pertenecientes a la lista se identifican como «AÑADIDA» y no se pueden seleccionar de nuevo.
- Mantener pulsada una portada dentro de la lista abre un menú contextual con «ABRIR FICHA» y «QUITAR DE ESTA LISTA».
- El buscador y el panel de filtros conservan los mismos nombres, componentes y estilos compartidos con el resto de Prisma.
- No debe confundirse visual ni funcionalmente con Historial o Pendientes.
- Desde una ficha, «GESTIONAR LISTAS» abre una ventana con la relación de listas personalizadas y casillas de selección múltiple; las casillas reflejan la pertenencia actual de la película.

### Ficha de película

- Cabecera horizontal a todo lo ancho, con degradado inferior, título en blanco y controles circulares semitransparentes.
- Claqueta gris sobre fondo gris oscuro como sustituto si falta imagen.
- Datos básicos en una línea separados por barras.
- Márgenes laterales constantes, secciones separadas por espacio.
- Pocas tarjetas; las tarjetas se reservan para plataformas y los componentes que el diseño final justifique.
- Acciones, puntuaciones, proveedores, reparto/equipo, colecciones y películas relacionadas siguen el orden funcional descrito en Requisitos.

## Referencia de componentes

Todavía no hay un sistema de diseño completo aprobado. La familia tipográfica global seleccionada es **Inter**, con pesos **400, 500 y 600** aprobados. Los tamaños de referencia definidos son **16 px** para texto normal, **14 px** para texto secundario, **12 px** para texto auxiliar y **22 px** para títulos de sección. El texto normal queda definido en **16/24 px**, peso **regular (400)** y letter spacing **0 px**; el texto secundario en **14/20 px**, peso **regular (400)** y letter spacing **0 px**; y los títulos de sección en **22/28 px**, peso **medio (500)** y letter spacing **0 px**. El texto auxiliar queda definido en **12/18 px**, peso **regular (400)** y letter spacing **0 px adicionales** (opción A aprobada), conservando el espaciado natural de Inter. Estos cuatro niveles se consideran suficientes por ahora; no se prevén niveles adicionales en esta etapa, aunque la escala podrá ampliarse si una necesidad concreta del producto lo justifica. Los temas de apariencia se denominan **Obsidiana** (modo oscuro) y **Cuarzo** (modo claro); ambos nombres están aprobados. En **Obsidiana**, están aprobados el fondo principal global `#171A20` y la superficie elevada global `#242A35` (RGB 36, 42, 53). El acento global está aprobado en `#70AEE0` (RGB 112, 174, 224), alternativa B. `#5B9BD5` se conserva como referencia anterior y en componentes con especificaciones particulares ya aprobadas; la preferencia cromática general es el azul. Sus textos globales utilizan `#F0F0F0` (principal), `#BDBDBD` (secundario) y `#9B9B9B` (auxiliar), y su neutro global para iconos inactivos es `#BDBDBD` (excepto componentes con reglas específicas, como Personal `#D0D0D0`); el contenido de controles deshabilitados es `#888888` y su superficie deshabilitada es `#1D222B`; la superficie transitoria de pulsación para elementos interactivos sobre `#242A35` es `#2B303A`; el contorno de los controles deshabilitados está aprobado sin línea visible (opción A) y no se aplica opacidad adicional (**100 %, opción A aprobada**). Sus separadores internos utilizan `#353535` con grosor de 1 px y separación respecto al contenido adyacente de 8 px por encima y 8 px por debajo (alternativa A aprobada). En **Cuarzo** están aprobados el fondo principal `#F4F1EA`, las superficies `#FFFFFF`, el contorno de superficie `#DDD8CE` de 1 px, el texto principal `#292B2F`, el texto secundario `#68655F`, el texto auxiliar `#706C64`, el acento principal `#356F9F`, el neutro de iconos inactivos `#8A857B`, el contenido de controles deshabilitados (texto e iconos) `#9D998F`, su superficie `#F0EDE6` y la ausencia de contorno visible en esos controles (opción A aprobada), los separadores internos `#E8E3DA` de 1 px con separación respecto al contenido adyacente de 8 px por encima y 8 px por debajo (alternativa A aprobada), y la superficie transitoria de pulsación `#ECE7DE` para elementos interactivos sobre superficies blancas; el contorno de los controles deshabilitados sin línea visible (opción A) está aprobado; la ausencia de opacidad adicional (**100 %**, opción A aprobada) está confirmada; los separadores internos están aprobados en **1 px** en ambos temas (`#353535` en Obsidiana y `#E8E3DA` en Cuarzo), con separación respecto al contenido adyacente de **8 px por encima y 8 px por debajo (alternativa A aprobada)**; otros neutros, otros bordes y otros estados siguen pendientes de definición y aprobación. Para las tarjetas de Personal está confirmada la excepción al neutro global de iconos inactivos de Obsidiana: utilizan `#D0D0D0`, el contorno `#353535` de 1 px y el color `#F0F0F0` de los nombres; los iconos activos podrán utilizar el acento azul. Los demás tonos neutros no definidos, otros bordes y estados adicionales siguen pendientes; en Cuarzo están aprobados el fondo principal, las superficies, el contorno de superficie, los textos principal, secundario y auxiliar, el acento principal, el neutro para iconos inactivos, el color de separadores internos y la superficie transitoria de pulsación; el grosor de los separadores internos está aprobado en 1 px y su separación respecto al contenido adyacente es de 8 px por encima y 8 px por debajo; faltan otros neutros, otros bordes y otros estados.

La iconografía global está definida como lineal, minimalista, esencial e híbrida en su geometría, con ajuste óptico del espacio de dibujo, tamaño de referencia de **24 × 24 dp**, grosor de trazo de **1,75 dp** y terminaciones y uniones redondeadas para iconos nuevos sin especificaciones particulares; se conservan las reglas y geometrías propias de componentes existentes, incluidos los tamaños de 20 dp y 32 dp y el grosor de 1,4 dp donde ya están aprobados.

## Autoría y guía de iconografía — 11 de noviembre de 2026

El propietario se encarga de crear y decidir el diseño final de todos los iconos de Prisma. El asistente proporciona dirección, información técnica, inventario y conceptos visuales de referencia; no convierte esas propuestas en arte final sin aprobación expresa.

Se auditó el código actual: `PrismaIcon.kt` contiene diez glifos provisionales (PERSON, DISCOVER, HISTORY, PENDING, HIDDEN, LISTS, CHEVRON, SEARCH, SETTINGS y BACK). Las formas actuales son referencias de implementación, no un conjunto de arte final aprobado. Se añadirá una guía de producción en `CONCEPTOS_FASE2/../ICONOGRAFIA/README.md` y una lámina conceptual manual con variantes de lectura en Obsidiana/Cuarzo. La guía conserva el sistema aprobado: glifos base de 24 × 24 dp, trazo de 1,75 dp, terminaciones y uniones redondeadas; respeta los tamaños particulares ya aprobados de 20/1,4, 18/1,4, 20/1,5 y 16/1,5 dp según componente.

Además del set de diez glifos, se revisarán por separado dos gráficos existentes: prisma vacío (ilustración de 96 × 96 dp) y marcador de póster (símbolo de 28 dp dentro de 56 × 84 dp). No deben contarse como iconos de acción. El icono lanzador de aplicación no está declarado todavía en el manifiesto Android ni tiene recursos propios; se registra como entregable de identidad previo a una distribución pública, con capas adaptables de color y monocromática. No se selecciona aún una dirección de marca.

La autoría y decisión final de las formas queda reservada al propietario. El diseño conceptual no autoriza a sustituir las siluetas actuales por otras definitivas.

## Propuestas visuales presentadas — Fase 2

### Historial y Pendientes

Se prepararon conceptos vectoriales manuales para las dos pantallas y sus dos temas, en `CONCEPTOS_FASE2/`. Se conserva la estructura de la búsqueda local y la navegación inferior de Prisma. Las composiciones usan el patrón de resultados aprobado (póster 56 × 84, título 14 px/500 y año 12 px/400), sin tarjetas voluminosas ni acciones superpuestas.

- **Historial:** cada película aparece una sola vez, con contador de visionados y fecha del más reciente, sin perder la independencia de los registros individuales.
- **Pendientes:** cada película aparece una sola vez; se muestra la fecha de incorporación y el orden es más reciente primero.
- Obsidiana y Cuarzo se presentan en paralelo con la misma jerarquía y sus colores aprobados.
- Los ejemplos son ficticios. Los pósteres son ilustraciones SVG originales.

Archivos: `prisma-fase2-historial-obsidiana.svg`, `prisma-fase2-historial-cuarzo.svg`, `prisma-fase2-pendientes-obsidiana.svg` y `prisma-fase2-pendientes-cuarzo.svg`.

**Aprobación de composición visual — 11 de noviembre de 2026:** el propietario respondió «Ok, está bien, continúa», confirmando la dirección visual presentada en las cuatro variantes. Quedan aprobados el encabezado con regreso y título, el buscador local, el contador de películas, la lista continua, la miniatura 56 × 84, la jerarquía tipográfica, los metadatos propios de cada lista, la navegación inferior con Personal seleccionado y la paridad estructural entre Obsidiana y Cuarzo.

La aprobación cubre la composición principal de las listas, no los estados vacíos ni los estados de búsqueda sin coincidencias. Tampoco decide todavía si una fila abre la ficha ni el recorrido de retirada de Pendientes; la retirada seguirá requiriendo confirmación desde la ficha según los requisitos funcionales. Esos puntos permanecen pendientes y no se simulan con controles sin función.

La implementación puede comenzar sobre la composición aprobada. Los estados no aprobados se mantienen deliberadamente sencillos y provisionales hasta presentar sus conceptos correspondientes.

### Corrección de contraste entre temas — 11 de noviembre de 2026

Se corrigió la herencia de color predeterminado en el tema global. `PrismaTheme.kt` proporciona ahora `LocalContentColor` desde `colorScheme.onBackground`, y Historial/Pendientes explicitan `onSurface` en el título de pantalla y en los títulos de película. La corrección conserva las paletas aprobadas de Obsidiana y Cuarzo; no altera sus valores cromáticos. El test `defaultTextColorFollowsPrismaThemeForBothModes` pasó en Android API 26 y API 37 durante CI #198. No se ha instalado el APK en el dispositivo físico, por lo que esta validación automatizada no sustituye la inspección visual en el Galaxy A03.

### Estados vacíos y búsquedas sin coincidencias — aprobados e implementados

El propietario aprobó las cuatro propuestas el 11 de noviembre de 2026:

- [Historial · Obsidiana](CONCEPTOS_FASE2/prisma-fase2-historial-estados-obsidiana.svg) y [Historial · Cuarzo](CONCEPTOS_FASE2/prisma-fase2-historial-estados-cuarzo.svg).
- [Pendientes · Obsidiana](CONCEPTOS_FASE2/prisma-fase2-pendientes-estados-obsidiana.svg) y [Pendientes · Cuarzo](CONCEPTOS_FASE2/prisma-fase2-pendientes-estados-cuarzo.svg).

La aprobación incluye composición y textos: estado vacío con prisma lineal y mensaje específico; estado de búsqueda sin coincidencias con lupa discreta, consulta preservada y orientación neutral. No se añaden controles ni acciones. Las siluetas de los iconos son provisionales y quedan bajo autoría/diseño final del propietario; consultar `ICONOGRAFIA/README.md`.

**Implementación:** commit `137187d3c62687cf3feba67f8ab423cb89a7ec34`, validado en CI #199. Se reutilizan `PrismaEmptyPrism` (96 dp) y `PrismaIconKind.SEARCH`. Los estados reciben colores desde el tema, conservando la paridad Obsidiana/Cuarzo.

## Decisiones de concepto pendientes de aprobación

- Para la **experiencia completa de Personal posterior al MVP** se conserva el **concepto A**: una pantalla principal con cinco accesos. La distribución conceptual es una cuadrícula de dos columnas para Historial, Pendientes, Ocultos y Estadísticas, más Gestionar listas en una fila de ancho completo. Este concepto futuro no define la estructura del MVP; el diseño completo sigue pendiente de aprobación y no debe implementarse antes de su fase objetivo.

## Registro de aprobaciones visuales

El registro distingue entre decisiones de componente ya aprobadas, conceptos parciales y pantallas completas pendientes. «Aprobado» no significa que la pantalla completa pueda implementarse si todavía falta su composición final o su adaptación al alcance del MVP.

| Elemento | Estado | Fase y estado de implementación |
|---|---|---|
| Sistema de diseño | Parcialmente aprobado: tipografía, roles cromáticos, espaciado e iconografía tienen reglas aprobadas; faltan estados, componentes y documentación de aplicación completa | Por definir |
| Geometría general | Radio base de 14 px para las superficies generales de Obsidiana y Cuarzo; se conservan los radios particulares ya aprobados | Por definir |
| Espaciado global | Unidad modular de 4 px y escala de referencia compartida; se conservan los espaciados particulares ya aprobados | Aprobado |
| Iconografía global | Estilo lineal, minimalista, esencial e híbrido; ajuste óptico del espacio de dibujo; tamaño de referencia de 24 × 24 dp, grosor de 1,75 dp y terminaciones y uniones redondeadas para iconos nuevos; se conservan las reglas y geometrías propias de componentes existentes | Aprobado |
| Familia tipográfica global | Inter; pesos 400, 500 y 600; texto normal 16/24 px, peso 400, letter spacing 0 px; texto secundario 14/20 px, peso 400, letter spacing 0 px; texto auxiliar 12/18 px, peso 400, letter spacing 0 px; títulos de sección 22/28 px, peso 500, letter spacing 0 px; escala actual suficiente por ahora; ampliable si surge una necesidad concreta | Aprobado |
| Temas de apariencia | Nombres aprobados: Obsidiana (oscuro) y Cuarzo (claro); Obsidiana: fondo principal global aprobado `#171A20`, superficie elevada global aprobada `#242A35` (RGB 36, 42, 53), con contorno global `#353535` de 1 px cuando no haya una regla particular de componente, y acento global aprobado `#70AEE0` (RGB 112, 174, 224), con `#5B9BD5` conservado como referencia anterior y en componentes con reglas particulares ya aprobadas; textos globales principal `#F0F0F0`, secundario `#BDBDBD` y auxiliar `#9B9B9B`, iconos inactivos globales `#BDBDBD` (excepto Personal `#D0D0D0`), contenido de controles deshabilitados `#888888`, superficie deshabilitada `#1D222B`, superficie transitoria de pulsación `#2B303A` sobre `#242A35`, contorno de controles deshabilitados sin línea visible (opción A aprobada), sin opacidad adicional (100 %, opción A aprobada), sin sombra global en superficies elevadas generales (alternativa A aprobada; se conservan sombras específicas de componentes), separadores internos `#353535` de 1 px, con 8 px por encima y 8 px por debajo del contenido adyacente (alternativa A aprobada); Cuarzo: fondo `#F4F1EA`, superficies `#FFFFFF`, contorno `#DDD8CE` de 1 px, texto principal `#292B2F`, secundario `#68655F`, auxiliar `#706C64`, acento `#356F9F`, neutro de iconos inactivos `#8A857B`, contenido de controles deshabilitados (texto e iconos) `#9D998F`, superficie deshabilitada `#F0EDE6`, separadores internos `#E8E3DA` de 1 px, con 8 px por encima y 8 px por debajo del contenido adyacente (alternativa A aprobada), y superficie de pulsación `#ECE7DE` aprobados; contorno de controles deshabilitados sin línea visible (opción A) aprobado; sin opacidad adicional (100 %, opción A aprobada), grosor de separadores de 1 px y separación de 8 px por encima y 8 px por debajo aprobados en ambos temas, otros neutros, otros bordes y otros estados pendientes | Paletas principales aprobadas; Obsidiana como tema inicial, cambio manual entre Obsidiana y Cuarzo desde Ajustes y persistencia local aprobados. Selector aprobado para Ajustes → Apariencia: control segmentado con «Obsidiana» y «Cuarzo», cambio inmediato y preferencia persistida localmente mediante DataStore. |
| Pantalla Descubrir | Dirección conceptual seleccionada: Concepto A — Continuidad silenciosa; avisos integrados y discretos. Composición MVP aprobada: barra única con lupa, «Buscar...», engranaje de Ajustes; lista continua sin bloques por procedencia y etiqueta secundaria «En tu Prisma» para películas guardadas. Sin Feed ni filtros. Altura de barra 52 dp, radio 14 dp, 16 dp entre barra y primera fila cuando no hay aviso y 12 dp a cada lado de un aviso intermedio. La separación nominal entre filas de 12 px se implementa como 12 dp según la regla compartida de unidades. Estado inicial aprobado con «Busca una película» y «AÑADIR PELÍCULA MANUALMENTE»; ilustraciones, ubicación exacta del aviso de token, composición final de estados y pantalla completa pendientes; las unidades de las filas ya están resueltas según la regla compartida | Fase 1, sujeto a especificación |
| Navegación Personal/Descubrir | Estructura y propiedades principales de la píldora aprobadas; composición visual completa y estados restantes pendientes de especificación | Fase 1 |
| Personal: pantalla principal | Composición MVP aprobada: cuatro filas horizontales uniformes en una columna vertical (Historial, Pendientes, Ocultos y Gestionar listas), cada una con icono a la izquierda, nombre y descripción breve en el centro y chevron a la derecha. Composición funcional aprobada; dimensiones, acabado visual y estados pendientes de definición | Fase 1 |
| Personal: Historial | Composición principal aprobada el 11-11-2026 y validada en CI #197: encabezado, búsqueda local, contador, lista continua, póster provisional 56 × 84, título 14/500, año 12/400, contador de visionados y fecha del último. Obsidiana/Cuarzo mantienen la misma jerarquía. Estados vacíos y coincidencias cero aprobados e implementados; validados en CI #199. Concepto A de ficha local aprobado en ambos temas el 11-11-2026; integración desde las filas en curso | Fase 2 · F2-H2 en desarrollo |
| Personal: Pendientes | Composición principal aprobada el 11-11-2026 y validada en CI #197: encabezado, búsqueda local, contador, lista continua, póster provisional 56 × 84, título 14/500, año 12/400, fecha de incorporación y orden más reciente primero. Obsidiana/Cuarzo mantienen la misma jerarquía. Estados vacíos y coincidencias cero aprobados e implementados; validados en CI #199. Concepto A de ficha local aprobado en ambos temas el 11-11-2026; apertura y retirada confirmada desde ficha en curso | Fase 2 · F2-H2 en desarrollo |
| Personal: Ocultos | Símbolo aprobado: ojo lineal tachado para representar películas ocultas; el resto del concepto visual de la tarjeta y de la pantalla continúa pendiente | Por definir |
| Personal: Estadísticas (posterior al MVP) | Símbolo aprobado: tres barras verticales lineales ascendentes; acceso y composición visual pendientes de la fase correspondiente | Fase 7, sujeto a especificación |
| Personal: Gestionar listas | MVP: fila horizontal uniforme dentro de la columna de cuatro accesos, con icono a la izquierda, nombre y descripción breve en el centro y chevron a la derecha. La gestión avanzada conserva el símbolo aprobado y los conceptos de tarjeta/colección descritos en requisitos; acabado final pendiente | Fase 1, sujeto a especificación |
| Ficha cinematográfica | Dirección visual cinematográfica ya definida en Requisitos; el hito local F2-H2 (históricamente etiquetado 0.4.0) quedó aprobado como Concepto A en Obsidiana/Cuarzo el 11-11-2026. Las ampliaciones conservan su fase objetivo | Fase 2 · F2-H2 para ficha local; extensiones en las fases/hitos correspondientes |
| Ajustes | Requisitos funcionales; diseño visual pendiente | Por definir |

Las composiciones principales ya aprobadas pueden implementarse. No deben implementarse estados visuales o interacciones cuyo concepto o flujo siga pendiente de decisión.


## Sistema de iconografía final — aprobación e integración · 11 de noviembre de 2026

- El propietario seleccionó las opciones A para Personal, Descubrir, Historial, Pendientes, Ocultos, Gestionar listas, Chevron derecho, Buscar, Ajustes y Volver; para Prisma vacío eligió B (diamante facetado).
- Se refinaron los once vectores y se aprobaron para integración. Los glifos se mantienen monocromáticos, con `currentColor` en sus maestros SVG y tinte dinámico desde el tema; no se crean variantes cromáticas separadas para Obsidiana y Cuarzo.
- **Corrección explícita de Ajustes:** el engranaje es de seis dientes. La lámina conceptual inicial que mostraba ocho dientes fue corregida; el SVG final y Compose usan la misma geometría de seis.
- `PrismaIcon.kt` integra los diez glifos con las proporciones refinadas. `PrismaEmptyPrism.kt` sustituye la figura pentagonal por el diamante facetado B, conservando los 96 dp y los roles cromáticos del tema.
- Los maestros SVG individuales se guardan en `docs/DISENO/ICONOGRAFIA/VECTORES_APROBADOS/`. No se modifica el icono lanzador, que continúa pendiente como activo de marca independiente.
- Alcance: solo formas ya presentes en las pantallas y la ilustración de vacío. No se crean iconos para acciones futuras ni se modifican comportamientos, destinos o controles.
- No se instala el APK en el Galaxy A03 ni se modifica `main`.


 
#### Contraste de texto y herencia de color en Compose

- El contenido textual principal utiliza `MaterialTheme.colorScheme.onSurface`; el contenido secundario utiliza `onSurfaceVariant`. En Obsidiana, los roles principales y secundarios conservan los tonos aprobados `#F0F0F0` y `#BDBDBD`; en Cuarzo se mantienen los valores de su esquema, sin introducir colores fijos de Obsidiana.
- `PrismaTheme` expone `LocalContentColor` con el rol `onSurface`, de modo que los componentes Compose que no declaren un color propio hereden el primer plano correcto por defecto.
- Los títulos de Personal y los mensajes principales de Descubrir declaran `onSurface` explícitamente. Los encabezados de Historial/Pendientes y sus metadatos ya utilizan `onSurface`/`onSurfaceVariant`.
- No se debe introducir `Color.Black` ni colores de texto fijos en componentes compartidos: las excepciones cromáticas pertenecen al esquema o a la especificación particular aprobada del componente.
- Estos ajustes no alteran la paleta ni las decisiones visuales de Obsidiana o Cuarzo; hacen explícita la semántica de los roles de texto ya existentes.

 
#### Validación instrumentada del contraste — CI #202 · 11 de noviembre de 2026

- Run `43070303943`, commit `85783237d32b2d7819c87d842444c31038c851b3`: **SUCCESS** en los cuatro trabajos.
- La prueba basada en captura de píxeles confirmó `#F0F0F0` para texto principal de Obsidiana y `#292B2F` para Cuarzo en Descubrir, la fila «Historial» de Personal y el encabezado de Historial. Pasó en API 26 y API 37.
- API 26: 48 pruebas instrumentadas, 0 fallos, 0 errores y 1 omisión esperada por ausencia de TLS 1.3 en Android 8. API 37: 48/48. Ventana amplia API 37: 2/2, incluyendo Obsidiana y Cuarzo.
- La búsqueda en los componentes y recursos inspeccionados no encontró colores de texto negros fijados. En el código anterior, `onBackground` y `onSurface` tenían valores idénticos en ambos temas; la fila «Historial» ya heredaba `onSurface` desde su `Surface`. El cambio refuerza el uso semántico de `onSurface` y hace explícitos los colores de los textos principales. No demuestra por sí solo la causa del síntoma observado en el APK original, que no se reprodujo como discrepancia de paleta en las pruebas.
- BackupManager comprobó exclusión de los datos de Prisma y ausencia de marcadores sintéticos tras reinstalar. El control positivo D2D restauró únicamente el marcador del paquete auxiliar; no hubo payload de Prisma ni una restauración real de datos Prisma.


## Ficha local mínima F2-H2 — Concepto A aprobado (registro histórico 0.4.0) · 11 de noviembre de 2026

El propietario aprobó el Concepto A — resumen primero, en Obsidiana y Cuarzo. La propuesta se refinó tomando como base la dirección de ficha cinematográfica que ya estaba definida en la sección «Ficha de película» y en `docs/PRODUCTO/REQUISITOS.md`. Esta decisión concreta la primera entrega local; no sustituye ni reinicia el diseño anterior de Prisma.

Referencias vectoriales manuales aprobadas:

- [A · Obsidiana](CONCEPTOS_FASE2/prisma-ficha-local-a-obsidiana.svg).
- [A · Cuarzo](CONCEPTOS_FASE2/prisma-ficha-local-a-cuarzo.svg).

La ficha conserva la cabecera horizontal a todo lo ancho, el degradado inferior, el título blanco sobre la cabecera, el control circular semitransparente de regreso y la claqueta gris sobre fondo gris oscuro cuando no existe una imagen disponible. No se muestra menú de tres puntos en F2-H2 porque no hay una acción de esa categoría habilitada en este incremento.

Refinamientos acordados:

- El título y el año se presentan una sola vez. No se duplica el año debajo de la cabecera.
- Primero aparece el resumen del diario: estado de Historial cuando existen visionados, contador y fecha/hora más reciente disponible.
- La acción primaria cambia según el estado: «AGREGAR A HISTORIAL» sin visionados y «REGISTRAR OTRO VISIONADO» cuando ya hay registros. Cada acción crea un registro independiente.
- «AGREGAR A PENDIENTES» permanece como acción secundaria mientras la película no pertenezca a Pendientes. La retirada se ofrece desde la ficha, requiere confirmación y elimina solo esa pertenencia.
- Los visionados se muestran en filas abiertas y separadas, del más reciente al más antiguo. Se muestra la hora solo si existe; en caso contrario, «Hora no registrada».
- Obsidiana y Cuarzo tienen la misma estructura, orden, medidas y jerarquía. Solo varían los roles de color según las paletas aprobadas. La cabecera de claqueta conserva su tratamiento cinematográfico oscuro en ambos temas.
- No hay póster remoto, fecha de estreno, país, duración, géneros, sinopsis ni puntuaciones inventadas. Los ejemplos de los vectores son ficticios.

Los diálogos de registro y retirada se mantienen como componentes de la interacción F2-H2. El registro ofrece únicamente «Ahora» y «Seleccionar fecha»; la selección manual puede guardar fecha y hora o solo la fecha si se desconoce la hora. «Día de estreno» y «Ajustar al inicio» no se muestran hasta disponer de los datos verificados correspondientes en F3-H2.

La alternativa B se conserva como material histórico no seleccionado; no se implementará ni reabre la elección. La aprobación de A habilita la integración en Compose, pero no autoriza funciones de F2-H3 o posteriores.
