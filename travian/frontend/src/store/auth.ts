import { defineStore } from 'pinia';
import apiClient, { login as apiLogin, getUserInfo } from '@/api/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('access_token') || null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    async initializeStore() {
      if (this.token) {
        await this.fetchUser();
      }
    },
    async login(username: string, password: string) {
      const data = await apiLogin(username, password);
      this.token = data.access_token;
      localStorage.setItem('access_token', this.token);
      await this.fetchUser();
    },
    async fetchUser() {
      const data = await getUserInfo();
      this.user = data;
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('access_token');
    }
  }
});
