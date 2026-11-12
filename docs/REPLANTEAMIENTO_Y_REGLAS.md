# Replanteamiento de fundamentos — Prisma

**Estado:** criterio rector vigente.  
**Propósito:** evitar que Prisma repita el estancamiento del proyecto anterior.

## 1. Lo que sí está confirmado

- El repositorio nuevo será la base del trabajo y terminará llamándose `Prisma`.
- Prisma se está planteando como una PWA para el uso principal en Android.
- Primero se cierran los fundamentos imprescindibles; después se programa.
- El avance se mide por capacidades reales que se pueden usar, no por actividad interna.
- El coste total para el propietario debe ser **0 USD**.

Estas directrices prevalecen sobre cualquier documento anterior.

## 2. Lo que no se hereda automáticamente

El antiguo repositorio Android se conserva únicamente como archivo de consulta. No es una plantilla, especificación obligatoria ni lista de tareas.

Se deben volver a evaluar antes de reutilizar:
- arquitectura, organización de carpetas y selección de tecnologías;
- procesos de desarrollo, CI y pruebas;
- roadmap, etapas, hitos y sistema de versiones;
- modelo de datos, almacenamiento, cifrado y copias;
- navegación, pantallas, medidas, componentes, iconos y demás recursos visuales;
- cualquier decisión técnica que solo se hubiera justificado para Android nativo.

Las propuestas creadas durante la preparación de Prisma-Web tampoco quedan aprobadas por estar escritas. React, Vite, IndexedDB, Workers, OPFS, Argon2id y cualquier otra tecnología siguen siendo opciones que deben compararse y justificarse. Esta regla se aplica también a algoritmos, almacenamiento, cifrado, motores de búsqueda, bibliotecas, herramientas de pruebas, diseño de interfaz y servicios de publicación. No se elige una herramienta por inercia ni por ser la opción más básica.

El material heredado se clasifica así:
1. **Confirmado por el propietario:** instrucción expresa y vigente.
2. **Propuesta:** alternativa pendiente de revisión o aprobación.
3. **Histórico:** dato útil para entender lo anterior, sin autoridad para dirigir el desarrollo.

## 3. Regla absoluta de coste cero

Prisma no puede depender de pagos del propietario. Quedan fuera:
- suscripciones, planes Pro, dominios comprados y servicios de pago;
- funciones esenciales que solo existan en un nivel de pago;
- consumo variable que pueda producir cargos;
- renovaciones, pruebas gratuitas que después cobren o facturación automática.

Antes de recomendar un servicio hay que comprobar el precio, las cuotas gratuitas, qué ocurre al agotarlas, si exige tarjeta y si puede generar un cargo. No se añade un método de pago para mantener Prisma funcionando.

Una alternativa gratuita no es válida solo porque su precio inicial sea 0: si el funcionamiento esencial obliga a subir de plan, queda descartada. Cuando una cuota pueda interrumpir el servicio, se documenta el riesgo. No se oculta ni se supone que el propietario aceptará pagar para resolverlo.

Cloudflare Pages queda **rechazado** como opción de alojamiento para Prisma por instrucción del propietario. No volver a recomendarlo como decisión pendiente.

## Consultas y mejoras sin ciclos infinitos

