package ar.edu.isma.archivo.security;

import ar.edu.isma.archivo.entity.Usuario;
import ar.edu.isma.archivo.exception.BlockedUserException;
import ar.edu.isma.archivo.service.UsuarioService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class BearerTokenFilter extends OncePerRequestFilter {
    private final TokenService tokenService;
    private final UsuarioService usuarioService;

    public BearerTokenFilter(TokenService tokenService, UsuarioService usuarioService) {
        this.tokenService = tokenService;
        this.usuarioService = usuarioService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            try {
                AppUserPrincipal principal = tokenService.parse(header.substring(7));
                Usuario usuario = usuarioService.buscarActivoPorId(principal.getId());
                AppUserPrincipal refreshedPrincipal = new AppUserPrincipal(usuario.getId(), usuario.getEmail(), usuario.getRol());
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        refreshedPrincipal,
                        null,
                        refreshedPrincipal.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (BlockedUserException ex) {
                SecurityContextHolder.clearContext();
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.setContentType("application/json");
                response.getWriter().write("{\"messages\":[\"Tu usuario fue bloqueado. Si considerás que es un error, comunicate con el ISMA.\"]}");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}
