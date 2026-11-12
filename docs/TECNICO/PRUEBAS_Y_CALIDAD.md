# Pruebas y aceptación — Prisma

**Estado:** criterios mínimos; se ajustarán al primer recorrido aprobado.

## Principio

Las pruebas deben demostrar que una función real funciona y proteger los datos. No se construirá una infraestructura de pruebas más compleja que el producto ni se perseguirá cobertura por sí misma.

## Pruebas necesarias por tipo de cambio

- **Reglas de producto:** casos normales, límites y errores que afecten directamente al recorrido.
- **Persistencia:** escritura, lectura, cierre/reapertura y fallo de transacción cuando se modifiquen datos.
- **Copias y recuperación:** contraseña incorrecta, archivo alterado, importación incompleta y garantía de que un fallo no sobrescribe datos existentes.
- **PWA:** instalación y apertura en Chrome Android; offline si la función lo promete; actualización cuando cambie el shell o los datos.
- **Seguridad:** comprobar que no se filtran datos personales ni credenciales y que los datos sensibles no aparecen en logs.

No ejecutar todas las capas para cualquier cambio menor. Elegir pruebas según el riesgo real.

## Rendimiento y selección de calidad

Cuando la decisión técnica pueda afectar la experiencia, se comparan alternativas y se mide su efecto en el teléfono Android real: fluidez, latencia, memoria, consumo, tamaño de descarga, carga inicial y comportamiento offline. No se acepta una elección por costumbre ni se sustituye una evaluación por popularidad. Tampoco se selecciona la opción más básica solo para reducir tiempo inicial: la elegida debe demostrar que ofrece la mejor calidad global disponible dentro de la condición de coste cero.

La calidad no se demuestra acumulando herramientas o pruebas genéricas. Se demuestra con resultados medidos, recorridos reales y ausencia de regresiones en privacidad, accesibilidad y datos.

## Verificación en el teléfono

Una prueba de escritorio no sustituye comprobar en el teléfono Android:
- tamaño y controles táctiles;
- navegación y regreso;
- temas que hayan sido aprobados;
- persistencia tras cerrar y abrir;
- modo avión cuando aplique;
- comportamiento con red lenta o interrumpida.

## Automatización

Se puede usar CI gratuita del repositorio público para formato, lint, comprobación de tipos, pruebas focalizadas y build. El workflow debe ser fiable, rápido y proporcional al riesgo; no se reduce calidad para ahorrar unos pasos si estos evitan errores reales.

No crear workflows que repitan el mismo trabajo. No usar runners de pago, servicios externos de test de pago, artefactos innecesarios ni cuotas que puedan generar cargos.

## Criterio de aceptación

Cada entrega debe decir qué puede hacer ahora el usuario, cómo se probó y en qué dispositivo/navegador, qué casos offline se verificaron, qué límites conocidos quedan y si hubo cambios de datos o recuperación.

No afirmar que una función está probada si solo pasó CI o se inspeccionó el código.


## Pruebas específicas del primer recorrido

Datos de prueba sintéticos; no usar información personal real durante la selección técnica.

- 1,000 y 10,000 películas; 1, 3 y 10 visionados por película.
- Registrar dos visionados de la misma película y comprobar que ambos sobreviven a cierre/reapertura.
- Asignar/modificar una nota y comprobar que solo cambia el visionado seleccionado.
- Probar calificación provisional y su transferencia atómica al siguiente visionado.
- Probar fecha de día completo sin hora, instante exacto, cambio de zona horaria y hora estimada por duración.
- Forzar errores de cuota y fallo de transacción; no confirmar cambios parciales.
- Cerrar la PWA durante operaciones, reabrir y comprobar consistencia.
- Abrir dos pestañas/PWA simultáneas y comprobar ausencia de corrupción o bloqueos silenciosos.
- Exportar, restaurar en una base de prueba limpia y comparar conteos/identidades; probar contraseña errónea y archivo alterado.
- Repetir el recorrido sin conexión y con red interrumpida.

Para la comparativa de framework, mantener idéntico diseño/flujo entre las dos muestras. Medir build estático, carga inicial, tiempo de interacción, fluidez, tamaño comprimido, memoria y navegación en el teléfono Android objetivo. No declarar una elección como verificada en Android hasta ejecutar las pruebas en un dispositivo real.
