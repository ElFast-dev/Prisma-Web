# Roadmap — Prisma

**Estado:** Fase 0 cerrada; Fase 1 iniciada con autorización expresa del propietario el 9 de noviembre de 2026.  
**Revisión:** 0.4.9.  
**Última actualización:** 9 de noviembre de 2026.

## Regla operativa de entrega funcional

## REGLA DE ENTREGA FUNCIONAL — LAS PRUEBAS NO SON EL PRODUCTO

El objetivo de cada incremento es entregar una parte de Prisma que el propietario pueda abrir y utilizar realmente. **Las pruebas, los commits, la cantidad de casos automatizados y una CI verde son evidencia de calidad, no sustitutos de una función utilizable.**

- Desarrollar por recorridos verticales completos: pantalla y controles visibles → navegación → estado/ViewModel → dominio/repositorio → persistencia → actualización visible del resultado.
- No declarar una función implementada porque existan tablas Room, entidades, consultas DAO, métodos de repositorio, ViewModels o pruebas. Si el usuario no puede llegar a ella desde la aplicación y completar la acción, está pendiente de integración funcional.
- Cada incremento debe priorizar un flujo que el usuario pueda completar dentro de Prisma. Los tests se escriben junto al cambio para proteger el comportamiento nuevo y los recorridos afectados; no se crean rondas repetitivas de pruebas sin avance funcional correspondiente.
- No ejecutar una nueva CI solo para volver a demostrar lo mismo si no cambió el código, los tests o el entorno relevante. Investigar los fallos reales y usar pruebas focalizadas; mantener la regresión necesaria sin convertirla en el objetivo principal.
- La evidencia de progreso se expresa por lo que el usuario ya puede hacer en la aplicación, qué sigue sin estar conectado y qué impide terminarlo. No presentar el número de pruebas aprobadas como si describiera la funcionalidad visible.
- Un hito solo puede describirse como funcional cuando el recorrido aprobado está conectado de extremo a extremo, el usuario puede completarlo en el APK y las pruebas aplicables respaldan el comportamiento. Un APK que compila pero muestra controles inactivos, rutas sin destino o funciones accesibles solo desde pruebas no cumple ese criterio.
- Si una capacidad ya tiene su capa de datos probada pero carece de pantalla, controles o navegación, declararla **«lógica/datos implementados; interfaz y recorrido funcional pendientes»**. La prioridad siguiente es completar la integración aprobada, no seguir ampliando pruebas de esa capa sin necesidad.
- Mantener la paridad Obsidiana/Cuarzo en cada recorrido. No añadir acciones, accesos, botones, filtros ni otras funciones fuera del alcance aprobado.


## Reglas del roadmap

- Las fases se desarrollan estrictamente en orden. No se comienza una fase sin terminar y aprobar la anterior.
- Antes de programar una fase se prepara una especificación breve con objetivo, alcance, exclusiones, versiones, entregables, dependencias y criterios de aceptación.
- El propietario aprueba la especificación y los resultados verificables; una sucesión de aprobaciones de detalles no equivale a aprobar una fase completa.
- Se limita el trabajo principal en curso: una capacidad grande a la vez, salvo tareas pequeñas que no compitan por la misma atención.
- Cada capacidad se desarrolla como un incremento vertical comprobable: interfaz, lógica, persistencia y pruebas necesarias para completar un recorrido real.
- Las tareas se visualizan en GitHub Projects, vinculadas a Issues y Pull Requests. Los estados de trabajo son: Ideas, Por definir, Preparado, En desarrollo, En pruebas, Bloqueado y Terminado.
- Una tarea solo pasa a Terminado cuando satisface sus criterios de aceptación, supera las pruebas correspondientes y queda documentada. Compilar no basta.
- Las ideas futuras se registran sin diseñarlas ni implementarlas antes de su fase.
- No se modifica el alcance del MVP ni el de 1.0.0 sin aprobación expresa del propietario.
- La guía breve para continuar el trabajo es `docs/CONTEXTO_IA.md`; los documentos detallados siguen siendo la fuente de verdad de cada área.

