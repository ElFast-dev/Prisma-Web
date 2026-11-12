# Migración de repositorios — Prisma

**Objetivo:** convertir `ElFast-dev/Prisma-Web` en el repositorio canónico llamado `ElFast-dev/Prisma`, dejando de utilizar el antiguo repositorio Android.

## 1. Estado verificado el 12 de noviembre de 2026

| Elemento | `ElFast-dev/Prisma-Web` | `ElFast-dev/Prisma` |
|---|---|---|
| Existe | Sí | Sí |
| Rama predeterminada | `main` | `main` |
| Contenido al inicio | Vacío (Git repository empty) | Documentación y decisiones de Android |
| Permisos disponibles | Admin, Maintain, Push | Admin, Maintain, Push |
| Uso previsto | Nuevo repositorio principal PWA | Fuente histórica temporal; eliminar después de verificar migración |

IDs de repositorio observados: Prisma-Web `1454984252`; Prisma `1446676085`.

## 2. Reglas de migración

- No desarrollar la PWA en el repositorio Android.
- Trasladar a Prisma-Web los requisitos, decisiones visuales, autorización TMDB, reglas de colaboración y referencias que sigan siendo útiles.
- Conservar una copia histórica marcada como no autoritativa de los documentos Android que contienen detalles técnicos obsoletos.
- Corregir las fuentes activas para que no indiquen Kotlin, Compose, Room, DataStore, APK o Android Keystore como arquitectura vigente.
- Verificar enlaces internos, archivos, ramas, commits y contenido después de la migración.
- No borrar el antiguo repositorio antes de comprobar que la copia de documentación está completa.

## 3. Secuencia final deseada

1. Completar la transferencia documental a Prisma-Web.
2. Revisar los archivos esenciales y confirmar que el nuevo `main` tiene un commit inicial válido.
3. Verificar que README, AGENTS, contexto, requisitos, roadmap, arquitectura, seguridad, versionado, diseño visual y licencia TMDB están presentes.
4. Confirmar que no se ha creado código de producto antes de cerrar Fase 0.
5. Eliminar el repositorio antiguo `ElFast-dev/Prisma`, conforme a la instrucción expresa del propietario y solo tras verificar la migración.
6. Renombrar `ElFast-dev/Prisma-Web` a `ElFast-dev/Prisma`.
7. Comprobar el nuevo nombre, URL canónica, rama `main`, permisos y enlaces.
8. Elegir y fijar el hostname de producción HTTPS antes de desplegar una PWA que almacene datos personales.

## 4. Límite operativo de esta sesión

La conexión GitHub disponible permite leer repositorios y modificar archivos, crear commits y ramas, pero no expone las operaciones de administración para renombrar o eliminar repositorios. Por tanto, esta sesión puede preparar y verificar los contenidos, pero no ejecutar esos dos cambios de configuración. Se facilitarán instrucciones concretas para completarlos en GitHub Settings.

## 5. Precaución con GitHub Pages

GitHub redirige tráfico y operaciones Git tras un renombrado, pero la URL de un sitio de proyecto GitHub Pages cambia. La documentación oficial recomienda un dominio personalizado si se renombra un repositorio que ya publica GitHub Pages. Prisma no debe desplegarse bajo la URL provisional de Prisma-Web antes del cambio de nombre y de elegir su origen estable.

Fuente: https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository
