// auth.ts

import { defineStore } from 'pinia';
import apiClient from '@/api/api';
import { useRouter } from 'vue-router';

interface AuthState {
  isLoggedIn: boolean;
  username: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isLoggedIn: false,
    username: '',
  }),
  actions: {
    async login(this: any, username: string, password: string): Promise<void> {
      try {
        const response = await apiClient.post('/token', {
          username: username,
          password: password
        });
        
        const { access_token, username: returnedUsername } = response.data;

        this.isLoggedIn = true;
        this.username = returnedUsername;

        localStorage.setItem('access_token', access_token);
      } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Login failed');
      }
    },
    logout(this: any): void {
      this.isLoggedIn = false;
      this.username = '';
      localStorage.removeItem('access_token');
    }
  }
});
