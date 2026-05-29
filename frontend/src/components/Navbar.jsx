import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1.25, minHeight: 64 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 800,
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              minWidth: 0,
            }}
          >
            <Box
              component="img"
              src="/isma_logo_transparente.png"
              alt="ISMA"
              sx={{ width: 38, height: 38, objectFit: 'contain', flexShrink: 0 }}
            />
            <Typography sx={{ fontWeight: 800, display: { xs: 'none', sm: 'block' } }}>
              ISMA Archivo
            </Typography>
          </Box>
          <Button component={RouterLink} to="/galeria" startIcon={<PhotoLibraryIcon />} size="small">
            Galería
          </Button>
          {user && (
            <Button component={RouterLink} to="/aportar" startIcon={<AddPhotoAlternateIcon />} size="small">
              Aportar
            </Button>
          )}
          {user && (
            <Button component={RouterLink} to="/mis-aportes" startIcon={<CollectionsBookmarkIcon />} size="small">
              Mis aportes
            </Button>
          )}
          {isAdmin && (
            <Button component={RouterLink} to="/admin" startIcon={<AdminPanelSettingsIcon />} size="small">
              Admin
            </Button>
          )}
          {user ? (
            <Button onClick={logout} startIcon={<LogoutIcon />} size="small">
              Salir
            </Button>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button component={RouterLink} to="/login" size="small">Ingresar</Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
