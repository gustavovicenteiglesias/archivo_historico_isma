package ar.edu.isma.archivo.controller;

import ar.edu.isma.archivo.dto.CategoriaResponse;
import ar.edu.isma.archivo.dto.FotoResponse;
import ar.edu.isma.archivo.service.CategoriaService;
import ar.edu.isma.archivo.service.FotoHistoricaService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
public class PublicController {
    private final FotoHistoricaService fotoService;
    private final CategoriaService categoriaService;

    public PublicController(FotoHistoricaService fotoService, CategoriaService categoriaService) {
        this.fotoService = fotoService;
        this.categoriaService = categoriaService;
    }

    @GetMapping("/fotos")
    public List<FotoResponse> listarFotos(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) Integer desde,
            @RequestParam(required = false) Integer hasta
    ) {
        return fotoService.listarPublicas(q, categoriaId, desde, hasta);
    }

    @GetMapping("/fotos/{id}")
    public FotoResponse obtenerFoto(@PathVariable Long id) {
        return fotoService.obtenerPublica(id);
    }

    @GetMapping("/categorias")
    public List<CategoriaResponse> listarCategorias() {
        return categoriaService.listar();
    }
}
