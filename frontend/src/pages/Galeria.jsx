import { Alert, Box, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
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
          setError(err.response?.data?.messages?.[0] || 'No se pudo cargar la galería.');
        });
    }, 250);
    return () => clearTimeout(timer);
  }, [q, categoriaId]);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h1">Galería pública</Typography>
        <Typography color="text.secondary">Solo se muestran fotos aprobadas por administración.</Typography>
      </Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <TextField label="Buscar" value={q} onChange={(e) => setQ(e.target.value)} fullWidth />
        <TextField
          label="Categoría"
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
      <Grid container spacing={2}>
        {fotos.map((foto) => (
          <Grid item xs={12} sm={6} md={4} key={foto.id}>
            <FotoCard foto={foto} />
          </Grid>
        ))}
      </Grid>
      {!fotos.length && !error && (
        <Alert severity="info">Todavía no hay fotos aprobadas para mostrar.</Alert>
      )}
    </Stack>
  );
}
