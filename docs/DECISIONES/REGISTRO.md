# Registro de decisiones — Prisma

**Última revisión:** 12 de noviembre de 2026.

Este registro contiene decisiones expresas del propietario y propuestas claramente separadas. Los documentos antiguos no convierten una propuesta en decisión.

## Decisiones expresas del propietario

| ID | Decisión | Estado |
|---|---|---|
| P-001 | Prisma se prepara primero como PWA para uso principal en Android. | Aprobada |
| P-002 | `ElFast-dev/Prisma-Web` será la base del nuevo proyecto; el repositorio anterior se retirará y el nuevo se renombrará a `Prisma`. | Aprobada; falta acción administrativa |
| P-003 | Primero se completan los fundamentos necesarios; después se comienza la aplicación. | Aprobada |
| P-004 | El avance y las versiones públicas deben representar capacidades funcionales reales y respetar compatibilidad. | Aprobada |
| P-005 | Prisma no debe generar ningún gasto para el propietario: objetivo permanente de 0 USD. | Aprobada |
| P-006 | Cloudflare Pages no se utilizará como alojamiento de Prisma. | Rechazada expresamente |
| P-007 | Prisma utilizará Semantic Versioning 2.0 en formato MAYOR.MENOR.PARCHE. | Aprobada |
| P-008 | No se elegirán tecnologías básicas por comodidad: se evaluarán opciones de alta calidad y se escogerá la mejor solución demostrable dentro del coste de 0 USD. | Aprobada |
| P-009 | El asistente puede preguntar dudas y sugerir mejoras para Prisma, siempre de una pregunta por turno y sin ciclos interminables; las decisiones de interfaz importantes se validan con el propietario. | Aprobada |
| P-010 | Personal usa cuatro tarjetas cuadradas en cuadrícula 2×2 (Historial, Pendientes, Ocultos, Estadísticas) y una fila completa de Gestionar listas debajo; es el diseño anterior a SVG que más le gustaba al propietario. | Confirmado para Prisma Web |
| P-011 | Descubrir conserva la barra integrada de búsqueda/Filtros/Ajustes y el Feed continuo de tres columnas con pósteres 2:3 sin títulos debajo; píldora inferior Personal/Descubrir y ambos temas. | Confirmado para Prisma Web |
| P-012 | El panel de Filtros se presenta como un panel inferior expandido sobre Descubrir, con grupos desplegables, edición provisional, restablecimiento y aplicación explícita; conserva el Feed detrás y su posición. | Confirmado para Prisma Web |
| P-013 | Ajustes se organiza en Apariencia (selector Obsidiana/Cuarzo), Conexiones (TMDB) y Datos locales (almacenamiento y copias de seguridad), con una nota discreta de privacidad. | Confirmado como dirección visual para Prisma Web |
| P-014 | La píldora Personal/Descubrir solo aparece en las pantallas raíz Personal y Descubrir; se oculta en subsecciones y vistas de detalle, como Historial, Pendientes, Ocultos, listas, Ajustes y fichas cinematográficas. | Confirmado para Prisma Web |
| P-015 | La ficha conserva la composición aprobada: cabecera panorámica; acciones principales Historial/Pendientes; sinopsis; control de calificación; y acceso a Visionados. Se mantiene la separación mediante espacio y divisores discretos, sin tarjetas pesadas. | Confirmado para Prisma Web |
| P-016 | Registrar un visionado utiliza un panel inferior con cuatro opciones: Ahora, Día de estreno, Seleccionar fecha y Ajustar al inicio; fecha/hora se eligen dentro del mismo panel y el cálculo se presenta como estimación. | Confirmado como dirección de interacción para Prisma Web |
| P-017 | El selector de calificación usa diez estrellas solo dentro del panel de edición y requiere confirmación; con varios visionados se elige el registro destino y, sin visionados, la nota queda provisional para asociarse al siguiente. En la ficha no se muestran estrellas: el botón «Calificar» pasa a mostrar la nota (por ejemplo, «7/10») y permite editarla al tocarlo. | Confirmado como dirección de interacción para Prisma Web |
| P-018 | Sin alterar la composición de la ficha aprobada, el control de calificación es un botón que muestra «Calificar» o, tras guardar, la nota (por ejemplo, «7/10»), sin estrellas visibles. La lista detallada de visionados no se despliega en la ficha: se abre al pulsar «Visionados». | Confirmado por el propietario para Prisma Web |
| P-019 | El primer recorrido funcional será añadir manualmente una película al diario, llevarla a Historial, registrar uno o varios visionados independientes, calificarlos, consultar los registros y comprobar persistencia tras cierre/reapertura y sin conexión. Antes de guardar datos personales reales, la copia cifrada debe poder exportarse y restaurarse correctamente. | Alcance inicial confirmado para preparación técnica |

