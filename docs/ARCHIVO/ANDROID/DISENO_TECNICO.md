> **Archivo histórico de la etapa Android.** Fuente sincronizada desde `feature/fase1-android-foundation` antes de retirar el repositorio anterior. Los hitos y requisitos históricos se conservan como antecedente; la fuente vigente de Prisma Web está en `docs/ROADMAP.md` y `docs/TECNICO/`.

# Diseño técnico — Prisma

**Estado:** diseño técnico preliminar; las decisiones se verificarán y concretarán en la especificación de cada fase.  
**Revisión:** 0.3.15.  
**Última actualización:** 10 de noviembre de 2026.  
**No implica autorización para programar.**

## 1. Objetivo técnico

Construir una aplicación Android nativa, mantenible, comprobable y offline-first. El dispositivo será la fuente de verdad de los datos personales. TMDB será una fuente remota de metadatos, imágenes y disponibilidad, nunca el dueño del historial del usuario.

Las decisiones se basan primero en las recomendaciones oficiales de Android. Las versiones exactas de Gradle, Kotlin, Android Gradle Plugin, SDK y bibliotecas se comprobarán y fijarán al preparar la especificación de la fase que vaya a usarlas; no se copiarán números de versión antiguos.

## 2. Plataforma y lenguaje

- **Lenguaje:** Kotlin.
- **Identidad Android aprobada:** `applicationId = "dev.elfast.prisma"` y `namespace = "dev.elfast.prisma"`. Ambos valores se mantienen iguales y estables; no se modifican después de distribuir la aplicación. El `applicationId` identifica la aplicación para Android y debe conservarse para que las actualizaciones se reconozcan como la misma app.
- **Interfaz:** Jetpack Compose y Material 3.
- **Tipografía de interfaz:** familia **Inter**, seleccionada como identidad tipográfica global de Prisma. El tamaño de referencia para el texto normal de lectura continua es **16 px**, para el texto secundario es **14 px**, para el texto auxiliar es **12 px** y para los títulos de sección es **22 px**; los pesos aprobados para la familia son **400, 500 y 600**. Estos valores no sustituyen los tamaños específicos de componentes ya aprobados. Inter se incorporará como recurso local dentro de la aplicación, no como fuente descargada en tiempo de ejecución, para mantener la presentación disponible sin conexión y consistente entre dispositivos. El texto normal de **16 px** utiliza peso **regular (400)**, altura de línea de **24 px** y espaciado entre caracteres (*letter spacing*) de **0 px adicionales**; el texto secundario de **14 px** utiliza peso **regular (400)**, altura de línea de **20 px** y espaciado entre caracteres (*letter spacing*) de **0 px adicionales**; el texto auxiliar de **12 px** tiene una altura de línea de **18 px**, utiliza peso **regular (400)** (opción A aprobada) y mantiene espaciado entre caracteres (*letter spacing*) de **0 px adicionales** (opción A aprobada), conservando el espaciado natural de Inter; los títulos de sección de **22 px** utilizan peso **medio (500)**, altura de línea de **28 px** y espaciado entre caracteres (*letter spacing*) de **0 px adicionales**. La escala global actual comprende estos cuatro niveles y se considera suficiente por ahora; solo se ampliará si una necesidad concreta del producto lo justifica. La versión concreta y los archivos de fuente se fijarán en la especificación técnica de implementación, conservando la licencia SIL OFL 1.1.
- **Navegación:** una sola Activity con Navigation 3 estable `1.2.1`, mediante `androidx.navigation3:navigation3-runtime` y `androidx.navigation3:navigation3-ui`. La aplicación conserva el control del back stack y presenta los destinos Compose con `NavDisplay`.
- **Áreas seguras y edge-to-edge:** la Activity habilita una ventana de borde a borde en API 26–37. Las pantallas personalizadas aplican los insets de `safeDrawing` en la parte superior y los laterales; la navegación inferior aplica `navigationBarsPadding()` y conserva 16 dp adicionales hasta el área del sistema. El estilo de las barras del sistema cambia con Obsidiana/Cuarzo para mantener legibles sus iconos.
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

## 3.1 Calidad, mantenibilidad y auditoría

La calidad técnica se verifica de forma continua y antes del cierre de cada fase. La revisión cubre capas y dependencias, cohesión y acoplamiento, duplicación, responsabilidades, modelo de datos, transacciones, migraciones, ciclo de vida Android, concurrencia, seguridad, privacidad, dependencias, accesibilidad y adaptación de interfaz. También cubre compilación, lint/análisis estático, pruebas unitarias, instrumentadas, regresiones y CI.

Cada hallazgo se documenta con archivo/ruta, evidencia, impacto, severidad y reproducción. P0: seguridad, privacidad o pérdida/corrupción de datos. P1: fallo crítico o arquitectura que impide cumplir requisitos. P2: deuda técnica o mantenibilidad relevante. P3: pulido no bloqueante. No se cierra una fase con P0/P1 conocidos.

La instrucción expresa del propietario autoriza condicionalmente iniciar una reconstrucción limpia cuando la auditoría demuestre con evidencia que los cimientos están comprometidos y que reconstruir es más seguro o mantenible que reparar. En ese caso, la IA puede comenzar la nueva implementación en una rama aislada, paralela y no destructiva, sin pedir otra aprobación para iniciar ese trabajo. Esta autorización condicional **no** permite borrar, sobrescribir, abandonar, fusionar ni sustituir la implementación existente. La rama y el trabajo anteriores, los datos, los artefactos y los puntos de recuperación deben conservarse intactos. Después de comparar ambas implementaciones y validar la nueva frente a los requisitos y pruebas, la IA debe presentar los resultados y obtener aprobación expresa del propietario antes de integrar la reconstrucción o retirar la versión anterior. Si la auditoría no alcanza ese umbral, debe corregir o refactorizar de forma incremental y no reiniciar por preferencia personal.

