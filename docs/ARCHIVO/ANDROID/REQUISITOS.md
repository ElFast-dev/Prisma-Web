# Requisitos del producto — Prisma

**Estado:** borrador vivo de descubrimiento.  
**Revisión:** 0.3.8.  
**Última actualización:** 9 de noviembre de 2026.
**Propietario y aprobador del producto:** ElFast-dev.  
**Alcance:** decisiones expresadas y confirmadas en la conversación; no equivale a aprobar una fase de implementación.

## 1. Visión

Prisma es un espacio cinematográfico personal y privado para registrar la vida del usuario como espectador. Debe recordar qué películas ha visto y cuántas veces, conservar las fechas y calificaciones de cada visionado, ayudar a decidir qué ver y mostrar cómo evolucionan sus gustos.

No debe sentirse como otro catálogo ni como una red social. Debe ser cinematográfico, ordenado, honesto, libre de spoilers cuando el usuario active esa protección y útil sin conexión.

El algoritmo personal de recomendaciones se llama **Espectro**. Aprende de forma automática a partir de las acciones del usuario y funciona localmente.

## 2. Público, plataforma y alcance

- Aplicación nativa para Android.
- Un espacio personal por instalación, sin cuenta obligatoria de Prisma.
- El alcance inicial incluye **películas exclusivamente**.
- Series y episodios quedan fuera del alcance de la versión 1.0.0.
- Prisma se desarrolla para uso personal exclusivo del propietario y no se comercializa. El repositorio de código puede mantenerse público, pero la distribución de la aplicación a terceros no es un objetivo del producto.
- Cada instalación conserva sus datos localmente. El traslado a otro teléfono se hace mediante copia cifrada manual, no por sincronización de nube.

## 3. Principios de producto y privacidad

1. La base local del teléfono es la fuente principal de los datos personales.
2. El historial, las fechas de visionado, las puntuaciones, las listas, las estadísticas y el perfil de aprendizaje de Espectro no salen del dispositivo.
3. Prisma no requiere una cuenta propia ni un backend propio.
4. Las búsquedas y solicitudes de metadatos a TMDB necesitan conexión y transmiten a TMDB la consulta o los identificadores solicitados. Esto no autoriza a enviar el historial personal.
5. No se inventan datos ausentes. Si falta una duración, no se muestra «-1 min». Si faltan puntuaciones, se utiliza el indicador visual previsto. Si no hay proveedores, reparto, tráiler o enlaces válidos, no se finge que existen.
6. La información remota se guarda localmente para que lo ya descargado siga disponible sin conexión.
7. **Sin copia automática del sistema:** Prisma no participa en Android Auto Backup, copias de nube del sistema ni transferencias automáticas entre dispositivos. La única copia de seguridad portable gestionada por el usuario es la exportación cifrada manual iniciada desde la propia aplicación.
8. La falta de conexión o una caída temporal de TMDB no debe impedir consultar o modificar el diario personal.
9. No se añaden funciones, SDK, anuncios, analítica o servicios externos por iniciativa propia sin acordarlo con el propietario.
10. **Dirección de diseño y coherencia transversal:** Prisma debe ser minimalista, limpio y elegante. Cada decisión visual debe responder a una finalidad lógica y útil; la presentación, la lógica del producto, los comportamientos de interacción, la privacidad y las decisiones técnicas deben reforzarse mutuamente. Se evitarán adornos, duplicaciones y complejidad que no aporten valor. Ningún elemento se define de forma aislada ni puede aparentar una función, un estado o una capacidad que el producto no respalde.
11. **Equivalencia entre temas:** Obsidiana y Cuarzo son temas de primera clase y deben mantenerse a la par en prioridad, cobertura funcional y calidad visual. Ninguno es secundario ni debe recibir menos cuidado. Todos los componentes, estados y flujos deben contemplarse en ambos temas; sus colores y tratamientos pueden diferir cuando sea necesario para respetar el contraste, la legibilidad y la identidad propia de cada uno.
12. **Regla del Porqué:** cada función, componente, interacción, decisión visual, dependencia, proceso o cambio de Prisma debe responder a una necesidad concreta del producto o del usuario. Se debe explicar qué problema resuelve, qué beneficio aporta y por qué es preferible a las alternativas relevantes. Si no tiene una justificación clara, no se incorpora. El propietario puede preguntar «¿Por qué?» en cualquier momento y recibirá una explicación concreta de la razón, los beneficios, los límites y las consecuencias de lo propuesto o realizado.
13. **Nomenclatura global coherente:** un mismo concepto debe conservar el mismo nombre en todas las secciones, pantallas, filtros, botones, mensajes y ajustes. No se usan sinónimos distintos para una misma función. Se respetan los nombres propios aprobados —por ejemplo, Espectro, Obsidiana y Cuarzo— y los nombres funcionales acordados. Si dos conceptos son distintos, se nombran de forma explícita (por ejemplo, «Año de estreno» frente a «Fecha de estreno»).

### 3.1 Identidad tipográfica global

- Familia tipográfica global seleccionada: **Inter**. Esta es la familia de referencia para la interfaz de Prisma.
- Pesos globales aprobados para la familia Inter: **regular (400), medio (500) y seminegrita (600)**. Estos son los únicos pesos previstos para la identidad tipográfica global. En la escala actual, los títulos de sección utilizan **medio (500)** y el texto normal, secundario y auxiliar utiliza **regular (400)**.
- Tamaño de referencia para el texto normal de lectura continua: **16 px** (opción B aprobada). Este valor sirve como base de la escala tipográfica global; no reemplaza los tamaños específicos ya definidos para títulos, años, contadores, navegación ni otros componentes. El peso tipográfico de referencia para este texto normal es **regular (400)** (opción A aprobada). La altura de línea queda fijada en **24 px** (opción B aprobada), equivalente a 1,5 veces el tamaño de fuente. El espaciado entre caracteres (*letter spacing*) queda fijado en **0 px adicionales** (opción A aprobada), conservando el espaciado natural de Inter.
- Tamaño de referencia para el texto secundario: **14 px** (opción A aprobada). Sirve como segundo nivel general de la jerarquía tipográfica y no reemplaza tamaños específicos ya definidos para componentes, como los años y contadores de 12 px o los textos de 14 px con reglas propias. La altura de línea de referencia para este texto secundario queda fijada en **20 px** (opción B aprobada). El peso tipográfico de referencia para este texto secundario es **regular (400)** (opción A aprobada). El espaciado entre caracteres (*letter spacing*) queda fijado en **0 px adicionales** (opción A aprobada), conservando el espaciado natural de Inter. Esta referencia no modifica las reglas tipográficas específicas de otros componentes.
- Tamaño de referencia para el texto auxiliar: **12 px** (opción A aprobada). Es un tercer nivel general para información breve, etiquetas y metadatos; se distingue del texto secundario de 14 px y no sustituye los tamaños específicos ya definidos para componentes, incluidos los contadores, años u otros textos de 12 px con reglas propias. La altura de línea queda fijada en **18 px** (opción B aprobada). Su peso queda fijado en **regular (400)** (opción A aprobada). El espaciado entre caracteres (*letter spacing*) queda fijado en **0 px adicionales** (opción A aprobada), conservando el espaciado natural de Inter.
- Tamaño de referencia para títulos de sección: **22 px** (opción B aprobada). Se aplica a encabezados generales de secciones y pantallas, como «Historial» o «Estadísticas». No sustituye tamaños ya definidos para títulos de películas ni otros encabezados o componentes con especificación propia. La altura de línea de referencia para estos títulos de sección queda fijada en **28 px** (opción B aprobada) y su peso tipográfico es **medio (500)** (opción A aprobada). El espaciado entre caracteres (*letter spacing*) queda fijado en **0 px adicionales** (opción A aprobada), conservando el espaciado natural de Inter. Esta referencia no modifica las reglas tipográficas específicas de otros encabezados o componentes.
- Por ahora, los cuatro niveles anteriores constituyen la escala tipográfica global de referencia y se consideran suficientes para las necesidades generales identificadas. No se incorporan niveles adicionales en esta etapa; la escala podrá ampliarse si una necesidad concreta del producto lo justifica.
- Las especificaciones tipográficas particulares ya aprobadas para componentes y pantallas —incluidos los tamaños, pesos y colores del buscador y de Personal— se conservan sin cambios. Elegir Inter no reabre ni modifica esas decisiones.

### 3.2 Interpretación de unidades de diseño en Android

Las medidas expresadas como `px` en este documento son valores numéricos nominales del sistema de diseño, no píxeles físicos de pantalla. En la implementación Android se conserva el mismo valor numérico y se asigna `dp` a dimensiones, márgenes, rellenos, separaciones, radios, contornos y grosores de trazo; `sp` a tamaños tipográficos, alturas de línea y espaciado entre caracteres. La equivalencia y sus reglas técnicas se detallan en `docs/TECNICO/DISENO_TECNICO.md`, sección 2.1.

## 4. Navegación principal

Al abrir Prisma, la sección predeterminada es **Descubrir**.

La navegación principal es una píldora flotante, separada de los bordes inferiores de la pantalla, con dos secciones:

- **Personal**
- **Descubrir**

- Altura de la píldora flotante inferior: **64 px**.
- Ancho de la píldora flotante inferior: **240 px** (concepto A, formato compacto).
- Distribución horizontal de Personal y Descubrir dentro de la píldora: **concepto A seleccionado**, dos espacios iguales de **120 px** cada uno; cada sección centra su conjunto de icono y nombre dentro de su mitad.
- Forma exterior de la píldora flotante inferior: **concepto A seleccionado**, cápsula completa con radio de **32 px**.
- Grosor del contorno exterior de la cápsula de navegación inferior: **1 px**, color **`#353535`**.
- Tratamiento visual de la píldora inferior: **concepto B seleccionado**. La píldora exterior mantiene la superficie **`#222222`** y un contorno de **1 px** en color **`#353535`**; la sección activa se distingue únicamente mediante el icono y el texto en azul de acento **`#5B9BD5`**, directamente sobre la superficie común, sin una cápsula ni un fondo adicional. La sección inactiva utiliza icono y texto en gris **`#BDBDBD`**.
- Disposición de cada elemento de la navegación inferior: **concepto B seleccionado**, con el icono encima del nombre y ambos centrados horizontalmente en su elemento. Esta elección define la disposición interna, sin aprobar todavía el diseño completo de la navegación.
- Respuesta visual al pulsar una sección de la navegación inferior: **opción B seleccionada**. El conjunto formado por el icono y el nombre se comprime sutilmente hasta una escala de **0,96** mientras se mantiene la pulsación y recupera su escala normal (**1,0**) al soltar. Duración: **100 ms para la compresión** y **160 ms para la recuperación**. No se añade fondo, cápsula interior ni cambio de color distinto al estado activo ya definido. Curvas de aceleración: **ease-out para la compresión y ease-out para la recuperación**.
- Tamaño de los nombres «Personal» y «Descubrir» en la navegación inferior: **12 px** en ambas secciones.
- Separación vertical entre el icono y el nombre de cada sección de la navegación inferior: **4 px**.
- Cambio entre secciones de la navegación inferior: **opción B seleccionada, transición cromática suave**. Al cambiar de Personal a Descubrir o viceversa, el color de estado activo `#5B9BD5` pasa gradualmente a la nueva sección, mientras la sección anterior recupera el color inactivo `#BDBDBD`. Los iconos y nombres no se desplazan ni cambian de posición. Duración de la transición cromática: **200 ms**. Curva de aceleración seleccionada: **`ease-in-out`**, con inicio y final suaves. Curva Bézier exacta: `cubic-bezier(0.42, 0, 0.58, 1)`.
- Peso tipográfico en la navegación inferior: sección activa **medio (500)**; sección inactiva **regular (400)**.
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


### 4.1 Personal

#### MVP (estructura funcional aprobada)

Al pulsar Personal, se abre una pantalla principal (centro de navegación) con los accesos disponibles en la versión instalada. No entra directamente a Historial. La pantalla principal del MVP muestra exactamente cuatro accesos en una columna vertical: Historial, Pendientes, Ocultos y Gestionar listas. Cada acceso es una fila horizontal uniforme con un icono a la izquierda, nombre y descripción breve en el centro y chevron a la derecha. No aparece Estadísticas, un acceso deshabilitado ni un espacio vacío artificial. Esta aprobación fija la cantidad, el orden y la estructura de los accesos; las descripciones concretas, dimensiones, acabado visual y estados se concretarán en la especificación de la Fase 1.

#### Experiencia completa (posterior al MVP)