- Se puede y se debe consultar al propietario cuando una duda afecte de forma material al producto, la experiencia, los datos, la privacidad, el coste o la identidad visual.
- Hacer **una sola pregunta por turno**. No agrupar preguntas independientes ni presentar formularios largos. Preguntar únicamente lo necesario para desbloquear el siguiente paso.
- Antes de preguntar, revisar el contexto y los documentos para no repetir cuestiones ya contestadas. Si la respuesta puede inferirse con seguridad o la decisión es reversible y técnica, avanzar con una recomendación razonada.
- Acompañar las dudas importantes con una recomendación concreta cuando exista una opción claramente superior; explicar brevemente el beneficio y el sacrificio relevante, sin convertir cada decisión en una lista interminable de alternativas.
- Sugerir mejoras solo cuando aporten valor real a Prisma: mejor experiencia, calidad, seguridad, accesibilidad, rendimiento o coherencia. No proponer cambios por novedad, moda ni para mantener una conversación artificialmente abierta.
- Para una misma decisión, limitar el proceso a **dos rondas de aclaración/refinamiento**. Después, presentar la recomendación mejor sustentada y dejar la decisión concreta pendiente del propietario si necesita su aprobación. No insistir ni reabrir el tema salvo que aparezca evidencia nueva o el propietario lo solicite.
- Si una decisión no es bloqueante, registrarla como pendiente y continuar con el trabajo independiente. No detener todo Prisma por preferencias menores.
- Las decisiones de interfaz deben buscar que Prisma se vea y se comporte como el propietario desea. Antes de implementar una composición importante, mostrar una propuesta visual concreta y solicitar su opinión con una pregunta cada vez. Convertirla en diseño definitivo solo tras su aprobación; luego desarrollar y ajustar mediante iteraciones acotadas, no infinitas.
- No empezar una nueva ronda de diseño solo por gusto del agente. Cada revisión debe responder a una observación concreta del propietario o a un problema de usabilidad, accesibilidad o calidad verificable.

## 4. Evitar el estancamiento

- Mantener pocos documentos activos y evitar duplicar la misma decisión en varios archivos.
- Documentar una decisión cuando realmente desbloquee trabajo; no redactar planes detallados de funciones lejanas.
- No crear scaffolding, capas, abstracciones, componentes vacíos ni infraestructura sin una necesidad real; tampoco sacrificar calidad usando soluciones básicas sin demostrar que son la mejor opción para el caso.
- No encadenar tareas internas que no acerquen a una capacidad utilizable.
- Completar un recorrido de usuario de extremo a extremo antes de ampliar el alcance.
- Las pruebas deben proteger ese recorrido y los datos; no convertirse en un proyecto separado.
- Si una tarea no termina en una decisión necesaria o una capacidad verificable, cuestionar si debe hacerse ahora.

## 5. Fundamentos mínimos antes de programar

Antes del primer código de producto deben quedar resueltos y aceptados:
1. Qué problema resuelve Prisma y cuál será el primer recorrido realmente útil.
2. Qué funciones entran en la primera entrega y cuáles quedan fuera.
3. Qué diseño y comportamientos se mantienen después de revisarlos para web.
4. Qué tecnología de mayor calidad resuelve el producto; se comparan las opciones punteras y no se recurre a herramientas básicas por comodidad.
5. Cómo se guardan, protegen, exportan y recuperan los datos locales.
6. Qué límites reales tiene la PWA en Android y cómo se informan al usuario.
7. Cómo se publica por 0 USD y cuál será el origen HTTPS estable.
8. Cómo se actualiza Prisma sin interrumpir operaciones ni perder datos.
9. Qué pruebas concretas demuestran que el primer recorrido funciona.
10. Qué significa considerar la primera entrega utilizable y quién la acepta.

No hace falta diseñar desde ahora cada detalle de funciones futuras. Los fundamentos deben ser suficientes para empezar bien, no una excusa para aplazar indefinidamente el desarrollo.

## 6. Cómo se considera progreso

El avance se describe con resultados que el propietario puede comprobar: «ahora puedo hacer X; el resultado queda guardado; cierro y vuelvo a abrir Prisma y sigue ahí».

Un commit, documento, build, prueba automatizada, pantalla estática o CI verde no equivale por sí solo a una capacidad terminada.

## 7. Identificación de entregas

Se adopta SemVer 2.0 en formato MAYOR.MENOR.PARCHE, según [Versionado semántico](TECNICO/VERSIONADO.md). No se asignan versiones por adelantado a fases ni funciones futuras. MAYOR indica cambios incompatibles, MENOR nuevas capacidades compatibles y PARCHE correcciones compatibles. Los cambios internos se identifican por commit.
