import api from './api';

// Corresponde a GET /usuarios (ruta de admin)
const getUsers = async (params = {}) => {
  const response = await api.get('/usuarios', { params });
  return response.data; // Espera una lista de usuarios
};

// Corresponde a POST /admin/users (ruta de admin)
const createUserByAdmin = async (userData) => {
  const response = await api.post('/admin/users', userData);
  return response.data;
};

// Corresponde a GET /users/{id} (ruta de admin)
const getUserById = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// Corresponde a PUT /users/{id} (ruta de admin)
const updateUserByAdmin = async (userId, userData) => {
  const response = await api.put(`/users/${userId}`, userData);
  return response.data;
};

// Corresponde a DELETE /users/{id} (ruta de admin)
const deleteUserByAdmin = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

export default {
  getUsers,
  createUserByAdmin,
  getUserById,
  updateUserByAdmin,
  deleteUserByAdmin,
};
