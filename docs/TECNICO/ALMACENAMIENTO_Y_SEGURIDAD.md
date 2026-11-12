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

El almacenamiento web está sujeto a cuota y políticas del navegador. Por defecto, los datos de un origen se guardan como `best-effort`; el navegador puede eliminar el conjunto de datos del origen si aplica su política de desalojo. Se puede solicitar persistencia con `navigator.storage.persist()`; en Chrome y otros navegadores basados en Chromium la concesión o denegación se decide automáticamente según la interacción del usuario con el sitio. La aplicación debe consultar y mostrar el resultado real, nunca asumir que fue concedido. Fuente: [MDN — cuotas y desalojo](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria).

La interfaz debe explicar los límites, detectar errores de cuota y ofrecer una copia manual recuperable. Una limpieza automática solo puede afectar recursos reconstruibles, nunca el diario.

La elección concreta entre IndexedDB/Dexie y SQLite/OPFS está en [Arquitectura — comparativa de almacenamiento](ARQUITECTURA.md#comparativa-de-almacenamiento-resultado-de-investigacion). No crear dos bases autoritativas.

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
