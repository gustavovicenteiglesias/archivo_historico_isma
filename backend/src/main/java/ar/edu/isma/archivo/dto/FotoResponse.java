package ar.edu.isma.archivo.dto;

import ar.edu.isma.archivo.entity.EstadoFoto;
import java.time.LocalDateTime;

public record FotoResponse(
        Long id,
        String titulo,
        String descripcion,
        Integer anioAproximado,
        String categoria,
        Long idCategoria,
        String urlImagen,
        String urlThumbnail,
        EstadoFoto estado,
        Boolean destacada,
        LocalDateTime fechaCarga,
        LocalDateTime fechaRevision,
        String observacionesAdmin,
        String colaboradorNombre
) {
}
