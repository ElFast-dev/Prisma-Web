# Registro de decisiones — Prisma

**Última revisión:** 12 de noviembre de 2026.

Este registro contiene decisiones expresas del propietario y propuestas claramente separadas. Los documentos antiguos no convierten una propuesta en decisión.

## Decisiones expresas del propietario

| ID | Decisión | Estado |
|---|---|---|
| P-001 | Prisma se prepara primero como PWA para uso principal en Android. | Aprobada |
| P-002 | `ElFast-dev/Prisma-Web` será la base del nuevo proyecto; el repositorio anterior se retirará y el nuevo se renombrará a `Prisma`. | Aprobada; falta acción administrativa |
| P-003 | Primero se completan los fundamentos necesarios; después se comienza la aplicación. | Aprobada |
| P-004 | El avance y las versiones públicas deben representar capacidades funcionales reales y respetar compatibilidad. | Aprobada |
| P-005 | Prisma no debe generar ningún gasto para el propietario: objetivo permanente de 0 USD. | Aprobada |
| P-006 | Cloudflare Pages no se utilizará como alojamiento de Prisma. | Rechazada expresamente |
| P-007 | Prisma utilizará Semantic Versioning 2.0 en formato MAYOR.MENOR.PARCHE. | Aprobada |
| P-008 | No se elegirán tecnologías básicas por comodidad: se evaluarán opciones de alta calidad y se escogerá la mejor solución demostrable dentro del coste de 0 USD. | Aprobada |
| P-009 | El asistente puede preguntar dudas y sugerir mejoras para Prisma, siempre de una pregunta por turno y sin ciclos interminables; las decisiones de interfaz importantes se validan con el propietario. | Aprobada |

## Material heredado

Los documentos, ramas, procesos y diseños del repositorio Android se conservan para consulta histórica. No se consideran decisiones vigentes hasta que el propietario los confirme o se demuestre su utilidad y se apruebe su adaptación.

Los requisitos y recursos visuales migrados son candidatos a revalidar, no aprobaciones web automáticas.

## Propuestas técnicas abiertas

| ID | Propuesta | Estado |
|---|---|---|
| T-001 | React + TypeScript + Vite y otras opciones de primer nivel. | Candidatas; comparar con criterios de calidad y pruebas, sin preferencia automática por soluciones básicas |
| T-002 | IndexedDB, bibliotecas de datos, OPFS y opciones SQLite/WASM para datos locales. | Comparar por integridad, rendimiento, migraciones, cuota, seguridad y coste; no elegir por ser la opción básica |
| T-003 | Cache Storage para shell e imágenes reconstruibles. | Candidata; nunca será la única copia de datos personales |
| T-004 | Web Workers, OPFS o WebAssembly. | Evaluar como candidatas serias y elegir según benchmarks y calidad; no incluir ni descartar por prejuicio |
| T-005 | GitHub Pages desde el repositorio público. | Candidato de 0 USD; pendiente evaluar límites y origen compartido |
| T-006 | Actualización PWA controlada. | Candidata; especificar lo necesario para proteger datos y operaciones |
| T-007 | Definir con precisión el contrato público y la compatibilidad de los datos antes de la primera publicación. | Pendiente; SemVer 2.0 ya está aprobado |
| T-008 | Cifrado de copias con KDF y AES-GCM. | Requiere comparación, benchmark y revisión antes de elegir algoritmo y parámetros |
| T-009 | Svelte 5 + SvelteKit 3 + adapter-static (con React 19.3 + React Router 8.5 como comparación obligatoria). | Candidata preferente para prototipo; no aprobada hasta comparar en Android real |

## Decisiones retiradas

- Cloudflare Pages como opción principal o recomendada.
- La asignación anticipada de números SemVer a fases o funciones futuras. SemVer sí se mantiene como sistema oficial.
- Los IDs de fase-hito como medida del avance del producto.
- La asunción de que los diseños Android son especificaciones finales para la PWA.
- La aprobación automática de React, Vite, Argon2id, Workers u OPFS.

## Pendientes que bloquean el inicio del código

1. Aprobar el primer recorrido útil y su alcance.
2. Comparar las mejores opciones tecnológicas y resolver los límites reales del navegador.
3. Aprobar persistencia local, recuperación y formato de copia.
4. Seleccionar un origen HTTPS de 0 USD, sin obligación de pagar.
5. Revalidar el diseño visual de ese recorrido.
6. Aprobar el plan de validación adecuado al riesgo y aceptar el inicio del desarrollo.

Las decisiones menores pueden tomarse cuando el recorrido que las necesita esté en desarrollo, siempre que no cambien el alcance, el coste, la privacidad ni la integridad de los datos.
