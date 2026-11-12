# Diseño técnico — Prisma

**Estado:** diseño técnico preliminar; las decisiones se verificarán y concretarán en la especificación de cada fase.  
**Revisión:** 0.3.7.  
**Última actualización:** 9 de noviembre de 2026.  
**No implica autorización para programar.**

## 1. Objetivo técnico

Construir una aplicación Android nativa, mantenible, comprobable y offline-first. El dispositivo será la fuente de verdad de los datos personales. TMDB será una fuente remota de metadatos, imágenes y disponibilidad, nunca el dueño del historial del usuario.

Las decisiones se basan primero en las recomendaciones oficiales de Android. Las versiones exactas de Gradle, Kotlin, Android Gradle Plugin, SDK y bibliotecas se comprobarán y fijarán al preparar la especificación de la fase que vaya a usarlas; no se copiarán números de versión antiguos.

## 2. Plataforma y lenguaje

- **Lenguaje:** Kotlin.
- **Identidad Android aprobada:** `applicationId = "dev.elfast.prisma"` y `namespace = "dev.elfast.prisma"`. Ambos valores se mantienen iguales y estables; no se modifican después de distribuir la aplicación. El `applicationId` identifica la aplicación para Android y debe conservarse para que las actualizaciones se reconozcan como la misma app.
- **Interfaz:** Jetpack Compose y Material 3.
- **Tipografía de interfaz:** familia **Inter**, seleccionada como identidad tipográfica global de Prisma. El tamaño de referencia para el texto normal de lectura continua es **16 px**, para el texto secundario es **14 px**, para el texto auxiliar es **12 px** y para los títulos de sección es **22 px**; los pesos aprobados para la familia son **400, 500 y 600**. Estos valores no sustituyen los tamaños específicos de componentes ya aprobados. Inter se incorporará como recurso local dentro de la aplicación, no como fuente descargada en tiempo de ejecución, para mantener la presentación disponible sin conexión y consistente entre dispositivos. El texto normal de **16 px** utiliza peso **regular (400)**, altura de línea de **24 px** y espaciado entre caracteres (*letter spacing*) de **0 px adicionales**; el texto secundario de **14 px** utiliza peso **regular (400)**, altura de línea de **20 px** y espaciado entre caracteres (*letter spacing*) de **0 px adicionales**; el texto auxiliar de **12 px** tiene una altura de línea de **18 px**, utiliza peso **regular (400)** (opción A aprobada) y mantiene espaciado entre caracteres (*letter spacing*) de **0 px adicionales** (opción A aprobada), conservando el espaciado natural de Inter; los títulos de sección de **22 px** utilizan peso **medio (500)**, altura de línea de **28 px** y espaciado entre caracteres (*letter spacing*) de **0 px adicionales**. La escala global actual comprende estos cuatro niveles y se considera suficiente por ahora; solo se ampliará si una necesidad concreta del producto lo justifica. La versión concreta y los archivos de fuente se fijarán en la especificación técnica de implementación, conservando la licencia SIL OFL 1.1.
- **Navegación:** una sola Activity; se evaluará Navigation 3 si su versión estable y su integración cumplen los requisitos al iniciar la fase de navegación.
- **Concurrencia:** Kotlin Coroutines y Flow.
- **Estado de interfaz:** ViewModel, StateFlow y flujo unidireccional de datos.
- **Inyección de dependencias:** Hilt, salvo que la verificación de compatibilidad vigente muestre una razón técnica para escoger otra alternativa.
- **Nivel mínimo de Android aprobado:** `minSdk = 26` (Android 8.0 Oreo). Se configura como límite mínimo de instalación; esta decisión es independiente del `targetSdk` y no constituye por sí sola una garantía de seguridad del dispositivo.
- **SDK objetivo aprobado:** `targetSdk = 37` (Android 17). Es independiente de `minSdk = 26`. Antes de cada publicación se comprobará que el nivel siga cumpliendo los requisitos de distribución y compatibilidad vigentes.

Jetpack Compose es el toolkit moderno recomendado por Android para aplicaciones nuevas. La arquitectura se organizará por capas con repositorios y una única fuente de verdad.

## 2.1 Unidades de diseño e implementación

- **Dimensiones y geometría de interfaz:** se implementan en `dp` (`Dp` de Compose). Incluye anchos, alturas, tamaños de componentes e iconos, márgenes, rellenos, separaciones, radios de esquina, contornos y grosores de trazo.
- **Tipografía:** se implementa en `sp` (`TextUnit.sp` de Compose). Incluye tamaños de fuente, alturas de línea y espaciado entre caracteres.
- **Trazos vectoriales y dibujo personalizado:** su medida de diseño se define en `dp`. Cuando una API de dibujo de bajo nivel requiera píxeles, la conversión se realiza mediante la densidad de Compose en el límite de dibujo; no se introducen valores de píxeles físicos en las especificaciones.
- **Conservación de valores:** las cifras numéricas existentes en `REQUISITOS.md` y `ESTADO_VISUAL.md`, actualmente escritas con la notación `px`, son magnitudes nominales de diseño y no píxeles físicos. Se conserva su valor numérico al mapear cada propiedad a `dp` o `sp`; por ejemplo, una separación nominal de 16 se implementa como 16 dp y un texto nominal de 16 como 16 sp.
- **Recursos rasterizados:** `px` se reserva para las dimensiones intrínsecas de archivos de imagen y mapas de bits, no para dimensionar los componentes de la interfaz.
- Compose y Android gestionan la densidad de pantalla al representar `dp`, y la escala de fuente del usuario al representar `sp`. No se multiplica manualmente el valor de diseño por la densidad del dispositivo.
- Esta regla conserva todos los números y excepciones de diseño ya aprobados. No modifica por sí sola tamaños, proporciones, radios, grosores ni la apariencia de ningún componente.


## 3. Arquitectura de la aplicación

Capas:

1. **Presentación (UI):** pantallas Compose, componentes visuales, navegación y ViewModels. No consulta directamente Room ni HTTP.
2. **Dominio:** reglas de negocio y casos de uso cuando la complejidad/reutilización lo justifique; aquí se ubicarán las reglas de visionados, estados de lista, puntuaciones, Espectro y estadísticas.
3. **Datos:** repositorios que coordinan la base local, caché de imágenes, preferencias y fuente de red TMDB.

Reglas:

