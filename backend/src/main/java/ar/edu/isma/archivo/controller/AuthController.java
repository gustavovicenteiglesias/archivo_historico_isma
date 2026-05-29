package ar.edu.isma.archivo.controller;

import ar.edu.isma.archivo.dto.AdminLoginRequest;
import ar.edu.isma.archivo.dto.AuthUserResponse;
import ar.edu.isma.archivo.entity.Usuario;
import ar.edu.isma.archivo.exception.BadRequestException;
import ar.edu.isma.archivo.security.AppUserPrincipal;
import ar.edu.isma.archivo.security.TokenService;
import ar.edu.isma.archivo.service.UsuarioService;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UsuarioService usuarioService;
    private final TokenService tokenService;
    private final String adminEmail;
    private final String adminPassword;

    public AuthController(
            UsuarioService usuarioService,
            TokenService tokenService,
            @Value("${app.admin.email}") String adminEmail,
            @Value("${app.admin.password}") String adminPassword
    ) {
        this.usuarioService = usuarioService;
        this.tokenService = tokenService;
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
    }

    @PostMapping("/admin/login")
    public Map<String, Object> loginAdmin(@Valid @RequestBody AdminLoginRequest request) {
        if (!adminEmail.equalsIgnoreCase(request.email()) || !adminPassword.equals(request.password())) {
            throw new BadRequestException("Credenciales inválidas");
        }
        Usuario admin = usuarioService.obtenerOCrearAdminLocal();
        String token = tokenService.createToken(admin.getId(), admin.getRol());
        return Map.of("token", token, "user", toAuthUser(admin));
    }

    @GetMapping("/me")
    public AuthUserResponse me(@AuthenticationPrincipal AppUserPrincipal principal) {
        if (principal == null) {
            throw new BadRequestException("No hay usuario autenticado");
        }
        return toAuthUser(usuarioService.buscarActivoPorId(principal.getId()));
    }

    @PostMapping("/logout")
    public Map<String, String> logout() {
        return Map.of("message", "Sesión cerrada");
    }

    private AuthUserResponse toAuthUser(Usuario usuario) {
        return new AuthUserResponse(usuario.getId(), usuario.getNombre(), usuario.getEmail(), usuario.getRol());
    }
}
