# Checkpoint: Fix OAuth authorization_request_not_found

Fecha: 2026-05-29

Se corrigio el flujo OAuth de Google:
- Spring Security ya no usa `SessionCreationPolicy.STATELESS`.
- Se cambio a `IF_REQUIRED` para permitir la sesion temporal que guarda el `state` OAuth.
- Se agregaron variables para cookie de sesion:
  - `SESSION_COOKIE_SAME_SITE`
  - `SESSION_COOKIE_SECURE`

Motivo:
Google OAuth necesita conservar la solicitud original entre `/oauth2/authorization/google` y `/login/oauth2/code/google`. Si no existe esa sesion, Spring falla con `authorization_request_not_found`.
