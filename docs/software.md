# Documentación del Software

## Proyecto

**Archivo Histórico Digital ISMA** es una aplicación web para recopilar, revisar y publicar fotografías históricas aportadas por la comunidad educativa del Instituto Santa María de la Asunción.

La aplicación permite que colaboradores autenticados suban fotos con datos asociados. Cada aporte queda pendiente hasta que un administrador lo aprueba o rechaza. La galería pública muestra únicamente fotos aprobadas.

## Stack

- Frontend: React + Vite + Material UI.
- Backend: Java + Spring Boot.
- Base de datos: MySQL.
- Imágenes: Cloudinary.
- Autenticación colaboradores: Google OAuth.
- Autenticación administradores: login local.

## Estructura

```text
app_isma_fotos/
  backend/      API Spring Boot
  frontend/     Aplicación React
  db/           Scripts SQL
  docs/         Documentación
  ai/           Contexto y checkpoints de trabajo asistido
```

## Backend

Paquete base:

```text
backend/src/main/java/ar/edu/isma/archivo
```

Capas principales:

- `controller`: endpoints HTTP.
- `service`: reglas de negocio.
- `repository`: acceso a datos con Spring Data JPA.
- `entity`: entidades JPA.
- `dto`: objetos de entrada/salida.
- `security`: autenticación, tokens y OAuth.
- `service/storage`: abstracción de almacenamiento de imágenes.
- `config`: configuración de seguridad, CORS y Cloudinary.

## Frontend

Carpeta principal:

```text
frontend/src
```

Áreas principales:

- `pages`: pantallas de la aplicación.
- `components`: componentes reutilizables.
- `api`: llamadas HTTP al backend.
- `context`: estado de autenticación.
- `config`: configuración del frontend.
- `styles`: estilos globales.

## Base de Datos

Scripts:

- `db/schema.sql`: estructura inicial.
- `db/seed.sql`: categorías iniciales.
- `db/migrations/`: ajustes posteriores.

Tablas principales:

- `usuarios`: colaboradores y administradores.
- `categorias`: categorías de fotos.
- `fotos_historicas`: publicaciones y metadatos.

Estados de fotos:

- `PENDIENTE`
- `APROBADA`
- `RECHAZADA`

Roles:

- `COLABORADOR`
- `ADMIN`

## Variables de Entorno

El backend lee variables desde `.env` en la raíz del proyecto.

Variables principales:

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Variables frontend:

- `VITE_API_BASE_URL`
- `VITE_CONTACT_EMAIL`

Importante: `.env` contiene credenciales reales y no debe subirse a Git.

## Flujos Principales

### Galería Pública

1. Un visitante entra a la galería.
2. El frontend llama a `GET /api/public/fotos`.
3. El backend devuelve solo fotos con estado `APROBADA`.
4. El visitante puede buscar y filtrar por categoría.

### Aporte de Foto

1. El colaborador inicia sesión con Google.
2. Completa el formulario de aporte.
3. Acepta los términos de autorización.
4. El backend valida archivo y datos.
5. La imagen se sube a Cloudinary.
6. MySQL guarda URL, identificador de imagen y metadatos.
7. La foto queda en estado `PENDIENTE`.

### Revisión Administrativa

1. El administrador inicia sesión.
2. Entra al panel de administración.
3. Revisa fotos pendientes.
4. Puede editar título, descripción, año y categoría.
5. Puede aprobar, rechazar o eliminar.
6. Solo al aprobar una foto aparece en la galería pública.

### Gestión de Usuarios

Desde el panel de administración se puede:

- ver usuarios;
- bloquear o desbloquear colaboradores;
- cambiar rol entre `COLABORADOR` y `ADMIN`;
- evitar que un administrador se bloquee o quite su propio rol.

## Endpoints Principales

Públicos:

- `GET /api/public/fotos`
- `GET /api/public/fotos/{id}`
- `GET /api/public/categorias`

Autenticación:

- `GET /oauth2/authorization/google`
- `GET /auth/me`
- `POST /auth/admin/login`
- `POST /auth/logout`

Colaborador:

- `POST /api/colaborador/fotos`
- `GET /api/colaborador/mis-fotos`

Administrador:

- `GET /api/admin/fotos`
- `GET /api/admin/fotos/{id}`
- `PUT /api/admin/fotos/{id}`
- `PATCH /api/admin/fotos/{id}/aprobar`
- `PATCH /api/admin/fotos/{id}/rechazar`
- `DELETE /api/admin/fotos/{id}`
- `GET /api/admin/usuarios`
- `PATCH /api/admin/usuarios/{id}/bloquear`
- `PATCH /api/admin/usuarios/{id}/desbloquear`
- `PATCH /api/admin/usuarios/{id}/rol`

## Ejecución Local

Backend:

```bash
cd backend
mvn spring-boot:run
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

URL local frontend:

```text
http://localhost:5173
```

URL local backend:

```text
http://localhost:8090
```

## Consideraciones

- No se guardan imágenes como BLOB en MySQL.
- Las claves de Cloudinary y Google no se exponen en frontend.
- Las imágenes se suben desde backend.
- Cloudinary está encapsulado detrás de `ImageStorageService`.
- Si en el futuro se cambia de proveedor, debería crearse otra implementación del servicio de almacenamiento.
- El sistema tiene una página de términos y un canal de solicitud de revisión o baja de imágenes.
