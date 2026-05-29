import { AppBar, Box, Button, Container, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const items = [
    { label: 'Inicio', to: '/', icon: <HomeIcon /> },
    { label: 'Galer\u00eda', to: '/galeria', icon: <PhotoLibraryIcon /> },
    ...(user ? [
      { label: 'Aportar', to: '/aportar', icon: <AddPhotoAlternateIcon /> },
      { label: 'Mis aportes', to: '/mis-aportes', icon: <CollectionsBookmarkIcon /> },
    ] : []),
    ...(isAdmin ? [{ label: 'Admin', to: '/admin', icon: <AdminPanelSettingsIcon /> }] : []),
  ];

  const closeDrawer = () => setOpen(false);

  const handleLogout = () => {
    logout();
    closeDrawer();
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1.25, minHeight: 64 }}>
          <Brand />

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            <Button component={RouterLink} to="/galeria" startIcon={<PhotoLibraryIcon />} size="small">
              {'Galer\u00eda'}
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
              <Button component={RouterLink} to="/login" startIcon={<LoginIcon />} size="small">
                Ingresar
              </Button>
            )}
          </Box>

          <IconButton
            onClick={() => setOpen(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
            aria-label="Abrir menu"
            edge="end"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={open} onClose={closeDrawer}>
        <Box sx={{ width: 280, py: 1 }} role="presentation">
          <Box sx={{ px: 2, py: 1.5 }}>
            <Brand compact />
          </Box>
          <Divider />
          <List>
            {items.map((item) => (
              <ListItemButton key={item.to} component={RouterLink} to={item.to} onClick={closeDrawer}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
            <Divider sx={{ my: 1 }} />
            {user ? (
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText primary="Salir" />
              </ListItemButton>
            ) : (
              <ListItemButton component={RouterLink} to="/login" onClick={closeDrawer}>
                <ListItemIcon><LoginIcon /></ListItemIcon>
                <ListItemText primary="Ingresar" />
              </ListItemButton>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

function Brand({ compact = false }) {
  return (
    <Box
      component={RouterLink}
      to="/"
      sx={{
        color: 'primary.main',
        textDecoration: 'none',
        fontWeight: 800,
        flexGrow: compact ? 0 : 1,
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
      <Typography sx={{ fontWeight: 800 }}>
        ISMA Archivo
      </Typography>
    </Box>
  );
}