## Regla de salida y anti-estancamiento para todas las fases

### Límite de refinamiento por decisión

1. Se presenta una propuesta suficientemente completa para decidir.
2. Se permiten como máximo **dos rondas de refinamiento** sobre esa decisión.
3. Después de la segunda ronda, se presenta una recomendación final y se cierra la decisión si cumple el objetivo, o se traslada al backlog si no bloquea la fase. Si sigue siendo imprescindible, permanece como bloqueo P0/P1 con una descripción concreta; no se generan más variantes cosméticas.
4. Una decisión cerrada solo puede reabrirse por fallo de aceptación, nueva evidencia relevante, cambio externo, riesgo P0/P1 o solicitud explícita del propietario.

### Prioridades de pendientes

- **P0 — Bloqueo crítico:** seguridad, privacidad, pérdida de datos o impedimento arquitectónico esencial. Impide cerrar la fase.
- **P1 — Obligatorio:** requisito aprobado o criterio de aceptación de la fase que no se cumple. Impide cerrar la fase.
- **P2 — Importante no bloqueante:** mejora necesaria antes de implementar una capacidad concreta, pero que no impide cerrar la fase actual. Se registra en backlog con su fase objetivo.
- **P3 — Pulido/futuro:** mejora estética, comodidad adicional o idea que no es necesaria para el alcance actual. Se registra para la fase apropiada o se descarta con motivo.

### Puerta de cierre de una fase

Una fase puede declararse **CERRADA** solo cuando:
- Sus entregables obligatorios están completos.
- Todos sus criterios P0/P1 están satisfechos y existe evidencia (pruebas, revisión, artefactos o decisión aprobada, según corresponda).
- No quedan riesgos críticos de seguridad, privacidad, datos o arquitectura.
- Los documentos fuente están sincronizados.
- Cada pendiente P2/P3 está registrado con prioridad y fase/momento objetivo; ninguno se deja abierto de forma ambigua.
- Se presenta el resumen de cierre y el propietario aprueba expresamente la transición.

La fase siguiente requiere su propia especificación aprobada: objetivo, alcance, exclusiones, entregables, dependencias, criterios de aceptación y plan de pruebas. Aprobar una serie de detalles no equivale a aprobar el cierre de la fase ni el inicio de la siguiente.

### Regla específica de Fase 0

Fase 0 **no exige** que todas las pantallas estén pixel-perfect ni que cada detalle visual secundario esté decidido. Puede cerrarse cuando el producto y el MVP están delimitados, los recorridos y requisitos necesarios para planificar el trabajo están consolidados, la arquitectura y los riesgos esenciales están resueltos, el sistema visual y las direcciones de pantallas principales permiten especificar el trabajo, la documentación está sincronizada y la especificación de Fase 1 está preparada y aprobada. Los detalles P2/P3 que no afecten esa preparación se trasladan al backlog y deben cerrarse antes de implementar la capacidad a la que pertenecen.

El cierre aprobado de una fase no inicia automáticamente la siguiente ni autoriza programación. El inicio de la siguiente fase requiere una autorización explícita e independiente del propietario.
## Versionado

Se utilizará Semantic Versioning (SemVer) con **una única secuencia pública y global** para toda la aplicación.

- Antes de completar el producto, las versiones serán **0.x.y**. Las funciones nuevas incrementan la versión menor y las correcciones sin ampliar funcionalidad incrementan el parche.
- Las versiones avanzan sin reiniciarse entre fases.
- **MVP** será una entrega utilizable 0.x.y cuando complete el recorrido esencial y todos los criterios de aceptación de la sección 17 de `REQUISITOS.md`.
- **1.0.0** queda reservada para la primera versión completa que cumpla la sección 18.
- Cada versión distribuida tendrá tag, APK instalable y changelog obligatorio en español publicado en GitHub Releases.
- En el MVP la instalación/actualización del APK es manual mediante Android. El actualizador integrado, su historial de versiones y la descarga desde Prisma se desarrollarán después del MVP.
- Las versiones y cifras siguientes son hitos preliminares de planificación, no fechas ni promesas de entrega. Se ajustarán al especificar cada fase.

