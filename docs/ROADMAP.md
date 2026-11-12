# Plan de trabajo — Prisma

**Estado:** fundamentos por replantear.  
**Regla:** no comenzar el código de producto hasta resolver y aprobar los fundamentos necesarios.

Este plan no usa IDs de fase/hito ni asigna números a funciones futuras. El orden puede ajustarse según lo que desbloquee una aplicación utilizable.

## Cerrar los fundamentos

- [ ] Definir el primer recorrido útil que Prisma debe resolver de principio a fin.
- [ ] Revisar el alcance inicial y retirar funciones que no sean necesarias para esa primera experiencia.
- [ ] Revisar el diseño heredado en contexto PWA; aprobar solo lo que funcione bien en pantalla y navegación web.
- [ ] Elegir el stack más simple que cubra el producto, comparando alternativas y evitando dependencias innecesarias.
- [ ] Definir el almacenamiento local, las reglas de integridad y cómo recuperar los datos si el navegador los elimina.
- [ ] Definir una copia de seguridad cifrada viable para el teléfono, sin fijar algoritmos ni parámetros antes de medirlos y revisarlos.
- [ ] Elegir un alojamiento que cueste 0 USD, no requiera plan de pago ni facturación automática, y fijar el origen HTTPS antes de guardar datos reales.
- [ ] Definir una actualización de PWA que no interrumpa operaciones ni mezcle archivos incompatibles.
- [ ] Acordar las pruebas concretas del primer recorrido y la aceptación en el teléfono.
- [ ] Confirmar que el propietario aprueba empezar a desarrollar.

Esta lista es una puerta de entrada, no un proyecto documental paralelo. Si una decisión puede tomarse de forma segura cuando se implemente una función, no se debe especular ahora.

## Construir una primera experiencia realmente utilizable

Después de cerrar los fundamentos:
- implementar el recorrido inicial elegido por el propietario, de extremo a extremo;
- guardar datos reales y comprobarlos al cerrar y reabrir la PWA;
- completar estados vacíos, errores y recuperación del mismo recorrido;
- verificarlo en el dispositivo Android;
- no añadir navegación o controles que aún no tengan una función real.

La primera entrega no se declarará lista por tener un shell, un conjunto de pantallas o un backend inexistente. Debe resolver una necesidad real de forma consistente.

## Completar el alcance acordado

Una vez que la primera experiencia sea estable, añadir capacidades por prioridad y valor para el usuario. No se fija hoy una secuencia rígida de versiones para características que todavía no se han revalidado.

Historial, Pendientes, listas, TMDB, estadísticas, Espectro y Descubrir avanzado son capacidades candidatas a revisar, no obligaciones automáticas del nuevo desarrollo.

## Criterio para cerrar una entrega

Una entrega está lista cuando:
- el usuario puede completar lo anunciado desde la aplicación;
- los datos quedan guardados y se recuperan tras cerrar y abrir;
- los errores no destruyen información;
- funciona en el teléfono y en los temas que hayan sido aprobados;
- el modo offline se ha comprobado cuando sea parte del comportamiento anunciado;
- las pruebas relevantes pasan y no hay defectos graves abiertos;
- las notas explican qué puede hacer el usuario y qué límites quedan.

No se cierra una entrega por commits, tests aislados, cambios de documentación o pipelines verdes.
