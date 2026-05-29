package ar.edu.isma.archivo.security;

import ar.edu.isma.archivo.entity.Rol;
import ar.edu.isma.archivo.exception.BadRequestException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
    private final String secret;

    public TokenService(@Value("${JWT_SECRET:${SESSION_SECRET:dev-secret-change-me}}") String secret) {
        this.secret = secret;
    }

    public String createToken(Long userId, Rol rol) {
        long expiresAt = Instant.now().plusSeconds(60 * 60 * 24 * 7).getEpochSecond();
        String payload = userId + ":" + rol.name() + ":" + expiresAt;
        String encodedPayload = Base64.getUrlEncoder().withoutPadding()
                .encodeToString(payload.getBytes(StandardCharsets.UTF_8));
        return encodedPayload + "." + sign(encodedPayload);
    }

    public AppUserPrincipal parse(String token) {
        String[] parts = token.split("\\.");
        if (parts.length != 2 || !sign(parts[0]).equals(parts[1])) {
            throw new BadRequestException("Token inválido");
        }

        String payload = new String(Base64.getUrlDecoder().decode(parts[0]), StandardCharsets.UTF_8);
        String[] values = payload.split(":");
        if (values.length != 3 || Long.parseLong(values[2]) < Instant.now().getEpochSecond()) {
            throw new BadRequestException("Token vencido");
        }
        return new AppUserPrincipal(Long.parseLong(values[0]), "usuario-" + values[0], Rol.valueOf(values[1]));
    }

    private String sign(String value) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(mac.doFinal(value.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception ex) {
            throw new IllegalStateException("No se pudo firmar el token", ex);
        }
    }
}