## Material heredado

Los documentos, ramas, procesos y diseños del repositorio Android se conservan para consulta histórica. No se consideran decisiones vigentes hasta que el propietario los confirme o se demuestre su utilidad y se apruebe su adaptación.

Los requisitos y recursos visuales migrados son candidatos a revalidar, no aprobaciones web automáticas.

## Propuestas técnicas abiertas

| ID | Propuesta | Estado |
|---|---|---|
| T-001 | React + TypeScript + Vite y otras opciones de primer nivel. | Candidatas; comparar con criterios de calidad y pruebas, sin preferencia automática por soluciones básicas |
| T-002 | Dexie 4.4.7/IndexedDB frente a SQLite WASM/OPFS para el diario inicial. | IndexedDB estricto y OPFS con SyncAccessHandle en Worker han sido probados en Brave Android; falta benchmark real de Dexie frente a SQLite, concurrencia, durabilidad, recuperación y cuota. OPFS ya no se considera incompatible |
| T-003 | Cache Storage para shell e imágenes reconstruibles. | Candidata; nunca será la única copia de datos personales |
| T-004 | Web Workers, OPFS o WebAssembly. | Evaluar como candidatas serias y elegir según benchmarks y calidad; no incluir ni descartar por prejuicio |
| T-005 | Firebase Hosting clásico en Spark como alojamiento estático con hostname web.app dedicado. | Candidato recomendado de 0 USD; falta aprobar proyecto/site ID y verificar configuración sin facturación. GitHub Pages queda desaconsejado por origen compartido |
| T-006 | Actualización PWA controlada. | Candidata; especificar lo necesario para proteger datos y operaciones |
| T-007 | Definir con precisión el contrato público y la compatibilidad de los datos antes de la primera publicación. | Pendiente; SemVer 2.0 ya está aprobado |
| T-008 | Cifrado de copias con KDF y AES-GCM. | Requiere comparación, benchmark y revisión antes de elegir algoritmo y parámetros |
| T-009 | Svelte 5.57.1 + SvelteKit 3.2.0 frente a React 19.3.0 + React Router 8.5.1. | Comparación obligatoria en Android; SvelteKit integra PWA/SSG, React aporta ecosistema mayor. Ninguna está aprobada |
| T-010 | Formato de copia portable cifrada, con KDF resistente a fuerza bruta y cifrado autenticado. | Argon2id + AES-256-GCM es la dirección candidata; parámetros, biblioteca y formato se deben medir y revisar antes de fijarlos |

## Decisiones retiradas

- Cloudflare Pages como opción principal o recomendada.
- La asignación anticipada de números SemVer a fases o funciones futuras. SemVer sí se mantiene como sistema oficial.
- Los IDs de fase-hito como medida del avance del producto.
- La asunción de que los diseños Android son especificaciones finales para la PWA.
- La aprobación automática de React, Vite, Argon2id, Workers u OPFS.

## Pendientes que bloquean el inicio del código