La experiencia completa de Prisma conservará cinco accesos al incorporar Estadísticas. Las especificaciones de las cuatro tarjetas cuadradas en cuadrícula y el acceso independiente de «Gestionar listas» que siguen describen exclusivamente esa experiencia completa; no se trasladan al MVP.
- El contenido principal de Personal mantiene un **margen lateral exterior de 16 px** a izquierda y derecha entre los bordes de la pantalla y los accesos; aplica tanto a la cuadrícula de tarjetas como a la fila «Gestionar listas».
- Margen superior de Personal: **16 px** desde el final del área segura superior hasta la primera fila de tarjetas.
- Las cuatro tarjetas principales de Personal tienen proporción **cuadrada 1:1**.
- Las cuatro tarjetas principales utilizan iconos grandes y un tratamiento minimalista; no usan collages de pósteres en esta pantalla.
- Los iconos de las cuatro tarjetas de Personal utilizan el concepto A: tamaño de referencia de **32 px**, grande y equilibrado; se descarta la alternativa extra grande de 40 px.
- **Grosor de trazo de los cinco iconos de Personal:** **1,75 dp**, por aplicación de la referencia global aprobada al no existir un grosor numérico particular distinto para estos símbolos. La navegación inferior conserva su excepción particular de **1,4 dp**.
- **En Obsidiana**, los iconos inactivos de las cuatro tarjetas de Personal utilizan **`#D0D0D0`**, uniforme y monocromático. Cuando están activos, utilizan el color particular aprobado **`#5B9BD5`**, conservado como excepción para este componente. En Cuarzo se aplica la adaptación cromática específica descrita más abajo.
- **En Obsidiana**, las cuatro tarjetas utilizan la superficie particular **`#222222`** con un contorno fino de **1 px**; esta decisión sustituye el fondo transparente acordado previamente. En Cuarzo utilizan la superficie y el contorno especificados en su adaptación cromática.
- El contorno de las cuatro tarjetas tiene un grosor de **1 px**, delicado y discreto.
- Color del contorno de las cuatro tarjetas de Personal: **`#353535`**, una línea sutil que mantiene la separación respecto del fondo y la superficie.
- La pantalla no repite un encabezado de marca o sección como «PRISMA» o «Personal», ni utiliza un subtítulo o eslogan como «Tu historia como espectador». La navegación inferior ya comunica la sección activa; el contenido comienza directamente con los accesos.
- Las tarjetas de Historial, Pendientes y Ocultos muestran discretamente la cantidad de películas que contienen. Historial cuenta películas únicas, no el número total de visionados.
- «Gestionar listas» muestra la cantidad de listas personalizadas.
- La separación vertical entre la segunda fila de tarjetas (Ocultos y Estadísticas) y el acceso horizontal «Gestionar listas» es de **12 px**.
- Presentación de «Gestionar listas»: acceso horizontal de ancho completo con un icono de **20 px**, con **12 px de separación horizontal respecto al nombre**, y un **chevron fino y discreto de 16 px** alineado al extremo derecho. El nombre utiliza **14 px**, peso **medio (500)**. La fila tiene **60 px** de altura, margen interior horizontal de **16 px**, y separación de **12 px** entre contador y chevron; el contador utiliza peso **regular (400)**. El icono, el nombre, el contador y el chevron quedan centrados verticalmente. **En Obsidiana**, el icono utiliza `#D0D0D0`, el chevron `#888888`, el nombre `#F0F0F0`, la superficie `#222222` y el contorno `#353535` de 1 px. Su estado de pulsación particular utiliza `#2B2B2B` y contorno `#454545` de 1 px, sin acento azul. En Cuarzo se aplica la adaptación cromática específica descrita más abajo; las dimensiones y la disposición de la fila se mantienen.
- **Adaptación cromática de Personal en Cuarzo (aprobada):** las cuatro tarjetas y la fila «Gestionar listas» utilizan superficies `#FFFFFF` y contornos `#DDD8CE` de 1 px. Los cinco iconos inactivos utilizan `#8A857B`. Los nombres de las cuatro tarjetas y de «Gestionar listas» utilizan el texto principal `#292B2F`. Los contadores de Historial, Pendientes, Ocultos y Gestionar listas, así como el chevron de la fila, utilizan el texto auxiliar `#706C64`.
- En Cuarzo, los iconos activos utilizan el acento global aprobado `#356F9F`; las superficies blancas interactivas aplican la respuesta global de pulsación `#ECE7DE`. Estas reglas no alteran la variante específica de Obsidiana ni los tamaños, la tipografía, la estructura y las dimensiones ya aprobadas de Personal.
- **Respuesta de pulsación de las cuatro tarjetas de Personal (opción A aprobada):** iluminación sutil, sin compresión ni transformación de escala. En Obsidiana, la superficie de la tarjeta cambia transitoriamente de `#222222` a `#2B2B2B`; en Cuarzo, cambia de `#FFFFFF` a `#ECE7DE`. El contorno, su color y grosor, el radio, la posición y el tamaño de los iconos y nombres, y la disposición interna permanecen sin cambios. Al terminar la pulsación, la superficie recupera el color normal del tema. Se utilizan los tiempos y la curva globales aprobados: **100 ms al pulsar y 160 ms al soltar**, con `cubic-bezier(0, 0, 0.2, 1)` en ambas fases. Este estado corresponde únicamente a las cuatro tarjetas; «Gestionar listas» conserva su respuesta particular documentada.
- Estadísticas no necesita un contador de elementos en esta pantalla.
- Los nombres de las cuatro tarjetas de Personal utilizan 16 px, peso medio (500) y una altura de línea de 20 px (opción A aprobada). Esta es una especificación particular de esos nombres y no modifica la escala tipográfica global ni las demás medidas de las tarjetas.
- **En Obsidiana**, los nombres de las cuatro tarjetas de Personal utilizan **`#F0F0F0`** (blanco suave), según el concepto A seleccionado. Este valor se limita a esos nombres y no define por sí solo todos los colores de texto de la aplicación; Cuarzo utiliza el texto principal `#292B2F`.
- Los nombres de las cuatro tarjetas de Personal se alinean a la izquierda, siguiendo el margen interior de la tarjeta.
- La separación vertical entre el icono y el nombre de cada tarjeta es de **20 px**.
- Estilo de los contadores: **A, número integrado sin fondo ni cápsula**, con tipografía discreta y alineación en la esquina superior derecha.
- **En Obsidiana**, los contadores de Historial, Pendientes, Ocultos y Gestionar listas utilizan **`#D0D0D0`** (gris claro). En Cuarzo utilizan el texto auxiliar `#706C64`.
- Tamaño de los contadores de las tarjetas de Personal: **12 px** (concepto A aprobado).

#### Funciones y disponibilidad de las subsecciones

- **Historial (MVP):** películas vistas.
- **Pendientes (MVP):** películas que el usuario quiere ver.
- **Ocultos (MVP):** películas ocultadas deliberadamente.
- **Gestionar listas (MVP):** sección independiente para crear y administrar listas cinematográficas personalizadas. No es una forma de gestionar Historial o Pendientes; estas listas principales siguen siendo independientes.
- **Estadísticas (posterior al MVP):** evolución y análisis de gustos.

### 4.2 Descubrir

**Composición de Descubrir para el MVP (aprobada, concepto A):** una sola barra de búsqueda en la parte superior, con icono de lupa a la izquierda, el texto indicativo «Buscar película...» y un engranaje de Ajustes a la derecha. No se muestra el icono de Filtros. Debajo aparece **una única lista continua de resultados**, sin encabezados, pestañas, bloques ni separación visual por origen. Los resultados locales aparecen inmediatamente; los resultados remotos de TMDB se incorporan dinámicamente a esa misma lista cuando la conexión y un token verificado lo permiten. Cada fila utiliza póster, título y año. Solo las películas ya guardadas muestran la indicación secundaria «En tu Prisma» junto al año; los resultados remotos nuevos no llevan una etiqueta de sección ni una etiqueta de fuente. La lista combinada se ordena por relevancia de la consulta; en caso de empate, se prioriza la película ya guardada. Si una película local ya está vinculada al mismo identificador TMDB que un resultado remoto, se conserva una sola fila local y no aparece duplicada. Mientras TMDB busca, se muestra un indicador discreto integrado dentro de la propia barra de búsqueda, sin abrir un panel ni separar los resultados. Si la consulta cambia, una respuesta remota de la consulta anterior no debe mezclarse con la nueva. El engranaje abre Ajustes para configurar TMDB y otras preferencias disponibles. No hay Feed, paginación infinita ni filtros avanzados en el MVP.

Cuando se abre Descubrir sin consulta, se muestra un estado inicial con una ilustración sencilla, el mensaje «Busca una película» y la acción «AÑADIR PELÍCULA MANUALMENTE». Esta acción reutiliza el alta manual existente y funciona sin conexión.

**Estado de búsqueda en curso aprobado:** los resultados locales aparecen inmediatamente y permanecen visibles. Mientras TMDB busca, aparece un indicador giratorio discreto dentro de la barra, a su derecha; no se muestra una pantalla completa ni un mensaje de carga separado. El teclado permanece abierto mientras el usuario escribe. Al terminar la búsqueda remota, el indicador desaparece. Si cambia la consulta, las respuestas que pertenezcan a consultas anteriores se ignoran y nunca se mezclan con los resultados vigentes.

**Estado sin resultados aprobado:** cuando termina la búsqueda local y, si está disponible, la consulta remota de TMDB, y ninguna fuente devuelve coincidencias, se muestra el mensaje «No encontramos películas», el texto auxiliar «Prueba con otro título.» y la acción «AÑADIR PELÍCULA MANUALMENTE». Se conserva la consulta para que el usuario pueda corregirla. El mensaje solo se usa cuando todas las fuentes disponibles han terminado; no se afirma que no existan resultados remotos si TMDB no pudo consultarse por falta de conexión o token. La acción manual reutiliza el alta existente y funciona sin conexión.

**Error durante consulta remota aprobado:** si TMDB no puede completar una búsqueda, la lista unificada se conserva y los resultados locales no se eliminan ni se reemplazan por una pantalla de error. Si hay resultados locales, se muestra discretamente debajo de ellos «No se pudo consultar TMDB», el texto «No pudimos completar la búsqueda remota.» y la acción «REINTENTAR», sin crear una sección de resultados independiente. Si no hay resultados locales, se muestra un estado de error diferenciado del estado sin resultados, con una ilustración sencilla, «No se pudo consultar TMDB», «No pudimos completar la búsqueda. Inténtalo de nuevo.», la acción «REINTENTAR» y «AÑADIR PELÍCULA MANUALMENTE». En ambos casos la consulta permanece en la barra y puede editarse. «REINTENTAR» repite la consulta actual únicamente cuando el usuario lo solicita; no se realizan reintentos automáticos indefinidos. Si TMDB confirma que el token no es válido, se utiliza el estado existente «Token no válido» en lugar de presentarlo como un error de conexión genérico. El comportamiento es equivalente en Obsidiana y Cuarzo.

**Ausencia de conexión a Internet aprobada:** la búsqueda local se ejecuta inmediatamente y no se realiza ninguna petición a TMDB mientras no exista conexión a Internet. No aparece el indicador de carga. Si hay resultados locales, se conserva la lista unificada con esos resultados y se muestra debajo de la barra una indicación discreta «Sin conexión a Internet»; las películas guardadas mantienen «En tu Prisma». Si no hay coincidencias locales, no se muestra «No encontramos películas» ni un error de TMDB: se presenta una ilustración sencilla, «Sin conexión a Internet» y el texto «Ahora no puedes consultar películas en TMDB. Puedes seguir utilizando las películas guardadas en tu Prisma o añadir una manualmente.», junto con la acción «AÑADIR PELÍCULA MANUALMENTE». La consulta permanece editable y el alta manual sigue disponible sin conexión. Al recuperarse el acceso a Internet, si la consulta continúa vigente y existe un token verificado, Prisma realiza una única nueva búsqueda remota para esa consulta, respetando el debounce y el descarte de respuestas obsoletas. El indicador de carga aparece mientras se realiza esa búsqueda y los resultados locales permanecen visibles. No se inician reintentos automáticos repetidos. El comportamiento es equivalente en Obsidiana y Cuarzo.

**Ausencia de token TMDB verificado aprobada:** cuando no existe un token verificado disponible para consultas remotas, Descubrir reutiliza el aviso horizontal discreto y no bloqueante ya definido: «Conecta TMDB» / «Configura tu token de TMDB para explorar el catálogo» / «CONFIGURAR TMDB». El aviso aparece tanto si hay resultados locales como si no los hay; no oculta ni reemplaza la lista unificada. Si no hay coincidencias locales, no se muestra «No encontramos películas» y se mantiene disponible «AÑADIR PELÍCULA MANUALMENTE». La consulta permanece en la barra y puede editarse. No se realiza ninguna petición a TMDB ni aparece el indicador de carga hasta disponer de un token verificado. Cuando el token queda verificado correctamente, si hay conexión y la consulta sigue vigente, Prisma ejecuta una única búsqueda remota para esa consulta y conserva los resultados locales mientras carga. Los estados existentes «Token verificado», «Pendiente de verificación», «Token no válido» y «Error de conexión» mantienen sus significados y no se confunden entre sí. Si se está sustituyendo un token y existe un token anterior todavía verificado, este permanece activo hasta validar el nuevo y las consultas pueden continuar utilizándolo. El comportamiento es equivalente en Obsidiana y Cuarzo.

**Borrado de la consulta aprobado:** cuando el usuario elimina todo el texto de búsqueda, Descubrir vuelve al estado inicial ya aprobado: ilustración sencilla, «Busca una película» y «AÑADIR PELÍCULA MANUALMENTE». Desaparecen de la búsqueda los resultados de la consulta anterior y los estados contextuales asociados a ella (carga, error remoto, ausencia de conexión y aviso de configuración de TMDB). El borrado no elimina ni modifica películas guardadas; solo limpia la vista de resultados de esa consulta. Se descartan las respuestas tardías de consultas anteriores y se cancelan las tareas o peticiones pendientes cuando sea posible. El campo conserva el foco y el teclado permanece abierto para permitir escribir inmediatamente otra consulta. Mientras el campo esté vacío no se inicia ninguna búsqueda local ni remota.

