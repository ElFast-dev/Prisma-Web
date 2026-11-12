# Entregas funcionales — Prisma

**Estado:** modelo simple de entregas. No utiliza SemVer ni preversiones.

## Una edición representa capacidad real

Prisma utilizará ediciones funcionales consecutivas: **Edición 1, Edición 2, Edición 3...**

Un número solo se asigna cuando existe una entrega coherente que el usuario puede utilizar, comprobar y aceptar. No se define un mapa de números futuros ni se asigna una edición a una fase de desarrollo.

La descripción de cada edición debe completar esta frase: **«Ahora puedo hacer…»** y enumerar acciones reales.

## Qué no cambia la edición

No se aumenta el número por commits, ramas, Pull Requests, CI, builds, despliegues internos, documentación, refactors, cambios de estilo o pruebas que no añadan una capacidad nueva.

Las correcciones se anotan en el historial de la edición con fecha y descripción. No se inventan subversiones para cada arreglo.

## Identificación técnica

Cada build interno se identifica por SHA del commit, fecha de compilación y entorno. Ese identificador permite reproducir y localizar un build, pero no se presenta como una edición de producto.

La versión del esquema de datos local, del formato de copia o del algoritmo de Espectro —si llega a existir— es un identificador técnico independiente y nunca se confunde con la edición que ve el usuario.

## Publicación

No crear tags, Releases, preversiones alpha/beta/rc ni etiquetas de producto mientras Prisma no tenga una capacidad estable que merezca entregarse.

Al publicar una edición, incluir qué puede hacer el usuario, correcciones relevantes, límites conocidos, cambios que afecten a datos/copias y evidencia de pruebas en Android.

## Regla principal

El número no es una meta ni un indicador de actividad. Es una etiqueta que describe una entrega que ya existe. Si no hay una mejora funcional completa y aceptada, el número no cambia.
