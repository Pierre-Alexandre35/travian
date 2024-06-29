// src/store/auth.ts

import { defineStore } from 'pinia';
import apiClient from '@/api/api';

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
        
        // Assuming your backend returns the username in the response
        const { access_token, username: responseUsername } = response.data;

        // Save username and set logged in status
        this.isLoggedIn = true;
        this.username = responseUsername;

        // Save token to localStorage or sessionStorage if needed
        localStorage.setItem('access_token', access_token);

        // You may want to redirect here after successful login
        // Example: router.push('/home');
      } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Login failed');
      }
    },
    logout(this: any): void {
      // Clear user data and set logged out status
      this.isLoggedIn = false;
      this.username = '';

      // Clear token from localStorage or sessionStorage if used
      localStorage.removeItem('access_token');
    }
  }
});
