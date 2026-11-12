# Migración de repositorios — Prisma

**Objetivo:** convertir `ElFast-dev/Prisma-Web` en el repositorio canónico llamado `ElFast-dev/Prisma`, dejando de utilizar y eliminando el repositorio Android anterior.

## 1. Estado verificado — 12 de noviembre de 2026

| Elemento | `ElFast-dev/Prisma-Web` | `ElFast-dev/Prisma` |
|---|---|---|
| Existe | Sí | Sí |
| ID | `1454984252` | `1446676085` |
| Rama predeterminada | `main` | `main` |
| Contenido al inicio | Repositorio Git vacío | Código Android, documentación y activos |
| Permisos de la conexión | Admin, Maintain, Push | Admin, Maintain, Push |
| Función futura | Repositorio canónico PWA, nombre final Prisma | Eliminar después de verificar transferencia |

El repositorio nuevo ya tiene commits documentales en `main`. No tiene código de la aplicación web.

## 2. Trabajo realizado en Prisma-Web

- Mandato de agentes y contexto operativo reescritos para PWA.
- Requisitos de producto y roadmap inicial PWA.
- Arquitectura propuesta, modelo de datos, almacenamiento y seguridad.
- Identificación simplificada de entregas funcionales; el sistema SemVer anterior fue retirado.
- Pruebas y calidad.
- Alojamiento/origen como decisión bloqueante.
- Registro de decisiones.
- Inventario visual trasladado; no se considera una aprobación final de diseño PWA.
- SVG y conceptos conservados como referencias visuales heredadas, pendientes de revalidación web.
- Guías de iconografía corregidas para PWA.
- Autorización particular de TMDB y licencia tipográfica de Inter.
- Archivo histórico de documentación Android, actualizado desde la rama más completa.

## 3. Ramas antiguas revisadas

Se inspeccionaron `main` y:
- `fase-1/fundamentos-android`
- `feature/ci121-insets-diagnostic`
- `feature/ci-fast-feedback`
- `feature/fase1-android-foundation`
- `feature/fase1-theme-datastore-tests`

Se eligió `feature/fase1-android-foundation` como la fuente más completa de documentos/activos aprobados al momento de la migración. Se trasladaron los últimos requisitos, roadmap, contexto, diseño técnico, referencias, operación de GitHub, versión Android histórica, validación física y recursos visuales.

### Puntas de ramas registradas antes de retirar el repositorio

| Rama | Commit HEAD |
|---|---|
| `main` | `f8d7cc4e0cbff6e27e3bb3901a55c426a0d0c08e` |
| `fase-1/fundamentos-android` | `017a12ed5635f96e6256a5d3d4241180ded1f5d5` |
| `feature/ci121-insets-diagnostic` | `36fdf8c1d8964b34c10ba8c5ed49920c822ee2a0` |
| `feature/ci-fast-feedback` | `fa34d97dfd5d44503914c7847e0dec5e7f877aa4` |
| `feature/fase1-android-foundation` | `2c5d53307e1fc82a28d898a3331ab18d732d8cf2` |
| `feature/fase1-theme-datastore-tests` | `ba280514622feb813a6ebc5e9c59d8228619dcf9` |

Las puntas se registran para trazabilidad histórica. No se ha importado la historia Git completa, ni se ha copiado el código Android de las ramas.

No se trasladaron Kotlin, Gradle, APK, workflows de Android, keystores de prueba ni certificados TLS de instrumentación. No se ha intentado migrar el historial Git entero ni conservar una app Android ejecutable porque el propietario cambió expresamente la plataforma.

### Elementos de GitHub revisados antes de eliminar

- Issues: 0 abiertas y 0 cerradas devueltas por la búsqueda.
- Pull Requests: 0.
- GitHub Releases: colección vacía.
- Las ramas Android de desarrollo se registraron arriba; no existe rama de código PWA en el repositorio antiguo.
- La rama `main` del nuevo repositorio no contiene workflows Android ni código de aplicación.

No hay conversaciones de Issues/PR ni Releases que deban trasladarse. No se ha intentado copiar ejecuciones o artefactos temporales de Actions; no son fuentes de producto y pertenecen a la etapa Android.

## 4. Secuencia final para el cambio de nombre

La conexión GitHub disponible permite leer y modificar archivos, crear commits y ramas, pero no expone acciones de administración para eliminar o renombrar repositorios. Los dos cambios finales deben realizarse desde la interfaz de GitHub por el propietario.

1. Verificar que los documentos activos e históricos están presentes en `Prisma-Web/main`.
2. Abrir [ElFast-dev/Prisma](https://github.com/ElFast-dev/Prisma) → **Settings → General → Danger Zone → Delete this repository**.
3. GitHub solicitará escribir el nombre completo `ElFast-dev/Prisma` y confirmar. Esta acción elimina el repositorio Android y sus ramas, PR, Issues y contenido alojado en ese repositorio. No continuar si se necesita rescatar algo más.
4. Abrir [ElFast-dev/Prisma-Web](https://github.com/ElFast-dev/Prisma-Web) → **Settings → General → Repository name**.
5. Cambiar `Prisma-Web` a `Prisma` y pulsar **Rename**.
6. Verificar que `https://github.com/ElFast-dev/Prisma` ahora muestra el repositorio PWA, su README y la rama `main`.
7. Reabrir los enlaces de los documentos activos, SVG y archivo histórico para confirmar que no hay rutas rotas.
8. Después del cambio de nombre, evaluar el alojamiento de 0 USD definido en `docs/TECNICO/ALOJAMIENTO_Y_ORIGEN.md`. No conectar ningún servicio por adelantado.
9. Aprobar y fijar el hostname HTTPS de producción antes de instalar Prisma con datos personales.

## 5. Por qué se hace en este orden

GitHub permite renombrar repositorios con permisos de administrador y redirige tráfico Git/web hacia el nuevo nombre, pero las URL de sitios de proyecto GitHub Pages son una excepción. La documentación también aconseja evitar reutilizar el nombre antiguo de un repositorio renombrado porque puede romper las redirecciones. En este caso, el nombre `Prisma` está ocupado por el repositorio Android: por eso se elimina primero ese repositorio y después se renombra `Prisma-Web` a `Prisma`.

El alojamiento aún no está aprobado. Cloudflare Pages fue rechazado por el propietario. GitHub Pages es un candidato de coste cero, pero su subdirectorio comparte origen con los demás sitios de proyecto del usuario; ese riesgo debe resolverse y aceptarse antes de habilitarlo. Véase `docs/TECNICO/ALOJAMIENTO_Y_ORIGEN.md`.

Fuente oficial: https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository

## 6. Seguridad y recuperación

- No se copió ningún keystore de prueba, certificado TLS ni archivo de firma al nuevo repositorio.
- Los documentos históricos señalan cuando contienen instrucciones Android obsoletas.
- Los SVG y documentos de producto se conservaron en el nuevo repositorio.
- El cambio de nombre no se ha ejecutado desde esta sesión: no se dispone de la acción administrativa GitHub necesaria.
- No desplegar la PWA ni guardar datos personales en un origen provisional antes de fijar el hostname definitivo.
