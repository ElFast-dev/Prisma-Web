# Modelo de datos — Prisma

**Estado:** borrador conceptual; no constituye un esquema aprobado ni autoriza crear IndexedDB.

## Propósito

Recoger reglas candidatas que eviten pérdida o duplicación de información. Antes de convertirlas en tablas, stores, índices o migraciones, deben validarse con los recorridos reales aprobados.

## Reglas que deben comprobarse

- Una película local necesita una identidad estable que no dependa solo del título.
- Vincularla más tarde con un catálogo externo no debe duplicarla ni borrar información introducida por el usuario.
- Si se permiten visionados múltiples, cada registro debe conservarse de forma independiente.
- Cambiar el estado de una película no debe borrar su historial.
- Quitar una película de una lista no debe borrar la película ni sus visionados.
- Los datos derivados de estadísticas o recomendaciones nunca sustituyen los datos originales.

Estas invariantes son candidatas. Su alcance y semántica deben revisarse junto con el primer recorrido.

## Entidades candidatas

Podrían existir conceptos como película, visionado, estado oculto, lista, relación película-lista, metadatos externos y preferencias. No se fija todavía el conjunto final ni sus campos.

El perfil de Espectro, sus señales y cualquier caché derivada se diseñarán solo cuando esa función haya sido aprobada y exista una necesidad concreta de persistirlos.

## Decisiones pendientes

Antes de congelar el modelo:
- acordar qué significa añadir, retirar, ocultar y restaurar una película;
- definir la semántica de fechas incompletas o desconocidas;
- decidir cómo se representan visionados repetidos;
- decidir qué datos son originales, editables, externos o reconstruibles;
- definir recuperación y migración sin destruir la base anterior.

La versión técnica del esquema de almacenamiento, si se necesita, será independiente de la edición pública de Prisma.

## Regla

No crear base de datos física ni código de migración a partir de este borrador. Diseñar únicamente el modelo necesario para las funciones aprobadas y probarlo antes de guardar datos reales.
