> **Archivo histórico.** Archivo histórico de SemVer/compilaciones de la aplicación Android. No aplicar versionCode, APK, variantes ni reglas de firma a Prisma Web; la política actual está en docs/TECNICO/VERSIONADO.md.

# Versionado del producto y compilaciones internas — Prisma

**Estado:** política aprobada para el desarrollo; no hay versiones de producto publicadas.
**Última comprobación del repositorio:** 11 de noviembre de 2026.

## 1. Tres identificadores distintos

Prisma utiliza tres sistemas que no deben confundirse:

| Sistema | Qué identifica | Convención | ¿Crea una versión del producto? |
|---|---|---|---|
| Desarrollo | Trabajo pendiente o completado | Fases, hitos, módulos, funcionalidades y tareas | No |
| Compilación interna | Un APK generado para desarrollo/QA | Número de GitHub Actions + SHA del commit + variante; fecha opcional | No |
| Producto | Una entrega instalable publicada y aceptada | SemVer en versionName y tag de GitHub Release | Sí |

Un commit, una pantalla terminada, una fase cerrada, una ejecución CI exitosa o un artefacto de Actions no son, por sí solos, una versión de Prisma.

## 2. Identificadores de desarrollo

Los IDs pertenecen al roadmap, nunca al campo Android versionName ni a tags SemVer.

Formato recomendado: F<fase>-H<hito> (por ejemplo, F2-H2). Las tareas pequeñas pueden usar un sufijo descriptivo o un identificador de Issue, sin crear un número de producto.

| ID | Fase | Alcance |
|---|---|---|
| F1-H1 | Fundamentos Android | Base Android, navegación, temas, CI y aceptación de Fase 1 |
| F2-H1 | Diario local | Room, alta manual, persistencia, búsqueda local offline y duplicados |
| F2-H2 | Diario local | Historial/Pendientes, ficha local, visionados repetidos y retirada confirmada |
| F2-H3 | Diario local | Calificación individual, Ocultos/restauración y listas manuales básicas |
| F3-H1 | TMDB esencial | Token cifrado, ciclo de vida, validación y búsqueda |
| F3-H2 | TMDB esencial | Selección supervisada y enriquecimiento local con datos verificados |
| F4-H1 | Protección de datos | Exportación/restauración cifradas y formato versionado |
| F4-H2 | Protección y MVP | Regresión integral, aceptación del MVP y entrega instalable |

Las fases posteriores conservan sus IDs de fase y reciben hitos concretos al aprobar su especificación. No se anticipan tareas ni se cambia el alcance por esta política.

## 3. Compilaciones internas

Identificación humana recomendada:

PRISMA-DEV · CI #<run_number> · <sha7> · <variant>

Ejemplo ilustrativo: PRISMA-DEV · CI #219 · 6315ba6 · internalFix2Debug.

- La fuente de verdad del número de CI es la ejecución de GitHub Actions; el SHA identifica exactamente el código compilado.
- La variante identifica el paquete Android (actualmente internalFix2Debug, paquete dev.elfast.prisma.internalfix2).
- La fecha/hora UTC puede añadirse como metadato auxiliar, no como versión.
- El artefacto interno debe acompañarse de BUILD_INFO.txt y checksum SHA-256, con número de CI, SHA completo, variante, paquete y fecha UTC.
- Los APK de CI sirven para pruebas. No se publican como versiones de producto ni como Releases de producción.
- No se incrementa SemVer ni el versionCode de producción al ejecutar CI.

## 4. Estado Android comprobado y valores que se conservan

Los valores actuales de app/build.gradle.kts se verificaron en la rama de trabajo:

| Variante / configuración | versionName resultante | versionCode | Identidad |
|---|---:|---:|---|
| Base / productionDebug de inspección | 0.1.0 | 1 | dev.elfast.prisma |
| internalDebug | 0.1.0-internal | 1000001 | dev.elfast.prisma.internal |
| internalFixDebug | 0.1.0-internal-fix | 1000002 | dev.elfast.prisma.internalfix |
| internalFix2Debug | 0.1.0-internal-fix2 | 1000003 | dev.elfast.prisma.internalfix2 |