- La UI observa estado; no contiene reglas de negocio complejas.
- La UI y el dominio no llaman directamente a TMDB.
- Los repositorios coordinan las fuentes y actualizan la fuente local.
- La información personal se lee siempre desde la base local.
- Los cambios importantes se expresan como casos de uso transaccionales para evitar estados contradictorios.
- Coroutines/Flow y actualización de estado unidireccional facilitan pruebas y coherencia.

## 3.1 Calidad, mantenibilidad y auditoría del código

La calidad técnica se verifica durante el desarrollo, no solo al final. Antes de ampliar una capacidad importante y antes de cerrar cada fase se revisan, como mínimo:

- Separación de responsabilidades y dependencias entre presentación, dominio y datos.
- Cohesión, acoplamiento, duplicación, complejidad accidental, código muerto y claridad de nombres.
- Consistencia del modelo local, restricciones, transacciones, migraciones y protección contra pérdida/corrupción.
- Ciclo de vida Android, concurrencia, navegación, estado de UI y paridad funcional de Obsidiana/Cuarzo.
- Seguridad, privacidad, permisos, almacenamiento, red, secretos y dependencias.
- Compilación, análisis estático, advertencias, pruebas unitarias/instrumentadas, regresión y CI.

Los hallazgos se documentan con archivo/ruta, evidencia, impacto, severidad y una forma de reproducirlos. P0 corresponde a seguridad, privacidad o pérdida/corrupción de datos; P1 a fallos críticos o arquitectura que impide cumplir requisitos; P2 a deuda técnica y mantenibilidad importante; P3 a pulido no bloqueante. No se declara una fase lista con P0/P1 abiertos.

Si los problemas están extendidos, se compara corregir localmente, refactorizar progresivamente o reconstruir de forma limpia. La instrucción expresa del propietario autoriza condicionalmente iniciar una reconstrucción limpia cuando la auditoría demuestre con evidencia que los cimientos están comprometidos y que reconstruir es más seguro o mantenible que reparar. En ese caso, la IA puede comenzar la nueva implementación en una rama aislada, paralela y no destructiva, sin pedir otra aprobación para iniciar ese trabajo. Esta autorización condicional **no** permite borrar, sobrescribir, abandonar, fusionar ni sustituir la implementación existente. La rama y el trabajo anteriores, los datos, los artefactos y los puntos de recuperación deben conservarse intactos. Después de comparar ambas implementaciones y validar la nueva frente a los requisitos y pruebas, la IA debe presentar los resultados y obtener aprobación expresa del propietario antes de integrar la reconstrucción o retirar la versión anterior. Si la auditoría no alcanza ese umbral, debe corregir o refactorizar de forma incremental y no reiniciar por preferencia personal.

Una reconstrucción autorizada debe mantener el alcance aprobado, decisiones visuales, restricciones y exclusiones; no habilita funciones nuevas. Debe preservar o migrar los datos de forma verificable, compilar y probar cada incremento, superar los criterios de aceptación y regresión y conservar una vía de recuperación hasta validar la sustitución.

No se puede prometer ausencia absoluta de errores en todo dispositivo y condición. El estándar de entrega es no tener defectos P0/P1 conocidos abiertos, superar las verificaciones y pruebas aplicables, investigar advertencias relevantes y declarar claramente lo que no se haya podido probar y los riesgos residuales. Una CI verde no sustituye la revisión técnica ni demuestra por sí sola que toda la aplicación está libre de defectos.

## 4. Persistencia local

### 4.1 Room

Room será la base principal para datos estructurados y relaciones.

**Modelo mínimo del MVP:**
- Películas locales, metadatos básicos de TMDB e identificadores necesarios para vincular una entrada manual con su coincidencia confirmada, sin duplicarla.
- Historial y registros independientes de visionado.
- Fechas/horas de inicio, origen del dato y calificaciones personales por visionado.
- Estado Pendiente y fecha/hora de incorporación para ordenar las incorporaciones más recientes.
- Estado Oculto, estado anterior a ocultar y fecha/hora de ocultación.
- Listas personalizadas manuales básicas: nombre, descripción y pertenencia de películas.

Las relaciones y restricciones deben impedir duplicados de una película dentro de una misma lista, preservar múltiples visionados y permitir que una película pertenezca a varias listas personalizadas.

**Extensiones de fases posteriores; no implementarlas en el MVP:** orden manual independiente de listas y películas, filtros persistentes por lista, color identificativo, fijación y orden de grupos, datos de estadísticas, señales de Espectro, paginación persistente del Feed y otros campos que solo necesite la experiencia avanzada. Se incorporarán mediante migraciones cuando llegue la fase correspondiente, no por anticipado.

### 4.2 DataStore

Jetpack DataStore guardará preferencias pequeñas y configuración no relacional.

**MVP:** se usará para las preferencias mínimas del diario, incluida la preferencia del tema de apariencia, y para guardar el registro del token TMDB únicamente en forma cifrada. El registro incluye versión de formato, IV y texto cifrado autenticado; no contiene el token en texto claro. Los tokens activo y pendiente se guardan como registros cifrados independientes. El tema se persistirá como un valor local estable: `obsidiana` o `cuarzo`. En una instalación nueva, cuando no exista una preferencia válida, se utilizará Obsidiana. El cambio manual realizado desde Ajustes sustituye el valor guardado y se recupera en los siguientes inicios de la aplicación.

**Posterior al MVP:** diseño del Feed, estado temporal del modo Equilibrado, idioma seleccionado, región de disponibilidad, preferencia de ocultar spoilers y otras preferencias de funciones aún no implementadas.

Room se reserva para datos estructurados; DataStore no sustituirá la base relacional.

### 4.3 Imágenes y caché

Las imágenes descargadas se guardarán en almacenamiento privado de la app mediante una biblioteca de carga/caché compatible con Compose (se verificará la versión estable, preferentemente Coil 3). Room guardará rutas, referencias y metadatos, no los bytes grandes.

La licencia particular informada permite caché ilimitada de contenido e imágenes de TMDB, pero el almacenamiento físico del teléfono no es ilimitado. Prisma debe manejar falta de espacio, no corromper datos personales y ofrecer una gestión clara de caché. Nunca se borrarán visionados o calificaciones para liberar espacio automáticamente.

## 5. Red y TMDB

### 5.1 Política HTTPS/TLS

La política se aplica a todas las comunicaciones iniciadas por Prisma, incluidas API TMDB, carga de pósteres/fondos y cualquier servicio externo futuro:

