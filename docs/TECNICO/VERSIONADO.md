# Versionado semántico — Prisma

**Estándar:** Semantic Versioning 2.0.0 (SemVer).  
**Formato normal:** `MAYOR.MENOR.PARCHE` (`MAJOR.MINOR.PATCH`).  
**Estado:** política aprobada por el propietario.

## 1. Regla oficial

Prisma sigue SemVer:

- **MAYOR:** se incrementa cuando cambia de forma incompatible el contrato público de Prisma.
- **MENOR:** se incrementa cuando se añade funcionalidad compatible con las versiones anteriores.
- **PARCHE:** se incrementa cuando se corrigen errores de forma compatible, sin introducir funcionalidad nueva incompatible.

Ejemplos de formato: `1.4.2`, `2.0.0`, `2.1.0`.

Los números son enteros no negativos, sin ceros iniciales. Al incrementar MAYOR se reinician MENOR y PARCHE a cero; al incrementar MENOR se reinicia PARCHE a cero. No se modifica el contenido de una versión ya publicada: cualquier cambio posterior recibe otro número.

Referencia normativa: [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

## 2. Qué constituye el contrato público de Prisma

Prisma no es solamente una biblioteca con una API HTTP. Su contrato público incluye las capacidades y comportamientos en los que el usuario confía:

- los recorridos y funciones anunciados;
- la conservación e interpretación de películas, visionados, listas y preferencias;
- la compatibilidad de los datos locales y de las copias exportadas;
- el proceso de actualización y recuperación;
- cualquier formato de importación/exportación documentado;
- integraciones o interfaces que se declaren compatibles públicamente.

Antes de decidir el incremento, se debe evaluar el efecto real en usuarios y datos, no solo el tipo de cambio interno.

## 3. Criterios específicos de Prisma

### MAYOR — cambio incompatible

Usar MAYOR cuando una actualización rompa compatibilidad con el contrato público, por ejemplo:
- un formato de copia deja de poder restaurarse sin una conversión obligatoria;
- una estructura o semántica de datos requiere una migración incompatible que no puede hacerse automáticamente y de forma segura;
- cambia de forma incompatible un comportamiento previamente prometido;
- se retira o reemplaza una capacidad pública y los usuarios deben modificar su forma de uso.

Un cambio de MAYOR debe incluir plan de migración, copia de seguridad, instrucciones y ruta de recuperación. Nunca justifica perder datos personales.

### MENOR — función nueva compatible

Usar MENOR cuando se añada una capacidad visible que sea compatible con el contrato y los datos existentes. Puede incluir cambios internos de arquitectura, almacenamiento o interfaz siempre que no rompan compatibilidad.

### PARCHE — corrección compatible

Usar PARCHE para corregir defectos, seguridad, accesibilidad, estabilidad o rendimiento sin cambiar de forma incompatible el contrato público. Una mejora interna de rendimiento puede ser PARCHE si no altera la funcionalidad prometida.

## 4. Desarrollo inicial: 0.y.z

Mientras Prisma esté en desarrollo inicial, se utilizará `0.MENOR.PARCHE`:

- MAYOR permanece en cero;
- MENOR representa una entrega funcional compatible que amplía el producto;
- PARCHE corrige una entrega ya publicada.

SemVer señala que durante `0.y.z` el contrato aún no se considera estable. Aun así, Prisma debe proteger los datos desde la primera versión que los almacene. La condición de desarrollo inicial nunca permite migraciones destructivas, pérdida de historial ni restauraciones inseguras.

No se establece hoy cuál será el número de la primera publicación. Se elegirá cuando exista una entrega real y aceptada.

## 5. Preversiones y metadatos

SemVer permite sufijos de pre-release, por ejemplo `0.3.0-alpha.1`, `0.3.0-beta.1` y `0.3.0-rc.1`. Solo se utilizarán cuando exista un propósito concreto de distribución y validación previa a la publicación estable.

- No crear alpha/beta/rc como medallas de actividad.
- No asignar números de pre-release por cada commit o build.
- No publicar candidatos que aparenten ser aptos para datos reales si no han superado la validación exigida.
- El metadato de build, si se usa, no sustituye al número SemVer y no determina precedencia.

## 6. Qué no incrementa la versión pública

No se incrementa por:
- commits, ramas, Pull Requests o merges;
- documentación o cambios de roadmap;
- refactors o reorganización interna sin cambio contractual;
- CI, pruebas o builds;
- despliegues de preview;
- actualización de dependencias sin cambio funcional relevante.

Los builds internos se identifican por SHA de Git, entorno y fecha. Las versiones de esquema local, formato de copia y algoritmos internos son identificadores técnicos separados; se mantienen coordinados mediante migraciones, pero no se confunden con SemVer.

## 7. Puerta de publicación

Una versión pública solo se etiqueta y publica cuando:
1. la funcionalidad anunciada está completa y conectada de extremo a extremo;
2. el comportamiento se comprueba en Chrome Android y en el dispositivo real de validación;
3. los datos existentes sobreviven a actualización, cierre y reapertura;
4. las migraciones y copias afectadas se verifican sin sobrescribir información ante un fallo;
5. el modo offline se verifica cuando el comportamiento lo exige;
6. seguridad, privacidad, accesibilidad y rendimiento cumplen los criterios aprobados;
7. no quedan defectos críticos o bloqueantes;
8. las notas explican lo que realmente cambia, compatibilidad, migraciones y límites;
9. el propietario acepta expresamente la publicación.

La CI es evidencia auxiliar; por sí sola no autoriza una Release.

## 8. Versiones y roadmap

No se crea un mapa numérico futuro. El roadmap describe capacidades y prioridades sin reservar de antemano `0.1.0`, `0.2.0`, etc. La versión se calcula al cerrar cada entrega según su impacto real de compatibilidad.

El orden de los números refleja el producto publicado, no el volumen de trabajo del repositorio.

## 9. Alcance de 1.0.0

`1.0.0` indica que Prisma declara estable el contrato público de su primera generación: los recorridos esenciales, la persistencia, las copias, las actualizaciones y la compatibilidad están definidos y validados.

No se retrasa `1.0.0` para incluir automáticamente toda idea futura. Tampoco se publica solo por antigüedad. El alcance exacto se define con el propietario cuando se conozca el producto realmente construido y sus garantías.

## 10. Historial de versiones

Cada Release debe registrar:
- versión SemVer y fecha;
- capacidades y correcciones realmente entregadas;
- compatibilidad y cambios de datos;
- migraciones y restauración aplicables;
- pruebas y dispositivos/navegadores efectivamente utilizados;
- problemas conocidos, limitaciones y pasos de recuperación.

La regla que justifica el número debe poder explicarse con claridad: **qué cambió para el usuario y por qué ese cambio conserva o rompe compatibilidad**.
