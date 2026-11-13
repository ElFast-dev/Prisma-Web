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
