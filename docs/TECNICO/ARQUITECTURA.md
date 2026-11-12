# Arquitectura técnica propuesta — Prisma PWA

**Estado:** propuesta técnica para cerrar Fase 0.  
**Plataforma de destino:** PWA instalable en Android.  
**Regla:** no iniciar código de producto hasta aprobar los cimientos.

## 1. Objetivo

Construir una aplicación web instalable, estática y local-first, donde el teléfono sea el entorno de ejecución, almacenamiento y procesamiento de Prisma. El hosting entrega archivos de aplicación; no administra el diario ni ejecuta Espectro.

## 2. Stack recomendado

- **React + TypeScript:** interfaz y lógica tipada.
- **Vite:** servidor de desarrollo y compilación estática.
- **PWA / Service Worker:** instalación, caché del shell y ciclo de actualización.
- **IndexedDB:** base de datos local.
- **Cache Storage:** shell de la aplicación y recursos/ imágenes remotas cacheables.
- **Web Crypto:** cifrado de exportaciones y protección local de credenciales.
- **Web Workers:** cálculos de búsqueda, estadísticas y Espectro cuando afecten a la respuesta de la interfaz.
- **WebAssembly:** solo si pruebas reales demuestran que una parte concreta necesita optimización; no incorporarlo de entrada.
- **OPFS:** opción futura para archivos binarios o una necesidad medida; no usarlo como segunda base de datos sin justificación.

Se recomienda un conjunto mínimo de dependencias. Versiones exactas se fijarán al iniciar la fase de implementación, usando versiones estables verificadas y lockfile reproducible; nunca rangos dinámicos sin control.

## 3. Forma arquitectónica

Monolito modular de frontend, no microservicios.

- `app/`: arranque, rutas, composición global, gestión de errores.
- `features/`: Personal, Historial, Pendientes, Ocultos, Listas, Descubrir, Ficha, Ajustes, Estadísticas y Espectro.
- `domain/`: reglas de películas, visionados, listas, puntuaciones y recomendaciones. No depende de React ni del navegador.
- `data/`: repositorios y adaptadores para IndexedDB, TMDB y cachés.
- `platform/`: almacenamiento, archivos, cifrado, service worker, actualización y capacidades del navegador.
- `workers/`: tareas intensivas independientes del hilo principal.
- `shared/`: componentes visuales, tokens, utilidades y tipos verdaderamente compartidos.

Evitar capas vacías, un sistema genérico de plugins, contenedores de dependencias o abstracciones que no aporten valor. Una sola fuente de verdad para cada entidad.

## 4. Persistencia y fuentes de datos

- IndexedDB es el almacenamiento autoritativo de datos estructurados del diario.
- Cache Storage conserva shell, imágenes y recursos derivados; nunca es la única copia de datos personales.
- El dominio trabaja mediante repositorios; las pantallas no consultan directamente IndexedDB ni realizan llamadas HTTP.
- TMDB es la fuente remota de metadatos e imágenes. Los resultados remotos no se guardan en el diario hasta que el usuario realice una acción explícita.
- La conexión nunca transmite el historial, las calificaciones, las listas, las estadísticas ni el perfil de Espectro.
- Cada entidad local tiene identificador propio y, cuando exista, identificador TMDB independiente.

## 5. PWA y funcionamiento offline

- Manifest con nombre, iconos, colores, `start_url`, `scope` y `display: standalone`.
- HTTPS obligatorio en producción.
- Service Worker con precache del shell mínimo para poder abrir Prisma offline.
- Estrategia diferenciada: shell y recursos versionados en precache; imágenes con caché limitada por cuota y política explícita; TMDB con conexión y fallback a metadatos locales.
- No cachear indiscriminadamente tokens ni respuestas personales.
- Detectar actualizaciones y ofrecer una acción visible para aplicarlas; no forzar una recarga mientras hay operaciones o transacciones pendientes.
- La PWA debe funcionar aunque el Service Worker sea detenido y reiniciado por el navegador.

## 6. Procesamiento local

- Búsquedas locales, estadísticas y Espectro se ejecutan en el dispositivo.
- Las tareas que puedan bloquear la interfaz se mueven a Web Workers.
- Los Workers reciben el mínimo conjunto de datos necesario y devuelven resultados estructurados.
- Los cálculos se pueden recalcular a partir del diario; el perfil derivado de Espectro nunca sustituye el historial original.
- No descargar modelos de ML grandes ni ejecutar cómputo continuo en segundo plano sin necesidad demostrada.

## 7. Actualizaciones

La publicación de una nueva versión web no debe requerir APK. El Service Worker administra la disponibilidad de recursos nuevos. La propuesta es mantener una experiencia controlada: informar al usuario y activar la versión cuando lo solicite, salvo que una decisión posterior apruebe otro comportamiento.

Las migraciones IndexedDB deben completarse antes de declarar una versión nueva compatible. Mantener un mecanismo de recuperación y no eliminar datos si una migración falla.

## 8. Hosting y origen canónico

**Decisión pendiente y bloqueante antes de guardar datos reales:** elegir un origen HTTPS único y estable.

No se recomienda alojar Prisma bajo una ruta compartida de GitHub Pages del tipo `usuario.github.io/Prisma` como origen de producción de datos personales: las fronteras de almacenamiento web se definen por origen (esquema/host/puerto), no por ruta. Se recomienda un subdominio dedicado o un hostname propio del proyecto en un hosting estático.

GitHub seguirá siendo el repositorio y la fuente del código. El hosting debe desplegar artefactos estáticos desde la rama aprobada, sin servidor de aplicación ni base de datos.

## 9. Compatibilidad

- Objetivo inicial: Chrome estable en Android.
- Degradación explícita cuando una API no esté disponible.
- No asumir que todos los navegadores Android implementan las mismas APIs.
- Verificar instalación, acceso offline, cuota, persistencia, exportación, restauración, workers, actualización y uso de archivos en teléfono real.
- La PWA debe seguir funcionando en pestaña de navegador si el usuario no la instala; la instalación no puede ser requisito para los datos existentes.

## 10. Criterio de aprobación

Aprobar esta arquitectura no significa que exista una aplicación. Habilita la posterior especificación de implementación: estructura de archivos, modelo de datos, migraciones, estrategia de hosting/origen, versiones de dependencias y pruebas. El primer código se escribe solo después de cerrar Fase 0.
