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
