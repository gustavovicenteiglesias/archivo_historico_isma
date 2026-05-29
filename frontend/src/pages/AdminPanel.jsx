import { Box, Button, Chip, MenuItem, Paper, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getAdminFotos } from '../api/fotosApi';
import AdminUsuarios from './AdminUsuarios';

const estados = ['', 'PENDIENTE', 'APROBADA', 'RECHAZADA'];

export default function AdminPanel() {
  const [estado, setEstado] = useState('PENDIENTE');
  const [fotos, setFotos] = useState([]);
  const [tab, setTab] = useState('fotos');

  useEffect(() => {
    if (tab === 'fotos') {
      getAdminFotos(estado).then(setFotos);
    }
  }, [estado, tab]);

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
        <Typography variant="h1">Panel de administración</Typography>
        {tab === 'fotos' && (
          <TextField label="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} select sx={{ minWidth: 220 }}>
            {estados.map((item) => (
              <MenuItem key={item || 'TODAS'} value={item}>{item || 'TODAS'}</MenuItem>
            ))}
          </TextField>
        )}
      </Stack>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable" allowScrollButtonsMobile>
          <Tab value="fotos" label="Fotos" />
          <Tab value="usuarios" label="Usuarios" />
        </Tabs>
      </Box>
      {tab === 'usuarios' ? (
        <AdminUsuarios />
      ) : (
        fotos.map((foto) => (
          <Paper key={foto.id} sx={{ p: 2 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
              <img src={foto.urlThumbnail || foto.urlImagen} alt={foto.titulo} width="120" height="90" style={{ objectFit: 'cover', borderRadius: 6 }} />
              <Stack sx={{ flex: 1 }}>
                <Typography fontWeight={700}>{foto.titulo}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {foto.categoria} {foto.anioAproximado ? `- ${foto.anioAproximado}` : ''}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Colaborador: {foto.colaboradorNombre || 'Sin dato'}
                </Typography>
              </Stack>
              <Chip label={foto.estado} />
              <Button component={RouterLink} to={`/admin/fotos/${foto.id}`} startIcon={<VisibilityIcon />} variant="outlined">
                Revisar
              </Button>
            </Stack>
          </Paper>
        ))
      )}
    </Stack>
  );
}
