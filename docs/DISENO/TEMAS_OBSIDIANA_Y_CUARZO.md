# Temas de Prisma — Obsidiana y Cuarzo

**Decisión del propietario:** conservar Obsidiana y Cuarzo como los dos temas visuales de Prisma.  
**Base cromática:** valores seleccionados en la etapa anterior y reconfirmados como dirección de diseño el 12 de noviembre de 2026.  
**Alcance:** tema oscuro y tema claro con la misma cobertura funcional y el mismo cuidado visual.

## 1. Identidad de los temas

- **Obsidiana:** tema oscuro, de carácter grafito frío, profundo y cinematográfico.
- **Cuarzo:** tema claro, de carácter marfil mineral, suave y cálido.
- Ninguno es secundario. Todos los recorridos, componentes, estados vacíos, errores y diálogos deben contemplarse en ambos.
- La estructura, jerarquía y comportamiento se mantienen equivalentes. Los colores se ajustan para conservar contraste, legibilidad e identidad propia.
- Obsidiana es la selección inicial de una instalación nueva. El usuario puede cambiar manualmente a Cuarzo; la preferencia se guarda localmente y persiste al reabrir Prisma.
- Los nombres Obsidiana y Cuarzo se conservan. No crear un tercer tema ni convertirlos en simples filtros de color sin una decisión del propietario.

## 2. Paleta base conservada

### Obsidiana

| Rol | Valor | Uso |
|---|---|---|
| Fondo principal | `#171A20` | Fondo general de la aplicación |
| Superficie elevada global | `#242A35` | Superficies generales elevadas |
| Superficie particular de Personal y búsqueda | `#222222` | Componentes que ya tienen esta especificación propia |
| Contorno global | `#353535` · 1 px | Superficies generales cuando el componente requiere borde |
| Acento global | `#70AEE0` | Acciones y estados activos globales |
| Azul heredado de componentes concretos | `#5B9BD5` | Navegación y estados donde ya se especificó expresamente |
| Texto principal | `#F0F0F0` | Contenido principal |
| Texto secundario | `#BDBDBD` | Metadatos y contenido secundario |
| Texto auxiliar | `#9B9B9B` | Ayudas y detalles discretos |
| Iconos inactivos globales | `#BDBDBD` | Iconografía inactiva general |
| Iconos de Personal | `#D0D0D0` | Excepción particular aprobada |
| Contenido deshabilitado | `#888888` | Texto e iconos deshabilitados |
| Superficie deshabilitada | `#1D222B` | Fondo de controles deshabilitados |
| Superficie de pulsación global | `#2B303A` | Interacción sobre `#242A35` |
| Separadores internos | `#353535` · 1 px | División de grupos y contenido |

### Cuarzo

| Rol | Valor | Uso |
|---|---|---|
| Fondo principal | `#F4F1EA` | Fondo general de la aplicación |
| Superficie | `#FFFFFF` | Tarjetas, listas y contenedores |
| Contorno de superficie | `#DDD8CE` · 1 px | Delimitación de superficies |
| Acento principal | `#356F9F` | Acciones y estados activos |
| Texto principal | `#292B2F` | Contenido principal |
| Texto secundario | `#68655F` | Metadatos y contenido secundario |
| Texto auxiliar | `#706C64` | Ayudas y detalles discretos |
| Iconos inactivos | `#8A857B` | Iconografía inactiva |
| Contenido deshabilitado | `#9D998F` | Texto e iconos deshabilitados |
| Superficie deshabilitada | `#F0EDE6` | Fondo de controles deshabilitados |
| Superficie de pulsación | `#ECE7DE` | Interacción sobre superficies blancas |
| Separadores internos | `#E8E3DA` · 1 px | División de grupos y contenido |

## 3. Reglas visuales comunes

- **Sin sombra global** en superficies generales. La separación se resuelve con las superficies y contornos de cada tema. Las sombras particulares solo se conservan cuando un componente tiene una razón específica y fue diseñada para ello.
- Radio base de superficies generales: **14 px**. Componentes con geometría propia pueden tener otro radio.
- Unidad modular de espaciado: **4 px**. Escala de referencia: 4, 8, 12, 16, 20, 24, 32, 40, 48 y 64 px. No reemplaza medidas específicas aprobadas.
- Separadores: **1 px**, con 8 px de espacio arriba y abajo.
- Controles deshabilitados no reciben opacidad adicional; se utilizan los colores específicos de contenido y superficie.
- Respuesta estándar a la pulsación: transición de 100 ms al pulsar y 160 ms al soltar, con `cubic-bezier(0, 0, 0.2, 1)`, siempre que el componente use esta respuesta global. No sustituye animaciones particulares aprobadas.

## 4. Tipografía de referencia anterior

La selección anterior fue **Inter**, con pesos 400, 500 y 600. La escala registrada es:

| Nivel | Tamaño / interlineado | Peso |
|---|---|---|
| Texto normal | 16 / 24 px | 400 |
| Texto secundario | 14 / 20 px | 400 |
| Texto auxiliar | 12 / 18 px | 400 |
| Título de sección | 22 / 28 px | 500 |

El propietario ha confirmado que le gustan Obsidiana y Cuarzo. La selección de Inter y la escala tipográfica se conservan como trabajo previo para revisión conjunta del sistema visual web; no se confunden con la confirmación de los dos temas.

## 5. Traducción a PWA

Las medidas Android `dp/sp` no se copian literalmente como píxeles físicos. Se traducen a unidades CSS lógicas y diseño responsive, respetando zoom, tamaño de texto, densidad, áreas seguras y accesibilidad.

Los colores de esta guía se expresan como valores sRGB y se mantienen como tokens CSS. La implementación web debe probar contraste en los dos temas y no usar valores codificados directamente en componentes si pertenecen a un rol global.

## 6. Referencia y trazabilidad

La paleta y las reglas se recuperaron de:
- `docs/DISENO/ESTADO_VISUAL.md` en la rama histórica `feature/fase1-android-foundation`.
- `app/src/main/java/dev/elfast/prisma/core/designsystem/theme/PrismaColors.kt`.
- `app/src/main/java/dev/elfast/prisma/core/designsystem/theme/PrismaTypography.kt`.
- `docs/PRODUCTO/REQUISITOS.md`, secciones de tema, Personal y navegación.

**Esta guía conserva la identidad de los temas. No significa que se haya aprobado cada pantalla, ni que se vaya a reutilizar Compose o la arquitectura Android.**
