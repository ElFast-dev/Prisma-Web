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
- **RAM:** 4 GB físicos; el espacio libre observado rondaba 1 GB y es variable.
- **Arquitectura:** arm64-v8a.
- **Almacenamiento:** 109 GB internos; se observaron unos 6,2 GB libres al facilitar el perfil (dato temporal, no cuota del navegador).
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
6. Consultar navigator.storage.estimate() y navigator.storage.persist(); mostrar los valores reales y probar persistencia concedida/denegada sin asumir que la concesión es automática.
7. Primero detectar en Brave si `navigator.storage.getDirectory` está disponible; si existe, probar OPFS en HTTPS y dentro de Worker, incluyendo cuota y manejo de errores. Brave declara que desactiva la File System API, de la que OPFS forma parte, por lo que la ausencia de la API debe registrarse como resultado válido y descartar OPFS para el navegador objetivo. No colocar datos reales en OPFS durante la comparativa.
8. Medir derivación Argon2id, cifrado y descifrado de una copia sintética de tamaño acotado; medir tiempo y memoria máxima. Nunca reducir parámetros por debajo de una configuración mínima aceptada para acelerar la prueba.
9. Probar exportación de un backup como archivo descargable y su restauración mediante el selector de archivo estándar de Android. Comprobar aparte `showOpenFilePicker` y `showSaveFilePicker`, pero no hacer que el respaldo dependa de esas APIs ni asumir que IndexedDB/OPFS puede trasladarse a la SD.
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
