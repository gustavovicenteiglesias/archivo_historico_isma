package ar.edu.isma.archivo.dto;

import ar.edu.isma.archivo.entity.ProveedorAuth;
import ar.edu.isma.archivo.entity.Rol;
import java.time.LocalDateTime;

public record UsuarioAdminResponse(
        Long id,
        String nombre,
        String email,
        ProveedorAuth proveedorAuth,
        Rol rol,
        Boolean activo,
        LocalDateTime fechaCreacion,
        LocalDateTime ultimoAcceso
) {
}
