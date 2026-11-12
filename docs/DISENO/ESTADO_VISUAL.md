# Estado visual — Prisma

**Estado:** material visual heredado en revisión para PWA. No es una especificación final aprobada para web.

## Cómo utilizar lo existente

Los SVG, conceptos de pantalla, paletas, medidas y composiciones proceden de la etapa anterior. Se conservan como referencias para no perder trabajo, pero no se trasladan automáticamente a la aplicación.

Cada elemento debe revisarse:
- ¿Resuelve bien el recorrido real?
- ¿Se adapta a Chrome Android, instalación standalone y distintos tamaños?
- ¿Es accesible con zoom, texto grande, contraste y áreas táctiles?
- ¿Aporta claridad o añade complejidad?
- ¿Existe una alternativa web más simple y usable?

Cuando una propuesta antigua no sea la mejor, se rediseña. No se conserva solo por haber sido aprobada en Android.

## Identidad visual candidata

Se pueden explorar como punto de partida el carácter cinematográfico, sobrio y legible, los temas Obsidiana y Cuarzo, Inter si su licencia/tamaño/carga offline resultan convenientes e iconografía vectorial sencilla.

Ningún color, peso tipográfico, medida o componente queda congelado hasta que el propietario apruebe la adaptación web.

## Navegación y pantallas

Personal, Descubrir, Historial, Pendientes, Ocultos, listas, fichas y Ajustes son conceptos heredados que requieren revisión de prioridad y flujo.

Las composiciones SVG no son pantallas finales. No se traducen medidas Android a CSS de forma mecánica. Primero se valida el contenido y el recorrido; después se define una interfaz responsive y se prueba en el teléfono.

## Iconografía y archivos de referencia

Los archivos en `CONCEPTOS_MVP/`, `CONCEPTOS_FASE2/` e `ICONOGRAFIA/` siguen disponibles como material histórico. La palabra «aprobado» en un nombre de carpeta o README describe la selección antigua, no la aprobación de su uso en la PWA.

No eliminar ni sustituir los originales hasta que exista una revisión visual nueva y el propietario apruebe los cambios.