## Fase 0 — Definición del producto y alcance

**Estado:** CERRADA — aprobación del propietario registrada el 9 de noviembre de 2026.  
**Código:** ninguno.  
**Objetivo:** acordar el producto, su alcance real, el sistema visual, arquitectura inicial y plan de entrega antes de programar.

Entregables:
- Requisitos sincronizados con las decisiones aprobadas.
- MVP reducido y alcance de 1.0.0 distinguidos.
- Roadmap por entregables.
- Diseño técnico y decisiones de arquitectura iniciales.
- Sistema visual base parcialmente aprobado y conceptos priorizados.
- Guía breve de contexto y reglas para el asistente.
- Primer conjunto de tareas, dependencias y criterios de aceptación.
- Especificación formal de Fase 1 preparada y aprobada por el propietario.

Criterios de cierre:
- El propietario aprueba el alcance del MVP y su separación de las funciones posteriores.
- Los criterios de cierre se evalúan con la regla de salida común de este roadmap: P0/P1 deben resolverse; P2/P3 pueden trasladarse al backlog con fase objetivo. No se exige pixel-perfect de todas las pantallas.
- Requisitos, diseño técnico, estado visual y roadmap están sincronizados.
- La composición MVP de Personal está aprobada: cuatro filas horizontales uniformes en una columna vertical (Historial, Pendientes, Ocultos y Gestionar listas), cada una con icono a la izquierda, nombre y descripción breve en el centro y chevron a la derecha; sin Estadísticas ni espacio vacío artificial.
- La especificación funcional de Descubrir para el MVP está consolidada en `REQUISITOS.md` (composición, búsqueda unificada, estados aprobados y criterios de aceptación), `DISENO_TECNICO.md` (invariantes, concurrencia, conectividad y pruebas mínimas) y `ESTADO_VISUAL.md` (jerarquía, filas y adaptación Obsidiana/Cuarzo). Se confirma una sola lista continua con filas de póster, título y año; solo las películas guardadas muestran «En tu Prisma». No se trasladan marcapáginas ni etiquetas de estado del Feed posterior al MVP. Están definidos los estados inicial, carga, sin resultados, error remoto, sin conexión, sin token verificado y borrado de consulta. La dirección visual de Descubrir ya está seleccionada: Concepto A — Continuidad silenciosa, con avisos integrados y discretos. Están aprobadas la altura de barra de 52 dp, su radio de 14 dp, su borde superior a 16 dp del límite inferior del área segura superior de Android, el fondo de Prisma extendido detrás de la barra de estado y el ritmo vertical aprobado: 16 dp entre barra y primera fila cuando no hay aviso contextual; cuando hay un aviso intermedio, 12 dp entre barra y aviso y otros 12 dp entre aviso y primera fila. La separación nominal entre filas de 12 px se implementa como 12 dp según la regla compartida de unidades. También están aprobados la lupa y el engranaje de 18 × 18 dp con trazo de 1,4 dp; el engranaje tiene seis dientes simplificados, abertura central de 4 dp y área táctil de 48 × 48 dp; la lupa reserva un slot visual de 48 dp y no es un botón independiente. La distribución horizontal aprobada añade margen exterior de 16 dp a ambos lados y separaciones de 8 dp entre slot de lupa/texto y texto/slot de Ajustes; el campo ocupa el ancho flexible restante. El lenguaje ilustrativo de estados vacíos ya está aprobado: prisma facetado con facetas suaves, trazos finos y un símbolo secundario pequeño; cuatro ilustraciones diferenciadas para estado inicial, sin resultados, error remoto sin resultados y sin conexión sin resultados. «Conecta TMDB» no tendrá ilustración central y los avisos con resultados seguirán siendo discretos. El tamaño de referencia de las cuatro ilustraciones centrales está aprobado en **96 × 96 dp**. Su posición, separación respecto al título/texto/acción y composición de cada estado, así como la ubicación exacta del aviso de token, siguen pendientes como P2: no bloquean la salida de Fase 0 si no afectan la especificación de Fase 1, pero deben resolverse antes de implementar los estados vacíos de Descubrir. El ritmo vertical anterior ya está aprobado. El margen lateral nominal de las filas de 16 px se implementa como 16 dp según la regla compartida, igual que el margen exterior aprobado de la barra. Esta elección no aprueba una pantalla final ni autoriza programación. La revisión también debe resolver la precedencia cuando coinciden condiciones de disponibilidad (por ejemplo, ausencia simultánea de conexión y de token verificado).
- No se exige diseñar todavía pantallas de fases posteriores.
- Tema de apariencia aprobado: Obsidiana es el tema inicial; el usuario puede cambiar manualmente entre Obsidiana y Cuarzo desde Ajustes y la preferencia se conserva localmente mediante DataStore. El selector está especificado para Ajustes → Apariencia mediante un control segmentado «Obsidiana»/«Cuarzo», con cambio inmediato y persistencia en DataStore.
- Identidad Android aprobada: `applicationId` y `namespace` serán ambos `dev.elfast.prisma` y se mantendrán estables.
- Nivel mínimo de Android aprobado: `minSdk = 26` (Android 8.0 Oreo).
- SDK objetivo inicial aprobado: `targetSdk = 37` (Android 17), independiente de `minSdk`.
- Estrategia de `versionCode` aprobada: contador secuencial único; comienza en 1 para el primer APK público, aumenta en una unidad por Release distribuida y nunca se reinicia ni reutiliza. Las compilaciones internas tendrán variante y numeración separadas.
- Estrategia de firma de producción aprobada: almacén JKS, clave RSA de 4096 bits, firma SHA-256 con RSA y certificado con vigencia de 30 años. Se custodiarán dos respaldos cifrados en ubicaciones físicas independientes y las contraseñas por separado. GitHub Actions firmará mediante el entorno protegido `production`, con aprobación manual y secretos limitados al trabajo de publicación. CI verificará la firma y la huella SHA-256 del certificado. Las compilaciones internas tendrán una identidad y una firma distintas.
- Política de copias Android aprobada: Auto Backup del sistema, copias en nube y transferencias automáticas entre dispositivos desactivadas. `allowBackup=false` se complementará con reglas explícitas `fullBackupContent` para API 26–30 y `dataExtractionRules` para API 31+, excluyendo nube, D2D y cualquier transferencia multiplataforma disponible. Solo se admiten exportaciones manuales `.prisma` cifradas desde Prisma.
- La estrategia de firma queda decidida; su preparación operativa es obligatoria antes del primer APK público: generar la clave, comprobar la recuperación de los respaldos, registrar la huella del certificado, configurar el entorno y secretos de producción y verificar una actualización sobre una instalación previa sin pérdida de datos locales.
- La autorización particular de TMDB está confirmada y su respuesta oficial completa está transcrita en `docs/LICENCIAS/TMDB_PRISMA.md`: metadatos, aprendizaje/validación, caché ilimitada de metadatos e imágenes, pósteres, fondos, fotografías, logotipos y JustWatch vía TMDB, sin atribución adicional. No queda pendiente confirmar el alcance descrito en esa respuesta. Prisma se desarrolla para uso personal y no se comercializa.
- La especificación formal de la Fase 1 está APROBADA por el propietario. Define objetivo, alcance, exclusiones, dependencias, decisiones técnicas, entregables, criterios de aceptación y plan de pruebas. La fase permanece NO INICIADA hasta el cierre explícito de Fase 0. La implementación del flujo de CI no utilizará secretos de producción; la firma de producción queda para su puerta operativa posterior.
- No se programa durante esta fase.

