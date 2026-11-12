> **Archivo histórico de la etapa Android.** Fuente sincronizada desde `feature/fase1-android-foundation` antes de retirar el repositorio anterior. Los hitos y requisitos históricos se conservan como antecedente; la fuente vigente de Prisma Web está en `docs/ROADMAP.md` y `docs/TECNICO/`.

# Roadmap — Prisma

**Estado:** Fase 0 y Fase 1 cerradas; Fase 2 autorizada expresamente por el propietario el 10 de noviembre de 2026 y EN DESARROLLO.  
**Revisión:** hitos de desarrollo y versionado separados.  
**Última actualización:** 11 de noviembre de 2026.

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

- Los hitos se identifican mediante IDs de desarrollo F<fase>-H<hito>; nunca se nombran con SemVer. La política de compilaciones y producto está en docs/TECNICO/VERSIONADO_Y_COMPILACIONES.md.

- Las fases se desarrollan estrictamente en orden. No se comienza una fase sin terminar y aprobar la anterior.
- Antes de programar una fase se prepara una especificación breve con objetivo, alcance, exclusiones, ID de hito, entregables, dependencias y criterios de aceptación.
- El propietario aprueba la especificación y los resultados verificables; una sucesión de aprobaciones de detalles no equivale a aprobar una fase completa.
- Se limita el trabajo principal en curso: una capacidad grande a la vez, salvo tareas pequeñas que no compitan por la misma atención.
- Cada capacidad se desarrolla como un incremento vertical comprobable: interfaz, lógica, persistencia y pruebas necesarias para completar un recorrido real.
- Las capacidades pueden visualizarse en GitHub Projects y vincularse a Issues/Pull Requests cuando aporte trazabilidad. El tablero no es una puerta previa al desarrollo: no crear un Issue por cada commit, prueba o cambio rutinario ni detener código útil por actualizar estados. Los estados disponibles son: Ideas, Por definir, Preparado, En desarrollo, En pruebas, Bloqueado y Terminado.
- Una tarea solo pasa a Terminado cuando satisface sus criterios de aceptación, supera las pruebas correspondientes y queda documentada. Compilar no basta.
- Las ideas futuras se registran sin diseñarlas ni implementarlas antes de su fase.
- No se modifica el alcance del MVP ni el de 1.0.0 sin aprobación expresa del propietario.
- La guía breve para continuar el trabajo es `docs/CONTEXTO_IA.md`; los documentos detallados siguen siendo la fuente de verdad de cada área.

## Regla de salida y anti-estancamiento para todas las fases

### Límite de refinamiento por decisión

1. Se presenta una propuesta suficientemente completa para decidir.
2. Se permiten por defecto **hasta dos rondas de refinamiento** de una propuesta, suficientes para aclarar diferencias relevantes sin perpetuar deliberaciones.
3. Después de la segunda ronda, se presenta una recomendación final y se cierra la decisión si cumple el objetivo, o se traslada al backlog si no bloquea la fase. Si sigue siendo imprescindible, permanece como bloqueo P0/P1 con una descripción concreta; no se generan más variantes cosméticas. El límite no impide una revisión solicitada por el propietario ni una reapertura respaldada por evidencia nueva.
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

### Regla de velocidad y duración de CI

- La CI comprueba el estado del código; no debe convertirse en una espera que detenga el resto del desarrollo. Las tareas independientes continúan en paralelo con ramas y recursos aislados.
- Objetivo operativo para una ejecución completa habitual: **10 minutos o menos**, de acuerdo con los tiempos observados de #117 (6 min 42 s) y #119 (8 min 13 s). Si se supera, se identificará la etapa concreta mediante tiempos de jobs/steps y se optimizará sin retirar cobertura.
- Build/lint/JVM tiene un límite de job de 10 minutos. API 26 y API 37 se ejecutan en paralelo en emuladores separados; los pasos de emulador tienen límites de 13 y 16 minutos respectivamente, con un máximo de 20 minutos para el job de matriz.
- Los límites de tiempo son protecciones contra bloqueos, no aprobación automática ni sustituto de las pruebas. Un timeout significa resultado incompleto/fallido y conserva logs; jamás significa PASS.
- Mantener las suites obligatorias y publicar el APK interno final solo después de que build, API 26 y API 37 pasen. La validación activa no se cancela automáticamente al recibir un push; la pendiente obsoleta se sustituye por la actualización más reciente.

### Regla específica de Fase 0

Fase 0 **no exige** que todas las pantallas estén pixel-perfect ni que cada detalle visual secundario esté decidido. Puede cerrarse cuando el producto y el MVP están delimitados, los recorridos y requisitos necesarios para planificar el trabajo están consolidados, la arquitectura y los riesgos esenciales están resueltos, el sistema visual y las direcciones de pantallas principales permiten especificar el trabajo, la documentación está sincronizada y la especificación de Fase 1 está preparada y aprobada. Los detalles P2/P3 que no afecten esa preparación se trasladan al backlog y deben cerrarse antes de implementar la capacidad a la que pertenecen.

El cierre aprobado de una fase no inicia automáticamente la siguiente ni autoriza programación. El inicio de la siguiente fase requiere una autorización explícita e independiente del propietario.
## Versionado y compilaciones

La política normativa está en [docs/TECNICO/VERSIONADO_Y_COMPILACIONES.md](TECNICO/VERSIONADO_Y_COMPILACIONES.md). El roadmap identifica trabajo con fases e hitos (por ejemplo, F2-H2), nunca con números SemVer. Los APK internos se identifican con CI, SHA y variante. SemVer y versionCode solo cambian cuando se aprueba y publica una entrega real del producto.

Los antiguos números 0.2.0–0.9.0 se conservan como alias históricos de hitos de desarrollo; no fueron Releases de producto.

## Plan operativo consolidado — revisión 11 de noviembre de 2026

Esta sección establece el orden de ejecución vigente y resuelve las dependencias entre hitos de desarrollo. Los hitos son secuenciales: no se adelantan funciones de fases o hitos posteriores para completar una pantalla antes de tiempo.

### Estado real y prioridad

| Hito de desarrollo | Estado | Alcance resumido |
|---|---|---|
| F2-H1 | Validado | Room local, alta manual, título/año, persistencia, búsqueda offline y prevención de duplicados. |
| F2-H2 | **CERRADO — aceptado por el propietario (11 nov 2026)** | Ficha local conectada desde Historial/Pendientes; consulta de visionados; registro con datos locales; retirada de Pendientes con confirmación. |
| F2-H3 | **En integración funcional — CI/aceptación pendientes** | Calificaciones por visionado, Ocultos/restauración y listas manuales básicas locales. Las pantallas y rutas Compose ya están conectadas en la rama activa; falta validar el incremento completo y la aceptación. |
| F3-H1 | Posterior | Token TMDB cifrado y ciclo de vida seguro. |
| F3-H2 | Posterior | Búsqueda TMDB supervisada y enriquecimiento de la ficha con metadatos/imágenes verificados. |
| F4-H1 | Posterior | Exportación/restauración manual cifrada y formato versionado. |
| F4-H2 | Posterior | Regresión integral, aceptación del MVP, documentación y entrega. |

### Secuencia de trabajo vigente para F2-H2

1. **Puerta visual — completada:** el propietario aprobó el Concepto A refinado de ficha local mínima, en Obsidiana y Cuarzo, el 11 de noviembre de 2026. Los vectores manuales aprobados están en `docs/DISENO/CONCEPTOS_FASE2/`; la alternativa B queda archivada como no seleccionada.
2. **Navegación:** cada fila completa de Historial y Pendientes abre la ficha de la misma película local. Volver retorna a la lista de origen. No se introduce una acción directa de retirada en la fila.
3. **Ficha local:** muestra solo título y año cuando están guardados, estado de Historial/Pendientes y registros de visionado. El póster sigue siendo provisional; no se inventan fecha de estreno, país, duración, géneros, sinopsis ni puntuaciones.
4. **Registro de visionado:** en esta etapa local se habilitan «Ahora» y «Seleccionar fecha». La fecha representa el inicio del visionado; se conserva la hora local cuando se conoce y se mantiene nula cuando no se conoce.
5. **Retirada de Pendientes:** solo desde la ficha y con confirmación. Cancelar no cambia nada; confirmar elimina únicamente la relación con Pendientes, no la película local ni sus registros de Historial.
6. **Pruebas y cierre del incremento:** pruebas de Room/repositorio/ViewModel, navegación y Compose en Obsidiana y Cuarzo; CI API 26 y API 37; persistencia, búsquedas, doble registro, fecha/hora opcional, cancelación/confirmación de retirada y funcionamiento offline. Actualizar documentación y presentar evidencia antes de declarar F2-H2 terminado.

### Dependencias aplazadas deliberadamente

- «Día de estreno» necesita una fecha de estreno verificada disponible en los datos locales; se habilitará cuando el enriquecimiento de F3-H2 pueda proporcionarla.
- «Ajustar al inicio» necesita una duración conocida y válida; se habilitará en F3-H2 cuando esa duración exista. Nunca se calcula con un dato ausente o inválido.
- El póster real, país, duración, géneros y sinopsis dependen de metadatos/imágenes posteriores; no se simulan en F2-H2.
- Calificaciones individuales pertenecen a F2-H3. Los registros de F2-H2 no mostrarán estrellas ni puntuaciones inventadas.
- «Ocultar», «Mostrar de nuevo» y las listas manuales básicas quedan en F2-H3; no se añaden menús ni controles sin función en la ficha local F2-H2.

### Orden global después de F2-H2

- **Primero completar Fase 2:** F2-H2 está cerrado y F2-H3 se encuentra en desarrollo por activación expresa del propietario. No se inicia Fase 3 mientras Fase 2 siga abierta.
- **Después Fase 3:** F3-H1 resuelve la credencial y su seguridad; F3-H2 integra búsqueda, selección supervisada y enriquecimiento. El diario debe seguir funcionando sin red ni token.
- **Después Fase 4:** F4-H1 implementa la copia manual cifrada; F4-H2 integra y prueba el MVP completo.
- Las fases posteriores al MVP conservan su orden actual: colecciones avanzadas, experiencia cinematográfica, Estadísticas/Espectro y actualizador integrado.

### Regla de entrega por incremento

Cada incremento debe tener alcance explícito, exclusiones, dependencias, criterio de aceptación verificable, pruebas automatizadas, evidencia CI y documentación sincronizada. No se considera terminado por compilar. Las pruebas físicas en el Galaxy A03 y la instalación de cualquier APK requieren autorización expresa; la CI en emuladores no sustituye esa autorización.

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
- Política de copias Android aprobada: Auto Backup del sistema, copias en nube y transferencias automáticas entre dispositivos desactivadas. `allowBackup=false` se complementará con reglas explícitas `fullBackupContent` para API 26–30 y `dataExtractionRules` para API 31+, excluyendo nube, D2D y transferencia multiplataforma cuando el sistema Android la admita. Las reglas deben excluir todos los dominios de datos, no limitarse a declarar `allowBackup=false`. Solo se admiten exportaciones manuales `.prisma` cifradas desde Prisma.
- La estrategia de firma queda decidida; su preparación operativa es obligatoria antes del primer APK público: generar la clave, comprobar la recuperación de los respaldos, registrar la huella del certificado, configurar el entorno y secretos de producción y verificar una actualización sobre una instalación previa sin pérdida de datos locales.
- La autorización particular de TMDB está confirmada y su respuesta oficial completa está transcrita en `docs/LICENCIAS/TMDB_PRISMA.md`: metadatos, aprendizaje/validación, caché ilimitada de metadatos e imágenes, pósteres, fondos, fotografías, logotipos y JustWatch vía TMDB, sin atribución adicional. No queda pendiente confirmar el alcance descrito en esa respuesta. Prisma se desarrolla para uso personal y no se comercializa.
- La especificación formal de la Fase 1 está APROBADA y la fase está EN CURSO desde la autorización expresa del propietario del 9 de noviembre de 2026. Ya existe un proyecto Android inicial y una primera compilación interna generada por CI. La implementación del flujo de CI no utiliza secretos de producción; la firma de producción queda para su puerta operativa posterior.
- La Fase 0 concluyó sin programación; la autorización independiente de Fase 1 habilitó el inicio de la implementación.

## Cierre de Fase 0 — aprobado

**Fecha de aprobación del propietario:** 9 de noviembre de 2026.  
**Resultado:** Fase 0 CERRADA. Fase 1 se inició posteriormente mediante autorización expresa e independiente del propietario el 9 de noviembre de 2026.

Entregables y condiciones consolidados:
- Producto, principios local-first, alcance del MVP y separación respecto a 1.0.0 documentados.
- Flujos funcionales principales y dirección de Descubrir y Personal definidos al nivel necesario para planificar.
- Arquitectura inicial, identidad Android, almacenamiento, privacidad, política HTTPS/TLS y estrategia de copias documentadas.
- Autorización particular de TMDB archivada en su documento específico.
- Riesgos esenciales de diseño revisados; no quedan bloqueos P0/P1 documentales identificados para cerrar Fase 0.
- Pendientes P2/P3 clasificados y asignados a fase objetivo.
- Especificación formal de Fase 1 aprobada por el propietario.

**Estado al cierre de Fase 0:** en ese momento no se había escrito código ni generado una compilación. Después, Fase 1 creó el proyecto Android inicial, sus temas y persistencia de apariencia, las políticas iniciales de red/copias y CI. La primera compilación interna pasó las comprobaciones de CI y produjo un APK interno; la validación en dispositivos físicos y las pruebas reales de exclusión de copias/red siguen pendientes.

**Estado posterior:** Fase 1 está EN CURSO con autorización expresa del propietario. El desarrollo continúa en `feature/fase1-android-foundation`; `main` no se considera actualizado hasta integrar los cambios tras su revisión.

## Backlog priorizado P2/P3

Los elementos siguientes no bloquean el cierre de Fase 0. Cada P2 se resuelve antes de implementar la capacidad indicada; los P3 pueden esperar hasta que la fase objetivo confirme que aportan valor. Ningún elemento amplía por sí solo el MVP. La composición visual MVP de Personal y la de búsqueda/resultados de Descubrir fueron aprobadas y se retiraron del backlog; los pendientes de estados vacíos y avisos de Descubrir continúan asignados a Fase 3.

| Prioridad | Pendiente | Fase objetivo | Condición de resolución |
|---|---|---|---|
| P2 | Posición, separación y composición final de estados vacíos de Descubrir y aviso «Conecta TMDB». | Fase 3 | Antes de implementar los estados vacíos y sus avisos. |
| P2 | Precedencia de estados simultáneos de Descubrir (sin conexión/sin token, pérdida de conexión durante petición). | Fase 3 | Antes de implementar la coordinación del estado remoto. |
| P2 | Puntuación exacta y desempates de resultados locales/remotos. | Fase 3 | Antes de cerrar el orden de la búsqueda combinada. |
| P2 | Presentación mínima de Gestionar listas y contenido de una lista en el MVP. | Fase 2 | Antes de implementar esas pantallas; no incluye gestión avanzada. |
| P2 | Tratamiento de fechas de visionado sin hora conocida y selección de estreno TMDB por país. | Fases 2 y 3 | Fase 2 para el modelo de visionado; Fase 3 para fechas remotas. |
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

**Estado:** COMPLETADA el 10 de noviembre de 2026; especificación aprobada e inicio autorizado el 9 de noviembre de 2026. Cierre respaldado por CI #129 y por la matriz física del Galaxy A03 confirmada por el propietario.  
**Objetivo:** obtener una aplicación nativa instalable, arquitectura inicial mantenible y automatización de compilación/pruebas.

### Especificación formal aprobada

1. **Objetivo:** preparar la base técnica Android instalable, la navegación estructural, los temas y la CI sin adelantar el diario funcional.
2. **Alcance:** proyecto Kotlin/Compose/Material 3; una Activity y un módulo `app` inicialmente, organizado por capas y paquetes; navegación Personal/Descubrir; pantalla raíz Personal con sus cuatro accesos aprobados; selector Obsidiana/Cuarzo en Ajustes → Apariencia; persistencia de tema con DataStore; recursos Inter locales; APK universal interno con identidad separada; CI para compilación, calidad y pruebas.
3. **Exclusiones:** Room y datos funcionales, alta manual, Historial, Pendientes, Ocultos, listas, búsqueda, integración TMDB y token real, caché de metadatos, copias `.prisma`, KDF, firma de producción, actualizador, estadísticas y Espectro.
4. **Dependencias:** decisiones aprobadas de identidad Android, `minSdk=26`, `targetSdk=37`, temas y sistema visual; Android SDK 37; recursos Inter y licencia; GitHub Actions.
5. **Decisiones técnicas:** `applicationId`/`namespace` públicos conservan `dev.elfast.prisma`; variante interna con identificador separado `dev.elfast.prisma.internal` y numeración independiente; JDK 17; AGP 9.5.1; Gradle Wrapper 9.8.1; Android SDK Platform 37; Compose BOM 2026.09.00; DataStore 1.2.1; Navigation 3 estable 1.2.1; Lifecycle 2.11.0; Activity Compose 1.13.0; OkHttp 5.5.1; Kotlin integrado de AGP 9 y Compose Compiler Plugin 2.4.10, sin añadir `org.jetbrains.kotlin.android`. Versiones fijadas, sin dependencias dinámicas. APK universal y SHA-256 verificable. No generar clave JKS ni habilitar secretos de producción en esta fase.
6. **Entregables:** proyecto compilable; navegación estructural; selector de temas y persistencia; sistema visual base; configuración HTTPS/TLS y Android Backup; pruebas automatizadas y CI; APK universal interno con checksum; documentación sincronizada.
7. **Criterios de aceptación:** compilación y pruebas base en CI; APK interno instalable en API 26 y probado en API 37; identidad interna separada; navegación y selector funcionales; tema persistente; paridad Obsidiana/Cuarzo; reglas de exclusión de backups para API 26–30 y API 31+ verificadas para nube y transferencias; HTTP remoto bloqueado; TLS 1.2 mínimo y TLS 1.3 cuando disponible; certificados y hostname validados; ausencia de credenciales en logs y artefactos; adaptación a pantallas grandes y ventanas redimensionables; ninguna función placeholder aparenta estar terminada.
8. **Plan de pruebas:** compilación limpia, lint y dependencias; instalación y actualización de variante interna; persistencia de temas tras reinicio y recreación del proceso; navegación y estados visuales en ambos temas; pruebas TLS 1.2/1.3, rechazo de TLS antiguo, certificados inválidos y HTTP remoto; revisión de logs con credenciales ficticias; Android Backup API 26–30 y 31+ (nube, D2D y transferencia multiplataforma disponible); pruebas en teléfonos, pantallas amplias, ventanas redimensionables y plegables.

### Incremento implementado: navegación y estructura visual inicial

- La aplicación abre en **Descubrir**, conforme al destino inicial aprobado. Navigation 3 conserva el back stack de Descubrir, Personal y Apariencia; la píldora inferior permite cambiar entre las dos secciones principales y el engranaje abre Ajustes → Apariencia.
- Personal representa exactamente los cuatro accesos MVP aprobados, con filas de 80 dp, separación de 12 dp, márgenes laterales de 16 dp y paridad cromática Obsidiana/Cuarzo. En Fase 1 son estructura visual, no destinos funcionales del diario; no se simula Historial, Pendientes, Ocultos ni gestión de listas.
- Descubrir incorpora la barra visual única de 52 dp con el texto literal `Buscar...`, lupa y acceso a Apariencia. La barra no ejecuta búsquedas ni presenta resultados; no se incluyen títulos, pósteres ni datos cinematográficos ficticios. La búsqueda funcional queda para su fase correspondiente.
- La Activity aplica edge-to-edge en API 26–37, ajusta los iconos de las barras del sistema al tema elegido y respeta los insets de `safeDrawing` en Personal/Descubrir y de navegación en la píldora inferior. Se mantienen los 16 dp de separación visual respecto a las barras del sistema.
- Se ajustaron los dibujos de Historial y Ajustes. Historial conserva el arco, flecha y manecillas aprobados. Tras la revisión del propietario, el engranaje de Ajustes se redibujó como un contorno dentado continuo de seis dientes, sin radios interiores ni segundo aro, con abertura central de 4 dp; los SVG manuales Obsidiana y Cuarzo se actualizaron al mismo dibujo. La navegación inferior y su transición Personal/Descubrir no cambiaron.
- El propietario aprobó la silueta dentada final de Ajustes el 9 de noviembre de 2026. La CI #35 (`42712403446`), sobre HEAD `25adec22a7396118b6667714575e60e5c6a55321` y con el código actualizado en `8cd345fe`, terminó con `success`: compilación, lint, pruebas unitarias y `connectedInternalDebugAndroidTest` en Android 17 pasaron; también se publicó el APK interno.
- Las pruebas instrumentadas cubren el destino inicial, el cambio Personal/Descubrir, los cuatro accesos en Obsidiana y Cuarzo sin Estadísticas, la ruta Ajustes → Apariencia → regreso y la ausencia de estados de resultados en Descubrir. CI #37 confirma estos escenarios en API 26 y API 37. Las seis comprobaciones instrumentadas de seguridad de red y Android Backup pasaron en API 26 y API 37 en CI #38. CI #40 (`42722310507`) validó el cliente HTTP y la suite en API 26/37. CI #47 (`42726414134`), sobre `29407ffb66178f28825aef1ab6938727f0afc773`, terminó con `success`: compilación, lint, pruebas JVM y pruebas instrumentadas pasaron. Los informes publicados confirman 13 pruebas y 0 fallos en cada emulador (Android 8/API 26 y Android 17/API 37), incluida `prismaHttpClientRejectsCleartextRequestsBeforeOpeningSocket`. La nueva prueba JVM comprueba que una redirección autenticada a otro origen no abre una segunda conexión. Se publicaron informes instrumentados independientes para ambas APIs y el APK interno con checksum verificado. Se añadirá publicación de informes JVM para que la próxima ejecución también conserve el detalle de la prueba de redirección. Las ejecuciones #30 (`42706068176`), #32 (`42709442180`) y #35 (`42712403446`) validaron incrementos anteriores de navegación e iconografía.
- El APK interno actualizado se publicó tras la validación #35 como artefacto `prisma-internal-apk-25adec22a7396118b6667714575e60e5c6a55321` (ZIP: 13.256.635 bytes; SHA-256 ZIP: `3a3c6e8e90872c0d4edbd99cab650abd4d7a2c47a814f838966316c4c1911bb3`). Caduca el 23 de noviembre de 2026 a las 22:37:32 UTC. El enlace de descarga y registro verificable son [GitHub Actions #35](https://github.com/ElFast-dev/Prisma/actions/runs/42712403446).
- La ejecución CI #37 (`42716063385`) terminó con `success`: la suite instrumentada de navegación pasó tanto en Android 8/API 26 (Google APIs x86) como en Android 17/API 37; compilación, lint, pruebas unitarias y APK también pasaron.
- CI #38 (`42719435851`), sobre el commit `1cd8e6a67934624594c7959fc07d6bde1366b9a3`, terminó con `success`: compilación, lint, pruebas unitarias y pruebas instrumentadas en Android 17/API 37 y Android 8/API 26 pasaron. Las seis comprobaciones de seguridad se superaron en ambas APIs: `FLAG_ALLOW_BACKUP` desactivado, política Android que rechaza cleartext, exclusiones de backup legacy, nube y device-transfer, trust anchors del sistema y ausencia de `pin-set`.
- El APK interno #38 se publicó como `prisma-internal-apk-1cd8e6a67934624594c7959fc07d6bde1366b9a3` (ZIP: 13.256.633 bytes; SHA-256: `61e42fa97093e9cdebf13a876411d5c75dfe441f70ca9fe9bbe94cd0ac2e9be3`), con caducidad el 23 de noviembre de 2026 a las 23:26:27 UTC. Registro y descarga: [GitHub Actions #38](https://github.com/ElFast-dev/Prisma/actions/runs/42719435851).
- El APK interno de CI #40 se publicó como `prisma-internal-apk-e4723d69ac797e642d58667c7418160f3cb716f8` (ZIP: 13.256.630 bytes; SHA-256: `6312474d1fe33f34449f94cab1d1d2f05e495f9e0a493bea51f896e3af832cc1`), con caducidad el 23 de noviembre de 2026 a las 23:47:59 UTC. Registro y descarga: [GitHub Actions #40](https://github.com/ElFast-dev/Prisma/actions/runs/42722310507).
- CI #47 (`42726414134`) confirmó compilación, lint, suite JVM y 13 pruebas instrumentadas sin fallos en API 26 y API 37; se publicaron los XML, informes HTML y APK interno con checksum verificado.
- CI #48 (`42728145540`) pasó compilación, lint, 6 pruebas JVM y 13 pruebas instrumentadas en cada API (26 y 37), y publicó informes y APK.
- CI #49 (`42729920970`) detectó una consulta a `SSLContext.supportedSSLParameters` antes de inicializar el contexto. TLS 1.2, CA no confiable y hostname incorrecto pasaron en API 37; API 26 fue omitida y el segundo artefacto quedó contaminado por los resultados API 37.
- CI #50 (`42731583151`) pasó TLS 1.2/1.3, CA no confiable y hostname incorrecto en API 37. API 26 ejecutó la suite, pero tres pruebas no pudieron cargar el PKCS#12 moderno; TLS 1.3 se omitió por falta de soporte. La causa fue la codificación PBES2/AES-256 con MAC SHA-256 del fixture.
- El fixture del servidor se exportó en formato PKCS#12 compatible con Android 8 (MAC SHA-1 y PBE-SHA1-3DES), manteniendo la CA, el certificado válido, la clave de laboratorio y la contraseña. CI #51 (`42733048755`) pasó: 17 pruebas sin fallos en API 37, 17 casos sin fallos y 1 omisión justificada en API 26, 6/6 JVM y publicación de APK con checksum.
- CI #52 (`42734670743`) terminó con `success`: 6 pruebas JVM (0 fallos), 17 pruebas API 37 (0 fallos) y 17 casos API 26 (0 fallos, 1 omitido porque Android 8 no admite TLS 1.3), además de APK interno. Confirmó que los informes API 26/37 son independientes y los pasos de build/test/emuladores funcionan tras actualizar la documentación.
- CI #53 (`42736143972`, commit `a760e7f4fee0c40e8e631640730098f1d481ca94`) terminó con `success` en el segundo intento. Pasaron compilación, lint, 6 pruebas JVM, 19 pruebas instrumentadas en API 37 y 19 casos en API 26 (0 fallos; 1 omisión justificada por TLS 1.3 no soportado en Android 8), además de preparación y checksum del APK interno. Los XML independientes confirman que `prismaHttpClientRejectsAnExpiredServerCertificate` y `prismaHttpClientDoesNotFollowHttpsToHttpRedirect` pasaron en ambas APIs. Se publicaron informes separados y APK con checksum verificado. Registro: [GitHub Actions #53](https://github.com/ElFast-dev/Prisma/actions/runs/42736143972).
- Informes instrumentados #53: API 37, artefacto ID `13728331216`, SHA-256 ZIP `87cefb4adc65b2df122dc911eb703d214fccf3d9c46977a0e920c93c9a4524ac`; API 26, ID `13727059110`, SHA-256 ZIP `346a6f61e1b391e6ae21949ba6800c3db0dc3b2a6d092e73af6f6052acf995c0`. Ambos XML identifican su emulador y reportan código de salida 0.
- El APK interno #53 (ID `13726969520`) contiene un archivo APK de 13.789.254 bytes cuyo SHA-256 verificado es `316fbb77937f29aa74060288041aa5a61dbd691e182c16d8578157fde22979a4`; coincide con el checksum incluido. Los fixtures/CA y la clave privada ficticia permanecen confinados a `androidTest`; no se modificó la confianza ni el cliente de producción.
- **CI #61** (`42749624000`) detectó que el transporte D2D de Google devolvía `TRANSPORT_ERROR (-1000)` durante la inicialización. Build, lint, JVM, 20 pruebas API 37 y 20 casos API 26 (una omisión TLS 1.3) pasaron. El ciclo cloud/local de BackupManager pasó en ambas APIs. El resultado global fue `failure` por el estado del transporte D2D, no por la exclusión cloud/local.
- **CI #62** (`42750815542`, HEAD de workflow `d900c0f118cb56454f0257c6584bb8bddc05ee94`) terminó con `success`: build, lint, 6/6 JVM, 20/20 instrumentadas API 37 y 20 casos API 26 (0 fallos, 1 omisión TLS 1.3). Los informes confirman que `modernCrossPlatformTransferRulesExcludeEveryApplicationDataDomain` pasó en ambas APIs.
- En CI #62, los ensayos cloud/local de BackupManager con `LocalTransport` pasaron en API 26 y API 37: `bmgr backupnow` devolvió `Backup is not allowed`; tras desinstalar y reinstalar, cinco marcadores temporales de root, files, DataStore, shared preferences y database siguieron ausentes. Esta prueba acciona BackupManager del sistema, pero no es un backup real de Google Drive/cuenta.
- En CI #62, D2D se inicializó, pero el transporte rechazó temporalmente el paquete (`Transport rejected package because it wasn't able to process it at the time`). El informe registró `INCONCLUSIVE`, sin ejecutar restauración D2D ni declarar transferencia superada.
- **APK interno CI #62:** artefacto ID `13732984791`, ZIP de 13.256.761 bytes; APK extraído de 13.789.370 bytes y SHA-256 verificado `b08f6bbaf24dbcf1b779ec4b88458ca8812438cafeb37402899a7b7e1f76ca08`. Registro: [GitHub Actions #62](https://github.com/ElFast-dev/Prisma/actions/runs/42750815542).
- **Regla multiplataforma:** se añadieron exclusiones de los nueve dominios privados en `cross-platform-transfer platform="ios"` y una prueba instrumentada de lectura XML en ambas APIs. No se ha probado una transferencia Android↔iOS real ni existe un cliente iOS emparejado; la validación disponible es de configuración.
- **Dispositivo de prueba físico disponible:** Samsung Galaxy A03 `SM-A035M`, Android 13/API 33, One UI 5.1 Core, Unisoc T606 64 bits/arm64, 4 GB RAM física + 4 GB zRAM, unos 6,2 GB libres, pantalla 300 dpi y USB micro-USB. Es el único teléfono disponible; la guía de aceptación se adapta a este equipo.
- **CI #63** (`42752642182`, commit documental `537b1a8148f89e77f129bde96b1358879e384528`) terminó con `success` después de sincronizar los documentos. Pasaron build/lint, 6 pruebas JVM, 20 instrumentadas API 37 y 20 casos API 26 (una omisión TLS 1.3). Se publicaron de nuevo informes y APK interno.
- **APK interno CI #63:** artefacto ID `13734393302`, ZIP de 13.256.763 bytes; APK de 13.789.370 bytes; SHA-256 `f6589f1135683ccd551b70df286d6570f8b094146bb7149b848dce5415eb80f7`. El paquete incluye bibliotecas nativas para `arm64-v8a`. Registro: [GitHub Actions #63](https://github.com/ElFast-dev/Prisma/actions/runs/42752642182).
- **Plan físico:** ejecutar instalación, navegación, Apariencia, persistencia Obsidiana/Cuarzo, estabilidad, insets y modo avión en el Galaxy A03 (Android 13/API 33). Esto da cobertura de hardware real y targetSdk 37 en un sistema API 33, pero no sustituye la validación del minSdk API 26 que ya se ejecuta en CI/emulador.
- **CI #119 — validación completa, versionado y ventanas amplias:** ejecución [42911749013](https://github.com/ElFast-dev/Prisma/actions/runs/42911749013), commit `403522649cae2fabe0bc59cad4c46129b666cbfb`, terminó con `success`. Build/lint, 10/10 pruebas Python del validador y 6/6 pruebas JVM pasaron. `productionDebug` se inspeccionó sin firmar ni publicar y se confirmó `dev.elfast.prisma`, versión `0.1.0`, `versionCode=1` (primera Release estable aún no publicada). API 37: 24/24 instrumentadas, 0 fallos/errores/omisiones; repetición de `PrismaAdaptiveWindowTest` a 1280×800 px y 160 dpi: 2/2 (Obsidiana y Cuarzo), código de salida 0 y aserción de ventana de al menos 600 dp. API 26: 24 casos, 0 fallos/errores, 1 omisión justificada por TLS 1.3 no disponible. Los ciclos cloud/LocalTransport pasaron en ambas APIs. En D2D, el paquete auxiliar de control respaldó y restauró su marcador; el transporte confirmó después que Prisma no tenía datos elegibles por las exclusiones configuradas, por lo que **no se ejecutó una restauración D2D de datos de Prisma**. Se publicó el APK interno `dev.elfast.prisma.internalfix2`; no es una Release pública ni fue instalado físicamente en el Galaxy por esta ejecución.

