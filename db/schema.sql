CREATE DATABASE IF NOT EXISTS isma_archivo
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE isma_archivo;

CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario BIGINT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  proveedor_auth ENUM('GOOGLE', 'FACEBOOK', 'LOCAL') NOT NULL,
  proveedor_id VARCHAR(255),
  rol ENUM('ADMIN', 'COLABORADOR') NOT NULL DEFAULT 'COLABORADOR',
  activo BOOLEAN DEFAULT TRUE,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  ultimo_acceso DATETIME NULL,
  UNIQUE KEY uk_usuario_proveedor (proveedor_auth, proveedor_id),
  UNIQUE KEY uk_usuario_email_proveedor (email, proveedor_auth)
);

CREATE TABLE IF NOT EXISTS categorias (
  id_categoria BIGINT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS fotos_historicas (
  id_foto BIGINT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT,
  anio_aproximado INT,
  contacto_complementario VARCHAR(150),
  nombre_archivo_original VARCHAR(255),
  storage_provider ENUM('CLOUDINARY') NOT NULL DEFAULT 'CLOUDINARY',
  storage_public_id VARCHAR(255) NOT NULL,
  url_imagen VARCHAR(500) NOT NULL,
  url_thumbnail VARCHAR(500),
  estado ENUM('PENDIENTE', 'APROBADA', 'RECHAZADA') DEFAULT 'PENDIENTE',
  destacada BOOLEAN DEFAULT FALSE,
  autorizacion_publicacion BOOLEAN DEFAULT FALSE,
  id_categoria BIGINT,
  id_colaborador BIGINT NOT NULL,
  fecha_carga DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_revision DATETIME NULL,
  id_admin_revision BIGINT NULL,
  observaciones_admin TEXT,
  CONSTRAINT fk_fotos_categoria FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
  CONSTRAINT fk_fotos_colaborador FOREIGN KEY (id_colaborador) REFERENCES usuarios(id_usuario),
  CONSTRAINT fk_fotos_admin FOREIGN KEY (id_admin_revision) REFERENCES usuarios(id_usuario)
);
