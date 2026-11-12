# Almacenamiento, seguridad y recuperación — Prisma

**Estado:** dirección local-first confirmada; Dexie/IndexedDB y Argon2id + AES-256-GCM son candidatos técnicos, todavía sujetos a benchmark y aprobación.

## Protección de la información

El diario personal debe permanecer en el dispositivo. El alojamiento estático entrega la aplicación, pero no recibe el historial ni las colecciones. Las funciones externas, si se aprueban, solo reciben los datos mínimos necesarios para la consulta solicitada.

Separar desde el diseño:
- información creada por el usuario y no reconstruible;
- metadatos externos que puedan descargarse otra vez;
- imágenes, shell y otros recursos temporales;
- credenciales y archivos de copia.

Una caché nunca será la única copia de datos personales.

## Límites del almacenamiento web

El almacenamiento web está sujeto a cuota y políticas del navegador. Por defecto, los datos de un origen se guardan como `best-effort`; el navegador puede eliminar el conjunto de datos del origen si aplica su política de desalojo. Se puede solicitar persistencia con `navigator.storage.persist()`; el navegador decide si la concede. En la primera prueba sobre localhost en Brave Android, `persist()` y `persisted()` devolvieron `true`. Esto solo vale para ese origen de prueba: la aplicación debe repetir la solicitud y consultar el resultado en su hostname HTTPS definitivo; nunca asumir que la concesión se transfiere entre orígenes. Fuente: [MDN — cuotas y desalojo](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria).

La interfaz debe explicar los límites, detectar errores de cuota y ofrecer una copia manual recuperable. Una limpieza automática solo puede afectar recursos reconstruibles, nunca el diario.

