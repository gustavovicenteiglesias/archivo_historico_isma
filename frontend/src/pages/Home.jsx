import { Box, Button, Link, Paper, Stack, Typography } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';
import UploadIcon from '@mui/icons-material/Upload';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
  return (
    <Stack spacing={4}>
      <Box sx={{ py: { xs: 2, md: 5 }, maxWidth: 860 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} alignItems={{ xs: 'flex-start', sm: 'center' }}>
          <Box
            component="img"
            src="/isma_logo_transparente.png"
            alt="Escudo ISMA"
            sx={{ width: { xs: 96, sm: 118 }, height: 'auto', flexShrink: 0 }}
          />
          <Box>
            <Typography variant="h1" sx={{ mb: 2 }}>
              Archivo Histórico Digital ISMA
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: '1.1rem', mb: 3 }}>
              Un espacio para reunir, cuidar y compartir fotografías históricas aportadas por la comunidad educativa.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button component={RouterLink} to="/galeria" variant="contained" startIcon={<CollectionsIcon />}>
                Ver galería
              </Button>
              <Button component={RouterLink} to="/aportar" variant="outlined" startIcon={<UploadIcon />}>
                Aportar una foto
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Paper sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h2" sx={{ mb: 1 }}>
          125 años de memoria compartida
        </Typography>
        <Typography color="text.secondary">
          Las fotos enviadas quedan pendientes hasta que un administrador revise los datos y autorice su publicación.
          {' '}Consulta los{' '}
          <Link component={RouterLink} to="/terminos">términos de publicación</Link>
          {' '}antes de enviar material.
        </Typography>
      </Paper>
    </Stack>
  );
}
