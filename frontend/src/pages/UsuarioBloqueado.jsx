import { Alert, Button, Paper, Stack, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';

export default function UsuarioBloqueado() {
  return (
    <Paper sx={{ p: { xs: 2.5, md: 4 }, maxWidth: 620, mx: 'auto' }}>
      <Stack spacing={2}>
        <Alert severity="warning">Usuario bloqueado</Alert>
        <Typography variant="h1">No podemos iniciar tu sesión</Typography>
        <Typography color="text.secondary">
          Tu usuario fue bloqueado para realizar aportes en el Archivo Histórico Digital ISMA.
          Si considerás que se trata de un error, comunicate con la institución para revisar la situación.
        </Typography>
        <Button component={RouterLink} to="/" variant="contained" startIcon={<HomeIcon />}>
          Volver al inicio
        </Button>
      </Stack>
    </Paper>
  );
}