1. `Network Security Configuration` global con `cleartextTrafficPermitted="false"`; el manifiesto declara `android:networkSecurityConfig` y no hay excepciones de HTTP en producción.
2. TLS 1.2 como protocolo mínimo y TLS 1.3 cuando ambas partes lo soporten. Los protocolos anteriores quedan deshabilitados. La selección se realiza mediante la biblioteca de red mantenida, compatible con API 26–37.
3. Confianza exclusiva en las autoridades del almacén del sistema (`<certificates src="system"/>`); validación estándar de cadena, vigencia y hostname. Ninguna opción de producción acepta certificados autofirmados, caducados, inválidos o nombres incorrectos.
4. No se implementa Certificate Pinning ni se instalan autoridades certificadoras adicionales para facilitar conexiones. Tampoco se usan `TrustManager` o `HostnameVerifier` personalizados que relajen la validación.
5. El cliente autenticado de la API rechaza redirecciones cross-origin y cualquier redirección hacia HTTP; nunca reenvía la cabecera Bearer a otro origen. Si una redirección legítima requiere otro origen, se aborta la petición autenticada y se diseña una segunda petición explícita sin credenciales, solo si el endpoint es público y está autorizado.
6. La carga de imágenes usa un cliente separado sin cabecera Authorization. Puede seguir una redirección a otro host únicamente si sigue siendo HTTPS y la validación TLS/hostname normal tiene éxito.
7. Los logs no registran cabeceras, tokens, cuerpos sensibles, URL con credenciales ni consultas completas. Se permiten errores de red sanitizados (tipo de fallo, código HTTP cuando exista y host permitido), sin secretos ni datos personales.


- Cliente HTTP encapsulado en una fuente de datos remota y repositorio.
- Autenticación TMDB mediante cabecera Authorization: Bearer con el API Read Access Token personal.
- El transporte de todas las comunicaciones debe cumplir la política HTTPS/TLS definida en la sección 5.1; no se implementan mecanismos paralelos ni excepciones de red.
- La clave se introduce en Ajustes.
- La clave nunca se incluye en el código, el repositorio, variables de Actions, APK/AAB, logs, informes de fallos o copia de seguridad.
- Toda petición que no sea necesaria para el comportamiento local se evita.
- Las búsquedas envían el texto consultado a TMDB; no se envía el historial ni el perfil Espectro.
- Se manejarán errores HTTP, respuestas incompletas, límites de consultas, desconexión y cambios de esquema.
- Nunca se completan campos con suposiciones. Los valores ausentes se representan como no disponibles u omitidos.
- Los resultados se persisten localmente antes de presentarse como datos disponibles offline.

### Proceso de búsqueda de una película

1. Consultar los resultados locales de forma inmediata.
2. Si hay conexión y token verificado, ejecutar la búsqueda remota con debounce para evitar una petición por cada pulsación.
3. Combinar resultados locales y remotos en una sola lista ordenada por relevancia de la consulta; no crear grupos ni encabezados por fuente.
4. Priorizar coincidencias exactas y más fuertes. En caso de empate, favorecer el registro local y mantener el orden estable mientras no cambie la consulta.
5. Deduplicar mediante el identificador TMDB estable. Si un registro local y un resultado remoto comparten identificador, conservar una sola fila local y mostrar la indicación «En tu Prisma».
6. Mostrar los metadatos remotos devueltos por la búsqueda sin guardar automáticamente la película en la biblioteca local. Solo persistir los metadatos cuando el usuario confirme una acción que incorpore la película a Prisma (por ejemplo, añadirla a Pendientes o a una lista). Antes de exponerla como contenido guardado, persistir el registro y sus metadatos.
7. Incorporar los resultados remotos a la lista existente a medida que llegan, sin limpiar ni ocultar los resultados locales durante la consulta.
8. Mientras la consulta remota está activa, mostrar un indicador giratorio discreto dentro de la barra de búsqueda, alineado a la derecha; no abrir una pantalla, panel ni mensaje de carga separado. Mantener visible el teclado mientras el usuario escribe y retirar el indicador al completarse la búsqueda.
9. Si no hay acceso a Internet, no ejecutar una petición a TMDB ni mostrar el indicador de carga; mantener únicamente los resultados locales y comunicar el estado offline según si existen coincidencias. La ausencia de token verificado es un estado separado, comunicado mediante el aviso existente «Conecta TMDB».
10. Cuando la consulta cambie o se vacíe, invalidar inmediatamente las respuestas, errores y resultados pendientes asociados al texto anterior. Cancelar el debounce o las peticiones en curso cuando la implementación lo permita; si una petición no puede cancelarse, descartar su respuesta mediante la identidad/versión de la consulta vigente.
11. Si la búsqueda termina y ninguna de las fuentes disponibles devuelve coincidencias, mostrar «No encontramos películas», «Prueba con otro título.» y la acción de alta manual existente. Mantener la consulta editable.
12. No mostrar el estado «No encontramos películas» como resultado global cuando TMDB no pudo consultarse por falta de conexión o token verificado. En ese caso, representar el estado de disponibilidad remota sin borrar los resultados locales.
13. Si una consulta remota de TMDB falla, conservar la lista unificada y los resultados locales visibles; no reemplazarlos por una pantalla de error.
14. Si hay resultados locales, comunicar el error discretamente debajo de la lista con «No se pudo consultar TMDB», «No pudimos completar la búsqueda remota.» y una acción «REINTENTAR», sin crear una sección de resultados separada.
15. Si no hay resultados locales, mostrar un estado de error distinto de «No encontramos películas», con «No se pudo consultar TMDB», «No pudimos completar la búsqueda. Inténtalo de nuevo.», la acción «REINTENTAR» y la acción de alta manual existente.
16. Mantener la consulta en la barra y permitir editarla. «REINTENTAR» vuelve a ejecutar la consulta vigente solo por petición del usuario; no se realizan reintentos automáticos indefinidos.
17. Si TMDB confirma que el token no es válido, utilizar el estado existente «Token no válido» en lugar de presentarlo como un error de conexión genérico.
18. Si la petición falla después de que la consulta haya cambiado o se haya borrado, descartar ese error igual que cualquier respuesta obsoleta.
19. Si se trata de una película manual con varias coincidencias, pedir elección humana y no asociar una coincidencia dudosa.
20. Detectar disponibilidad de acceso a Internet, no solo conexión a una red. Mientras no exista acceso, la búsqueda local sigue funcionando y no se intenta consultar TMDB.
21. Si hay resultados locales durante la ausencia de conexión, mantenerlos en la lista unificada y mostrar debajo de la barra «Sin conexión a Internet», sin indicador de carga.
22. Si no hay resultados locales durante la ausencia de conexión, mostrar un estado offline diferenciado de «No encontramos películas» y del error remoto: «Sin conexión a Internet», el texto «Ahora no puedes consultar películas en TMDB. Puedes seguir utilizando las películas guardadas en tu Prisma o añadir una manualmente.» y la acción de alta manual.
23. Cuando se recupere el acceso a Internet, si la consulta sigue vigente y hay token verificado, lanzar una única nueva consulta remota para la consulta actual, respetando el debounce. Los resultados locales permanecen visibles; se muestra el indicador de carga mientras la petición está activa.
24. Evitar nuevas peticiones duplicadas por múltiples notificaciones de recuperación de conectividad dentro del mismo episodio offline. No implementar un bucle de reintentos automáticos. Si la conexión vuelve pero no hay token verificado, no consultar TMDB y mantener el aviso existente «Conecta TMDB».
25. Si no hay un token verificado disponible para consultas remotas, no ejecutar peticiones a TMDB ni mostrar el indicador de carga. Mantener la búsqueda local y la lista unificada; mostrar el aviso no bloqueante «Conecta TMDB» / «Configura tu token de TMDB para explorar el catálogo» / «CONFIGURAR TMDB», sin ocultar resultados locales.
26. Si no hay resultados locales y no existe token verificado, no mostrar «No encontramos películas». Mantener la consulta editable y ofrecer también el alta manual existente.
27. Al completar correctamente la verificación de un token, si existe conexión y la consulta vigente continúa activa, iniciar una única búsqueda remota para esa consulta; mantener los resultados locales y mostrar el indicador habitual mientras se realiza.
28. Si se está verificando un token nuevo y existe un token anterior todavía verificado, conservar el anterior como activo hasta que el nuevo se valide. Las búsquedas pueden continuar usando el token activo verificado anterior.
29. No confundir los estados «Token verificado», «Pendiente de verificación», «Token no válido» y «Error de conexión». Un error de conexión durante la verificación no invalida el token ni debe etiquetarlo como «Token no válido».
30. Cuando el campo de búsqueda queda vacío, limpiar la lista y cualquier estado contextual de la consulta anterior, y volver al estado inicial de Descubrir: ilustración sencilla, «Busca una película» y la acción de alta manual existente.
31. Vaciar la consulta no elimina ni modifica películas guardadas; solo retira los resultados mostrados para la consulta ya borrada.
32. Cancelar el debounce y las operaciones locales/remotas pendientes asociadas a la consulta anterior cuando sea posible. Si una petición remota en curso no admite cancelación efectiva, invalidar su identificador y descartar cualquier respuesta tardía.
33. Al volver al estado inicial, retirar el indicador de carga y los mensajes contextuales asociados a la búsqueda anterior: error remoto, ausencia de conexión y aviso de configuración de TMDB asociado a esa consulta.
34. Mantener el foco en el campo y el teclado abierto después de borrar el texto. No abrir ni cerrar pantallas adicionales.
35. No ejecutar búsquedas locales ni remotas cuando el campo esté vacío. La acción «AÑADIR PELÍCULA MANUALMENTE» continúa disponible desde el estado inicial.

### Invariantes y pruebas técnicas de Descubrir (MVP)

La implementación debe mantener una identidad de consulta vigente (por ejemplo, una generación o identificador monotónico) para que los resultados, errores y tareas de una búsqueda anterior no alteren la interfaz actual. La cancelación de una petición remota es una optimización; la invalidación de su respuesta es obligatoria incluso cuando la cancelación no sea posible.

La cobertura mínima debe incluir:

1. **Repositorio local:** búsqueda determinista sobre películas de Historial, Pendientes y Ocultos; ejecución sin red; resultados disponibles antes de esperar a TMDB.
2. **Composición de fuentes:** combinación de resultados locales y remotos sin secciones de procedencia, orden por relevancia, preferencia local en empates y deduplicación por identificador TMDB.
3. **Persistencia explícita:** una búsqueda remota no crea ni modifica una película local. La persistencia ocurre únicamente después de una acción explícita de incorporación y se completa antes de presentar el contenido como guardado.
4. **Elegibilidad remota:** el cliente no envía peticiones sin acceso real a Internet o sin token verificado. Esos estados no activan el spinner remoto.
5. **Carga:** el indicador corresponde solo a la consulta remota vigente. La llegada de resultados locales no espera a la red y los resultados locales no se limpian al iniciar la petición.
6. **Respuesta vacía válida:** «sin resultados» solo puede emitirse cuando todas las fuentes disponibles para esa consulta han completado correctamente y el conjunto está vacío. Fuente no disponible, error remoto y respuesta vacía son resultados diferentes.
7. **Error remoto:** verificar ambos casos, con y sin resultados locales, y comprobar que el reintento manual se limita a la consulta vigente y no crea un bucle automático.
8. **Conectividad:** simular pérdida de acceso a Internet, búsqueda offline y restauración. Varias notificaciones del mismo restablecimiento deben provocar como máximo una petición nueva para la consulta activa.
9. **Token:** simular ausencia de token, verificación correcta, token no válido, error de conexión durante verificación y sustitución de token. Un token anterior verificado no se desactiva antes de validar su reemplazo.
10. **Concurrencia:** entregar respuestas remotas fuera de orden, errores tardíos y respuestas después de borrar el campo. Ninguna puede incorporarse si su identificador de consulta ya no es vigente.
11. **Borrado:** comprobar limpieza del estado de pantalla, cancelación cuando sea posible, invalidación obligatoria de trabajo en curso, ausencia de llamadas con consulta vacía y conservación de foco/teclado en la prueba de interfaz.
12. **Temas e interacción:** ejecutar las pruebas de interfaz críticas en Obsidiana y Cuarzo; comprobar que toda la fila abre la película y que el resultado remoto no se guarda por el mero hecho de consultarlo.

Las pruebas deben utilizar fuentes locales, cliente TMDB y estado de conectividad controlables/falsos, para reproducir respuestas vacías, lentas, fallidas, fuera de orden y recuperación de red de manera determinista. La selección de librerías concretas se realizará en la especificación técnica de la Fase 1.

### Filtros y ordenación

**Alcance:** los filtros combinados y las ordenaciones avanzadas de Descubrir y listas personalizadas son posteriores al MVP. No deben implementarse como parte del diario local básico.

