# Diseño preliminar de seguridad · no aprobado

## Candidatos criptográficos

- KDF: Argon2id v1.3, salida de 32 bytes.
- Cifrado: AES-256-GCM mediante Web Crypto.
- Salt aleatorio candidato: 16 bytes.
- Nonce/IV candidato: 12 bytes, único por archivo.
- Etiqueta GCM: 128 bits.
- Datos asociados: bytes exactos del prefijo y cabecera serializada.

OWASP marca como mínimo Argon2id m=19 MiB, t=2, p=1 y propone perfiles alternativos con diferentes costes de memoria/CPU. La configuración real debe medirse en el Galaxy A03. El ejemplo de hash-wasm con 512 KiB es demostrativo y no debe copiarse como parámetro de seguridad.

## Cabecera y validación

La maqueta `PRSM` contiene identificador, longitud acotada de cabecera, parámetros KDF, salt, algoritmo, nonce y versión. Los bytes exactos del identificador, longitud y cabecera se autentican como AAD de AES-GCM.

Un archivo recibido no puede elegir arbitrariamente consumo de CPU/RAM. Antes de ejecutar Argon2id, el lector debe rechazar versiones desconocidas, longitudes imposibles, algoritmos no permitidos y parámetros fuera de perfiles explícitos. Un valor de memoria muy alto no debe convertirse en un ataque de agotamiento de memoria al importar.

## Flujo de restauración obligatorio

1. Leer lo mínimo para identificar el archivo y validar longitudes.
2. Validar versión, algoritmos y perfil KDF contra una lista permitida antes de derivar la clave.
3. Derivar la clave y descifrar con AES-GCM y el mismo AAD exacto.
4. Interpretar todo el contenido y validar versión de datos, límites, identificadores, relaciones, duplicados e invariantes.
5. Solo después preparar una restauración dentro del único propietario SQLite.
6. Aplicar la sustitución lógica dentro de una transacción atómica y verificar recuentos/integridad antes del COMMIT.
7. Ante fallo previo al COMMIT, ROLLBACK; si el COMMIT queda incierto, reabrir y verificar. No borrar el diario como atajo.
8. No anunciar éxito hasta comprobar la reapertura y la integridad.

El laboratorio prueba el sobre y el orden general de validación, pero NO los pasos 5–8 con SQLite/OPFS. Todavía no autoriza datos personales reales.

## Mensajes de error

Un fallo de autenticación GCM no permite distinguir con certeza contraseña incorrecta de ciphertext/AAD alterado. La interfaz debe indicar «La contraseña no es correcta o el archivo está dañado». Cabecera inválida, truncamiento y versión incompatible se pueden detectar antes de autenticar y deben tener mensajes diferenciados.

## Memoria y archivos

Web Crypto AES-GCM opera sobre buffers completos, no como una API de cifrado por fragmentos. Puede coexistir más de una copia del archivo, plaintext, ciphertext, clave, SQLite/WASM y memoria del navegador. Hay que medir tamaños escalonados antes de fijar límite; no llenar OPFS para encontrarlo.

Si se requiere una copia grande con baja memoria, estudiar por separado un formato de bloques autenticados o cifrado streaming documentado. No inventar un modo streaming propio de AES-GCM.

## Archivos en Brave Android

Los selectores avanzados `showOpenFilePicker()` y `showSaveFilePicker()` no estuvieron disponibles en la sonda previa. El recorrido de respaldo debe poder completarse con selector HTML `<input type="file">` y descarga estándar mediante Blob, sin depender de File System Access API.

## Memoria sensible

No afirmar borrado seguro hasta comprobar cada biblioteca. Sobrescribir una Uint8Array visible no demuestra que hayan desaparecido copias internas o memoria lineal WASM. No registrar contraseñas ni claves. Ejecutar KDF/cifrado en Worker para no bloquear la interfaz.
