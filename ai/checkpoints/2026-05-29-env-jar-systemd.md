# Checkpoint: Lectura de `.env` en JAR y systemd

Fecha: 2026-05-29

Se diagnostico que el error `Access denied for user 'root'@'localhost' (using password: NO)` ocurre cuando el JAR arranca sin leer `DB_PASSWORD`.

Cambios realizados:
- Se agrego `APP_ENV_FILE` como ruta explicita opcional para cargar `.env`.
- Se creo `docs/despliegue-backend.md` con ejemplo de servicio systemd.
- Se enlazo la guia desde `README.md` y `docs/software.md`.
- Se corrigio el fallback `MissingImageStorageService` para que se active explicitamente cuando falten credenciales de Cloudinary.
- Queda pendiente verificar el arranque real en el servidor.

Nota: en produccion se recomienda usar `EnvironmentFile=/ruta/al/app_isma_fotos/.env` o `APP_ENV_FILE` con ruta absoluta.
