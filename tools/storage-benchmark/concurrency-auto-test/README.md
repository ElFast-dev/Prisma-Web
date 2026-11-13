# Prisma · Concurrency AutoTest V1

Sonda técnica independiente para probar escrituras solicitadas por dos clientes al mismo tiempo y procesadas por el propietario único de SQLite WASM sobre OPFS SAH pool.

## Instalación y ejecución

Desde Termux, ejecuta esta única línea. El instalador se descarga desde un commit inmutable (no desde `main`), descarga los seis archivos desde el commit fijo `360eeb656eb412c0f72c0d3cbaab39e4301cd475`, verifica sus huellas SHA-1 de Git y se detiene sin sobrescribir archivos locales distintos:

```sh
python -c "from urllib.request import urlopen; u='https://raw.githubusercontent.com/ElFast-dev/Prisma-Web/6af0d181ea4bcfbad243ee0b217b3204e67c85e7/tools/storage-benchmark/install-concurrency-auto-test.py'; exec(compile(urlopen(u, timeout=30).read(), u, 'exec'))"
```

No reinstala dependencias y no reinicia el servidor si ya está activo. Después abre:

`http://127.0.0.1:18767/concurrency-auto-test/`

Mantener la página en primer plano y pulsar **EJECUTAR PRUEBA AUTOMÁTICA**. La página crea dos iframes visibles con conexiones independientes al mismo SharedWorker; cada cliente arranca su propio Dedicated Worker, pero solo uno recibe la propiedad de SQLite.

## Secuencia automática

1. Comprueba el origen seguro, Dedicated Worker, SharedWorker y OPFS.
2. Registra dos clientes y crea cinco filas sintéticas.
3. Envía 24 solicitudes de escritura: 12 desde cada cliente, 25 filas por solicitud. Ambas conexiones producen solicitudes sin esperar a que termine el otro cliente.
4. Comprueba las 24 respuestas, 12 éxitos por cliente, los recuentos individuales, el total esperado de 605 filas y que el coordinador mantiene un único propietario SQLite.
5. Cierra y vuelve a abrir SQLite; verifica que se conservan las 605 filas.
6. Solo cuando todas las comprobaciones pasan, elimina el VFS y el directorio OPFS exclusivos de este RUN_ID.

Cada ejecución genera su propio identificador y directorio:

- RUN_ID: `prisma-sahpool-concurrency-auto-<UUID>`
- Directorio OPFS: `/prisma-sahpool-concurrency-auto-<UUID>`
- Archivo SQLite: `/recovery-auto.sqlite3`
- Protocolo: `concurrency-auto-test-1`

Los identificadores de las filas incluyen el `requestId` único de cada lote, evitando que dos lotes del mismo cliente generados dentro del mismo milisegundo colisionen en la clave primaria.

## Interpretación

La prueba mide solicitudes concurrentes de dos productores independientes que llegan al SharedWorker. El coordinador las reenvía a un único Dedicated Worker y este mantiene una cola serial para ejecutar transacciones SQLite. El objetivo es verificar integridad, ausencia de pérdidas, finalización de ambos clientes, recuentos y reapertura bajo una carga breve y controlada.

**No** demuestra dos escritores SQLite ejecutándose dentro de la base al mismo tiempo, ni establece una garantía matemática de equidad, ni reproduce el descarte de pestañas por Android. Tampoco aprueba migraciones, cifrado, gestión de claves, copias de seguridad/restauración o el origen HTTPS definitivo de Prisma.

Si la prueba falla, conserva el informe y la página sin pulsar controles de limpieza. La herramienta no elimina la base temporal cuando hay errores.

## Aislamiento

No utiliza la base de Recovery AutoTest V1, la sonda histórica V4, los datos de V8 ni datos de la aplicación Prisma. No modificar ni borrar las herramientas o bases anteriores.

## Resultado observado: primera aceptación de concurrencia (13-11-2026)

Ejecución real comunicada desde el entorno de aceptación del proyecto el 13 de noviembre de 2026. El informe comenzó a las 16:52:35 y terminó a las 16:52:38 (hora de Panamá, UTC-5).

- RUN_ID: `prisma-sahpool-concurrency-auto-4bf59119-ea0d-4df0-be6c-927e5fd85415`
- Protocolo: `concurrency-auto-test-1`
- Preparación: PASS; dos clientes conectados, un propietario SQLite y cinco filas iniciales.
- Solicitudes: 24/24 respuestas; cliente A completó 12/12 y cliente B completó 12/12.
- Recuento de A: 305 filas (cinco de referencia más 300 insertadas por A).
- Recuento de B: 300 filas.
- Recuento total SQLite: 605 filas.
- Coordinación: PASS; se mantuvo un único propietario SQLite y el segundo cliente permaneció conectado como reserva.
- Reapertura: PASS; después de cerrar y volver a abrir SQLite se conservaron las 605 filas.
- Limpieza: PASS; se eliminó el directorio OPFS exclusivo de esta ejecución.

Latencias informadas:
- Cliente A: media 587 ms; percentil 95 de 1.065 ms; rango 105–1.065 ms.
- Cliente B: media 636 ms; percentil 95 de 1.135 ms; rango 127–1.135 ms.

El User-Agent informado fue `Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Mobile Safari/537.36`. Este texto no se toma como prueba independiente de la versión real de Android ni de la marca del navegador.

**Conclusión de aceptación:** resultado general APROBADO para esta carga controlada. Quedó demostrado que dos clientes pudieron enviar solicitudes de escritura concurrentes al mismo coordinador, que el único propietario ejecutó las transacciones de forma serializada, que las 24 solicitudes recibieron respuesta y que las 605 filas se conservaron después de reabrir SQLite.

**Límites:** no fueron dos escritores SQLite trabajando simultáneamente; las transacciones se serializaron dentro del único Dedicated Worker propietario. Esta ejecución no prueba equidad matemática bajo contención prolongada, carga sostenida, suspensión o descarte real de pestañas por Android, recuperación ante apagado del proceso, ni comportamiento de dos conexiones SQLite independientes. Tampoco aprueba OPFS-WL ni convierte SAH pool en la arquitectura definitiva de Prisma.

La limpieza se limitó al directorio OPFS generado por este RUN_ID. La prueba informó que no modificó Recovery AutoTest V1, V4, V8 ni los datos de Prisma.
