import { Alert, Box, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import FotoCard from '../components/FotoCard';
import { getCategorias, getFotosPublicas } from '../api/fotosApi';

export default function Galeria() {
  const [fotos, setFotos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [q, setQ] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getCategorias().then(setCategorias).catch(() => setCategorias([]));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      getFotosPublicas({ q: q || undefined, categoriaId: categoriaId || undefined })
        .then((data) => {
          setFotos(data);
          setError('');
        })
        .catch((err) => {
          setFotos([]);
          setError(err.response?.data?.messages?.[0] || 'No se pudo cargar la galer\u00eda.');
        });
    }, 250);
    return () => clearTimeout(timer);
  }, [q, categoriaId]);

  return (
    <Stack spacing={3} sx={{ width: '100%', minWidth: 0, overflowX: 'hidden' }}>
      <Box>
        <Typography variant="h1">{'Galer\u00eda p\u00fablica'}</Typography>
        <Typography color="text.secondary">{'Solo se muestran fotos aprobadas por administraci\u00f3n.'}</Typography>
      </Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <TextField label="Buscar" value={q} onChange={(e) => setQ(e.target.value)} fullWidth />
        <TextField
          label={'Categor\u00eda'}
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          select
          sx={{ minWidth: { md: 260 } }}
        >
          <MenuItem value="">Todas</MenuItem>
          {categorias.map((categoria) => (
            <MenuItem key={categoria.id} value={categoria.id}>{categoria.nombre}</MenuItem>
          ))}
        </TextField>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            sm: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(3, minmax(0, 1fr))',
          },
          gap: 2,
          width: '100%',
          minWidth: 0,
        }}
      >
        {fotos.map((foto) => (
          <Box key={foto.id} sx={{ minWidth: 0 }}>
            <FotoCard foto={foto} />
          </Box>
        ))}
      </Box>
      {!fotos.length && !error && (
        <Alert severity="info">{'Todav\u00eda no hay fotos aprobadas para mostrar.'}</Alert>
      )}
    </Stack>
  );
}
