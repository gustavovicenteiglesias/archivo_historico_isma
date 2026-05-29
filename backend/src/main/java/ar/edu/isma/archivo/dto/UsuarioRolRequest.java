package ar.edu.isma.archivo.dto;

import ar.edu.isma.archivo.entity.Rol;
import jakarta.validation.constraints.NotNull;

public record UsuarioRolRequest(
        @NotNull(message = "El rol es obligatorio")
        Rol rol
) {
}
