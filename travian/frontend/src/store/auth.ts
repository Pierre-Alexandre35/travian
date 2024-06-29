// store/auth.ts

import { defineStore } from 'pinia';
import apiClient from '@/api/api';

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isLoggedIn: false,
    username: null,
    token: null,
  }),
  actions: {
    async login(this: any, username: string, password: string): Promise<void> {
      try {
        const response = await apiClient.post('/token', {
          username: username,
          password: password
        });

        const { access_token } = response.data;

        this.isLoggedIn = true;
        this.username = username;
        this.token = access_token;

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('username', username);
      } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Login failed');
      }
    },
    logout(this: any): void {
      this.isLoggedIn = false;
      this.username = null;
      this.token = null;

      localStorage.removeItem('access_token');
      localStorage.removeItem('username');
    },
    initializeStore() {
      const token = localStorage.getItem('access_token');
      const username = localStorage.getItem('username');

      if (token && username) {
        this.isLoggedIn = true;
        this.token = token;
        this.username = username;
      }
    }
  }
});
