# Contexto operativo — Prisma Web

**Revisión inicial:** 0.1 · **Fecha:** 12 de noviembre de 2026.

## 1. Dirección del proyecto

Prisma se reconstruye como PWA instalable en Android. El repositorio nuevo es `ElFast-dev/Prisma-Web`, pendiente de cambiar su nombre a `Prisma`. El repositorio nativo anterior se conserva solo para extraer y archivar decisiones útiles hasta completar la migración.

La prioridad es que una IA pueda desarrollar, probar y entregar cambios utilizables en ciclos cortos, sin generar un APK en cada modificación. La PWA no debe fingir que tiene acceso ilimitado al dispositivo: se aprovecharán las APIs web disponibles y se documentarán sus límites.

## 2. Autoridad y aprobaciones

- El propietario decide el producto, alcance, prioridades y puertas de fase.
- La IA recomienda con razones, coste, alternativas y riesgos, pero no convierte propuestas en requisitos.
- Las instrucciones explícitas recientes prevalecen sobre documentos antiguos.
- «Continúa» no aprueba funciones opcionales ni una fase futura.
- No repetir preguntas ya respondidas ni reabrir decisiones cerradas sin evidencia nueva.
- Máximo dos rondas de refinamiento por decisión; después recomendar cerrar, aplazar o registrar el bloqueo.

## 3. Identidad de producto

- Diario cinematográfico personal; películas exclusivamente.
- Historial con visionados independientes, fechas y calificación por visionado.
- Pendientes, Ocultos, restauración y listas personalizadas.
- Descubrimiento con TMDB y caché local de metadatos e imágenes.
- Estadísticas basadas en datos locales.
- Espectro: algoritmo propio, local, explicable y entrenado con señales aprobadas del comportamiento del usuario.
- Temas Obsidiana y Cuarzo con paridad.
- Sin cuenta, red social, backend propio, sincronización automática, anuncios ni telemetría de actividad.
- No enviar historial, puntuaciones, listas, estadísticas ni perfil de Espectro a TMDB.

Los requisitos completos anteriores se conservan en `docs/ARCHIVO/ANDROID/REQUISITOS.md`. Sus decisiones funcionales y visuales continúan siendo referencia cuando no contradigan los documentos web actuales. Las instrucciones específicamente Android/Kotlin/Compose quedan sustituidas por la arquitectura PWA.

## 4. Fuentes de verdad

1. `AGENTS.md`: mandato.
2. `docs/PRODUCTO/REQUISITOS.md`: producto y alcance.
3. `docs/ROADMAP.md`: fases, hitos y criterios.
4. `docs/TECNICO/ARQUITECTURA.md`: estructura técnica PWA.
5. `docs/TECNICO/ALMACENAMIENTO_Y_SEGURIDAD.md`: datos, seguridad, backup.
6. `docs/TECNICO/VERSIONADO.md`: reglas de versiones y Releases.
7. `docs/DISENO/ESTADO_VISUAL.md`: decisiones visuales heredadas y adaptación web.
8. `docs/LICENCIAS/TMDB_PRISMA.md`: transcripción de autorización particular proporcionada por el propietario.
9. `docs/MIGRACION_REPOSITORIOS.md`: traslado y cambio de nombre.
10. `docs/DECISIONES/REGISTRO.md`: decisiones del propietario y propuestas técnicas.
11. `docs/TECNICO/MODELO_DE_DATOS.md`: entidades e invariantes.
12. `docs/TECNICO/PRUEBAS_Y_CALIDAD.md`: estrategia de validación.
13. `docs/TECNICO/ALOJAMIENTO_Y_ORIGEN.md`: hosting y origen canónico.
14. `docs/REFERENCIAS_TECNICAS.md`: documentación oficial consultada.

El material en `docs/ARCHIVO/ANDROID/` es histórico y de consulta; no prevalece sobre esta guía, los requisitos actuales ni las decisiones más recientes del propietario.

## 5. Regla de Fase 0

No comenzar la implementación de la aplicación hasta que estén resueltos y aprobados:
- alcance del MVP y de 1.0.0;
- arquitectura de frontend, persistencia y límites del navegador;
- origen HTTPS canónico y alojamiento;
- almacenamiento persistente, cuotas, copias y recuperación;
- seguridad de TMDB y del archivo cifrado;
- actualizaciones controladas de PWA y migraciones;
- versionado, hitos y evidencia de aceptación;
- diseño visual adaptado a web;
- estructura de repositorio y estrategia de pruebas.

La creación y edición de estos documentos sí forma parte de Fase 0. Un scaffold de React o una pantalla de prueba antes de cerrar los cimientos no.

## 6. Criterio de avance

Informar por capacidades que el propietario pueda completar, no por archivos creados, commits, líneas de código, pruebas o pipelines. No declarar un hito funcional hasta que el recorrido se pueda completar en el teléfono, persistir, cerrar, reabrir y verificar en ambos temas y sin conexión cuando corresponda.

## 7. Privacidad y datos

Los datos personales residen localmente. Las solicitudes a TMDB solo transmiten la consulta o identificador cinematográfico solicitado, nunca el historial ni el perfil personal. La PWA se distribuirá por HTTPS y el origen de producción debe permanecer estable una vez que se guarden datos reales. Las copias exportadas por Prisma deben estar cifradas y restaurarse con validación previa sin sobrescribir datos ante errores.

## 8. Versionado operativo

La versión pública responde a hitos funcionales documentados. Las modificaciones internas se identifican por SHA de Git y artefacto de CI, no por versiones de producto. El detalle y el mapa de hitos están en `docs/TECNICO/VERSIONADO.md`.
