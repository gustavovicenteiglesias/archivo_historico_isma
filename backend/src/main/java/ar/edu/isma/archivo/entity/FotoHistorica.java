package ar.edu.isma.archivo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "fotos_historicas")
public class FotoHistorica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_foto")
    private Long id;

    @Column(nullable = false, length = 150)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "anio_aproximado")
    private Integer anioAproximado;

    @Column(name = "contacto_complementario", length = 150)
    private String contactoComplementario;

    @Column(name = "nombre_archivo_original")
    private String nombreArchivoOriginal;

    @Enumerated(EnumType.STRING)
    @Column(name = "storage_provider", nullable = false)
    private StorageProvider storageProvider = StorageProvider.CLOUDINARY;

    @Column(name = "storage_public_id", nullable = false)
    private String storagePublicId;

    @Column(name = "url_imagen", nullable = false, length = 500)
    private String urlImagen;

    @Column(name = "url_thumbnail", length = 500)
    private String urlThumbnail;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoFoto estado = EstadoFoto.PENDIENTE;

    private Boolean destacada = false;

    @Column(name = "autorizacion_publicacion")
    private Boolean autorizacionPublicacion = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_colaborador", nullable = false)
    private Usuario colaborador;

    @Column(name = "fecha_carga", insertable = false, updatable = false)
    private LocalDateTime fechaCarga;

    @Column(name = "fecha_revision")
    private LocalDateTime fechaRevision;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_admin_revision")
    private Usuario adminRevision;

    @Column(name = "observaciones_admin", columnDefinition = "TEXT")
    private String observacionesAdmin;

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getAnioAproximado() {
        return anioAproximado;
    }

    public void setAnioAproximado(Integer anioAproximado) {
        this.anioAproximado = anioAproximado;
    }

    public String getContactoComplementario() {
        return contactoComplementario;
    }

    public void setContactoComplementario(String contactoComplementario) {
        this.contactoComplementario = contactoComplementario;
    }

    public String getNombreArchivoOriginal() {
        return nombreArchivoOriginal;
    }

    public void setNombreArchivoOriginal(String nombreArchivoOriginal) {
        this.nombreArchivoOriginal = nombreArchivoOriginal;
    }

    public StorageProvider getStorageProvider() {
        return storageProvider;
    }

    public void setStorageProvider(StorageProvider storageProvider) {
        this.storageProvider = storageProvider;
    }

    public String getStoragePublicId() {
        return storagePublicId;
    }

    public void setStoragePublicId(String storagePublicId) {
        this.storagePublicId = storagePublicId;
    }

    public String getUrlImagen() {
        return urlImagen;
    }

    public void setUrlImagen(String urlImagen) {
        this.urlImagen = urlImagen;
    }

    public String getUrlThumbnail() {
        return urlThumbnail;
    }

    public void setUrlThumbnail(String urlThumbnail) {
        this.urlThumbnail = urlThumbnail;
    }

    public EstadoFoto getEstado() {
        return estado;
    }

    public void setEstado(EstadoFoto estado) {
        this.estado = estado;
    }

    public Boolean getDestacada() {
        return destacada;
    }

    public void setDestacada(Boolean destacada) {
        this.destacada = destacada;
    }

    public Boolean getAutorizacionPublicacion() {
        return autorizacionPublicacion;
    }

    public void setAutorizacionPublicacion(Boolean autorizacionPublicacion) {
        this.autorizacionPublicacion = autorizacionPublicacion;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Usuario getColaborador() {
        return colaborador;
    }

    public void setColaborador(Usuario colaborador) {
        this.colaborador = colaborador;
    }

    public LocalDateTime getFechaCarga() {
        return fechaCarga;
    }

    public LocalDateTime getFechaRevision() {
        return fechaRevision;
    }

    public void setFechaRevision(LocalDateTime fechaRevision) {
        this.fechaRevision = fechaRevision;
    }

    public Usuario getAdminRevision() {
        return adminRevision;
    }

    public void setAdminRevision(Usuario adminRevision) {
        this.adminRevision = adminRevision;
    }

    public String getObservacionesAdmin() {
        return observacionesAdmin;
    }

    public void setObservacionesAdmin(String observacionesAdmin) {
        this.observacionesAdmin = observacionesAdmin;
    }
}
