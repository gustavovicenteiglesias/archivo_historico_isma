package ar.edu.isma.archivo.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

@Component
public class OAuthFailureHandler implements AuthenticationFailureHandler {
    private static final Logger log = LoggerFactory.getLogger(OAuthFailureHandler.class);

    private final String frontendUrl;
    private final CookieOAuth2AuthorizationRequestRepository authorizationRequestRepository;

    public OAuthFailureHandler(
            @Value("${app.frontend-url}") String frontendUrl,
            CookieOAuth2AuthorizationRequestRepository authorizationRequestRepository
    ) {
        this.frontendUrl = frontendUrl;
        this.authorizationRequestRepository = authorizationRequestRepository;
    }

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception)
            throws IOException, ServletException {
        log.error("Fallo OAuth en {}: {}", request.getRequestURI(), exception.getMessage(), exception);
        authorizationRequestRepository.removeAuthorizationRequestCookies(response);
        String message = URLEncoder.encode("No se pudo completar el inicio de sesión con Google.", StandardCharsets.UTF_8);
        response.sendRedirect(frontendUrl + "/login?error=" + message);
    }
}
