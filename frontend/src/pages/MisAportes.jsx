import { Chip, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getMisFotos } from '../api/fotosApi';

export default function MisAportes() {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    getMisFotos().then(setFotos);
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h1">Mis aportes</Typography>
      {fotos.map((foto) => (
        <Paper key={foto.id} sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <img src={foto.urlThumbnail || foto.urlImagen} alt={foto.titulo} width="92" height="70" style={{ objectFit: 'cover', borderRadius: 6 }} />
            <Stack sx={{ flex: 1 }}>
              <Typography fontWeight={700}>{foto.titulo}</Typography>
              <Typography variant="body2" color="text.secondary">{foto.categoria}</Typography>
            </Stack>
            <Chip label={foto.estado} color={foto.estado === 'APROBADA' ? 'success' : foto.estado === 'RECHAZADA' ? 'error' : 'warning'} />
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}
