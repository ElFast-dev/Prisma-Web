# Política de versionado y Releases — Prisma

**Estado:** propuesta para aprobación de Fase 0.  
**Principio:** una versión cuenta el avance real del producto, no la actividad del repositorio.

## 1. Tres identificadores separados

| Identificador | Qué describe | Ejemplo | ¿Es versión de producto? |
|---|---|---|---|
| Hito de desarrollo | Trabajo planificado dentro del roadmap | F2-H1 | No |
| Build técnico | Artefacto/preview exacto de una ejecución | CI #84 · SHA `a1b2c3d` | No |
| Versión pública | Capacidad de Prisma terminada, verificada y aceptada | `0.1.0` | Sí |

Un commit, una CI verde, una preview, un cambio documental o una pantalla aislada no son una versión de Prisma. No aumentar números porque haya pasado un día, se haya creado un archivo o se haya completado una fase interna.

## 2. Reglas SemVer

Se aplica SemVer 2.0.0:

- **MAJOR:** desde 1.0.0, cambios incompatibles en el contrato del producto, datos o copias que requieran migración explícita.
- **MINOR:** una capacidad completa, visible y compatible con las funciones anteriores.
- **PATCH:** una corrección real de una versión publicada, sin añadir capacidad nueva.

Antes de 1.0.0 se mantiene MAJOR en cero:
- `0.MINOR.0` representa una entrega de producto completa y aceptada.
- `0.MINOR.PATCH` representa una corrección publicada de esa entrega.
- Las preversiones usan `-alpha.N`, `-beta.N` o `-rc.N`. El número N identifica iteraciones de candidatos, no progreso funcional.
- Los cambios internos, pruebas, refactors, documentación y CI no incrementan SemVer.

No se publica un tag ni una Release solo para llenar un hueco de numeración.

## 3. Identificadores de desarrollo

El roadmap utiliza IDs que no se confunden con SemVer:
- `F0-H1`: migración y autoridad documental.
- `F0-H2`: propósito, alcance, MVP y decisiones visuales.
- `F0-H3`: arquitectura, modelo de datos, almacenamiento y seguridad.
- `F0-H4`: origen, alojamiento, actualizaciones, CI y mantenimiento.
- `F0-H5`: versionado, aceptación y preparación del inicio de implementación.
- `F1-H1`: shell PWA instalable.
- `F1-H2`: instalación/offline, temas, diagnósticos de almacenamiento y actualización controlada.
- Las fases funcionales posteriores reciben hitos F2-Hn, F3-Hn, etc.

Los IDs se crean en el roadmap cuando el alcance y sus criterios están definidos. No se convierten en números de versión pública.

## 4. Mapa propuesto de versiones de producto

Los números son objetivos semánticos sujetos a aprobación; no obligan a publicar todas las versiones. Cada uno existe solo si la capacidad descrita está terminada y supera la aceptación.

| Versión | Qué representa | Puerta de salida |
|---|---|---|
| `0.1.0-alpha.1` | Primera preversión realmente utilizable del diario local | Alta manual, Pendientes, Historial, visionados repetidos, fechas y calificaciones, Ocultos/restauración, listas básicas, búsqueda local, modo avión y copia cifrada verificable. Debe ser una experiencia conectada de extremo a extremo, no un prototipo. |
| `0.1.0` | Primer MVP estable de Prisma | Todo el alcance del MVP, incluido TMDB esencial, selección supervisada, caché local, fallback offline, copias cifradas y restauración, ambos temas y aceptación completa de requisitos. |
| `0.2.0` | Organización cinematográfica avanzada | Listas avanzadas y organización adicional aprobada, completamente operativas. |
| `0.3.0` | Experiencia cinematográfica completa | Descubrir avanzado, ficha ampliada, créditos, tráileres, colecciones, películas relacionadas y disponibilidad cuando existan datos válidos. |
| `0.4.0` | Estadísticas | Estadísticas locales completas, reproducibles y explicadas con evidencia. |
| `0.5.0` | Espectro | Aprendizaje local, recomendaciones explicables, confianza/muestra suficiente y modos aprobados. |
| `0.6.0` | Experiencia de versiones | Historial/changelog y actualización PWA controlada, sin APK. |
| `1.0.0` | Prisma completa | Todo el alcance aprobado de 1.0.0 terminado, migrable, protegido, accesible, probado y aceptado por el propietario. |

Si el primer diario local no resulta útil o no es seguro para guardar datos reales, no se publica `0.1.0-alpha.1`. Si dos capacidades pueden entregarse juntas y son coherentes, no se crea una versión intermedia solo por separado. Si surge una capacidad no prevista, se registra primero y se decide qué versión semántica le corresponde.

## 5. Builds y previews

- Las previews de Cloudflare y los artefactos de CI se identifican por rama, run y SHA del commit.
- Etiqueta recomendada: `PRISMA-DEV · CI #<run> · <sha7>`.
- El build informa el commit exacto, fecha UTC, rama y entorno; no finge tener una versión pública.
- La carcasa PWA, los tests, cambios documentales y previews no reciben una versión SemVer.
- No instalar ni usar una preview como Prisma principal ni guardar datos personales en ella.

## 6. Puerta obligatoria de Release

Una versión pública solo se publica cuando:
1. Su capacidad existe en la interfaz y el propietario puede completar el recorrido.
2. Los datos persisten tras cerrar y reabrir la PWA.
3. Se prueba en Chrome Android en el teléfono real.
4. El modo offline funciona donde el requisito lo exige.
5. Obsidiana y Cuarzo mantienen paridad.
6. No quedan defectos P0/P1 abiertos.
7. Copias, restauraciones y migraciones aplicables están verificadas.
8. La actualización desde la versión anterior no destruye datos.
9. El changelog español describe lo que el usuario puede hacer, límites conocidos y cambios de datos.
10. El propietario acepta expresamente la entrega.

La CI es evidencia de calidad, no la puerta única ni sustituto de la prueba manual.

## 7. Correcciones PATCH

Se publica PATCH únicamente cuando:
- hay una versión ya publicada;
- la corrección resuelve un defecto que afecta al usuario o a la seguridad;
- se ejecutan pruebas focalizadas y regresión relevante;
- el changelog explica el problema corregido.

No crear PATCH por cambiar dependencias internas, mensajes de desarrollo, docs o formateo sin efecto visible.

## 8. Changelog obligatorio

Cada Release contiene:
- versión y fecha;
- nuevas capacidades realmente utilizables;
- correcciones;
- cambios de esquema IndexedDB, formato .prisma o compatibilidad de copias;
- pruebas realizadas y navegador/dispositivo realmente probados;
- problemas conocidos y limitaciones;
- instrucciones de actualización y recuperación.

La frase que justifica cada número debe poder completarse así: **«Esta versión existe porque ahora el usuario puede…»**.

## 9. Significado de 1.0.0

`1.0.0` no se alcanza por antigüedad, cantidad de commits ni por publicar el MVP. Se reserva para la primera versión completa que incluye MVP, experiencia cinematográfica, Descubrir avanzado, gestión avanzada de listas, estadísticas, Espectro, experiencia de versiones, seguridad, privacidad, rendimiento, accesibilidad y recuperación según el alcance aprobado. Requiere aceptación expresa del propietario.
