import { api } from './client';

export const getCategorias = async () => {
  const { data } = await api.get('/api/public/categorias');
  return data;
};

export const getFotosPublicas = async (params) => {
  const { data } = await api.get('/api/public/fotos', { params });
  return data;
};

export const getFotoPublica = async (id) => {
  const { data } = await api.get(`/api/public/fotos/${id}`);
  return data;
};

export const crearAporte = async (formData) => {
  const { data } = await api.post('/api/colaborador/fotos', formData);
  return data;
};

export const getMisFotos = async () => {
  const { data } = await api.get('/api/colaborador/mis-fotos');
  return data;
};

export const getAdminFotos = async (estado) => {
  const { data } = await api.get('/api/admin/fotos', { params: estado ? { estado } : {} });
  return data;
};

export const getAdminFoto = async (id) => {
  const { data } = await api.get(`/api/admin/fotos/${id}`);
  return data;
};

export const updateAdminFoto = async (id, payload) => {
  const { data } = await api.put(`/api/admin/fotos/${id}`, payload);
  return data;
};

export const aprobarFoto = async (id) => {
  const { data } = await api.patch(`/api/admin/fotos/${id}/aprobar`);
  return data;
};

export const rechazarFoto = async (id, observacion) => {
  const { data } = await api.patch(`/api/admin/fotos/${id}/rechazar`, { observacion });
  return data;
};

export const eliminarFoto = async (id) => {
  await api.delete(`/api/admin/fotos/${id}`);
};
