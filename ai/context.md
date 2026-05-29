# Contexto del Proyecto

## Proyecto
Archivo Historico Digital ISMA.

Aplicacion web para recopilar, revisar y publicar fotografias historicas aportadas por la comunidad educativa del Instituto Santa Maria de la Asuncion, en el marco de sus 125 anos.

## Stack Principal
- Frontend: React + Vite + Material UI.
- Backend: Java + Spring Boot.
- Base de datos: MySQL.
- Imagenes: Cloudinary como proveedor inicial, siempre detras de un servicio intercambiable.
- Autenticacion: Google OAuth para colaboradores y login local para administradores.

## Estado y Foco Actual
El repositorio ya cuenta con una base inicial de MVP. El foco siguiente es configurar credenciales, instalar dependencias y probar el flujo completo:
1. Galeria publica de fotos aprobadas.
2. Carga de fotos por colaboradores autenticados.
3. Revision administrativa de publicaciones pendientes.
4. Guardado de metadatos en MySQL e imagenes optimizadas en Cloudinary.

## Implementado en la Base Inicial
- Backend Spring Boot con capas controller, service, repository, entity, dto, security y storage.
- Frontend React + Material UI con pantallas publicas, colaborador y admin.
- Scripts SQL para esquema y categorias iniciales.
- `.env.example` y README operativo.

## Pendiente de Verificacion
- Resolver descarga de dependencias Maven/npm en el entorno local.
- Completar credenciales de Cloudinary y Google OAuth.
- Ejecutar pruebas manuales del flujo de carga, revision y publicacion.

## Decisiones Practicas
- Se estima un volumen inicial menor a 1000 fotos.
- Se limita el tamano de subida para evitar costos y problemas moviles.
- La app debe ser mobile-first porque muchos aportes vendran desde celulares.
- Google Photos no se integra en el MVP: el usuario sube la foto desde el selector de archivos del dispositivo.

## Integraciones y Dependencias Externas
- Actuales: ninguna.
- MVP: MySQL, Cloudinary, Google OAuth.
- Futuras: Facebook OAuth, importacion asistida desde Google Photos, respaldo institucional de originales seleccionados.
