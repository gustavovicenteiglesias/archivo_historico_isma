import { Alert, Button, Chip, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';
import { bloquearUsuario, cambiarRolUsuario, desbloquearUsuario, getAdminUsuarios } from '../api/usuariosApi';
import { useAuth } from '../context/AuthContext';

export default function AdminUsuarios() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [workingId, setWorkingId] = useState(null);

  const load = () => {
    getAdminUsuarios()
      .then(setUsuarios)
      .catch(() => setError('No se pudieron cargar los usuarios.'));
  };

  useEffect(() => {
    load();
  }, []);

  const runAction = async (id, action, successMessage) => {
    setWorkingId(id);
    setMessage('');
    setError('');
    try {
      const updated = await action();
      setUsuarios((current) => current.map((usuario) => (usuario.id === id ? updated : usuario)));
      setMessage(successMessage);
    } catch (err) {
      setError(err.response?.data?.messages?.[0] || 'No se pudo completar la acción.');
    } finally {
      setWorkingId(null);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h2">Usuarios</Typography>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      {usuarios.map((usuario) => {
        const isSelf = usuario.id === user?.id;
        return (
          <Paper key={usuario.id} sx={{ p: 2 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
              <Stack sx={{ flex: 1, minWidth: 0 }}>
                <Typography fontWeight={700}>{usuario.nombre}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>
                  {usuario.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {usuario.proveedorAuth} {usuario.ultimoAcceso ? `- último acceso ${new Date(usuario.ultimoAcceso).toLocaleDateString()}` : ''}
                </Typography>
              </Stack>
              <Chip label={usuario.activo ? 'ACTIVO' : 'BLOQUEADO'} color={usuario.activo ? 'success' : 'error'} />
              <TextField
                label="Rol"
                value={usuario.rol}
                onChange={(event) => runAction(
                  usuario.id,
                  () => cambiarRolUsuario(usuario.id, event.target.value),
                  'Rol actualizado.',
                )}
                select
                size="small"
                disabled={isSelf || workingId === usuario.id}
                sx={{ minWidth: 170 }}
              >
                <MenuItem value="COLABORADOR">
                  <Stack direction="row" spacing={1} alignItems="center"><PersonIcon fontSize="small" /> <span>COLABORADOR</span></Stack>
                </MenuItem>
                <MenuItem value="ADMIN">
                  <Stack direction="row" spacing={1} alignItems="center"><AdminPanelSettingsIcon fontSize="small" /> <span>ADMIN</span></Stack>
                </MenuItem>
              </TextField>
              {usuario.activo ? (
                <Button
                  startIcon={<BlockIcon />}
                  color="error"
                  variant="outlined"
                  disabled={isSelf || workingId === usuario.id}
                  onClick={() => runAction(usuario.id, () => bloquearUsuario(usuario.id), 'Usuario bloqueado.')}
                >
                  Bloquear
                </Button>
              ) : (
                <Button
                  startIcon={<CheckCircleIcon />}
                  color="success"
                  variant="outlined"
                  disabled={workingId === usuario.id}
                  onClick={() => runAction(usuario.id, () => desbloquearUsuario(usuario.id), 'Usuario desbloqueado.')}
                >
                  Desbloquear
                </Button>
              )}
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
}
