import { Alert, Box, Button, Checkbox, FormControlLabel, Link, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { crearAporte, getCategorias } from '../api/fotosApi';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function AportarFoto() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    anioAproximado: '',
    idCategoria: '',
    contactoComplementario: '',
    autorizacionPublicacion: false,
    imagen: null,
  });
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    getCategorias().then(setCategorias);
  }, []);

  const setValue = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const selectImage = (file) => {
    setError('');
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Solo se aceptan imágenes JPG, PNG o WEBP.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('La imagen no puede superar 10 MB.');
      return;
    }
    setValue('imagen', file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    selectImage(event.dataTransfer.files?.[0]);
  };

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (!form.imagen) {
      setError('Selecciona una imagen.');
      return;
    }
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== '') data.append(key, value);
    });
    setSubmitting(true);
    try {
      await crearAporte(data);
      navigate('/mis-aportes');
    } catch (err) {
      setError(err.response?.data?.messages?.[0] || 'No se pudo enviar la foto.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper component="form" onSubmit={submit} sx={{ p: { xs: 2, md: 4 }, maxWidth: 760, mx: 'auto' }}>
      <Stack spacing={2}>
        <Typography variant="h1">Aportar una foto</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Título" value={form.titulo} onChange={(e) => setValue('titulo', e.target.value)} required />
        <TextField label="Descripción" value={form.descripcion} onChange={(e) => setValue('descripcion', e.target.value)} multiline minRows={4} />
        <TextField label="Año aproximado" type="number" value={form.anioAproximado} onChange={(e) => setValue('anioAproximado', e.target.value)} />
        <TextField label="Categoría" value={form.idCategoria} onChange={(e) => setValue('idCategoria', e.target.value)} select required>
          {categorias.map((categoria) => (
            <MenuItem key={categoria.id} value={categoria.id}>{categoria.nombre}</MenuItem>
          ))}
        </TextField>
        <TextField label="Contacto complementario" value={form.contactoComplementario} onChange={(e) => setValue('contactoComplementario', e.target.value)} />
        <Box
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          component="label"
          sx={{
            border: '2px dashed',
            borderColor: dragActive ? 'primary.main' : 'divider',
            bgcolor: dragActive ? 'rgba(20, 83, 45, 0.06)' : 'background.default',
            borderRadius: 2,
            p: { xs: 2.5, sm: 4 },
            textAlign: 'center',
            cursor: 'pointer',
            transition: '160ms ease',
          }}
        >
          <Stack spacing={1.25} alignItems="center">
            {form.imagen ? (
              <ImageIcon color="primary" fontSize="large" />
            ) : (
              <CloudUploadIcon color="primary" fontSize="large" />
            )}
            <Typography fontWeight={700}>
              {form.imagen ? form.imagen.name : 'Arrastra una imagen o toca para seleccionarla'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              JPG, PNG o WEBP. Máximo 10 MB.
            </Typography>
            {form.imagen && (
              <Typography variant="body2" color="text.secondary">
                {(form.imagen.size / 1024 / 1024).toFixed(2)} MB
              </Typography>
            )}
          </Stack>
          <input hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => selectImage(e.target.files[0])} />
        </Box>
        <FormControlLabel
          control={<Checkbox checked={form.autorizacionPublicacion} onChange={(e) => setValue('autorizacionPublicacion', e.target.checked)} />}
          label={(
            <Typography variant="body2">
              Declaro que tengo autorización suficiente para enviar esta imagen al Archivo Histórico Digital ISMA, o que soy titular de los derechos necesarios sobre la foto. Autorizo a la institución a revisarla, almacenarla y publicarla con fines históricos, educativos e institucionales. Acepto los{' '}
              <Link component={RouterLink} to="/terminos" target="_blank" rel="noopener">
                términos y autorización de publicación
              </Link>
              .
            </Typography>
          )}
        />
        <Button type="submit" variant="contained" disabled={submitting}>
          Enviar para revisión
        </Button>
      </Stack>
    </Paper>
  );
}
