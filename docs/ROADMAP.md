# Roadmap — Prisma Web

**Estado:** Fase 0 — fundamentos y migración documental.  
**Fecha:** 12 de noviembre de 2026.  
**No hay implementación de aplicación autorizada hasta cerrar Fase 0.**

## Reglas de fases

- Cada fase tiene objetivo, alcance, exclusiones, entregables, dependencias y criterios de aceptación.
- Cerrar una fase no autoriza automáticamente a iniciar la siguiente.
- No implementar fases futuras por anticipado.
- La salida de fase requiere criterios P0/P1 verificados, documentos sincronizados, pendientes P2/P3 registrados y aprobación expresa del propietario.
- La evidencia se expresa por recorridos utilizables, no por commits, pantallas vacías o tests aislados.

## Fase 0 — Cimientos de Prisma Web

**Estado:** EN CURSO.  
**Objetivo:** resolver todas las decisiones estructurales antes de construir la aplicación.

Entregables:
1. Migración documental segura desde el repositorio Android.
2. Mandato de agentes y contexto actualizados a PWA.
3. Propósito, alcance, MVP, exclusiones y 1.0.0 sincronizados.
4. Arquitectura PWA, estructura modular y estrategia offline.
5. Diseño de datos, IndexedDB, cachés, cuotas y migraciones.
6. Seguridad web, token TMDB, exportación cifrada y restauración.
7. Elección del hosting y origen HTTPS canónico estable.
8. Política de actualizaciones PWA.
9. Sistema de versionado con hitos funcionales y evidencia de Releases.
10. Diseño visual heredado adaptado a CSS/responsive.
11. Plan de pruebas reales para el teléfono.
12. Plan de mantenimiento de dependencias y CI estática.

**Exclusiones:** no crear React app, pantallas, componentes, Service Worker productivo, esquema de base de datos en código ni funcionalidades del diario.

**Criterios de cierre:** cada documento está completo y coherente; los conflictos con la plataforma Android están resueltos; origen y hosting están elegidos; versionado aprobado; plan de almacenamiento/copia/seguridad revisado; roadmap y criterios aprobados por el propietario.

## Fase 1 — Base PWA instalable

**Objetivo:** tener una PWA que se instala, abre rápidamente, muestra Obsidiana/Cuarzo y puede abrir su shell sin conexión. Preparar diagnósticos de almacenamiento y actualización controlada.

**No incluye:** funciones del diario simuladas ni botones sin destino.

**Entregable:** primer artefacto web de prueba desplegable en el origen definitivo. No asigna versión pública de producto por sí mismo.

## Fase 2 — Diario local utilizable

**Objetivo:** entregar el primer recorrido que sirve para el día a día, sin depender de TMDB: alta manual, Pendientes, Historial, visionados repetidos, fecha y calificación, Ocultos/restauración, listas básicas, búsqueda local, persistencia y copias cifradas.

**Hito objetivo propuesto:** `0.1.0`.

**Criterio:** el propietario completa el recorrido en su teléfono, cierra y reabre Prisma, activa modo avión, exporta la copia y la restaura.

## Fase 3 — Catálogo TMDB esencial

**Objetivo:** configurar token, buscar, resolver coincidencias, enriquecer fichas y almacenar metadatos/imágenes localmente sin enviar el diario.

**Hito objetivo propuesto:** `0.2.0`. Cierra el MVP cuando se cumplan todos los criterios de requisitos.

## Fase 4 — Colecciones avanzadas

**Objetivo:** implementar únicamente las decisiones aprobadas para gestión avanzada de listas y organización.

**Hito objetivo propuesto:** `0.3.0`.

## Fase 5 — Experiencia cinematográfica completa

**Objetivo:** Descubrir avanzado, ficha ampliada, créditos, tráileres, colecciones, películas relacionadas y disponibilidad cuando existan datos válidos.

**Hito objetivo propuesto:** `0.4.0`.

## Fase 6 — Estadísticas

**Objetivo:** comprensión de gustos y evolución, con cálculos reproducibles y explicaciones sustentadas en datos locales.

**Hito objetivo propuesto:** `0.5.0`.

## Fase 7 — Espectro

**Objetivo:** aprendizaje local, recomendaciones, modos y explicaciones con evidencia, control de muestras pequeñas y confianza.

**Hito objetivo propuesto:** `0.6.0`.

## Fase 8 — Actualizaciones y cierre de Prisma 1.0.0

**Objetivo:** historial de versiones, aviso y aplicación controlada de actualizaciones PWA, regresión integral, seguridad, accesibilidad, rendimiento, restauración, migraciones y cierre de todo el alcance aprobado.

**Hito objetivo propuesto:** `0.7.0` para la experiencia de versiones si constituye una entrega visible; `1.0.0` únicamente para el producto completo aceptado.

## Estado de aprobaciones

La dirección PWA, el uso de Prisma-Web como repositorio principal, la eliminación eventual del repositorio anterior y el principio de versionado funcional proceden de instrucciones expresas del propietario. Los detalles de hosting/origen y el mapa numérico de hitos son propuestas y requieren aprobación antes de quedar congelados.
