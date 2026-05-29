package ar.edu.isma.archivo.controller;

import ar.edu.isma.archivo.dto.UsuarioAdminResponse;
import ar.edu.isma.archivo.dto.UsuarioRolRequest;
import ar.edu.isma.archivo.security.AppUserPrincipal;
import ar.edu.isma.archivo.service.UsuarioService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/usuarios")
public class AdminUsuarioController {
    private final UsuarioService usuarioService;

    public AdminUsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<UsuarioAdminResponse> listar() {
        return usuarioService.listarUsuarios();
    }

    @PatchMapping("/{id}/bloquear")
    public UsuarioAdminResponse bloquear(@PathVariable Long id, @AuthenticationPrincipal AppUserPrincipal principal) {
        return usuarioService.bloquear(id, principal.getId());
    }

    @PatchMapping("/{id}/desbloquear")
    public UsuarioAdminResponse desbloquear(@PathVariable Long id) {
        return usuarioService.desbloquear(id);
    }

    @PatchMapping("/{id}/rol")
    public UsuarioAdminResponse cambiarRol(
            @PathVariable Long id,
            @Valid @RequestBody UsuarioRolRequest request,
            @AuthenticationPrincipal AppUserPrincipal principal
    ) {
        return usuarioService.cambiarRol(id, request.rol(), principal.getId());
    }
}