Una reconstrucción autorizada conserva requisitos, funciones aprobadas, diseños, restricciones y exclusiones; no habilita funciones nuevas. Se diseña una arquitectura simple, se trabaja en incrementos pequeños, se prueba cada incremento, se preservan o migran los datos verificablemente y se mantiene un punto de recuperación hasta superar la aceptación y regresión.

No se promete ausencia absoluta de errores en todos los dispositivos. El estándar es no entregar defectos conocidos, cerrar con P0/P1 resueltos, superar las verificaciones aplicables e informar de limitaciones y escenarios no probados.

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

La implementación inicial de `PrismaHttpClient` fija `ConnectionSpec.MODERN_TLS` a TLS 1.3 y TLS 1.2, y desactiva tanto `followRedirects` como `followSslRedirects`. Por tanto, la respuesta de redirección se devuelve al llamador y el cliente no abre automáticamente una segunda petición que pueda reenviar credenciales. La suite JVM incluye una prueba de comportamiento para una redirección autenticada a otro origen; la suite instrumentada incluye una prueba de rechazo de HTTP con loopback.

Las pruebas instrumentadas de TLS usan un servidor HTTPS local con un certificado de laboratorio y una CA raíz cargada únicamente en un cliente de prueba derivado de `PrismaHttpClient`. Los assets `prisma-tls-test-ca.pem` y `prisma-tls-valid-server.p12` están limitados a `app/src/androidTest/assets/tls`; la clave privada es ficticia y no debe reutilizarse. La configuración de producción sigue confiando exclusivamente en autoridades del sistema, sin excepciones ni `TrustManager`/verificador permisivos. Se comprueba TLS 1.2, TLS 1.3 cuando la plataforma lo soporta, rechazo de CA no confiable y rechazo de un certificado cuyo SAN no coincide con el hostname solicitado.

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

Exportación/importación manual de un archivo `.prisma` versionado. Esta sección fija invariantes para la fase que implemente la capacidad; todavía no existe código de exportación/restauración ni se considera validado un formato binario final.

- La cabecera debe identificar un magic, versión de formato/esquema, KDF y parámetros, sal, algoritmo de cifrado, nonce, longitud del contenido y metadatos mínimos. La cabecera completa se autentica como AAD de AES-GCM para impedir cambios de versión, KDF o longitudes sin detección.
- La recomendación inicial es Argon2id con sal aleatoria. OWASP publica como mínimo de referencia 19 MiB, 2 iteraciones y paralelismo 1; se debe medir el coste real en Android 8/API 26 antes de fijar parámetros de producto. Scrypt es una alternativa si la compatibilidad de la biblioteca lo exige. PBKDF2-HMAC-SHA256 se reservaría para una necesidad concreta de compatibilidad/FIPS, no como complejidad añadida.
- Los parámetros KDF leídos de un archivo se validan y limitan antes de derivar la clave. La sal debe ser aleatoria y distinta por exportación; la contraseña nunca se guarda ni se envía a servicios.
- Cifrar y autenticar con AES-256-GCM, nonce aleatorio de 96 bits y tag de 128 bits. No reutilizar nonces bajo una misma clave derivada. La cabecera versionada participa en AAD.
- La restauración se prepara primero en un área privada temporal (*staging*). Se valida longitud, versión, parámetros acotados, etiqueta GCM, estructura, límites de tamaño y relaciones del contenido completo antes de tocar los datos vigentes. La sustitución se confirma de forma atómica/transaccional, con rollback si falla; no se permiten importaciones parciales que destruyan el diario anterior.
- Rechazar contraseña incorrecta, archivos truncados/manipulados, versiones desconocidas y parámetros fuera de límites sin sobrescribir datos existentes. No extraer rutas arbitrarias ni admitir rutas tipo zip-slip o cargas comprimidas desproporcionadas.
- No incluir token TMDB, claves Android Keystore, secretos, caché de metadatos/imágenes, logs ni temporales. La clave portátil procede de la contraseña y el KDF, no de la Keystore local.
- No guardar ni recuperar la contraseña olvidada. La recuperación depende exclusivamente de que el propietario conserve su contraseña y el archivo exportado.

Los parámetros definitivos del KDF, la biblioteca y los objetivos de tiempo/memoria se fijarán en la fase de implementación tras medir en API 26. Referencias: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html y https://developer.android.com/privacy-and-security/cryptography.

### 6.4 Copias automáticas del sistema Android

- Prisma desactiva Android Auto Backup mediante `android:allowBackup="false"`.
- La configuración no depende solo de ese atributo: algunos fabricantes pueden seguir permitiendo transferencias directas entre dispositivos aunque se desactive la copia en nube. Se establecen reglas explícitas para todos los modos de extracción que Android admita.
- Para API 26–30, el manifiesto apunta mediante `android:fullBackupContent` a reglas `full-backup-content` que excluyen todos los datos de la aplicación.
- Para API 31 o superior, el manifiesto apunta mediante `android:dataExtractionRules` a reglas `data-extraction-rules` con exclusiones completas en `<cloud-backup>` y `<device-transfer>`.
- En Android 16 QPR2 o superior, donde el sistema admite transferencia multiplataforma, la configuración incluye `<cross-platform-transfer platform="ios">` con exclusiones de los nueve dominios de datos. La prueba instrumentada `modernCrossPlatformTransferRulesExcludeEveryApplicationDataDomain` verifica el XML en API 26 y API 37. Esto demuestra configuración y lectura, **no** una transferencia real con iOS. No se inventan `bundleId`, `teamId` ni parámetros de una aplicación iOS que Prisma no tiene emparejada.
- Los dominios explícitamente excluidos son root, file, database, sharedpref, external, device_root, device_file, device_database y device_sharedpref. No se permite que Room, DataStore, preferencias, archivos privados, credenciales, claves, caché persistente ni temporales de Prisma entren en copias automáticas.
- La exportación manual `.prisma` es independiente de Android Auto Backup y sigue permitida; contiene datos seleccionados, cifrados con clave derivada de contraseña, sin tokens ni claves.
- **Evidencia efectiva CI #62:** en API 26 y API 37 se habilitó BackupManager, se seleccionó el `LocalTransport` del sistema y `bmgr backupnow` devolvió `Backup is not allowed` para `dev.elfast.prisma.internal`. Tras desinstalar y reinstalar el mismo APK, cinco marcadores temporales (root, files, DataStore, shared preferences y database) siguieron ausentes. Esto prueba rechazo del paquete y la ruta local de reinstalación con el transporte local del emulador; **no** es una copia real de Google Drive/cuenta.
- **D2D:** en CI #62 el transporte GMS pudo inicializarse, pero rechazó temporalmente el paquete con `Transport rejected package because it wasn't able to process it at the time`. El informe marca `INCONCLUSIVE`; no hubo payload aceptado ni restauración D2D. La prueba limpia el modo de prueba y no declara la transferencia superada.
- La pérdida/desinstalación del dispositivo sin exportación manual implica que Android no restaurará automáticamente los datos privados de Prisma; la interfaz y la ayuda de copias deben comunicar esta consecuencia.
- La compatibilidad real con nubes de cuentas, transferencias OEM entre dos dispositivos y una contraparte iOS debe verificarse por separado en hardware/servicios compatibles. Las pruebas instrumentadas y `LocalTransport` no sustituyen esas evidencias.