Estos valores se documentan, no se cambian con esta reorganización.

- productionDebug se compila para inspeccionar identidad y secuencia; no está firmado con la clave privada de producción ni se distribuye.
- El 0.1.0 base actual es un valor de configuración heredado/provisional del build de inspección. No demuestra que exista una versión 0.1.0 publicada ni autoriza a anunciarla.
- La primera versión de producto se decidirá cuando supere su puerta de aceptación. En ese momento se asignará el SemVer real y se actualizará versionName para el artefacto de producción.
- Los códigos internos 1000001, 1000002 y 1000003 son secuencias de variantes de prueba separadas. No deben mezclarse con el contador público ni modificarse sin analizar compatibilidad de instalación de cada paquete.

## 5. SemVer del producto

Se aplica SemVer 2.0.0:

- **MAJOR:** cambios mayores o incompatibles respecto al contrato de uso del producto.
- **MINOR:** nuevas capacidades compatibles.
- **PATCH:** correcciones compatibles que no agregan una nueva capacidad.
- **Pre-release:** sufijos -alpha.N, -beta.N y -rc.N para entregas preliminares. Los identificadores de pre-release tienen precedencia inferior a la versión final correspondiente.
- El metadato de compilación SemVer (+...) no se usa para sustituir el número de CI; CI y SHA se registran en BUILD_INFO.txt.

No se aumenta SemVer al finalizar una fase, módulo, pantalla, tarea ni corrección interna que no se distribuya como producto. No se elige ni se anuncia un número por anticipado.

### 5.1 Puerta de la primera pre-release (alpha)

La primera alpha solo podrá publicarse cuando el recorrido local básico sea realmente utilizable y pase todos estos criterios, en ambos temas Obsidiana y Cuarzo:

1. Alta manual de películas con validación de datos básicos.
2. Almacenamiento local persistente.
3. Historial y Pendientes funcionales.
4. Ficha local que representa los datos guardados.
5. Registro de visionados repetidos sin sobrescribir los anteriores.
6. Consulta de cada visionado individual.
7. Búsqueda local operativa.
8. Gestión de los registros básicos (agregar, retirar o corregir según las acciones implementadas y aprobadas).
9. Uso del recorrido diario sin conexión.
10. Navegación coherente entre las pantallas implicadas.
11. Persistencia verificada al cerrar y volver a abrir la aplicación.
12. Pruebas de regresión y estabilidad aprobadas, sin defectos P0/P1 abiertos.

Además, el candidato debe ser instalable como variante de producción, tener firma de producción verificada, conservar datos al actualizar una instalación previa, disponer de APK y checksum verificables y superar una prueba de instalación/recorrido en Android. Una compilación interna no sustituye esta puerta.

0.1.0-alpha.1 es únicamente un ejemplo de formato; no se ha asignado ni aprobado ese número. La primera alpha usará el siguiente SemVer que se decida al aprobar el alcance concreto de esa entrega.

### 5.2 Puerta de la primera versión estable del MVP

Una versión estable 0.x.y solo se autorizará cuando se complete íntegramente la sección 17 de docs/PRODUCTO/REQUISITOS.md, incluido el recorrido extremo a extremo, TMDB esencial con degradación offline, Historial/Pendientes/Ocultos, visionados y calificaciones individuales, listas manuales básicas, exportación/restauración cifradas, paridad de temas, pruebas de aceptación y entrega instalable.

También debe cumplirse lo siguiente:

- Cero defectos P0/P1 abiertos; regresión completa y evidencia reproducible de CI.
- Instalación, actualización y conservación de datos comprobadas en Android.
- Identidad y firma de producción verificadas; SHA-256 del APK publicado.
- Changelog en español revisado por el propietario y asociado a la Release.
- Aprobación expresa del propietario para publicar.

