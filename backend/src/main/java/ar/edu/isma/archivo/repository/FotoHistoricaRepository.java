package ar.edu.isma.archivo.repository;

import ar.edu.isma.archivo.entity.EstadoFoto;
import ar.edu.isma.archivo.entity.FotoHistorica;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FotoHistoricaRepository extends JpaRepository<FotoHistorica, Long> {
    @Query("""
            select f from FotoHistorica f
            left join fetch f.categoria
            left join fetch f.colaborador
            where f.estado = :estado
              and (:texto is null or lower(f.titulo) like lower(concat('%', :texto, '%'))
                   or lower(f.descripcion) like lower(concat('%', :texto, '%')))
              and (:categoriaId is null or f.categoria.id = :categoriaId)
              and (:desde is null or f.anioAproximado >= :desde)
              and (:hasta is null or f.anioAproximado <= :hasta)
            order by f.fechaCarga desc
            """)
    List<FotoHistorica> buscarAprobadas(
            @Param("estado") EstadoFoto estado,
            @Param("texto") String texto,
            @Param("categoriaId") Long categoriaId,
            @Param("desde") Integer desde,
            @Param("hasta") Integer hasta
    );

    @Query("""
            select f from FotoHistorica f
            left join fetch f.categoria
            left join fetch f.colaborador
            where f.id = :id
            """)
    java.util.Optional<FotoHistorica> findDetalleById(@Param("id") Long id);

    @Query("""
            select f from FotoHistorica f
            left join fetch f.categoria
            left join fetch f.colaborador
            where f.colaborador.id = :colaboradorId
            order by f.fechaCarga desc
            """)
    List<FotoHistorica> findByColaboradorIdOrderByFechaCargaDesc(@Param("colaboradorId") Long colaboradorId);

    @Query("""
            select f from FotoHistorica f
            left join fetch f.categoria
            left join fetch f.colaborador
            where (:estado is null or f.estado = :estado)
            order by f.fechaCarga desc
            """)
    List<FotoHistorica> buscarAdmin(@Param("estado") EstadoFoto estado);
}
