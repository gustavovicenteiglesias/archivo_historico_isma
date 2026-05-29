USE isma_archivo;

ALTER TABLE categorias
  ADD UNIQUE KEY uk_categorias_nombre (nombre);