## Cierre de Fase 0 — aprobado

**Fecha de aprobación del propietario:** 9 de noviembre de 2026.  
**Resultado:** Fase 0 CERRADA. No se autoriza por este acto el inicio automático de Fase 1.

Entregables y condiciones consolidados:
- Producto, principios local-first, alcance del MVP y separación respecto a 1.0.0 documentados.
- Flujos funcionales principales y dirección de Descubrir y Personal definidos al nivel necesario para planificar.
- Arquitectura inicial, identidad Android, almacenamiento, privacidad, política HTTPS/TLS y estrategia de copias documentadas.
- Autorización particular de TMDB archivada en su documento específico.
- Riesgos esenciales de diseño revisados; no quedan bloqueos P0/P1 documentales identificados para cerrar Fase 0.
- Pendientes P2/P3 clasificados y asignados a fase objetivo.
- Especificación formal de Fase 1 aprobada por el propietario.

**Trabajo aún no realizado:** no se ha escrito código, no existe una compilación ni se han ejecutado pruebas de implementación. Los criterios técnicos de seguridad siguen siendo criterios de aceptación de las fases donde se implementarán.

**Puerta siguiente:** Fase 1 permanece NO INICIADA. Aunque su especificación ya está aprobada, hace falta autorización explícita del propietario para comenzar su ejecución.