1. **[Resuelto] Primer recorrido:** añadir película manualmente → Historial → uno o varios visionados → calificación individual → consultar Visionados → comprobar reapertura y uso offline.
2. **Diseño:** la composición de las pantallas de ese recorrido ya está revisada y aprobada; no reabrirla salvo observación concreta del propietario.
3. **Framework:** comparar una muestra equivalente en SvelteKit 3 y React Router 8, con build estático, rutas, navegación, accesibilidad, Service Worker y tamaño/rendimiento en Android.
4. **Almacenamiento:** benchmark Dexie/IndexedDB frente a SQLite/WASM/OPFS con datos sintéticos representativos y pruebas de transacciones, migraciones, cierre inesperado, dos pestañas y cuota.
5. **Seguridad y recuperación:** cerrar el formato versionado de copia cifrada, medir KDF en Android y probar restauración, contraseña incorrecta, archivo alterado y fallo sin sobrescribir datos.
6. **Origen:** aprobar un hosting estático y el hostname HTTPS definitivo, verificar su aislamiento de origen y mantener la cuenta en el nivel gratuito sin método de pago ni facturación.
7. **PWA y actualización:** definir caché del shell, actualización controlada y protección de operaciones en curso.
8. **Aceptación:** completar el plan de pruebas en el dispositivo Android objetivo.
9. **Puerta final:** el propietario aprueba expresamente el comienzo del código de producto.

Las decisiones que no afecten al alcance, al coste, a la privacidad ni a la integridad de datos se pueden tomar durante la implementación de la función que las necesite.


## Actualización del dispositivo de referencia — 12 de noviembre de 2026

- **Dispositivo:** Samsung Galaxy A03 SM-A035M, Android 13, Unisoc T606, 4 GB de RAM.
- **Navegador de aceptación:** Brave Android 1.99.56, Chromium 157.0.8103.50, versión facilitada por el propietario.
- **Almacenamiento:** la observación inicial de 6,2 GB libres no es un límite permanente; el propietario puede liberar espacio antes de ejecutar benchmarks. Registrar espacio y cuota web por sesión.
- **Evidencia del 12-11-2026:** en Brave 1.99.56 / Chromium 157.0.8103.50 sobre Galaxy A03, la sonda en `http://127.0.0.1:18765/` informó IndexedDB OK con durabilidad estricta, rollback correcto, AES-256-GCM OK, OPFS OK, SyncAccessHandle en Worker OK, `persist() = true`, Service Worker registrado/controlando y selectores avanzados de archivos no expuestos. Los 2 GB de cuota son solo el valor reportado por `estimate()`, no una cuota garantizada. Pendiente recargar para comprobar el marcador, probar input/descarga estándar y modo avión. La persistencia debe volver a solicitarse y verificarse en el origen HTTPS definitivo.


## Evidencia de navegador — primera sonda

**Fecha del informe:** 12 de noviembre de 2026, 22:33:25 UTC.  
**Origen probado:** `http://127.0.0.1:18765/` (loopback local; no es el origen de producción).

- Brave confirmado; Chromium informado por el reporte: 157.0.0.0. El propietario ya había identificado la compilación completa como 157.0.8103.50.
- Contexto seguro: `true`.
- IndexedDB: escritura, lectura, borrado y `durability: "strict"` correctos.
- Rollback de transacción: correcto; no dejó registro parcial.
- Web Crypto: AES-256-GCM cifró y descifró el texto sintético.
- OPFS: crear, escribir, leer y limpiar correctos.
- OPFS Worker: `SyncAccessHandle` de escritura/lectura correcto.
- Storage: `persist() = true` y `persisted() = true` en ese origen. El marcador se guardó, pero el informe aún no acredita que sobrevivió a una recarga posterior.
- Service Worker: registrado y controlador activo. Esto acredita control de la página, no todavía una prueba de modo avión.
- File System Access API: `showOpenFilePicker` y `showSaveFilePicker` no expuestos. La ruta HTML `<input type="file">` + descarga estándar aún debe completar su prueba de ida y vuelta.
- `estimate()`: reportó 0,05 MB de uso y 2.048 MB de cuota; se conservará como dato informativo, no como garantía de cuota del origen.
- El User-Agent expone `Android 10; K`; Chromium aplica reducción de User-Agent en Android M110+ y usa esos valores estáticos, por lo que no contradice Android 13. `deviceMemory = 4` y `hardwareConcurrency = 6` son valores informados por el navegador, no mediciones exactas de RAM libre ni recuento físico de núcleos.

Este resultado abre la comparación Dexie/IndexedDB vs SQLite/OPFS, pero no la resuelve. No declara el almacenamiento canónico ni el hosting.
