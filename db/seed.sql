USE isma_archivo;

INSERT INTO categorias (nombre, descripcion) VALUES
('Actos escolares', 'Actos, ceremonias y actividades institucionales'),
('Promociones', 'Fotos de cursos, egresados y promociones'),
('Edificio escolar', 'Imagenes del edificio, aulas y espacios del colegio'),
('Docentes', 'Docentes y equipos educativos'),
('Alumnos', 'Estudiantes en distintos momentos historicos'),
('Eventos deportivos', 'Torneos, equipos y encuentros deportivos'),
('Celebraciones religiosas', 'Celebraciones y momentos pastorales'),
('Aniversarios', 'Festejos y conmemoraciones institucionales'),
('Documentos historicos', 'Documentos, recortes, diplomas y archivos'),
('Otros', 'Material historico que no encaja en otra categoria')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);
