# Checkpoint: OAuth detras de proxy HTTPS

Fecha: 2026-05-29

Se agrego `server.forward-headers-strategy: framework` para que Spring Boot respete `X-Forwarded-*` cuando corre detras de Apache/HTTPS.

Esto evita que Google OAuth reciba un `redirect_uri` armado con `http`, `localhost` o `127.0.0.1` cuando la app publica usa `https://isma.cfl401areco.edu.ar`.
