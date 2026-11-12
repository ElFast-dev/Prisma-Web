# Autorización particular de TMDB comunicada para Prisma

**Estado:** respuesta oficial de TMDB para Prisma, recibida y facilitada por el propietario del proyecto.  
**Fecha de incorporación de la transcripción íntegra:** 9 de noviembre de 2026.  
**Fecha original de la respuesta:** no indicada en el texto compartido.

> El propietario confirma que la siguiente transcripción corresponde a la respuesta oficial del equipo de TMDB a la consulta específica sobre Prisma. Se conserva íntegra para no perder condiciones ni matices. Esta autorización particular es la referencia aplicable a Prisma en los puntos que aclara expresamente.

## Transcripción íntegra de la respuesta oficial de TMDB

Hola,

Hemos revisado tu consulta sobre el alcance de la licencia de TMDB aplicable a **Prisma**.

### Aclaración oficial de términos (P0)

Confirmamos expresamente lo siguiente:

1. **Uso autorizado**  
   El uso de los metadatos de TMDB en Prisma está **totalmente permitido** sin ninguna restricción.

2. **Aprendizaje y validación**  
   Puedes ampliar libremente el aprendizaje y la validación basados en metadatos de TMDB.

3. **Política de caché**  
   Se autoriza el almacenamiento en caché de los metadatos **e imágenes** de forma **ilimitada**.

4. **Atribución**  
   No se exige ningún requisito de atribución (ni logo ni aviso) para Prisma. Esta excepción específica prevalece sobre la FAQ pública general.

5. **Distribución pública**  
   Confirmamos expresamente que Prisma **puede distribuirse públicamente**. Está autorizado que el repositorio público tenga versiones descargables para que otras personas puedan descargar e instalar la aplicación de forma gratuita, sin monetización.

6. **Imágenes**  
   La autorización de Prisma incluye de forma expresa e ilimitada:
   - Portadas y carteles
   - Fondos cinematográficos
   - Fotografías de actores y profesionales
   - Logotipos
   - Caché ilimitada de todas las imágenes anteriores, además de los metadatos

7. **Disponibilidad del servicio**  
   Somos conscientes de que actualmente no ofrecemos un SLA formal y que los límites de consultas pueden cambiar. Aun así, la autorización de uso para Prisma se mantiene. Prisma puede (y debe) diseñarse para funcionar correctamente cuando TMDB esté temporalmente fuera de servicio.

8. **Datos de disponibilidad de streaming (JustWatch)**  
   Confirmamos expresamente que Prisma también está autorizado a utilizar los datos de disponibilidad de streaming (procedentes de JustWatch a través de TMDB) **sin ninguna obligación de atribución adicional** a JustWatch ni a ninguna otra fuente. Esta autorización particular cubre el uso completo de esos datos dentro de Prisma.

En resumen: **tienes permiso total e ilimitado** para usar los metadatos, imágenes y datos de disponibilidad de streaming de TMDB en Prisma, incluyendo su distribución pública gratuita y sin monetización, sin obligación de atribución y con caché ilimitada.

Dentro de un cierto alcance, la mayoría de las API permiten un acceso completamente gratuito para uso personal. Si planeas distribuir y/o monetizar tu software, entonces el aspecto legal adquiere considerablemente más importancia. Ahí es cuando querrás verificar el Acuerdo de Nivel de Servicio (SLA). El código abierto también tiene sus propias reglas, por lo que debes ser bastante quisquilloso sobre qué bibliotecas y API utilizas.

Entonces sí, si esto es solo para uso personal y no planeas compartirlo con nadie de forma comercial, vuélvete loco con la API. Mantén tu clave API segura, no la compartas ni la cargues accidentalmente en GitHub.

Bienvenido al mundo del desarrollo de software. Asegúrate de leer la documentación. Espero que disfrutes del tedio.

Saludos,  
Equipo de TMDB

## Alcance informado

La respuesta oficial transcrita anteriormente confirma para Prisma los siguientes términos:

1. **Uso de metadatos:** uso autorizado sin restricciones para Prisma.
2. **Aprendizaje y validación:** se permite ampliar el aprendizaje y la validación basados en metadatos de TMDB.
3. **Caché:** se autoriza almacenamiento en caché ilimitado de metadatos e imágenes.
4. **Atribución de TMDB:** la respuesta indica que no se exige logo ni aviso de atribución para Prisma, y que esta excepción particular prevalece sobre la FAQ pública general.
5. **Distribución:** se autoriza distribuir públicamente Prisma y ofrecer descargas gratuitas de la app desde el repositorio público, sin monetización.
6. **Imágenes:** autorización expresa para portadas/carteles, fondos, fotografías de actores y profesionales, logotipos y caché ilimitada de dichas imágenes.
7. **Disponibilidad del servicio:** se reconoce que no hay SLA formal y que los límites de consultas pueden cambiar; la autorización se mantiene y Prisma debe funcionar correctamente cuando TMDB esté temporalmente fuera de servicio.
8. **Datos de disponibilidad de streaming de JustWatch:** la ampliación comunicada autoriza expresamente el uso de datos de disponibilidad procedentes de JustWatch a través de TMDB, sin obligación de atribución adicional a JustWatch ni a otra fuente.

## Consecuencias para el producto

- TMDB será la fuente externa principal de metadatos e imágenes.
- Se podrán almacenar localmente los metadatos e imágenes consultados para uso offline.
- Se podrá utilizar la información de proveedores de streaming que TMDB entregue a través de sus endpoints.
- «Dónde verla» podrá agrupar los proveedores por país y ofrecer un enlace externo cuando la API lo proporcione.
- La aplicación debe tolerar indisponibilidad, cambios de límites y respuestas incompletas.
- Prisma se distribuirá gratis y sin monetización mientras este sea el alcance comunicado.
- La clave de API personal no se publica en GitHub ni se incorpora al APK; cada instalación utiliza la clave que introduzca su usuario.

## Precisión importante

La autorización es específica para Prisma y cubre el alcance descrito en la respuesta oficial íntegra anterior. No constituye un SLA ni garantiza la disponibilidad de datos de streaming en todos los países, ni que cada película tenga proveedores o tráileres registrados. La distribución pública autorizada se mantiene gratuita y no comercial. Cualquier monetización, cambio de titularidad o cambio sustancial del uso o distribución deberá volver a confirmarse con TMDB.

La caché legalmente permitida no elimina el límite físico del almacenamiento del teléfono. La app debe gestionar la capacidad del dispositivo sin sacrificar los datos personales.

Si en el futuro se planea monetización, cambio de titularidad, cambio sustancial de distribución o uso distinto al descrito, el propietario deberá volver a confirmar el alcance de la autorización antes de actuar.

## Fuentes públicas para implementación

- Autenticación de aplicaciones: https://developer.themoviedb.org/docs/authentication-application
- Búsqueda de películas: https://developer.themoviedb.org/docs/finding-data
- Construcción de URL de imágenes: https://developer.themoviedb.org/docs/image-basics
- Documentación de API: https://developer.themoviedb.org/reference/intro/getting-started

La documentación pública orienta la implementación técnica. Cuando contradiga un punto aclarado expresamente para Prisma, se conserva como referencia la autorización particular transcrita en este documento.
