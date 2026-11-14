# Protocolo de actualización segura de Prisma · propuesta experimental

**Estado: diseño propuesto, no aprobado como implementación de producto.** Este protocolo protege las operaciones locales; las muestras de frameworks y el Service Worker de esta carpeta de laboratorio no lo implementan.

## Principio

Una actualización no puede forzar la recarga ni tomar el control mientras exista una escritura, transacción, transferencia de propietario, exportación o restauración activa. Una pestaña que no responde bloquea la activación; no se asume que está inactiva por estar en segundo plano.

El Service Worker nuevo se instala en espera y descarga sus recursos sin reemplazar al activo. La persona ve un aviso; aceptar la actualización inicia la coordinación, pero no la activa inmediatamente.

## Secuencia propuesta

1. El navegador instala y deja en espera el Service Worker nuevo. El SW activo y las pestañas actuales siguen funcionando.
2. Cuando la persona acepta, el coordinador SharedWorker entra en modo de actualización y deja de aceptar operaciones nuevas. Las peticiones nuevas se encolan o reciben una respuesta explícita de reintento; no se descartan silenciosamente.
3. El coordinador pide a todas las pestañas que terminen lo que ya está en curso. Se cuentan por separado: escrituras, transacciones, handoff del propietario, exportación y restauración.
4. Cada pestaña confirma que su interfaz está pausada y que su contador de operaciones es cero. Las pestañas ocultas también deben confirmar; no se saltan.
5. El propietario SQLite único confirma que la cola está vacía, que no existe transacción activa y que no hay handoff abierto. Cierra la conexión SAH pool de forma controlada y libera la propiedad.
6. Solo si todos los clientes han confirmado, todos los contadores son cero, el propietario cerró y la nueva versión puede leer el esquema de datos actual, el coordinador envía al SW en espera el permiso explícito para activar (mensaje SKIP_WAITING).
7. El nuevo SW se activa y reclama los clientes. Las pestañas, ya pausadas, recargan una sola vez con el nuevo shell.
8. La nueva versión abre la base, valida el estado e inicia únicamente migraciones compatibles y transaccionales. Las operaciones normales se reanudan tras verificar la salud del almacenamiento.
9. Las cachés de la versión anterior se conservan hasta superar comprobaciones de apertura, integridad y migración. Solo entonces se eliminan. Ante fallo se conserva el conjunto anterior para recuperación controlada.

## Reglas de compatibilidad del esquema

Para actualizaciones normales se prefiere el patrón expandir/contraer:
- una versión nueva debe poder leer el esquema existente;
- una migración se ejecuta dentro de una transacción;
- no se eliminan ni reinterpretan columnas/tablas usadas por una versión anterior mientras exista posibilidad de volver a ella;
- cambios destructivos se dejan para una versión posterior, tras terminar el periodo de compatibilidad.

No se puede activar una versión que no pueda leer el esquema actual. Una actualización del shell no debe obligar a migrar de forma irreversible sin una estrategia de retorno probada.

## Cancelación y pestañas que no responden

- Si hay una operación activa, la actualización espera y muestra el motivo; no mata Workers ni cierra archivos a la fuerza.
- Si una pestaña no responde, se cancela o se posterga la activación. La persona puede cerrar la pestaña por su cuenta y volver a intentar.
- Si falla el cierre SQLite, se cancela; no activar el SW nuevo.
- Si el nuevo shell falla al abrir el diario, no borrar las cachés anteriores ni los datos actuales.
- Nunca borrar archivos OPFS, diarios SQLite o copias temporales como parte de la actualización rutinaria.

## Puerta técnica de activación

La función pura model.mjs simula esta puerta. node --test verifica bloqueos por operaciones pendientes, pestañas no confirmadas, propietario abierto y esquema incompatible; además comprueba que las cachés anteriores no se liberan antes de que la nueva versión pase la verificación de salud.

Estos tests prueban el modelo lógico, no el ciclo de vida real del navegador, los mensajes SharedWorker, SQLite ni Brave Android. Esas pruebas siguen siendo obligatorias antes de aprobar la implementación.
