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

## Verificación en el teléfono

Una prueba de escritorio no sustituye comprobar en el teléfono Android:
- tamaño y controles táctiles;
- navegación y regreso;
- temas que hayan sido aprobados;
- persistencia tras cerrar y abrir;
- modo avión cuando aplique;
- comportamiento con red lenta o interrumpida.

## Automatización

Se puede usar CI gratuita del repositorio público para formato, lint, comprobación de tipos, pruebas focalizadas y build. El workflow debe ser pequeño, útil y rápido.

No crear workflows que repitan el mismo trabajo. No usar runners de pago, servicios externos de test de pago, artefactos innecesarios ni cuotas que puedan generar cargos.

## Criterio de aceptación

Cada entrega debe decir qué puede hacer ahora el usuario, cómo se probó y en qué dispositivo/navegador, qué casos offline se verificaron, qué límites conocidos quedan y si hubo cambios de datos o recuperación.

No afirmar que una función está probada si solo pasó CI o se inspeccionó el código.
