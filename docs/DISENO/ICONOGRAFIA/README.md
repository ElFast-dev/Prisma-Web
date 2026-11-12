# Guía de iconografía — Prisma Web

**Estado:** sistema de vectores aprobado y conservado para la futura interfaz PWA. La selección conceptual y los maestros SVG se aprobaron durante la etapa Android; se mantienen sin cambiar su significado ni su silueta. La implementación web todavía no existe.

## 1. Selección aprobada

La selección final es: Personal A, Descubrir A, Historial A, Pendientes A, Ocultos A, Gestionar listas A, Chevron derecho A, Buscar A, Ajustes A, Volver A y Prisma vacío B. El engranaje de Ajustes tiene **seis dientes**.

Los maestros individuales se conservan en [VECTORES_APROBADOS](VECTORES_APROBADOS/README.md). Son vectores monocromáticos y usan `currentColor`, por lo que pueden recibir el color del tema desde CSS.

## 2. Inventario

| Nombre conceptual | Uso |
|---|---|
| Personal | Navegación principal |
| Descubrir | Navegación principal |
| Historial | Acceso de Personal |
| Pendientes | Acceso de Personal |
| Ocultos | Acceso de Personal |
| Gestionar listas | Acceso de Personal |
| Chevron derecho | Indicar entrada en una fila |
| Buscar | Campos de búsqueda |
| Ajustes | Acceso a configuración |
| Volver | Cabeceras interiores |
| Prisma vacío | Ilustración de estado sin contenido |

Prisma vacío es una ilustración auxiliar, no un undécimo control. El icono/manifest de instalación PWA se considera un activo de marca independiente: su diseño final debe respetar la identidad visual de Prisma y la máscara adaptable de Android, pero todavía no está aprobado.

No inventar iconos para acciones o pantallas que no formen parte de la fase aprobada.

## 3. Reglas gráficas

- Lienzo maestro de glifos: `viewBox="0 0 24 24"`.
- Prisma vacío: `viewBox="0 0 96 96"`.
- Trazo de referencia: 1,75 unidades; las excepciones concretas aprobadas para navegación, búsqueda, volver y chevron se mantienen en sus componentes.
- Terminaciones y uniones redondeadas.
- Estilo lineal, minimalista y esencial.
- Formas monocromáticas, sin color de tema incrustado.
- Mantener peso visual, proporciones y centrado óptico.
- Comprobar la legibilidad en tamaños de 16, 18, 20 y 24 CSS px según uso; no asumir equivalencia física de CSS px con píxeles del panel.
- No añadir sombras, degradados, filtros ni trazos decorativos que cambien el símbolo aprobado.

## 4. Uso web

- Conservar los SVG maestros como fuente editable.
- Preferir SVG inline o un componente SVG controlado por Prisma para permitir `currentColor`, accesibilidad y estilos del tema.
- No usar SVG remoto de terceros para estos símbolos.
- Cada símbolo debe tener un nombre accesible cuando sea informativo; los iconos decorativos deben quedar ocultos a tecnologías de asistencia.
- El área interactiva del control se define por el componente, no por el tamaño visible del dibujo. Mantener objetivos táctiles amplios en móvil.
- No exportar el set completo como una sola imagen rasterizada.
- La misma geometría se reutiliza en Obsidiana y Cuarzo; solo cambia el color aplicado desde los tokens del tema.

## 5. Tamaños de referencia trasladados a CSS

Las dimensiones siguientes conservan las proporciones visuales aprobadas; se interpretan como CSS px de referencia, no como píxeles físicos:

| Contexto | Tamaño visible de referencia | Trazo |
|---|---:|---:|
| Accesos de Personal | 24 × 24 px | 1,75 px |
| Navegación principal | 20 × 20 px | 1,4 px |
| Búsqueda / ajustes | 18 × 18 px | 1,4 px |
| Volver | 20 × 20 px | 1,5 px |
| Chevron de Personal | 16 × 16 px | 1,5 px |
| Prisma vacío | 96 × 96 px | Según SVG maestro |

Los tamaños deben adaptarse al viewport sin recortar y respetar el zoom del navegador. No reducir el área táctil al tamaño del glifo.

## 6. Color por tema

| Uso | Obsidiana | Cuarzo |
|---|---|---|
| Iconos inactivos generales | `#BDBDBD` | `#8A857B` |
| Iconos de Personal | `#D0D0D0` | `#8A857B` |
| Navegación activa | `#5B9BD5` (excepción aprobada) | `#356F9F` |
| Búsqueda / iconos contextuales | Token contextual del tema | Token contextual del tema |
| Volver | Texto principal del tema | Texto principal del tema |

No crear archivos SVG duplicados por tema. El mismo archivo debe recibir el color mediante CSS.

## 7. Lista de comprobación

- [ ] Se reconoce sin texto y no se confunde con otro símbolo.
- [ ] Conserva la geometría aprobada.
- [ ] Se ve correctamente al tamaño CSS de destino y con zoom.
- [ ] Los huecos y trazos no se fusionan en pantallas de alta y baja densidad.
- [ ] Mantiene contraste en Obsidiana y Cuarzo.
- [ ] No depende de color fijo, sombra o filtro para reconocerse.
- [ ] El SVG es independiente, vectorial y usa el `viewBox` correcto.
- [ ] Tiene semántica accesible y un objetivo táctil adecuado.
- [ ] El propietario aprobó cualquier cambio de silueta antes de reemplazar el maestro.

## 8. Estado de implementación

Los vectores están trasladados al repositorio PWA como activos de diseño; **todavía no están integrados en una interfaz web**. No describirlos como implementados hasta que el componente web correspondiente exista, se use en la pantalla y se verifique en ambos temas.
