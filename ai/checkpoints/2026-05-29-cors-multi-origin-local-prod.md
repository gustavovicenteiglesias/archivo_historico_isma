# Checkpoint: CORS local contra API produccion

Fecha: 2026-05-29

Se agrego soporte para multiples origins de frontend:
- Nueva variable `FRONTEND_URLS` separada por comas.
- CORS toma todos los origins definidos.
- Se mantiene compatibilidad con `FRONTEND_URL`.

Tambien se corrigio el label de Categoria en Galeria para que el escape Unicode renderice correctamente.
