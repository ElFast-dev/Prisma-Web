# Guía de iconografía — Prisma

**Estado:** sistema de vectores finales aprobado e integrado. El propietario eligió las once direcciones conceptuales el 11 de noviembre de 2026 y aprobó los refinamientos; los maestros SVG se conservan en VECTORES_APROBADOS/.

## 1. Autoría y alcance

El propietario seleccionó las once direcciones conceptuales (diez glifos de interfaz y la ilustración Prisma vacío) y aprobó su refinamiento visual el 11 de noviembre de 2026. El diseño vectorial se preparó manualmente y se integró en Compose; las fuentes SVG independientes quedan preservadas en [VECTORES_APROBADOS](VECTORES_APROBADOS/README.md).

La selección final fue: Personal A, Descubrir A, Historial A, Pendientes A, Ocultos A, Gestionar listas A, Chevron derecho A, Buscar A, Ajustes A, Volver A y Prisma vacío B. El engranaje de Ajustes es de **seis dientes**.

Los vectores son monocromáticos y reciben el tinte de los temas en tiempo de ejecución. El icono lanzador de Android es un entregable separado y no se define en esta integración.

## 2. Inventario de iconos integrados

Los diez símbolos de `PrismaIcon.kt` cuentan ahora con sus formas finales aprobadas. Sus maestros vectoriales editables se mantienen por separado en `VECTORES_APROBADOS/`.

| N.º | Nombre interno | Qué debe representar | Dónde se usa | Referencia conceptual |
|---:|---|---|---|---|
| 1 | `PERSON` | Personal / espacio personal | Navegación inferior | Silueta de persona simple |
| 2 | `DISCOVER` | Descubrir | Navegación inferior | Destellos de tamaños distintos |
| 3 | `HISTORY` | Historial | Acceso de Personal | Retorno circular y reloj mínimo |
| 4 | `PENDING` | Pendientes | Acceso de Personal | Marcador vertical / bookmark |
| 5 | `HIDDEN` | Ocultos | Acceso de Personal | Ojo con diagonal de ocultar |
| 6 | `LISTS` | Gestionar listas | Acceso de Personal | Tres filas con puntos |
| 7 | `CHEVRON` | Entrar / continuar | Extremo derecho de las cuatro filas de Personal | Ángulo abierto hacia la derecha |
| 8 | `SEARCH` | Buscar | Descubrir, Historial y Pendientes | Lupa |
| 9 | `SETTINGS` | Ajustes | Extremo derecho de la barra de Descubrir | Engranaje de seis dientes redondeados |
| 10 | `BACK` | Volver | Cabeceras de Historial, Pendientes y Apariencia | Flecha hacia la izquierda |

**Total del set de interfaz actual: 10 glifos.** No hay que crear versiones independientes de la lupa para cada pantalla ni variantes separadas de Obsidiana y Cuarzo: cada silueta debe ser reutilizable y recibir el color desde el tema.

### Gráficos auxiliares que conviene revisar, pero que no forman parte de los diez glifos

- **Prisma vacío:** ilustración de estado vacío, actualmente de referencia 96 × 96 dp. Se utiliza en el estado inicial de Descubrir y en los estados vacíos aprobados de Historial/Pendientes.
- **Póster no disponible:** marcador de claqueta, actualmente de 28 dp dentro del marco de póster 56 × 84 dp. No es un botón ni un icono de navegación.
- **Icono de aplicación / lanzador:** no está definido todavía en el manifiesto actual ni hay recursos propios `mipmap` en `app/src/main/res`. Debe diseñarse antes de una distribución pública. La lámina ofrece tres direcciones iniciales: prisma facetado, monograma P prismático o haz de luz. Ninguna está elegida.

No diseñes todavía iconos de reproducción, añadir, editar, borrar, compartir, descargar, filtros, notificaciones o estadísticas por anticipado: esas acciones no forman parte del inventario de pantallas implementadas de esta etapa. Los símbolos de batería, señal, hora y navegación del sistema Android pertenecen al sistema operativo, no a Prisma.