La política se basa en las reglas de extracción de Android: https://developer.android.com/identity/data/autobackup, https://developer.android.com/about/versions/12/behavior-changes-12 y https://developer.android.com/about/versions/16/qpr2/behavior-changes-16-qpr2.

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
- Android BackupManager: CI #62 ejecutó `bmgr backupnow` mediante `LocalTransport`, verificó el rechazo del paquete y repitió la instalación para comprobar que no regresaran cinco marcadores privados. API 26 y API 37 pasaron. El transporte D2D de Google quedó `INCONCLUSIVE` por rechazo transitorio; la transferencia real entre dos dispositivos y el backup de cuenta Google siguen sin validarse.
- Transporte HTTPS/TLS: comprobar rechazo de HTTP, negociación TLS 1.2 y TLS 1.3 cuando esté soportado, rechazo de certificado no confiable/expirado y hostname incorrecto, rechazo de redirección HTTPS→HTTP, rechazo de redirección cross-origin autenticada sin reenviar Bearer y carga de imágenes HTTPS sin credenciales. CI #47 (`42726414134`) confirmó el rechazo de HTTP en API 26 y API 37 y CI #48 (`42728145540`) confirmó la regresión completa de la base. CI #49 (`42729920970`) detectó y aisló un defecto en la prueba de disponibilidad TLS 1.3 (consulta de un `SSLContext` no inicializado); no fue un defecto del cliente. CI #50 (`42731583151`) pasó TLS 1.2/1.3, CA no confiable y hostname incorrecto en API 37, pero identificó incompatibilidad del formato PKCS#12 con el proveedor de Android 8. Tras regenerar el fixture con MAC SHA-1/PBE-SHA1-3DES, CI #51 (`42733048755`) confirmó TLS 1.2 y los rechazos de CA/hostname en API 26 y API 37, TLS 1.3 en API 37 y 6/6 pruebas JVM. CI #52 (`42734670743`) pasó compilación, lint, 6 JVM, 17 pruebas API 37 y 17 casos API 26 (1 omitido solo porque TLS 1.3 no está soportado en Android 8). CI #53 (`42736143972`, segundo intento) confirmó 19/19 pruebas API 37 y 18/19 API 26, sin fallos ni errores; la única omisión corresponde a TLS 1.3 no disponible en Android 8. Los dos casos agregados —certificado expirado y redirección HTTPS→HTTP— pasaron en ambos emuladores. Los informes XML identifican `AVD - 17` y `AVD - 8.0.0`, con código de salida 0, y se publicó APK cuyo checksum interno fue comprobado. El primer intento de #53 falló resolviendo el plugin Compose, antes de compilar o ejecutar pruebas; el segundo terminó correctamente.
El fixture del certificado expirado tiene SAN IP 127.0.0.1, está firmado por la CA local y su PKCS#12 usa cifrado legacy compatible con API 26. No se modifica la configuración de confianza ni el código de producción para permitir los escenarios negativos.
- **BackupManager CI #61/#62:** CI #61 (`42749624000`) registró 20 pruebas sin fallos en API 37 y 20 casos en API 26 (una omisión TLS 1.3), pero terminó con error de etapa por D2D (`-1000`). CI #62 (`42750815542`) terminó `success`: API 37 20/20, API 26 20 casos con 0 fallos y 1 omisión TLS 1.3, JVM 6/6. Los ciclos cloud/local con `LocalTransport` pasaron en ambos emuladores; `bmgr backupnow` devolvió `Backup is not allowed` y cinco marcadores permanecieron ausentes después de reinstalar.
- **D2D CI #62:** el transporte se inicializó (`Initialization result: 0`), pero rechazó temporalmente el paquete. El transcript lo etiqueta `INCONCLUSIVE`; no se ejecutó restauración D2D.
- **CI #119 — validación completa, versionado y ventanas amplias:** ejecución [42911749013](https://github.com/ElFast-dev/Prisma/actions/runs/42911749013), commit `403522649cae2fabe0bc59cad4c46129b666cbfb`, terminó con `success`. Build/lint, 10/10 pruebas Python del validador y 6/6 pruebas JVM pasaron. `productionDebug` se inspeccionó sin firmar ni publicar y se confirmó `dev.elfast.prisma`, versión `0.1.0`, `versionCode=1` (primera Release estable aún no publicada). API 37: 24/24 instrumentadas, 0 fallos/errores/omisiones; repetición de `PrismaAdaptiveWindowTest` a 1280×800 px y 160 dpi: 2/2 (Obsidiana y Cuarzo), código de salida 0 y aserción de ventana de al menos 600 dp. API 26: 24 casos, 0 fallos/errores, 1 omisión justificada por TLS 1.3 no disponible. Los ciclos cloud/LocalTransport pasaron en ambas APIs. En D2D, el paquete auxiliar de control respaldó y restauró su marcador; el transporte confirmó después que Prisma no tenía datos elegibles por las exclusiones configuradas, por lo que **no se ejecutó una restauración D2D de datos de Prisma**. Se publicó el APK interno `dev.elfast.prisma.internalfix2`; no es una Release pública ni fue instalado físicamente en el Galaxy por esta ejecución.