## Backlog priorizado P2/P3

Los elementos siguientes no bloquean el cierre de Fase 0. Cada P2 se resuelve antes de implementar la capacidad indicada; los P3 pueden esperar hasta que la fase objetivo confirme que aportan valor. Ningún elemento amplía por sí solo el MVP.

| Prioridad | Pendiente | Fase objetivo | Condición de resolución |
|---|---|---|---|
| P2 | Posición, separación y composición final de estados vacíos de Descubrir y aviso «Conecta TMDB». | Fase 3 | Antes de implementar los estados vacíos y sus avisos. |
| P2 | Precedencia de estados simultáneos de Descubrir (sin conexión/sin token, pérdida de conexión durante petición). | Fase 3 | Antes de implementar la coordinación del estado remoto. |
| P2 | Puntuación exacta y desempates de resultados locales/remotos. | Fase 3 | Antes de cerrar el orden de la búsqueda combinada. |
| P2 | Presentación mínima de Gestionar listas y contenido de una lista en el MVP. | Fase 2 | Antes de implementar esas pantallas; no incluye gestión avanzada. |
| P2 | Tratamiento de fechas de visionado sin hora conocida y selección de estreno TMDB por país. | Fases 2 y 3 | Fase 2 para el modelo de visionado; Fase 3 para fechas remotas. |
| P2 | Composición visual y estados de la navegación principal Personal/Descubrir, conservando las propiedades ya aprobadas de la píldora. | Fase 1 | Antes de implementar la navegación. |
| P2 | Dimensiones, acabado visual y estados de la pantalla raíz de Personal, conservando exactamente los cuatro accesos aprobados. | Fase 1 | Antes de implementar esa pantalla. |
| P2 | KDF, sal, parámetros AES-256-GCM, encabezado y formato versionado de copias. | Fase 4 | Antes de implementar exportación y restauración. |
| P2 | Fuentes/condiciones autorizadas para tráileres, enlaces rápidos y puntuaciones externas. | Fase 6 | Antes de integrar cada fuente; la autorización TMDB no cubre terceros. |
| P2 | Presentación y navegación de Colecciones desde la ficha. | Fase 6 | Antes de implementar Colecciones en la experiencia completa. |
| P2 | Métricas, gráficos y visualizaciones exactas de Estadísticas. | Fase 7 | Antes de implementar Estadísticas. |
| P2 | Señales, pesos, umbrales, muestra mínima y explicaciones de Espectro. | Fase 7 | Antes de implementar aprendizaje y recomendaciones. |
| P3 | Idiomas adicionales y detalle del selector; el MVP conserva la interfaz en español. | Fase 6 | Solo si se aprueba ampliar la localización. |
| P3 | Soporte de *pre-releases* en el actualizador; recomendación inicial: versiones estables únicamente. | Fase 8 | Antes de implementar el actualizador. |
| P3 | Diseño y comportamiento del distintivo/indicador de actualización disponible y sus estados. | Fase 8 | Antes de implementar el actualizador. |

