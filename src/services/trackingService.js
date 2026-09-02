import api from './api';

export const trackingService = {
  getTelemetry: (params) => api.get('/tracking', { params }),
  getLiveFeed: () => api.get('/tracking/live'),
};

export default trackingService;
