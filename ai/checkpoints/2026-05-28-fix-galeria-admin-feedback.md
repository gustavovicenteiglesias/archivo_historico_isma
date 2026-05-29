# Checkpoint: Fix galeria y feedback admin

Fecha: 2026-05-28

Cambios:
- La consulta publica de fotos aprobadas ahora trae tambien el colaborador para evitar errores lazy al mapear la respuesta.
- Se reemplazo el literal enum en JPQL por parametro `EstadoFoto.APROBADA`.
- El panel de revision admin ahora muestra mensajes de exito y error al guardar, aprobar, rechazar o eliminar.
- El handler global de errores ahora registra el stacktrace en logs del backend.
- Se agrego una migracion para hacer unico el nombre de categorias si la tabla ya existia antes del ajuste.
