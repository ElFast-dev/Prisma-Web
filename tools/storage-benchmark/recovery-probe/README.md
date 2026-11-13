# Sonda aislada de recuperación SQLite + OPFS SAH pool

Esta sonda es independiente de V8. Usa un VFS y un archivo SQLite propios:

- Directorio OPFS: `/prisma-sahpool-recovery-probe-v1`
- Archivo: `/recovery-probe.sqlite3`
- RUN_ID: `prisma-sahpool-recovery-probe-v1`
- Protocolo del coordinador: `recovery-fault-probe-1`

No accede a `/prisma-sahpool-sharedworker-probe-v5` ni a `/sharedworker-probe.sqlite3`. Tampoco borra el directorio V4 histórico.

## Abrir

Con el servidor de `tools/storage-benchmark/serve-coordination.py` activo en el puerto 18767, abre:

`http://127.0.0.1:18767/recovery-probe/`

Usa dos pestañas normales de Brave del mismo origen. La página se registra automáticamente. La primera será propietaria y la segunda quedará en espera.

## Preparación

1. Confirma dos pestañas conectadas, una propietaria y una secundaria.
2. Desde la propietaria, pulsa «Crear referencia: insertar 5».
3. Confirma cinco filas desde ambas pestañas.
4. No uses la función de limpieza hasta terminar todos los ensayos.

## Ensayo A: Dedicated Worker terminado mientras está en reposo

1. En la pestaña propietaria, pulsa «Terminar Dedicated Worker sin avisar».
2. Desde la secundaria, pulsa «Consultar estado». La petición puede quedarse esperando; el watchdog debe indicar que alcanzó `shared-forwarded` sin llegar a `dedicated-received`.
3. Cierra la pestaña propietaria. Su `pagehide` envía `unregister`; el coordinador debe retirar esa sesión e intentar activar la secundaria.
4. Comprueba si la secundaria pasa a propietaria y recupera las cinco filas.
5. Si no hay recuperación, conserva el error y no pulses insertar.

Este ensayo distingue la terminación del Worker de una notificación explícita de fallo: `Worker.terminate()` no ofrece tiempo para finalizar operaciones. Cerrar después la página es la señal que permite al coordinador retirar la sesión que quedó huérfana.



## Resultado observado del ensayo A (Galaxy A03 / Brave, 13-11-2026)

Base aislada inicial: 5 filas confirmadas; archivo `/recovery-probe.sqlite3` en `/prisma-sahpool-recovery-probe-v1`, tamaño 32.768 bytes. Había dos pestañas conectadas al SharedWorker `a68990df-9c23-4766-910a-a7b9c2347410`. El propietario inicial utilizaba Dedicated Worker `2dbef596-e820-419a-a3da-b9b1ffb7b04f`; la pestaña secundaria era `340a0a13-697`.

Se terminó el Dedicated Worker propietario mediante el botón «Terminar Dedicated Worker sin avisar». Desde la pestaña secundaria se enviaron dos consultas `status`. Ambas llegaron al SharedWorker (`shared-received`) y quedaron pendientes; el watchdog informó `lastStage=shared-received` a los 18 segundos y las páginas agotaron el tiempo a los 30 segundos. No apareció una respuesta `dedicated-received` ni una recuperación automática inmediata mientras la sesión de la página propietaria permanecía registrada.

Después de retirar la sesión del propietario anterior, apareció un nuevo Dedicated Worker `642a1121-0f6d-4b67-a67e-80d50347af7a`. El nuevo propietario encontró el mismo archivo de 32.768 bytes, la tabla `writes` y las cinco filas. La pestaña secundaria quedó como propietaria activa.

**Resultado:** recuperación de las cinco filas después de retirar la sesión del propietario fallido: correcta. Detección automática de `Worker.terminate()` mientras la página propietaria sigue conectada: no demostrada; las consultas secundarias quedaron colgadas hasta el timeout. El coordinador mantuvo la sesión/propiedad lógica después de que el Dedicated Worker había terminado. El paso de cierre/unregister de la página permitió finalmente promover la pestaña de reserva.