La elección concreta entre IndexedDB/Dexie y SQLite/OPFS está en [Arquitectura — comparativa de almacenamiento](ARQUITECTURA.md#comparativa-de-almacenamiento-resultado-de-investigacion). La sonda del Galaxy A03 confirmó ambas rutas base (IndexedDB y OPFS/Worker) en Brave; se preparó `tools/storage-benchmark/` para comparar Dexie 4.4.7 con SQLite WASM 3.54.1-build1 bajo la misma carga. Falta ejecutar el benchmark y resolver las limitaciones de concurrencia de SAH pool. No crear dos bases autoritativas.

### Durabilidad de escrituras

Para las operaciones que crean o modifican datos personales se evaluará la opción de durabilidad `strict` de IndexedDB cuando la capa seleccionada y el navegador la soporten. Esta opción solicita mayor garantía de que los datos se han escrito en almacenamiento persistente antes de confirmar la transacción, con posible coste en latencia y batería. Se debe medir en Android y reservar para transacciones importantes cuando el beneficio justifique el coste.

Las imágenes, respuestas remotas y cachés reconstruibles pueden emplear políticas de menor durabilidad. Ningún modo de transacción protege contra el usuario que borra los datos del sitio, la desinstalación del navegador ni daños del dispositivo; una exportación restaurable sigue siendo obligatoria.

## Copias y recuperación

Antes de decidir formato, KDF, algoritmo o biblioteca:
1. definir qué datos se respaldan;
2. definir el escenario de restauración en otro navegador/dispositivo;
3. comparar formatos y algoritmos mantenidos;
4. medir rendimiento y memoria en el teléfono;
5. verificar integridad y fallos sin sobrescribir los datos actuales.

Argon2id, AES-GCM y cualquier parámetro propuesto anteriormente no están aprobados. No instalar WASM ni dependencias criptográficas por anticipado. La solución debe ser segura, mantenible, gratuita y viable en Android.

## Copias y recuperación — dirección propuesta

La copia es un archivo portable, manual y autocontenido. No se sube a Prisma, Firebase ni ningún servicio externo.

Dirección candidata para la prueba técnica:
- KDF resistente a fuerza bruta: **Argon2id**. OWASP publica como mínimo de referencia 19 MiB de memoria, 2 iteraciones y paralelismo 1 para almacenamiento de contraseñas; sirve como punto de partida de prueba, no como parámetro ya aprobado para el archivo de Prisma. La configuración final se medirá en Android y quedará incluida en la cabecera del archivo.
- Cifrado autenticado: **AES-256-GCM**, con clave derivada de la contraseña y nonce único generado criptográficamente. El encabezado/versión y parámetros relevantes deben quedar autenticados como datos asociados.
- Formato versionado con identificador de formato, versión de esquema, KDF y parámetros, salt, algoritmo, nonce, ciphertext y etiqueta de autenticación.
- Incluir todos los datos personales no reconstruibles: películas manuales y sus vínculos, estados, visionados, calificaciones, listas y preferencias que entren en el alcance. Excluir cachés y datos remotos reconstruibles salvo que la restauración los necesite.
- Importación en dos fases: leer y limitar el tamaño/los parámetros; derivar clave y autenticar; validar estructura, relaciones y versión; solo después escribir en una transacción segura o en una base temporal y sustituir. Una contraseña errónea, un archivo alterado, una versión no soportada o un fallo no pueden modificar la base actual.
- El usuario debe descargar y custodiar el archivo y recordar su contraseña. Si se pierde la contraseña, no existe recuperación remota: el cifrado está diseñado para que el proveedor no pueda descifrarlo.

No elegir todavía implementación de Argon2id, parámetros definitivos, compresión ni estrategia de restauración (reemplazo/fusión). La prueba debe medir tiempos, RAM y batería en el teléfono objetivo.

Fuentes: [OWASP Password Storage Cheat Sheet — parámetros Argon2id](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API), [AES-GCM en SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt).

## Credenciales externas

Si Prisma requiere una credencial para consultar un catálogo, explicar al usuario por qué se necesita y qué datos se envían. Nunca incluir credenciales en el repositorio, URLs, logs o analítica. No afirmar que Web Crypto equivale a una clave protegida por Android Keystore.

## Seguridad web

- Usar HTTPS.
- Minimizar dependencias y scripts externos.
- Evitar analítica y telemetría personal.
- Validar datos importados y respuestas externas.
- No registrar datos privados ni copias descifradas.
- Explicar riesgos de código malicioso ejecutado en el mismo origen y de un dispositivo comprometido.

La política concreta se define cuando se aprueben el almacenamiento y el primer recorrido que lo utilice. No diseñar criptografía especulativa antes de saber qué se necesita respaldar.


## Consideraciones específicas del dispositivo de referencia

El Samsung Galaxy A03 objetivo cuenta con 4 GB de RAM física y tenía unos 6,2 GB libres de almacenamiento interno al registrar el perfil. Esto obliga a limitar las copias temporales durante importación/restauración, evitar cargar el archivo entero varias veces en memoria y medir KDF/cifrado/descifrado en el teléfono real.

OPFS es almacenamiento privado del origen, no una carpeta que el usuario pueda gestionar directamente ni un destino seleccionable en la tarjeta SD. Se somete a las cuotas del navegador; borrar los datos del sitio borra también OPFS. La sonda confirmó su disponibilidad en Brave Android 1.99.56 y la operación de SyncAccessHandle en Worker en `localhost`; falta repetir la prueba en el origen HTTPS final. Por eso la copia de seguridad debe ser un archivo portátil separado del almacenamiento de trabajo. La SD puede ser un destino manual del archivo exportado a través del sistema Android si el usuario lo mueve allí; no se debe prometer escritura directa hasta probar la API disponible en Chrome.

Los selectores avanzados `showOpenFilePicker` y `showSaveFilePicker` no estuvieron expuestos en Brave. La ruta de copias usará mecanismos compatibles como selector HTML estándar y descarga de archivo; falta completar su prueba de ida y vuelta en el teléfono.

La importación debe evitar duplicar simultáneamente el archivo comprimido/cifrado, el texto descifrado y la base completa en RAM cuando haya una estrategia por streaming disponible. Cualquier límite de tamaño de archivo o memoria debe comunicarse antes de modificar la base.

Fuentes: [MDN — OPFS y cuotas](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system), [OWASP — parámetros Argon2id](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).


## Evidencia de rendimiento de almacenamiento

El benchmark real del Galaxy A03 indicó que SQLite WASM/OPFS SAH pool inserta 3.000, 15.000 y 30.000 visionados entre 2,76× y 4,33× más rápido que Dexie 4.4.7 en los datasets sintéticos. Todos los resultados pasaron las comprobaciones de integridad. No es una selección final de motor: SAH pool no ofrece varias instancias multi-pestaña transparentes y aún falta comparar OPFS-WL/coordinación.

El benchmark indicó aumento progresivo del uso reportado por StorageManager.estimate(). Como ese valor no es una cuota garantizada y los informes iniciales no capturaban removeVfs(), no se declara fuga ni limpieza confirmada. La versión corregida del benchmark registra el retorno de eliminación y comprueba la presencia del directorio temporal.
