# Mandato obligatorio para agentes de IA — Prisma

## Autoridad del propietario

El propietario humano es la única autoridad del producto. La IA analiza, diseña, desarrolla, prueba y documenta; no aprueba por cuenta propia cambios de alcance. Una recomendación no es autorización. Las instrucciones más recientes y explícitas del propietario prevalecen sobre documentos antiguos.

«Continúa» permite seguir con el trabajo ya autorizado, pero no aprueba funciones nuevas ni saltarse una puerta de fase. No volver a preguntar decisiones que ya consten como aprobadas. No reintroducir funciones rechazadas.

## Plataforma y dirección aprobadas

- Prisma se desarrollará primero como PWA instalable en Android.
- `Prisma-Web` es el repositorio de migración y será el repositorio canónico cuando se complete el cambio de nombre.
- El antiguo repositorio Android no es la base de desarrollo futura. Sus documentos y decisiones útiles deben conservarse en el archivo histórico del repositorio nuevo.
- El teléfono es la fuente de verdad: los datos personales y el aprendizaje de Espectro permanecen localmente.
- No hay cuenta, backend propio, sincronización de nube, anuncios ni telemetría del comportamiento personal.
- El alcance inicial son películas; series y episodios siguen excluidos.
- Obsidiana y Cuarzo mantienen paridad funcional.

## Regla fundamental: primero los cimientos

**No crear código de la aplicación, pantallas, componentes de producto ni una PWA parcial antes de cerrar Fase 0.**

Fase 0 debe definir y sincronizar como mínimo:
1. Propósito, alcance, MVP, exclusiones y recorridos funcionales.
2. Arquitectura PWA y límites de las APIs del navegador.
3. Modelo de datos, persistencia, migraciones, cuota y almacenamiento.
4. Seguridad, credenciales, exportación/restauración y recuperación.
5. Origen HTTPS definitivo, alojamiento y estrategia de actualización.
6. Sistema de versiones, hitos, cambios y Releases.
7. Estructura del repositorio, proceso de trabajo, pruebas y criterios de aceptación.
8. Diseño visual heredado adaptado a unidades web sin cambiar decisiones aprobadas.
9. Roadmap coherente y puertas de aprobación.

Se puede investigar, auditar y documentar durante Fase 0. No se debe presentar un prototipo vacío como avance funcional.

## Entrega funcional obligatoria

- Desarrollar recorridos verticales completos: interfaz → estado → dominio → persistencia → actualización visible.
- Una función solo está implementada cuando el usuario puede completarla en el navegador instalado y comprobar el resultado después de cerrar y volver a abrir Prisma.
- Las pruebas y la CI son evidencia, no sustitutos del producto.
- Cada incremento debe entregar una capacidad utilizable; no encadenar scaffolding, abstracciones o rondas de tests sin una función terminada.
- Comprobar Obsidiana y Cuarzo en cada recorrido.
- No declarar que algo funciona offline sin probar modo avión, reinicio del navegador y reapertura de la PWA.
- No afirmar persistencia garantizada: verificar el resultado de `navigator.storage.persist()` y comunicar sus límites.
- No permitir que una limpieza automática elimine historial, visionados, calificaciones o listas.

## Calidad y seguridad

Revisar arquitectura, duplicación, estado, accesibilidad, compatibilidad móvil, rendimiento, dependencias, almacenamiento, seguridad, migraciones, funcionamiento offline y recuperación. Clasificar hallazgos: P0 (seguridad/pérdida de datos), P1 (bloqueo funcional), P2 (mantenibilidad importante), P3 (pulido). No cerrar un hito con P0/P1 abiertos.

No exponer tokens, credenciales, datos del diario ni copias descifradas en logs, artefactos públicos, errores o telemetría. No incluir scripts externos innecesarios. Aplicar CSP estricta y dependencias fijadas.

## Versionado: no incrementar por actividad interna

La política completa está en `docs/TECNICO/VERSIONADO.md`. Reglas esenciales:
- La versión pública solo cambia al completar y aceptar un hito funcional o al publicar una corrección real.
- Documentación, refactors, pruebas, cambios de CI y builds internos no incrementan la versión de producto.
- No crear números de versión para aparentar progreso.
- Cada Release necesita changelog en español, lista de funciones realmente utilizables, pruebas/evidencias, riesgos conocidos y notas de datos/migración.
- `1.0.0` requiere completar el alcance aprobado de la versión completa.

## Reglas del repositorio

Antes de editar, recuperar el contenido actual y el SHA del archivo. No sobrescribir cambios concurrentes. Mantener ramas y commits recuperables. No borrar el repositorio Android anterior hasta verificar en el nuevo la presencia e integridad de los requisitos, diseños, licencias y decisiones que deben conservarse.

## Procedimiento al iniciar una tarea

1. Leer este archivo y `docs/CONTEXTO_IA.md`.
2. Comprobar repositorio, rama, commit y estado real.
3. Consultar requisitos, roadmap y diseño técnico aplicables.
4. Identificar qué está aprobado, qué está autorizado, qué es propuesta y qué está pendiente.
5. Trabajar dentro de la fase aprobada sin pedir autorización para cada paso técnico rutinario.
6. Registrar decisiones y actualizar las fuentes de verdad afectadas.
7. Entregar resultados verificables y describir lo que el usuario ya puede hacer.
