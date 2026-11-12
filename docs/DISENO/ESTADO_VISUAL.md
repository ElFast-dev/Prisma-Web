# Estado visual — Prisma Web

**Estado:** especificación visual adaptada a PWA.  
**Fecha de migración:** 12 de noviembre de 2026.

Este documento es la referencia visual activa para la futura aplicación web. Conserva las decisiones aprobadas por el propietario en la etapa Android, adaptadas a CSS responsive. El registro original, más extenso, se conserva íntegro en [ESTADO_VISUAL_ANDROID.md](../ARCHIVO/ANDROID/ESTADO_VISUAL_ANDROID.md).

**Importante:** las aprobaciones visuales no significan que la interfaz esté implementada. Actualmente Prisma no tiene componentes ni pantallas web.

## 1. Identidad visual

- Inter es la familia tipográfica global. Debe auto-hospedarse en el build para que la interfaz esté disponible offline y no dependa de Google Fonts en tiempo de ejecución.
- Pesos aprobados: 400, 500 y 600.
- Temas: **Obsidiana** (oscuro) y **Cuarzo** (claro), con igual prioridad y paridad funcional.
- Estilo general: cinematográfico, minimalista, limpio y legible. Evitar tarjetas pesadas, adornos innecesarios, sombras globales y superficies superpuestas sin necesidad.
- Iconografía lineal, monocromática, con terminaciones redondeadas y SVG reutilizables; las siluetas aprobadas están en [VECTORES_APROBADOS](ICONOGRAFIA/VECTORES_APROBADOS/README.md).

## 2. Tipografía aprobada

Los tamaños son referencias de diseño en CSS px (no píxeles físicos del panel); deben respetar zoom, escalado y accesibilidad del navegador.

| Nivel | Tamaño / altura de línea | Peso |
|---|---:|---:|
| Texto normal | 16 / 24 px | 400 |
| Texto secundario | 14 / 20 px | 400 |
| Texto auxiliar | 12 / 18 px | 400 |
| Título de sección | 22 / 28 px | 500 |

Las especificaciones particulares de películas, años, contadores, navegación y componentes prevalecen cuando ya están aprobadas.

## 3. Paletas

### Obsidiana

| Rol | Color |
|---|---|
| Fondo principal | #171A20 |
| Superficie elevada | #242A35 |
| Contorno general | #353535 · 1 px |
| Acento global | #70AEE0 |
| Texto principal | #F0F0F0 |
| Texto secundario | #BDBDBD |
| Texto auxiliar | #9B9B9B |
| Iconos inactivos generales | #BDBDBD |
| Contenido deshabilitado | #888888 |
| Superficie deshabilitada | #1D222B |
| Superficie de pulsación | #2B303A |
| Separadores | #353535 · 1 px |

Excepciones aprobadas: iconos inactivos de Personal #D0D0D0; algunos componentes conservan el acento anterior #5B9BD5 cuando tienen una regla particular expresa.

### Cuarzo

| Rol | Color |
|---|---|
| Fondo principal | #F4F1EA |
| Superficie | #FFFFFF |
| Contorno de superficie | #DDD8CE · 1 px |
| Acento | #356F9F |
| Texto principal | #292B2F |
| Texto secundario | #68655F |
| Texto auxiliar | #706C64 |
| Iconos inactivos | #8A857B |
| Contenido deshabilitado | #9D998F |
| Superficie deshabilitada | #F0EDE6 |
| Superficie de pulsación | #ECE7DE |
| Separadores | #E8E3DA · 1 px |

La paleta define roles globales; los componentes pueden usar excepciones expresamente aprobadas. No trasladar colores de un tema al otro por aproximación.

## 4. Geometría y espaciado

- Radio base de superficies generales: 14 CSS px. Se conservan radios particulares.
- Unidad modular: 4 CSS px.
- Escala de referencia: 4, 8, 12, 16, 20, 24, 32, 40, 48 y 64 px.
- Sin sombra global en superficies generales; solo se usarán sombras particulares cuando estén expresamente aprobadas.
- Los tamaños heredados Android dp/sp se convierten a unidades CSS lógicas y se validan en varios viewports. No asumir equivalencia física entre CSS px y píxeles de pantalla.
- Mantener márgenes, jerarquía y proporciones en pantallas estrechas y grandes; no recortar contenido ni ocultar acciones accesibles.

## 5. Navegación principal

Se conservan dos secciones: **Personal** y **Descubrir**.

- Píldora flotante inferior centrada, referencia 240 × 64 CSS px, dos zonas iguales.
- Iconos lineales de 20 px, etiquetas de 12 px y separación icono/texto de 4 px.
- Obsidiana usa superficie oscura diferenciada; Cuarzo adapta los roles de superficie y texto del tema.
- Separación de referencia de 16 px respecto al área inferior de gestos del sistema.
- No convertirla en una barra de ancho completo ni añadir sombra global.
- Al desplazarse hacia abajo, se oculta tras 24 px de desplazamiento acumulado; al desplazarse hacia arriba, reaparece. Las transiciones conservan las duraciones y curvas aprobadas en el registro histórico.
- La sección inicial es Descubrir.
- Las interacciones deben respetar las áreas táctiles, el viewport y las áreas seguras disponibles en navegador standalone.

