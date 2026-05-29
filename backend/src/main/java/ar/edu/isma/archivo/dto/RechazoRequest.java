package ar.edu.isma.archivo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RechazoRequest(
        @NotBlank(message = "La observación es obligatoria para rechazar una publicación")
        @Size(max = 2000, message = "La observación no puede superar 2000 caracteres")
        String observacion
) {
}
