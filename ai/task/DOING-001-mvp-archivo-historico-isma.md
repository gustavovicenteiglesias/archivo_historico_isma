# Tarea 001: MVP Archivo Historico Digital ISMA

## Estado
DOING

## Objetivo
Construir la base funcional del proyecto con React, Spring Boot, MySQL y Cloudinary, preparada para publicar solo fotos aprobadas y revisar aportes de la comunidad.

## Criterios de Aceptacion
- [x] Documentacion `ai` adaptada al proyecto ISMA.
- [x] Backend Spring Boot creado por capas.
- [x] Modelo MySQL definido para usuarios, categorias y fotos historicas.
- [x] Servicio de imagenes desacoplado de Cloudinary.
- [x] Endpoints publicos, colaborador y admin definidos.
- [x] Frontend React + Material UI creado con pantallas minimas.
- [x] `.env.example`, README y scripts iniciales agregados.

## Archivos Involucrados
- `ai/context.md`
- `ai/decisions.md`
- `ai/project-map.md`
- `backend/`
- `frontend/`
- `db/`
- `.env.example`
- `README.md`

## Notas o Restricciones
- No guardar imagenes en MySQL como BLOB.
- No exponer claves de Cloudinary ni Google OAuth en frontend.
- Disenar mobile-first.
- Volumen esperado: menor a 1000 fotos, pero con optimizacion obligatoria.
