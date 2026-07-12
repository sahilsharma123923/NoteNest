import api from './api';

export const getUserInfo = async () => {
  const response = await api.get("/auth/getUser");
  return response.data;
};