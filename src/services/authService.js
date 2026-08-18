import api from './api';

export const authService = {
  async login(credentials) {
    const res = await api.post('/auth/login', credentials);
    if (res.success && res.data?.token) {
      localStorage.setItem('auth_token', res.data.token);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.dispatchEvent(new Event('user-profile-updated'));
    }
    return res;
  },

  async register(data) {
    const res = await api.post('/auth/register', data);
    if (res.success && res.data?.token) {
      localStorage.setItem('auth_token', res.data.token);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.dispatchEvent(new Event('user-profile-updated'));
    }
    return res;
  },

  async me() {
    const res = await api.get('/auth/me');
    if (res.success && res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
      window.dispatchEvent(new Event('user-profile-updated'));
    }
    return res;
  },

  async updateProfile(data) {
    const res = await api.put('/auth/profile', data);
    if (res.success && res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
      window.dispatchEvent(new Event('user-profile-updated'));
    }
    return res;
  },

  async updateAvatar(imageData) {
    let payload = imageData;
    if (typeof imageData === 'string' || imageData === null) {
      payload = { avatar: imageData, image: imageData };
    }
    const res = await api.post('/auth/avatar', payload);
    if (res.success && res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
      window.dispatchEvent(new Event('user-profile-updated'));
    }
    return res;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // Ignore API errors on logout
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.clear();
      window.dispatchEvent(new Event('user-profile-updated'));
    }
  },

  isAuthenticated() {
    const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
    return Boolean(token && token !== 'undefined' && token !== 'null');
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