- Los criterios de filtro se representarán como condiciones combinables y evaluables de forma determinista.
- La capa de dominio admitirá operadores AND y OR cuando los criterios seleccionados permitan esa combinación lógica.
- El operador inicial será AND; la preferencia de cambiar a OR podrá mantenerse mientras se edita el conjunto de filtros, sin alterar los datos guardados.
- El estado de filtros de Descubrir y el de cada lista personalizada se almacenará por separado; una lista no heredará ni modificará el estado de otra.
- El orden manual de una lista se conservará como orden propio. Los criterios de ordenación temporal (título, año, duración, fecha de estreno o calificación) se aplicarán como una vista/orden alternativo y no sobrescribirán las posiciones manuales.
- Los filtros y la ordenación deben tener resultados coherentes sin conexión sobre los metadatos disponibles localmente. Si falta un dato requerido, no se inventará un valor para forzar el orden o el filtro.
- La sintaxis exacta para combinar grupos de condiciones y el orden predeterminado se definirá en la especificación de la fase correspondiente, después de validar los casos de uso reales.

### Feed infinito (posterior al MVP)

Se empleará paginación real de la fuente y persistencia de claves/estado. Se evaluará Paging 3 con RemoteMediator y Room para que la UI lea del origen local y la paginación remota alimente esa base. Debe haber claves estables y deduplicación por identificador TMDB.

Sin red, el Feed solo presenta páginas y películas ya guardadas; no inventa resultados nuevos ni promete un Feed ilimitado offline.

### Trabajo en segundo plano

WorkManager gestionará tareas aplazables que deban persistir al salir/cerrar la app, como reintentar enriquecimiento de películas manuales cuando vuelva la conectividad. Se usarán restricciones de red, reintentos con backoff y trabajo idempotente. No se dependerá de una tarea inmediata que Android pueda interrumpir.

## 5.1 Fuentes de puntuaciones externas

La interfaz aprobada reserva cuatro espacios para TMDB, IMDb, Rotten Tomatoes y Metacritic. La integración se hará con estas reglas:

- TMDB puede proporcionar su propia puntuación de usuarios a través de su API oficial.
- Para IMDb, la documentación vigente indica acceso a su API mediante AWS Data Exchange, con solicitud/suscripción, credenciales AWS y condiciones de uso propias. La alternativa de datasets tiene restricciones y requisitos de atribución específicos.
- Rotten Tomatoes exige tramitar una solicitud de uso/licencia para integrar sus datos en una aplicación; sus pautas públicas indican atribución y enlaces al contenido. La autorización particular de TMDB no sustituye el permiso de Rotten Tomatoes.
- Metacritic no se tratará como una API pública gratuita. La ruta de acceso documentada encontrada es una oferta licenciada mediante proveedor asociado, con aprobación y suscripción comercial. Se verificará el contrato aplicable antes de usarla.
- No se utilizará scraping, extracción automatizada de páginas ni servicios intermediarios no autorizados para obtener puntuaciones.
- La puntuación solo se muestra cuando existe un origen legítimo, una correspondencia inequívoca de película y permiso para el uso y distribución previstos por Prisma.
- Si una fuente no se puede integrar legal y técnicamente, su espacio mostrará el icono de enlace de la interfaz o se abrirá su página pública si existe una URL válida; nunca se rellenará con una estimación.

La autorización particular recibida de TMDB cubre el contenido entregado por TMDB, incluida su disponibilidad de streaming de JustWatch según lo comunicado por el propietario. No se extiende a los derechos de IMDb, Rotten Tomatoes, Metacritic ni a proveedores ajenos.

## 6. Seguridad y privacidad

### 6.1 Token de TMDB

- **Clave:** AES de 256 bits generada dentro de Android Keystore bajo un alias estable y versionado de Prisma. El material de clave no se exporta ni se almacena en DataStore o archivos de la aplicación.
- **Transformación:** `AES/GCM/NoPadding` (AES-256-GCM), con etiqueta de autenticación de 128 bits.
- **IV/nonce:** lo genera aleatoriamente el proveedor criptográfico de Android Keystore para cada operación de cifrado. La aplicación obtiene y almacena el IV devuelto junto al texto cifrado; nunca lo fija manualmente ni reutiliza un IV.
- **Uso de la clave:** se autoriza cifrado y descifrado en GCM. No se exige autenticación por operación (`setUserAuthenticationRequired(false)` como intención técnica); la búsqueda y consulta remota no solicitarán huella, rostro ni PIN. Se exige explícitamente cifrado aleatorio (`setRandomizedEncryptionRequired(true)`) para que el proveedor genere un IV seguro en cada cifrado.
- **StrongBox:** opcional. Si el dispositivo soporta StrongBox y la combinación AES/GCM, se puede preferir; ante ausencia o incompatibilidad se utiliza Android Keystore sin StrongBox. StrongBox no es requisito de compatibilidad ni condición para habilitar TMDB.
- **Persistencia:** DataStore contiene un registro versionado con IV y texto cifrado autenticado, sin token en claro. Los tokens activo y pendiente de verificación se cifran con operaciones independientes y IV distintos.
- **AAD:** se asocia información de contexto autenticada al registro (versión y tipo de ranura activa/pendiente) para impedir intercambiar registros sin detectar el cambio. El diseño concreto del encabezado se fijará junto con la implementación del repositorio de credenciales.
- **Uso en red:** el token se descifra solo en memoria al preparar la petición autorizada a TMDB y se transmite únicamente por HTTPS en el mecanismo de autenticación documentado por TMDB. No se persiste en una segunda ubicación.
- **Sustitución:** el token anterior permanece activo hasta que el nuevo esté cifrado, guardado y verificado correctamente. Un fallo al cifrar/guardar/verificar el nuevo nunca elimina ni invalida el anterior.
- **Errores de almacenamiento:** si la clave falta, queda invalidada o no puede descifrar el registro, el token afectado pasa a no disponible y se solicita introducirlo de nuevo. No hay fallback a texto plano, clave embebida, clave derivada de datos públicos o almacenamiento menos seguro. La pérdida del token no afecta a Room ni a las películas, visionados, listas u otros datos personales.
- **Eliminación:** borrar los registros activos y pendientes y eliminar el alias de clave de Keystore cuando ya no se use. Limpiar referencias en memoria controladas por la app; no se prometerá borrado forense de copias de memoria del sistema.
- **Secretos y diagnóstico:** prohibido registrar token, cabecera Authorization, cuerpo sensible, texto descifrado, registros serializados de credenciales o excepciones que incluyan valores secretos. El IV no se considera secreto criptográfico, pero no se registrará el registro completo de una credencial. Los mensajes de error deben ser sanitizados.
- **Ciclo de vida:** los datos cifrados del token no se exportan en el archivo `.prisma` ni entran en Android Auto Backup o transferencias entre dispositivos. En una instalación restaurada, el usuario vuelve a introducir su propio token.