## 3. Reglas gráficas para los diez iconos de interfaz

### Lienzo y geometría

- **Lienzo maestro:** 24 × 24 unidades (equivalente a 24 × 24 dp en la referencia de diseño).
- **Centro óptico inicial:** (12, 12). Ajustar ópticamente cada silueta para que el peso percibido esté centrado, aunque sus límites geométricos no sean idénticos.
- **Área de dibujo habitual:** aproximadamente 18–20 unidades de ancho/alto. Dejar aire alrededor; no ampliar todos los iconos hasta tocar el borde.
- **Retícula:** usar incrementos de 0,5 unidades cuando ayuden a alinear círculos, ejes y encuentros. Las curvas se ajustan por equilibrio óptico, no se fuerzan a una retícula si empeoran la forma.
- **Consistencia:** mantener proporciones coherentes entre elementos de una misma familia; no copiar y pegar una misma caja delimitadora si un símbolo necesita compensación óptica.

### Trazo y construcción

- **Trazo de referencia global:** 1,75 dp/unidades, según la especificación visual vigente.
- **Terminaciones y uniones:** redondeadas (`round`) en iconos nuevos.
- **Estilo:** lineal, minimalista, esencial e híbrido en geometría. Contornos nítidos, pocos elementos y lectura inmediata.
- **Rellenos:** evitar masas rellenas grandes. Se admiten puntos o centros pequeños cuando ayuden a la lectura.
- **Complejidad:** no añadir líneas decorativas, doble contorno, sombras, degradados ni texturas. Cada trazo debe aportar significado.
- **Tamaño pequeño:** comprobar que los huecos interiores, cruces y líneas paralelas no se fusionen a 18 dp o 20 dp.

### Formato fuente y exportación

1. Conservar el original editable en Figma, Illustrator, Inkscape u otra herramienta vectorial.
2. Exportar cada glifo en un **SVG independiente** con `viewBox="0 0 24 24"`. Nombres sugeridos: `ic_person.svg`, `ic_discover.svg`, `ic_history.svg`, `ic_pending.svg`, `ic_hidden.svg`, `ic_lists.svg`, `ic_chevron_right.svg`, `ic_search.svg`, `ic_settings.svg` y `ic_back.svg`.
3. El SVG debe contener trazados vectoriales limpios, sin rasterización, fuentes externas, imágenes incrustadas, filtros o dependencias CSS. No hornear un color de tema en el dibujo.
4. Para Android, integrar cada forma como Vector Drawable o como `Path` de Compose, según la arquitectura que se mantenga. El trazo/forma debe aceptar un color de tinte entregado por el componente.
5. Entregar siempre el archivo fuente editable además del formato integrado. No exportar el set completo como una sola imagen rasterizada.

## 4. Tamaños de uso aprobados en Prisma

| Contexto | Tamaño visible | Trazo | Observaciones |
|---|---:|---:|---|
| Personal: iconos de Historial, Pendientes, Ocultos y Gestionar listas | 24 × 24 dp | 1,75 dp | Referencia común global |
| Navegación inferior: Personal y Descubrir | 20 × 20 dp | 1,4 dp | Etiqueta de texto debajo; el área interactiva pertenece al elemento de navegación |
| Buscador de Descubrir | 18 × 18 dp | 1,4 dp | Slot visual de 48 dp; la lupa no es un botón separado |
| Ajustes en Descubrir | 18 × 18 dp | 1,4 dp | Área táctil de 48 × 48 dp |
| Buscador de Historial/Pendientes | 18 × 18 dp | 1,4 dp | Decorativo dentro del campo |
| Volver en Historial/Pendientes | 20 × 20 dp | 1,5 dp | Área táctil de 48 × 48 dp |
| Chevron de Personal | 16 × 16 dp | 1,5 dp | Alineado al centro vertical de la fila |

