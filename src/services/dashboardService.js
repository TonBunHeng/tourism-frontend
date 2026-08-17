import api from './api';

export const dashboardService = {
  async getStats() {
    return await api.get('/dashboard/stats');
  }
};

export default dashboardService;