### Puerta operativa P1 antes del primer APK de producción para uso personal

No bloquea Fase 0 ni la implementación inicial, pero bloquea la primera instalación de producción destinada al propietario:
- Generar la clave de firma aprobada, crear dos respaldos cifrados independientes y comprobar su recuperación.
- Registrar la huella SHA-256 y configurar el entorno protegido y secretos de GitHub Actions.
- Verificar una actualización firmada sobre una instalación previa, comprobando que no se pierden los datos locales.

La lista de decisiones y sus fases objetivo se mantiene sincronizada con el apartado «Decisiones abiertas — backlog P2/P3» de `REQUISITOS.md`.

## Fase 1 — Fundamentos Android y entrega continua

**Estado:** EN CURSO; especificación APROBADA e inicio autorizado por el propietario el 9 de noviembre de 2026.  
**Objetivo:** obtener una aplicación nativa instalable, arquitectura inicial mantenible y automatización de compilación/pruebas.

### Especificación formal aprobada

1. **Objetivo:** preparar la base técnica Android instalable, la navegación estructural, los temas y la CI sin adelantar el diario funcional.
2. **Alcance:** proyecto Kotlin/Compose/Material 3; una Activity y un módulo `app` inicialmente, organizado por capas y paquetes; navegación Personal/Descubrir; pantalla raíz Personal con sus cuatro accesos aprobados; selector Obsidiana/Cuarzo en Ajustes → Apariencia; persistencia de tema con DataStore; recursos Inter locales; APK universal interno con identidad separada; CI para compilación, calidad y pruebas.
3. **Exclusiones:** Room y datos funcionales, alta manual, Historial, Pendientes, Ocultos, listas, búsqueda, integración TMDB y token real, caché de metadatos, copias `.prisma`, KDF, firma de producción, actualizador, estadísticas y Espectro.
4. **Dependencias:** decisiones aprobadas de identidad Android, `minSdk=26`, `targetSdk=37`, temas y sistema visual; Android SDK 37; recursos Inter y licencia; GitHub Actions.
5. **Decisiones técnicas:** `applicationId`/`namespace` públicos conservan `dev.elfast.prisma`; variante interna con identificador separado (recomendado `dev.elfast.prisma.internal`) y numeración independiente; JDK 17; AGP 9.5.1 y Gradle 9.6.0 como base compatible a verificar al iniciar; Compose BOM 2026.09.00; OkHttp 5.5.1 para el cliente de red encapsulado; usar Kotlin integrado de AGP 9 sin añadir `org.jetbrains.kotlin.android` salvo incompatibilidad verificada. Versiones fijadas, sin dependencias dinámicas. APK universal y SHA-256 verificable. No generar clave JKS ni habilitar secretos de producción en esta fase.
6. **Entregables:** proyecto compilable; navegación estructural; selector de temas y persistencia; sistema visual base; configuración HTTPS/TLS y Android Backup; pruebas automatizadas y CI; APK universal interno con checksum; documentación sincronizada.
7. **Criterios de aceptación:** compilación y pruebas base en CI; APK interno instalable en API 26 y probado en API 37; identidad interna separada; navegación y selector funcionales; tema persistente; paridad Obsidiana/Cuarzo; reglas de exclusión de backups para API 26–30 y API 31+ verificadas para nube y transferencias; HTTP remoto bloqueado; TLS 1.2 mínimo y TLS 1.3 cuando disponible; certificados y hostname validados; ausencia de credenciales en logs y artefactos; adaptación a pantallas grandes y ventanas redimensionables; ninguna función placeholder aparenta estar terminada.
8. **Plan de pruebas:** compilación limpia, lint y dependencias; instalación y actualización de variante interna; persistencia de temas tras reinicio y recreación del proceso; navegación y estados visuales en ambos temas; pruebas TLS 1.2/1.3, rechazo de TLS antiguo, certificados inválidos y HTTP remoto; revisión de logs con credenciales ficticias; Android Backup API 26–30 y 31+ (nube, D2D y transferencia multiplataforma disponible); pruebas en teléfonos, pantallas amplias, ventanas redimensionables y plegables.

