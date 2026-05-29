# Mapa del Proyecto

## Directorios Principales
Raiz del proyecto:
- `backend/`: API Spring Boot.
- `frontend/`: aplicacion React + Material UI.
- `db/`: scripts SQL para MySQL.
- `ai/`: contexto, decisiones, tareas y checkpoints para trabajo asistido.

## Backend
- `backend/src/main/java/ar/edu/isma/archivo/`: paquete base.
- `config/`: configuracion de CORS, seguridad, Cloudinary y variables.
- `controller/`: endpoints HTTP.
- `dto/`: requests y responses.
- `entity/`: entidades JPA.
- `repository/`: acceso a datos.
- `service/`: reglas de negocio.
- `service/storage/`: abstraccion y proveedor de imagenes.
- `security/`: autenticacion y autorizacion.
- `resources/application.yml`: configuracion Spring.

## Frontend
- `frontend/src/api/`: cliente HTTP y funciones de API.
- `frontend/src/components/`: componentes reutilizables.
- `frontend/src/context/`: contexto de autenticacion.
- `frontend/src/pages/`: pantallas principales.
- `frontend/src/styles/`: estilos globales.

## Base de Datos
- `db/schema.sql`: estructura inicial.
- `db/seed.sql`: categorias iniciales y admin de ejemplo documentado.

## Restricciones de Navegacion
- No mezclar llamadas a APIs externas dentro de componentes.
- No llamar a Cloudinary desde frontend.
- Mantener la separacion entre galeria publica, colaborador y administracion.
