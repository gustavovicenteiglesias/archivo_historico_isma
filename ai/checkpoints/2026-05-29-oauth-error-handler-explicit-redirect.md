# Checkpoint: OAuth failure handler y redirect explicita

Fecha: 2026-05-29

Se agrego:
- `GOOGLE_REDIRECT_URI` configurable.
- `OAuthFailureHandler` para loguear el error real del callback OAuth.
- Redireccion de error al frontend `/login?error=...` en vez de la pagina generica de Spring.
- Login muestra el mensaje de error recibido.

Para produccion se recomienda:
`GOOGLE_REDIRECT_URI=https://isma.cfl401areco.edu.ar/login/oauth2/code/google`
