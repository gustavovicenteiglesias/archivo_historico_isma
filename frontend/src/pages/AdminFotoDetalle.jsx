import { Alert, Box, Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { aprobarFoto, eliminarFoto, getAdminFoto, getCategorias, rechazarFoto, updateAdminFoto } from '../api/fotosApi';

export default function AdminFotoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foto, setFoto] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [observacion, setObservacion] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [working, setWorking] = useState(false);

  useEffect(() => {
    getCategorias().then(setCategorias).catch(() => setError('No se pudieron cargar las categorías.'));
    getAdminFoto(id)
      .then((data) => {
        setFoto({
          ...data,
          idCategoria: data.idCategoria || '',
        });
      })
      .catch(() => setError('No se pudo cargar la foto para revisión.'));
  }, [id]);

  const setValue = (field, value) => setFoto((current) => ({ ...current, [field]: value }));

  const guardar = async () => {
    await runAction(async () => {
      const updated = await updateAdminFoto(id, {
        titulo: foto.titulo,
        descripcion: foto.descripcion,
        anioAproximado: foto.anioAproximado || null,
        idCategoria: foto.idCategoria || null,
      });
      setFoto({ ...updated, idCategoria: updated.idCategoria || '' });
      setMessage('Cambios guardados.');
    });
  };

  const aprobar = async () => {
    await runAction(async () => {
      const updated = await aprobarFoto(id);
      setFoto({ ...updated, idCategoria: updated.idCategoria || '' });
      setMessage('Foto aprobada. Ya puede verse en la galería pública.');
    });
  };

  const rechazar = async () => {
    await runAction(async () => {
      const updated = await rechazarFoto(id, observacion);
      setFoto({ ...updated, idCategoria: updated.idCategoria || '' });
      setMessage('Foto rechazada. No se mostrará públicamente.');
    });
  };

  const eliminar = async () => {
    await runAction(async () => {
      await eliminarFoto(id);
      navigate('/admin');
    });
  };

  const runAction = async (action) => {
    setMessage('');
    setError('');
    setWorking(true);
    try {
      await action();
    } catch (err) {
      setError(err.response?.data?.messages?.[0] || 'No se pudo completar la acción.');
    } finally {
      setWorking(false);
    }
  };

  if (!foto) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h1">Revisión de foto</Typography>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Paper sx={{ overflow: 'hidden' }}>
        <Box component="img" src={foto.urlImagen} alt={foto.titulo} sx={{ width: '100%', maxHeight: 620, objectFit: 'contain', bgcolor: '#111' }} />
      </Paper>
      <Paper sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={2}>
          <TextField label="Título" value={foto.titulo || ''} onChange={(e) => setValue('titulo', e.target.value)} />
          <TextField label="Descripción" value={foto.descripcion || ''} onChange={(e) => setValue('descripcion', e.target.value)} multiline minRows={4} />
          <TextField label="Año aproximado" type="number" value={foto.anioAproximado || ''} onChange={(e) => setValue('anioAproximado', e.target.value)} />
          <TextField label="Categoría" value={foto.idCategoria} onChange={(e) => setValue('idCategoria', e.target.value)} select>
            {categorias.map((categoria) => (
              <MenuItem key={categoria.id} value={categoria.id}>{categoria.nombre}</MenuItem>
            ))}
          </TextField>
          <TextField label="Observacion para rechazo" value={observacion} onChange={(e) => setObservacion(e.target.value)} multiline minRows={2} />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button startIcon={<SaveIcon />} variant="outlined" onClick={guardar} disabled={working}>Guardar</Button>
            <Button startIcon={<CheckIcon />} variant="contained" color="success" onClick={aprobar} disabled={working}>Aprobar</Button>
            <Button startIcon={<CloseIcon />} variant="contained" color="warning" onClick={rechazar} disabled={working}>Rechazar</Button>
            <Button startIcon={<DeleteIcon />} variant="outlined" color="error" onClick={eliminar} disabled={working}>Eliminar</Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
