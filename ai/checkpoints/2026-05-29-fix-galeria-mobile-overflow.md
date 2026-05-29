# Checkpoint: Fix galeria mobile overflow

Fecha: 2026-05-29

Se corrigio corrimiento horizontal en mobile:
- La galeria usa CSS grid estable en lugar de Grid con margenes negativos.
- Cards y contenidos tienen `minWidth: 0` y ancho completo.
- Se bloqueo overflow horizontal global.
- Textos de galeria con acentos se pasaron a escapes Unicode para evitar mojibake.
