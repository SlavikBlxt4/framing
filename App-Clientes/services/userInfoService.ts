import api from './api'; // tu instancia de Axios

export const getUserById = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
