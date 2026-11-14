# Prisma · laboratorio de copias cifradas

## Estado

Experimento aislado dentro de `tools/`. No es aplicación de producto, no accede a la base Prisma y no se deben introducir contraseñas reales ni datos personales. El formato binario `PRSM` usado en la prueba es solo una maqueta para comprobar autenticación de cabecera, errores y validación previa; no se aprueba ni se garantiza su compatibilidad futura.

## Versiones fijadas

- `hash-wasm@4.13.0`: Argon2id v1.3, MIT, cero dependencias de ejecución.
- `libsodium-wrappers-sumo@0.8.4`: alternativa de comparación, ISC.
- Vite 8.3.8 y TypeScript 6.0.3, herramientas de desarrollo.

El ensayo usa Argon2id con 19.456 KiB, 2 iteraciones, paralelismo 1 y clave de 32 bytes. Es el perfil mínimo OWASP que se debe medir en el dispositivo. Ambos motores derivan usando la misma contraseña sintética y la misma sal por ronda; las claves tienen que coincidir. Los cálculos se realizan en Worker.

## Ejecutar en Termux

Desde la carpeta del repositorio local:

    cd tools/backup-security-lab
    npm install
    npm run dev

Abre Brave en:

    http://127.0.0.1:18830/

Pulsa «Ejecutar pruebas», espera el resultado y usa «Guardar informe JSON». La contraseña sintética y las claves no se incluyen en el informe.

Para compilar la herramienta:

    npm run build

No uses `--force` ni `--legacy-peer-deps`.

## Interpretación

- Las tres rondas alternan qué biblioteca se ejecuta primero, reduciendo el sesgo del orden.
- La coincidencia de claves es obligatoria.
- `performance.memory`, cuando Brave lo expone, solo mide heap JavaScript; no la memoria lineal WASM ni toda la RAM.
- Los tiempos corresponden a la sesión y dispositivo donde se ejecutó la prueba.
- AES-GCM autentica los bytes exactos de cabecera como datos asociados.
- La prueba de restauración simula una sustitución en memoria tras la validación completa. No prueba todavía transacciones SQLite/OPFS, falta de cuota real ni apagado del proceso.

## Límites antes de aprobar una biblioteca

- Revisar licencias de C/WASM incrustado: la licencia MIT raíz de hash-wasm advierte que algunas implementaciones C pueden incluir otras licencias/avisos.
- Revisar lockfiles, árbol de dependencias, procedencia del paquete, artefactos WASM frente al código fuente y resultados de npm audit.
- No se encontró evidencia pública de una auditoría criptográfica independiente específica de estas distribuciones Wasm.
- Comprobar si la biblioteca limpia sus buffers internos; borrar una Uint8Array visible no prueba que el WASM haya limpiado su memoria.
- Ejecutar en el Galaxy A03 y registrar tiempos, errores, respuesta de pantalla y memoria accesible sin provocar falta de recursos.
- El límite real de tamaño de copia se determinará después de medir; esta herramienta no intenta llenar OPFS.
