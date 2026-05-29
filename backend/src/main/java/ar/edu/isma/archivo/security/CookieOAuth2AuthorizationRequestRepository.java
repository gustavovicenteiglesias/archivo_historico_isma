package ar.edu.isma.archivo.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Base64;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.stereotype.Component;

@Component
public class CookieOAuth2AuthorizationRequestRepository implements AuthorizationRequestRepository<OAuth2AuthorizationRequest> {
    private static final String COOKIE_NAME = "OAUTH2_AUTH_REQUEST";
    private static final int COOKIE_MAX_AGE_SECONDS = 180;

    @Override
    public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
        Cookie cookie = findCookie(request);
        if (cookie == null || cookie.getValue() == null || cookie.getValue().isBlank()) {
            return null;
        }
        return deserialize(cookie.getValue());
    }

    @Override
    public void saveAuthorizationRequest(
            OAuth2AuthorizationRequest authorizationRequest,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        if (authorizationRequest == null) {
            removeAuthorizationRequestCookies(response);
            return;
        }
        addCookie(response, COOKIE_NAME, serialize(authorizationRequest), COOKIE_MAX_AGE_SECONDS);
    }

    @Override
    public OAuth2AuthorizationRequest removeAuthorizationRequest(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        OAuth2AuthorizationRequest authorizationRequest = loadAuthorizationRequest(request);
        removeAuthorizationRequestCookies(response);
        return authorizationRequest;
    }

    public void removeAuthorizationRequestCookies(HttpServletResponse response) {
        addCookie(response, COOKIE_NAME, "", 0);
    }

    private Cookie findCookie(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return null;
        }
        for (Cookie cookie : request.getCookies()) {
            if (COOKIE_NAME.equals(cookie.getName())) {
                return cookie;
            }
        }
        return null;
    }

    private void addCookie(HttpServletResponse response, String name, String value, int maxAgeSeconds) {
        String cookie = "%s=%s; Path=/; Max-Age=%d; HttpOnly; Secure; SameSite=Lax"
                .formatted(name, value, maxAgeSeconds);
        response.addHeader("Set-Cookie", cookie);
    }

    private String serialize(OAuth2AuthorizationRequest authorizationRequest) {
        try {
            ByteArrayOutputStream bytes = new ByteArrayOutputStream();
            ObjectOutputStream output = new ObjectOutputStream(bytes);
            output.writeObject(authorizationRequest);
            output.close();
            return Base64.getUrlEncoder().encodeToString(bytes.toByteArray());
        } catch (Exception ex) {
            throw new IllegalStateException("No se pudo serializar la solicitud OAuth", ex);
        }
    }

    private OAuth2AuthorizationRequest deserialize(String value) {
        try {
            byte[] decoded = Base64.getUrlDecoder().decode(value);
            ObjectInputStream input = new ObjectInputStream(new ByteArrayInputStream(decoded));
            return (OAuth2AuthorizationRequest) input.readObject();
        } catch (Exception ex) {
            return null;
        }
    }
}
