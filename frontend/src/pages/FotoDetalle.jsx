import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFotoPublica } from '../api/fotosApi';
import { CONTACT_EMAIL } from '../config/appConfig';

export default function FotoDetalle() {
  const { id } = useParams();
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    getFotoPublica(id).then(setFoto);
  }, [id]);

  if (!foto) {
    return <Typography>Cargando...</Typography>;
  }

  const reviewSubject = encodeURIComponent(`Archivo Histórico ISMA - Revisión foto ${foto.id}`);
  const reviewBody = encodeURIComponent(`Hola ISMA,\n\nSolicito revisar esta publicación del Archivo Histórico Digital:\n\nFoto: ${foto.titulo}\nID: ${foto.id}\nURL: ${window.location.href}\n\nMotivo de la solicitud:\n`);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h1">{foto.titulo}</Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 1 }}>
          {foto.anioAproximado && <Chip label={foto.anioAproximado} />}
          {foto.categoria && <Chip label={foto.categoria} color="primary" variant="outlined" />}
        </Stack>
      </Box>
      <Paper sx={{ overflow: 'hidden' }}>
        <Box component="img" src={foto.urlImagen} alt={foto.titulo} sx={{ width: '100%', maxHeight: 720, objectFit: 'contain', bgcolor: '#111' }} />
      </Paper>
      <Typography sx={{ whiteSpace: 'pre-wrap' }}>{foto.descripcion || 'Sin descripcion ampliada.'}</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }} justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Si considerás que esta imagen debe corregirse, contextualizarse o retirarse, podés solicitar su revisión a la institución.
          </Typography>
          <Button
            href={`mailto:${CONTACT_EMAIL}?subject=${reviewSubject}&body=${reviewBody}`}
            startIcon={<ReportProblemIcon />}
            variant="outlined"
            color="warning"
          >
            Solicitar revisión
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
