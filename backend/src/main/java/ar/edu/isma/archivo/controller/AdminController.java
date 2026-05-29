package ar.edu.isma.archivo.controller;

import ar.edu.isma.archivo.dto.FotoResponse;
import ar.edu.isma.archivo.dto.FotoUpdateRequest;
import ar.edu.isma.archivo.dto.RechazoRequest;
import ar.edu.isma.archivo.entity.EstadoFoto;
import ar.edu.isma.archivo.security.AppUserPrincipal;
import ar.edu.isma.archivo.service.FotoHistoricaService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final FotoHistoricaService fotoService;

    public AdminController(FotoHistoricaService fotoService) {
        this.fotoService = fotoService;
    }

    @GetMapping("/fotos")
    public List<FotoResponse> listar(@RequestParam(required = false) EstadoFoto estado) {
        return fotoService.listarAdmin(estado);
    }

    @GetMapping("/fotos/{id}")
    public FotoResponse detalle(@PathVariable Long id) {
        return fotoService.obtenerAdmin(id);
    }

    @PutMapping("/fotos/{id}")
    public FotoResponse editar(@PathVariable Long id, @Valid @RequestBody FotoUpdateRequest request) {
        return fotoService.editar(id, request);
    }

    @PatchMapping("/fotos/{id}/aprobar")
    public FotoResponse aprobar(@PathVariable Long id, @AuthenticationPrincipal AppUserPrincipal principal) {
        return fotoService.aprobar(id, principal.getId());
    }

    @PatchMapping("/fotos/{id}/rechazar")
    public FotoResponse rechazar(
            @PathVariable Long id,
            @AuthenticationPrincipal AppUserPrincipal principal,
            @Valid @RequestBody RechazoRequest request
    ) {
        return fotoService.rechazar(id, principal.getId(), request.observacion());
    }

    @DeleteMapping("/fotos/{id}")
    public void eliminar(@PathVariable Long id) {
        fotoService.eliminar(id);
    }
}
