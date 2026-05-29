package ar.edu.isma.archivo.repository;

import ar.edu.isma.archivo.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
