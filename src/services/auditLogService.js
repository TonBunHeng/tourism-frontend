import api from './api';

export const auditLogService = {
  getAuditLogs: async (params = {}) => {
    const response = await api.get('/audit-logs', { params });
    return response.data;
  },

  getAuditLogById: async (id) => {
    const response = await api.get(`/audit-logs/${id}`);
    return response.data;
  },

  exportAuditLogs: async () => {
    const response = await api.get('/audit-logs/export', { responseType: 'blob' });
    return response.data;
  },
};

export default auditLogService;
