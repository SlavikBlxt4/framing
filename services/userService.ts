import api from './api';

export const updateClientProfile = async (data: {
  name?: string;
  password?: string;
  phone_number?: string;
}) => {
  return api.patch('/users/me', data);
};

export const getUserData = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
