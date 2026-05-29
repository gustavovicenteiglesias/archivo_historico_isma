import { Button, Link, Paper, Stack, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { loginWithGoogle } = useAuth();

  return (
    <Paper sx={{ p: { xs: 2, md: 4 }, maxWidth: 520, mx: 'auto' }}>
      <Stack spacing={2}>
        <Typography variant="h1">Ingresar</Typography>
        <Typography color="text.secondary">
          Para aportar una foto necesitamos identificarte internamente. Tu email no se muestra en la galería pública.
          {' '}Al continuar, tenes disponibles los{' '}
          <Link component={RouterLink} to="/terminos">términos de publicación</Link>.
        </Typography>
        <Button variant="contained" size="large" startIcon={<GoogleIcon />} onClick={loginWithGoogle}>
          Continuar con Google
        </Button>
        <Button component={RouterLink} to="/admin-login" variant="text" startIcon={<AdminPanelSettingsIcon />}>
          Acceso administrador
        </Button>
      </Stack>
    </Paper>
  );
}
