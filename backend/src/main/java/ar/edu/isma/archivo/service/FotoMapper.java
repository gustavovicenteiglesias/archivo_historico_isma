package ar.edu.isma.archivo.service;

import ar.edu.isma.archivo.dto.FotoResponse;
import ar.edu.isma.archivo.entity.FotoHistorica;
import org.springframework.stereotype.Component;

@Component
public class FotoMapper {
    public FotoResponse toResponse(FotoHistorica foto) {
        String categoria = foto.getCategoria() != null ? foto.getCategoria().getNombre() : null;
        Long idCategoria = foto.getCategoria() != null ? foto.getCategoria().getId() : null;
        String colaborador = foto.getColaborador() != null ? foto.getColaborador().getNombre() : null;

        return new FotoResponse(
                foto.getId(),
                foto.getTitulo(),
                foto.getDescripcion(),
                foto.getAnioAproximado(),
                categoria,
                idCategoria,
                foto.getUrlImagen(),
                foto.getUrlThumbnail(),
                foto.getEstado(),
                foto.getDestacada(),
                foto.getFechaCarga(),
                foto.getFechaRevision(),
                foto.getObservacionesAdmin(),
                colaborador
        );
    }
}
