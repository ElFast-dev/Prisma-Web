# Estrategia de pruebas y calidad — Prisma Web

**Estado:** propuesta para aprobación de Fase 0.  
**Regla:** probar recorridos reales sin convertir la CI en el producto.

## 1. Capas de pruebas

### Dominio
Probar reglas puras sin navegador:
- alta y deduplicación de Movie;
- cambios entre Pendientes, Historial y Ocultos;
- visionados repetidos;
- calificación por visionado;
- creación/renombrado/eliminación de listas y relaciones;
- búsqueda local normalizada;
- cálculos de estadísticas y reglas iniciales de Espectro cuando estén en su fase.

### Persistencia
Probar:
- transacciones IndexedDB;
- cierres y reapertura;
- índices y búsquedas;
- migraciones desde cada versión de esquema soportada;
- fallo de cuota y manejo de errores;
- datos preservados cuando un proceso falla a mitad de operación.

### Seguridad y copias
Probar:
- generación de salt/nonce aleatorios;
- cifrado y descifrado correcto;
- contraseña incorrecta;
- archivo manipulado/truncado/incompatible;
- restauración que falla sin modificar la base actual;
- ausencia de credenciales y datos personales en logs;
- importación grande y límites de memoria del teléfono.

### PWA y navegador
Probar:
- instalación en Chrome Android;
- inicio standalone y fallback en navegador;
- shell offline;
- lectura y escritura del diario en modo avión;
- Service Worker detenido/reiniciado;
- nueva versión disponible y activación controlada;
- persistencia concedida/denegada y cuota estimada;
- File System Access con fallback.

### End-to-end
Cada hito funcional debe tener al menos un recorrido completo desde la UI hasta la persistencia y de vuelta a la UI, ejecutado en un navegador real o automatizado y confirmado manualmente en el teléfono.

## 2. Entornos obligatorios

- Chromium automatizado para pruebas repetibles.
- Chrome estable en el teléfono Android del propietario.
- Variación de viewport y tamaño de fuente.
- Obsidiana y Cuarzo.
- Online, offline, pérdida de conexión a mitad de operación y almacenamiento escaso.

Una prueba de escritorio no sustituye la verificación en el teléfono.

## 3. CI propuesta

En cada PR:
1. instalación reproducible con lockfile;
2. formato/lint;
3. comprobación TypeScript;
4. pruebas unitarias;
5. pruebas de integración de persistencia;
6. build estático de PWA;
7. comprobación de artefactos y dependencias.

Las pruebas E2E pueden ejecutarse por cambios de recorridos o en la puerta de aceptación del hito. No repetir una CI idéntica si no cambió código, tests o entorno relevante.

## 4. Entrega

- Preview estático por rama/PR.
- Producción desde la rama protegida acordada.
- Artefacto de build identificado por commit SHA.
- Release SemVer separada del número de build.
- Changelog en español con la capacidad real entregada.

No publicar un APK, no crear tags arbitrarios ni declarar un hito por tener CI verde.

## 5. Criterios de bloqueo

- P0: pérdida/corrupción, filtración de datos, cifrado incorrecto o restauración destructiva.
- P1: recorrido esencial incompleto, fallo de persistencia, offline o migración.
- P2: deuda importante no bloqueante.
- P3: pulido.

P0 y P1 abiertos bloquean el cierre de hito. La cobertura de tests es una métrica auxiliar, no un criterio aislado de aceptación.
