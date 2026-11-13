# Sonda aislada de recuperación SQLite + OPFS SAH pool

Esta sonda es independiente de V8. Usa un VFS y un archivo SQLite propios:

- Directorio OPFS: `/prisma-sahpool-recovery-probe-v1`
- Archivo: `/recovery-probe.sqlite3`
- RUN_ID: `prisma-sahpool-recovery-probe-v1`
- Protocolo del coordinador: `recovery-fault-probe-3`

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

## Observación de campo: heartbeat detecta Worker terminado (Galaxy A03 / Brave, 13-11-2026)

Base aislada con 5 filas confirmadas. Había dos pestañas conectadas al SharedWorker `fc1576a1-eb57-4e0b-af25-8d94258fcf26`, protocolo `recovery-fault-probe-2`. El propietario tenía Dedicated Worker `43f9edf8-7bc6-41b4-a35e-bbdf90b5f8ad`.

- 1:10:16 p. m.: la pestaña ejecutó `Worker.terminate()` sin notificar al SharedWorker.
- 1:10:39 p. m.: el coordinador notificó `heartbeat-timeout` a la página propietaria.
- La página propietaria recibió `terminate-unresponsive-worker`, terminó su Dedicated Worker y envió `dbWorkerTerminated`.
- La página registró: «Dedicated Worker retirado por el coordinador. Filas confirmadas antes del relevo: 5».

**Resultado parcial:** heartbeat y handshake de terminación/retirada observados correctamente. La detección ocurrió aproximadamente 23 s después de la terminación manual, dentro del margen configurado de 20 s más la cadencia de heartbeat. Esto demuestra que la página propietaria puede confirmar la terminación del Worker que ya no respondía y que el coordinador procesó esa confirmación.

**Todavía no aceptado como recuperación completa:** la captura no muestra el estado posterior de la pestaña de reserva (nuevo rol propietario, nuevo Dedicated Worker ID, archivo encontrado y cinco filas recuperadas). Por tanto, la promoción y reapertura de SQLite siguen pendientes de confirmación en este ensayo. No interpretar el mensaje de retirada como prueba de que la reserva ya abrió la base.

Siguiente comprobación: sin terminar más Workers, mirar la pestaña de reserva. Debe mostrar «Esta pestaña · PROPIETARIA ACTIVA», un Dedicated Worker ID nuevo, `/recovery-probe.sqlite3` encontrado y 5 filas. Si no ocurre, conservar la bitácora y no insertar datos.


## Instrumentación de ciclo de vida y watchdog de activación (recovery-fault-probe-3)

Esta revisión añade observabilidad y una terminación segura de candidatos que no completan la activación. No cambia el RUN_ID, el directorio OPFS, el nombre del archivo SQLite ni las tablas.

- El coordinador publica por pestaña el rol, `visibilityState`, `lifecycleState`, última señal de ciclo de vida y si el puerto del Dedicated Worker sigue adjunto. Que el puerto esté adjunto **no demuestra** que el Worker esté ejecutándose.
- La página registra `visibilitychange`, `freeze`, `resume`, `pageshow` y `pagehide`. Volver a visible solicita una instantánea del coordinador, sin necesitar que SQLite tenga propietario activo.
- «Actualizar estado compartido» envía `getState`; esta operación no consulta ni escribe SQLite.
- La activación de un candidato tiene un límite de 30 s. Si no responde, el coordinador solicita a su página terminar el Dedicated Worker. Solo después de recibir `activationCandidateTerminated` retira ese candidato y considera otra sesión. Si la página está congelada y no confirma, la promoción permanece bloqueada deliberadamente.
- Una pestaña cuyo Worker candidato fue terminado queda marcada como fallida y debe recargarse para volver a registrarse. No se crean Workers desde el SharedWorker.

### Primera aceptación de recovery-fault-probe-3: observación sin escrituras

Antes de volver a inyectar fallos:

1. No pulses «Crear referencia», «Terminar Dedicated Worker», controles B/C ni limpieza.
2. Mantén abiertas las pestañas existentes y anota sus IDs y roles.
3. Pulsa «Actualizar estado compartido» en cada pestaña. Guarda las líneas de sesiones, incluyendo visibilidad y última señal.
4. Cambia de Brave a otra aplicación y vuelve a Brave. No cierres las pestañas.
5. Pulsa «Actualizar estado compartido» otra vez en ambas pestañas.
6. Compara el SharedWorker ID, número de sesiones, `clientId`, roles, visibilidad, última señal y propietario SQLite.

Esta aceptación solo caracteriza el ciclo de vida. No demuestra failover ni recuperación transaccional. Si una sesión aparece como `starting`, `activation-unresponsive` o `failed`, no pulses insertar ni repitas la terminación; conserva la bitácora.

El watchdog de activación y los nuevos eventos de ciclo de vida todavía requieren aceptación funcional en Brave sobre el Galaxy A03. La implementación y el parseo sintáctico no se consideran una prueba real de navegador.

## Evidencia posterior de recovery-fault-probe-3 (Galaxy A03 / Brave, 13-11-2026)

### Visibilidad y retorno a primer plano

En una ejecución, la página propietaria alternó entre `hidden` y `visible` mientras el SharedWorker permaneció operativo. Las solicitudes `visibility-restored` obtuvieron instantáneas del mismo coordinador y la base conservó cinco filas. La evidencia demuestra cambios de visibilidad y retorno a primer plano; no demuestra por sí sola eventos `freeze`, `resume` ni descarte de páginas.

### Transferencia cooperativa y nuevo propietario

