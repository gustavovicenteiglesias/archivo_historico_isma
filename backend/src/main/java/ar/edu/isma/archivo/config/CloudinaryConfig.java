package ar.edu.isma.archivo.config;

import com.cloudinary.Cloudinary;
import java.util.Map;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnExpression("!'${app.cloudinary.cloud-name:}'.isBlank() && !'${app.cloudinary.api-key:}'.isBlank() && !'${app.cloudinary.api-secret:}'.isBlank()")
public class CloudinaryConfig {
    @Bean
    Cloudinary cloudinary(
            @Value("${app.cloudinary.cloud-name}") String cloudName,
            @Value("${app.cloudinary.api-key}") String apiKey,
            @Value("${app.cloudinary.api-secret}") String apiSecret
    ) {
        return new Cloudinary(Map.of(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret,
                "secure", true
        ));
    }
}
