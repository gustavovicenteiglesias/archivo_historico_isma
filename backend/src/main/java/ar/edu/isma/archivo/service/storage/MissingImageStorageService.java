package ar.edu.isma.archivo.service.storage;

import ar.edu.isma.archivo.exception.BadRequestException;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@ConditionalOnMissingBean(ImageStorageService.class)
public class MissingImageStorageService implements ImageStorageService {
    @Override
    public StoredImage upload(MultipartFile file) {
        throw new BadRequestException("El almacenamiento de imágenes no está configurado. Completá las credenciales de Cloudinary.");
    }

    @Override
    public void delete(String publicId) {
        throw new BadRequestException("El almacenamiento de imágenes no está configurado. Completá las credenciales de Cloudinary.");
    }
}
