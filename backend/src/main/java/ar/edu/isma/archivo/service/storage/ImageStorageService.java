package ar.edu.isma.archivo.service.storage;

import org.springframework.web.multipart.MultipartFile;

public interface ImageStorageService {
    StoredImage upload(MultipartFile file);

    void delete(String publicId);
}