Keystore protege la clave de cifrado y limita su extracción; no se debe prometer protección absoluta frente a un dispositivo rooteado, instrumentación del proceso o código malicioso ejecutado con los permisos de la propia app.

### 6.2 Datos personales

- Historial, puntuaciones, listas, estadísticas y perfil Espectro permanecen localmente.
- No hay backend de Prisma, cuenta, sincronización automática ni perfil social en el alcance aprobado.
- La app solo se comunica con servicios externos cuando el usuario solicita información cinematográfica o cuando un trabajo autorizado actualiza metadatos.
- No se transmite la actividad personal de visionado como telemetría.

### 6.3 Copias cifradas

Exportación/importación manual de un archivo versionado:

- Derivar una clave de cifrado desde la contraseña introducida, usando un KDF con sal aleatoria y parámetros almacenados en el encabezado versionado.
- Cifrar/autenticar con AES-256-GCM y nonce aleatorio.
- No guardar la contraseña ni enviarla a ningún servicio.
- Rechazar archivos manipulados, contraseñas incorrectas y versiones no compatibles sin sobrescribir los datos existentes.
- Validar y probar el proceso de restauración de extremo a extremo.
- No incluir credenciales de TMDB.
- La contraseña olvidada no se puede recuperar.

Los parámetros concretos del KDF, del encabezado y del formato de archivo se fijarán en la fase que implemente copias, después de revisar las recomendaciones de seguridad vigentes.

### 6.4 Copias automáticas del sistema Android

- Prisma desactiva Android Auto Backup mediante `android:allowBackup="false"`.
- La configuración no dependerá solo de ese atributo: algunos fabricantes pueden seguir permitiendo transferencias directas entre dispositivos aunque se desactive la copia en nube. Se deben establecer reglas explícitas para todos los modos de extracción que Android admita.
- Para API 26–30, el manifiesto apunta mediante `android:fullBackupContent` a reglas `full-backup-content` que excluyen todos los datos de la aplicación.
- Para API 31 o superior, el manifiesto apunta mediante `android:dataExtractionRules` a reglas `data-extraction-rules` que excluyen todo el contenido tanto en `<cloud-backup>` como en `<device-transfer>`. Si se admite una modalidad de transferencia multiplataforma, también se excluye explícitamente.
- No se permitirá que Room, DataStore, preferencias, archivos privados, credenciales, claves, caché persistente ni datos temporales de Prisma entren en copias del sistema. Los directorios de caché/no-backup no sustituyen las reglas explícitas de exclusión.
- Las exportaciones `.prisma` iniciadas por el usuario son independientes de Android Auto Backup y siguen permitidas; contienen datos seleccionados conforme al formato de copia manual, siempre cifrados y sin tokens ni claves.
- Las pruebas de la configuración se ejecutarán en API 26–30 y API 31+, verificando por separado respaldo en nube y transferencia directa entre dispositivos en los entornos compatibles. Se repetirán al introducir Room/DataStore y al modificar rutas de almacenamiento o el manifiesto.
- La pérdida/desinstalación del dispositivo sin exportación manual implica que Android no restaurará automáticamente los datos privados de Prisma; la interfaz y la ayuda de copias deben comunicar esta consecuencia.

La política se basa en las reglas de extracción de Android: https://developer.android.com/identity/data/autobackup y https://developer.android.com/about/versions/12/behavior-changes-12.

## 7. Fechas de visionado

- El dato principal será el instante de comienzo, no la hora en que termina la película.
- Se conservarán el instante y la zona horaria local utilizada al registrar, para no desplazar la fecha al cambiar la zona horaria del teléfono.
- «Ahora» usa el instante actual.
- «Seleccionar fecha» conserva fecha y hora elegidas.
- «Día de estreno» conserva una fecha de calendario sin inventar una hora de visionado.
- «Ajustar al inicio» estima el comienzo restando el runtime conocido a la hora actual de registro; la vista previa debe decir que es una estimación.
- Runtime desconocido: no hay cálculo ni fecha inventada.
- El paso a medianoche no altera el día de inicio.

## 8. Espectro

Motor de recomendación local y explicable:

- Lee señales desde Room: visionados, repeticiones, calificaciones, pendientes y ocultaciones.
- Usa metadatos cinematográficos ya guardados para obtener similitudes y patrones.
- No envía datos ni genera solicitudes remotas con el historial personal.
- Devuelve una recomendación y una explicación estructurada con las señales concretas que la sustentan.
- Debe poder explicar falta de datos/confianza y evitar conclusiones categóricas con muestras pequeñas.
- La fórmula inicial y la evaluación de relevancia se diseñarán en la fase específica de Espectro; no se adelanta aquí una ponderación arbitraria.

## 9. Pruebas y calidad

Pruebas previstas según la fase activa:

- Unitarias de reglas de listas, visionados, cálculos de fecha, puntuaciones, ocultación y restauración.
- Pruebas de repositorios y base de datos Room, incluidas migraciones.
- Pruebas de sincronización de metadatos y respuestas ausentes/error usando un cliente de red falso.
- Pruebas de estado offline y recuperación de conexión.
- Pruebas de interfaz de Compose para flujos críticos.
- Transporte HTTPS/TLS: comprobar rechazo de HTTP, negociación TLS 1.2 y TLS 1.3 cuando esté soportado, rechazo de certificado inválido/caducado y hostname incorrecto, rechazo de redirección HTTPS→HTTP, rechazo de redirección cross-origin autenticada sin reenviar Bearer, y carga de imágenes HTTPS sin credenciales.
- Verificar en configuración y artefactos de producción que no existan excepciones cleartext, validadores TLS inseguros, `HostnameVerifier` permisivos ni Certificate Pinning.
- Copias automáticas de Android: comprobar exclusión completa en API 26–30 y API 31+, incluyendo por separado nube y transferencia directa entre dispositivos en los equipos compatibles.
- Compatibilidad Android: comprobar la instalación y el recorrido esencial en API 26 (`minSdk`, nivel mínimo aprobado) y ejecutar las pruebas de comportamiento con `targetSdk = 37`.
- Ventanas y pantallas grandes: verificar con `targetSdk = 37` que la interfaz se adapta al redimensionamiento y a tamaños de pantalla amplios; no debe recortar contenido, ocultar acciones esenciales ni impedir completar los recorridos principales. Incluir pruebas en emulador o dispositivo con ventana redimensionable.
- Preferencia de tema: comprobar Obsidiana en una instalación sin preferencia, el cambio manual entre Obsidiana y Cuarzo y la conservación del último valor seleccionado después de cerrar y volver a abrir la aplicación.
- Verificación de que tokens y datos privados no aparezcan en logs o artefactos.
- Token TMDB: comprobar cifrado autenticado AES-256-GCM, IV aleatorio diferente por cifrado, rechazo de alteración de IV/ciphertext/AAD, persistencia exclusivamente cifrada, conservación del token activo ante fallo al reemplazarlo, manejo de clave ausente/invalidada, ausencia de autenticación biométrica por uso y eliminación del registro y alias al retirar el token.
- Pruebas de rendimiento de desplazamiento, paginación e inicio antes de la entrega de cada capacidad relevante y de 1.0.0; no se exige probar funciones aún no implementadas en el MVP.