## 6. Personal — composición MVP aprobada

La pantalla raíz Personal muestra exactamente cuatro filas en una columna vertical:

1. **Historial** — «Películas que ya has visto».
2. **Pendientes** — «Películas que quieres ver después».
3. **Ocultos** — «Películas que has decidido ocultar».
4. **Gestionar listas** — «Crea y organiza tus listas».

Cada fila tiene icono lineal a la izquierda, nombre y descripción en el centro, y chevron a la derecha. No mostrar Estadísticas, acceso deshabilitado ni espacio vacío en el MVP.

Referencias adaptadas:
- altura de fila: 80 CSS px;
- separación vertical: 12 px;
- márgenes laterales: 16 px;
- radio: 14 px;
- contorno: 1 px;
- icono de acceso: 24 px;
- nombre: 16 px / 500;
- descripción: 14 px / 400;
- chevron: 16 px.

La experiencia completa podrá incorporar Estadísticas posteriormente; no se adelanta al MVP.

## 7. Descubrir — composición MVP aprobada

- Una única barra superior, de referencia 52 px de alto, radio 14 px y margen horizontal de 16 px.
- Lupa a la izquierda y Ajustes (engranaje de seis dientes) a la derecha.
- Texto indicativo exacto: «Buscar...».
- No mostrar filtros ni Feed avanzado en el MVP.
- Los resultados locales aparecen inmediatamente; cuando TMDB está disponible se integran en una lista continua, no en bloques separados.
- Una película ya guardada muestra «En tu Prisma».
- Miniatura: 56 × 84 px, proporción 2:3, radio 2 px.
- Separación entre miniatura y texto: 12 px; margen de fila: 16 px; separación vertical: 12 px.
- Título: 14 px / 500, máximo dos líneas. Año y «En tu Prisma»: 12 px / 400.
- Toda la fila es una única zona táctil y abre la ficha.
- Las respuestas de una consulta anterior no se mezclan con la consulta vigente.

### Estados aprobados

- Estado inicial: ilustración Prisma, «Busca una película» y «AÑADIR PELÍCULA MANUALMENTE».
- Sin resultados tras completar las fuentes disponibles: «No encontramos películas», «Prueba con otro título.» y «AÑADIR PELÍCULA MANUALMENTE».
- Error o falta de conexión/token: nunca presentarlo como cero resultados. Conservar los resultados locales y diferenciar el estado.
- Los avisos contextuales deben ser discretos e integrados, no interrumpir el buscador.

## 8. Historial y Pendientes

Las composiciones principales están aprobadas en ambos temas y se conservan en [CONCEPTOS_FASE2](CONCEPTOS_FASE2/README.md).

- Una fila por película, sin duplicados.
- Historial: contador de visionados y fecha del más reciente; los visionados individuales se consultan en la ficha.
- Pendientes: fecha de incorporación y orden inicial del más reciente al más antiguo.
- Encabezado con regreso, título, búsqueda local y contador.
- Lista vertical abierta y continua.
- Miniatura de referencia 56 × 84 px.

Las pantallas vacías y las búsquedas sin coincidencias también tienen conceptos aprobados; su presencia en el repo no implica implementación web.

## 9. Ficha local

Está aprobado el **Concepto A — resumen primero** para la ficha local, en Obsidiana y Cuarzo. Las referencias están en [CONCEPTOS_FASE2](CONCEPTOS_FASE2/README.md).

La composición aprobada incluye cabecera cinematográfica, título y año una sola vez, estado del diario, acción principal para agregar/registrar un visionado, acción secundaria de Pendientes y lista de visionados individuales ordenados del más reciente al más antiguo. Cada nuevo visionado crea un registro independiente. No inventar hora si se desconoce.

La ficha completa con créditos, tráileres, colecciones, películas relacionadas y streaming pertenece a fases posteriores.

## 10. Listas personalizadas

El MVP utiliza gestión manual básica: crear, renombrar, eliminar, añadir y quitar películas. La composición avanzada (colores, collage, fijación, arrastre, filtros y orden avanzado) se conserva como alcance posterior; no mostrar controles que no estén implementados en esa fase.

## 11. Pendiente de diseño

La especificación visual completa de Ajustes, pantallas posteriores y algunos estados contextuales sigue pendiente de aprobación o de su fase objetivo. No inventar composiciones, ilustraciones o controles por conveniencia técnica.

## 12. Activos y registro histórico

- [Conceptos visuales MVP](CONCEPTOS_MVP/README.md)
- [Conceptos de Historial, Pendientes y ficha](CONCEPTOS_FASE2/README.md)
- [Guía de iconografía web](ICONOGRAFIA/README.md)
- [Maestros SVG aprobados](ICONOGRAFIA/VECTORES_APROBADOS/README.md)
- [Registro visual Android íntegro](../ARCHIVO/ANDROID/ESTADO_VISUAL_ANDROID.md)

El registro histórico incluye detalles y decisiones visuales más específicos, además de referencias a Compose, dp/sp, CIs y pruebas Android. Son antecedentes de la etapa anterior, no evidencia de que la PWA esté implementada. Si un detalle no está recogido aquí, consultar el histórico y traducirlo a web sin alterar la decisión aprobada.
