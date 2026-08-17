import api from './api';

export const authService = {
  async login(credentials) {
    const res = await api.post('/auth/login', credentials);
    if (res.success && res.data?.token) {
      localStorage.setItem('auth_token', res.data.token);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res;
  },

  async register(data) {
    const res = await api.post('/auth/register', data);
    if (res.success && res.data?.token) {
      localStorage.setItem('auth_token', res.data.token);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res;
  },

  async me() {
    const res = await api.get('/auth/me');
    if (res.success && res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
    }
    return res;
  },

  async updateProfile(data) {
    const res = await api.put('/auth/profile', data);
    if (res.success && res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
    }
    return res;
  },

  async updateAvatar(imageData) {
    try {
      let payload = imageData;
      if (typeof imageData === 'string') {
        payload = { avatar: imageData, image: imageData };
      }
      const res = await api.post('/auth/avatar', payload);
      if (res.success && res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
      }
      return res;
    } catch (e) {
      // Fallback to updateProfile if avatar specific endpoint returns 404
      return this.updateProfile({ avatar: imageData, image: imageData });
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      return null;
    }
  }
};

export default authService;
