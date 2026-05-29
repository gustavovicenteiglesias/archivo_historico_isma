package ar.edu.isma.archivo.controller;

import ar.edu.isma.archivo.dto.FotoResponse;
import ar.edu.isma.archivo.security.AppUserPrincipal;
import ar.edu.isma.archivo.service.FotoHistoricaService;
import java.util.List;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/colaborador")
public class ColaboradorController {
    private final FotoHistoricaService fotoService;

    public ColaboradorController(FotoHistoricaService fotoService) {
        this.fotoService = fotoService;
    }

    @PostMapping("/fotos")
    public FotoResponse crearFoto(
            @AuthenticationPrincipal AppUserPrincipal principal,
            @RequestParam String titulo,
            @RequestParam(required = false) String descripcion,
            @RequestParam(required = false) Integer anioAproximado,
            @RequestParam Long idCategoria,
            @RequestParam(required = false) String contactoComplementario,
            @RequestParam Boolean autorizacionPublicacion,
            @RequestPart("imagen") MultipartFile imagen
    ) {
        return fotoService.crearAporte(
                principal.getId(),
                titulo,
                descripcion,
                anioAproximado,
                idCategoria,
                contactoComplementario,
                autorizacionPublicacion,
                imagen
        );
    }

    @GetMapping("/mis-fotos")
    public List<FotoResponse> misFotos(@AuthenticationPrincipal AppUserPrincipal principal) {
        return fotoService.listarMisFotos(principal.getId());
    }
}