La alpha no se convierte automáticamente en estable. La versión estable usa el SemVer que corresponda al incremento realmente entregado, no el ID de una fase.

### 5.3 Puerta de 1.0.0

1.0.0 queda reservada para completar también el alcance de la sección 18 de REQUISITOS.md, con todas las capacidades aprobadas posteriores al MVP, la regresión integral y la aprobación expresa del propietario. No se infiere de una CI exitosa ni de la publicación del MVP 0.x.y.

## 6. Secuencia de versionCode

- versionCode es un entero de Android; es independiente del SemVer.
- El primer producto publicado —sea alpha, beta, RC o estable— utilizará versionCode = 1.
- Cada nueva Release de producto publicada incrementa exactamente en uno, incluidas las pre-releases y las correcciones. Los borradores no publicados, builds de CI y artefactos internos no consumen códigos.
- Nunca se reutiliza ni se retrocede. Se conserva el límite operativo ya aprobado de 2.100.000.000.
- Antes de publicar, CI inspecciona los APK de todas las Releases publicadas, incluidas pre-releases, y exige el siguiente entero. No basta con consultar /releases/latest, porque ese endpoint representa la Release estable más reciente y omite el historial de pre-releases.
- Los APK de producción incluidos en una misma Release deben compartir identidad y versionCode. Los códigos de Releases distintas no se reutilizan.
- Las variantes internas mantienen sus códigos separados y no alteran la secuencia de producción.
- Como CI ejecuta esta comprobación en cada push de desarrollo, el versionCode de producción en Gradle representa siempre el siguiente código disponible para una futura Release, no el último que ya fue publicado. Después de publicar una Release, se actualiza en un commit posterior a max(versionCode publicado)+1 para que las siguientes validaciones sigan pasando. Ese ajuste técnico no publica otra versión y no modifica los códigos internos.

## 7. Tags y GitHub Releases

- Un tag SemVer y una GitHub Release se crean únicamente después de superar la puerta de producto correspondiente y recibir aprobación expresa.
- Una alpha/beta/RC pública se publica como pre-release de GitHub; una entrega estable se publica como Release estable.
- Cada Release incluye APK de producción instalable, changelog no vacío en español y SHA-256 verificable.
- El SHA del commit de origen se registra para trazabilidad. La Release debe apuntar al código que superó las pruebas, no a un HEAD distinto.
- Los artefactos de Actions son temporales y no sustituyen tags ni Releases.

## 8. Transición y conservación histórica

Antes de esta política se utilizaron los números 0.2.0, 0.3.0, 0.4.0, 0.5.0, 0.6.0, 0.7.0, 0.8.0 y 0.9.0 como etiquetas para incrementos del roadmap. Se conservan en los registros, commits, notas de CI y documentos históricos para explicar las decisiones de entonces.

A partir de esta revisión, esos números son **alias históricos de hitos de desarrollo**, no versiones de producto distribuidas. Su correspondencia principal es:

| Identificador histórico | Nuevo ID de desarrollo | Descripción |
|---|---|---|
| 0.2.0 | F1-H1 | Fundamentos Android |
| 0.3.0 | F2-H1 | Base local |
| 0.4.0 | F2-H2 | Ficha local, Historial y Pendientes |
| 0.5.0 | F2-H3 | Calificación, Ocultos y listas básicas |
| 0.6.0 | F3-H1 | Seguridad y ciclo de token TMDB |
| 0.7.0 | F3-H2 | Búsqueda y enriquecimiento TMDB |
| 0.8.0 | F4-H1 | Copias cifradas |
| 0.9.0 | F4-H2 | Integración y aceptación del MVP |

No se crean tags retroactivos, no se publican Releases retroactivas y no se reescribe el historial Git. Esta transición no cambia la base de datos, el applicationId, la firma interna ni los versionCode actuales.

## 9. Referencias

- SemVer 2.0.0: https://semver.org/spec/v2.0.0.html
- Android versionCode y versionName: https://developer.android.com/studio/publish/versioning
- GitHub Releases y tags: https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases
