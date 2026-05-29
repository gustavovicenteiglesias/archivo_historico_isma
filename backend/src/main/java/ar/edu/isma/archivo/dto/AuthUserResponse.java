package ar.edu.isma.archivo.dto;

import ar.edu.isma.archivo.entity.Rol;

public record AuthUserResponse(Long id, String nombre, String email, Rol rol) {
}