**Experiencia completa posterior al MVP:** la composición completa descrita a continuación corresponde a la experiencia objetivo de Descubrir. Contiene el buscador y el Feed de películas. En la parte superior aparece una **única barra horizontal continua**: el campo de búsqueda ocupa el espacio izquierdo e incluye una **lupa lineal de 18 px y color `#BDBDBD`** (opción A seleccionada) a la izquierda del texto indicativo «Buscar...» (**14 px**, opción A seleccionada y color **`#BDBDBD`**, opción B seleccionada), con una separación horizontal de **8 px** respecto a este (opción A seleccionada); dentro del mismo contenedor y superficie se integran a la derecha el icono de Filtros, que debe tener forma de **embudo clásico alargado** (opción B seleccionada), con laterales suavemente curvos, con una curvatura sutil (opción A seleccionada), salida inferior larga y estrecha, con cuello recto de **6 px** (opción B seleccionada), boca superior de **13 px de ancho** (opción B seleccionada) y salida inferior de **3 px** (opción A seleccionada), y el icono de Ajustes, que debe representarse mediante un **engranaje lineal reconocible de geometría minimalista y compacta, con seis dientes exteriores simplificados, discretos y de proyección corta, y abertura central de 4 px de diámetro** (opción A seleccionada), no mediante el símbolo circular simplificado de las propuestas anteriores (`[Buscar...  (Filtros) (Ajustes)]`). Los tres elementos forman visualmente una sola barra, no tres controles o tarjetas independientes. La barra tiene una **altura de 52 px** (opción B seleccionada), esquinas completamente redondeadas con un **radio de 26 px** (opción B seleccionada) y los iconos de Filtros y Ajustes tienen un tamaño de **18 × 18 px** y deben compartir la misma escala visual aparente; el embudo debe ajustarse ópticamente para no percibirse más grande que el engranaje de Ajustes, color **`#BDBDBD`** (opción B seleccionada) y estilo **lineal fino, con un grosor de trazo de 1,4 px** (opción A seleccionada) y terminaciones de trazo **redondeadas** (`stroke-linecap: round`, opción A seleccionada), además de **uniones redondeadas** (`stroke-linejoin: round`, opción A seleccionada). El margen interior de la barra entre sus bordes y los elementos interiores es de **12 px** (opción A seleccionada). La separación horizontal entre los iconos de Filtros y Ajustes es de **12 px** (opción A seleccionada). **Tratamiento de superficie seleccionado: opción B, sin contorno; la barra utiliza únicamente la superficie `#222222` sobre el fondo `#171A20`, sin borde visible.** El Feed aparece debajo. La barra mantiene un margen lateral exterior de **16 px** a izquierda y derecha, medido desde los bordes de la pantalla hasta los extremos del contenedor. La separación vertical entre el borde inferior de la barra y el borde superior de la primera fila de pósteres es de **16 px**.

### 4.3 Paleta cromática — Obsidiana (modo oscuro)

**Fondo principal global:** `#171A20` (RGB 23, 26, 32), alternativa B «Grafito frío», aprobado.
- **Superficie elevada global:** `#242A35` (RGB 36, 42, 53), alternativa B «Grafito azulado», aprobada.
- **Contorno global de superficies elevadas:** `#353535` (RGB 53, 53, 53), grosor **1 px**, alternativa A aprobada. Se aplica a superficies elevadas globales de Obsidiana cuando el componente no tenga una regla particular de contorno aprobada. No modifica automáticamente componentes con contornos propios ni componentes cuya superficie esté definida como carente de contorno.
- **Acento principal global:** `#70AEE0` (RGB 112, 174, 224), alternativa B «Azul luminoso», aprobada. Refleja la preferencia cromática general del propietario por el azul.
- **Referencia azul anterior:** `#5B9BD5` (RGB 91, 155, 213), conservada como referencia y en componentes concretos que ya la tienen aprobada; no sustituye al nuevo acento global ni se cambia automáticamente en esos componentes.
- **Referencia anterior de fondo:** `#131313` (RGB 19, 19, 19), sustituida por el fondo principal aprobado `#171A20`.

La superficie elevada global queda aprobada en `#242A35`, con contorno global de `#353535` de 1 px cuando no exista una regla particular de componente, y el acento global en `#70AEE0`. Las especificaciones particulares de componentes que ya cuentan con aprobación expresa se conservan tal como están documentadas y no se modifican automáticamente; los usos particulares del azul anterior `#5B9BD5` permanecen como excepciones expresas hasta que se revisen individualmente.
- **Texto principal global:** `#F0F0F0` (RGB 240, 240, 240), alternativa A aprobada.
- **Texto secundario global:** `#BDBDBD` (RGB 189, 189, 189), alternativa A aprobada.
- **Texto auxiliar global:** `#9B9B9B` (RGB 155, 155, 155), alternativa A aprobada.
- **Iconos inactivos globales:** `#BDBDBD` (RGB 189, 189, 189), alternativa A aprobada. Se aplica a iconografía inactiva de Obsidiana cuando el componente no tenga un color particular aprobado. Se mantienen las excepciones específicas ya definidas, como los iconos inactivos de las tarjetas de Personal en `#D0D0D0`.
- **Contenido de controles deshabilitados (texto e iconos):** `#888888` (RGB 136, 136, 136), alternativa A aprobada. Se aplica al contenido interno de los controles deshabilitados.
- **Superficie de controles deshabilitados:** `#1D222B` (RGB 29, 34, 43), alternativa B «Grafito profundo», aprobada. Se utiliza como superficie propia del control deshabilitado sobre los fondos y superficies normales de Obsidiana. El control deshabilitado no lleva contorno visible (opción A aprobada) ni recibe opacidad adicional: **100 % (opción A aprobada)**.
- **Superficie durante la pulsación:** `#2B303A` (RGB 43, 48, 58), alternativa A «Grafito iluminado», aprobada. Es un cambio transitorio para elementos interactivos cuya superficie normal sea la superficie elevada global `#242A35`; al terminar la pulsación recuperan la superficie normal. Duración de la transición: **100 ms al pulsar y 160 ms al soltar (alternativa A aprobada)**. Curva de aceleración para ambas fases: **ease-out**, con curva Bézier exacta **`cubic-bezier(0, 0, 0.2, 1)` (alternativa A aprobada)**. La temporización y la curva son comunes a Obsidiana y Cuarzo para el tratamiento estándar de superficies durante la pulsación. No reemplaza los comportamientos ni las animaciones particulares ya aprobados para componentes existentes.
- Esta jerarquía cromática y el neutro de iconos inactivos se aplican como referencias globales de Obsidiana. Se conservan los colores específicos ya aprobados para componentes concretos cuando sus reglas particulares indiquen un tratamiento distinto.
- **Separadores internos:** `#353535` (RGB 53, 53, 53), grosor **1 px**, opción A aprobada. Se utiliza para dividir internamente secciones y grupos de información en Obsidiana; reutiliza un color ya presente en componentes aprobados sin convertirlo en un contorno general para todas las superficies. Separación respecto al contenido adyacente: **8 px por encima y 8 px por debajo (alternativa A aprobada)**, igual que en Cuarzo.

El fondo principal global de Obsidiana está aprobado en `#171A20`. La superficie elevada global está aprobada en `#242A35` (RGB 36, 42, 53); el acento global está aprobado en `#70AEE0` (RGB 112, 174, 224), alternativa B. `#5B9BD5` se conserva como referencia anterior y en componentes con especificaciones particulares ya aprobadas; el azul es la preferencia cromática general del propietario. También están aprobados los tres niveles globales de texto, el neutro global de iconos inactivos `#BDBDBD` (conservando las excepciones particulares, como Personal `#D0D0D0`), el contenido de controles deshabilitados `#888888`, su superficie `#1D222B`, la superficie transitoria durante la pulsación `#2B303A` para elementos interactivos sobre `#242A35`, y el color, grosor y espaciado de los separadores internos. El contorno de los controles deshabilitados de Obsidiana está aprobado sin línea visible (opción A) y no se aplica opacidad adicional (**100 %, opción A aprobada**). Los demás neutros no asignados, otros bordes y estados adicionales siguen pendientes.

### 4.4 Paleta cromática — Cuarzo

Los roles cromáticos de Cuarzo aprobados hasta ahora son:

- **Fondo principal:** `#F4F1EA` (RGB 244, 241, 234), concepto A «Marfil mineral».
- **Superficies** — tarjetas, secciones, contenedores y listas: `#FFFFFF` (RGB 255, 255, 255), opción A «Blanco cristalino».
- **Contorno de superficies:** `#DDD8CE` (RGB 221, 216, 206), 1 px, opción A «Borde mineral discreto». Se aplica como delimitación de las superficies de Cuarzo cuando corresponda y no sustituye contornos particulares ya aprobados para componentes.
- **Texto principal:** `#292B2F` (RGB 41, 43, 47), opción A «Grafito mineral».
- **Texto secundario:** `#68655F` (RGB 104, 101, 95), opción A «Gris mineral cálido».
- **Texto auxiliar:** `#706C64` (RGB 112, 108, 100), opción A «Piedra suave».
- **Acento principal** — botones, iconos en estado activo, destacados y calificaciones: `#356F9F` (RGB 53, 111, 159), opción A «Azul mineral».
- **Iconos inactivos:** `#8A857B` (RGB 138, 133, 123), opción A «Piedra cálida». Este neutro se aplica a iconografía inactiva en Cuarzo y no sustituye los colores particulares ya aprobados para Obsidiana ni las reglas específicas de componentes como Personal.
- **Contenido de controles deshabilitados (texto e iconos):** `#9D998F` (RGB 157, 153, 143), opción A «Piedra desactivada». Se aplica únicamente al contenido del control y es distinto del icono inactivo `#8A857B`.
- **Superficie de controles deshabilitados:** `#F0EDE6` (RGB 240, 237, 230), opción B «Piedra apagada». Se aplica a la superficie de controles deshabilitados en Cuarzo. Contorno aprobado: **sin contorno visible (opción A)**. No se aplica opacidad adicional: **100 %** (opción A aprobada); se conservan íntegros los colores aprobados del contenido y de la superficie.
- **Separadores internos:** `#E8E3DA` (RGB 232, 227, 218), opción B «Separación delicada». Se utiliza para dividir internamente secciones y grupos de información. Grosor aprobado: **1 px (opción A)**. Separación respecto al contenido adyacente: **8 px por encima y 8 px por debajo (alternativa A aprobada)**, igual que en Obsidiana.
- **Superficie durante la pulsación:** `#ECE7DE` (RGB 236, 231, 222), opción A «Marfil sombreado». Es un cambio transitorio para elementos interactivos cuya superficie normal sea `#FFFFFF`; al terminar la pulsación, recuperan su superficie normal. Utiliza la temporización y la curva de aceleración comunes aprobadas: **100 ms al pulsar y 160 ms al soltar**, con **ease-out en ambas fases y curva Bézier `cubic-bezier(0, 0, 0.2, 1)`**. No reemplaza los comportamientos ni las animaciones particulares ya aprobados para componentes existentes.

Estas aprobaciones cubren el fondo principal, las superficies, los textos principal, secundario y auxiliar, el contorno de superficie de 1 px, el acento principal, el neutro de iconos inactivos, el contenido y la superficie de controles deshabilitados, el color de separadores internos y la superficie transitoria durante la pulsación. El contenido deshabilitado utiliza `#9D998F` y su superficie `#F0EDE6`; los controles deshabilitados no llevan contorno visible (opción A aprobada) ni reciben opacidad adicional (**100 %**, opción A aprobada). Se conservan íntegros los colores aprobados del contenido y de la superficie. Los separadores internos están aprobados en **1 px** en ambos temas: `#353535` en Obsidiana y `#E8E3DA` en Cuarzo. La separación respecto al contenido adyacente es de **8 px por encima y 8 px por debajo (alternativa A aprobada)** en ambos temas; otros neutros, otros bordes no cubiertos por los roles ya aprobados, otros estados y demás elementos pendientes de la paleta clara siguen sujetos a definición.

### 4.5 Sombras de superficies generales

Las superficies elevadas generales de **Obsidiana y Cuarzo no llevan sombra global** (alternativa A aprobada). La diferenciación entre niveles se resuelve mediante los colores de fondo y superficie, así como los contornos aprobados cuando correspondan. Esta regla no elimina ni modifica sombras de contacto expresamente aprobadas para componentes concretos, como la sombra del marcapáginas; las excepciones particulares se conservan sin extenderlas a otros elementos.

### 4.6 Geometría general — radio base

- **Radio base de las superficies generales:** **14 px** en Obsidiana y Cuarzo (alternativa A aprobada). Se utiliza como referencia general cuando una superficie no tenga un radio particular definido.
- Esta regla no modifica automáticamente los componentes que ya cuentan con una especificación particular de radio. Sus medidas aprobadas se conservan sin cambios; el valor de 14 px no es una instrucción para homogeneizar indiscriminadamente todos los elementos.

### 4.7 Sistema global de espaciado

- **Unidad modular base:** **4 px** (opción A aprobada). El sistema de referencia compartido por Obsidiana y Cuarzo utiliza incrementos de 4 px.
- **Escala de referencia:** **4, 8, 12, 16, 20, 24, 32, 40, 48 y 64 px**. Los valores sirven para orientar la definición de nuevos márgenes, separaciones y espacios interiores, seleccionando el tamaño adecuado según la jerarquía y la función del componente.
- La escala es una guía de consistencia, no una obligación de utilizar exclusivamente esos valores ni de cambiar medidas existentes. Se conservan todas las especificaciones particulares ya aprobadas, incluidos los espaciados que no coincidan con la escala.
- La misma lógica y cobertura se aplica a ambos temas; la escala no introduce diferencias de espaciado entre Obsidiana y Cuarzo.

## 5. Descubrir: Feed

**Alcance:** esta sección describe el Feed completo posterior al MVP. El MVP solo incluye búsqueda por título, identificación supervisada y consulta de la ficha básica. Los modos Equilibrado, Afinidad y Exploración, el Feed de tres columnas, la paginación infinita y sus filtros se implementarán en las fases posteriores indicadas en el Roadmap.

### 5.1 Modos de contenido

El Feed ofrece tres modos:

- **Equilibrado:** modo predeterminado al abrir la aplicación.
- **Afinidad:** prioriza películas afines a los gustos conocidos por Espectro.
- **Exploración:** busca ampliar los horizontes del usuario con películas menos parecidas a sus patrones habituales.

El modo vuelve automáticamente a Equilibrado cuando Prisma ha permanecido fuera de primer plano durante **cinco minutos o más**. Si vuelve antes de cinco minutos, conserva el modo temporal que estaba seleccionado.

### 5.2 Diseño del Feed

- Diseño predeterminado: cuadrícula de **tres columnas** con pósteres verticales.
- Proporción de las portadas verticales del Feed: **2:3** (opción A seleccionada, formato cinematográfico clásico).
- Margen exterior del Feed: **16 px** a izquierda y derecha, medido desde los bordes de la pantalla hasta los extremos de la cuadrícula (opción B seleccionada).
- Separación horizontal entre pósteres de columnas adyacentes en el Feed: **12 px** (opción B seleccionada).
- Separación vertical entre filas consecutivas de pósteres en el Feed: **12 px** (opción B seleccionada).
- En Ajustes se podrá elegir un segundo diseño: mosaico variado de tres columnas, combinando pósteres verticales con imágenes horizontales de doble o triple ancho entre filas.
- Los dos diseños deben respetar los márgenes y el sistema visual que se apruebe.
- Cada elemento del Feed muestra únicamente la portada de la película; no se coloca texto debajo de ella (ni título, ni año, ni descripción). Los indicadores de estado mediante marcapáginas se conservan según la regla específica de la sección 5.3.
- El Feed utiliza desplazamiento infinito: carga más resultados al acercarse al final, sin botón de paginación.
- Se deben evitar duplicados entre páginas y preservar el orden coherente del modo y los filtros.
- Sin conexión se muestra solamente el contenido disponible localmente; no se simulan películas nuevas.

### 5.3 Marcadores de las portadas

Las películas que pertenezcan a las listas llevan un icono de **marcapáginas**:

- Azul `#5B9BD5`: película registrada en Historial (Vista).
- Gris `#D0D0D0`: película en Pendientes.
La ubicación y la relación del marcapáginas con la portada quedan definidas así:
- Se coloca en la **esquina superior derecha** de la portada. La distancia de **2 px** hacia el interior se mide desde el borde derecho de la portada hasta el extremo exterior visible del contorno del marcapáginas.
- Sobresale exactamente **6 px por encima del borde superior** de la portada, medidos hasta el extremo exterior visible de su contorno; una parte del marcador queda fuera de la imagen.
- Debe percibirse como una **pestaña física que marca la película**, integrada en el borde de la portada, no como un icono flotante colocado encima de la imagen.
- Silueta seleccionada: **cinta clásica con muesca cóncava en V en el extremo inferior** (opción A). La anchura exterior visible total es de **16 px** (opción B), incluyendo el contorno. La profundidad exterior visible de la parte interior de la cinta es de **22 px**, medida desde el borde superior de la portada hasta el extremo exterior visible de las dos esquinas inferiores, sin contar los **6 px** que sobresalen por encima. La profundidad exterior visible de la muesca en V es de **6 px** (opción B), medida desde la línea que une las dos esquinas inferiores exteriores hasta el extremo exterior visible del vértice interior.
- **Orientación obligatoria de la muesca:** la V inferior es un recorte cóncavo que entra hacia dentro del cuerpo de la cinta. Su vértice interior apunta **hacia arriba**, en dirección al borde superior de la portada y al cuerpo de la pestaña; queda más alto que las dos esquinas inferiores exteriores. Por tanto, las esquinas exteriores quedan por debajo del vértice. **Nunca se debe invertir la V con el vértice apuntando hacia abajo o hacia fuera.**
- Radio exterior visible de las dos esquinas superiores de la cinta: **1 px** (opción B seleccionada). La forma y profundidad de la muesca inferior en V permanecen sin cambios.
- Terminación del vértice interior de la muesca: **aguda y definida** (opción A seleccionada), sin redondeo adicional ni tramo plano; el vértice apunta hacia dentro de la cinta.
- Tratamiento de las dos uniones inferiores exteriores entre los laterales y las diagonales de la muesca: **angular** (opción A seleccionada), con encuentros rectos, sin redondeo ni bisel. El vértice interior agudo de la muesca permanece orientado hacia dentro.
- Trayectoria de los dos lados diagonales de la muesca interior: **recta** (opción A seleccionada), sin curvatura; forman una V cóncava clásica con el vértice dirigido hacia dentro de la cinta.
- Simetría de la muesca interior: **opción A seleccionada, simétrica respecto al eje vertical central de la cinta**. El vértice interior queda centrado en el ancho exterior visible de 16 px y las dos diagonales tienen la misma inclinación; la geometría izquierda y derecha es un reflejo respecto a ese eje.
- Acabado interior de la cinta: **color sólido uniforme** (opción A seleccionada), sin degradado ni reflejo central.
- Tratamiento de sombra seleccionado: **sombra de contacto muy sutil**, color **`#000000`** (opción A), opacidad de **12 %** y radio de desenfoque de **0,5 px** (opción A); permanece pegada al contorno de la pestaña, con desplazamiento de **0 px**, y ayuda a separarla de la portada sin darle una apariencia elevada o artificial.
- Extensión de la sombra: **opción B seleccionada, solo en el contorno en contacto con la superficie de la portada**. Se aplica a los tramos del perímetro situados dentro de los límites de la imagen; se excluyen el borde superior y cualquier tramo de la pestaña que sobresalga por encima de la portada. No se modifica la intensidad, el desenfoque ni el desplazamiento ya aprobados.
- Todas las cotas geométricas del marcapáginas se refieren a su envolvente exterior visible e incluyen el contorno. El trazado interior debe ajustarse para que, una vez aplicado el contorno centrado, se mantengan exactamente esas dimensiones exteriores.
- Grosor del contorno del marcapáginas: **0,6 px** (opción B seleccionada).
- Posición del contorno respecto a la silueta: **centrado** (opción A seleccionada); con un grosor total de 0,6 px, se distribuye 0,3 px hacia el interior y 0,3 px hacia el exterior del límite de la forma.
- Tratamiento de las uniones del trazo del contorno: **angular** (opción A seleccionada), con encuentros nítidos y vértices definidos, sin redondeo ni bisel. Esta decisión regula únicamente la unión del trazo; no altera la silueta, la V cóncava simétrica, las dimensiones ni el grosor de 0,6 px ya aprobados.
- Tratamiento cromático del contorno: **tonal** (opción A seleccionada); cada borde utiliza un tono más oscuro que el relleno de su propio marcapáginas. Contorno azul de Vista: **`#3E78A7`** (opción A). Contorno gris de Pendiente: **`#A8A8A8`** (opción A).

El icono también se usa en las portadas de «También podría gustarte» dentro de la ficha.
En el Feed de Descubrir, el marcapáginas es **exclusivamente informativo**: no es un botón, no tiene una zona táctil independiente ni cambia el estado al pulsarlo. Al tocar la portada se abre la ficha de la película; los cambios entre Historial (Vista) y Pendientes se realizan mediante las acciones correspondientes dentro de esa ficha.
Cuando el usuario modifica el estado de una película desde su ficha y después regresa a Descubrir, el marcapáginas refleja directamente el estado final, **sin animaciones** de color, opacidad, entrada o salida. Si queda en Vista, se muestra con relleno `#5B9BD5` y contorno `#3E78A7`; si queda en Pendientes, con relleno `#D0D0D0` y contorno `#A8A8A8`; si deja de pertenecer a ambos estados, no se muestra. Esta regla cubre la asignación inicial, el cambio entre Vista y Pendiente y la eliminación del estado. Como las acciones se realizan dentro de la ficha, Descubrir presenta únicamente el resultado definitivo al volver a mostrarse.

### 5.4 Filtros

Se pueden combinar varios filtros a la vez:

- Géneros.
- Año de estreno.
- País de producción.
- Duración.
- Idioma original.
- Puntuación de TMDB.

Los filtros de Descubrir también admiten combinación AND/OR cuando tenga sentido para las condiciones elegidas; no se fuerza un operador donde no resulte aplicable.

También existe un filtro para ocultar del Feed las películas que tengan marcadores:

- Ocultar Vista.
- Ocultar Pendiente.
- Ocultar ambas.

Este filtro solo cambia lo que aparece en Descubrir. No modifica las listas ni elimina datos.

## 6. Buscador

- Está en la parte superior de Descubrir.
- Muestra resultados mientras el usuario escribe, sin exigir que pulse Enter.
- Los resultados muestran póster, título y año de estreno cuando se conozca.
- Tamaño de miniatura seleccionado: **56 × 84 px** (opción B), con proporción **2:3**. El marcapáginas de estas miniaturas utiliza la escala proporcional del **75 %** definida a continuación. Esta medida corresponde solo a los resultados de búsqueda y no modifica el tamaño de los pósteres del Feed ni de «También podría gustarte».
- Radio de las esquinas de las miniaturas de búsqueda: **2 px** (opción B aprobada). Se aplica exclusivamente al contorno de la miniatura de **56 × 84 px**; no modifica el radio ni la geometría del marcapáginas y no se extiende a los pósteres del Feed ni a «También podría gustarte».
- Separación horizontal entre la miniatura del póster y el bloque de texto de cada resultado: **12 px** (opción B seleccionada).
- Márgenes laterales de las filas de resultados: **16 px** a izquierda y derecha, medidos desde los bordes de la pantalla hasta los extremos de la fila. Las filas quedan alineadas horizontalmente con los extremos de la barra superior de búsqueda.
- Alineación del texto de cada resultado: el bloque formado por el título y el año se centra verticalmente respecto a la miniatura de **56 × 84 px** (opción A).
- Jerarquía tipográfica de cada resultado: título de película de **14 px**, peso **medio (500)** y rol de texto principal del tema; año de estreno de **12 px**, peso **regular (400)** y rol de texto secundario. En Obsidiana corresponden a `#F0F0F0` y `#BDBDBD`, respectivamente; en Cuarzo se utilizan los roles correspondientes `#292B2F` y `#68655F`. La indicación «En tu Prisma» utiliza el rol de texto auxiliar del tema (`#9B9B9B` en Obsidiana y `#706C64` en Cuarzo). Esta jerarquía se limita a los resultados de búsqueda y no define la tipografía general de Prisma.
- Comportamiento de títulos largos: el título puede ocupar **hasta dos líneas**. Si no cabe completo en ese límite, se trunca al final de la segunda línea mediante puntos suspensivos (**…**). Cuando ocupa dos líneas, no se añade espacio vertical adicional entre ellas (**0 px adicionales**, opción A aprobada); se conserva el interlineado tipográfico normal para que las líneas no se solapen. El año permanece en su línea independiente, debajo del título, conservando la separación vertical de **2 px** y el bloque completo centrado verticalmente respecto a la miniatura.
- Separación vertical entre el título y el año de cada resultado: **2 px** (opción B seleccionada).
- Separación vertical entre filas consecutivas de resultados de búsqueda: **12 px** (opción A seleccionada), medida desde el extremo inferior de la miniatura de una fila hasta el extremo superior de la miniatura de la fila siguiente.
- El buscador incluye películas locales de Historial, Pendientes y Ocultos, además de resultados de TMDB.
- **Estructura única de resultados aprobada para el MVP:** todas las filas muestran únicamente póster, título y año de estreno cuando esté disponible. Solo las películas ya guardadas localmente añaden «En tu Prisma» junto al año. Los resultados remotos nuevos no muestran etiqueta de procedencia. En el MVP no se superponen marcapáginas de Vista/Pendiente ni se añaden etiquetas de estado como «Oculta» a las filas de búsqueda; las películas de Historial, Pendientes y Ocultos siguen siendo localizables mediante la búsqueda local. Esta regla mantiene la misma estructura en todas las filas y fuentes.
- Los resultados de búsqueda del MVP no llevan marcapáginas ni distintivos superpuestos sobre el póster. Los símbolos y marcadores aprobados para el Feed se conservan para su fase posterior y no se trasladan a Descubrir en el MVP.

- Toda la fila del resultado —póster, título y año— abre la ficha de la película al tocarla. La fila constituye una única zona de interacción; no hay controles superpuestos sobre el póster.
- Respuesta visual al mantener pulsada una fila de resultados: **opción A, iluminación sutil**. Durante la pulsación, la fila completa muestra temporalmente la superficie de interacción aprobada para el tema activo y un radio medio (`md`), sin contorno. Al terminar la pulsación, recupera su apariencia normal. El resaltado no introduce una tarjeta permanente ni utiliza el azul de acento; no altera la acción de la fila, que sigue abriendo la ficha de la película.
- Las películas ocultas se pueden encontrar mediante búsqueda, aunque no aparezcan en el Feed.
- Sin conexión, la búsqueda funciona sobre el contenido local guardado.

## 7. Ficha cinematográfica

**Alcance:** esta sección describe la ficha completa prevista para Prisma. En el MVP se implementa la ficha básica necesaria para identificar la película y gestionar el diario: cabecera, datos básicos disponibles, acciones Historial/Pendientes, registrar visionado, visionados repetidos y calificación personal. La sinopsis básica puede mostrarse cuando TMDB la proporcione. Las puntuaciones externas, disponibilidad de streaming, tráileres, enlaces rápidos, reparto/equipo, colecciones y películas relacionadas son posteriores al MVP y no deben aparecer como controles sin función.

La ficha se organiza de arriba hacia abajo y evita tarjetas pesadas salvo donde se hayan pedido expresamente.

### 7.1 Cabecera

- Imagen horizontal a todo lo ancho, con degradado oscuro inferior.
- Flecha de volver en círculo semitransparente arriba a la izquierda.
- Menú de tres puntos en círculo semitransparente arriba a la derecha.
- Título grande blanco, alineado a la izquierda sobre la imagen.
- Si no hay imagen, claqueta grande gris sobre fondo gris oscuro.

### 7.2 Datos básicos

Una línea con fecha de estreno (día, mes abreviado y año), código de país entre paréntesis, duración con icono de reloj y géneros; los elementos se separan con barras verticales.

Debajo aparece el estado de producción, cuando exista: «Estrenada», «En producción» o «Post-producción».

No se muestra «-1 min» ni ningún valor inválido. Si la duración es desconocida, se omite o se marca como no disponible de acuerdo con el diseño que se apruebe.

### 7.3 Acciones principales y listas

Para una película no oculta:

- Botón ancho de contorno fino «AGREGAR A HISTORIAL».
- A su derecha, acción de texto gris «AGREGAR A PENDIENTES».
- El menú de tres puntos ofrece la acción «OCULTAR» en el MVP. «GESTIONAR LISTAS», que abre un selector desde la ficha para marcar/desmarcar varias listas personalizadas, es posterior al MVP; durante el MVP las películas se añaden y retiran desde la sección de contenido de cada lista.
**Posterior al MVP — «GESTIONAR LISTAS»:** se refiere exclusivamente a las listas personalizadas definidas en Personal; no agrega ni quita la película de Historial o Pendientes.
- Al pulsar «GESTIONAR LISTAS» se abre una ventana con todas las listas personalizadas y una casilla por lista. Las casillas reflejan las listas a las que ya pertenece la película; el usuario puede marcar o desmarcar varias para agregarla o quitarla de esas listas en una sola acción.
- Esta acción queda fuera del MVP. Durante el MVP, la pertenencia se gestiona desde «Gestionar listas».
- La ubicación y el comportamiento exactos de «Colecciones» se detallan en la sección de preguntas abiertas.

Estados del botón:

- **Pendiente:** botón casi a todo el ancho, marcapáginas y texto «AÑADIDO A PENDIENTES», con check a la derecha.
- **En Historial:** contorno y texto azul, marcapáginas relleno y, debajo, la fecha y hora del visionado más reciente en azul pequeño.
- **Oculta:** desaparecen «AGREGAR A HISTORIAL» y «AGREGAR A PENDIENTES»; aparece un único botón «MOSTRAR DE NUEVO».

### 7.4 Registrar un visionado

Al pulsar «AGREGAR A HISTORIAL» aparece una ventana con cuatro opciones:

1. **Ahora:** registra el momento actual del teléfono.
2. **Día de estreno:** registra la fecha oficial de estreno de la película.
3. **Seleccionar fecha:** abre un calendario y permite elegir fecha y hora de inicio.
4. **Ajustar al inicio:** pensado para registrar la película después de verla. Calcula una hora estimada de inicio restando la duración conocida a la hora actual de registro y muestra el resultado antes de confirmarlo. No abre otro calendario. Si la duración es desconocida, no inventa un resultado ni presenta un cálculo falso.

La fecha del visionado corresponde al comienzo de la película, nunca al momento en que termina. Por ejemplo, si comienza el 5 de noviembre a las 11:00 p. m. y termina el 6 de noviembre a la 1:00 a. m., el registro pertenece al 5 de noviembre.

Se conserva la hora local del teléfono. Para «Ajustar al inicio», el texto de vista previa muestra una fecha y hora concretas antes de guardar. El resultado se identifica como estimación porque depende de la duración registrada por TMDB.

«Día de estreno» utiliza una fecha de calendario; no se debe inventar una hora de visionado para esa opción.

### 7.5 Visionados repetidos

- Cada visionado es un registro independiente.
- Cada uno conserva su propia fecha, hora (si se conoce) y calificación.
- En Historial aparece una sola portada por película, con contador de visionados.
- Al entrar en la película se puede consultar la lista completa de visionados y puntuaciones.
- Una repetición no sobrescribe fechas ni puntuaciones anteriores.

### 7.6 Calificar

- Se puede calificar una película aunque todavía no esté en Historial ni en Pendientes.
- La ventana muestra diez estrellas en fila, el número de la estrella seleccionada en el centro y un botón «Calificar» para confirmar.
- Después de confirmar, se muestra la puntuación, por ejemplo «7 / 10».
- Si se califica antes de registrar el visionado, la puntuación queda como calificación personal provisional. Cuando se agrega el siguiente visionado, se asocia a ese nuevo registro.
- Si hay varios visionados ya registrados, al pulsar «Calificar» se pregunta a cuál de ellos se quiere asignar la nueva puntuación. No se elige uno ni se sobrescriben otros automáticamente.
- La ficha muestra como puntuación personal la del visionado más reciente. Si no existe ningún visionado, puede mostrar la calificación personal no asociada.

**Posterior al MVP:** la ficha completa incluye cuatro columnas de puntuaciones externas, con el número grande y el nombre de la fuente debajo. Las cuatro fuentes elegidas por el propietario son:

1. **TMDB**
2. **IMDb**
3. **Rotten Tomatoes**
4. **Metacritic**

Si no existe una puntuación, no hay un dato verificable o no existe una vía de acceso autorizada, se muestra el icono de enlace previsto en lugar de inventar un número. La selección de estas fuentes define el objetivo de producto y visual; no constituye por sí sola una licencia ni garantiza acceso técnico a sus datos. No se permite obtener las puntuaciones mediante scraping o extracción no autorizada. Cada fuente adicional a TMDB requiere verificar sus condiciones de acceso, licencia, atribución y posibilidad de distribución pública antes de integrarla.

### 7.7 Dónde verla (posterior al MVP)

- Muestra tarjetas horizontales deslizables con logo, nombre de plataforma y modalidad: suscripción, gratis, compra o alquiler.
- Solo aparece cuando existen datos.
- La vista inicial contempla **todas las regiones**, agrupando los proveedores por país.
- En Ajustes se puede seleccionar una región concreta.
- Al pulsar una tarjeta, abre el enlace externo de la película cuando TMDB proporcione uno válido.
- La ausencia de datos no se presenta como ausencia universal de disponibilidad; se comunica como falta de datos de la fuente.

### 7.8 Sinopsis y acciones rápidas

- La sinopsis básica está incluida en el MVP cuando TMDB la proporcione; ocupa dos o tres líneas y se corta con puntos suspensivos si es larga.
- **Posterior al MVP:** acciones rápidas en píldoras deslizables: Calificar, Tráiler y Enlaces.
- Si el usuario ya calificó, la acción muestra, por ejemplo, «7 / 10».
- Si no hay tráiler, la acción aparece atenuada.

### 7.9 Reparto y equipo (posterior al MVP)

- Carrusel de fotografías verticales, con el nombre sobre la foto en la esquina inferior izquierda.
- Debajo, tres columnas de texto pequeño y clicable: Dirección, Escritores y Música.
- No se muestran personas ni datos inventados si TMDB carece de información.

### 7.10 Colecciones y películas relacionadas (posterior al MVP)

- Si la película pertenece a una saga/colección, se muestra el nombre y una descripción breve.
- La opción «Colecciones» está asociada a la zona del menú de tres puntos; el detalle exacto de apertura está pendiente de definición visual.
- «También podría gustarte» muestra un carrusel de pósteres que continúa visualmente más allá del borde de pantalla para invitar a deslizar.
- Los pósteres relacionados usan el marcapáginas azul para Vista y gris para Pendiente.
- En «También podría gustarte», el marcapáginas es **exclusivamente informativo**, igual que en el Feed de Descubrir: no tiene zona táctil ni acción independiente. Al tocar cualquier parte de la portada se abre la ficha de esa película; los cambios de estado se realizan desde las acciones de la ficha correspondiente. Se conserva el mismo diseño y la misma correspondencia cromática de estados.

## 8. Ocultos y restauración

- «OCULTAR» retira la película de Descubrir y de las recomendaciones habituales de Espectro.
- Ocultar no elimina historial, visionados, calificaciones ni metadatos guardados.
- Las películas ocultas se consultan exclusivamente en Personal → Ocultos.
- En su ficha, las acciones de agregar a Historial/Pendientes se sustituyen por «MOSTRAR DE NUEVO».
- Al restaurarla, vuelve a Descubrir y recupera el estado anterior: Vista, Pendiente o sin marcador.
- Al volver a mostrarse en Descubrir después de «MOSTRAR DE NUEVO», el marcapáginas aparece **directamente**, sin animación de opacidad ni transición de entrada: azul `#5B9BD5` si recupera Vista, gris `#D0D0D0` si recupera Pendiente y sin marcapáginas si recupera el estado sin lista. La restauración conserva el estado anterior; no lo modifica.
- El filtro de ocultar marcadores Vista/Pendiente no equivale a ocultar una película de forma permanente.

## 9. Personal: listas

### Historial (MVP)
- Una portada por película, sin duplicados, con contador de visionados.
- La ficha permite consultar cada fecha, hora cuando se conozca y calificación independiente.
- Un nuevo visionado no sobrescribe los anteriores.
- La película pasa a Historial al registrar un visionado y deja Pendientes.
- La búsqueda local por título funciona sin conexión, se actualiza mientras se escribe e ignora mayúsculas, minúsculas y tildes.

### Pendientes (MVP)
- Una portada por película, sin duplicados.
- Al registrar un visionado, la película pasa automáticamente a Historial y sale de Pendientes.
- El orden inicial muestra primero las películas añadidas más recientemente. Si una película vuelve a incorporarse después de haber salido de Pendientes, recibe una nueva fecha de incorporación.
- Se puede quitar una película desde su ficha mediante confirmación. La acción solo la retira de Pendientes y no elimina el registro local, metadatos, visionados, calificaciones ni pertenencias a listas personalizadas.
- La búsqueda local por título funciona sin conexión, se actualiza mientras se escribe e ignora mayúsculas, minúsculas y tildes.

### Ocultos (MVP)
- Una portada por película oculta. Las películas ocultas no aparecen en Descubrir ni en las recomendaciones habituales de Espectro cuando Espectro esté implementado; esta última exclusión no añade una dependencia de Espectro al MVP.
- Ocultar no elimina historial, visionados, calificaciones ni metadatos guardados.
- Se conserva el estado anterior: Vista, Pendiente o sin marcador.
- Se registra la fecha y hora de ocultación. El orden inicial muestra las películas ocultadas más recientemente primero; volver a ocultar una película después de restaurarla genera una nueva fecha.
- Desde su ficha se puede «MOSTRAR DE NUEVO». La acción es inmediata, sin confirmación, muestra brevemente «Película mostrada de nuevo» y recupera el estado anterior. La ficha permanece abierta.
- La película restaurada deja Ocultos y vuelve a estar disponible en Descubrir según su estado anterior.
- La búsqueda local por título funciona sin conexión, se actualiza mientras se escribe e ignora mayúsculas, minúsculas y tildes.
- El filtro de ocultar marcadores Vista/Pendiente del Feed no equivale a ocultar una película de forma permanente.

### Gestionar listas — función manual básica (MVP)
- Las listas personalizadas son independientes de Historial y Pendientes. Una película puede pertenecer a varias listas a la vez.
- El MVP permite crear, renombrar y eliminar listas, y añadir o quitar películas.
- Cada lista tiene un nombre obligatorio de hasta 40 caracteres. Se eliminan los espacios exteriores; se conservan los espacios interiores. Los nombres son únicos sin distinguir mayúsculas/minúsculas, pero sí distinguiendo tildes.
- Cada lista puede tener una descripción opcional de hasta 160 caracteres. Se eliminan los espacios exteriores; una descripción compuesta solo por espacios se considera vacía.
- Los errores de nombre vacío o duplicado se muestran junto al campo correspondiente, sin cerrar el formulario ni borrar los demás valores.
- Eliminar una lista requiere confirmación con su nombre y las acciones «CANCELAR» y «ELIMINAR». La operación elimina la lista y sus asociaciones, no las películas, visionados, calificaciones ni su pertenencia a otras listas.
- Una misma película no puede duplicarse dentro de una lista. Añadirla o quitarla no altera Historial, Pendientes, Ocultos ni otras listas.
- Desde «AÑADIR PELÍCULAS» se reutiliza la búsqueda de Prisma y se permite seleccionar varias películas. Las ya añadidas se identifican y no se pueden volver a seleccionar. El botón inferior «AÑADIR A LA LISTA» muestra la cantidad seleccionada y está deshabilitado cuando no hay selección.
- El alta manual reutiliza el formulario y la lógica general de Prisma. La nueva película se añade a la lista desde la que comenzó la acción, sin incorporarse automáticamente a Historial ni Pendientes. Funciona sin conexión.
- Las películas procedentes de TMDB se guardan localmente con sus metadatos disponibles y se incorporan solo a la lista elegida; no reciben automáticamente el estado Vista o Pendiente.
- Quitar una película de una lista solo elimina esa pertenencia, sin confirmación y sin afectar otros datos o listas.
- El MVP no incluye filtros, ordenaciones avanzadas, colores personalizados, fijación, collages ni listas inteligentes.

### Gestión avanzada de listas — posterior al MVP (decisiones aprobadas)

Estas capacidades se conservan como parte de la evolución aprobada de Prisma, pero no bloquean la primera versión funcional.