- **CI #118 — resultado de regresión:** build/lint/JVM y validador versionCode pasaron; API 37 24/24 instrumentadas y API 26 24 casos sin fallos/errores (una omisión TLS 1.3). Ambos ciclos cloud/local pasaron. API37 D2D quedó `INCONCLUSIVE` (`bmgr init -1000`). El paso falló después por una función Bash multilínea enviada como comando aislado a `/usr/bin/sh -c` por Android Emulator Runner; no se ejecutó el perfil específico 1280×800. API26 completó. El nuevo bloque de ventana se encapsula en un único `bash -c` y el fallo D2D añade logcat y estado del servicio sin suprimir la inconclusión.
- **D2D CI #116:** el test de control auxiliar falló antes de llegar a Prisma, con `Package @pm@ with result: Transport error`; se observó además `No backup account for initializeDevice` al inicializar GMS. Las pruebas instrumentadas de Prisma pasaron 22/22 en API 37 y 21 ejecutadas + 1 omisión TLS 1.3 en API 26; los ensayos cloud/local pasaron. No se publicó APK. Se ajustó el orden de selección D2D para que ocurra antes de habilitar BackupManager en el emulador sin cuenta cloud, siguiendo una pista técnica documentada; queda pendiente la validación CI posterior. No se silencia el fallo del probe.
- **CI #112 — APK de referencia de la primera validación física:** ejecución [42899984672](https://github.com/ElFast-dev/Prisma/actions/runs/42899984672), commit `eaaed7f709f81a0f0339f15425dbd97e23163232`, terminó con éxito: build/lint, JVM 6/6, API 37 22/22 y API 26 22 casos sin fallos ni errores (1 omisión TLS 1.3 esperada en API 26). En API 37, `LocalTransport` rechazó el backup de Prisma y los cinco marcadores de prueba permanecieron ausentes tras reinstalar. D2D restauró un marcador del paquete auxiliar; Prisma no generó payload elegible, por lo que no se ejecutó un ciclo de restauración de Prisma. La restauración auxiliar valida el transporte, no una migración real de datos de Prisma.
- **Validación física:** el propietario instaló el APK interno de CI #112 en el Galaxy A03 `SM-A035M` (Android 13/API 33) y confirmó su funcionamiento correcto. Es una verificación física funcional inicial; el benchmark de rendimiento y la cobertura de API 26 en hardware continúan diferenciados.
- **Transferencia multiplataforma:** la prueba instrumentada confirmó lectura y exclusión de nueve dominios en API 26 y 37. No se ejecutó transferencia Android↔iOS real.
- **Prueba física disponible:** Samsung Galaxy A03 `SM-A035M`, Android 13/API 33, One UI 5.1 Core, Unisoc T606 arm64, GPU Mali/OpenGL ES 3.2, 4 GB RAM física + 4 GB zRAM, 109 GB nominales (6,2 GB libres), microSD de 7 GB, pantalla 300 dpi sin HDR y puerto micro-USB. Esta unidad aporta validación física real en API 33; el propietario confirmó que el APK de CI #112 se instaló y funciona correctamente. El mínimo API 26 sigue cubierto por emulador CI, no por hardware físico.
- **.prisma:** KDF, cabecera autenticada, staging y restauración atómica son recomendaciones para una fase posterior; no hay implementación ni prueba end-to-end todavía.
- Verificar en configuración y artefactos de producción que no existan excepciones cleartext, validadores TLS inseguros, `HostnameVerifier` permisivos ni Certificate Pinning.
- Copias automáticas de Android: comprobar exclusión completa en API 26–30 y API 31+, incluyendo por separado nube y transferencia directa entre dispositivos en los equipos compatibles.
- Compatibilidad Android: mantener pruebas en CI/emulador API 26 y API 37. El recorrido físico inicial del APK CI #112 en Galaxy A03 Android 13/API 33 ya fue realizado y confirmado por el propietario; no presentar API 33 como prueba física de Android 8 ni como sustituto de benchmarks o futuras pruebas de aceptación por capacidad.
- Ventanas y pantallas grandes: verificar con `targetSdk = 37` que la interfaz se adapta al redimensionamiento y a tamaños de pantalla amplios; no debe recortar contenido, ocultar acciones esenciales ni impedir completar los recorridos principales. Incluir pruebas en emulador o dispositivo con ventana redimensionable.
- Preferencia de tema: comprobar Obsidiana en una instalación sin preferencia, el cambio manual entre Obsidiana y Cuarzo y la conservación del último valor seleccionado después de cerrar y volver a abrir la aplicación.
- Verificación de que tokens y datos privados no aparezcan en logs o artefactos.
- Token TMDB: comprobar cifrado autenticado AES-256-GCM, IV aleatorio diferente por cifrado, rechazo de alteración de IV/ciphertext/AAD, persistencia exclusivamente cifrada, conservación del token activo ante fallo al reemplazarlo, manejo de clave ausente/invalidada, ausencia de autenticación biométrica por uso y eliminación del registro y alias al retirar el token.
- Pruebas de rendimiento de desplazamiento, paginación e inicio antes de la entrega de cada capacidad relevante y de 1.0.0; no se exige probar funciones aún no implementadas en el MVP.

## 10. Integración continua y entregas con GitHub

### Identificación de versiones Android

La separación entre hitos de desarrollo, compilaciones internas y versiones de producto está definida en docs/TECNICO/VERSIONADO_Y_COMPILACIONES.md. Esta política prevalece sobre cualquier numeración antigua de roadmap conservada en el historial.

