# Despliegue del Backend

## Problema comun: el JAR no lee `.env`

Si el backend falla con un error similar a:

```text
Access denied for user 'root'@'localhost' (using password: NO)
```

significa que Spring Boot arranco sin leer las variables de entorno. En ese caso usa los valores por defecto de `application.yml`:

- `DB_USER=root`
- `DB_PASSWORD=` vacio

Por eso MySQL informa `using password: NO`.

## Opcion recomendada con systemd

Crear o editar el servicio, por ejemplo:

```ini
[Unit]
Description=Archivo Historico ISMA Backend
After=network.target

[Service]
User=gustavoiglesias
WorkingDirectory=/ruta/al/app_isma_fotos/backend
EnvironmentFile=/ruta/al/app_isma_fotos/.env
ExecStart=/usr/bin/java -jar /ruta/al/app_isma_fotos/backend/target/archivo-historico-api-0.0.1-SNAPSHOT.jar
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Despues de modificar el servicio:

```bash
sudo systemctl daemon-reload
sudo systemctl restart isma-backend
sudo journalctl -u isma-backend -f
```

## Opcion alternativa: indicar el `.env` absoluto

El backend tambien permite indicar la ubicacion del archivo con `APP_ENV_FILE`:

```bash
APP_ENV_FILE=/ruta/al/app_isma_fotos/.env java -jar backend/target/archivo-historico-api-0.0.1-SNAPSHOT.jar
```

En systemd:

```ini
Environment=APP_ENV_FILE=/ruta/al/app_isma_fotos/.env
```

## Verificaciones rapidas

Antes de reiniciar el servicio, revisar que `.env` tenga password:

```bash
grep '^DB_' /ruta/al/app_isma_fotos/.env
```

Debe existir una linea como:

```text
DB_PASSWORD=clave-real
```

Si el valor tiene espacios, `#`, comillas u otros caracteres especiales, conviene usar `EnvironmentFile` de systemd o variables reales del sistema.

Tambien revisar las credenciales de Cloudinary:

```bash
grep '^CLOUDINARY_' /ruta/al/app_isma_fotos/.env
```

Si `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` o `CLOUDINARY_API_SECRET` estan vacias, el backend puede arrancar, pero la carga de imagenes respondera que el almacenamiento no esta configurado.
