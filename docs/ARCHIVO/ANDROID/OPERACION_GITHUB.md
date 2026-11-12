> **Archivo histórico.** Archivo histórico de administración de GitHub durante el desarrollo Android; las recomendaciones de APK/Android CI ya no son operativas para Prisma Web.

# Operación de GitHub para Prisma

**Revisión:** 11 de noviembre de 2026 (hora de Panamá).  
**Repositorio:** [ElFast-dev/Prisma](https://github.com/ElFast-dev/Prisma).  
**Propósito:** aprovechar las capacidades útiles de GitHub sin añadir procesos, tableros o automatizaciones que no aporten valor al desarrollo de Prisma.

Este documento es una auditoría operativa y una propuesta. No activa por sí mismo opciones de configuración de GitHub ni amplía el alcance del producto.

## 1. Estado comprobado del repositorio

### Datos generales

- Visibilidad: público.
- Rama predeterminada: `main`.
- Rama activa de desarrollo: `feature/fase1-android-foundation`.
- `main` permanece separado de la implementación de Fase 2. No integrar cambios sin aprobación expresa.
- La CI Android está en la rama de desarrollo. En la revisión, el archivo `.github/workflows/android-ci.yml` todavía no existe en `main`.

### Funciones de GitHub

| Función | Estado observado | Uso recomendado |
|---|---|---|
| GitHub Actions | Activo en la rama de desarrollo | Mantener CI Android y añadir controles aislados. |
| Issues | Habilitado; no hay Issues abiertas ni cerradas | Usarlos para decisiones, defectos o trabajo que necesite seguimiento; no crear uno por cada commit. |
| Projects | La función está habilitada | No crear un tablero duplicado mientras el roadmap documentado sea suficiente. |
| Wiki | Habilitada | Mantener la documentación principal en `docs/` para conservarla versionada con el código. |
| Pull Requests | No hay PR registrados | Usar PR para la futura integración hacia `main`. |
| Releases | No hay Releases publicadas | Publicar versiones instalables cuando el producto y la firma de producción estén preparados. |
| Tags | No se encontraron tags publicados | Crear tags SemVer al distribuir una versión aprobada. |
| GitHub Pages | Deshabilitado | No necesario para la aplicación Android actual. |
| Discussions | Deshabilitado | Activarlo solo si aparece una comunidad que requiera soporte y conversación pública. |
| Downloads clásicos | Deshabilitado | No hace falta; las Releases son el mecanismo adecuado para APK y changelog. |
| Rulesets | La API de rulesets devuelve una lista vacía | Crear reglas para proteger `main` antes de permitir integraciones. |

**Límite de verificación:** la conexión disponible no pudo leer la protección clásica de ramas (GitHub devolvió 403). Por tanto, la ausencia de rulesets no demuestra por sí sola que `main` no tenga una regla clásica. Conviene confirmar en Settings → Rules → Rulesets y Settings → Branches.

### Estructura de automatización actual

En `.github/workflows/` hay un único flujo: `android-ci.yml`. Incluye:

- Compilación, lint, pruebas JVM y generación del APK candidato.
- Pruebas instrumentadas en Android API 26 y API 37.
- Comprobaciones de BackupManager y una prueba adicional de ventana amplia en API 37.
- Verificación de `versionCode` y de la firma del paquete interno.
- Publicación del APK interno como artefacto de Actions únicamente después de superar la matriz.

El flujo ya aplica dos buenas prácticas importantes: permisos globales mínimos (`contents: read`) y concurrencia que conserva una ejecución activa, sustituyendo la pendiente obsoleta por la actualización más reciente.

Los artefactos actuales sirven para validación temporal y no equivalen a una Release. Los esquemas Room y reportes de pruebas se conservan durante 14 días; el APK candidato dura 1 día; el APK interno validado se conserva 14 días.

## Estado de versionado comprobado — 11 de noviembre de 2026

- La colección de tags de Git está vacía y la colección de GitHub Releases está vacía. No hay versiones de producto publicadas en esta comprobación.
- Los artefactos de Actions son compilaciones internas temporales; no equivalen a Releases.
- La política de hitos, SemVer, pre-releases, versionCode y artefactos QA está en docs/TECNICO/VERSIONADO_Y_COMPILACIONES.md.
- La base Gradle verificada es versionName=0.1.0/versionCode=1 para producción de inspección; las variantes internas mantienen los códigos 1000001, 1000002 y 1000003. No se modifican por reorganizar el roadmap.


## Verificación de rama y CI #236 — 11 de noviembre de 2026 (hora de Panamá)

- Punta remota de `feature/fase1-android-foundation`: `dfe12e00c291815a21217e9a6e00949b56f98a2f`. Punta remota de `main`: `85a40cf7e2b513138e4c6c0559dab5f0845a7383`. Comparación al iniciar esta revisión: **359 ahead / 0 behind**; en ese momento la punta coincidía con el SHA de referencia. El cambio posterior de esta entrega es exclusivamente documental; no hay cambios de aplicación nuevos que integrar.
- [Android CI #236](https://github.com/ElFast-dev/Prisma/actions/runs/43130218778), sobre `dfe12e00c291815a21217e9a6e00949b56f98a2f`, terminó `completed/success` en los cuatro jobs: build/lint/JVM/APK candidato, API 37, API 26 y publicación APK interno.
- Reportes: JVM 17/17; API 26 55 casos sin fallos/errores y una omisión TLS 1.3 esperada; API 37 55/55; ventana amplia API 37 2/2. `MovieDetailScreenTest` 6/6 y `MovieRepositoryRoomTest` 17/17 en ambas APIs.
- Artefacto interno: ID `13905650760`, variante `internalFix2Debug`, paquete `dev.elfast.prisma.internalfix2`; no es una Release.
- El workflow `.github/workflows/android-ci.yml` define `paths-ignore: docs/**, **/*.md` en eventos `push`. Por diseño, este commit exclusivamente documental no inicia otra matriz Android; CI #236 sigue siendo la validación vigente del código de aplicación, no una ejecución de CI sobre este commit documental.
- `main` no se modificó ni se adelantó. No se creó PR, tag ni Release.

## 2. Recomendaciones prioritarias

### P1 — Proteger `main` con un ruleset

Crear un ruleset dirigido a `main`:

1. Exigir Pull Request antes de integrar.
2. Exigir que pasen los checks de CI de compilación/lint/JVM, API 26 y API 37.
3. Bloquear force-push y eliminación de la rama.
4. Preferir squash merge para mantener una historia de integración legible.
5. No exigir aprobación de una segunda persona si el repositorio continúa con un único mantenedor; esa regla podría bloquear el flujo en solitario.

Los checks exactos se deben seleccionar después de una ejecución CI completamente exitosa, usando los nombres que GitHub muestre para los jobs. La publicación del APK interno no necesita ser una condición para integrar código si los tres jobs de validación ya pasan.

Referencia: [reglas disponibles para rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets).

### P1 — Dependabot semanal para Gradle y GitHub Actions

Ya añadí `.github/dependabot.yml` a esta rama de desarrollo, con dos ecosistemas:

- `gradle`, para dependencias Android/Kotlin y el catálogo de versiones.
- `github-actions`, para mantener actualizadas las acciones de CI.

La configuración usa frecuencia semanal (lunes, 14:00, hora de Panamá), agrupa actualizaciones menores/parche y limita a tres PR abiertos por ecosistema. Las actualizaciones mayores quedan separadas para revisión cuidadosa. **Todavía no está activa**: Dependabot necesita que el archivo llegue a la rama predeterminada `main`; no lo he integrado ni cambiado la rama predeterminada.

Referencia: [configurar actualizaciones de versiones](https://docs.github.com/es/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configure-version-updates) y [archivo dependabot.yml](https://docs.github.com/en/code-security/concepts/supply-chain-security/about-the-dependabot-yml-file).

### P1 — CodeQL para Kotlin

Prisma es público y puede usar CodeQL en GitHub.com. Para Kotlin, CodeQL no admite el modo `none`: el modo predeterminado seleccionado al detectar Kotlin es `autobuild` (o `manual` si hiciera falta). El runner alojado por GitHub incluye las herramientas habituales; aun así, se debe revisar el primer análisis para confirmar que Gradle detectó correctamente el proyecto y que Kotlin quedó incluido.

Recomendación: habilitar CodeQL Default Setup en Settings → Security & quality cuando el código Android llegue a la rama predeterminada protegida. Revisar alertas y el resumen de lenguajes/build mode; no añadir un segundo workflow avanzado si la configuración predeterminada analiza Kotlin correctamente.

Referencias: [configurar CodeQL Default Setup](https://docs.github.com/en/code-security/how-tos/find-and-fix-code-vulnerabilities/configure-code-scanning/configure-code-scanning) y [tipos de configuración](https://docs.github.com/en/code-security/concepts/code-scanning/setup-types).

### P1 — Secret scanning

GitHub indica que el secret scanning se ejecuta automáticamente y sin coste en repositorios públicos. En repositorios públicos de usuarios también se pueden habilitar alertas para secretos detectados.

Recomendación: el escaneo básico ya se ejecuta gratuitamente en repositorios públicos. Para recibir alertas de secretos en un repositorio público personal, GitHub permite activar Secret Protection desde Settings → Security & quality; la conexión API disponible no permite comprobar ese ajuste ni si la protección de inserción (*push protection*) está habilitada. Revisarlo en la interfaz, sin dar por hecho que las alertas están activadas. Una alerta debe investigarse; nunca se debe resolver ocultando o ignorando un secreto que pueda seguir activo.

La antigua clave de firma de `internalFix2` se considera **comprometida** porque estuvo versionada en el repositorio público. Se retiró del árbol actual en el commit `35e72af494de0b47ab6262b9f30942c8502ce4ee`, y `app/build.gradle.kts` ya no carga un keystore desde el repositorio ni contiene contraseñas de firma. La retirada del archivo no borra las copias de commits antiguos: el historial Git no se reescribe y la clave antigua nunca debe volver a utilizarse.

La firma estable de `internalFix2Debug` ahora procede exclusivamente de GitHub Actions:
- Secreto `PRISMA_INTERNALFIX2_KEYSTORE_BASE64`: contenido Base64 de un almacén PKCS12 nuevo.
- Secreto `PRISMA_INTERNALFIX2_KEY_PASSWORD`: contraseña del almacén y de la clave.
- Variable `PRISMA_INTERNALFIX2_CERT_SHA256`: huella SHA-256 del certificado nuevo, hexadecimal, sin dos puntos.
- Alias PKCS12 esperado: `prisma-internalfix2`.

El workflow comprueba que la huella del certificado coincide antes de compilar/publicar y utiliza el mismo certificado en APK y AndroidTest. Si los tres valores faltan, la CI puede ejecutar las pruebas con la firma debug efímera del runner, pero **no genera ni publica un APK interno estable**. Si la configuración está incompleta o la huella no coincide, el trabajo falla de forma cerrada. La rotación solo se considera completada cuando se configura una clave nueva (distinta de la comprometida) en Settings → Secrets and variables → Actions y una ejecución completa de Android CI valida y publica el APK con la nueva huella.

Esta clave de QA no es una clave de producción. La firma de producción debe residir aparte, en secretos protegidos de un GitHub Environment.

Referencia: [habilitar secret scanning](https://docs.github.com/en/code-security/how-tos/secure-your-secrets/detect-secret-leaks/enable-secret-scanning).

### P2 — Dependency Review en Pull Requests

Añadir `dependency-review-action` al flujo de PR cuando se active la integración regular hacia `main`. Puede detectar versiones vulnerables introducidas por el cambio de dependencias y fallar el check para impedir que se integre una dependencia vulnerable.

Como Prisma es público, esta capacidad está disponible para el repositorio. Conviene ejecutarla solo en PR y no añadir trabajo innecesario a cada push de desarrollo.

Referencia: [Dependency Review](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-review).

### P2 — Actualizar las acciones de artefactos a Node 24

La revisión detectó el uso de versiones antiguas de `upload-artifact` y `download-artifact`. GitHub retiró Node 20 de Actions el 23 de septiembre de 2026.

En la rama de desarrollo ya se migró y validó la cadena de artefactos: `upload-artifact` v7.0.2 (`cf430e030ddbb5b0abf93d22962f4752f3646cd9`) y `download-artifact` v8.0.2 (`9000827ccba6bdab643e8b6fd33ac0654aef8333`), fijadas por SHA inmutable. La CI #176 completó la matriz API 26/API 37 y la publicación interna con esas versiones.

Las acciones del workflow ya están fijadas a SHA completos e inmutables, con comentarios de versión legibles: `checkout@v6`, `setup-java@v5`, `setup-android@v4`, `setup-gradle@v6.4.1`, `android-emulator-runner@v2.38.0`, `upload-artifact@v7.0.2` y `download-artifact@v8.0.2`. Se verificaron los runtimes de las acciones JavaScript: todas usan Node 24; `setup-gradle` es compuesta. Dependabot podrá proponer la actualización de los SHA cuando se integre su configuración en `main`.

La versión 8 de `download-artifact` endurece la comprobación de digest y hace fallar por defecto una discrepancia, una mejora útil para la cadena de suministro.

Referencias: [retirada de Node 20](https://github.blog/changelog/2026-09-23-node-20-is-no-longer-available-in-github-actions/), [versiones de upload-artifact](https://github.com/actions/upload-artifact/releases) y [versiones de download-artifact](https://github.com/actions/download-artifact/releases).

### P2 — Releases, firma y procedencia del APK

Cuando se supere la puerta de producto y exista autorización expresa, utilizar GitHub Releases como punto de distribución:

- Tag SemVer `vMAJOR.MINOR.PATCH` con sufijo alpha/beta/rc cuando corresponda; nunca usar IDs de hitos del roadmap.
- APK firmado con la clave de producción.
- Changelog en español.
- Archivo SHA-256 para verificar la descarga.
- Notas que distingan claramente producción de compilaciones internas.

Para publicar producción, crear un job aislado con un GitHub Environment protegido y secretos de firma; no reutilizar el keystore QA. Añadir Artifact Attestations en el job de publicación para vincular el APK con el repositorio, commit y workflow que lo generó. En planes Free/Pro/Team, las attestations están disponibles para repositorios públicos.

Referencias: [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases) y [Artifact Attestations](https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/use-artifact-attestations).

### P1 — Flujo de trabajo desde Android

GitHub ofrece dos opciones complementarias, sin necesidad de un ordenador local:

- **GitHub Mobile:** aplicación oficial para Android. Permite revisar notificaciones, Issues y Pull Requests, buscar código del repositorio, revisar cambios y editar archivos dentro de un Pull Request. Es útil para seguimiento y revisión, no para ejecutar Gradle, compilar ni lanzar emuladores.
- **`github.dev`:** abre el editor VS Code en el navegador (pulsando el punto `.` desde el repositorio, o cambiando `github.com` por `github.dev`). Permite buscar, editar y confirmar cambios ligeros directamente en la rama. Funciona en móviles, aunque la pantalla pequeña limita la comodidad. No incluye terminal, compilación ni depuración.

Para Prisma, se recomienda GitHub Mobile para seguimiento y revisión; `github.dev` para cambios pequeños de documentación o código. Los cambios grandes de Kotlin/Gradle deben validarse en Actions. Si se necesita un terminal interactivo, Codespaces es una opción distinta y con cuotas de uso, descrita a continuación.

Referencias: [GitHub Mobile](https://docs.github.com/en/get-started/using-github/github-mobile), [VS Code para la Web y soporte móvil](https://code.visualstudio.com/docs/remote/vscode-web), [editor github.dev](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor).

### P2 — Entorno de edición cloud para trabajar desde móvil

GitHub Codespaces permite abrir un entorno de desarrollo en la nube desde el navegador y continuar desde distintos dispositivos. Para cambios ligeros, `github.dev` ofrece VS Code en el navegador sin iniciar una máquina de Codespaces; admite móviles, aunque la pantalla reducida limita la comodidad.

Antes de crear un Codespace hay que revisar la cuota y el presupuesto de la cuenta personal. La documentación vigente muestra estas cuotas mensuales incluidas:

| Plan personal | Cómputo incluido (core-hours) | Almacenamiento incluido |
|---|---:|---:|
| GitHub Free | 120 horas de cómputo | 15 GB-mes |
| GitHub Pro | 180 horas de cómputo | 20 GB-mes |

El consumo de cómputo se multiplica por el tamaño de máquina: una máquina de más núcleos consume más cuota por hora real. El excedente se factura si hay un método de pago y presupuesto habilitado; si no hay método de pago, el uso se bloquea al agotar la cuota. Las cuentas de organización/empresa no reciben esta cuota personal gratuita.

**Aplicación a Prisma:** podría ser útil para navegar y editar Kotlin/Gradle sin un ordenador local, y ejecutar comprobaciones JVM cuando exista una imagen de desarrollo Android configurada. No sustituye la CI instrumentada de GitHub Actions (emuladores API 26 y API 37). Por ahora se recomienda usar `github.dev` para cambios pequeños y dejar Codespaces como opción voluntaria; no crear ni mantener máquinas encendidas sin revisar primero la facturación y los límites.

Referencias: [GitHub Codespaces y facturación](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces), [uso incluido y límites](https://docs.github.com/en/codespaces/troubleshooting/troubleshooting-included-usage), [VS Code para la Web y soporte móvil](https://code.visualstudio.com/docs/remote/vscode-web), [Codespaces desde cualquier dispositivo](https://github.com/features/codespaces).

## 3. Funciones que no recomiendo activar todavía

- **GitHub Pages:** Prisma es una aplicación Android; no existe ahora una necesidad clara de web pública.
- **Discussions:** no hay comunidad ni consultas de usuarios que justifiquen moderación adicional.
- **Wiki:** ya existe documentación versionada en `docs/`; duplicarla generaría dos fuentes de verdad.
- **GitHub Packages:** no aporta valor para distribuir el APK a usuarios finales; Releases cubre ese caso.
- **Projects como requisito:** el roadmap ya registra fases, hitos y estados. Puede usarse más adelante para tareas concretas, pero no debe convertirse en una obligación de actualizar tarjetas en cada cambio.

## 4. Orden de adopción propuesto

| Orden | Acción | Momento |
|---|---|---|
| 1 | Cerrar CI Android y conservar cobertura API 26/API 37 | Durante Fase 2 |
| 2 | Migrar acciones de artefactos a Node 24 | Tras estabilizar la ejecución actual |
| 3 | Añadir Dependabot semanal para Gradle y GitHub Actions | Al preparar la integración de la rama de desarrollo |
| 4 | Proteger `main` con ruleset y checks obligatorios | Antes de la primera integración mediante PR |
| 5 | Habilitar CodeQL y revisar secret scanning | Con el código consolidado en la rama predeterminada |
| 6 | Dependency Review en PR | Al adoptar PR como flujo habitual |
| 7 | Environment de producción, Releases y attestations | Cuando haya un APK de producción aprobado |

## 5. Criterio de mantenimiento

La meta es que GitHub quite trabajo manual y detecte problemas antes de que lleguen a una versión instalable. No se deben añadir flujos que compitan por los mismos emuladores, repetir validaciones existentes o frenar los incrementos de Prisma. Las funciones de GitHub tampoco autorizan ampliar el alcance de producto ni integrar `main` sin aprobación.


## Verificación de rama y CI #237/#238 — 11 de noviembre de 2026 (hora de Panamá)

- Punta de `feature/fase1-android-foundation` al iniciar este registro: `a0eaad00a43b9b580dfa62ef27cd9a1c16695d3d`. `main` permanecía en `85a40cf7e2b513138e4c6c0559dab5f0845a7383`; la comparación observada antes de esta actualización documental era **364 ahead / 0 behind**. La actualización que sigue a este registro afecta únicamente estos documentos.
- **CI #237** (`43133620126`, SHA `b4603808d136e4cc4d3382f3fd8a30755494b273`) falló en la compilación de AndroidTest porque el import superior `androidx.compose.ui.test.assertDoesNotExist` no existe. La instrumentación API 26/37 no llegó a ejecutarse; el build/lint/JVM pasó y la publicación interna fue omitida.
- El commit `a0eaad00a43b9b580dfa62ef27cd9a1c16695d3d` eliminó solo el import inválido del test. **CI #238** (`43134560744`) probó ese SHA y terminó `completed/success` en los cuatro jobs: build/lint/JVM/APK candidato, API 26, API 37 y publicación APK interno.
- Evidencia #238: JVM 17/17; API 26 56 casos, 0 fallos/errores y 1 omisión esperada TLS 1.3; API 37 56/56; `MovieDetailScreenTest` 7/7 y `MovieRepositoryRoomTest` 17/17 en ambas APIs; ventana amplia API 37 2/2 (1280×800 px, 160 dpi). La nueva prueba de persistencia de búsqueda al volver desde ficha pasó en ambos emuladores.
- Backup cloud API 26/37: Prisma recibió `Backup is not allowed` y los cinco marcadores sintéticos excluidos no reaparecieron tras reinstalar. D2D API 37: el probe auxiliar restauró su marcador; Prisma no tenía datos elegibles y no se generó payload, así que su ciclo de restauración D2D quedó `NOT RUN`. No presentarlo como migración entre teléfonos.
- APK interno publicado: ID `13906837792`, variante `internalFix2Debug`, applicationId `dev.elfast.prisma.internalfix2`; [artefacto](https://github.com/ElFast-dev/Prisma/actions/runs/43134560744/artifacts/13906837792). SHA-256 verificado del APK: `b7fb59469bf042b8c92ba7385150948695c457dcb2e0d8a8297eb04f28990b95`. No es Release de producción. No se instaló en el Galaxy A03 ni se hizo una prueba física de modo avión.
- `main` no se modificó; no se creó PR, merge, tag ni Release. El workflow ignora `docs/**` y `**/*.md` en eventos `push`, así que esta sincronización documental no inicia otra matriz: CI #238 es la validación del código exacto indicado, no de un nuevo cambio de aplicación.
- **F2-H2 continúa EN DESARROLLO**, pendiente de aceptación expresa del propietario. **F2-H3 permanece APLAZADO.** No se adelantan fases posteriores.


## Verificación de rama y CI #239 — 11 de noviembre de 2026 (hora de Panamá)

- Código probado: `70af72c9d08957c3b1447d7a4c16ac597089f80a`; el único archivo cambiado fue `app/src/androidTest/java/dev/elfast/prisma/MovieDetailScreenTest.kt`, con seis aserciones de aceptación de ficha local. No cambió lógica de producción.
- [Android CI #239](https://github.com/ElFast-dev/Prisma/actions/runs/43136320397) terminó `completed/success` en los cuatro jobs: build/lint/JVM/APK candidato, API 37, API 26 y publicación del APK interno.
- Evidencia: JVM 17/17; API 26 56 casos, 0 fallos/errores y 1 omisión TLS 1.3; API 37 56/56; `MovieDetailScreenTest` 7/7 y `MovieRepositoryRoomTest` 17/17 en ambas APIs; ventana amplia API 37 2/2 (1280×800 px, 160 dpi).
- Las nuevas aserciones confirman el año guardado y la ausencia de sinopsis, duración, géneros, país de producción y calificación no disponible en F2-H2. Pasaron en API 26 y API 37.
- Backup cloud API 26/37: Prisma recibió `Backup is not allowed` y los cinco marcadores sintéticos excluidos no reaparecieron tras reinstalar. D2D API 37: el probe auxiliar restauró su marcador; Prisma no tenía datos elegibles y no se generó payload, así que su restauración D2D quedó `NOT RUN`.
- APK interno publicado: ID `13907977401`, variante `internalFix2Debug`, applicationId `dev.elfast.prisma.internalfix2`; [artefacto](https://github.com/ElFast-dev/Prisma/actions/runs/43136320397/artifacts/13907977401). SHA-256 verificado del APK: `b7fb59469bf042b8c92ba7385150948695c457dcb2e0d8a8297eb04f28990b95`. No es Release de producción; no se instaló en el Galaxy A03.
- `main` sigue sin modificarse; no se creó PR, merge, tag ni Release. El workflow ignora `docs/**` y `**/*.md` en eventos `push`; esta sincronización documental no inicia otra matriz.
- **F2-H2 continúa EN DESARROLLO**, pendiente de aceptación expresa del propietario. **F2-H3 permanece APLAZADO.**


## Verificación de rama y CI #240 — 11 de noviembre de 2026 (hora de Panamá)

- Código probado: `af8201553203562da57f3f618a12694f9b50bced`; un único archivo de test instrumentado recibió una prueba de retención de scroll de Historial y Pendientes después de abrir la ficha. Se usaron 24 películas y un destino en el índice 18. No se modificó lógica de producción.
- [Android CI #240](https://github.com/ElFast-dev/Prisma/actions/runs/43138558639) terminó `completed/success` en los cuatro jobs: build/lint/JVM/APK candidato, API 37, API 26 y publicación del APK interno.
- Evidencia: JVM 17/17; API 26 57 casos, 0 fallos/errores y 1 omisión TLS 1.3; API 37 57/57; `MovieDetailScreenTest` 8/8 y `MovieRepositoryRoomTest` 17/17 en ambas APIs; ventana amplia API 37 2/2. La prueba de scroll pasó en ambos emuladores.
- Backup cloud API 26/37: Prisma recibió `Backup is not allowed` y los marcadores sintéticos excluidos no reaparecieron. D2D API 37: el probe auxiliar restauró su marcador, pero Prisma no generó payload elegible; restauración D2D de Prisma `NOT RUN`.
- APK interno publicado: ID `13908193715`, variante `internalFix2Debug`, applicationId `dev.elfast.prisma.internalfix2`; [artefacto](https://github.com/ElFast-dev/Prisma/actions/runs/43138558639/artifacts/13908193715). SHA-256 verificado del APK: `b7fb59469bf042b8c92ba7385150948695c457dcb2e0d8a8297eb04f28990b95`. No es Release de producción; no se instaló en el Galaxy A03.
- `main` no se modificó; no se creó PR, merge, tag ni Release. El workflow ignora `docs/**` y `**/*.md` en eventos `push`; esta sincronización documental no inicia otra matriz.
- **F2-H2 continúa EN DESARROLLO**, pendiente de aceptación expresa del propietario. **F2-H3 permanece APLAZADO.**


## Cierre de F2-H2 — aceptación del propietario — 11 de noviembre de 2026 (hora de Panamá)

- El propietario aprobó expresamente el cierre de F2-H2 tras revisar los criterios funcionales y la evidencia de CI #240. El hito queda **CERRADO**; la Fase 2 permanece **EN CURSO**.
- Referencia de aceptación: [Android CI #240](https://github.com/ElFast-dev/Prisma/actions/runs/43138558639), código af8201553203562da57f3f618a12694f9b50bced, con cuatro trabajos en SUCCESS: JVM 17/17; API 26, 57 pruebas y una omisión esperada TLS 1.3; API 37, 57/57; MovieDetailScreenTest 8/8 y MovieRepositoryRoomTest 17/17 en ambas APIs; ventana amplia 2/2.
- Los criterios aceptados incluyen ficha local desde ambas listas, registros de visionado independientes, fecha/hora opcional, retirada de Pendientes con confirmación y conservación de búsqueda/scroll al regresar.
- **Límites:** no se instaló el APK en el Galaxy A03; tampoco hubo restauración D2D de datos reales de Prisma, porque no se generó payload elegible. No se afirma que esas pruebas se hayan realizado.
- **F2-H3 permanece APLAZADO:** este cierre no activa calificaciones, Ocultos/restauración ni listas manuales básicas. La Fase 3 tampoco se inicia. No hubo cambios de código de producción, main, PR, merge, tag ni Release; el commit de este cierre es documental.


## Activación de F2-H3 y primera validación técnica — 11 de noviembre de 2026 (hora de Panamá)

- **Autorización:** el propietario activó expresamente F2-H3 tras aceptar el cierre de F2-H2. El trabajo no visual dentro del alcance se ejecuta sin aprobaciones intermedias; cualquier cambio de apariencia, diseño de pantallas o controles visuales requiere aprobación previa.
- **Cambios de datos:** Room 1→2 con migración conservadora; la tabla de películas incorpora calificación provisional, y se crean relaciones de Ocultos y listas personalizadas. Las películas ocultas dejan de aparecer en Descubrir, Historial, Pendientes y contenido visible de listas, sin borrar las asociaciones; restaurar elimina solo la marca de ocultación. Las calificaciones de visionado se vinculan por ID; la provisional se transfiere al primer visionado. Las listas admiten CRUD básico y relaciones independientes por película/lista.
- **CI #245 — SUCCESS completo:** [run 43144123522](https://github.com/ElFast-dev/Prisma/actions/runs/43144123522), SHA de código 76d8b939f8faff37298fcaebe1399454ea71180e. Los cuatro jobs finalizaron correctamente. API 26: 68 pruebas, cero fallos/errores y una omisión TLS 1.3 esperada; API 37: 68/68. Pruebas de MovieLibraryFeaturesRoomTest y PrismaDatabaseMigrationTest aprobadas en ambas APIs. Ventana amplia 2/2.
- **BackupManager CI #250:** el backup cloud de Prisma fue rechazado (`Backup is not allowed`) en API 26 y 37; los marcadores de prueba excluidos no regresaron tras reinstalar. En API 37, la inicialización del transporte D2D devolvió `-1000`; el ciclo D2D de Prisma no se ejecutó y queda **INCONCLUSO**. No se afirma una restauración D2D real ni migración entre teléfonos.
- APK interno CI #245: artefacto ID `13910878729`. APK interno CI #250: [artefacto ID `13911807074`](https://github.com/ElFast-dev/Prisma/actions/runs/43145971407/artifacts/13911807074), variante `internalFix2Debug`; no son Releases de producción y ninguno se instaló en Galaxy A03.
- **CI #250 — SUCCESS completo:** [run 43145971407](https://github.com/ElFast-dev/Prisma/actions/runs/43145971407), SHA de código `e02e11ca9820ddfb22f76dd23a5eee1cea8d804a`. Los cuatro jobs finalizaron en `success`: build/lint/JVM 20/20; API 26 69 pruebas (una omisión TLS 1.3 esperada); API 37 69/69; publicación interna. Ventana amplia API 37: 2/2 (Obsidiana y Cuarzo). La migración v1→v2 y las 11 pruebas `MovieLibraryFeaturesRoomTest` aprobaron en ambas APIs.
- main permanece en 85a40cf7e2b513138e4c6c0559dab5f0845a7383. No se ha creado PR, merge, tag ni Release. F2-H2 sigue cerrado; F2-H3 está en desarrollo; Fase 3 no comienza.
- **Pantallas visuales pendientes:** no se tocaron los componentes visuales. La implementación visual de Ocultos, Gestionar listas y puntuación espera aprobación de concepto en Obsidiana y Cuarzo.


### Estado de remediación de la firma interna — 12 de noviembre de 2026

- La clave antigua fue retirada del árbol de trabajo, pero permanece accesible en el historial público previo; no se ha reescrito el historial Git.
- Los secretos/variable de GitHub Actions para la clave nueva todavía deben ser configurados por el propietario. Hasta que esto ocurra, no existe un APK interno estable publicable desde CI.
- El workflow transmite la huella verificada al job de publicación mediante outputs explícitos. El verificador de emuladores compara contra la huella configurada; sin clave externa solo comprueba que APK y AndroidTest compartan la firma debug efímera.
- No usar los APK internos antiguos firmados con la clave expuesta para datos sensibles. Un APK firmado con la nueva clave no podrá actualizar normalmente una instalación firmada con la clave anterior. La desinstalación del anterior borra sus datos locales; no desinstalarlo ni intentar actualizarlo hasta que los datos estén exportados o sean prescindibles.
- La nueva clave debe generarse fuera del repositorio, guardarse de forma segura y nunca enviarse por chat, issues, commits ni artefactos públicos.


### Configurar la nueva clave de QA en GitHub Actions

Este procedimiento se ejecuta en el equipo del propietario; el archivo PKCS12 y su contraseña no se suben al repositorio ni se comparten por chat.

1. Con un JDK instalado, generar un almacén nuevo (no reutilizar el keystore antiguo):
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore prisma-internalfix2-new.p12 -alias prisma-internalfix2 -keyalg RSA -keysize 3072 -validity 10000 -dname "CN=Prisma Internal QA"
   ```
   Usar una contraseña larga y única. Cuando `keytool` pregunte la contraseña de la clave del alias, pulsar Enter para usar la misma contraseña del almacén; CI necesita que ambas coincidan.
2. Obtener la huella del certificado:
   ```bash
   keytool -list -v -storetype PKCS12 -keystore prisma-internalfix2-new.p12 -alias prisma-internalfix2
   ```
   Copiar el valor `SHA256` sin los dos puntos. Debe ser distinto de la huella comprometida `62aba12864def63a02f516dcacbb7fc6fdb5ad9e802bd93713dbf498ffa4a733`.
3. Obtener el Base64 del archivo PKCS12, sin saltos de línea:
   - PowerShell: `[Convert]::ToBase64String([IO.File]::ReadAllBytes("prisma-internalfix2-new.p12"))`
   - Linux/macOS: `base64 < prisma-internalfix2-new.p12 | tr -d '\r\n'`
4. En GitHub → Settings → Secrets and variables → Actions, crear los secretos de repositorio `PRISMA_INTERNALFIX2_KEYSTORE_BASE64` (el Base64 completo) y `PRISMA_INTERNALFIX2_KEY_PASSWORD` (la contraseña elegida). En la pestaña **Variables**, crear `PRISMA_INTERNALFIX2_CERT_SHA256` con la huella del paso 2, sin dos puntos.
5. Abrir Actions → Android CI, seleccionar **Run workflow** y ejecutar en `feature/fase1-android-foundation`. La ejecución debe verificar la huella, usar el mismo certificado en APK y AndroidTest, superar todos los jobs y publicar el artefacto interno validado.

No borrar ni desinstalar ninguna instalación anterior para «probar» la rotación. Una aplicación instalada con la clave antigua no acepta una actualización firmada con la nueva; desinstalarla elimina sus datos locales. Esperar a tener una exportación verificada o confirmar que esos datos son prescindibles. La exclusión BackupManager vigente no ofrece una vía de recuperación para esos datos.

### Resultado de verificación durante la rotación — CI #288

La CI #288 terminó correctamente con la configuración transitoria sin secretos: build/lint/JVM success; API 26 con 72 pruebas (una omisión esperada de TLS 1.3 en Android 8) y API 37 con 72 pruebas sin omisiones; BackupManager cloud pasó en ambas API. La verificación D2D en API 37 quedó inconclusa por fallo al inicializar el transporte, por lo que no se hizo ciclo de transferencia/restauración de datos Prisma. El job `Publish validated internal APK` se omitió porque no existe aún una nueva clave configurada. Esta ejecución valida la transición del workflow y las pruebas, pero **no completa la rotación ni produce un APK interno estable**.