- **CI #118 — controles adicionales y corrección pendiente:** [ejecución 42909867113](https://github.com/ElFast-dev/Prisma/actions/runs/42909867113) pasó el build, lint, las 10 pruebas del validador de versionCode y confirmó `versionCode=1` para la primera Release. Las instrumentaciones estándar tuvieron 24 pruebas sin fallos en API 37 y 24 casos sin fallos/errores en API 26 (1 omisión TLS 1.3). La ejecución global falló por el script de ventana amplia: Android Emulator Runner llamó `/usr/bin/sh -c` por línea y no pudo interpretar la declaración de una función multilínea. La pasada forzada 1280×800 no se ejecutó. D2D API37 fue inconcluso (`bmgr init -1000`), mientras cloud/local pasó; no hubo APK publicado.
- **CI #117 — secuencia D2D validada tras el ajuste:** ejecución [42908193752](https://github.com/ElFast-dev/Prisma/actions/runs/42908193752), commit `93ef1dd985f8146e31157653a44654617610fe87`, terminó con `success`. Build/lint/JVM pasaron, API 37: 22/22 sin fallos; API 26: 22 casos sin fallos ni errores y 1 omisión esperada por TLS 1.3 no soportado. El control D2D restauró el marcador del paquete auxiliar y confirmó que Prisma no tiene datos elegibles para transferir; no se ejecutó restauración de datos de Prisma. El APK interno se publicó con checksum en GitHub Actions.
- **Limitaciones que no bloquean el cierre de Fase 1:** el dispositivo físico disponible es un Galaxy A03/API 33; API 26 se validó en emulador y targetSdk 37 en CI/API 37. La ventana amplia se verificó en emulador (1280×800 px, 160 dpi), no en una tablet/plegable físico. No se realizó una migración D2D real entre dos teléfonos ni una prueba contra una cuenta cloud real; la aceptación aprobada se limita a los controles positivos del transporte auxiliar y a demostrar que Prisma no tiene datos elegibles por sus exclusiones. Esas limitaciones no contradicen los criterios formales de cierre.
### Estado de validación actualizado — integración CI #128