**Corrección necesaria antes de aprobar la arquitectura:** añadir una señal explícita de liveness entre SharedWorker y Dedicated Worker, con timeout, y un protocolo para que la página propietaria termine el Worker que no responde y confirme su retirada antes de promover otra pestaña. No se debe abrir un segundo SAH pool mientras el Worker anterior pueda seguir vivo manteniendo SyncAccessHandles. Si la página propietaria está congelada y no puede confirmar la terminación, el coordinador debe permanecer en estado de recuperación bloqueada y no permitir dos propietarios.

El ensayo B (transacción abierta antes de COMMIT) y el ensayo C (COMMIT completado con acuse perdido) todavía no se han ejecutado. No se debe considerar este resultado como validación de rollback de journal ni de recuperación de commit con respuesta perdida.

## Ensayo B: interrupción antes de COMMIT

1. Con dos pestañas conectadas y un propietario activo, pulsa «Abrir transacción e insertar 5 sin COMMIT».
2. Espera a que aparezca `fault-transaction-open-before-commit` y el mensaje de transacción abierta.
3. Cierra inmediatamente la pestaña propietaria, sin pulsar rollback ni cesión.
4. La pestaña secundaria debe asumir la propiedad e intentar abrir la misma base.
5. Resultado esperado: el total debe seguir en el valor anterior al ensayo; las cinco filas no confirmadas deben haberse revertido mediante recuperación del journal.

## Ensayo C: COMMIT terminado pero acuse perdido

1. Asegura dos pestañas y una propietaria activa.
2. Pulsa «Hacer COMMIT y retener respuesta».
3. Espera el evento `fault-commit-completed-before-ack`. La notificación `stats` debe indicar que el total ya aumentó en cinco.
4. Cierra la pestaña propietaria antes de que responda la solicitud.
5. La pestaña secundaria debe asumir la propiedad y recuperar el nuevo total, incluyendo las cinco filas ya confirmadas.

Este ensayo no interrumpe el interior de la llamada síncrona `COMMIT`: prueba el caso en que COMMIT ya terminó correctamente pero la aplicación se termina antes de entregar el acuse. La interrupción dentro de la propia llamada COMMIT requerirá otra técnica de instrumentación.

## Registro de evidencias

Para cada ensayo, guardar:
- Estado de ambas pestañas y propietario.
- IDs de SharedWorker y Dedicated Worker.
- Total anterior y total recuperado.
- Archivo encontrado, tamaño y errores de activación.
- Último salto de broker visible.
- Si el nuevo propietario pudo abrir el mismo VFS sin inicializar accidentalmente una base vacía.

La recuperación del nuevo propietario exige que, si ya existía un total confirmado mayor que cero, SQLite encuentre el archivo anterior y recupere al menos ese número de filas. Así la sonda no presenta una base nueva vacía como recuperación correcta.

No ejecutar escrituras mientras una recuperación esté en error. No repetir una operación que haya expirado sin consultar primero el total desde el propietario activo.

## Limpieza

Solo después de completar los ensayos y guardar las evidencias, usa «Eliminar la base sintética» desde la pestaña propietaria. Esta operación elimina exclusivamente el VFS de recuperación V1.

## Protocolo de liveness y detección de Dedicated Worker (recovery-fault-probe-2)

La siguiente revisión de la sonda añade un heartbeat independiente de las solicitudes de aplicación:

- El SharedWorker envía un ping cada 5 s al Dedicated Worker propietario.
- El Dedicated Worker responde inmediatamente por su MessagePort, fuera de la cola SQL.
- Si no hay ACK durante 20 s, el SharedWorker marca al propietario como no responsivo y pide a su página que termine su Worker local.
- La página termina el Worker y confirma `dbWorkerTerminated`.
- Solo después de esa confirmación el coordinador retira el puerto antiguo y promueve la pestaña de reserva, exigiendo el último total confirmado.
- Si la página propietaria está congelada y no puede confirmar la terminación, no se promueve un segundo propietario. Al cerrar la página, `unregister` permite la retirada y failover.

Esta política evita abrir deliberadamente un segundo SAH pool mientras el Worker anterior podría seguir reteniendo SyncAccessHandles. El heartbeat puede detectar un Worker bloqueado o muerto, pero no constituye una prueba de almacenamiento ni de transacción; es un mecanismo de liveness del coordinador. La pausa de una pestaña puede retrasar la detección, por lo que se evalúa el caso de página congelada en un ensayo separado.
