package ar.edu.isma.archivo.service.storage;

import ar.edu.isma.archivo.entity.StorageProvider;
import ar.edu.isma.archivo.exception.BadRequestException;
import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import java.io.IOException;
import java.util.Map;
import java.util.Set;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@ConditionalOnBean(Cloudinary.class)
public class CloudinaryImageStorageService implements ImageStorageService {
    private final Cloudinary cloudinary;
    private final String folder;
    private final long maxBytes;
    private final Set<String> allowedContentTypes = Set.of("image/jpeg", "image/png", "image/webp");

    public CloudinaryImageStorageService(
            Cloudinary cloudinary,
            @Value("${app.cloudinary.folder}") String folder,
            @Value("${app.upload.max-bytes}") long maxBytes
    ) {
        this.cloudinary = cloudinary;
        this.folder = folder;
        this.maxBytes = maxBytes;
    }

    @Override
    public StoredImage upload(MultipartFile file) {
        validate(file);
        try {
            Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), Map.of(
                    "folder", folder,
                    "resource_type", "image",
                    "transformation", new Transformation<>()
                            .width(1600)
                            .height(1600)
                            .crop("limit")
                            .quality("auto")
                            .fetchFormat("auto")
            ));

            String publicId = String.valueOf(result.get("public_id"));
            String secureUrl = String.valueOf(result.get("secure_url"));
            String thumbnailUrl = cloudinary.url()
                    .secure(true)
                    .transformation(new Transformation<>()
                            .width(480)
                            .height(360)
                            .crop("fill")
                            .quality("auto")
                            .fetchFormat("auto"))
                    .generate(publicId);

            return new StoredImage(
                    StorageProvider.CLOUDINARY,
                    publicId,
                    secureUrl,
                    thumbnailUrl,
                    file.getOriginalFilename()
            );
        } catch (IOException ex) {
            throw new BadRequestException("No se pudo leer el archivo de imagen");
        }
    }

    @Override
    public void delete(String publicId) {
        try {
            cloudinary.uploader().destroy(publicId, Map.of("resource_type", "image"));
        } catch (IOException ex) {
            throw new BadRequestException("No se pudo eliminar la imagen del almacenamiento");
        }
    }

    private void validate(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("La imagen es obligatoria");
        }
        if (file.getSize() > maxBytes) {
            throw new BadRequestException("La imagen supera el tamaño máximo permitido");
        }
        if (!allowedContentTypes.contains(file.getContentType())) {
            throw new BadRequestException("Solo se aceptan imágenes JPG, PNG o WEBP");
        }
    }
}
