import { api } from './client';

export const getAdminUsuarios = async () => {
  const { data } = await api.get('/api/admin/usuarios');
  return data;
};

export const bloquearUsuario = async (id) => {
  const { data } = await api.patch(`/api/admin/usuarios/${id}/bloquear`);
  return data;
};

export const desbloquearUsuario = async (id) => {
  const { data } = await api.patch(`/api/admin/usuarios/${id}/desbloquear`);
  return data;
};

export const cambiarRolUsuario = async (id, rol) => {
  const { data } = await api.patch(`/api/admin/usuarios/${id}/rol`, { rol });
  return data;
};
