import api from './api';

export const chatService = {
  getChats: async (params = {}) => {
    const response = await api.get('/chats', { params });
    return response.data;
  },

  getChatById: async (id) => {
    const response = await api.get(`/chats/${id}`);
    return response.data;
  },

  sendMessage: async (id, messageText) => {
    const response = await api.post(`/chats/${id}/messages`, { message_text: messageText });
    return response.data;
  },

  updateStatus: async (id, data) => {
    const response = await api.put(`/chats/${id}/status`, data);
    return response.data;
  },
};

export default chatService;
