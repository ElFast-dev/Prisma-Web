# Política de versionado y Releases — Prisma

**Estado:** propuesta para aprobación de Fase 0.  
**Principio:** una versión cuenta el avance real del producto, no la actividad del repositorio.

## 1. Tres identificadores distintos

1. **Versión de producto:** SemVer visible para el usuario, por ejemplo `0.1.0`. Solo cambia al cumplir las reglas de este documento.
2. **Build interno:** identifica un artefacto de una ejecución concreta de CI; usar SHA corto del commit y número de ejecución como metadatos de diagnóstico. No se presenta como una nueva versión de Prisma.
3. **Commit Git:** registra un cambio de código o documentación. Un commit no equivale a una Release.

No asignar una versión nueva por cada commit, merge, prueba, despliegue, corrección documental o ejecución de CI.

## 2. Significado de MAJOR.MINOR.PATCH

Antes de 1.0.0:
- `0.MINOR.0`: hito de producto terminado, verificable, aceptado y utilizable. Solo aumenta MINOR al añadir una capacidad completa o grupo coherente de capacidades aprobado.
- `0.MINOR.PATCH`: corrección real de una versión publicada, sin introducir una capacidad nueva. PATCH incrementa solo cuando se publica la corrección.
- Documentación, refactor, cambios de CI, dependencia interna o pruebas sin efecto visible no cambian la versión de producto.

Desde 1.0.0:
- MAJOR: cambio incompatible de comportamiento o formato de datos que requiera migración explícita.
- MINOR: nueva capacidad compatible y aprobada.
- PATCH: corrección compatible.

## 3. Mapa propuesto de hitos

Este mapa es una propuesta semántica inicial, no una orden de publicar todos los números. Los hitos se pueden reordenar o dividir antes de aprobar el roadmap; nunca se asigna un número solo para llenar la secuencia.

| Versión objetivo | Nombre del hito | Qué debe poder hacer el usuario |
|---|---|---|
| `0.1.0` | Diario local utilizable | Crear películas manualmente; Pendientes; Historial; varios visionados con fecha y calificación; Ocultos/restauración; listas básicas; búsqueda local; offline; exportar y restaurar copia cifrada. |
| `0.2.0` | Catálogo TMDB | Configurar token; buscar películas; resolver coincidencias ambiguas; guardar ficha/metadatos; caché local de imágenes; fallback offline. Cierra el alcance funcional del MVP si todos los criterios pasan. |
| `0.3.0` | Colecciones avanzadas | Colores, collages, fijación, orden manual, filtros y contadores avanzados aprobados. |
| `0.4.0` | Experiencia cinematográfica completa | Feed y filtros avanzados, ficha ampliada, créditos, tráileres, relacionadas, colecciones y disponibilidad cuando existan fuentes válidas. |
| `0.5.0` | Estadísticas | Estadísticas locales completas, explicaciones sustentadas y visualizaciones verificables. |
| `0.6.0` | Espectro | Aprendizaje local, afinidad, recomendaciones explicables y controles aprobados; sin enviar perfil personal. |
| `0.7.0` | Experiencia de versiones | Changelog e historial visible y actualización PWA controlada, sin APK. |
| `1.0.0` | Prisma completa | Todo el alcance aprobado para 1.0.0 terminado, protegido, migrable, accesible, probado en teléfono y aceptado por el propietario. |

Los números intermedios no son obligaciones ni metas temporales. Si el alcance se completa con menos hitos, no se crean versiones vacías. Si un hito resulta demasiado grande, puede dividirse solo antes de su implementación y con significado visible claro.

## 4. Reglas para crear una Release

Una Release `vX.Y.Z` solo se publica cuando:
- existe una capacidad o corrección correspondiente al número;
- el recorrido está conectado de extremo a extremo;
- se probó en Chrome Android en teléfono real;
- se verificaron persistencia, reapertura y offline cuando corresponda;
- ambos temas Obsidiana/Cuarzo mantienen paridad;
- no hay P0/P1 abiertos;
- las migraciones y copias/restauraciones aplicables están verificadas;
- el changelog en español describe lo que cambió para el usuario y enumera límites conocidos.

No crear tags de versión para scaffolding, fundamentos documentales o builds que no sean usables.

## 5. Pruebas previas y candidatos

Los builds de prueba se identifican con SHA y CI. Si hace falta un candidato de Release, usar un sufijo `-alpha.N` o `-rc.N` asociado a la misma versión objetivo; N solo cuenta iteraciones de candidatos y no representa progreso del producto. No publicar candidatos como versiones estables.

## 6. Changelog obligatorio

Cada Release contiene:
- Versión y fecha.
- Capacidades nuevas que el usuario puede completar.
- Correcciones.
- Cambios de datos/migraciones y compatibilidad de copias.
- Pruebas realizadas y dispositivos/navegadores realmente probados.
- Riesgos o limitaciones conocidas.
- Instrucciones de actualización y recuperación si corresponde.

Si no hay cambio visible, no hay Release nueva. La numeración debe poder explicarse siempre con una frase: «Esta versión existe porque ahora el usuario puede…».

## 7. 1.0.0

`1.0.0` no es un número por antigüedad. Se reserva hasta completar y aceptar el alcance completo de la sección 1.0 de requisitos: MVP, experiencia cinematográfica, Descubrir avanzado, gestión avanzada de listas, estadísticas, Espectro, actualizaciones, privacidad, seguridad, rendimiento, accesibilidad y recuperación. El propietario aprueba el cierre.
