# Almacenamiento, seguridad y recuperación — Prisma Web

**Estado:** propuesta técnica para aprobación de Fase 0.  
**Objetivo:** el celular conserva el diario y el navegador no es tratado como almacenamiento infalible.

## 1. Separación de datos

| Datos | Ubicación propuesta | ¿Se puede reconstruir? |
|---|---|---|
| Películas locales y metadatos propios | IndexedDB | No |
| Visionados, puntuaciones y listas | IndexedDB | No |
| Preferencias y perfil derivado de Espectro | IndexedDB | Parcialmente |
| Metadatos TMDB descargados | IndexedDB | Sí, si TMDB sigue disponible |
| Pósteres e imágenes | Cache Storage | Sí |
| Shell web y recursos de versión | Cache Storage / Service Worker | Sí |
| Archivos de exportación | Ubicación elegida por el usuario | No, son la copia portable |
| Token TMDB | Cifrado local; nunca texto plano | El usuario puede volver a introducirlo |

IndexedDB es la base estructurada autoritativa. Cache Storage es para recursos reconstruibles. OPFS queda opcional y no se introduce hasta demostrar una necesidad real (por ejemplo, archivos binarios grandes o una base SQLite/WASM).

## 2. Cuota y persistencia

Al iniciar y desde Ajustes, consultar:
- `navigator.storage.estimate()`: uso y cuota aproximada.
- `navigator.storage.persisted()`: comprobar si ya se concedió persistencia.
- `navigator.storage.persist()`: solicitar persistencia si no existe.

El navegador decide si concede persistencia; no se promete una cuota fija ni el 60 % del almacenamiento del teléfono como espacio garantizado. El número que devuelve `estimate()` es orientativo, puede variar y no debe mostrarse como capacidad reservada.

Prisma debe:
- Mostrar uso, cuota aproximada y estado de persistencia con lenguaje claro.
- Distinguir almacenamiento persistente concedido, denegado y no disponible.
- Capturar errores de cuota y transacciones incompletas.
- Nunca limpiar historial, visionados, puntuaciones ni listas para liberar espacio.
- Priorizar la eliminación de cachés e imágenes reconstruibles mediante políticas transparentes.
- Avisar al usuario cuando sea recomendable exportar una copia.
- Probar escenarios de almacenamiento lleno, persistencia denegada, modo incógnito/no compatible y borrado manual de datos web.

La persistencia no protege contra el usuario que borra los datos del sitio, la desinstalación del navegador, fallos físicos del dispositivo ni cambios de origen.

## 3. Origen estable

IndexedDB, Cache Storage y OPFS están asociados al origen web. El origen de producción no debe cambiar después de que existan datos personales. No cambiar protocolo, dominio o puerto; no publicar primero datos en un hostname provisional; no tratar un cambio de ruta como una copia de seguridad.

Antes del primer diario real se debe fijar el hostname canónico, HTTPS, `start_url` y `scope`. El entorno de desarrollo y pruebas debe usar un origen distinto al de producción. No usar como producción un subdirectorio compartido del hostname `*.github.io` sin aislar y analizar el riesgo de mismo origen.

## 4. Copia manual cifrada

El formato propuesto es un archivo versionado `.prisma` con:
- Identificador de formato y versión.
- KDF, parámetros, salt y nonce.
- Datos cifrados y etiqueta de autenticación.
- Metadatos mínimos de compatibilidad, sin información personal en claro.

Propuesta criptográfica a validar:
- Argon2id como derivación de clave desde contraseña, usando una implementación WASM mantenida; punto de partida OWASP: memoria 19 MiB, 2 iteraciones y paralelismo 1, sujeto a benchmark en el teléfono y sin bajar del mínimo acordado sin nueva revisión.
- AES-256-GCM para cifrar y autenticar el contenido.
- Salt aleatorio por exportación y nonce aleatorio de 96 bits por cifrado; nunca reutilizar nonce con la misma clave.
- Asociar la cabecera versionada como datos autenticados (AAD).
- La contraseña no se guarda ni se envía.
- Tokens TMDB y claves internas no se incluyen en el archivo.
- Rechazar archivos alterados, contraseñas incorrectas, versiones incompatibles y estructuras inválidas sin sobrescribir la base actual.

La importación usa vista previa, validación completa, copia de seguridad temporal y sustitución transaccional o mecanismo de recuperación. Debe probarse restaurar una copia en otro navegador/dispositivo compatible. El formato necesita migraciones propias e independencia del esquema interno de IndexedDB.

## 5. Credencial TMDB

La clave la introduce el usuario. Nunca se incluye en el código público ni en logs. No se almacena en texto plano en localStorage, IndexedDB, URLs o telemetría.

La propuesta es cifrarla mediante Web Crypto y guardar una CryptoKey no exportable, junto con IV/ciphertext versionados. Una CryptoKey `extractable:false` no se puede exportar mediante las operaciones de Web Crypto, pero esto **no** protege frente a código malicioso ejecutado dentro del mismo origen: una aplicación comprometida aún podría solicitar operaciones con esa clave. Por eso se requieren HTTPS, CSP estricta, dependencias mínimas, ausencia de scripts de terceros y revisión de la cadena de suministro.

Si la clave cifrada no puede recuperarse, se solicita introducirla de nuevo sin afectar películas ni visionados.

No se atribuye a PWA la protección hardware de Android Keystore: son modelos de seguridad distintos.

## 6. Seguridad web

- HTTPS obligatorio; nunca permitir contenido mixto HTTP.
- Content Security Policy estricta, sin `unsafe-eval` y evitando `unsafe-inline`; preferir hashes/nonces o scripts empaquetados.
- Dependencias fijadas con lockfile, auditadas y minimizadas.
- Evitar scripts CDN y analítica.
- No persistir token, cabeceras Authorization, datos de usuario ni copias descifradas en logs.
- Validar todas las entradas de importación y las respuestas remotas.
- Limitar la caché de imágenes y evitar respuestas cruzadas no esperadas.
- No prometer seguridad absoluta frente a un dispositivo rooteado, navegador comprometido o XSS.

## 7. Archivos del dispositivo

Usar File System Access API solo con detección de capacidad y acción explícita del usuario. Ofrecer fallback con selector de archivos y descarga cuando la API no exista. No solicitar acceso global al almacenamiento ni asumir permisos permanentes. La PWA no tiene acceso indiscriminado a carpetas privadas del teléfono.

## 8. Criterios P0/P1

P0:
- Pérdida/corrupción de diario.
- Exportación que no cifra o restauración que sobrescribe datos ante fallo.
- Token expuesto o historial transmitido.
- Fuga entre usuarios/orígenes.

P1:
- El navegador elimina datos sin aviso visible sobre los límites.
- No se puede detectar almacenamiento lleno o fallo de transacción.
- Error de migración que impide abrir el diario.
- Modo offline que deja inaccesibles datos guardados.

Ningún P0/P1 puede quedar abierto al aprobar la versión que almacene datos reales.