- La integración de la rama de feedback rápido quedó en `feature/fase1-android-foundation` mediante fast-forward hasta `fa34d97dfd5d44503914c7847e0dec5e7f877aa4`; `main` no se modificó.
- [CI #128](https://github.com/ElFast-dev/Prisma/actions/runs/42946761558) terminó con `success` en 9 min 34 s. Pasaron build, lint, pruebas JVM, versionCode, firma, API 26, API 37 y publicación del APK interno.
- La suite instrumentada registró 25 casos en API 26 (0 fallos, 0 errores, 1 omisión justificada por TLS 1.3 no soportado) y 25 en API 37 (0 fallos, 0 errores, 0 omisiones). La prueba de `MainActivity` real/insets pasó en ambas APIs; la suite verificó navegación, los cuatro accesos de Personal, Obsidiana/Cuarzo, barras del sistema y ausencia de resultados de búsqueda ficticios.
- API 37 pasó también las dos comprobaciones adicionales de ventana amplia (1280×800 px, 160 dpi; Obsidiana y Cuarzo).
- Backup cloud/LocalTransport pasó en API 26 y API 37: los cinco marcadores temporales no reaparecieron tras reinstalar. D2D API 37 confirmó que las exclusiones aprobadas dejan a Prisma sin datos elegibles para transferencia; no se creó payload y, por ello, no hubo restauración de datos Prisma. No se presenta esto como migración entre dos dispositivos.
- Se añadió una prueba JVM de persistencia que recrea DataStore desde el mismo archivo y confirma que Cuarzo se conserva. Pasó en #128.
- **Fase 1 COMPLETADA el 10 de noviembre de 2026.** [CI #129](https://github.com/ElFast-dev/Prisma/actions/runs/42948770174) terminó con SUCCESS en 7 min 31 s y pasó build/lint/JVM, versionCode, firma, API 26, API 37 y publicación del APK interno. El propietario confirmó en el Galaxy A03/API 33 las 14 comprobaciones físicas registradas: navegación, orden de Personal, literal/iconos de Descubrir, temas y persistencia, áreas seguras, Aplicaciones recientes, reapertura en frío (~6 s observados), bloqueo/desbloqueo, reinicio y modo avión. Detalle en `docs/TECNICO/VALIDACION_FISICA_ANDROID.md`.
- Los criterios técnicos de API 26, targetSdk/API 37, TLS/HTTPS, versionado, identidad interna, copias automáticas, ventanas amplias y ausencia de placeholders aparentes están respaldados por CI #129 y sus informes. En D2D el control positivo restaura el marcador del paquete auxiliar, mientras Prisma no tiene datos elegibles por las exclusiones aprobadas; no se requiere migración real de datos Prisma.
- **Estado histórico al cerrar CI #129:** Fase 2 todavía no se había iniciado en ese momento. El propietario la autorizó expresamente el 10 de noviembre de 2026; desde entonces está EN DESARROLLO, como se detalla en la sección «Fase 2 — Diario cinematográfico local».

Hitos preliminares:
- **0.1.0:** proyecto Kotlin/Compose, estructura de módulos, configuración de calidad y CI.
- **F1-H1 (histórico 0.2.0):** carcasa navegable, temas Obsidiana/Cuarzo y primer APK de prueba.

Criterios de cierre: el proyecto compila en CI, ejecuta pruebas base, genera un APK instalable, se instala y ejecuta el recorrido esencial en API 26 mediante la matriz CI y se completa un recorrido físico en el dispositivo disponible (Galaxy A03, API 33), prueba los comportamientos de `targetSdk = 37`, valida automáticamente en CI que `productionDebug` usa el Application ID público y el `versionCode` sea exactamente el siguiente de la última Release estable (o 1 si aún no hay Release), sin firmar ni publicar ese APK de inspección, verifica que Android Auto Backup excluya nube y transferencias automáticas en API 26–30 y API 31+ (incluida la modalidad multiplataforma donde esté soportada) y valida en CI el control positivo del transporte D2D mediante el paquete auxiliar y confirma que Prisma no genera datos elegibles para transferir debido a sus exclusiones aprobadas (no se requiere una restauración de datos de Prisma ni una migración real entre dos teléfonos, puesto que el backup automático está desactivado), demuestra HTTPS obligatorio con TLS 1.2 como mínimo, TLS 1.3 cuando esté disponible, validación de certificados/hostname, bloqueo de tráfico cleartext y ausencia de Certificate Pinning, y completa los recorridos principales, incluidos los cuatro accesos de Personal y Ajustes/Apariencia, en una ventana amplia simulada de al menos 600 dp para Obsidiana y Cuarzo, sin recortes ni acciones inaccesibles; además, no contiene secretos.

## Fase 2 — Diario cinematográfico local

**Estado:** EN DESARROLLO — inicio autorizado expresamente por el propietario el 10 de noviembre de 2026.
**Objetivo:** completar el diario local para películas, sin depender de TMDB ni de Internet.

### F2-H1 — Base local

**Estado:** VALIDADO. Incluye Room, alta manual (título obligatorio y año opcional), persistencia, búsqueda local offline y prevención de duplicados. La validación existente queda registrada en el historial de CI y no se reabre salvo regresión.

### F2-H2 — Recorridos de Historial y Pendientes con ficha local

**Estado:** CERRADO — aceptación expresa del propietario el 11 de noviembre de 2026, tras revisar los criterios y la evidencia de CI #240.

**Incluye:**
- Mantener una fila por película en Historial y Pendientes, con sus contadores/fechas y búsqueda ya implementados.
- Abrir la ficha local al tocar cualquier parte de una fila, conservando el identificador de la película y regresando a la lista de origen.
- Mostrar solo información local disponible: título, año opcional, estado de diario y registros independientes de visionado con fecha y hora cuando se conozca.
- Registrar visionados con las opciones locales «Ahora» y «Seleccionar fecha». Cuando ya existan registros, la acción se presenta como «REGISTRAR OTRO VISIONADO» y siempre crea un registro independiente. La fecha manual puede guardarse sin hora si se desconoce.
- Retirar una película de Pendientes únicamente desde la ficha, mediante confirmación. Cancelar conserva la relación; confirmar retira solo la relación, no elimina la película ni sus visionados.
- Mantener todo el recorrido offline y en paridad Obsidiana/Cuarzo.

**No incluye:** TMDB, pósteres reales, datos remotos, «Día de estreno», «Ajustar al inicio», calificaciones, Ocultos, listas manuales ni otras funciones de F2-H3 o posteriores. Las dos opciones dependientes de TMDB se habilitarán solo cuando existan fecha de estreno verificada o duración válida, respectivamente; nunca se simularán.

**Puerta de diseño — completada el 11 de noviembre de 2026:** el propietario aprobó el Concepto A, refinado y representado en Obsidiana y Cuarzo. La cabecera conserva la dirección cinematográfica ya definida para Prisma; la ficha F2-H2 omite datos remotos y controles de hitos posteriores. La aprobación habilita la integración, pero no sustituye los criterios de aceptación ni la CI.

**Criterios de aceptación:**
- Navegación fila → ficha → regreso, tanto desde Historial como desde Pendientes.
- Los datos corresponden a la misma película guardada; no hay duplicados ni contenido ficticio.
- Visionados repetidos quedan separados y no sobrescriben fechas anteriores.
- Una fecha sin hora se muestra sin inventar ni completar una hora.
- Retirada: cancelar no modifica datos; confirmar elimina solo Pendientes y conserva película/Historial.
- Room/repository/ViewModel y pantallas superan pruebas pertinentes; CI API 26 y API 37 pasa en ambos temas.
- No se requiere instalar APK en el Galaxy A03 sin autorización expresa.

**Resultado de aceptación — 11 de noviembre de 2026:** todos los criterios de F2-H2 quedaron aceptados. CI #240 pasó en sus cuatro trabajos; JVM 17/17, API 26 con 57 casos (una omisión esperada de TLS 1.3), API 37 con 57/57, MovieDetailScreenTest 8/8 y MovieRepositoryRoomTest 17/17 en ambas APIs. La retención de búsqueda y scroll al volver desde la ficha también quedó probada. El cierre no afirma una instalación física del APK ni una restauración D2D real de datos Prisma: ninguna de esas pruebas se ejecutó.

### F2-H3 — Calificación, Ocultos y listas manuales básicas

**Estado:** EN DESARROLLO — activado expresamente por el propietario el 11 de noviembre de 2026. La dirección visual de las cinco vistas principales fue aprobada por el propietario; el alcance permanece limitado a las capacidades locales aprobadas.

**Incluye:** calificación por visionado (1–10) y calificación provisional transferida al primer visionado; Ocultos y restauración conservando el estado previo; listas manuales básicas con operaciones de creación, renombrado, eliminación y gestión de películas. Los controles están conectados a ViewModel y persistencia local; no se adelantan capacidades de fases posteriores.

### Criterios de cierre de Fase 2

F2-H1 y F2-H2 deben estar validados y F2-H3 debe completarse conforme a su alcance aprobado antes de cerrar Fase 2. Los datos resisten cierres/reinicios; no hay duplicados; visionados repetidos conservan sus fechas y, cuando se implemente F2-H3, sus calificaciones; las operaciones locales funcionan sin conexión. El cierre requiere evidencia y aprobación expresa del propietario.

## Fase 3 — Catálogo esencial con TMDB

**Estado:** NO INICIADA.  
**Objetivo:** facilitar la identificación y consulta básica de películas sin convertir Descubrir en un feed avanzado.

Hitos preliminares:
- **F3-H1:** almacenamiento cifrado AES-256-GCM del token mediante Android Keystore, gestión de la clave y su ciclo de vida, validación del token, sustitución segura, manejo de errores y búsqueda por título.
- **F3-H2:** selección supervisada de coincidencias, enriquecimiento de la ficha local ya existente, metadatos/imágenes verificados y caché local. La ficha local mínima se entrega en F2-H2; aquí se añaden únicamente los datos remotos que dependan de TMDB (fecha de estreno por país, duración, géneros, sinopsis e imágenes cuando estén disponibles).

Criterios de cierre: no se asocian coincidencias ambiguas automáticamente; la falta de token o Internet no bloquea el diario; no se transmite el historial personal; los datos descargados siguen disponibles offline; el token solo persiste cifrado en DataStore, la clave reside en Android Keystore, los fallos de clave se recuperan solicitando reintroducción sin afectar el diario y las pruebas de manipulación, sustitución y eliminación pasan; todas las peticiones autenticadas usan HTTPS/TLS con certificado y hostname válidos, los redirects no rebajan a HTTP ni filtran el Bearer token y las pruebas de red superan los criterios definidos.

## Fase 4 — Protección de datos y cierre del MVP

**Estado:** NO INICIADA.  
**Objetivo:** proteger los datos personales y validar el recorrido completo antes de considerar Prisma utilizable como diario habitual.

Hitos preliminares:
- **F4-H1:** formato versionado, exportación cifrada, restauración, validación de integridad, migración compatible y recuperación ante fallos.
- **F4-H2:** integración y regresión del MVP, pruebas en Android, documentación de instalación, APK y aprobación del propietario.

Criterios de cierre: se puede exportar y restaurar la copia; se rechazan archivos manipulados o incompatibles sin sobrescribir los datos actuales; se prueba la recuperación ante fallos; se validan los recorridos offline y ambos temas. Antes del primer APK público se completa además la preparación operativa de la firma de producción y se demuestra una actualización firmada sobre una instalación previa sin pérdida de datos locales. La entrega F4-H2 podrá denominarse MVP solo tras cumplir todos los criterios de `REQUISITOS.md` sección 17.

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
| 1. Fundamentos Android | Cerrada | Aprobada por el propietario (10 nov 2026) | F1-H1 |
| 2. Diario local | En curso | Inicio autorizado por el propietario (10 nov 2026); F2-H3 activado (11 nov 2026) | F2-H2 cerrado; F2-H3 con UI integrada, CI/aceptación pendientes |
| 3. TMDB esencial | No iniciada | Pendiente | F3-H2 |
| 4. Protección y MVP | No iniciada | Pendiente | F4-H2 |
| 5. Colecciones avanzadas | No iniciada | Pendiente | Por especificar |
| 6. Experiencia cinematográfica | No iniciada | Pendiente | Por especificar |
| 7. Estadísticas y Espectro | No iniciada | Pendiente | Por especificar |
| 8. Actualizador y preparación de 1.0.0 | No iniciada | Pendiente | Fase 8; versión de producto condicionada a su puerta de aceptación |


## Validación automatizada de la ficha local — F2-H2 — 11 de noviembre de 2026

- **CI #218 — SUCCESS completo:** [ejecución 43083797455](https://github.com/ElFast-dev/Prisma/actions/runs/43083797455), sobre el commit `9ccdd88152903e4b2391e7bd94557619ef270647`. Pasaron los cuatro jobs: compilación/lint/pruebas JVM y APK candidato, emulador API 26, emulador API 37 y publicación del APK interno.
- **Instrumentación API 26:** 53 casos, 0 fallos y 0 errores; 1 omisión esperada en `prismaHttpClientNegotiatesTls13WhenPlatformSupportsIt`, porque Android 8/API 26 no ofrece TLS 1.3.
- **Instrumentación API 37:** 53/53 casos, 0 omisiones, 0 fallos y 0 errores.
- **Ventana amplia:** API 37 completó `PrismaAdaptiveWindowTest` con tamaño forzado de 1280×800 y densidad de 160 dpi; la tarea Gradle terminó correctamente y se archivó el informe específico.
- **BackupManager cloud:** API 26 y API 37 pasaron el ciclo de comprobación; los marcadores sintéticos no reaparecieron tras reinstalar.
- **Control D2D en API 37:** el paquete auxiliar desechable restauró su propio marcador. El transporte confirmó que Prisma no tenía datos elegibles para transferir; por ello no existió payload de datos Prisma y **no se ejecutó una restauración D2D de Prisma**. Esto no prueba una migración real entre teléfonos ni una restauración de datos personales.
- **APK interno:** publicación validada como artefacto CI ID `13884799592` (ZIP SHA-256 `1f8e2158bdfc21e05f26a4d8e3f632bcdfbdf85a3347e34b9cb3161ad115a5c9`). Es un paquete interno, no una Release de producción.
- **Alcance de esta validación:** confirma las pruebas automatizadas de la implementación del hito F2-H2 en emuladores. No se instaló el APK ni se ejecutaron pruebas físicas en el Galaxy A03; esa acción requiere autorización expresa. F2-H2 permanece como hito activo hasta completar la revisión y aceptación pendiente del propietario. F2-H3 no se inicia.

## Refuerzo de transición Pendientes → Historial — 11 de noviembre de 2026

- Se amplió `MovieDetailScreenTest.selectedDateCanBeSavedWithoutAnUnknownStartTime` para verificar el recorrido completo al registrar un visionado desde Pendientes: el estado pendiente desaparece, la acción vuelve a permitir agregar a Pendientes, al regresar se muestra el estado vacío de Pendientes y el registro aparece en Historial.
- Este refuerzo cubre la integración de interfaz con el comportamiento transaccional ya probado en `MovieRepositoryRoomTest.registeringAWatchMovesMovieFromPendingIntoHistoryAtomically`.
- Commit de la prueba: `2607de4b43e51d5139e2aabdfc1f9632b26d8515`.
- [CI #223](https://github.com/ElFast-dev/Prisma/actions/runs/43099497956), sobre el commit `2607de4b43e51d5139e2aabdfc1f9632b26d8515`, terminó en `success`: los cuatro jobs finalizaron correctamente, incluidos build/lint/JVM, instrumentación en API 26 y API 37 y publicación del APK interno. El artefacto publicado es `prisma-internalfix2-apk-ci-223-2607de4b43e51d5139e2aabdfc1f9632b26d8515` (ID `13892575864`). Es una compilación interna asociada al SHA probado, no una Release de producto. La CI no sustituye la instalación/prueba física autorizada ni la aceptación del propietario; F2-H2 permanece en desarrollo.

## Refuerzo de consulta de visionados independientes en la ficha — 11 de noviembre de 2026

- Cada fila de visionado en `MovieDetailScreen` incorpora una etiqueta semántica estable basada en su ID de registro; no cambia el diseño ni la interacción visible.
- `MovieDetailScreenTest.historyOpensFichaRegistersAnotherWatchAndReturnsToTheSameList` comprueba ahora que, después de añadir un segundo visionado, los dos IDs independientes siguen presentes en la ficha, además de validar el contador y el retorno a Historial.
- Commits de implementación y prueba: `f670faa265975c5c160fa98a0953bac4ba5461ac`, `66f2150687ecfd536f6ec6c6c8c5465343414425`, imports finales `62bb9bd004bb2c17e49acb5878bf3c96eaea6772`, corrección del import inexistente `d7fbd81dd83f1b754f1935d297dd85c8535618dd`, prueba de fecha con hora conocida `c9fe50aa4c6804938dd44f73a8b763ccf3acb310` y ajuste de la aserción de fila fuera de pantalla `ce4294ec8d11d66f0dfbc3a3b82baf3223b8a961).
- [CI #224](https://github.com/ElFast-dev/Prisma/actions/runs/43101972982) (`f670faa`) terminó `success` en los cuatro jobs, antes de las aserciones por ID. [CI #225](https://github.com/ElFast-dev/Prisma/actions/runs/43101979660) terminó `cancelled`. [CI #226](https://github.com/ElFast-dev/Prisma/actions/runs/43102006459) (`62bb9bd`) falló en ambos jobs instrumentados por el import inexistente `androidx.compose.ui.test.assertExists`; el build principal pasó. [CI #227](https://github.com/ElFast-dev/Prisma/actions/runs/43104278495) (`d7fbd81`) corrigió la compilación y pasó API 37, pero falló API 26: el nodo de la primera fila de visionado existía fuera del área visible, por lo que `assertIsDisplayed` era una condición incorrecta. [CI #228](https://github.com/ElFast-dev/Prisma/actions/runs/43104383431) (`c9fe50a`) pasó build y API 37; API 26 tuvo el mismo único fallo de la fila fuera de pantalla. El nuevo caso `selectedDateCanBeSavedWithKnownStartTime` pasó. La corrección final sustituye esa aserción de visibilidad por `assertExists()`, que verifica presencia en el árbol de semántica sin exigir que ambas filas quepan simultáneamente en el viewport.
- [CI #229](https://github.com/ElFast-dev/Prisma/actions/runs/43115055283), sobre `ce4294ec8d11d66f0dfbc3a3b82baf3223b8a961`, terminó `success` en los cuatro jobs: build/lint/JVM, instrumentación API 26, instrumentación API 37 y publicación del APK interno. API 26: 54 casos, 0 fallos, 0 errores y 1 omisión esperada (TLS 1.3 no disponible en Android 8). API 37: 54 casos instrumentados, 0 fallos/errores/omisiones y 2 verificaciones BackupManager completadas. Los cinco tests de `MovieDetailScreenTest` pasaron en ambas APIs, incluidos visionados independientes, fecha sin hora y fecha con hora conocida. Los ciclos cloud de BackupManager no restauraron los marcadores sintéticos excluidos, como se esperaba. En D2D, el paquete auxiliar desechable restauró su marcador; Prisma no tenía datos elegibles por las reglas de exclusión, no generó payload de datos Prisma y la restauración D2D de Prisma quedó `NOT RUN`. Esto no demuestra una migración real de datos Prisma entre dispositivos.
- APK interno publicado: artefacto `prisma-internalfix2-apk-ci-229-ce4294ec8d11d66f0dfbc3a3b82baf3223b8a961`, ID `13898312504`; candidato `13899115109`. Variante `internalFix2Debug`, paquete `dev.elfast.prisma.internalfix2`, commit `ce4294e`; SHA-256 verificado del APK `b7fb59469bf042b8c92ba7385150948695c457dcb2e0d8a8297eb04f28990b95`. Es una compilación interna reproduciblemente identificada, no una Release de producto ni una compilación de producción. No se instaló en el Galaxy A03.
- La regresión automatizada de este incremento queda validada por CI #229. F2-H2 permanece en desarrollo hasta completar la revisión/aceptación del propietario; cualquier instalación o prueba física del APK requiere autorización expresa.

## Verificación temporal de «Ahora» — 11 de noviembre de 2026

- `MovieDetailScreenTest.historyOpensFichaRegistersAnotherWatchAndReturnsToTheSameList` comprueba además que el nuevo registro creado con «Ahora» tiene `WatchDateSource.NOW`, que `startedAtEpochMillis` cae entre el instante capturado antes del toque y después de completar la acción UI, y que `watchedOnLocalDate` coincide con la fecha del mismo instante en `ZoneId.systemDefault()`.
- Este cambio solo amplía la regresión instrumentada; no modifica lógica de producción ni diseño.
- Commit validado: `8ebc5f28a47ccdafe29143b1687a0cdfe5705447`. [CI #230](https://github.com/ElFast-dev/Prisma/actions/runs/43116601125) terminó **SUCCESS en los cuatro jobs**: build/lint/JVM, API 26, API 37 y publicación del APK interno.
- API 26: **54 pruebas**, 0 fallos, 0 errores y 1 omisión esperada (TLS 1.3 no soportado por la plataforma). API 37: **54/54**, sin fallos ni omisiones. Ventana amplia API 37: **2/2**. Los cinco casos de `MovieDetailScreenTest` pasaron en ambas APIs; el test de «Ahora» valida el timestamp capturado en la ventana del toque, el origen `NOW` y la fecha local correspondiente.
- BackupManager cloud pasó en ambas APIs: Android rechazó el backup de Prisma y los cinco archivos marcadores siguieron ausentes tras reinstalar. En D2D API 37, el paquete auxiliar restauró su marcador; Prisma no tenía payload elegible por las exclusiones configuradas y no se ejecutó restauración de datos Prisma.
- APK interno publicado: artefacto ID `13898548628`, variante `internalFix2Debug`, paquete `dev.elfast.prisma.internalfix2`, SHA-256 del APK `b7fb59469bf042b8c92ba7385150948695c457dcb2e0d8a8297eb04f28990b95`, verificado contra `BUILD_INFO.txt` y el checksum incluido. No es una Release ni se instaló en el Galaxy A03.

## Cobertura unitaria de MovieLibraryViewModel — validada por CI #235 — 11 de noviembre de 2026

- Se incorporó `MovieLibraryViewModelTest` con cuatro casos: cambio de consulta y reobservación del flujo local, resultado de alta manual, traducción de acciones Pendientes/visionado a eventos y conversión de excepciones del repositorio a `Failure`.
- La dependencia `kotlinx-coroutines-test:1.11.0` quedó añadida al catálogo y a `testImplementation`; no se incorpora al classpath de producción ni modifica la lógica/UI.
- SHA de código y pruebas validado: `dadb10a71f82d351c18201472d4549ca8a8ea7d3`. [CI #235](https://github.com/ElFast-dev/Prisma/actions/runs/43119565362) terminó SUCCESS en los cuatro jobs: build/lint/JVM, API 26, API 37 y publicación del APK interno.
- JVM: **17/17**, sin fallos, errores ni omisiones; `MovieLibraryViewModelTest`: **4/4**. API 26: **54 pruebas**, 0 fallos, 0 errores y 1 omisión esperada por TLS 1.3 no disponible. API 37: **54/54**, sin omisiones. Ventana amplia API 37: **2/2**. Los cinco casos de `MovieDetailScreenTest` pasaron en ambas APIs.
- BackupManager cloud: en API 26 y 37 Android devolvió `Backup is not allowed` para Prisma y los cinco marcadores sintéticos siguieron ausentes tras reinstalar. D2D API 37: el paquete auxiliar desechable restauró su marcador de control; Prisma no tenía datos elegibles por exclusión y no se creó payload, por lo que la restauración D2D de Prisma quedó `NOT RUN`. No se ha demostrado una migración de datos Prisma entre dispositivos.
- APK interno publicado: artefacto ID `13899969351`, variante `internalFix2Debug`, paquete `dev.elfast.prisma.internalfix2`, commit `dadb10a`. SHA-256 APK `b7fb59469bf042b8c92ba7385150948695c457dcb2e0d8a8297eb04f28990b95`, validado contra el checksum y `BUILD_INFO.txt`; SHA-256 ZIP `eb673d0c893e0212520e9223c5a5f48654caa77440058ecb5d75f2e09c0e6998`. Es compilación interna, no Release de producción.
- Medición de CI #235: duración total desde `run_started_at` hasta finalización **11 min 18 s**; el primer job empezó 1 min 55 s después por espera de runner. El trabajo activo desde el inicio del build hasta el artefacto publicado fue **9 min 23 s**. Jobs: build/JVM 1 min 38 s, API 26 4 min 02 s, API 37 7 min 33 s y publicación 7 s. API 37 determina la ruta crítica; su ejecución principal Gradle fue 4 min 21 s y la prueba de ventana amplia 16 s. No retirar cobertura para reducir duración: medir y optimizar la preparación del emulador/etapas API 37 si el tiempo activo vuelve a exceder el objetivo.
- La prueba es solo de ViewModel; F2-H2 sigue en desarrollo a la espera de aceptación de producto. No inicia F2-H3 ni autoriza instalar el APK en el Galaxy A03.

## Refuerzo de conversiones de fecha y hora local — CI #219 — 11 de noviembre de 2026

- Commit de código probado: `6315ba63f1f3c78cf2bab4ad743be2521c55a69d`.
- Se extrajo a `WatchDateTime` la conversión entre los valores UTC del DatePicker y la fecha/hora local del dispositivo. No se modificaron Room, el esquema de base de datos ni el alcance funcional de F2-H2.
- JVM: **13/13** pruebas, sin fallos, errores ni omisiones. Se añadieron tres casos para preservar la fecha del calendario en `America/Panama` (UTC−5), convertir la hora local elegida y comprobar el recorrido de ida y vuelta.
- [CI #219](https://github.com/ElFast-dev/Prisma/actions/runs/43089919606): **SUCCESS completo** en los cuatro jobs: build/lint/JVM, Android API 26, Android API 37 y publicación del APK interno.
- API 26: **53 casos**, 0 fallos/errores y 1 omisión esperada de negociación TLS 1.3 no disponible en Android 8. API 37: **53/53** sin fallos, errores ni omisiones. Ventana amplia API 37: **2/2**.
- `MovieDetailScreenTest`: **4/4**; `MovieRepositoryRoomTest`: **17/17** en ambas APIs.
- BackupManager cloud confirmó que los marcadores sintéticos de prueba no reaparecen tras reinstalar. En el control D2D, el paquete auxiliar desechable restauró su marcador; Prisma no tenía payload elegible por las exclusiones, así que no se ejecutó restauración D2D de datos Prisma.
- APK interno publicado: artefacto ID `13888502734`; SHA-256 del APK `f8d6279555a27f77fa49ab14808da6e91191253f4ade1e904a3a1e6212dffdfe`; SHA-256 del ZIP `9c19a4b7b0ba5a915d324388bb75fae7431d796d7fa3cd603b8d19e32fed3745`. Es un paquete interno, no una Release de producción.
- F2-H2 permanece activo. F2-H3 continúa aplazado y no se inicia con esta validación.


## Continuidad F2-H2 — CI #236 y revisión del alcance — 11 de noviembre de 2026 (hora de Panamá)

- **Código probado:** `dfe12e00c291815a21217e9a6e00949b56f98a2f`. El único archivo de código modificado en este incremento fue `app/src/androidTest/java/dev/elfast/prisma/MovieDetailScreenTest.kt`; se añadió `addingFromFichaAddsMovieToPendingWithoutRemovingItsHistory`. No cambió lógica de producción, esquema Room, navegación ni recursos visuales.
- **[CI #236](https://github.com/ElFast-dev/Prisma/actions/runs/43130218778): SUCCESS completo**, ejecución `43130218778`, asociada a la rama `feature/fase1-android-foundation` y al SHA anterior. Los cuatro jobs terminaron en `completed/success`: Build, lint, JVM y APK candidato; Android UI y BackupManager API 37; Android UI y BackupManager API 26; publicación del APK interno.
- **JVM:** 17/17 pruebas, sin fallos, errores ni omisiones. `MovieLibraryViewModelTest`: 4/4.
- **Instrumentación API 26:** 55 pruebas, 0 fallos y 0 errores; 1 omisión esperada en la negociación TLS 1.3 porque Android 8/API 26 no ofrece ese soporte. **API 37:** 55/55, sin fallos, errores ni omisiones. La prueba adicional de ventana amplia en API 37 pasó 2/2.
- **F2-H2 en UI:** `MovieDetailScreenTest` pasó 6/6 tanto en API 26 como en API 37: abrir la ficha desde Historial y regresar; abrirla desde Pendientes en Cuarzo y regresar; retirar de Pendientes con confirmación preservando película e Historial; guardar fecha sin hora inventada; guardar fecha con hora conocida; y agregar a Pendientes desde una película que ya está en Historial, conservando su visionado. **Room:** `MovieRepositoryRoomTest` pasó 17/17 en ambas APIs, incluidos persistencia al cerrar/reabrir, búsquedas literales con comodines, duplicados/concurrencia, unicidad de Pendientes, transacciones/rollback y visionados independientes.
- **BackupManager:** API 26 y API 37 devolvieron `Backup is not allowed` para Prisma y los marcadores sintéticos excluidos no reaparecieron tras reinstalación. En D2D API 37 el paquete auxiliar desechable restauró su marcador de control; Prisma no generó payload elegible por sus exclusiones, de modo que la restauración D2D de datos reales de Prisma quedó **NOT RUN**. No equivale a validar una migración entre dispositivos.
- **APK interno:** artefacto publicado ID `13905650760`, nombre `prisma-internalfix2-apk-ci-236-dfe12e00c291815a21217e9a6e00949b56f98a2f`, variante `internalFix2Debug`, applicationId `dev.elfast.prisma.internalfix2`. [Artefacto de CI #236](https://github.com/ElFast-dev/Prisma/actions/runs/43130218778/artifacts/13905650760). Es una compilación interna; no es una Release de producción. No se declara un SHA-256 local del APK.
- **Límites de esta validación:** la matriz prueba emuladores API 26/37. No se instaló APK ni se ejecutó una prueba física en el Galaxy A03; tampoco se ejecutó una prueba física específica en modo avión. La validación automatizada no sustituye esas comprobaciones.
- **Evaluación del hito:** tras revisar el código de ficha/listas/navegación, las operaciones Room y los reportes, no se detecta en este incremento una brecha técnica demostrable dentro del alcance F2-H2. Esto acredita la cobertura automatizada descrita, no la aceptación integral del producto. **F2-H2 continúa EN DESARROLLO y pendiente de revisión/aceptación expresa del propietario. F2-H3 sigue APLAZADO y no se inicia.**


## Continuidad F2-H2 — corrección de instrumentación y CI #237/#238 — 11 de noviembre de 2026 (hora de Panamá)

- **CI #237** ([ejecución 43133620126](https://github.com/ElFast-dev/Prisma/actions/runs/43133620126), código probado `b4603808d136e4cc4d3382f3fd8a30755494b273`) terminó en `failure`: build/lint/JVM y APK candidato pasaron, pero API 26 y API 37 no pudieron compilar `MovieDetailScreenTest.kt` por el import no válido `androidx.compose.ui.test.assertDoesNotExist` (`Unresolved reference`). La instrumentación no llegó a ejecutarse y la publicación del APK interno quedó omitida. No fue un fallo de producción ni evidencia de un defecto funcional en el test.
- **Corrección mínima:** el commit `a0eaad00a43b9b580dfa62ef27cd9a1c16695d3d` eliminó exclusivamente ese import. Se mantienen las llamadas `assertDoesNotExist()` como método de `SemanticsNodeInteraction`. El cambio de corrección no modifica código de producción, Room, navegación ni recursos visuales.
- **[CI #238 — SUCCESS en los cuatro jobs](https://github.com/ElFast-dev/Prisma/actions/runs/43134560744)** probó exactamente `a0eaad00a43b9b580dfa62ef27cd9a1c16695d3d`: build/lint/JVM y APK candidato; instrumentación/BackupManager API 26; instrumentación/BackupManager API 37; y publicación del APK interno.
- **JVM:** 17/17, sin fallos, errores ni omisiones. **API 26:** 56 pruebas instrumentadas, 0 fallos, 0 errores y 1 omisión esperada por TLS 1.3 no disponible en Android 8. **API 37:** 56/56, sin fallos, errores ni omisiones. `MovieDetailScreenTest` pasó 7/7 en ambas APIs; la nueva `historyAndPendingPreserveSearchWhenReturningFromFicha` pasó en ambos emuladores. `MovieRepositoryRoomTest` pasó 17/17 en API 26 y API 37. La prueba de ventana amplia API 37 pasó 2/2 a 1280×800 px y 160 dpi.
- **BackupManager cloud:** API 26 y API 37 devolvieron `Backup is not allowed` para Prisma; los cinco marcadores sintéticos excluidos no reaparecieron tras reinstalación. **D2D API 37:** el paquete auxiliar desechable restauró su propio marcador como control positivo. Prisma no tenía datos elegibles por las reglas de exclusión; el transporte no generó payload de aplicación y la restauración D2D de Prisma quedó **NOT RUN**. Esto no demuestra una migración de datos Prisma entre dispositivos.
- **APK interno publicado:** artefacto ID `13906837792`, variante `internalFix2Debug`, applicationId `dev.elfast.prisma.internalfix2`; [artefacto de CI #238](https://github.com/ElFast-dev/Prisma/actions/runs/43134560744/artifacts/13906837792). SHA-256 del APK descargado y verificado: `b7fb59469bf042b8c92ba7385150948695c457dcb2e0d8a8297eb04f28990b95`. Es una compilación interna, no una Release de producción.
- **Límites:** CI #238 ejecutó emuladores API 26 y API 37. No se instaló el APK en el Galaxy A03 ni se realizó prueba física de modo avión; tampoco se ejecutó una migración D2D real de datos Prisma entre teléfonos. **F2-H2 permanece EN DESARROLLO**, a la espera de revisión y aceptación expresa del propietario. **F2-H3 continúa APLAZADO y no se inicia.**


## Continuidad F2-H2 — alcance local de ficha y CI #239 — 11 de noviembre de 2026 (hora de Panamá)

- **Cambio de test:** el commit `70af72c9d08957c3b1447d7a4c16ac597089f80a` amplía `quartzFichaOpensFromPendingAndReturnsToTheSameList` con seis aserciones: el año local guardado `2001` se muestra y no aparecen sinopsis, duración, géneros, país de producción ni calificación. Se refuerza el límite de la ficha local F2-H2 y se evita presentar metadatos no guardados o puntuaciones de F2-H3. No se modificó código de producción, Room, navegación ni recursos visuales.
- **[CI #239 — SUCCESS en los cuatro jobs](https://github.com/ElFast-dev/Prisma/actions/runs/43136320397)** probó exactamente `70af72c9d08957c3b1447d7a4c16ac597089f80a`: build/lint/JVM y APK candidato; instrumentación/BackupManager API 26; instrumentación/BackupManager API 37; y publicación del APK interno.
- **JVM:** 17/17, sin fallos, errores ni omisiones. **API 26:** 56 pruebas instrumentadas, 0 fallos, 0 errores y 1 omisión esperada por TLS 1.3 no disponible en Android 8. **API 37:** 56/56, sin fallos, errores ni omisiones. `MovieDetailScreenTest` pasó 7/7 y `MovieRepositoryRoomTest` 17/17 en ambas APIs. La nueva aserción de título/año/metadatos locales pasó en Obsidiana/Cuarzo donde aplica el caso instrumentado de Cuarzo; la prueba de persistencia de búsqueda al regresar desde ficha también pasó en ambas APIs.
- **Ventana amplia API 37:** `PrismaAdaptiveWindowTest` pasó 2/2 con pantalla de emulador 1280×800 px y 160 dpi.
- **BackupManager cloud:** API 26 y API 37 devolvieron `Backup is not allowed` para Prisma; los cinco marcadores sintéticos excluidos no reaparecieron tras reinstalación. **D2D API 37:** el paquete auxiliar desechable restauró su propio marcador como control positivo. Prisma no tenía datos elegibles por las reglas de exclusión, el transporte no generó payload de aplicación y la restauración D2D de Prisma quedó **NOT RUN**. No demuestra una migración de datos Prisma entre dispositivos.
- **APK interno publicado:** artefacto ID `13907977401`, variante `internalFix2Debug`, applicationId `dev.elfast.prisma.internalfix2`; [artefacto de CI #239](https://github.com/ElFast-dev/Prisma/actions/runs/43136320397/artifacts/13907977401). SHA-256 del APK descargado y recalculado: `b7fb59469bf042b8c92ba7385150948695c457dcb2e0d8a8297eb04f28990b95`; coincide con `BUILD_INFO.txt` y el archivo `.sha256` del artefacto. Es una compilación interna, no una Release de producción.
- **Límites:** CI #239 valida emuladores API 26/37. No se instaló el APK en el Galaxy A03 ni se hizo una prueba física de modo avión; tampoco se ejecutó restauración D2D de datos reales de Prisma. **F2-H2 permanece EN DESARROLLO**, pendiente de revisión y aceptación expresa del propietario. **F2-H3 continúa APLAZADO y no se inicia.**


## Continuidad F2-H2 — conservar posición de las listas y CI #240 — 11 de noviembre de 2026 (hora de Panamá)

- **Cambio de test:** el commit `af8201553203562da57f3f618a12694f9b50bced` añade `historyAndPendingPreserveScrollPositionWhenReturningFromFicha` en `MovieDetailScreenTest.kt`. Con 24 películas guardadas, se desplaza al índice 18 tanto en Historial como en Pendientes, abre la ficha de esa película y regresa; la fila seleccionada debe seguir visible en la misma posición aproximada. Solo cambió el test instrumentado, sin lógica de producción, Room, navegación ni recursos visuales.
- **[CI #240 — SUCCESS en los cuatro jobs](https://github.com/ElFast-dev/Prisma/actions/runs/43138558639)** probó exactamente `af8201553203562da57f3f618a12694f9b50bced`: build/lint/JVM y APK candidato; instrumentación/BackupManager API 26; instrumentación/BackupManager API 37; y publicación del APK interno.
- **JVM:** 17/17, sin fallos, errores ni omisiones. **API 26:** 57 pruebas instrumentadas, 0 fallos, 0 errores y 1 omisión esperada por TLS 1.3 no disponible en Android 8. **API 37:** 57/57, sin fallos, errores ni omisiones. `MovieDetailScreenTest` pasó 8/8 y `MovieRepositoryRoomTest` 17/17 en ambas APIs. La nueva comprobación de conservación de scroll pasó en API 26 y API 37.
- **Ventana amplia API 37:** `PrismaAdaptiveWindowTest` pasó 2/2. BackupManager cloud API 26/37: Prisma recibió `Backup is not allowed` y los marcadores sintéticos excluidos no reaparecieron tras reinstalación. D2D API 37: el paquete auxiliar restauró su marcador de control, pero Prisma no tenía datos elegibles; no se generó payload y su restauración quedó **NOT RUN**.
- **APK interno publicado:** artefacto ID `13908193715`, variante `internalFix2Debug`, applicationId `dev.elfast.prisma.internalfix2`; [artefacto de CI #240](https://github.com/ElFast-dev/Prisma/actions/runs/43138558639/artifacts/13908193715). SHA-256 del APK descargado y recalculado: `b7fb59469bf042b8c92ba7385150948695c457dcb2e0d8a8297eb04f28990b95`, coincidente con `BUILD_INFO.txt` y el archivo `.sha256` del artefacto. Es una compilación interna, no una Release de producción.
- **Límites:** CI #240 valida emuladores API 26/37. No se instaló el APK en el Galaxy A03 ni se realizó prueba física de modo avión; tampoco se ejecutó restauración D2D de datos reales de Prisma. **F2-H2 permanece EN DESARROLLO**, pendiente de revisión y aceptación expresa del propietario. **F2-H3 continúa APLAZADO y no se inicia.**


## Cierre de F2-H2 — aceptación del propietario — 11 de noviembre de 2026

- **Estado:** F2-H2 queda **CERRADO** por aprobación expresa del propietario después de la revisión final de criterios y evidencias. La aprobación corresponde únicamente a este hito; no cierra la Fase 2 ni autoriza empezar el hito siguiente.
- **Evidencia principal:** [CI #240](https://github.com/ElFast-dev/Prisma/actions/runs/43138558639), ejecutada sobre el código af8201553203562da57f3f618a12694f9b50bced, terminó con éxito en los cuatro trabajos. JVM 17/17; API 26 con 57 pruebas instrumentadas, sin fallos ni errores y una omisión esperada de TLS 1.3; API 37 57/57; MovieDetailScreenTest 8/8 y MovieRepositoryRoomTest 17/17 en ambas APIs; ventana amplia 2/2.
- **Criterios aceptados:** navegación fila/ficha/regreso; contenido limitado a datos locales; registros repetidos independientes y fecha/hora opcional; retirada confirmada sin pérdida de película o Historial; incorporación a Pendientes desde Historial; conservación de consulta y desplazamiento de ambas listas.
- **Límites registrados:** no se instaló el APK en el Galaxy A03 ni se realizó prueba física del incremento. La restauración D2D de datos de Prisma quedó NOT RUN porque no había payload elegible por las reglas de exclusión. Estos resultados no se presentan como pruebas realizadas.
- **Siguiente estado:** la Fase 2 continúa **EN CURSO** porque F2-H3 está **APLAZADO**. Calificaciones por visionado, Ocultos/restauración y listas manuales básicas no se inician hasta recibir activación expresa del propietario. Fase 3 y fases posteriores siguen sin iniciar.


## Inicio de F2-H3 — activación del propietario — 11 de noviembre de 2026

- **Estado:** EN DESARROLLO. El propietario autorizó continuar con el trabajo técnico no visual sin pedir aprobaciones intermedias; las decisiones de apariencia, composición, estilo y controles visuales siguen requiriendo su aprobación.
- **Alcance activo:** calificación individual de visionados (1–10) y calificación provisional que se traslada al primer visionado; Ocultos/restauración reversible; listas manuales básicas independientes de Historial y Pendientes. Todo permanece local y offline; no se adelanta TMDB, Espectro ni funciones de fases posteriores.
- **Capa de datos implementada inicialmente:** Room v2 y migración 1→2 sin pérdida de películas, Pendientes, visionados ni calificaciones previas; relaciones de ocultación que preservan los estados originales; modelo de listas y asociaciones únicas por lista; operaciones para crear, renombrar, borrar, agregar y quitar miembros; ViewModel separado para exponer flujos y acciones.
- **CI #245 — SUCCESS completo:** [ejecución 43144123522](https://github.com/ElFast-dev/Prisma/actions/runs/43144123522), sobre SHA 76d8b939f8faff37298fcaebe1399454ea71180e. Los cuatro trabajos pasaron: compilación/lint/JVM, API 26, API 37 y publicación interna. API 26: 68 pruebas instrumentadas, sin fallos/errores y una omisión esperada de TLS 1.3; API 37: 68/68; las pruebas de MovieLibraryFeaturesRoomTest y la migración Room aprobaron en ambas plataformas; ventana amplia API 37: 2/2.
- **BackupManager CI #245/#250:** el backup cloud de Prisma fue rechazado (`Backup is not allowed`) en API 26 y 37, coherente con la exclusión de datos aprobada. En CI #250, API 37 no pudo inicializar el transporte D2D (código `-1000`): no se ejecutó ciclo de copia/restauración D2D de Prisma; ese punto queda **INCONCLUSO**, no aprobado. No se afirma una migración real entre dispositivos.
- **CI #250 — SUCCESS completo:** [ejecución 43145971407](https://github.com/ElFast-dev/Prisma/actions/runs/43145971407), sobre el SHA de código `e02e11ca9820ddfb22f76dd23a5eee1cea8d804a`. Los cuatro trabajos terminaron en `success`: compilación/lint/JVM (20/20 pruebas unitarias), API 26 (69 pruebas, 0 fallos/errores y una omisión esperada de TLS 1.3), API 37 (69/69, sin omisiones) y publicación interna. La prueba adicional de ventana amplia API 37 pasó 2/2: Obsidiana y Cuarzo. Se validaron la migración Room 1→2, 11 pruebas de MovieLibraryFeaturesRoomTest, búsqueda en Ocultos, calificaciones 1–10, calificación provisional, renombrado y asociaciones de listas.
- **APK CI #250:** artefacto `prisma-internalfix2-apk-ci-250-e02e11ca9820ddfb22f76dd23a5eee1cea8d804a` (ID `13911807074`), variante `internalFix2Debug`; es un APK interno de validación, no una Release ni una instalación física.
- **Dirección visual F2-H3:** el propietario aprobó la propuesta de las cinco vistas principales en Obsidiana y Cuarzo. La dirección se ha trasladado a pantallas y rutas Compose. La aprobación no incluye colores personalizados, fijación, collages, filtros avanzados ni Favoritos.
- **Estado funcional tras la integración Compose:** `Personal` abre Ocultos y Gestionar listas; Ocultos muestra las películas ocultas y permite entrar a su ficha/restaurarlas; la ficha permite ocultar, restaurar y asignar calificación provisional o individual a cada visionado; las listas permiten crear, renombrar y eliminar, y añadir/quitar películas guardadas o una alta manual. Los recorridos de UI correspondientes se añadieron a `MovieDetailScreenTest` y `PrismaAppNavigationTest`. El incremento está en CI #269 sobre el commit `b28f88ebb578596ae16d24bb97cd5c416ed6fdc`; hasta que termine la validación, estas funciones se consideran **integradas en el código, pendientes de build/CI y aceptación**, no una entrega APK ya validada. No se instaló en el Galaxy A03.
- **Diagnóstico de CI #269:** build/lint/JVM y generación del APK candidato finalizaron correctamente. La instrumentación registró cuatro fallos en API 26 y uno en API 37: tres comprobaciones existentes de registros en la ficha no hacían scroll hasta contenido que quedó más abajo al incorporar el acceso a calificación; el nuevo recorrido de ocultar/restaurar regresaba correctamente a Historial, pero su prueba intentaba abrir Pendientes desde Historial sin volver primero al menú Personal. Los informes XML no muestran fallos de persistencia ni de las acciones de ocultar/restaurar, calificación o listas; el fallo fue de las aserciones/recorrido de prueba. El commit `84f36c78d058270ab304dfcb9c2494f859dd675f` corrige el scroll y el paso de navegación omitido. La validación automatizada se vuelve a ejecutar sobre ese commit; la publicación de CI #269 quedó omitida porque las pruebas instrumentadas no pasaron.
- Fase 3 sigue sin iniciar.


## Continuidad F2-H3 — CI #271 y corrección de sincronización — 11 de noviembre de 2026 (hora de Panamá)

- **Código probado por CI #271:** `983931a50afb757fa723dbc9db90661ab03d7640`; ejecución [43154600804](https://github.com/ElFast-dev/Prisma/actions/runs/43154600804). La rama fue `feature/fase1-android-foundation`; `main` no se modificó.
- **Build, lint y JVM:** `success`. La suite JVM pasó **20/20** sin fallos, errores ni omisiones. Se creó y subió el candidato `prisma-internalfix2-candidate-ci-271-983931a50afb757fa723dbc9db90661ab03d7640` (artefacto ID `13915421353`); es solo candidato y no se entrega como APK validado.
- **Android API 26:** **72 pruebas instrumentadas, 1 fallo, 0 errores y 1 omisión esperada** (TLS 1.3 no disponible en Android 8). El único fallo fue `MovieDetailScreenTest.selectedDateCanBeSavedWithoutInventingAnUnknownStartTime`: al volver desde la ficha, el test comprobaba inmediatamente el estado vacío de Pendientes, antes de que terminara la actualización asíncrona. El XML y logcat identifican una aserción de UI (`Tu próxima película te espera` no estaba aún visible), no un fallo de Room ni una pérdida de datos.
- **Android API 37:** suite estándar **72/72**, sin fallos, errores ni omisiones; ventana amplia adicional **2/2** (Obsidiana y Cuarzo). El control BackupManager cloud terminó correctamente: `Backup is not allowed` para Prisma y los cinco marcadores sintéticos siguieron ausentes tras reinstalar. En D2D, el paquete auxiliar desechable restauró su marcador como control positivo; Prisma no tenía datos elegibles debido a las exclusiones y el transporte rechazó el backup de la aplicación (`-1002` en el registro), por lo que la restauración D2D de datos Prisma quedó **NOT RUN**. No equivale a validar una migración entre dispositivos.
- **BackupManager API 26:** **NOT RUN**. El script se detuvo al fallar la suite instrumentada, antes de ejecutar la verificación del transporte.
- **Publicación y APK:** el job `Publish validated internal APK` quedó `skipped` por el fallo de API 26. CI #271 no publicó un APK final; no se descargó ni se entregó el candidato como sustituto.
- **Corrección mínima posterior:** el commit `c0c22eedf4bb2b79d19331f346b3157202683a4b` (`test: await pending empty state after dated watch save`) añade `waitUntil(timeoutMillis = 5_000)` esperando el tag `pending-empty-state-title` dentro del test que realmente falló. La comparación con `983931a50afb757fa723dbc9db90661ab03d7640` confirma un único archivo modificado: `MovieDetailScreenTest.kt`, **3 líneas añadidas y ninguna eliminada**; no cambió código de producción ni alcance funcional.
- **CI #272 — FAILURE:** ejecución [43155236553](https://github.com/ElFast-dev/Prisma/actions/runs/43155236553), sobre SHA `c0c22eedf4bb2b79d19331f346b3157202683a4b`. Build/lint/JVM: `success`; JVM **20/20**, sin fallos, errores ni omisiones. El candidato se subió como artefacto ID `13916161249`, pero no es un APK validado. API 26: **72 pruebas, 1 fallo, 0 errores y 1 omisión esperada** (TLS 1.3 no soportado); `selectedDateCanBeSavedWithoutInventingAnUnknownStartTime` agotó el plazo al esperar que `pendingMovies` del ViewModel dejara de contener la película. API 26 BackupManager: **NOT RUN** por el fallo de instrumentación. API 37: **72/72** estándar y **2/2** de ventana amplia; BackupManager cloud pasó (`Backup is not allowed`, cinco marcadores de prueba ausentes tras reinstalar). D2D devolvió `Initialization result: -1000`; no se ejecutó ciclo D2D, por lo que sigue inconcluso. `Publish validated internal APK`: **skipped**. CI #272 no produjo un APK final descargable.
- F2-H3 sigue **EN DESARROLLO**, pendiente de validación completa y aceptación expresa del propietario. No se declara terminado por estos resultados. Fase 3 sigue sin iniciar. No se instaló APK en el Galaxy A03.
- **Segundo ajuste de sincronización, solo en pruebas:** commit `83ae234a71b90f82a60dd6b003cefe1a0dc6196b` (`test: await pending flow before returning from selected-date watch`). El test ahora mantiene una instancia explícita compartida de los ViewModels, espera la presencia inicial de la película en `pendingMovies`, espera su retirada del `StateFlow` tras registrar el visionado y después comprueba el destino Pendientes y su estado vacío. La comparación con el padre `1b7ee36054eb152591a8ddb8f4daae04af804a27` confirma que el único archivo de código cambiado es `MovieDetailScreenTest.kt` (**13 añadidas, 2 eliminadas**); no se cambió código de producción ni alcance.
- **CI #273 — FAILURE por compilación de pruebas:** [ejecución 43156794047](https://github.com/ElFast-dev/Prisma/actions/runs/43156794047), SHA `83ae234a71b90f82a60dd6b003cefe1a0dc6196b`. Build/lint/JVM: `success`; JVM **20/20**. Los jobs API 26 y API 37 fallaron ambos en `:app:compileInternalFix2DebugAndroidTestKotlin` con `Unresolved reference: onAllNodesWithText` en `MovieDetailScreenTest.kt:240`. Ninguna matriz ejecutó pruebas instrumentadas ni BackupManager. `Publish validated internal APK`: **skipped**. El artefacto candidato ID `13916460799` no es un APK validado.

- **Corrección de compilación, solo en pruebas:** commit `ea60b62e56627939df2fe3b2ac2d2c7384bc0ec6` (`test: use supported assertion for pending destination`). Se retiró la llamada no disponible `onAllNodesWithText` y se comprobó el encabezado con `onNodeWithText("Pendientes").assertIsDisplayed()`; se conserva la espera del estado vacío y las comprobaciones del flujo. Comparación con el padre `00c56e1bf373c5dcc9d8c9ead84896fd9300fdbc`: único archivo modificado `MovieDetailScreenTest.kt`, **1 línea añadida y 3 eliminadas**. No cambia código de producción ni alcance.
- **CI #274 — FAILURE:** [ejecución 43157245252](https://github.com/ElFast-dev/Prisma/actions/runs/43157245252), SHA `ea60b62e56627939df2fe3b2ac2d2c7384bc0ec6`. Build/lint/JVM: `success`; pruebas JVM **20/20**. API 26: **72 pruebas, 1 fallo, 0 errores y 1 omisión esperada** (TLS 1.3 no disponible); `selectedDateCanBeSavedWithoutInventingAnUnknownStartTime` confirmó que el ViewModel retiró la película de `pendingMovies`, pero falló la aserción inmediata del encabezado `Pendientes` al volver desde la ficha, antes de que terminara la composición de la pantalla vacía. API 26 BackupManager: **NOT RUN** por el fallo de instrumentación. API 37: **72/72** pruebas estándar y **2/2** de ventana amplia; BackupManager cloud pasó (`Backup is not allowed` para Prisma y cinco marcadores sintéticos ausentes tras reinstalar). El control positivo D2D restauró el marcador del paquete auxiliar; para Prisma el transporte devolvió `-1002` porque las exclusiones dejan la aplicación sin datos elegibles y el informe confirma **D2D restore cycle: NOT RUN**. Esto no valida una migración de datos D2D. `Publish validated internal APK`: **skipped**. Candidato ID `13916188244`; no es APK final ni se entrega.

- **Ajuste adicional de sincronización, solo en pruebas:** commit `883f742de057836ec8acedd3f67188d5bf360765` (`test: await pending empty state before asserting its header`). En `selectedDateCanBeSavedWithoutInventingAnUnknownStartTime`, después de volver desde la ficha se espera a que aparezca el tag `pending-empty-state-title` y solo entonces se comprueba que el encabezado `Pendientes` y el mensaje vacío estén visibles. La comparación con el padre `2edf08ca57418b3ac855d4571a04ee284a71afe1` confirma que el único archivo modificado es `MovieDetailScreenTest.kt` (**1 línea añadida y 1 eliminada**); no cambia código de producción ni alcance.
- **CI #275 — FAILURE:** [ejecución 43157932287](https://github.com/ElFast-dev/Prisma/actions/runs/43157932287), SHA `883f742de057836ec8acedd3f67188d5bf360765`. Build/lint/JVM: `success`; pruebas JVM **20/20**, sin fallos ni omisiones. API 26: **72 pruebas, 1 fallo, 0 errores y 1 omisión esperada** (TLS 1.3 no disponible). El único fallo fue `MovieDetailScreenTest.selectedDateCanBeSavedWithoutInventingAnUnknownStartTime`: tras volver desde la ficha, `pending-empty-state-title` no apareció dentro de los 5 segundos; la espera anterior ya había confirmado que la película se retiró de `pendingMovies`. XML y logcat sitúan el timeout en `MovieDetailScreenTest.kt:239`; no hay fallo de persistencia informado. API 26 BackupManager: **NOT RUN** por detenerse Gradle al fallar la instrumentación. API 37: **72/72** pruebas estándar y **2/2** de ventana amplia. BackupManager cloud pasó: `Backup is not allowed` para Prisma y los cinco marcadores sintéticos siguieron ausentes tras reinstalar. D2D: inicialización del transporte `0` y control positivo del paquete auxiliar restaurado correctamente; Prisma no tenía datos elegibles por las reglas de exclusión, el transporte no generó payload de datos de la app y el informe marca `D2D restore cycle: NOT RUN`. No valida la migración real de Prisma entre dispositivos. `Publish validated internal APK`: **skipped**. Candidato ID `13917141375`; no es APK final ni se entrega.

- **CI #276 — EN EJECUCIÓN:** [ejecución 43159091189](https://github.com/ElFast-dev/Prisma/actions/runs/43159091189), SHA probado `5f74f662ed1cd005d6a960576847ca569299d8a4`. Build/lint/JVM: `success`; informes JVM **20/20**. Se generó el candidato (artefacto ID `13917461553`), que no es validado. Los jobs API 26 (ID `130986278208`) y API 37 (ID `130986278168`) están ejecutando `Run UI and BackupManager tests`, ambos sin conclusión al actualizar el documento. El commit probado añade esperas en el test para que desaparezca `movie-detail-screen` y reaparezca `pending-search-surface` antes de comprobar `pending-empty-state-title`; el cambio es solo de pruebas. No entregar el candidato ni declarar APK validado hasta que ambas matrices pasen y `Publish validated internal APK` termine en `success`.

## Continuidad F2-H3 — diagnóstico de navegación y CI #277–#281 — 12 de noviembre de 2026 (hora de Panamá)

- **Corrección del recorrido de fecha, solo en prueba instrumentada:** la secuencia desplazaba la ficha hasta el texto «Hora no registrada» y después intentaba pulsar el botón «Volver», situado en la cabecera y fuera del viewport en el emulador API 26. El commit `de6ea4d12c8efc680b2cfba46c5839961394cc43` aplica `performScrollTo().performClick()` al botón y espera a que Compose quede inactivo antes de verificar que Pendientes y su estado vacío estén visibles. No se modificó navegación de producción, Room ni el alcance funcional.
- **CI #277–#280:** las ejecuciones intermedias fallaron por aserciones de retorno/transición y por una referencia de diagnóstico `onRoot` que quedó sin import durante una limpieza del test. No se interpretan como fallos de persistencia. La ejecución #280 pasó API 37 y falló API 26; sus resultados no se sustituyen por los de la ejecución final.
- **[CI #281 — SUCCESS en los cuatro trabajos](https://github.com/ElFast-dev/Prisma/actions/runs/43163584428)** probó el commit `de6ea4d12c8efc680b2cfba46c5839961394cc43`: build/lint/JVM, Android API 26, Android API 37 y publicación interna.
- **JVM:** 20/20, sin fallos, errores ni omisiones. **API 26:** 72 pruebas instrumentadas, 0 fallos, 0 errores y 1 omisión esperada porque Android 8 no ofrece TLS 1.3. **API 37:** 72/72, sin fallos, errores ni omisiones. **Ventana amplia API 37:** 2/2 (Obsidiana y Cuarzo). La prueba `selectedDateCanBeSavedWithoutInventingAnUnknownStartTime` pasó en ambos emuladores.
- **BackupManager cloud:** API 26 y API 37 pasaron. Prisma recibió `Backup is not allowed`; los marcadores sintéticos de prueba permanecieron ausentes después de reinstalar. **D2D API 37:** el transporte confirmó que Prisma no tiene datos elegibles debido a las exclusiones de transferencia configuradas; no se creó payload de datos de la app y `D2D restore cycle: NOT RUN`. Esto **no** valida una restauración real de datos Prisma entre dispositivos. Se mantienen intactas las reglas de exclusión BackupManager.
- **APK interno publicado:** [artefacto CI #281](https://github.com/ElFast-dev/Prisma/actions/runs/43163584428/artifacts/13919124141), ID `13919124141`, nombre `prisma-internalfix2-apk-ci-281-de6ea4d12c8efc680b2cfba46c5839961394cc43`. Variante `internalFix2Debug`, applicationId `dev.elfast.prisma.internalfix2`. SHA-256 del APK verificado localmente contra `BUILD_INFO.txt` y `.sha256`: `316b031b7532bc882f031de4dc5c1dcd206c7c7c6429b864fff8e41d2ae30169`. SHA-256 del ZIP de artefacto: `c8f80ac835d17f7fe03c58e16c9c74f99281f46a3aa27745d589f0fa20a9c613`. El CI confirmó para APK y AndroidTest el certificado esperado `62aba12864def63a02f516dcacbb7fc6fdb5ad9e802bd93713dbf498ffa4a733`. Es un APK interno de validación, no una Release de producto ni una compilación de producción.
- **Riesgo de firma detectado en la auditoría de referencia y corroborado en la rama:** el archivo de keystore de `internalFix2` está accesible en el repositorio y `app/build.gradle.kts` contiene las contraseñas en texto plano (`android`). El repositorio es público. Debe tratarse esa clave como comprometida para la variante interna: terceros podrían firmar una actualización con la misma identidad. No se rotó la clave ni se modificó el flujo de firma porque la sustitución puede impedir instalar una actualización sobre la variante existente y afectar sus datos locales; queda pendiente decisión expresa del propietario. No usar esta variante con datos que requieran confidencialidad mientras siga vigente la clave expuesta.
- **Estado del hito:** F2-H3 permanece **EN DESARROLLO**, pendiente de revisión funcional y aceptación expresa del propietario; la CI verde no implica aceptación del producto. No se amplía el alcance con los otros hallazgos de la auditoría. No se modificó `main`, no se instaló el APK en el Galaxy A03 y no se publicó un Release de producción. Fase 3 sigue sin iniciar.



## Continuidad F2-H3 — remediación de firma interna y recorridos de Descubrir — 12 de noviembre de 2026

- **Firma interna:** el keystore comprometido se retiró del árbol actual en el commit `35e72af494de0b47ab6262b9f30942c8502ce4ee`; el historial público previo se conserva y la clave antigua no debe volver a usarse. El Gradle exige firma externa para producir un APK interno estable. Cuando faltan secretos, la CI usa firma debug efímera y omite publicar el APK. La nueva clave interna ya fue generada fuera del repositorio en un PKCS#12 (alias `prisma-internalfix2`, RSA 4096, firma SHA256withRSA). Huella pública del certificado: `85db86bac5cfb4239a5fdbd33cecc977a199b65310b028900e00f5f0437eae89`. El PKCS#12, Base64, contraseña y huella se entregaron al propietario como archivos privados separados; ninguno se añadió al repositorio. **La rotación aún no está operativa:** falta registrar en GitHub Actions los secretos `PRISMA_INTERNALFIX2_KEYSTORE_BASE64` y `PRISMA_INTERNALFIX2_KEY_PASSWORD`, y la variable `PRISMA_INTERNALFIX2_CERT_SHA256`. Mientras falten, no se publica APK interno estable. Un APK anterior firmado con la clave comprometida no acepta actualización con la firma nueva; no desinstalarlo sin preservar antes los datos locales, excluidos de BackupManager.
- **CI #288 — SUCCESS:** [ejecución 43168822156](https://github.com/ElFast-dev/Prisma/actions/runs/43168822156), commit `d88c8188eb90fbb4c2dcd826cc1477b99eb5efb0`. Build, lint y JVM finalizaron correctamente. API 26: 72 pruebas instrumentadas, 0 fallos, 0 errores y 1 omisión esperada porque Android 8 no dispone de TLS 1.3. API 37: 72/72, 0 fallos, 0 errores ni omisiones; la prueba de ventana amplia también compiló y terminó correctamente. BackupManager cloud pasó en ambas API y los marcadores sintéticos excluidos no reaparecieron tras reinstalar. En API 37, la inicialización del transporte D2D resultó inconclusa; no se ejecutó ciclo de backup/restore D2D para Prisma. No se declara validación D2D real. La publicación de APK quedó omitida correctamente mientras falte la nueva firma externa.
- **Descubrir → ficha:** se corrigió la fila local para que al pulsarla abra la ficha local existente, usando la ruta de navegación ya implementada. Se agregó una prueba Compose para crear manualmente una película, abrir su ficha y volver desde Descubrir en Obsidiana y Cuarzo. El requisito se explicitó en `docs/PRODUCTO/REQUISITOS.md`.
- **Búsqueda local de Descubrir:** los requisitos del MVP indicaban buscar también películas ocultas. Se corrigieron exclusivamente las consultas `observeAll` y `observeSearch` que alimentan Descubrir para incluir Ocultos. Las consultas `observeAllSavedMovies` y `observeSavedMovieSearch`, usadas para seleccionar miembros de listas, mantienen la exclusión de películas ocultas. Se añadió un test Room de esa separación y una prueba Compose del recorrido película oculta → resultado local → ficha → restaurar → resultado visible de nuevo.
- **CI de los cambios funcionales:** el commit `d26e1c1c57838da144155f2630b8600d47b87aee` disparó CI #295 (run ID `43170277261`). Al registrar esta nota, la ejecución sigue pendiente en cola; todavía no se atribuyen resultados de compilación o emulador a estos cambios nuevos.
- **Límites y estado:** F2-H3 permanece **EN DESARROLLO**, pendiente de CI final sobre los cambios de Descubrir y de aceptación expresa del propietario. No se modificó `main`, no se instaló ni desinstaló nada en el Galaxy A03, no se publicó Release de producción y Fase 3/TMDB no se inició. No se cambió ninguna regla de exclusión de BackupManager.


### Seguimiento de validación UI→Room — 12 de noviembre de 2026

- Se añadió `PrismaAppRoomIntegrationTest`, que ejecuta el recorrido real sobre una base Room con archivo: alta manual desde Descubrir, apertura de ficha, ocultar, volver a encontrar el registro oculto en Descubrir, restaurarlo y reabrir la base para comprobar que permanece visible y sin marca de oculto.
- El fake de pruebas ahora refleja por separado los contratos reales: Descubrir incluye ocultos; la selección de películas para listas personalizadas continúa excluyéndolos. Se mantienen los tests Room específicos para ambas reglas.
- Commit de la prueba Room integrada y su sincronización de flujos: `f559c10c562420f5d9c0cdc59e04321b71c1e66a`.
- CI #291 (run ID `43169532915`, commit `e4e7e1becb5536cb2eb816c89c2e242b30ebb756`) validó API 26 con 73 pruebas instrumentadas, 0 fallos/errores y 1 omisión esperada por TLS 1.3 en Android 8. API 37 seguía ejecutando al registrar esta actualización; esta ejecución no incluye los cambios posteriores de búsqueda de Ocultos ni la prueba Room integrada.
- CI #298 (run ID `43170940145`, commit `f559c10c562420f5d9c0cdc59e04321b71c1e66a`) quedó en cola para verificar el estado actual de la rama. No atribuirle resultados hasta que termine.
- F2-H3 continúa **EN DESARROLLO**; no se declara aceptación final mientras falte la ejecución completa sobre el último commit y la comprobación funcional del propietario.


## Continuidad F2-H3 — restauración del back stack y verificación UI→Room — 12 de noviembre de 2026

- **Navegación guardable:** PrismaApp.kt sustituye la pila transitoria creada con remember/mutableStateListOf por rememberNavBackStack de Navigation 3. Las rutas raíz, ficha y lista personalizada se representan mediante NavKey serializables. La ficha conserva su identificador y los campos locales mínimos necesarios para reconstruir su argumento; la ruta de lista conserva su listId. Se añade el plugin Kotlin serialization para el guardado/restauración.
- **Recreación real de Activity:** PrismaMainActivityInsetsTest.realActivityRestoresTheCurrentSectionAfterRecreation usa ActivityScenario.recreate() y comprobó que, después de entrar en Personal, la Activity recreada continúa en esa sección. Pasó en API 26 y API 37 en CI #309.
- **Restauración Compose de ficha y lista:** se añadió PrismaAppNavigationTest.navigationBackStackRestoresFichaAndCustomListEntries. En CI #310 pasó en API 26; la matriz API 37 de ese run aún no había terminado al registrar esta nota. La CI #306/#309 anteriores solo fallaron esa prueba porque el escenario esperaba resultados de Descubrir sin escribir la consulta inicial. Descubrir mantiene su comportamiento deliberado de mostrar su estado inicial vacío hasta que el usuario busca. El commit 2c5d53307e1fc82a28d898a3331ab18d732d8cf2 configura Memento como consulta inicial en el test, sin alterar la pantalla.
- **Recorrido F2-H3 con Room real:** PrismaAppRoomIntegrationTest.ratingsAndCustomListsWorkThroughTheAppAndSurviveDatabaseReopen atraviesa la interfaz Compose conectada a una base Room en archivo: alta manual; puntuación provisional 8; transferencia al primer visionado; actualización de la nota a 9; creación y renombrado de lista; adición y retirada de películas manuales; cierre/reapertura de Room y comprobación de persistencia de la nota y miembros. El test pasó en API 26 y API 37 en CI #309. El test discoverCanFindHideAndRestoreMovieWithRoomDataSurvivingDatabaseReopen también pasó en ambas APIs y comprueba ocultar, encontrar, restaurar y conservar el resultado tras reabrir Room.
- **CI #309:** ejecución 43177832222, SHA 6080fec90e5475d0619132e7c0a26f250a810473. Build/lint/JVM: success. API 26 y API 37: 79 pruebas cada una; el único fallo fue el test de restauración de back stack que aún no fijaba la búsqueda de Descubrir. Los dos tests UI→Room y la prueba real ActivityScenario.recreate() pasaron en ambas APIs. En API 26 se omitió únicamente la prueba TLS 1.3 esperada por la limitación de Android 8.
- **CI #310:** ejecución 43178133856, SHA 2c5d53307e1fc82a28d898a3331ab18d732d8cf2. Build/lint/JVM: success. **API 37:** 79/79 pruebas instrumentadas, sin fallos, errores ni omisiones; restauración de back stack, integración Room de ratings/listas y ocultar/restaurar pasaron. Ventana amplia API 37: 2/2 (Obsidiana y Cuarzo). **API 26:** 79 pruebas, 1 fallo, 0 errores y 1 omisión esperada por TLS 1.3 no disponible en Android 8. La prueba de restauración de back stack y recreación de Activity pasó; la única falla fue ratingsAndCustomListsWorkThroughTheAppAndSurviveDatabaseReopen porque el test consultó Room antes de que terminara la inserción asíncrona tras Guardar. El recorrido Room de ocultar/restaurar pasó. BackupManager API 26 y publicación del APK se omitieron porque la suite instrumentada terminó fallida; API 37 finalizó correctamente.
- **Corrección del test Room:** commit 3db27717e9a7e0024554f8dd25a6f643fec4932c espera a que observeMovies(Memento) emita la película antes de leerla y abrir su ficha. No cambia código de producción, DAO, esquema ni alcance de producto. CI #311 (run ID 43179992868) queda pendiente para validar el estado completo actual.
- **Estado y límites:** F2-H3 permanece EN DESARROLLO. Las pruebas de emulador no sustituyen la instalación y revisión del propietario. No se modificó main, no se instaló ni desinstaló nada en el Galaxy A03, no se publicó Release de producción y no se cambió ninguna regla de BackupManager. La publicación estable del APK interno sigue bloqueada hasta registrar los tres valores de signing en GitHub Actions. La restauración D2D de datos Prisma reales sigue sin estar validada.
