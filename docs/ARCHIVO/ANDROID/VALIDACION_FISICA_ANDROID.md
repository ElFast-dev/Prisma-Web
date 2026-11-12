> **Archivo histórico.** Archivo histórico de pruebas en el Samsung Galaxy A03 durante la etapa Android. Las especificaciones de almacenamiento libre y estado del dispositivo son una fotografía temporal; volver a medir antes de pruebas PWA.

# Prisma — validación física Android

## Dispositivo disponible para la prueba

**Samsung Galaxy A03 · modelo SM-A035M**

| Característica | Perfil de prueba |
|---|---|
| Fabricación | Abril de 2022 |
| Sistema | Android 13 · API 33 · One UI 5.1 Core |
| CPU | Unisoc T606, 8 núcleos: 2× Cortex-A75 + 6× Cortex-A55 |
| Arquitectura | 64 bits · arm64 |
| GPU | Mali · OpenGL ES 3.2 |
| Memoria | 4 GB RAM física + 4 GB zRAM/swap (no son 8 GB de RAM física) |
| Almacenamiento | Unos 109 GB internos; 6,2 GB libres al registrar el dispositivo |
| microSD | Tarjeta de unos 7 GB; no se necesita para instalar Prisma |
| Pantalla | 300 dpi · sin HDR |
| Puerto | Micro-USB |

Este es el único teléfono físico disponible. La guía se centra en obtener evidencia real en él; no requiere un segundo dispositivo para las pruebas de instalación, interfaz o persistencia.

## APK interno de referencia — CI #64 y primera prueba física

