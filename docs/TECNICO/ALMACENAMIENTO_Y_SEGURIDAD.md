# Almacenamiento, seguridad y recuperación — Prisma

**Estado:** criterios por validar; no hay esquema ni cifrado elegidos.

## Protección de la información

El diario personal debe permanecer en el dispositivo. El alojamiento estático entrega la aplicación, pero no recibe el historial ni las colecciones. Las funciones externas, si se aprueban, solo reciben los datos mínimos necesarios para la consulta solicitada.

Separar desde el diseño:
- información creada por el usuario y no reconstruible;
- metadatos externos que puedan descargarse otra vez;
- imágenes, shell y otros recursos temporales;
- credenciales y archivos de copia.

Una caché nunca será la única copia de datos personales.

## Límites del almacenamiento web

IndexedDB y Cache Storage son opciones que deben validarse para los casos reales. El navegador controla cuotas y persistencia; Prisma no puede prometer que el sistema operativo nunca eliminará datos.

La interfaz deberá explicar los límites, detectar errores de cuota y ofrecer una copia manual antes de operaciones de riesgo. Una limpieza automática solo puede afectar recursos reconstruibles, nunca el diario.

## Copias y recuperación

Antes de decidir formato, KDF, algoritmo o biblioteca:
1. definir qué datos se respaldan;
2. definir el escenario de restauración en otro navegador/dispositivo;
3. comparar formatos y algoritmos mantenidos;
4. medir rendimiento y memoria en el teléfono;
5. verificar integridad y fallos sin sobrescribir los datos actuales.

Argon2id, AES-GCM y cualquier parámetro propuesto anteriormente no están aprobados. No instalar WASM ni dependencias criptográficas por anticipado. La solución debe ser segura, mantenible, gratuita y viable en Android.

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
