package ar.edu.isma.archivo.service.storage;

import ar.edu.isma.archivo.entity.StorageProvider;

public record StoredImage(
        StorageProvider provider,
        String publicId,
        String secureUrl,
        String thumbnailUrl,
        String originalFilename
) {
}