- Ejecución: [GitHub Actions #64](https://github.com/ElFast-dev/Prisma/actions/runs/42757195690), `SUCCESS`.
- Commit de la ejecución: `75273dbcbcdaf42999efd4c6361353d13b1cb15c`.
- Artefacto: `prisma-internal-apk-75273dbcbcdaf42999efd4c6361353d13b1cb15c`, ID `13736721709`.
- Paquete: `dev.elfast.prisma.internal`.
- Tamaño APK: 13.789.370 bytes.
- SHA-256: `528e136194369d10aa8c5504f5623aab414a1b2f0726add54daeeb156fbf9f5e`.
- ABI incluidas: `arm64-v8a`, `armeabi-v7a`, `x86`, `x86_64`; se verificó la presencia de `arm64-v8a` para el Galaxy A03.
- **Prueba física inicial completada el 2026-11-10 (hora local de Panamá):** el propietario descargó el APK en el Galaxy A03, calculó el SHA-256 con Termux y obtuvo coincidencia exacta; instaló/abrió Prisma y confirmó el destino inicial Descubrir, navegación a Personal, funcionamiento visual de los temas Obsidiana y Cuarzo, y acceso a Ajustes.
- La prueba confirma instalación e inicio en el dispositivo real. No equivale todavía a completar todos los casos de la matriz física de este documento.

## Confirmación posterior — APK interno de CI #112

- Ejecución: [GitHub Actions #112](https://github.com/ElFast-dev/Prisma/actions/runs/42899984672), `SUCCESS`.
- Commit: `eaaed7f709f81a0f0339f15425dbd97e23163232`.
- Variante instalada: `dev.elfast.prisma.internalfix2`.
- **Confirmación del propietario, 2026-11-10 (hora local de Panamá):** instaló el APK en el Galaxy A03 y comunicó que todo funciona correctamente en el uso realizado.
- Esta confirmación acredita la instalación y el funcionamiento general comprobado por el propietario. No se atribuye automáticamente aprobación individual a cada caso de la matriz de este documento, porque no se detalló uno por uno en esa sesión.
- La instalación de CI #112 es posterior a la prueba histórica del paquete `dev.elfast.prisma.internal` de CI #64; ambos registros se conservan por separado.

## Evidencia automatizada de ventanas amplias — CI #119

- Ejecución: [GitHub Actions #119](https://github.com/ElFast-dev/Prisma/actions/runs/42911749013), `SUCCESS`.
- Clase: `PrismaAdaptiveWindowTest`.
- Resultado estándar API 37: 2/2 casos, Obsidiana y Cuarzo.
- Resultado adicional con emulador forzado a 1280×800 px y densidad 160 dpi: 2/2 casos, 0 fallos, 0 errores y código de salida 0. La prueba comprueba que la ventana Compose mide al menos 600 dp de ancho y alto y recorre Descubrir, Ajustes/Apariencia y los cuatro accesos de Personal.
- Resultado de la matriz API 37: 24/24 casos sin fallos ni omisiones. API 26: 24 casos, 0 fallos/errores y 1 omisión esperada por TLS 1.3 no soportado.
- Esta evidencia valida adaptación funcional mediante emulador y redimensionamiento controlado. **No es una validación física en tablet, plegable ni en el Galaxy A03.**
- APK asociado: artefacto interno CI #119, paquete `dev.elfast.prisma.internalfix2`, SHA-256 `d812b083a8ee4aa9a307ae0563a7f40f78a20a2faacec3784bf324ef450abc3a`. **El SHA coincide exactamente con el APK CI #112 que el propietario ya instaló y probó en el Galaxy A03**, por lo que los bytes de la aplicación son idénticos y esa prueba física cubre el mismo binario. CI #119 no realizó una instalación nueva en el teléfono; solo añadió validación automatizada y un nuevo artefacto con el mismo APK.

## Cobertura automatizada de insets — CI #121–#129

- La prueba `PrismaMainActivityInsetsTest.realActivityAppliesThemeAwareSystemBarsAndKeepsControlsInsideSafeArea` inicia la `MainActivity` real y verifica Obsidiana/Cuarzo, apariencia de iconos de las barras del sistema y posiciones en pantalla de los controles de Descubrir y Personal respecto a las áreas seguras. Esta cobertura automatizada no reemplaza la prueba física del Galaxy A03.
- **CI #121:** [42919667314](https://github.com/ElFast-dev/Prisma/actions/runs/42919667314), cancelada tras unos 60 minutos; no produjo resultado JUnit final.
- **CI #122:** [42928937800](https://github.com/ElFast-dev/Prisma/actions/runs/42928937800), cancelada tras unos 55 minutos; tampoco produjo resultado instrumentado final.
- **CI #124:** [42939928636](https://github.com/ElFast-dev/Prisma/actions/runs/42939928636), agotó los límites API 26/37 alrededor de `ActivityScenario.launch`.
- **CI #125:** [42943318913](https://github.com/ElFast-dev/Prisma/actions/runs/42943318913), confirmó que `ActivityMonitor` lanza la Activity pero Compose/Espresso bloquea con `AppNotIdleException` debido a callbacks Choreographer.
- **CI #126:** [42945589516](https://github.com/ElFast-dev/Prisma/actions/runs/42945589516), UI Automator 2.4.1 hizo pasar la prueba en API 26 (4,648 s) y API 37 (11,784 s), con 25 casos por API y cero fallos. El job API 37 falló después por no tener construido el APK auxiliar D2D en su runner separado.
- **CI #127:** [42945616452](https://github.com/ElFast-dev/Prisma/actions/runs/42945616452), reprodujo ese problema del APK auxiliar ausente en API 37; API 26 pasó.
- **CI #128:** [42946761558](https://github.com/ElFast-dev/Prisma/actions/runs/42946761558), superada en 9 min 34 s. API 26: 25 pruebas, 0 fallos, 0 errores y 1 omisión esperada por TLS 1.3; test de insets 4,820 s. API 37: 25 pruebas, 0 fallos/errores/omisiones; test de insets 9,334 s y dos pruebas adicionales de ventana amplia superadas. Backup cloud pasó en ambas APIs. En API 37, el transporte D2D confirmó que Prisma no tiene datos elegibles para transferir por las exclusiones configuradas; no se ejecutó restauración D2D porque no se generó payload.
- **CI #129:** [42948770174](https://github.com/ElFast-dev/Prisma/actions/runs/42948770174), `SUCCESS` en 7 min 31 s. Los cuatro jobs (build/lint/JVM, API 26, API 37 y publicación del APK) terminaron correctamente sobre `fa34d97dfd5d44503914c7847e0dec5e7f877aa4`. API 26: 25 pruebas instrumentadas, 0 fallos/errores y 1 omisión esperada por TLS 1.3; API 37: 25 pruebas, 0 fallos/errores/omisiones. El perfil API 37 de ventana amplia (1280×800 px, 160 dpi) también pasó para Obsidiana y Cuarzo. Backup cloud pasó en ambas APIs y los cinco marcadores temporales siguieron ausentes tras reinstalar. En el control D2D de API 37, el paquete desechable `backup-probe` restauró su marcador; para Prisma, el transporte confirmó que no existían datos elegibles por las exclusiones configuradas, por lo que no se generó payload ni se ejecutó una restauración de datos de Prisma. APK interno publicado: artefacto ID `13823988081` (ZIP 13.304.516 bytes); no es una Release ni se instaló en el Galaxy A03.
- La corrección del workflow compila `:backup-probe:assembleDebug` en cada runner antes de ejecutar la verificación D2D. La matriz completa pasó y el APK final se publicó después de ambas APIs.
- La prueba automatizada de insets está **superada en API 26 y API 37**. El propietario confirmó también en el Galaxy A03 las áreas seguras, el regreso desde Aplicaciones recientes, bloqueo/desbloqueo, reinicio, reapertura en frío (~6 s observados) y modo avión. La aceptación física de Fase 1 está completada; no modificar ni reinstalar Prisma en el teléfono sin autorización expresa.

## Preparación segura desde el propio Galaxy A03 (sin PC)

1. Descargar `prisma-internal.apk` en el teléfono y guardarlo en **Descargas**. El APK pesa unos 13,8 MB; no hace falta usar la microSD.
2. Abrir Termux. Si aún no está instalado, obtenerlo desde una fuente oficial de Termux y mantener consistente la fuente de instalación para futuras actualizaciones.
3. Conceder a Termux el permiso de acceso a archivos cuando Android lo solicite:

```bash
termux-setup-storage
```

4. Actualizar los índices e instalar la utilidad de checksum:

```bash
pkg update
pkg install coreutils
```

5. Entrar a Descargas y comprobar que el APK está presente:

```bash
cd ~/storage/downloads
ls -lh prisma-internal.apk
```

6. Registrar el hash:

```bash
sha256sum prisma-internal.apk
```

Se espera exactamente:

```text
528e136194369d10aa8c5504f5623aab414a1b2f0726add54daeeb156fbf9f5e  prisma-internal.apk
```

El propietario ejecutó este flujo y reportó coincidencia exacta con el APK CI #64.

## Verificar e instalar

1. No instalar si el SHA-256 no coincide exactamente.
2. Desde **Mis archivos → Descargas**, tocar `prisma-internal.apk`.
3. Si Android bloquea la instalación, autorizar temporalmente a Mis archivos en Ajustes → Instalar apps desconocidas; instalar y retirar después ese permiso.
4. Abrir Prisma desde el launcher. Android puede mostrar una advertencia de instalación por origen externo; revisar que el archivo y el hash coincidan antes de aceptar.

No se necesita PC, cable USB ni ADB para esta ruta.

**Protección del único teléfono:** no ejecutar `pm clear`, `adb uninstall` ni `scripts/verify-android-backup-exclusions.sh` en el Galaxy A03. El script de BackupManager elimina datos y está reservado para emuladores/dispositivos desechables. No desinstalar Prisma como método de diagnóstico.

## Pruebas en el Galaxy A03

### Instalación e inicio

- La instalación termina con `Success`.
- Prisma abre sin cierre inesperado, bloqueo o pantalla en blanco.
- Descubrir es el destino inicial.
- Navegar entre Descubrir y Personal y abrir Ajustes → Apariencia.

### Navegación y estructura

- Personal muestra exactamente Historial, Pendientes, Ocultos y Gestionar listas, en una sola columna y en ese orden.
- Descubrir conserva el literal `Buscar...`, lupa a la izquierda y engranaje a la derecha.
- Los accesos de Personal son visuales en esta fase; no deben esperarse funciones de diario/listas aún no implementadas.

### Apariencia y persistencia

1. Abrir Ajustes → Apariencia y revisar el selector Obsidiana/Cuarzo.
2. Seleccionar Obsidiana y revisar contraste, iconos, barras del sistema y superficies.
3. Cerrar el proceso y abrirlo de nuevo:

```bash
adb shell am force-stop dev.elfast.prisma.internal
adb shell monkey -p dev.elfast.prisma.internal 1
```

4. Confirmar que Obsidiana persiste. Repetir con Cuarzo y confirmar persistencia. Alternar varias veces y comprobar que no queden colores mezclados.

### Pantalla, insets y estabilidad

- Revisar la interfaz en la pantalla real del A03 a su densidad/configuración habitual de 300 dpi.
- Comprobar que barra de estado, navegación, recortes y área segura no tapan textos ni controles.
- Cambiar varias veces entre Descubrir y Personal.
- Enviar Prisma al fondo, volver, bloquear/desbloquear y reiniciar el teléfono.
- Activar modo avión y recorrer las pantallas estructurales.
- Revisar que el uso no se vuelva inestable con 4 GB de RAM física; no contar la zRAM como RAM física adicional.
- Registrar si la interfaz se siente lenta, si hay recargas o cierres al volver del fondo y cuánto almacenamiento queda.

### Diagnóstico opcional

```bash
adb shell wm size
adb shell wm density
adb shell dumpsys meminfo dev.elfast.prisma.internal
adb logcat -c
adb shell monkey -p dev.elfast.prisma.internal 1
adb logcat -d -v time > prisma-a03-log.txt
```

Revisar los logs antes de compartirlos y eliminar datos personales.

## Qué demuestra y qué no demuestra este teléfono

- **Demuestra físicamente en Galaxy A03/API 33:** en sesiones sucesivas sobre el APK interno CI #129, el propietario confirmó el inicio en Descubrir, navegación Descubrir ↔ Personal, Ajustes mediante engranaje, alternancia/persistencia de Obsidiana/Cuarzo tras forzar el cierre, los cuatro accesos de Personal en una columna y su orden, texto exacto `Buscar...` con lupa izquierda y engranaje derecha, áreas seguras/insets, regreso desde Aplicaciones recientes, bloqueo/desbloqueo, reinicio del teléfono y recorrido estructural en modo avión. También observó aproximadamente **6 segundos** desde la reapertura en frío hasta ver Descubrir y aceptó ese comportamiento; es un tiempo observado por el propietario, no una medición instrumentada. No se hizo análisis frame a frame del splash. CI #119/#129 aporta la prueba automatizada de ventana amplia (1280×800 px, 160 dpi, ambos temas), que no sustituye una prueba física en tablet/plegable.
- **No demuestra compatibilidad física con Android 8/API 26.** Esa cobertura continúa en CI/emulador API 26 mientras no se disponga de hardware con ese sistema.
- API 33 permite probar reglas modernas de Android para cloud/device-transfer, pero no ejecuta la modalidad `cross-platform-transfer` introducida en Android 16 QPR2 o posterior.
- Sin un segundo teléfono no se puede completar una transferencia D2D entre dispositivos. La limitación se registra como pendiente independiente; no impide realizar las pruebas físicas básicas del A03.
- El ciclo de CI con `LocalTransport` no es un backup real de Google Drive y no debe confundirse con una migración OEM.

## Registro de resultados

**Primera sesión física: 2026-11-10 · Galaxy A03 SM-A035M · Termux, sin PC.**

| Comprobación | Resultado | Observaciones |
|---|---|---|
| Perfil Android 13 / API 33 / ABI arm64 | Confirmado por perfil del dispositivo | Perfil aportado por el propietario |
| APK presente en Descargas | Aprobado | `prisma-internal.apk`, mostrado por Termux como 14M |
| SHA-256 del APK coincide | Aprobado | Coincidencia exacta con CI #64 |
| Instalación e inicio | Aprobado | Prisma abre en el teléfono |
| Destino inicial Descubrir | Aprobado | Confirmado por el propietario |
| Descubrir ↔ Personal | Aprobado | Navegación cambia correctamente |
| Cuatro accesos de Personal y orden | Pendiente | No se verificó individualmente |
| Literal `Buscar...` e iconos | Pendiente | |
| Botón de Ajustes | Aprobado | Abre correctamente |
| Temas Obsidiana y Cuarzo (apariencia visual) | Aprobado | Ambos funcionan y se ven bien |
| Persistencia de cada tema tras cerrar/reabrir | Aprobado | Obsidiana y Cuarzo se conservaron al forzar la detención y volver a abrir la aplicación. |
| Insets y estabilidad prolongada | Pendiente | |
| Modo avión | Pendiente | |

La matriz refleja solo lo observado y reportado; las comprobaciones pendientes no se infieren como aprobadas. En sesiones posteriores registrar fecha/hora local de Panamá, espacio libre, incidencias y resultados adicionales.

## Criterio de cierre

El recorrido físico del A03 puede cerrar la aceptación de hardware real en API 33. La compatibilidad mínima `minSdk = 26` sigue respaldada por CI/emulador API 26; no se debe afirmar que el A03 la prueba. D2D entre teléfonos y la restauración desde una cuenta/servicio remoto continúan fuera de esta prueba.

## Instalación paralela de la corrección Cuarzo

La firma del APK de depuración generado por CI puede variar entre ejecuciones de GitHub Actions. Se compararon los certificados de las APK de CI #64 y CI #67 y son distintos; Android no permite actualizar una instalación con otra firma. Para proteger la aplicación ya instalada y sus datos, la corrección Cuarzo se construye como una variante paralela:

- Etiqueta visible: **Prisma · Corrección**.
- Identificador: `dev.elfast.prisma.internalfix`.
- No sustituye ni desinstala `dev.elfast.prisma.internal`.
- La app anterior permanece instalada para comparación y sus datos no se modifican.
- La variante paralela requiere su propia instalación y guarda sus preferencias de apariencia independientemente.

Instalar el APK paralelo desde **Mis archivos → Descargas**. Al ser un paquete distinto, Android lo instala como una segunda aplicación y no como actualización. No desinstalar la versión anterior durante esta validación.


## Firma estable para APK internas futuras

Las firmas de depuración automáticas de GitHub Actions pueden ser distintas entre ejecuciones porque cada runner genera su propio `debug.keystore`. Para permitir actualizaciones de la variante futura sin desinstalarla, CI usa ahora una clave fija **exclusiva de pruebas internas** (certificado SHA-256 `62:AB:A1:28:64:DE:F6:3A:02:F5:16:DC:AC:BB:7F:C6:FD:B5:AD:9E:80:2B:D9:37:13:DB:F4:98:FF:A4:A7:33`). Esta clave no se usa para producción ni para firmar una versión de distribución.

La nueva variante de validación del arranque usa:
- Etiqueta visible: **Prisma · Arranque**.
- Identificador: `dev.elfast.prisma.internalfix2`.
- Firma de depuración fija para que las próximas APK internas de esta variante puedan actualizarse en el mismo paquete.
- La versión original `dev.elfast.prisma.internal` y la prueba anterior `dev.elfast.prisma.internalfix` no se sustituyen ni se borran.


## Corrección de arranque sin tema provisional

Durante la prueba física de la variante `Prisma · Corrección`, el propietario observó que, al iniciar con Cuarzo guardado, aparecía Obsidiana brevemente y luego Cuarzo. El diagnóstico fue un valor inicial provisional de Obsidiana mientras DataStore leía la preferencia.

La corrección establece `themeMode = null` hasta la primera emisión de DataStore, no dibuja la aplicación mientras el tema no está disponible y usa `androidx.core:core-splashscreen` con `setKeepOnScreenCondition` para mantener la pantalla de inicio mientras se carga el dato. La API compat oficial es compatible desde API 23; el Galaxy A03 usa Android 13/API 33. El splash usa un fondo neutro Cuarzo claro y el primer frame de Prisma ya se dibuja con el tema restaurado.

Se añadió una prueba instrumentada `doesNotRenderAppUntilStoredThemeIsAvailable`, que comprueba que Descubrir no se dibuja con un valor provisional y que aparece con el color Cuarzo correcto después de la restauración. La validación física de que desapareció el parpadeo queda pendiente de probar la nueva APK en el Galaxy A03.


## Segunda sesión física — APK interno CI #129

**Fecha:** 2026-11-10 · **Dispositivo:** Samsung Galaxy A03 SM-A035M · Android 13/API 33.  
**Paquete probado:** `dev.elfast.prisma.internalfix2` · **Evidencia:** confirmación directa del propietario en esta conversación; no se adjuntaron capturas ni registros del sistema.

| Comprobación reportada | Resultado | Alcance de lo confirmado |
|---|---|---|
| 1. Entrar a Prisma | Aprobado | La aplicación abre en el Galaxy A03. |
| 2. Iniciar en Descubrir | Aprobado | Descubrir aparece como pantalla inicial. |
| 3. Cambiar entre Descubrir y Personal | Aprobado | La navegación entre ambas secciones funciona. |
| 4. Entrar a Ajustes con el icono del engranaje | Aprobado | El acceso desde el engranaje abre Ajustes. |
| 5. Cambiar entre Obsidiana y Cuarzo | Aprobado | El selector cambia correctamente entre ambos temas. |
| 6. Iniciar con cada tema después de Forzar cierre | Aprobado | Tras forzar el cierre y volver a abrir, se conserva el tema seleccionado. |
| 7. Personal: cuatro accesos en columna y en orden | Aprobado | Historial, Pendientes, Ocultos y Gestionar listas aparecen en una sola columna y en ese orden. |
| 8. Descubrir: texto y ubicación de iconos | Aprobado | El texto es exactamente `Buscar...`; lupa a la izquierda y engranaje a la derecha. |

**Cierre de la matriz física:** los puntos que quedaron pendientes en la segunda sesión se aprobaron en la tercera sesión detallada abajo: insets/áreas seguras, estabilidad funcional (Aplicaciones recientes, reapertura, bloqueo/desbloqueo y reinicio) y modo avión. No se reportó una incidencia visual del splash; no se realizó análisis frame a frame, por lo que no se afirma una medición específica del primer frame.



## Tercera sesión física — cierre de matriz en Galaxy A03

**Fecha:** 2026-11-10 · **Dispositivo:** Samsung Galaxy A03 SM-A035M · Android 13/API 33.  
**Paquete probado:** `dev.elfast.prisma.internalfix2` · **Evidencia:** confirmación directa del propietario en esta conversación; no se adjuntaron capturas ni registros del sistema.

| Comprobación reportada | Resultado | Alcance y detalle |
|---|---|---|
| 9. Áreas seguras e insets | Aprobado | El propietario confirma que las áreas seguras se ven correctamente en el teléfono. |
| 10. Estabilidad: recorrer las pantallas | Aprobado | Recorrido estructural completado sin incidencia reportada. |
| 11. Enviar Prisma al fondo y volver | Aprobado | Se aclaró como abrir la vista de Aplicaciones recientes, localizar la tarjeta de Prisma y volver a ella; el propietario confirmó que ese escenario funciona. |
| 12. Forzar cierre y volver a abrir | Aprobado | Descubrir aparece en aproximadamente **6 segundos**, tiempo observado y aceptado por el propietario; no es una medición instrumentada. |
| 13. Bloquear/desbloquear y reiniciar el teléfono | Aprobado | El propietario confirma el comportamiento correcto después de ambos escenarios. |
| 14. Modo avión | Aprobado | El propietario confirma el recorrido estructural en modo avión sin incidencia reportada. |

**Resultado:** matriz física de aceptación completada en el dispositivo disponible, Galaxy A03/API 33. La compatibilidad mínima API 26 continúa cubierta por CI/emulador; el comportamiento de targetSdk 37 y ventana amplia, por CI/API 37. No se afirma compatibilidad física con Android 8 ni con tablets/plegables. El tiempo de 6 segundos se registra como observación aceptada, sin convertirlo en SLA o benchmark.
