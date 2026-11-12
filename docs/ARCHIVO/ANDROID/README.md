# Archivo de la etapa Android

Este directorio conserva documentos de producto, arquitectura y validación de la etapa Android. Se trasladan para no perder decisiones, acuerdos y evidencia al retirar el repositorio anterior.

## Autoridad

El archivo es histórico. No se deben seguir sus instrucciones Android/Kotlin/Compose/Room/DataStore/Keystore/APK ni aplicar sus números de versión de compilación al proyecto web. Las fuentes activas son:

- `AGENTS.md`
- `docs/CONTEXTO_IA.md`
- `docs/PRODUCTO/REQUISITOS.md`
- `docs/ROADMAP.md`
- `docs/TECNICO/ARQUITECTURA.md`
- `docs/TECNICO/ALMACENAMIENTO_Y_SEGURIDAD.md`
- `docs/TECNICO/VERSIONADO.md`
- `docs/DISENO/ESTADO_VISUAL.md`

## Contenido preservado

- Mandato de agentes, contexto de IA y README de la etapa nativa.
- Requisitos completos y roadmap detallado sincronizados desde la última rama de desarrollo Android.
- Diseño técnico, referencias técnicas y operación de GitHub.
- Versionado Android y compilaciones.
- Registro visual Android original y conceptos de pantallas.
- Validación física del Samsung Galaxy A03 como referencia histórica de dispositivo.
- Autorización particular de TMDB (también copiada a la carpeta activa de licencias).
- Los SVG de conceptos de MVP, Historial, Pendientes, ficha e iconografía se trasladaron a `docs/DISENO/` porque siguen siendo referencias válidas para la PWA.

## Ramas anteriores revisadas

Se examinaron `main` y las ramas:

- `fase-1/fundamentos-android`
- `feature/ci121-insets-diagnostic`
- `feature/ci-fast-feedback`
- `feature/fase1-android-foundation`
- `feature/fase1-theme-datastore-tests`

La rama `feature/fase1-android-foundation` contenía la colección visual y documental más completa y se utilizó para sincronizar las últimas aprobaciones disponibles. Las otras ramas aportaban principalmente código, pruebas o diagnósticos específicos de Android; no se copiaron al proyecto PWA.

## Material excluido deliberadamente

No se trasladaron fuentes Kotlin/Compose, configuración Gradle, APK, flujos de CI Android, keystores de prueba ni certificados TLS de instrumentación. No forman parte de la nueva implementación PWA y no deben reutilizarse como secretos, credenciales o código de producto.

El archivo de licencia de Inter sí se conservó. El binario tipográfico se obtendrá del origen oficial cuando se prepare el conjunto de recursos web, verificando hash y licencia; no se reutilizó una copia nativa sin revisar.

## Alcance de la conservación

El archivo preserva requisitos, decisiones y evidencias, no una copia ejecutable de la aplicación Android ni su historial Git completo. El propietario ha decidido abandonar el desarrollo nativo y eliminar el repositorio anterior una vez verificada esta migración documental.