**Crear y editar**
- Formulario de creación con nombre obligatorio, descripción opcional y un único color elegido de la paleta aprobada. Azul `#70AEE0` aparece seleccionado por defecto.
- El nombre admite hasta 40 caracteres; la descripción, hasta 160. Se eliminan espacios exteriores al guardar; se conservan espacios interiores. La validación de unicidad ignora mayúsculas/minúsculas, pero distingue tildes.
- Mensajes de validación: «Introduce el nombre de la lista» cuando falta el nombre y «Ya existe una lista con ese nombre» ante duplicados. Se muestran junto al campo sin cerrar el formulario ni borrar los demás valores.
- Tras crear una lista, se muestra «Lista creada correctamente» y se abre automáticamente su contenido. Las listas nuevas comienzan sin fijar.
- Editar reutiliza el formulario con los valores actuales y el botón «GUARDAR CAMBIOS». Editar no cambia películas, orden manual, filtros ni estado de fijación.

**Paleta e identificación**
- Paleta compartida de ocho colores identificativos: Azul `#70AEE0`, Turquesa `#58ADA5`, Verde `#79A982`, Amarillo `#D4B15F`, Naranja `#D68C61`, Coral `#CC7F87`, Violeta `#A18AC7` y Gris `#9199A4`.
- Los colores pueden reutilizarse libremente entre listas. El color se muestra de forma discreta junto al nombre y en los detalles, sin alterar los colores de los pósteres.

**Gestionar listas**
- Pantalla principal con tarjetas horizontales en una columna: collage automático de pósteres a la izquierda y nombre, descripción, contador y estado de fijación a la derecha.
- El collage representa siempre la colección completa; no cambia por búsqueda, filtros ni ordenación. Se actualiza cuando cambia la pertenencia de películas y utiliza únicamente imágenes disponibles localmente o descargadas legítimamente de TMDB.
- La tarjeta abre el contenido de la lista al pulsarla. El menú de tres puntos y el control de arrastre tienen acciones independientes.
- Menú de tres puntos: «EDITAR», «FIJAR» o «DESFIJAR», y «ELIMINAR». Las listas fijadas muestran una chincheta discreta. Fijar/desfijar actúa inmediatamente, sin confirmación.
- Las listas fijadas aparecen antes de las no fijadas. Cada grupo conserva su propio orden manual. Solo se pueden arrastrar listas dentro del mismo grupo; para cambiar de grupo se usa «FIJAR» o «DESFIJAR».
- Al eliminar una lista se solicita confirmación con su nombre y «CANCELAR»/«ELIMINAR». La eliminación es definitiva en el MVP avanzado y solo elimina la lista y sus asociaciones. Después se vuelve a «Gestionar listas», se muestra «Lista eliminada correctamente» y se conserva la posición de desplazamiento cuando sea posible.

**Contenido de una lista**
- Presentación en cuadrícula de tres columnas con pósteres verticales 2:3, sin texto superpuesto.
- El encabezado muestra nombre, descripción y color identificativo cuando existan.
- Se muestra el total de películas que pertenecen a la lista. Con filtros activos se distingue «X de Y» (coincidencias de filtros) y con búsqueda se muestra aparte el número de resultados. Los filtros nunca cambian el total de pertenencia.
- Las búsquedas, los filtros y las ordenaciones no cambian el collage ni la pertenencia real de las películas.
- El menú de tres puntos dentro de la lista repite «EDITAR», «FIJAR»/«DESFIJAR» y «ELIMINAR».
- Después de eliminar desde el contenido, se vuelve a «Gestionar listas», se muestra el mensaje de éxito y se mantiene la posición de desplazamiento cuando sea posible.

**Añadir y quitar películas**
- «AÑADIR PELÍCULAS» abre la búsqueda de Prisma y permite seleccionar varias películas. Cada resultado muestra póster, título, año y casilla. Toda la fila permite seleccionar o deseleccionar.
- Las películas que ya pertenecen a la lista aparecen como «AÑADIDA» y no se pueden seleccionar de nuevo. Un contador refleja las selecciones y un botón fijo en la parte inferior muestra «AÑADIR A LA LISTA»; está deshabilitado cuando no hay selección.
- Al confirmar, todas las películas posibles se incorporan en una operación, se añaden al final del orden manual, se actualiza el collage y se muestra «N películas añadidas correctamente». Si algunas fallan, se informa cuáles se añadieron y cuáles no.
- Desde el flujo de añadir se puede reutilizar el alta manual general de Prisma. La película nueva se guarda localmente, se añade a la lista de origen y se regresa a su contenido; no pasa automáticamente a Historial ni Pendientes. Funciona sin conexión.
- Las películas de TMDB se guardan localmente con los metadatos disponibles y se incorporan solo a la lista elegida; no reciben automáticamente un estado Vista o Pendiente.
- Mantener pulsado un póster dentro de la lista abre un menú contextual con «ABRIR FICHA» y «QUITAR DE ESTA LISTA». Quitar elimina únicamente esa pertenencia, sin confirmación ni modificación de otros datos.

**Búsqueda, filtros y ordenación**
- Cada lista tiene buscador local independiente, instantáneo, sin conexión, que ignora mayúsculas, minúsculas y tildes y respeta los filtros activos.
- Los filtros son independientes por lista: Géneros, Año de estreno, País de producción, Duración, Idioma original y Calificación de TMDB. Se combinan mediante AND u OR cuando tenga sentido. Son filtros de visualización: no modifican la pertenencia.
- El panel de filtros reutiliza el Bottom Sheet común de Prisma, con «APLICAR» y «RESTABLECER FILTROS».
- El orden manual por arrastre se guarda y persiste. Las vistas temporales pueden ordenar por Título, Año, Duración, Fecha de estreno o Calificación de TMDB. No sobrescriben el orden manual; el arrastre solo está activo en Orden manual. Los valores desconocidos quedan al final y los empates conservan el orden manual.
- Los estados vacíos distinguen lista vacía, búsqueda sin resultados («No encontramos películas en esta lista») y filtros sin coincidencias («No hay coincidencias», con «RESTABLECER FILTROS»).
- Tras crear, añadir, quitar, editar o eliminar, los contadores y el collage se actualizan de acuerdo con las reglas anteriores.

### Listas inteligentes — idea futura
Se ha identificado la posibilidad de listas que incorporen o retiren películas automáticamente según reglas. Es una idea para evaluar después de 1.0.0; no tiene todavía especificación ni aprobación de alcance, y no se debe implementar ni comprometer para 1.0.0 sin una decisión posterior.

## 10. Estadísticas y comprensión de gustos

Estadísticas es uno de los pilares de Prisma. Debe incluir al menos:

- Películas vistas y total de visionados.
- Tiempo dedicado al cine.
- Géneros más vistos.
- Directores más frecuentes.
- Evolución de calificaciones.
- Actividad por meses y años.
- Preferencias por duración, país, idioma y otras características disponibles.

El usuario quiere «muchas más» estadísticas para conocerse como espectador. El conjunto detallado se concretará al diseñar esa sección.

Las observaciones deben explicar por qué se llega a cada conclusión y mostrar películas, puntuaciones y datos que la sustentan. Prisma no presenta hipótesis como hechos ni inventa conclusiones. Si la muestra es insuficiente, lo dice.

## 11. Espectro: recomendaciones inteligentes

Espectro es el algoritmo propio de Prisma.

- Aprende automáticamente del Historial, visionados repetidos, calificaciones, Pendientes, películas ocultadas y otros datos locales de uso que el propietario apruebe.
- El aprendizaje y el perfil permanecen en el dispositivo.
- Recomienda películas y explica brevemente por qué las recomienda.
- Cada explicación debe estar respaldada por datos reales, como películas, géneros, directores o puntuaciones.
- Las películas ocultas no aparecen en las recomendaciones habituales.
- Los modos Afinidad, Equilibrado y Exploración controlan el equilibrio entre similitud y descubrimiento.
- No se enviará el perfil personal a servicios externos ni se usará un modelo remoto para aprender del historial.

## 12. Películas añadidas manualmente y enriquecimiento con TMDB

- Se puede crear una película manualmente incluso sin conexión.
- El único dato obligatorio al crearla es el título.
- El año de estreno es opcional.
- Cuando haya internet, Prisma buscará completar su información con TMDB.
- Si hay varias coincidencias, se muestran opciones con datos para distinguirlas (por ejemplo, póster y año); el usuario elige.
- No se asocia automáticamente una coincidencia dudosa.
- El enriquecimiento nunca borra listas, visionados ni calificaciones personales.

## 13. TMDB y contenido externo

- TMDB es la fuente principal prevista para metadatos e imágenes.
- El usuario podrá introducir su API Read Access Token de TMDB en Ajustes.
- El token se cifra mediante AES-256-GCM con una clave AES de 256 bits generada y protegida por Android Keystore. Se utiliza GCM sin padding y una etiqueta de autenticación de 128 bits; el IV se genera aleatoriamente por el proveedor criptográfico en cada cifrado.
- DataStore conserva únicamente la versión del formato y los datos necesarios para recuperar el cifrado (IV y texto cifrado); nunca conserva el token en texto plano. Los tokens activo y pendiente de verificación se cifran por separado.
- La clave no requiere autenticación del usuario para cada operación. No se exige huella digital, rostro ni PIN en cada búsqueda. StrongBox se aprovecha cuando está disponible y es compatible, pero nunca es requisito para usar Prisma.
- **Transporte seguro:** todas las comunicaciones de Prisma usan HTTPS. Se exige TLS 1.2 como mínimo; TLS 1.3 se utiliza cuando el sistema y el servidor lo soportan. La validación del certificado y del nombre del servidor no se desactiva ni se sustituye por validadores propios.
- Android bloquea globalmente el tráfico HTTP sin cifrar mediante Network Security Configuration (`cleartextTrafficPermitted=false`), sin excepciones de producción.
- Se confía únicamente en las autoridades certificadoras del almacén de certificados del sistema. Certificados caducados, inválidos, autofirmados o con nombre de servidor incorrecto se rechazan. No se implementa Certificate Pinning.
- Nunca se acepta una redirección HTTPS a HTTP. Las peticiones autenticadas de la API rechazan redirecciones a otro origen y nunca reenvían el token Bearer a un host, esquema o puerto diferente. Las descargas de imágenes utilizan un cliente sin credenciales; sus redirecciones solo se aceptan si permanecen en HTTPS y superan la validación normal de certificados y nombre de servidor.
- El token descifrado solo existe en memoria durante la preparación y ejecución de la petición HTTPS autenticada a TMDB. Nunca se escribe en logs, trazas, analítica, archivos temporales, exportaciones ni copias de seguridad.
- Si la clave de Keystore falta, se invalida o no permite descifrar el token, Prisma no intenta recuperar el token por otros medios ni utiliza texto plano: solicita al usuario introducirlo de nuevo. Esta situación no afecta a las películas ni a los datos personales locales.
- El token y la clave criptográfica no se incluyen en el repositorio, APK, registros de Actions ni exportaciones cifradas.
- La app debe gestionar errores, límites y caídas temporales de TMDB.
- Al guardar un token, Prisma comprueba su validez cuando hay conexión. El token activo anterior no se sustituye hasta que el nuevo se haya verificado correctamente.
- Si el usuario intenta sustituir el token sin conexión, Prisma conserva el token anterior como activo y guarda el nuevo cifrado como pendiente de verificación. Al recuperar conexión, comprueba el nuevo token; si es válido, lo activa; si no lo es, conserva el anterior y permite corregir el nuevo. Si no había token activo, las consultas remotas permanecen deshabilitadas hasta validar uno.
- Un error de conexión o una indisponibilidad temporal del servicio no se presenta como token incorrecto. Los estados visibles distinguen «Token verificado», «Pendiente de verificación», «Token no válido» y «Error de conexión».
- El token no se muestra permanentemente después de guardarlo. Puede introducirse o sustituirse desde Ajustes; la eliminación requiere confirmación y borra tanto el token activo como el pendiente.
- Al eliminar el token se detienen las nuevas consultas autenticadas a TMDB, pero se conservan metadatos e imágenes ya guardados localmente.
- Sin token verificado, Prisma sigue permitiendo utilizar el diario local. Descubrir muestra un aviso discreto y no bloqueante para configurar TMDB, con acceso a Ajustes.
- Los metadatos y las imágenes que ya se descargaron se mantienen disponibles sin conexión, dentro de la capacidad de almacenamiento real del dispositivo.
- La autorización particular comunicada por el usuario incluye metadatos, imágenes y datos de disponibilidad de streaming procedentes de JustWatch vía TMDB, sin atribución adicional. Se conserva por separado en el documento de licencia.
- Cuando no hay un token verificado, Descubrir muestra un aviso horizontal discreto y no bloqueante: «Conecta TMDB» / «Configura tu token de TMDB para explorar el catálogo» / «CONFIGURAR TMDB». El aviso no bloquea la navegación ni el uso del diario local.
- El estado del token se comunica con los nombres uniformes «Token verificado», «Pendiente de verificación», «Token no válido» y «Error de conexión». Tras validarse correctamente se confirma «Token guardado y verificado». La eliminación requiere confirmación y elimina tanto el token activo como el pendiente.

## 14. Ajustes

### Ajustes incluidos en el MVP

- **Tema de apariencia:** Obsidiana es el tema inicial de una instalación nueva. El usuario puede cambiar manualmente entre Obsidiana y Cuarzo desde Ajustes. La selección se conserva localmente y se restaura al volver a abrir Prisma.
- API Read Access Token personal de TMDB, opcional. Se cifra con AES-256-GCM y una clave de Android Keystore; DataStore guarda solo el registro cifrado. No exige biometría para cada uso. Se verifica al configurarlo. Sin token o si la clave local deja de estar disponible, el diario sigue funcionando y las funciones remotas de TMDB permanecen deshabilitadas hasta introducir y verificar un token.

### Ajustes posteriores al MVP

