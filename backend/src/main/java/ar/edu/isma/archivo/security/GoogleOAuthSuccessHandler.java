package ar.edu.isma.archivo.security;

import ar.edu.isma.archivo.exception.BlockedUserException;
import ar.edu.isma.archivo.entity.Usuario;
import ar.edu.isma.archivo.service.UsuarioService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class GoogleOAuthSuccessHandler implements AuthenticationSuccessHandler {
    private final UsuarioService usuarioService;
    private final TokenService tokenService;
    private final String frontendUrl;
    private final CookieOAuth2AuthorizationRequestRepository authorizationRequestRepository;

    public GoogleOAuthSuccessHandler(
            UsuarioService usuarioService,
            TokenService tokenService,
            @Value("${app.frontend-url}") String frontendUrl,
            CookieOAuth2AuthorizationRequestRepository authorizationRequestRepository
    ) {
        this.usuarioService = usuarioService;
        this.tokenService = tokenService;
        this.frontendUrl = frontendUrl;
        this.authorizationRequestRepository = authorizationRequestRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        try {
            authorizationRequestRepository.removeAuthorizationRequestCookies(response);
            Usuario usuario = usuarioService.registrarAccesoGoogle(
                    oauthUser.getAttribute("name"),
                    oauthUser.getAttribute("email"),
                    oauthUser.getAttribute("sub")
            );
            String token = tokenService.createToken(usuario.getId(), usuario.getRol());
            response.sendRedirect(frontendUrl + "/oauth-callback?token=" + token);
        } catch (BlockedUserException ex) {
            response.sendRedirect(frontendUrl + "/usuario-bloqueado");
        }
    }
}
