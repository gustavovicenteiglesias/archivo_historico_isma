# Archivo Histórico Digital ISMA

Aplicación web para recopilar, revisar y publicar fotografías históricas aportadas por la comunidad educativa del Instituto Santa María de la Asunción.

## Stack

- Frontend: React + Vite + Material UI.
- Backend: Java + Spring Boot.
- Base de datos: MySQL.
- Imagenes: Cloudinary desde backend.
- Autenticacion: Google OAuth para colaboradores y login local para administradores.

## Configuracion

1. Crear una base MySQL y ejecutar:

```sql
source db/schema.sql;
source db/seed.sql;
```

2. Copiar `.env.example` a `.env` y completar credenciales.

3. Credenciales necesarias:

- Cloudinary: cloud name, API key y API secret.
- Google OAuth: client ID y client secret.
- Admin local: `ADMIN_EMAIL` y `ADMIN_PASSWORD`.

## Google OAuth

Configurar en Google Cloud Console:

- Authorized JavaScript origins: `http://localhost:5173` y `http://localhost:8090`
- Authorized redirect URI: `http://localhost:8090/login/oauth2/code/google`

## Ejecucion local

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

La app queda disponible en `http://localhost:5173`.

## Reglas importantes

- Las fotos subidas quedan en estado `PENDIENTE`.
- La galería pública solo muestra fotos `APROBADA`.
- Las claves de Cloudinary y Google no van en frontend.
- El backend sube imágenes a Cloudinary mediante `ImageStorageService`.

## Documentación

- `docs/software.md`: documentación técnica del sistema.
- `docs/manual-usuarios.md`: manual simple para compartir con la comunidad.
- `docs/manual-administradores.md`: guía simple para quienes revisen publicaciones.
