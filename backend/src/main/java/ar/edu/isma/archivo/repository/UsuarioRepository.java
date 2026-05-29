package ar.edu.isma.archivo.repository;

import ar.edu.isma.archivo.entity.ProveedorAuth;
import ar.edu.isma.archivo.entity.Usuario;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findByEmailAndProveedorAuth(String email, ProveedorAuth proveedorAuth);

    Optional<Usuario> findByProveedorAuthAndProveedorId(ProveedorAuth proveedorAuth, String proveedorId);

    List<Usuario> findAllByOrderByFechaCreacionDesc();
}
