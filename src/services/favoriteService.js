import api from './api';

export const favoriteService = {
  async getFavorites() {
    return await api.get('/favorites');
  },

  async addFavorite(placeId, visited = false) {
    return await api.post('/favorites', { place_id: placeId, visited });
  },

  async removeFavorite(placeId) {
    return await api.delete(`/favorites/${placeId}`);
  },

  async toggleVisited(id) {
    return await api.patch(`/favorites/${id}/toggle-visited`);
  }
};

export default favoriteService;