El tamaño visible del glifo nunca equivale automáticamente al área táctil. Mantener las áreas táctiles definidas por cada componente; no agrandar el dibujo para compensar un objetivo táctil pequeño.

## 5. Color y temas

Los archivos fuente de iconos deben ser monocromáticos y reutilizables. El color se aplica en tiempo de ejecución según el componente y el tema.

| Uso | Obsidiana | Cuarzo |
|---|---|---|
| Iconos inactivos generales | `#BDBDBD` | `#8A857B` |
| Iconos de las cuatro tarjetas de Personal | `#D0D0D0` | `#8A857B` |
| Elemento activo de la navegación inferior | `#5B9BD5` (excepción particular ya aprobada) | `#356F9F` |
| Lupa de búsqueda / iconos contextuales | `onSurfaceVariant` del tema | `onSurfaceVariant` del tema |
| Flecha de regreso en listas | `onSurface` del tema | `onSurface` del tema |

No diseñes dos versiones cromáticas diferentes del mismo SVG; proporciona una misma silueta que admita tintado. Las excepciones de color pertenecen al componente, no al archivo maestro.

## 6. Icono de aplicación / lanzador Android

Este es un entregable separado del set de diez iconos de interfaz. Para la versión en color, Android utiliza dos capas adaptables: primer plano y fondo. Para admitir iconos temáticos, preparar además una capa monocromática. La documentación Android indica que las capas se preparan en 108 × 108 dp, con el símbolo centrado y contenido principal de aproximadamente 48–66 dp, dejando el borde exterior para máscara y efectos del sistema. Evitar dibujar una máscara circular/cuadrada o una sombra alrededor del borde: el lanzador la aplica.

Entregables recomendados:

- Fuente editable del símbolo de marca.
- Capa vectorial de primer plano.
- Capa vectorial de fondo.
- Capa monocromática para iconos temáticos.
- Previsualizaciones con distintas máscaras (círculo, squircle y cuadrado redondeado).
- Declaración de `android:icon` mediante recursos adaptive icon en el manifiesto cuando el propietario apruebe el símbolo final.

Referencia oficial: [Diseño de iconos adaptables — Android Developers](https://developer.android.com/develop/ui/compose/system/icon_design_adaptive?hl=es). No confundir el icono lanzador del APK con un icono de Google Play; son activos de distribución distintos.

## 7. Lista de comprobación antes de entregar cada icono

- [ ] Se entiende sin texto explicativo y no se confunde con otro símbolo del set.
- [ ] Mantiene la misma lógica geométrica y peso de trazo de los demás.
- [ ] Se ve equilibrado a 24 dp, 20 dp y/o 18 dp según su uso real.
- [ ] Los huecos interiores siguen abiertos y las líneas no se fusionan al tamaño más pequeño.
- [ ] Conserva contraste suficiente en Obsidiana y Cuarzo.
- [ ] No depende de un color fijo ni de una sombra para ser reconocible.
- [ ] Es vectorial, editable y tiene un `viewBox` limpio de 24 × 24.
- [ ] No añade un significado de acción que la pantalla no implemente.
- [ ] El nombre del archivo y el nombre interno corresponden al inventario.
- [ ] El propietario ha elegido/aprobado la silueta definitiva antes de sustituir la versión provisional en la aplicación.

## 8. Estado de aprobación

Las once direcciones seleccionadas y refinadas están aprobadas como arte final y ya están integradas en la aplicación. Los diez glifos de interfaz utilizan trazados vectoriales de 24 × 24; Prisma vacío utiliza un lienzo de 96 × 96 y el diamante facetado B.

Los maestros SVG individuales, tintables con `currentColor`, se conservan en [VECTORES_APROBADOS](VECTORES_APROBADOS/README.md). Ajustes tiene **seis dientes**, tanto en el SVG maestro como en Compose. El icono lanzador de Android permanece como activo independiente pendiente de diseño y aprobación.

