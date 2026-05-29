# Checkpoint: Fix ImageStorageService en JAR

Fecha: 2026-05-29

Se diagnostico que el JAR leia correctamente `.env`, pero fallaba al crear `ImageStorageService`.

El reporte `--debug` mostraba:
- `CloudinaryConfig` matcheaba por credenciales presentes.
- `CloudinaryImageStorageService` no matcheaba por `@ConditionalOnBean(Cloudinary.class)`.
- `MissingImageStorageService` tampoco quedaba disponible.

Cambio aplicado:
- `CloudinaryImageStorageService` ahora se activa directamente si existen las credenciales Cloudinary.
- `MissingImageStorageService` ahora se activa directamente si falta alguna credencial Cloudinary.

Objetivo: evitar diferencias de orden de evaluacion entre `mvn spring-boot:run` y el JAR empaquetado.
