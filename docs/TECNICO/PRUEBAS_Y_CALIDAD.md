# Pruebas y aceptación — Prisma

**Estado:** criterios mínimos; se ajustarán al primer recorrido aprobado.

## Principio

Las pruebas deben demostrar que una función real funciona y proteger los datos. No se construirá una infraestructura de pruebas más compleja que el producto ni se perseguirá cobertura por sí misma.

## Pruebas necesarias por tipo de cambio

- **Reglas de producto:** casos normales, límites y errores que afecten directamente al recorrido.
- **Persistencia:** escritura, lectura, cierre/reapertura y fallo de transacción cuando se modifiquen datos.
- **Copias y recuperación:** contraseña incorrecta, archivo alterado, importación incompleta y garantía de que un fallo no sobrescribe datos existentes.
- **PWA:** instalación y apertura en Chrome Android; offline si la función lo promete; actualización cuando cambie el shell o los datos.
- **Seguridad:** comprobar que no se filtran datos personales ni credenciales y que los datos sensibles no aparecen en logs.

No ejecutar todas las capas para cualquier cambio menor. Elegir pruebas según el riesgo real.

## Rendimiento y selección de calidad

Cuando la decisión técnica pueda afectar la experiencia, se comparan alternativas y se mide su efecto en el teléfono Android real: fluidez, latencia, memoria, consumo, tamaño de descarga, carga inicial y comportamiento offline. No se acepta una elección por costumbre ni se sustituye una evaluación por popularidad. Tampoco se selecciona la opción más básica solo para reducir tiempo inicial: la elegida debe demostrar que ofrece la mejor calidad global disponible dentro de la condición de coste cero.

La calidad no se demuestra acumulando herramientas o pruebas genéricas. Se demuestra con resultados medidos, recorridos reales y ausencia de regresiones en privacidad, accesibilidad y datos.

## Verificación en el teléfono

Una prueba de escritorio no sustituye comprobar en el teléfono Android:
- tamaño y controles táctiles;
- navegación y regreso;
- temas que hayan sido aprobados;
- persistencia tras cerrar y abrir;
- modo avión cuando aplique;
- comportamiento con red lenta o interrumpida.



## Dispositivo objetivo de referencia

El propietario ha facilitado el siguiente perfil para pruebas reales:

- **Modelo:** Samsung Galaxy A03, SM-A035M (a03ub).
- **Sistema:** Android 13 (API 33), One UI 5.1 Core.
- **CPU:** Unisoc T606, 2× Cortex-A75 + 6× Cortex-A55.
- **RAM:** 4 GB físicos; el valor `navigator.deviceMemory = 4` también fue informado por la sonda, pero no representa memoria libre.
- **Arquitectura:** arm64-v8a.
- **Almacenamiento:** 109 GB internos; se observaron unos 6,2 GB libres inicialmente (dato temporal; el propietario puede liberar espacio; no equivale a cuota del navegador).
- **Medio extraíble:** tarjeta microSD cercana a 7 GB, FAT32.
- **Pantalla:** densidad informada de 300 dpi; el perfil no incluye aún la resolución exacta.
- **Navegador:** Brave Android 1.99.56, motor Chromium 157.0.8103.50 (informado por el propietario el 12 de noviembre de 2026).
- **Herramientas:** depuración ADB activada y Termux con Node.js 24 LTS. Termux:API no está instalado/configurado; no se dependerá de él para medir la PWA.

No es necesario registrar información de SIM, operador, identificadores de cuenta ni datos sensibles del dispositivo en el repositorio. El perfil se limita a las características técnicas relevantes para rendimiento, almacenamiento y compatibilidad.

## Protocolo de prueba en el Galaxy A03

1. Confirmar que Brave sigue en 1.99.56 / Chromium 157.0.8103.50 (revisar brave://version cuando cambie), registrar el espacio libre disponible, estado de batería y si se prueba desde pestaña normal o PWA instalada.
2. Probar arranque en frío, navegación y uso repetido con el teléfono en estado normal; repetir después de reiniciar para separar efectos de memoria acumulada.
3. Repetir las pruebas de almacenamiento con datasets sintéticos de 1.000 y 10.000 películas y proporciones de 1, 3 y 10 visionados por película. No importar datos personales del usuario.
4. Comparar búsqueda, historial, inserción de visionados, actualización de calificación, orden cronológico y operaciones transaccionales.
5. Registrar memoria y respuesta de la interfaz mientras el navegador conserva otras aplicaciones en segundo plano; comprobar que no haya cierres/reinicios de pestaña, congelaciones ni pérdida de cambios.
6. Registrar `navigator.storage.estimate()` solo como valor reportado y potencialmente modificado por el navegador; la documentación de Brave desktop menciona valores fijos, pero no se extrapolará a Android. Consultar `navigator.storage.persist()` / `persisted()` por separado y registrar el resultado real de persistencia.
7. **Completado parcialmente:** Brave Android expuso OPFS y permitió escribir/leer; `SyncAccessHandle` también funcionó dentro de Worker. Los selectores `showOpenFilePicker` / `showSaveFilePicker` no estuvieron expuestos. Falta repetir OPFS en el hostname HTTPS definitivo y probar persistencia y cuota ahí. No colocar datos reales durante la comparativa.
8. Medir derivación Argon2id, cifrado y descifrado de una copia sintética de tamaño acotado; medir tiempo y memoria máxima. Nunca reducir parámetros por debajo de una configuración mínima aceptada para acelerar la prueba.
9. **Pendiente:** completar ida y vuelta de archivo usando descarga estándar y `<input type="file">` de Android; los selectores avanzados no están expuestos en el reporte. No hacer que el respaldo dependa de File System Access API ni asumir que IndexedDB/OPFS puede trasladarse a la SD.
10. Comprobar instalación, modo avión, recuperación tras cerrar/reabrir y actualización del Service Worker sin perder transacciones.

### Condiciones de seguridad de las pruebas

- No llenar de forma deliberada el almacenamiento interno ni la microSD.
- El propietario puede liberar espacio general del teléfono antes de una sesión. El banco de pruebas no borrará datos de Brave, datos del sitio ni archivos personales; solo podrá limpiar el origen y los datasets sintéticos que él mismo haya creado.
- Toda prueba de borrado se limita al origen y dataset sintético creado específicamente para ella.
- Una cuota o error de escritura debe detener la operación limpiamente; nunca se permite una escritura parcial que parezca exitosa.
- El estado «persistente» se verifica mediante el resultado real de la API, no se deduce del modelo del teléfono.
- No se declarará validación Android hasta observar las pruebas en el navegador real del Galaxy A03.

## Automatización

Se puede usar CI gratuita del repositorio público para formato, lint, comprobación de tipos, pruebas focalizadas y build. El workflow debe ser fiable, rápido y proporcional al riesgo; no se reduce calidad para ahorrar unos pasos si estos evitan errores reales.

No crear workflows que repitan el mismo trabajo. No usar runners de pago, servicios externos de test de pago, artefactos innecesarios ni cuotas que puedan generar cargos.

## Criterio de aceptación

Cada entrega debe decir qué puede hacer ahora el usuario, cómo se probó y en qué dispositivo/navegador, qué casos offline se verificaron, qué límites conocidos quedan y si hubo cambios de datos o recuperación.

No afirmar que una función está probada si solo pasó CI o se inspeccionó el código.


## Pruebas específicas del primer recorrido

Datos de prueba sintéticos; no usar información personal real durante la selección técnica.

- 1,000 y 10,000 películas; 1, 3 y 10 visionados por película.
- Registrar dos visionados de la misma película y comprobar que ambos sobreviven a cierre/reapertura.
- Asignar/modificar una nota y comprobar que solo cambia el visionado seleccionado.
- Probar calificación provisional y su transferencia atómica al siguiente visionado.
- Probar fecha de día completo sin hora, instante exacto, cambio de zona horaria y hora estimada por duración.
- Forzar errores de cuota y fallo de transacción; no confirmar cambios parciales.
- Cerrar la PWA durante operaciones, reabrir y comprobar consistencia.
- Abrir dos pestañas/PWA simultáneas y comprobar ausencia de corrupción o bloqueos silenciosos.
- Exportar, restaurar en una base de prueba limpia y comparar conteos/identidades; probar contraseña errónea y archivo alterado.
- Repetir el recorrido sin conexión y con red interrumpida.

Para la comparativa de framework, mantener idéntico diseño/flujo entre las dos muestras. Medir build estático, carga inicial, tiempo de interacción, fluidez, tamaño comprimido, memoria y navegación en el teléfono Android objetivo. No declarar una elección como verificada en Android hasta ejecutar las pruebas en un dispositivo real.


## Sonda independiente de APIs del navegador

Se ha añadido `tools/browser-probe/` para ejecutar una prueba local, sin dependencias ni telemetría, en el navegador de referencia. La sonda crea solo recursos con nombres propios `prisma-browser-probe` y comprueba IndexedDB, rollback de transacción, AES-GCM de Web Crypto, OPFS (si está expuesto), SyncAccessHandle en Worker, persistencia, Service Worker, descarga y lectura de JSON mediante el selector estándar.

Instrucciones para instalarla en Termux y servirla en `http://127.0.0.1:18765/`: [tools/browser-probe/README.md](../../tools/browser-probe/README.md). El uso de loopback se acepta como contexto seguro para Service Worker en navegadores compatibles. La sonda no sustituye pruebas de la aplicación ni decide por sí sola el almacenamiento.


## Resultado de la primera sonda — Galaxy A03 / Brave

Informe recibido el 12 de noviembre de 2026 a las 22:33 UTC, generado desde `http://127.0.0.1:18765/`.

| Comprobación | Resultado observado | Alcance |
|---|---|---|
| IndexedDB | Correcto | Lectura/escritura/borrado y durabilidad strict aceptada |
| Rollback | Correcto | Sin registro parcial |
| Web Crypto | Correcto | AES-256-GCM ida y vuelta sintética |
| OPFS | Correcto | Crear/escribir/leer/limpiar |
| OPFS Worker | Correcto | SyncAccessHandle |
| persist()/persisted() | true / true | Solo el origen localhost de la sonda |
| Service Worker | Controlador activo | Aún no acredita modo avión |
| File System Access pickers | No expuestos | Debe probarse fallback estándar |

Uso/cuota informados por `estimate()`: 0,05 MB / 2.048 MB. No se tratan como cuota garantizada. El informe no confirma la recarga del marcador ni la prueba offline en modo avión. Tampoco incluye resultado de importar el JSON con selector estándar.



## Benchmark de almacenamiento Dexie vs SQLite

La comparación automatizada se encuentra en `tools/storage-benchmark/`. Es una herramienta de evaluación, no código de la aplicación.

- Instala versiones fijadas: Dexie 4.4.7 y `@sqlite.org/sqlite-wasm@3.54.1-build1`.
- Ejecuta primero 1.000 películas × 3 visionados y descarga el JSON; solo después, si el teléfono funciona con normalidad, ejecuta 10.000 × 3.
- El informe contiene tres rondas por motor y medianas; conserva también los tiempos de inicialización WASM/VFS separados.
- Se deben comprobar los indicadores de integridad antes de considerar los tiempos.
- SQLite SAH pool no proporciona concurrencia multi-pestaña transparente. Un benchmark rápido no demuestra que sea la mejor arquitectura de Prisma.
- Si se interrumpe una ronda, la herramienta permite limpiar únicamente la carpeta OPFS y las bases IndexedDB con prefijos propios.
- El benchmark ya se ejecutó en el Galaxy A03 con 1.000, 5.000 y 10.000 películas (3.000, 15.000 y 30.000 visionados) y tres rondas por motor. Todos los informes indicaron integridad correcta. Los resultados medidos y sus límites están documentados en Arquitectura; no declarar elección de almacenamiento hasta resolver concurrencia, limpieza OPFS, migraciones, memoria y recuperación.

Instrucciones de ejecución en Termux: [tools/storage-benchmark/README.md](../../tools/storage-benchmark/README.md).


### Resultados observados del benchmark (12-11-2026)

| Dataset | Inserción Dexie | Inserción SQLite SAH pool | Integridad |
|---|---:|---:|---|
| 1k películas / 3k visionados | 993,1 ms | 359,5 ms | Correcta |
| 5k películas / 15k visionados | 5.320,9 ms | 1.293,0 ms | Correcta |
| 10k películas / 30k visionados | 10.578,7 ms | 2.441,5 ms | Correcta |

No interpretar el total del benchmark como comparación simétrica: SQLite incluye inicialización de Worker/WASM/VFS, Dexie ya está cargado antes de iniciar el cronómetro. Los informes antiguos tampoco registraron el retorno de removeVfs(); la versión actual de la herramienta lo comprueba.

Próximas pruebas: OPFS-WL o actor único/SharedWorker, limpieza OPFS observada, funcionamiento con dos pestañas, tamaño del paquete y prueba de restauración de backup.
