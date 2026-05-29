package ar.edu.isma.archivo.service;

import ar.edu.isma.archivo.dto.UsuarioAdminResponse;
import ar.edu.isma.archivo.entity.ProveedorAuth;
import ar.edu.isma.archivo.entity.Rol;
import ar.edu.isma.archivo.entity.Usuario;
import ar.edu.isma.archivo.exception.BadRequestException;
import ar.edu.isma.archivo.exception.BlockedUserException;
import ar.edu.isma.archivo.exception.NotFoundException;
import ar.edu.isma.archivo.repository.UsuarioRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final String adminEmail;

    public UsuarioService(UsuarioRepository usuarioRepository, @Value("${app.admin.email}") String adminEmail) {
        this.usuarioRepository = usuarioRepository;
        this.adminEmail = adminEmail;
    }

    @Transactional
    public Usuario registrarAccesoGoogle(String nombre, String email, String proveedorId) {
        Usuario usuario = usuarioRepository.findByProveedorAuthAndProveedorId(ProveedorAuth.GOOGLE, proveedorId)
                .orElseGet(Usuario::new);

        if (Boolean.FALSE.equals(usuario.getActivo())) {
            throw new BlockedUserException("Tu usuario fue bloqueado. Si considerás que es un error, comunicate con el ISMA.");
        }

        usuario.setNombre(nombre != null ? nombre : email);
        usuario.setEmail(email);
        usuario.setProveedorAuth(ProveedorAuth.GOOGLE);
        usuario.setProveedorId(proveedorId);
        if (usuario.getId() == null || email != null && email.equalsIgnoreCase(adminEmail)) {
            usuario.setRol(email != null && email.equalsIgnoreCase(adminEmail) ? Rol.ADMIN : Rol.COLABORADOR);
        }
        usuario.setUltimoAcceso(LocalDateTime.now());

        return usuarioRepository.save(usuario);
    }

    @Transactional
    public Usuario obtenerOCrearAdminLocal() {
        return usuarioRepository.findByEmailAndProveedorAuth(adminEmail, ProveedorAuth.LOCAL)
                .orElseGet(() -> {
                    Usuario usuario = new Usuario();
                    usuario.setNombre("Administrador ISMA");
                    usuario.setEmail(adminEmail);
                    usuario.setProveedorAuth(ProveedorAuth.LOCAL);
                    usuario.setProveedorId(adminEmail);
                    usuario.setRol(Rol.ADMIN);
                    usuario.setUltimoAcceso(LocalDateTime.now());
                    return usuarioRepository.save(usuario);
                });
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));
    }

    public Usuario buscarActivoPorId(Long id) {
        Usuario usuario = buscarPorId(id);
        if (Boolean.FALSE.equals(usuario.getActivo())) {
            throw new BlockedUserException("Tu usuario fue bloqueado. Si considerás que es un error, comunicate con el ISMA.");
        }
        return usuario;
    }

    public List<UsuarioAdminResponse> listarUsuarios() {
        return usuarioRepository.findAllByOrderByFechaCreacionDesc().stream()
                .map(this::toAdminResponse)
                .toList();
    }

    @Transactional
    public UsuarioAdminResponse bloquear(Long id, Long adminActualId) {
        if (id.equals(adminActualId)) {
            throw new BadRequestException("No podés bloquear tu propio usuario");
        }
        Usuario usuario = buscarPorId(id);
        usuario.setActivo(false);
        return toAdminResponse(usuario);
    }

    @Transactional
    public UsuarioAdminResponse desbloquear(Long id) {
        Usuario usuario = buscarPorId(id);
        usuario.setActivo(true);
        return toAdminResponse(usuario);
    }

    @Transactional
    public UsuarioAdminResponse cambiarRol(Long id, Rol rol, Long adminActualId) {
        if (id.equals(adminActualId)) {
            throw new BadRequestException("No podés cambiar tu propio rol");
        }
        Usuario usuario = buscarPorId(id);
        usuario.setRol(rol);
        return toAdminResponse(usuario);
    }

    private UsuarioAdminResponse toAdminResponse(Usuario usuario) {
        return new UsuarioAdminResponse(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getProveedorAuth(),
                usuario.getRol(),
                usuario.getActivo(),
                usuario.getFechaCreacion(),
                usuario.getUltimoAcceso()
        );
    }
}