- Diseño del Feed: cuadrícula de tres columnas o mosaico variado.
- Idioma de Prisma: se inicia con el idioma del teléfono y el usuario puede cambiarlo.
- Región de disponibilidad de «Dónde verla»: inicial «Todas las regiones»; se puede restringir a una región.
- «Ocultar spoilers»: desactivado por defecto. Al activarlo, oculta sinopsis, tráileres y otros contenidos que puedan revelar sorpresas.
- **Actualizaciones de Prisma:** desde Ajustes, el usuario puede pulsar «Buscar actualizaciones» para consultar manualmente la última versión estable publicada en GitHub Releases. Prisma no consulta actualizaciones automáticamente al abrir la aplicación ni en segundo plano. Si hay una versión nueva, muestra la versión y su changelog antes de ofrecer la descarga e instalación. Desde el mismo apartado se puede consultar el historial de versiones y el changelog de cada Release publicada. La instalación se completa mediante el instalador del sistema Android y respeta las autorizaciones o confirmaciones que este solicite.

El selector de tema queda especificado para Ajustes → Apariencia mediante un control segmentado de dos opciones: «Obsidiana» y «Cuarzo». El cambio se aplica inmediatamente y se conserva en DataStore; Obsidiana es el valor inicial cuando no existe una preferencia válida. La composición del resto de Ajustes se definirá cuando corresponda.

Los dos temas de apariencia reciben los nombres **Obsidiana** para el modo oscuro y **Cuarzo** para el modo claro. En Obsidiana están aprobados el fondo principal `#171A20`, la superficie elevada global `#242A35` (RGB 36, 42, 53) y su contorno global `#353535` de 1 px cuando no exista una regla particular de componente; el acento global está aprobado en `#70AEE0` (RGB 112, 174, 224), alternativa B. El azul `#5B9BD5` se conserva como referencia anterior y en componentes con especificaciones particulares ya aprobadas; el azul es la preferencia cromática general del propietario. Están aprobados el texto principal global `#F0F0F0`, el secundario global `#BDBDBD`, el auxiliar global `#9B9B9B`, el neutro global para iconos inactivos `#BDBDBD` (con la excepción particular de Personal `#D0D0D0`), el contenido de controles deshabilitados `#888888`, su superficie `#1D222B`, la superficie transitoria de pulsación `#2B303A` para elementos interactivos sobre `#242A35`, y los separadores internos `#353535` de 1 px; el contorno de los controles deshabilitados está aprobado sin línea visible (opción A) y no se aplica opacidad adicional (**100 %, opción A aprobada**). En Cuarzo están aprobados el fondo principal `#F4F1EA`, las superficies `#FFFFFF`, el contorno de superficie `#DDD8CE` de 1 px, el texto principal `#292B2F`, el texto secundario `#68655F`, el texto auxiliar `#706C64`, el acento principal `#356F9F`, el neutro para iconos inactivos `#8A857B`, el contenido (texto e iconos) de controles deshabilitados `#9D998F`, su superficie `#F0EDE6` y la ausencia de contorno visible en esos controles (opción A aprobada), los separadores internos `#E8E3DA` y la superficie transitoria de pulsación `#ECE7DE` para elementos interactivos sobre superficies blancas. La ausencia de contorno visible en los controles deshabilitados y la ausencia de opacidad adicional (**100 %**, opción A) están aprobadas. El grosor de los separadores internos está aprobado en **1 px** en ambos temas y su separación respecto al contenido adyacente es de **8 px por encima y 8 px por debajo (alternativa A aprobada)**; otros neutros no definidos, otros bordes y otros estados permanecen pendientes. La selección inicial en Obsidiana, el cambio manual entre Obsidiana y Cuarzo desde Ajustes y la persistencia local de esa preferencia están aprobados y descritos en la sección 14; solo queda concretar la presentación visual del selector.

El idioma de la interfaz y la región de disponibilidad son preferencias independientes.

## 15. Spoilers

- «Ocultar spoilers» empieza desactivado.
- Cuando se activa, no se muestran sinopsis, tráileres ni otros contenidos considerados propensos a revelar sorpresas.
- La protección debe ser conservadora y no prometer que el texto externo está libre de spoilers si no puede comprobarse.
- El usuario puede cambiar la opción en Ajustes.

## 16. Copias de seguridad y restauración

Las copias cifradas forman parte del MVP porque Prisma es local-first y no tiene sincronización en la nube: proteger los datos del usuario es una condición de uso fiable, no un extra.

**Política aprobada de copias del sistema:** Prisma desactiva Android Auto Backup por completo. El manifiesto utiliza `android:allowBackup="false"` y reglas de exclusión explícitas para evitar tanto la copia en nube como la transferencia directa entre dispositivos. En API 26–30 se configura `android:fullBackupContent` con exclusión de todos los datos de la aplicación; en API 31 o superior se configura `android:dataExtractionRules` con exclusiones separadas para `cloud-backup` y `device-transfer`, y para cualquier modalidad de transferencia multiplataforma que el sistema admita. `allowBackup="false"` por sí solo no se considera suficiente para bloquear D2D en todos los fabricantes. Se probará la configuración en ambas generaciones de reglas y en transferencias compatibles. No se incluyen datos de Prisma en restauraciones automáticas del sistema.

La única copia de seguridad portable gestionada por el usuario es el archivo versionado `.prisma`, cifrado y exportado manualmente desde Prisma. El usuario elige su destino mediante el selector de archivos de Android; guardar manualmente el archivo en un proveedor elegido por el usuario no activa sincronización propia ni copia automática de Prisma. La aplicación debe explicar que, si se pierde o desinstala el dispositivo sin una copia manual disponible, Android no restaurará automáticamente los datos de Prisma.

- Prisma permite exportar manualmente un archivo versionado y cifrado con una contraseña elegida por el usuario; el formulario solicita contraseña y confirmación, permite mostrar/ocultar y nunca guarda ni transmite la contraseña.
- El cifrado debe autenticar el contenido. El diseño técnico prevé derivación de clave con KDF y sal aleatoria, y AES-256-GCM con nonce aleatorio. Los parámetros concretos se fijarán antes de implementar.
- La copia incluye Historial, todos los visionados, fechas, horas cuando existan, calificaciones personales, Pendientes, Ocultos, listas personalizadas, preferencias portables y datos de aprendizaje de Espectro cuando estén disponibles. Incluye metadatos persistentes e imágenes guardadas localmente que el usuario espera recuperar. Excluye cachés temporales regenerables, credenciales y API tokens.
- La copia puede restaurarse en otro teléfono con su contraseña. Si se pierde la contraseña, no se puede recuperar.
- El archivo tiene formato versionado. Una copia anterior compatible se migra antes de restaurarse; una versión futura no compatible se rechaza sin alterar los datos actuales.
- La restauración verifica contraseña, autenticidad, integridad, estructura y compatibilidad antes de modificar los datos. Muestra un resumen de la copia y advierte que sustituirá los datos actuales.
- Antes de restaurar se crea un respaldo temporal interno de los datos actuales. La aplicación verifica el resultado; si falla la operación, recupera el estado anterior y conserva el respaldo temporal mientras exista duda. No se permiten restauraciones parciales.
- Una contraseña incorrecta y un archivo dañado pueden mostrar el mismo mensaje de verificación fallida. El archivo original y los datos actuales permanecen intactos.
- La exportación verifica que el archivo se haya escrito y sea legible antes de confirmar el éxito. Un error, cancelación o falta de espacio no modifica los datos originales; no se eliminan archivos del usuario para liberar espacio.
- El almacenamiento de destino se elige mediante el selector de archivos de Android. La carpeta predeterminada puede conservarse con el permiso persistente concedido por el sistema. Ese permiso no se exporta: en el mismo teléfono se conserva la carpeta actual y en otro dispositivo se configura una ubicación nueva.
- Se propone el nombre `Prisma_copia_AAAA-MM-DD.prisma`; si ya existe, se añade un sufijo incremental (`_2`, `_3`, etc.). El usuario puede cambiar el nombre.
- La contraseña perdida no se puede recuperar. No se usa una nube propia ni sincronización automática.
- Los datos privados de Prisma quedan excluidos de las copias del sistema Android y de las transferencias automáticas entre dispositivos; únicamente se recuperan mediante una copia `.prisma` creada manualmente.

### Interacción y estados de exportación
- Antes de crear la copia, Prisma muestra un tamaño estimado que incluye los datos, metadatos e imágenes que se exportarán. No existe un límite artificial de tamaño.
- El progreso distingue «Preparando copia», «Cifrando copia» y «Guardando copia». Solo después de escribir y verificar el archivo se muestra «Copia creada correctamente».
- El usuario puede cancelar durante cualquier etapa de creación. Prisma detiene el proceso de forma segura, elimina el archivo incompleto cuando sea posible y muestra «Creación de copia cancelada». Los datos originales y las copias anteriores no se modifican.
- Si no hay espacio suficiente, se muestra «Espacio insuficiente», con la posibilidad de volver a intentar, cambiar la ubicación o liberar espacio. Prisma no elimina automáticamente archivos del usuario.
- Si el archivo no supera la verificación final, se muestra «No se pudo verificar la copia» y no se considera válido. Prisma intenta eliminar el archivo defectuoso cuando sea seguro; si no puede, informa al usuario. Las demás copias y los datos originales permanecen intactos.
- Si la carpeta predeterminada deja de estar disponible o pierde el permiso, Prisma solicita seleccionar otra ubicación; no presupone que el permiso pueda recuperarse.

### Interacción y estados de restauración
- Antes de restaurar, el resumen muestra fecha de creación, versión de Prisma y cantidades de películas, visionados y listas, además de los grupos de datos incluidos. No expone credenciales ni tokens.
- El progreso distingue «Verificando copia», «Protegiendo datos actuales», «Restaurando datos» y «Verificando restauración».
- Se puede cancelar durante la verificación inicial. Una vez iniciada la sustitución, no se interrumpe arbitrariamente: la operación termina o ejecuta la recuperación segura desde el respaldo temporal.
- Si la contraseña no es correcta o el archivo está dañado, se muestra «No se pudo abrir la copia», con opción de volver a intentarlo. No se modifica ningún dato actual.
- Si una migración falla, se detiene la restauración completa. No se permite una restauración parcial; se conservan los datos actuales y el archivo original.
- Si la restauración termina y la verificación es correcta, se muestra «Copia restaurada correctamente». El respaldo temporal solo se elimina cuando se ha comprobado que el nuevo estado está completo y es válido.

## 17. Primera versión funcional — MVP

**Propósito:** entregar primero un diario cinematográfico personal, fiable y utilizable, con el menor conjunto de capacidades que permita registrar películas, mantener un historial, organizar lo pendiente y proteger los datos. El MVP no equivale a un prototipo desechable ni a la versión completa **1.0.0**; se publica como una versión **0.x.y** cuando sus criterios estén cumplidos.

### Incluido en el MVP

1. **Base Android:** aplicación nativa, navegación Personal/Descubrir, temas Obsidiana y Cuarzo con paridad funcional y visual, arquitectura mantenible y almacenamiento local sin cuenta ni backend propio.
2. **Catálogo local y alta manual:** se puede crear una película sin conexión con título obligatorio y año de estreno opcional. El modelo local permite vincularla posteriormente a un registro de TMDB sin duplicarla ni perder datos personales.
3. **TMDB esencial:** configuración segura del API Read Access Token, búsqueda por título, elección supervisada cuando haya coincidencias ambiguas y consulta de datos básicos (póster, título, año, sinopsis, géneros y duración cuando existan). No requiere TMDB para usar el diario local; la ausencia de conexión o token no bloquea Personal.
4. **Diario cinematográfico:** Historial, Pendientes y Ocultos; varios visionados independientes por película; fecha/hora de inicio cuando se conozca; calificación personal por visionado; ocultar y restaurar conservando el estado anterior.
5. **Búsqueda local:** encontrar películas ya guardadas en el dispositivo sin conexión. Las consultas remotas a TMDB se distinguen de los resultados locales.
6. **Listas personalizadas manuales básicas:** crear, renombrar, eliminar, añadir y quitar películas, sin duplicados. Se conservan las reglas de nombre y descripción de la sección 9. No incluye la administración avanzada de colecciones.
7. **Funcionamiento sin conexión:** consultar y modificar el diario y las listas básicas con datos guardados localmente. Los datos remotos ya descargados se mantienen disponibles según la capacidad real del dispositivo; no se simulan resultados remotos cuando no hay conexión.
8. **Copias cifradas y restauración segura:** exportación/importación manual de un archivo versionado, protección mediante contraseña, verificación de integridad, resumen previo, respaldo temporal y recuperación ante fallos. Las copias automáticas de Android y las transferencias automáticas entre dispositivos permanecen desactivadas. Es un criterio de salida del MVP porque los datos personales viven en el dispositivo.
9. **Entrega instalable:** APK distribuido mediante GitHub Releases, versión SemVer y changelog obligatorio en español. Durante el MVP, el APK se instala o actualiza mediante el procedimiento manual documentado de Android; el actualizador integrado se desarrolla después.

### Fuera del MVP — posterior al MVP

- Estadísticas, gráficos y análisis de gustos.
- Espectro: aprendizaje y recomendaciones personalizadas locales y explicables.
- Gestión avanzada de listas: paleta de colores, collages, fijación, reordenación avanzada, ordenaciones temporales, filtros y contadores avanzados.
- Filtros y ordenaciones avanzados de Historial, Pendientes y Ocultos, y presentaciones alternativas que no sean necesarias para el recorrido esencial.
- Feed avanzado, modos Equilibrado/Afinidad/Exploración, paginación y filtros complejos.
- Ficha cinematográfica completa: créditos detallados, tráileres, colecciones, películas relacionadas y otros datos ampliados.
- Información ampliada de plataformas de streaming por región.
- Actualizador integrado, descarga desde la aplicación e historial de versiones/changelogs dentro de Prisma.
- Idiomas adicionales y configuración avanzada de región, así como protección avanzada de spoilers, conforme se prioricen para 1.0.0.
- Cuentas, funciones sociales, sincronización en nube o backend propio. Series y episodios quedan fuera del alcance inicial.