## 10. Integración continua y entregas con GitHub

### Identificación de versiones Android

- `versionName` mostrará la versión pública SemVer de Prisma y seguirá la secuencia global definida en el Roadmap (por ejemplo, `0.1.0`, `0.2.0`, `0.2.1`). No se reinicia al cambiar de fase.
- `versionCode` será un contador entero secuencial único para las versiones distribuidas. El primer APK público tendrá `versionCode = 1`; cada nueva Release distribuida incrementará el valor exactamente en una unidad, incluidas las versiones de corrección.
- El `versionCode` no depende de SemVer, nunca se reutiliza ni se reinicia al cambiar de fase o llegar a `1.0.0`. Se conserva una única secuencia durante toda la vida de Prisma.
- Se establece `2.100.000.000` como límite máximo operativo de seguridad. No se generará ni publicará una Release que supere ese valor.
- CI comprobará antes de publicar que el código propuesto sea exactamente el siguiente de la secuencia de producción y mayor que el de la última Release distribuida; el proceso debe fallar ante duplicados, retrocesos, saltos o valores fuera del límite.
- Las compilaciones internas de desarrollo/prueba utilizarán una variante con identificador de aplicación separado (por ejemplo, sufijo de aplicación) y una numeración propia que no consuma ni se mezcle con la secuencia de producción. La configuración concreta de Gradle se fijará en la especificación de la Fase 1.

GitHub Actions será el sistema de CI:

- Al abrir/actualizar Pull Requests y al integrar cambios en la rama principal: compilar y ejecutar pruebas automatizadas.
- Antes de crear una Release distribuida: validar automáticamente que `versionCode` sigue la secuencia aprobada, que no excede el límite y que el artefacto se identifica como variante de producción.
- Al completar una versión: crear tag y Release con notas breves en español.
- **Cada versión distribuida al usuario** se publica en GitHub Releases con tag SemVer, notas en español y un APK instalable compatible con la distribución elegida. Los artifacts de GitHub Actions se reservan para validaciones internas y no sustituyen la Release de una versión distribuida.
- Nunca guardar secretos en workflows o repositorio.

### Firma y custodia del APK de producción

- La identidad criptográfica de las versiones públicas de Prisma se mantendrá estable. Se utilizará un almacén de claves **JKS**, con una clave privada **RSA de 4096 bits**, algoritmo de firma **SHA-256 con RSA (`SHA256withRSA`)** y vigencia del certificado de **30 años**.
- La contraseña del almacén y la contraseña de la clave privada serán robustas, distintas entre sí y se custodiarán en un gestor de contraseñas. No se incluirán en el repositorio, archivos de configuración versionados, APK, artefactos de CI ni logs.
- Se conservarán **dos copias cifradas del almacén** en ubicaciones físicas independientes. Las contraseñas de acceso a esas copias y las credenciales de firma se custodiarán separadamente. Antes de la primera publicación se comprobará que los respaldos permiten recuperar un almacén utilizable y que su certificado coincide con el original.
- La huella SHA-256 del certificado público se registrará en documentación pública del proyecto y se utilizará como referencia de verificación. La huella no es una clave privada ni un secreto.
- GitHub Actions utilizará un entorno protegido denominado `production`, con aprobación manual obligatoria antes de que el trabajo de firma acceda a los secretos. Los secretos se limitarán al entorno y al trabajo de publicación de Releases; las compilaciones de Pull Requests, las pruebas y los trabajos ordinarios no tendrán acceso a ellos.
- El trabajo de firma solo se ejecutará desde una versión/tag de producción validado. No procesará código no confiable de Pull Requests ni ejecutará scripts de terceros después de recibir los secretos. Se utilizarán runners hospedados por GitHub; el almacén se materializará temporalmente justo antes de firmar y se eliminará al terminar, sin adjuntarlo a artifacts ni imprimir secretos en logs.
- Las compilaciones internas utilizarán una identidad de aplicación y una clave de depuración distintas. Nunca se distribuirán como actualización de producción ni se firmarán con la clave de producción.
- Cada APK de producción se verificará mediante `apksigner verify` y se comprobará que la huella SHA-256 del certificado coincide exactamente con la registrada para Prisma. La publicación se bloqueará si la firma, el certificado o el artefacto no corresponden a la variante de producción.
- La clave de producción y su certificado no se rotarán como mantenimiento rutinario. Una eventual sustitución por compromiso o causa excepcional exigirá un plan de incidente y migración compatible con la base instalada; no se cambiará de firmante de forma improvisada.
- Antes del primer APK público distribuido deberán completarse la generación de la clave, los respaldos cifrados y su comprobación de recuperación, el registro de la huella del certificado, la configuración del entorno `production` y sus secretos, y una prueba de actualización firmada sobre una instalación previa que compruebe que Android acepta la misma identidad y que los datos locales permanecen intactos.
- No ejecutar ni vigilar procesos de GitHub Actions después de dejarlos en marcha; informar al propietario qué se inició y esperar a que indique que terminó.

## 10.1 Actualizador integrado desde GitHub Releases (posterior al MVP)

Esta capacidad no forma parte del MVP. Se desarrollará en la Fase 8 para que el usuario pueda consultar y aplicar nuevas versiones desde Prisma sin navegar manualmente por la página de GitHub Releases.

