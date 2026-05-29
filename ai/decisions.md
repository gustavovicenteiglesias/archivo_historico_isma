# Decisiones de Arquitectura y Diseno

## UI y Estilos
1. Framework visual principal: Material UI.
2. Enfoque visual: institucional, claro, sobrio y mobile-first.
3. CSS global: usar estilos globales minimos para tipografia/base; preferir componentes Material UI y estilos locales con `sx`.
4. La galeria debe priorizar lectura y navegacion en celular.

## Backend
1. Framework: Spring Boot.
2. Capas obligatorias: controller, service, repository, entity, dto, config y security.
3. Persistencia: Spring Data JPA con MySQL.
4. Validaciones: Jakarta Bean Validation en DTOs y validaciones adicionales en servicios.
5. Errores: respuestas JSON comprensibles.

## Imagenes
1. No guardar imagenes como BLOB en MySQL.
2. No exponer claves del proveedor de imagenes en frontend.
3. Subir imagenes siempre desde backend.
4. Usar una interfaz `ImageStorageService` para no acoplar el dominio a Cloudinary.
5. Proveedor inicial: Cloudinary.
6. Guardar campos genericos: proveedor, identificador del asset y URL segura.

## Autenticacion y Roles
1. Colaboradores: Google OAuth.
2. Administradores: login local con email y contrasena.
3. Roles: ADMIN y COLABORADOR.
4. No mostrar publicamente el email del colaborador.

## Estados de Publicacion
Usar exclusivamente:
- PENDIENTE
- APROBADA
- RECHAZADA

## Restricciones
1. Priorizar cambios minimos y funcionales.
2. Evitar dependencias innecesarias.
3. Mantener la implementacion preparada para cambiar Cloudinary por ImageKit, ImgBB u otro proveedor.