- versionName es el SemVer del producto únicamente al preparar una Release aprobada. No aumenta por fase, pantalla, módulo, tarea ni build CI.
- versionCode es un entero independiente. El primer producto publicado (alpha/beta/RC/estable) comienza en 1; cada Release de producto publicada incrementa una unidad. Las pre-releases públicas también consumen código; los artefactos internos y drafts no.
- Límite operativo conservado: 2.100.000.000.
- Variantes internas utilizan IDs de aplicación y versionCode separados y no se confunden con producción.
- Valores verificados actualmente: producción base versionName=0.1.0/versionCode=1; internalDebug=0.1.0-internal/1000001; internalFixDebug=0.1.0-internal-fix/1000002; internalFix2Debug=0.1.0-internal-fix2/1000003. No se modifican como parte de la reorganización.
- productionDebug se compila solo para inspeccionar la identidad pública y la secuencia. Actualmente no hay Tags ni Releases; su 0.1.0/1 es un valor de configuración de inspección, no una versión publicada.
- El validador CI inspecciona todas las Releases públicas publicadas, incluidas las pre-releases, comprueba la identidad/consistencia de sus APK y exige el siguiente versionCode. No usa solo /releases/latest, que omite pre-releases.
- Como CI ejecuta esta comprobación en cada push, el versionCode de producción en Gradle representa el siguiente código disponible. Después de publicar una Release se avanza mediante un commit explícito al siguiente entero; no se cambia por cada build interno y no se tocan los códigos de las variantes QA.
- El número de build CI se identifica con GitHub Actions run_number, SHA completo/corto y variante. No se inserta como SemVer ni se utiliza para consumir versionCode de producción.

**Control de secuencia de versiones públicas:** el workflow construye productionDebug únicamente para inspección y valida su identidad/versionCode con aapt; no firma con claves de producción ni publica ese APK. El script Python consulta el inventario paginado de GitHub Releases, verifica la identidad del repositorio, inspecciona los APK de todas las Releases publicadas (incluidas pre-releases), verifica el package ID, la coherencia y unicidad de los códigos y el digest SHA-256 cuando GitHub lo expone. El candidato debe ser exactamente el siguiente entero; cuando no existe ninguna Release publicada, debe ser versionCode=1. Los drafts no consumen código. Otros errores de API detienen el workflow. El token GITHUB_TOKEN se limita al paso de lectura y nunca se pasa a Gradle, al APK ni a procesos de producción. Las pruebas unitarias del validador se ejecutan antes de la construcción.

**Validación de ventanas amplias:** las pruebas Compose `PrismaAdaptiveWindowTest` comprueban que Descubrir, Apariencia, la navegación y los cuatro accesos de Personal siguen visibles y utilizables en Obsidiana/Cuarzo. En CI API 37 se repite esta clase con el emulador en 1280×800 px y densidad 160 dpi (ventana lógica de al menos 600 dp); los informes de la ejecución normal y de la ventana amplia se almacenan por separado. Es una simulación automatizada de ventana amplia, no una prueba física en tablet o plegable.

GitHub Actions será el sistema de CI:

- El workflow de Fase 1 ejecuta lint, pruebas unitarias, `assembleInternalFix2Debug`, la inspección `assembleProductionDebug` y el validador de secuencia `versionCode`; después ejecuta `connectedInternalFix2DebugAndroidTest` en Android 17 (API 37, paquetes `37.0`, canal canary) y Android 8 (API 26, Google APIs x86). En ambos emuladores ejecuta además `scripts/verify-android-backup-exclusions.sh`: cloud/local en API 26 y 37 y D2D cuando la imagen API 37 ofrece el transporte. Los transcripts de BackupManager se publican junto con los XML/HTML independientes. El APK interno y su checksum solo se preparan después de superar ambos pasos instrumentados.
- Evidencia del incremento base, verificada el 9 de noviembre de 2026: ejecución `42706068176` (#30), commit `670f2d7b26639d7e19ec6033ee926a5e856e8fda`, conclusión `success`; compilación, lint, pruebas unitarias y suite instrumentada pasaron.
- Evidencia anterior de corrección de iconos: ejecución `42709442180` (#32), commit `82896a60fccac1ef811ac4a84da9901394087608`, conclusión `success`; compilación, lint, pruebas unitarias y `connectedInternalDebugAndroidTest` en emulador Android 17 pasaron.
- Evidencia vigente de la silueta final de Ajustes: ejecución `42712403446` (#35), HEAD `25adec22a7396118b6667714575e60e5c6a55321`, que contiene el código `8cd345fe2807e82327fe378ace99be07c420eb44`; conclusión `success`. Pasaron compilación, lint, pruebas unitarias, `connectedInternalDebugAndroidTest` en Android 17 y publicación del artefacto `prisma-internal-apk-25adec22a7396118b6667714575e60e5c6a55321` (ZIP: 13.256.635 bytes; SHA-256 ZIP: `3a3c6e8e90872c0d4edbd99cab650abd4d7a2c47a814f838966316c4c1911bb3`), que caduca el 23 de noviembre de 2026 a las 22:37:32 UTC. Registro y descarga: [GitHub Actions #35](https://github.com/ElFast-dev/Prisma/actions/runs/42712403446).
- La CI documental #36 (`42715050804`) terminó correctamente sobre HEAD `643ae7a3`: compilación, lint, pruebas unitarias y suite instrumentada Android 17 pasaron.
- CI #37 (`42716063385`) validó `connectedInternalDebugAndroidTest` en Android 17/API 37 y Android 8/API 26, además de compilación, lint, pruebas unitarias y publicación del APK interno.
- CI #38 (`42719435851`) pasó en Android 17/API 37 y Android 8/API 26. Las seis comprobaciones instrumentadas de `NetworkSecurityPolicy`, trust anchors del sistema, ausencia de pinning, `allowBackup=false` y exclusiones completas para backup legacy, nube y device-transfer quedaron superadas en ambos emuladores.
- El APK interno de esta ejecución se publicó como `prisma-internal-apk-1cd8e6a67934624594c7959fc07d6bde1366b9a3` (ZIP: 13.256.633 bytes; SHA-256: `61e42fa97093e9cdebf13a876411d5c75dfe441f70ca9fe9bbe94cd0ac2e9be3`), caduca el 23 de noviembre de 2026 a las 23:26:27 UTC. Enlace verificable: [GitHub Actions #38](https://github.com/ElFast-dev/Prisma/actions/runs/42719435851).
- CI #40 (`42722310507`), sobre `e4723d69ac797e642d58667c7418160f3cb716f8`, terminó con `success`: compilación, lint, pruebas unitarias y `connectedInternalDebugAndroidTest` pasaron. Los registros muestran la tarea instrumentada completada en Android 17/API 37 y Android 8/API 26; no se publicaron informes XML por método en esa ejecución.
- CI #47 (`42726414134`), sobre `29407ffb66178f28825aef1ab6938727f0afc773`, terminó con `success`. Compilación, lint, `testInternalDebugUnitTest`, `assembleInternalDebug` y las pruebas instrumentadas de API 37 y API 26 pasaron. Los XML de ambas APIs registran 13 pruebas, 0 fallos y 0 errores; se confirma el resultado individual de `prismaHttpClientRejectsCleartextRequestsBeforeOpeningSocket` en ambos emuladores. Se conservaron dos artefactos de informes instrumentados y el APK interno. El ZIP de APK mide 13.256.632 bytes (SHA-256: `97f6b0d82fb4fc4344898ec1ad914a05ce937ca3a26995c12522688f151f6b0d`); el APK extraído mide 13.789.254 bytes (SHA-256 verificado: `dbb94b831e5235bf859c5d2ab6ee93735d17d8261ad1e36d96040b218b327199`). Registro: [GitHub Actions #47](https://github.com/ElFast-dev/Prisma/actions/runs/42726414134).
- La prueba JVM de redirección cross-origin forma parte de `PrismaHttpClientTest`; CI #53 publicó sus XML y confirmó 6/6 pruebas JVM. Las pruebas instrumentadas #53 validaron en API 26 y 37 TLS 1.2, TLS 1.3 cuando está soportado, CA no confiable, certificado expirado, hostname incorrecto, cleartext y downgrade HTTPS→HTTP.
- **CI #61** (`42749624000`) comprobó la nueva exclusión `cross-platform-transfer`: 20/20 instrumentadas API 37 y 20 casos API 26 (una omisión TLS 1.3), 6 JVM; los ciclos cloud/local pasaron. La ejecución global falló solo por la inicialización D2D (`-1000`).
- **CI #62** (`42750815542`), commit de workflow `d900c0f118cb56454f0257c6584bb8bddc05ee94`, terminó con `success`. API 37: 20 pruebas, 0 fallos/errores/omisiones; API 26: 20 casos, 0 fallos/errores, 1 omisión TLS 1.3; JVM 6/6. Ambos ciclos cloud/local pasaron; D2D quedó `INCONCLUSIVE` tras rechazo temporal del transporte.
- **APK interno CI #62:** artefacto ID `13732984791`, ZIP de 13.256.761 bytes; APK de 13.789.370 bytes; SHA-256 verificado `b08f6bbaf24dbcf1b779ec4b88458ca8812438cafeb37402899a7b7e1f76ca08`. Registro: [GitHub Actions #62](https://github.com/ElFast-dev/Prisma/actions/runs/42750815542).
- **Pendiente:** validación en teléfono físico (incluido API 26 real), D2D real entre dispositivos compatibles, backup con servicio/cuenta Google y transferencia multiplataforma efectiva con una contraparte iOS.

- Al abrir/actualizar Pull Requests y al integrar cambios en la rama principal: compilar y ejecutar pruebas automatizadas.
- Antes de crear cualquier Release distribuida (incluida una pre-release): validar automáticamente que `versionCode` es el siguiente de todas las Releases publicadas, que no excede el límite y que el artefacto se identifica como variante de producción.
- Solo tras superar la puerta de producto y recibir aprobación expresa: crear el tag SemVer y la GitHub Release correspondiente.
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

- Cada versión de producto autorizada se publica en GitHub Releases con tag SemVer, changelog obligatorio en español y un APK instalable compatible con el formato de distribución elegido. Las pre-releases se marcan como tales. El contenido del changelog debe coincidir con el que Prisma muestra dentro de su historial de versiones.
- Las Releases y sus assets se generan mediante el flujo de entrega continua definido en esta sección.
- El actualizador integrado posterior al MVP ofrecerá la versión pública estable más reciente. El soporte de *pre-releases*, canales alternativos o selección de versiones queda pendiente de aprobación.


La configuración y los permisos exactos de Actions se verificarán antes de implementarlos.

### Rendimiento del ciclo de compilación y CI

- Mantener feedback rápido durante la implementación: compilar y ejecutar primero las tareas afectadas, ampliar a pruebas unitarias/instrumentadas y matriz completa en las puertas de integración y distribución.
- Medir los tiempos por tarea con Build Scan o informes de perfil antes de cambiar la configuración. Corregir el cuello de botella real en lugar de aumentar indiscriminadamente memoria, concurrencia o complejidad.
- Aprovechar Gradle Daemon, compilación incremental, Build Cache y Configuration Cache, así como caché de dependencias y artefactos de CI, cuando las versiones fijadas y los plugins sean compatibles. Adoptar Configuration Cache de forma gradual y verificar que sus entradas/salidas y tareas personalizadas son correctas.
- Paralelizar tareas y jobs independientes solo cuando no compitan por recursos escasos ni comprometan reproducibilidad. Reutilizar resultados del mismo commit y evitar ejecutar varias veces una suite completa que no cambió.
- Evitar `clean`, sincronizaciones y descargas de dependencias repetidas cuando no sean necesarias. Mantener las versiones estables y evitar actualizaciones de herramientas ajenas al objetivo que generen nueva resolución, recompilación o riesgos de compatibilidad.
- En GitHub-hosted runners, aprovechar que cada job parte de un checkout nuevo: no ejecutar `clean` de forma rutinaria. Mantener el Gradle Daemon durante las invocaciones sucesivas del mismo job y dejar que `setup-gradle` gestione su cierre al finalizar. La configuración se valida en CI; medir los tiempos de ejecución para cuantificar su impacto antes de afirmar una mejora.
- No reducir matrices, omitir pruebas, ignorar fallos ni marcar pasos como opcionales para mejorar artificialmente los tiempos. Las comprobaciones obligatorias permanecen como puerta de calidad antes de integrar o distribuir.
- Referencias: [Gradle — mejorar el rendimiento de las compilaciones](https://docs.gradle.org/current/userguide/performance.html), [Gradle — buenas prácticas de rendimiento](https://docs.gradle.org/current/userguide/best_practices_performance.html), [Gradle Daemon y reutilización entre builds](https://docs.gradle.org/current/userguide/gradle_daemon.html), [Gradle — Configuration Cache](https://docs.gradle.org/current/userguide/configuration_cache.html) y [GitHub Actions — rutas omitidas y checks pendientes](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow).


## 11. Rendimiento y accesibilidad

### 11.1 Principio general

El objetivo es que Prisma sea rápida, fluida, estable y eficiente en CPU, memoria, almacenamiento, red y batería, sin reducir arbitrariamente sus funciones ni la calidad de la experiencia. El rendimiento se mejora eliminando trabajo innecesario, eligiendo algoritmos y estructuras adecuados, cargando datos bajo demanda y midiendo los recorridos reales; no desactivando funciones, seguridad, persistencia o controles de calidad.

No se impondrán topes de producto a listas, historial, aprendizaje, metadatos o capacidades solo para ocultar ineficiencias. Sí se deben administrar de forma responsable los recursos finitos del dispositivo: memoria de trabajo y caché en RAM acotadas, imágenes decodificadas del tamaño necesario, operaciones paginadas cuando el volumen lo justifique y liberación de recursos que ya no se usan. La gestión de caché nunca debe eliminar historial, puntuaciones, listas ni otros datos personales para liberar espacio.

### 11.2 Medición y dispositivos de referencia

- Medir inicio en frío, tibio y caliente; distinguir **TTID** (primera interfaz visible) de **TTFD** (interfaz completamente utilizable). Usar Macrobenchmark y trazas Perfetto/Android Studio para localizar el trabajo que retrasa el inicio; no inferir rapidez solo por inspección visual.
- Evaluar renderizado, desplazamiento, transiciones, entrada de texto, navegación, carga de imágenes, operaciones Room, recuperación offline, memoria, uso de CPU y trabajo en segundo plano. El análisis debe incluir las fases de mayor carga y no limitarse a abrir la pantalla inicial.
- Probar recorridos representativos en el Samsung Galaxy A03 `SM-A035M` (Android 13/API 33), además de emuladores API 26 y API 37. El teléfono físico es el control de rendimiento de hardware real disponible; los emuladores amplían la cobertura de compatibilidad, pero no sustituyen las mediciones físicas de CPU, memoria, batería o temperatura.
- Comparar antes y después bajo condiciones equivalentes: mismo dispositivo, variante de compilación, conjunto de datos, estado de caché y recorrido. Registrar la métrica, el escenario y la causa; no atribuir una mejora a una variación que no se ha medido.
- Para una medición representativa de entrega, usar un build de tipo release o equivalente no depurable con R8 y la configuración de optimización que vaya a distribuirse. La instrumentación de depuración puede distorsionar los tiempos.
- Los umbrales específicos de Prisma se definirán a partir de una línea base reproducible y de los recorridos reales; no se inventarán cifras de aceptación. Como referencia técnica, Android recomienda mantener los frames dentro de unos 16 ms para 60 Hz y considera congelados los frames superiores a 700 ms. Ajustar el análisis a la frecuencia de refresco real del dispositivo.

### 11.3 Inicio, hilo principal y concurrencia

- Mantener libre el hilo principal: no ejecutar en él I/O de archivos o base de datos, red, descargas, decodificación de imágenes ni cálculos intensivos. Utilizar dispatchers y trabajo de fondo adecuados, con cancelación y propagación controlada de errores.
- Durante el arranque, ejecutar solo lo necesario para mostrar una interfaz correcta y utilizable. Diferir inicializadores, consultas y bibliotecas no esenciales hasta después de la primera presentación, sin retrasar datos imprescindibles para la coherencia visual o la privacidad, como la recuperación del tema persistido.
- Evitar inicializaciones automáticas costosas y trabajo duplicado. No sustituir trabajo esencial por una pantalla vacía ni mostrar datos incorrectos para mejorar artificialmente TTID.
- Evitar bloqueos, esperas activas, polling sin necesidad y reintentos infinitos. Cancelar trabajos obsoletos cuando cambia la consulta, el destino o el ciclo de vida.

### 11.4 Jetpack Compose y renderizado

- Mantener las funciones composables ligeras: no ordenar colecciones grandes, calcular algoritmos costosos ni transformar datos extensos dentro del cuerpo de una composición que puede repetirse con frecuencia.
- Usar `remember` para resultados costosos que deban conservarse, `derivedStateOf` cuando reduzca lecturas y recomposiciones, y lecturas diferidas de estado cuando sea útil. No añadir estos mecanismos mecánicamente si no aportan beneficio.
- Proporcionar claves estables y `contentType` a listas lazy para conservar identidad y reutilización; mantener estables e inmutables los modelos cuando reflejen realmente esas propiedades. No etiquetar como inmutable un objeto que puede cambiar.
- Investigar recomposiciones evitables, medición/layout/dibujo costosos y asignaciones por frame con herramientas de Compose y trazas. No utilizar anotaciones, APIs experimentales ni trucos que cambien semántica solo para silenciar diagnósticos.
- Las listas y pantallas largas deben renderizar elementos bajo demanda y conservar el estado de desplazamiento cuando el producto lo requiera. La paginación debe evitar consultas y renderizados redundantes sin ocultar o descartar elementos válidos.

### 11.5 Imágenes, memoria y almacenamiento

- No cargar ni decodificar todas las imágenes de un Feed o colección al mismo tiempo. Solicitar tamaños adecuados al espacio de presentación, reutilizar cachés, limitar las imágenes simultáneamente activas y liberar referencias cuando dejan de ser necesarias.
- Separar caché de memoria y caché persistente. La RAM debe permanecer acotada incluso si el usuario acumula muchos registros; la política de disco debe considerar el espacio disponible y permitir gestionar caché derivada sin borrar datos personales.
- Medir asignaciones, memoria residente, retención accidental de Activities/Views/Context, referencias de imágenes y comportamiento al volver de segundo plano. Comprobar escenarios de poca memoria y almacenamiento insuficiente.
- Room conserva los datos estructurados personales; las operaciones de limpieza de caché no pueden eliminar o alterar información de usuario. No mantener grandes conjuntos completos en memoria si una consulta incremental o paginada resuelve el recorrido sin limitar la capacidad funcional.

### 11.6 Línea base, perfiles y regresiones

- Crear benchmarks para recorridos representativos cuando las pantallas y flujos correspondientes estén implementados y estables. Añadir Macrobenchmark para inicio, navegación y desplazamiento cuando aporte cobertura automatizable.
- Adoptar Baseline Profiles y, cuando tenga sentido, Startup Profiles después de definir recorridos de uso medibles; validar la mejora en builds equivalentes a producción. No añadir perfiles vacíos o prematuros.
- Incorporar comprobaciones de rendimiento a CI donde sean repetibles y el entorno pueda producir datos comparables. Evitar umbrales inestables que generen falsos positivos; investigar toda regresión material antes de cerrar una entrega.
- Optimizar guiándose por perfiles y datos, no por microoptimizaciones especulativas. Una mejora de velocidad no es aceptable si introduce pérdida de datos, más consumo de memoria/batería, regresiones de accesibilidad, complejidad injustificada o degradación de seguridad.
- El rendimiento forma parte de la aceptación de cada capacidad relevante y de la revisión previa a 1.0.0. No se exigirán benchmarks de funciones aún no implementadas, pero se conservará la línea base de los recorridos que sí existen.

### 11.7 Accesibilidad

- Respetar escalado de texto, contraste, descripciones accesibles, orden de foco, navegación por teclado cuando corresponda y objetivos táctiles adecuados.
- La optimización no puede eliminar etiquetas, semántica, animaciones funcionales necesarias ni feedback accesible. Obsidiana y Cuarzo deben mantener paridad funcional y legibilidad.

Referencias oficiales:
- [Android: medición y análisis del rendimiento](https://developer.android.com/topic/performance/measuring-performance).
- [Android: análisis y optimización del arranque](https://developer.android.com/topic/performance/appstartup/analysis-optimization).
- [Android: inicio de aplicaciones y métricas TTID/TTFD](https://developer.android.com/topic/performance/issues/launch-time).
- [Android: renderizado lento y frames congelados](https://developer.android.com/topic/performance/issues/render).
- [Android: buenas prácticas de rendimiento en Compose](https://developer.android.com/develop/ui/compose/performance/bestpractices).
- [Android: estabilidad de parámetros en Compose](https://developer.android.com/develop/ui/compose/performance/stability).
- [Android: buenas prácticas de optimización del arranque y Baseline Profiles](https://developer.android.com/topic/performance/appstartup/best-practices).

## 12. Decisiones técnicas revisables

Las decisiones técnicas son responsabilidad del desarrollador y pueden evolucionar si aparece una alternativa claramente mejor. Un cambio que afecte requisitos, privacidad, UX o alcance aprobado requiere actualizar los documentos y avisar al propietario antes de incorporarlo.

No se escribe código hasta que la especificación de la fase activa esté aprobada.

## Anexo de implementación — versiones fijadas para Fase 1

Las versiones siguientes quedan fijadas en el catálogo Gradle de la implementación inicial. Se eligieron tras comprobar las publicaciones estables y los requisitos de compatibilidad vigentes el 9 de noviembre de 2026. No se utilizan versiones dinámicas.

| Componente | Versión | Criterio |
|---|---:|---|
| JDK | 17 | Versión aprobada. |
| Android Gradle Plugin | 9.5.1 | Versión estable; admite API 37. |
| Gradle Wrapper | 9.8.1 | Parche estable vigente; AGP 9.5.x requiere al menos Gradle 9.6.0. |
| Android SDK | Platform 37 | compileSdk y targetSdk 37. |
| Android Build Tools | 37.0.0 | Versión fijada para la compilación inicial. |
| Compose BOM | 2026.09.00 | BOM estable recomendado por Android. |
| Compose Compiler Plugin | 2.4.10 | Alineado con Kotlin 2.4.10; AGP 9 incorpora soporte Kotlin. |
| DataStore Preferences | 1.2.1 | Versión estable. |
| Navigation 3 | 1.2.1 | Versión estable publicada el 4 de noviembre de 2026. |
| Lifecycle | 2.11.0 | Versión estable. |
| Activity Compose | 1.13.0 | Versión estable. |
| OkHttp | 5.5.1 | Cliente encapsulado para la política TLS aprobada. |

El proyecto usa inicialmente un único módulo Android app. El flavor production conserva dev.elfast.prisma; el flavor internal utiliza dev.elfast.prisma.internal y una numeración independiente. La CI construye únicamente internalDebug; no configura firma ni secretos de producción.

El recurso tipográfico Inter se incluye localmente como fuente variable y conserva la licencia SIL Open Font License 1.1 en app/src/main/assets/licenses/Inter-OFL-1.1.txt.

La primera compilación interna incorporó la pantalla de Ajustes → Apariencia para verificar la persistencia de Obsidiana y Cuarzo. La implementación de Fase 1 ya añade la navegación estructural, Personal con sus cuatro accesos MVP y la barra inicial de Descubrir. La búsqueda funcional, el diario local y los destinos de sus accesos permanecen reservados a las fases correspondientes.