### Origen y consulta de versiones

- Repositorio oficial y único origen de actualizaciones: `ElFast-dev/Prisma`.
- Consultar las Releases públicas mediante la API REST oficial de GitHub. Para la versión estable más reciente se utilizará el endpoint público `GET /repos/ElFast-dev/Prisma/releases/latest`; el acceso de solo lectura a recursos públicos no necesita autenticación.
- No se incrusta en la aplicación ningún token personal de GitHub ni secreto con permisos de escritura.
- La información de la Release debe incluir, como mínimo, tag/versión, notas de publicación y el asset APK correspondiente. El actualizador compara la versión instalada con la versión publicada antes de ofrecer una descarga.
- **Comprobación exclusivamente manual:** la consulta se ejecuta únicamente cuando el usuario pulsa «Buscar actualizaciones» desde Ajustes. No se consulta al iniciar Prisma, al reanudarla ni en segundo plano; no se programan tareas periódicas ni notificaciones automáticas.

### Changelog e historial de versiones

- **Obligatorio por versión:** ninguna versión distribuida de Prisma se publica sin un changelog propio, no vacío, escrito en español y asociado a su GitHub Release.
- **Fuente única:** el cuerpo (`body`) de la GitHub Release es el contenido oficial del changelog. Ese mismo contenido se muestra en GitHub Releases y dentro de Prisma; no se mantiene una segunda versión redactada manualmente en la aplicación.
- El changelog debe estar redactado para las personas usuarias y resumir cambios reales de esa versión. Se recomienda utilizar encabezados solo cuando correspondan: `Novedades`, `Mejoras`, `Correcciones` y `Cambios importantes`. Una versión de corrección puede incluir únicamente `Correcciones`; no deben añadirse secciones vacías ni cambios que no pertenezcan a esa entrega.
- Cada entrada debe identificar la versión/tag y la fecha de publicación, y explicar los cambios con un lenguaje claro. No se reemplaza el changelog por una lista automática de commits.
- **Antes de descargar una actualización:** cuando se encuentra una versión nueva, Prisma muestra su versión, fecha y changelog completo para que el usuario pueda revisar qué cambia antes de decidir descargarla e instalarla.
- **Historial dentro de Prisma:** en `Ajustes → Actualizaciones → Historial de versiones` se puede consultar el changelog de cada Release pública publicada en el repositorio. La lista distingue las Releases estables de las *pre-releases*; que estas últimas puedan instalarse desde el actualizador queda sujeto a una decisión aparte.
- Para obtener la versión estable más reciente se usa `GET /repos/ElFast-dev/Prisma/releases/latest`. Para cargar el historial se usa `GET /repos/ElFast-dev/Prisma/releases` y se procesan sus páginas de resultados, incluyendo el cuerpo de cada Release. Los borradores no publicados no forman parte del historial público.
- Los changelogs recuperados se guardan en caché local para que las notas ya consultadas puedan leerse sin conexión. La consulta de versiones nuevas y la primera carga de notas que aún no estén guardadas requieren conexión.
- La aplicación presenta el cuerpo de la Release mediante un renderizador Markdown seguro y acotado. No ejecuta HTML, scripts, contenido activo ni código incluido en las notas.
- La publicación de una versión se considera incompleta si la Release no tiene un changelog válido y visible en GitHub Releases y en el historial de Prisma.

### Descarga e integridad

- El APK se descarga únicamente desde el asset de la Release del repositorio oficial.
- Antes de iniciar la instalación se valida la integridad del archivo mediante el digest SHA-256 publicado por GitHub para el asset o mediante un manifiesto/checksum SHA-256 asociado a la Release.
- Si el asset no corresponde a la aplicación, no tiene una verificación de integridad válida o la comprobación no coincide, se bloquea la instalación y se informa al usuario.
- La descarga debe comunicar su progreso y reconocer errores o interrupciones; la estrategia de reanudación se definirá en la especificación de implementación.
- El actualizador no debe ejecutar código ni instalar archivos obtenidos de otros repositorios, enlaces aportados por terceros o fuentes no verificadas.

### Instalación Android y continuidad de datos

- La instalación se delega al instalador de paquetes del sistema Android. Prisma no intenta eludir el permiso de instalación desde esta fuente, las confirmaciones del sistema ni las decisiones del usuario.
- Según la configuración del dispositivo, Android puede exigir que el usuario autorice a Prisma como fuente para instalar aplicaciones y confirme la instalación.
- Para que Android acepte una Release como actualización de la instalación existente, se mantiene el mismo `applicationId`, se firma con el mismo certificado de firma (o una línea de rotación válida) y se publica un `versionCode` superior al instalado.
- La clave privada de firma se protege fuera del repositorio y nunca se incorpora al código, a los APK de distribución ni a los logs.
- La actualización normal no debe requerir desinstalar Prisma ni borrar su almacenamiento local. Se conserva la base de datos y se ejecutan las migraciones necesarias de manera segura.
- Si una actualización no se puede validar o instalar, la versión actual debe seguir disponible y los datos personales no deben perderse.

### Publicación

- Cada versión distribuida se publica en GitHub Releases con tag SemVer, changelog obligatorio en español y un APK instalable compatible con el formato de distribución elegido. El contenido del changelog debe coincidir con el que Prisma muestra dentro de su historial de versiones.
- Las Releases y sus assets se generan mediante el flujo de entrega continua definido en esta sección.
- El actualizador integrado posterior al MVP ofrecerá la versión pública estable más reciente. El soporte de *pre-releases*, canales alternativos o selección de versiones queda pendiente de aprobación.


La configuración y los permisos exactos de Actions se verificarán antes de implementarlos.

## 11. Rendimiento y accesibilidad

- Usar claves estables y reutilización en listas/paginación.
- Evitar cargar todas las imágenes del Feed en memoria.
- Probar desplazamiento y carga de imágenes en dispositivos reales o emuladores.
- Considerar Baseline Profiles cuando existan recorridos de uso medibles.
- Respetar escalado de texto, contraste, descripciones accesibles y objetivos táctiles.

## 12. Decisiones técnicas revisables

Las decisiones técnicas son responsabilidad del desarrollador y pueden evolucionar si aparece una alternativa claramente mejor. Un cambio que afecte requisitos, privacidad, UX o alcance aprobado requiere actualizar los documentos y avisar al propietario antes de incorporarlo.

No se escribe código hasta que la especificación de la fase activa esté aprobada.