### Recorrido mínimo que debe funcionar

**Añadir manualmente una película o encontrarla con la búsqueda básica de TMDB → guardarla en Pendientes → registrar uno o varios visionados con fecha y calificación → encontrarla en Historial → ocultarla y restaurarla conservando su estado → consultar y modificar los datos sin conexión → crear una copia cifrada y poder restaurarla → crear una lista manual y añadir/quitar películas.**

### Criterios de aceptación específicos de Descubrir (MVP)

Los siguientes escenarios complementan los criterios generales del MVP. Deben comprobarse con datos locales reales y con respuestas remotas controladas; no basta con que la pantalla compile.

1. **Estado inicial:** al abrir Descubrir con la consulta vacía se muestra la ilustración sencilla, «Busca una película» y «AÑADIR PELÍCULA MANUALMENTE». La acción reutiliza el alta manual existente y funciona sin conexión.
2. **Búsqueda local inmediata:** al escribir una consulta, se buscan películas guardadas en Historial, Pendientes y Ocultos sin exigir pulsar Enter. Los resultados locales aparecen inmediatamente y no dependen de Internet ni de TMDB.
3. **Lista unificada:** cuando la consulta remota está disponible, sus resultados se incorporan a la misma lista continua que los locales. No se muestran encabezados, pestañas ni bloques separados por procedencia. Todas las filas mantienen póster, título y año; únicamente las películas ya guardadas muestran «En tu Prisma» junto al año.
4. **Relevancia y deduplicación:** el conjunto respeta la relevancia de búsqueda; ante empate se prioriza el registro local. Dos registros con el mismo identificador TMDB estable no producen dos filas. El orden permanece estable mientras la consulta no cambie.
5. **Sin guardado implícito:** consultar una película remota no la incorpora automáticamente a la biblioteca, Historial ni Pendientes. Guardarla requiere una acción explícita del usuario.
6. **Carga remota:** solo cuando hay acceso a Internet y token verificado se ejecuta la búsqueda remota. Mientras está activa aparece un spinner discreto dentro de la barra, a la derecha; no se abre pantalla o panel de carga y los resultados locales permanecen visibles. El teclado se mantiene abierto mientras el usuario escribe.
7. **Sin resultados:** solo se muestra «No encontramos películas» cuando todas las fuentes disponibles terminaron correctamente y ninguna devolvió coincidencias. Se muestra «Prueba con otro título.» y «AÑADIR PELÍCULA MANUALMENTE»; la consulta permanece editable. La falta de conexión, token o un fallo remoto nunca se interpreta como cero resultados globales.
8. **Error remoto con resultados locales:** las filas locales se conservan. Debajo de la lista se muestra «No se pudo consultar TMDB», «No pudimos completar la búsqueda remota.» y «REINTENTAR». El reintento es manual y utiliza la consulta vigente.
9. **Error remoto sin resultados locales:** se muestra el estado diferenciado «No se pudo consultar TMDB», «No pudimos completar la búsqueda. Inténtalo de nuevo.», «REINTENTAR» y «AÑADIR PELÍCULA MANUALMENTE». No se confunde con «No encontramos películas».
10. **Sin conexión:** no se envía petición remota ni se muestra spinner. Con resultados locales, estos permanecen visibles y aparece «Sin conexión a Internet». Sin coincidencias locales, se muestra el estado offline aprobado y el alta manual, no el estado sin resultados ni el error de TMDB.
11. **Recuperación de conexión:** si la consulta sigue vigente y existe token verificado, recuperar el acceso a Internet inicia una única nueva búsqueda remota. Los resultados locales no desaparecen y notificaciones repetidas de conectividad no generan peticiones duplicadas.
12. **Sin token verificado:** se reutiliza el aviso no bloqueante «Conecta TMDB» / «Configura tu token de TMDB para explorar el catálogo» / «CONFIGURAR TMDB». La búsqueda local sigue disponible, no aparece spinner ni se consulta TMDB. Si el token se verifica y la consulta sigue vigente con conexión, se ejecuta una única búsqueda remota.
13. **Estados del token:** «Token verificado», «Pendiente de verificación», «Token no válido» y «Error de conexión» conservan significados distintos. Al sustituir un token, el anterior verificado sigue activo hasta que el nuevo se valide correctamente.
14. **Cambio rápido de consulta:** ninguna respuesta ni error perteneciente a una consulta anterior se incorpora a la consulta vigente. Se invalidan operaciones obsoletas y se cancelan cuando sea posible.
15. **Borrado de consulta:** al vaciar el campo se eliminan los resultados mostrados y los estados contextuales de esa búsqueda, pero no se borran películas guardadas. Se vuelve al estado inicial, se descartan respuestas tardías, no se ejecutan búsquedas con campo vacío y se conservan foco y teclado.
16. **Paridad entre temas:** todos los escenarios anteriores tienen el mismo comportamiento en Obsidiana y Cuarzo; solo cambia la adaptación visual de cada tema.
17. **Privacidad:** las peticiones de búsqueda transmiten únicamente la consulta y los identificadores necesarios a TMDB. No se envía Historial, listas, calificaciones ni el perfil local de Espectro.

### Criterios generales de aceptación del MVP

- El recorrido anterior funciona de principio a fin con datos reales y sin información inventada.
- Las películas no se duplican al vincular una entrada manual con TMDB ni al cambiar entre Pendientes, Historial y listas.
- Los visionados múltiples conservan sus propias fechas y calificaciones.
- Los datos persisten tras cerrar y volver a abrir la aplicación.
- El diario y las listas básicas se pueden consultar y modificar sin conexión; las operaciones remotas indican claramente cuándo necesitan Internet.
- El usuario puede exportar una copia cifrada, verificarla y restaurarla. Se prueban contraseñas incorrectas, archivos dañados, versiones incompatibles, falta de espacio, cancelación y recuperación ante fallos sin pérdida de los datos anteriores.
- Las credenciales y API tokens nunca aparecen en copias ni registros.
- Obsidiana y Cuarzo tienen la misma cobertura funcional y calidad.
- Cada entrega distribuida tiene versión, APK y changelog en español. No se exige un actualizador dentro de la aplicación para el MVP.
- El propietario instala el APK y prueba los recorridos críticos en Android antes de aprobar la entrega.


## 18. Alcance previsto de la versión 1.0.0

La versión **1.0.0** será la primera versión completa de Prisma. Incluirá todo el MVP y, además, las capacidades aprobadas que se desarrollarán después del MVP:

- Experiencia cinematográfica completa: ficha ampliada, créditos, tráileres, colecciones, películas relacionadas y disponibilidad de streaming cuando existan fuentes autorizadas.
- Descubrir avanzado: Feed completo, modos de contenido, filtros y presentación aprobada.
- Gestión avanzada de listas personalizadas y organización avanzada de Historial, Pendientes y Ocultos, según las especificaciones aprobadas.
- Estadísticas completas y visualizaciones basadas en datos locales.
- Espectro: aprendizaje local, recomendaciones personalizadas explicables y evidencias de sus conclusiones.
- Actualizador integrado desde Ajustes, consulta manual de Releases, changelog e historial de versiones, descarga e instalación delegada al sistema Android.
- Configuración de idioma, región y protección de spoilers que quede aprobada para la versión completa.
- Pruebas integrales de privacidad, seguridad, rendimiento, accesibilidad, migraciones, funcionamiento offline y restauración.

Las listas inteligentes que añaden o retiran películas automáticamente quedan como idea futura posterior a 1.0.0, pendiente de investigación, especificación y aprobación expresa. No forman parte del compromiso de 1.0.0 por ahora.

La lista se considera viva mientras el propietario siga precisando el producto. No se debe reducir el alcance completo de 1.0.0 sin su aprobación explícita.

## 19. Decisiones confirmadas y cuestiones abiertas

### Confirmado
Las reglas descritas en las secciones anteriores han sido aprobadas por el propietario. Las capacidades clasificadas como «posterior al MVP» siguen siendo decisiones de producto aprobadas; su aplazamiento no las elimina ni las incorpora al MVP.

- Identidad Android aprobada: `applicationId` y `namespace` serán ambos `dev.elfast.prisma`. Deben mantenerse estables para conservar la identidad de las instalaciones y sus actualizaciones.
- Nivel mínimo de Android aprobado: `minSdk = 26` (Android 8.0 Oreo). Esta decisión define la versión mínima compatible y es independiente del `targetSdk`.
- SDK objetivo inicial aprobado: `targetSdk = 37` (Android 17). Se mantiene independiente del nivel mínimo (`minSdk`) y deberá revisarse ante cambios de compatibilidad o requisitos de distribución antes de cada publicación.
- Estrategia de `versionCode` aprobada: contador secuencial único para las versiones distribuidas. El primer APK público tendrá código `1`; cada nueva Release distribuida incrementará el valor en una unidad, incluidas las correcciones. El contador nunca se reutiliza ni se reinicia entre fases o al llegar a `1.0.0`. `versionName` conserva la secuencia SemVer y es independiente. Se adopta `2.100.000.000` como límite máximo operativo de seguridad. Las compilaciones internas usarán una variante de aplicación separada y no consumirán ni reutilizarán la secuencia de producción.
- Estrategia de firma de producción aprobada: almacén JKS con clave privada RSA de 4096 bits, firma SHA-256 con RSA y vigencia de 30 años. La clave y sus contraseñas se mantendrán fuera del repositorio y de los APK; se conservarán dos copias cifradas en ubicaciones físicas independientes, con las contraseñas custodiadas por separado en un gestor de contraseñas. La publicación se firmará mediante un trabajo protegido de GitHub Actions, en el entorno `production`, con aprobación manual y secretos limitados a ese trabajo. Se verificará el APK con `apksigner` y se comparará la huella SHA-256 del certificado con la registrada para Prisma. Las compilaciones internas tendrán identidad y firma separadas. La clave no se rotará como operación rutinaria.

### Decisiones abiertas — backlog P2/P3

Estos puntos no bloquean Fase 0 ni se incorporan automáticamente al MVP. Se resolverán antes de implementar la capacidad correspondiente y se mantendrán priorizados en `ROADMAP.md`.

| Prioridad | Decisión pendiente | Fase objetivo y momento de resolución |
|---|---|---|
| P2 | Posición, separación y composición final de los cuatro estados vacíos de Descubrir y ubicación exacta del aviso «Conecta TMDB». | Fase 3, antes de implementar los estados visuales afectados. |
| P2 | Precedencia cuando coinciden condiciones de Descubrir (por ejemplo, sin conexión y sin token; pérdida de conexión durante una petición). | Fase 3, antes de implementar la coordinación de estados remotos. |
| P2 | Puntuación exacta y desempates del conjunto de resultados locales y remotos. | Fase 3, antes de cerrar el orden de la búsqueda combinada. |
| P2 | Presentación mínima de Gestionar listas y del contenido de una lista en el MVP. | Fase 2, antes de implementar esas pantallas; no habilita gestión avanzada. |
| P2 | Regla para elegir entre fechas de estreno de TMDB por país y presentación de visionados cuando se desconoce la hora. | Fase 2 para los registros de visionado; Fase 3 para la selección de fecha de estreno de TMDB. |
| P2 | Composición visual y estados de la navegación principal Personal/Descubrir, conservando las propiedades ya aprobadas de la píldora. | Fase 1, antes de implementar la navegación. |
| P2 | Dimensiones, acabado visual y estados de la pantalla raíz de Personal, conservando exactamente los cuatro accesos aprobados. | Fase 1, antes de implementar esa pantalla. |
| P2 | KDF, sal, parámetros de AES-256-GCM, encabezado y formato versionado del archivo de copias. | Fase 4, antes de implementar exportación/restauración. |
| P2 | Fuentes y condiciones autorizadas para tráileres, enlaces rápidos y puntuaciones externas. | Fase 6, antes de integrar cada fuente; la autorización de TMDB no sustituye permisos de terceros. |
| P2 | Presentación y navegación de Colecciones desde la ficha. | Fase 6, antes de implementar esa experiencia. |
| P2 | Métricas, gráficos y visualizaciones exactas de Estadísticas. | Fase 7, antes de implementar Estadísticas. |
| P2 | Señales, pesos, umbrales, muestra mínima y explicación detallada de Espectro. | Fase 7, antes de implementar aprendizaje y recomendaciones. |
| P3 | Idiomas adicionales y detalle del selector de idioma. El MVP mantiene la interfaz en español. | Fase 6, solo si se aprueba ampliar la localización. |
| P3 | Si el actualizador ofrece solo Releases estables o también *pre-releases*. Recomendación inicial: mostrar solo versiones estables. | Fase 8, antes de implementar el actualizador. |
| P3 | Diseño y comportamiento del distintivo/indicador de actualización disponible y sus estados. | Fase 8, antes de implementar el actualizador. |

### Puerta operativa P1 previa al primer APK público

Estas tareas no son decisiones abiertas ni bloquean Fase 0, pero sí bloquean la primera publicación pública de producción:

- Generar la clave de firma de producción conforme a la estrategia aprobada.
- Crear dos respaldos cifrados en ubicaciones físicas independientes y comprobar su recuperación.
- Registrar la huella SHA-256 del certificado y configurar el entorno protegido y los secretos de GitHub Actions.
- Verificar una actualización firmada sobre una instalación previa y demostrar que conserva los datos locales.

Una cuestión abierta no autoriza al equipo a inventar una regla; debe resolverse en la fase correspondiente y actualizar el documento.
