package ar.edu.isma.archivo.service;

import ar.edu.isma.archivo.dto.FotoResponse;
import ar.edu.isma.archivo.dto.FotoUpdateRequest;
import ar.edu.isma.archivo.entity.EstadoFoto;
import ar.edu.isma.archivo.entity.FotoHistorica;
import ar.edu.isma.archivo.entity.Usuario;
import ar.edu.isma.archivo.exception.BadRequestException;
import ar.edu.isma.archivo.exception.NotFoundException;
import ar.edu.isma.archivo.repository.FotoHistoricaRepository;
import ar.edu.isma.archivo.service.storage.ImageStorageService;
import ar.edu.isma.archivo.service.storage.StoredImage;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FotoHistoricaService {
    private final FotoHistoricaRepository fotoRepository;
    private final CategoriaService categoriaService;
    private final UsuarioService usuarioService;
    private final ImageStorageService imageStorageService;
    private final FotoMapper fotoMapper;

    public FotoHistoricaService(
            FotoHistoricaRepository fotoRepository,
            CategoriaService categoriaService,
            UsuarioService usuarioService,
            ImageStorageService imageStorageService,
            FotoMapper fotoMapper
    ) {
        this.fotoRepository = fotoRepository;
        this.categoriaService = categoriaService;
        this.usuarioService = usuarioService;
        this.imageStorageService = imageStorageService;
        this.fotoMapper = fotoMapper;
    }

    public List<FotoResponse> listarPublicas(String texto, Long categoriaId, Integer desde, Integer hasta) {
        String filtro = texto == null || texto.isBlank() ? null : texto.trim();
        return fotoRepository.buscarAprobadas(EstadoFoto.APROBADA, filtro, categoriaId, desde, hasta).stream()
                .map(fotoMapper::toResponse)
                .toList();
    }

    public FotoResponse obtenerPublica(Long id) {
        FotoHistorica foto = buscarDetalle(id);
        if (foto.getEstado() != EstadoFoto.APROBADA) {
            throw new NotFoundException("Foto no encontrada");
        }
        return fotoMapper.toResponse(foto);
    }

    @Transactional
    public FotoResponse crearAporte(
            Long colaboradorId,
            String titulo,
            String descripcion,
            Integer anioAproximado,
            Long idCategoria,
            String contactoComplementario,
            Boolean autorizacionPublicacion,
            MultipartFile imagen
    ) {
        if (titulo == null || titulo.isBlank()) {
            throw new BadRequestException("El título es obligatorio");
        }
        if (!Boolean.TRUE.equals(autorizacionPublicacion)) {
            throw new BadRequestException("Debés aceptar la autorización de publicación");
        }

        Usuario colaborador = usuarioService.buscarActivoPorId(colaboradorId);
        StoredImage storedImage = imageStorageService.upload(imagen);

        FotoHistorica foto = new FotoHistorica();
        foto.setTitulo(titulo.trim());
        foto.setDescripcion(descripcion);
        foto.setAnioAproximado(anioAproximado);
        foto.setCategoria(categoriaService.buscarPorId(idCategoria));
        foto.setContactoComplementario(contactoComplementario);
        foto.setAutorizacionPublicacion(true);
        foto.setColaborador(colaborador);
        foto.setEstado(EstadoFoto.PENDIENTE);
        foto.setStorageProvider(storedImage.provider());
        foto.setStoragePublicId(storedImage.publicId());
        foto.setUrlImagen(storedImage.secureUrl());
        foto.setUrlThumbnail(storedImage.thumbnailUrl());
        foto.setNombreArchivoOriginal(storedImage.originalFilename());

        return fotoMapper.toResponse(fotoRepository.save(foto));
    }

    public List<FotoResponse> listarMisFotos(Long colaboradorId) {
        return fotoRepository.findByColaboradorIdOrderByFechaCargaDesc(colaboradorId).stream()
                .map(fotoMapper::toResponse)
                .toList();
    }

    public List<FotoResponse> listarAdmin(EstadoFoto estado) {
        return fotoRepository.buscarAdmin(estado).stream()
                .map(fotoMapper::toResponse)
                .toList();
    }

    public FotoResponse obtenerAdmin(Long id) {
        return fotoMapper.toResponse(buscarDetalle(id));
    }

    @Transactional
    public FotoResponse editar(Long id, FotoUpdateRequest request) {
        FotoHistorica foto = buscarDetalle(id);
        if (request.titulo() != null && !request.titulo().isBlank()) {
            foto.setTitulo(request.titulo().trim());
        }
        if (request.descripcion() != null) {
            foto.setDescripcion(request.descripcion());
        }
        if (request.anioAproximado() != null) {
            foto.setAnioAproximado(request.anioAproximado());
        }
        if (request.idCategoria() != null) {
            foto.setCategoria(categoriaService.buscarPorId(request.idCategoria()));
        }
        return fotoMapper.toResponse(foto);
    }

    @Transactional
    public FotoResponse aprobar(Long id, Long adminId) {
        FotoHistorica foto = buscarDetalle(id);
        foto.setEstado(EstadoFoto.APROBADA);
        foto.setFechaRevision(LocalDateTime.now());
        foto.setAdminRevision(usuarioService.buscarActivoPorId(adminId));
        foto.setObservacionesAdmin(null);
        return fotoMapper.toResponse(foto);
    }

    @Transactional
    public FotoResponse rechazar(Long id, Long adminId, String observacion) {
        FotoHistorica foto = buscarDetalle(id);
        foto.setEstado(EstadoFoto.RECHAZADA);
        foto.setFechaRevision(LocalDateTime.now());
        foto.setAdminRevision(usuarioService.buscarActivoPorId(adminId));
        foto.setObservacionesAdmin(observacion);
        return fotoMapper.toResponse(foto);
    }

    @Transactional
    public void eliminar(Long id) {
        FotoHistorica foto = buscarDetalle(id);
        imageStorageService.delete(foto.getStoragePublicId());
        fotoRepository.delete(foto);
    }

    private FotoHistorica buscarDetalle(Long id) {
        return fotoRepository.findDetalleById(id)
                .orElseThrow(() -> new NotFoundException("Foto no encontrada"));
    }
}
