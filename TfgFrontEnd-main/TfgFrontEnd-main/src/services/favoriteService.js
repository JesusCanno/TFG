import api from './api';

const favoriteService = {
  getFavorites: async () => {
    const response = await api.get('/favoritos');
    return response.data;
  },
  addFavorite: async (inmuebleId) => {
    const response = await api.post('/favoritos', { inmueble_id: inmuebleId });
    return response.data;
  },
  removeFavorite: async (inmuebleId) => {
    const response = await api.delete(`/favoritos/${inmuebleId}`);
    return response.data;
  }
};

export default favoriteService;