SharedWorker `6bf70433-d704-4bc9-bd76-1b1255406158`. El propietario `6caa0f1a-85ea-4bdc-963d-96c0374665e5` cedió la propiedad a `74092e04-c52a-4d4e-b297-3db9b5f9017f`. La instantánea exportada e importada midió 32.768 bytes; el nuevo propietario encontró `/recovery-probe.sqlite3`, recuperó las cinco filas y quedó activo. Esta ejecución demuestra el relevo cooperativo, no el failover por terminación abrupta.

### Intento de terminación abrupta después del relevo

- 2:12:48 p. m.: se pulsó «Terminar Dedicated Worker sin avisar» en la pestaña que acababa de asumir la propiedad.
- Las líneas disponibles posteriores muestran solicitudes `visibility-restored`, pero no incluyen `heartbeat-timeout`, `terminate-unresponsive-worker`, `owner-worker-retired` ni la confirmación de que el propietario anterior recuperó SQLite.
- A las 2:13:22 p. m. apareció otra instancia de SharedWorker, `ef533a64-34a5-4d0a-9be8-faadb8b9e3bf`, y una nueva pestaña propietaria `10a5518f-f56e-4c1e-a945-80dc39655f9d`, con Dedicated Worker `2e662983-e94e-4597-a496-c5dad58d0ebf`. Esta instancia encontró el archivo de 32.768 bytes y recuperó las cinco filas.

**Clasificación:** el archivo y sus cinco filas sobrevivieron y fueron recuperados por una instancia nueva del coordinador. El failover automático dentro del SharedWorker anterior no queda demostrado. La causa por la que desapareció la instancia anterior tampoco puede determinarse con las líneas conservadas. No se considera este intento una aceptación completa del ensayo A.

Los ensayos B y C siguen pendientes. No se ejecutó limpieza. Los 200 registros de V8 y las cinco filas de referencia de esta sonda deben conservarse.

## Traza de heartbeat y decisiones del coordinador (recovery-fault-probe-4)

La revisión 4 añade al estado compartido una traza circular de hasta 40 eventos y un resumen del heartbeat: inicio del temporizador, último ping, último ACK, ping pendiente y edad, detección del timeout y solicitud de terminación. También registra selección de candidatos, confirmación de terminación, retirada del propietario y ACK de activación.

La traza permite diferenciar entre: temporizador que no se inició, ping enviado sin ACK, timeout detectado, mensaje de terminación emitido, página que confirma la terminación, candidato promovido y coordinador nuevo. Consultarla mediante «Actualizar estado compartido» no ejecuta operaciones SQL ni modifica registros. La traza es diagnóstica y no sustituye la aceptación funcional en Brave.

## Recovery AutoTest V1: ejecución automática en una sola página

Herramienta independiente:
`tools/storage-benchmark/recovery-auto-test/`

URL local:
`http://127.0.0.1:18767/recovery-auto-test/`

La V1 automatiza los ensayos A, B y C desde un único botón. La página contiene dos contextos iframe visibles; cada uno crea su propio Dedicated Worker y una conexión independiente al mismo SharedWorker. El coordinador tiene preferencia por candidatos visibles, después por ciclo de vida activo y, finalmente, por la señal más reciente. La prueba no necesita que el usuario cambie entre pestañas.

Cada ejecución genera un UUID nuevo y un directorio OPFS exclusivo:

- RUN_ID: `prisma-sahpool-recovery-auto-<UUID>`
- Directorio OPFS: `/prisma-sahpool-recovery-auto-<UUID>`
- Archivo SQLite: `/recovery-auto.sqlite3`
- Protocolo: `recovery-auto-test-1`

El trabajador SQLite se deriva de la implementación de recovery-probe V4, pero tiene su propio directorio y archivo. No comparte la base V4 ni el directorio V8.

### Secuencia de un botón

1. **Preparación:** crea dos clientes independientes; inicializa SQLite y confirma cinco filas sintéticas.
2. **Ensayo A:** termina el Dedicated Worker del propietario en reposo. El heartbeat detecta la falta de ACK, la página confirma la terminación y la reserva recupera las cinco filas.
3. **Ensayo B:** abre `BEGIN IMMEDIATE`, inserta cinco filas sin COMMIT y termina el propietario. El siguiente cliente abre el archivo y debe recuperar únicamente las cinco filas anteriores.
4. **Ensayo C:** inserta cinco filas y ejecuta COMMIT. El Dedicated Worker retiene deliberadamente la respuesta. El coordinador detecta su terminación y el siguiente cliente debe recuperar diez filas.
5. **Reapertura:** cierra y reabre SQLite, comprobando que siguen existiendo diez filas.
6. **Limpieza:** solo si A, B, C y la reapertura pasan, la herramienta elimina el VFS exclusivo de esa ejecución. Si algo falla, conserva la carpeta de esa ejecución para diagnóstico y muestra un informe copiable.

El usuario mantiene la página en primer plano y pulsa «EJECUTAR DIAGNÓSTICO COMPLETO». No debe abrir las pestañas de la sonda V4 ni ejecutar controles manuales de fallo. La ejecución tarda aproximadamente un minuto o algo más porque conserva la cadencia real del heartbeat de 5 s y el timeout de 20 s.

### Alcance y limitaciones

Los dos iframes son contextos de navegación independientes dentro de una única página visible. Esto permite automatizar las conexiones SharedWorker, los Dedicated Workers y los tres escenarios de recuperación transaccional sin depender de la suspensión de una pestaña secundaria. No reproduce el descarte real de una página por Android ni sustituye la prueba V4 de suspensión del sistema operativo.

Un resultado APROBADO demostraría los escenarios A, B y C, la reapertura y la limpieza en el navegador y dispositivo que ejecutaron la prueba. No aprobaría por sí solo toda la arquitectura de almacenamiento de Prisma ni migraciones, cifrado, claves o restauración de respaldos.

La herramienta es de prueba y no forma parte de la aplicación principal.