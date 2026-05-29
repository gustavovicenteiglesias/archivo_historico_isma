# Checkpoint: Pantalla de usuario bloqueado

Fecha: 2026-05-28

Se reemplazo el error Whitelabel del callback OAuth para usuarios bloqueados:
- `GoogleOAuthSuccessHandler` redirige a `/usuario-bloqueado`.
- Se agrego `UsuarioBloqueado.jsx` con mensaje institucional.
- Las APIs con token de usuario bloqueado responden 403 JSON.
- `AuthContext` redirige a la pantalla de bloqueo si recibe 403 al recuperar sesion.

Verificacion:
- Backend compila con Maven.
