import { api } from './client';

export const loginAdmin = async (email, password) => {
  const { data } = await api.post('/auth/admin/login', { email, password });
  return data;
};

export const getMe = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};
