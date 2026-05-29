# Checkpoint: OAuth cookie state y callback fuera de /auth

Fecha: 2026-05-29

Se corrigieron dos problemas de produccion:
- El `state` de Google OAuth se guarda en cookie propia `OAUTH2_AUTH_REQUEST` en vez de depender de la sesion del servidor.
- El callback frontend cambio de `/auth/callback` a `/oauth-callback` para no chocar con el ProxyPass `/auth/` de Apache.

Motivo:
- `authorization_request_not_found` indicaba que Spring no encontraba el request OAuth original.
- `/auth/callback` estaba siendo enviado al backend por Apache, generando `NoResourceFoundException`.
