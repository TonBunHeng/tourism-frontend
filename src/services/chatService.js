import api from './api';

export const chatService = {
  async getChats(params = {}) {
    return await api.get('/chats', { params });
  },

  async getChatById(id) {
    return await api.get(`/chats/${id}`);
  },

  async createChat(data) {
    return await api.post('/chats', data);
  },

  async sendMessage(chatId, messageText) {
    return await api.post(`/chats/${chatId}/messages`, { message_text: messageText });
  },

  async updateStatus(chatId, data) {
    return await api.put(`/chats/${chatId}/status`, data);
  }
};

export default chatService;
