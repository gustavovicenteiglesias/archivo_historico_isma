package ar.edu.isma.archivo.dto;

import jakarta.validation.constraints.Size;

public record FotoUpdateRequest(
        @Size(max = 150, message = "El título no puede superar 150 caracteres")
        String titulo,
        String descripcion,
        Integer anioAproximado,
        Long idCategoria
) {
}