Hitos preliminares:
- **0.1.0:** proyecto Kotlin/Compose, estructura de módulos, configuración de calidad y CI.
- **0.2.0:** carcasa navegable, temas Obsidiana/Cuarzo y primer APK de prueba.

Criterios de cierre: el proyecto compila en CI, ejecuta pruebas base, genera un APK instalable, se instala y ejecuta el recorrido esencial en API 26 (`minSdk` aprobado), prueba los comportamientos de `targetSdk = 37`, valida en CI la secuencia de `versionCode` para Releases, verifica que Android Auto Backup excluya nube y transferencias automáticas en API 26–30 y API 31+, demuestra HTTPS obligatorio con TLS 1.2 como mínimo, TLS 1.3 cuando esté disponible, validación de certificados/hostname, bloqueo de tráfico cleartext y ausencia de Certificate Pinning, y completa los recorridos principales en ventanas redimensionables y pantallas grandes sin recortes ni acciones inaccesibles; además, no contiene secretos.

## Fase 2 — Diario cinematográfico local

**Estado:** NO INICIADA.  
**Objetivo:** construir el núcleo de datos y el recorrido personal sin depender de Internet.

Hitos preliminares:
- **0.3.0:** modelo local de películas, alta manual (título obligatorio, año opcional), persistencia y búsqueda local básica.
- **0.4.0:** Pendientes e Historial, una película por entrada y registros de visionados independientes con fecha/hora disponible.
- **0.5.0:** calificación por visionado, Ocultos y restauración conservando el estado anterior, listas personalizadas manuales básicas.

Criterios de cierre: los datos resisten cierres y reinicios; no hay duplicados; los visionados repetidos conservan fechas y calificaciones; las operaciones locales funcionan sin conexión.

## Fase 3 — Catálogo esencial con TMDB

**Estado:** NO INICIADA.  
**Objetivo:** facilitar la identificación y consulta básica de películas sin convertir Descubrir en un feed avanzado.

Hitos preliminares:
- **0.6.0:** almacenamiento cifrado AES-256-GCM del token mediante Android Keystore, gestión de la clave y su ciclo de vida, validación del token, sustitución segura, manejo de errores y búsqueda por título.
- **0.7.0:** selección supervisada de coincidencias, ficha básica, enriquecimiento de películas manuales y caché local de metadatos/imágenes.

Criterios de cierre: no se asocian coincidencias ambiguas automáticamente; la falta de token o Internet no bloquea el diario; no se transmite el historial personal; los datos descargados siguen disponibles offline; el token solo persiste cifrado en DataStore, la clave reside en Android Keystore, los fallos de clave se recuperan solicitando reintroducción sin afectar el diario y las pruebas de manipulación, sustitución y eliminación pasan; todas las peticiones autenticadas usan HTTPS/TLS con certificado y hostname válidos, los redirects no rebajan a HTTP ni filtran el Bearer token y las pruebas de red superan los criterios definidos.

## Fase 4 — Protección de datos y cierre del MVP

**Estado:** NO INICIADA.  
**Objetivo:** proteger los datos personales y validar el recorrido completo antes de considerar Prisma utilizable como diario habitual.

Hitos preliminares:
- **0.8.0:** formato versionado, exportación cifrada, restauración, validación de integridad, migración compatible y recuperación ante fallos.
- **0.9.0:** integración y regresión del MVP, pruebas en Android, documentación de instalación, APK y aprobación del propietario.

Criterios de cierre: se puede exportar y restaurar la copia; se rechazan archivos manipulados o incompatibles sin sobrescribir los datos actuales; se prueba la recuperación ante fallos; se validan los recorridos offline y ambos temas. Antes del primer APK público se completa además la preparación operativa de la firma de producción y se demuestra una actualización firmada sobre una instalación previa sin pérdida de datos locales. La entrega 0.9.0 podrá denominarse MVP solo tras cumplir todos los criterios de `REQUISITOS.md` sección 17.

## Fase 5 — Gestión avanzada de colecciones

**Estado:** NO INICIADA; posterior al MVP.  
**Objetivo:** completar la experiencia de listas personalizadas y organización avanzada de Personal.

Alcance aprobado para desarrollar en esta fase:
- Paleta de colores, tarjetas horizontales, collages y fijación de listas.
- Reordenación manual de listas y películas.
- Ordenaciones temporales que preservan el orden manual.
- Filtros independientes por lista, AND/OR y búsqueda dentro de listas.
- Contadores y estados vacíos diferenciados.
- Filtros, presentaciones y ordenaciones avanzadas en Historial, Pendientes y Ocultos.

Los detalles aprobados están descritos en `REQUISITOS.md`; su especificación de implementación se preparará cuando llegue el turno de esta fase.

## Fase 6 — Experiencia cinematográfica completa

**Estado:** NO INICIADA; posterior al MVP.  
**Objetivo:** ampliar la ficha y Descubrir con información autorizada y una experiencia de exploración completa.

Alcance:
- Ficha ampliada, créditos, tráileres, colecciones y películas relacionadas.
- Disponibilidad de streaming y filtros por región, cuando existan datos y derechos de uso.
- Feed, modos de contenido, filtros y presentaciones avanzadas.
- Configuración de idioma y protección de spoilers según alcance aprobado.

## Fase 7 — Estadísticas y Espectro

**Estado:** NO INICIADA; posterior al MVP.  
**Objetivo:** convertir los datos locales en comprensión de gustos y recomendaciones explicables.

Alcance:
- Estadísticas y visualizaciones completas basadas en registros reales.
- Espectro, algoritmo local de aprendizaje y recomendaciones personalizadas.
- Explicación de las señales que respaldan cada recomendación.
- Privacidad local: no enviar historial ni perfil a proveedores externos.

Criterio de cierre: cifras y recomendaciones trazables a datos locales; se informa cuando no hay muestra suficiente.

## Fase 8 — Actualizador integrado y preparación de 1.0.0

**Estado:** NO INICIADA; posterior al MVP.  
**Objetivo:** añadir la gestión de actualizaciones desde Prisma y completar la validación integral del producto.

Alcance:
- Comprobación manual desde Ajustes, sin consulta automática al abrir ni en segundo plano.
- Consulta de Releases oficiales, versión y changelog.
- Descarga y validación del APK; instalación delegada al sistema Android.
- Historial de versiones dentro de Prisma.
- Revisión integral de seguridad, rendimiento, accesibilidad, migraciones, funcionamiento offline, copias/restauración y paridad Obsidiana/Cuarzo.
- APK final, documentación y aprobación del propietario.

**1.0.0** solo se publica cuando todas las fases y todos los requisitos aprobados para la versión completa están implementados y validados.

## Después de 1.0.0

Las listas inteligentes que incorporan o retiran películas automáticamente según reglas son una idea futura. Requieren investigación, definición de comportamiento y aprobación antes de incorporarse a un roadmap de implementación.

## Registro de fases

| Fase | Estado | Aprobación del propietario | Hito de referencia |
|---|---|---|---|
| 0. Definición del producto | Cerrada | Aprobada por el propietario (9 nov 2026) | No aplica |
| 1. Fundamentos Android | En curso | Especificación e inicio aprobados (9 nov 2026) | 0.2.0 |
| 2. Diario local | No iniciada | Pendiente | 0.5.0 |
| 3. TMDB esencial | No iniciada | Pendiente | 0.7.0 |
| 4. Protección y MVP | No iniciada | Pendiente | 0.9.0 |
| 5. Colecciones avanzadas | No iniciada | Pendiente | Por especificar |
| 6. Experiencia cinematográfica | No iniciada | Pendiente | Por especificar |
| 7. Estadísticas y Espectro | No iniciada | Pendiente | Por especificar |
| 8. Actualizador y 1.0.0 | No iniciada | Pendiente | 1.0.0 |
