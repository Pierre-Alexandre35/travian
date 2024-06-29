<!-- Login.vue -->

<template>
    <div class="container">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label>Username:</label> <!-- Change label to Username -->
          <input type="text" v-model="username" required> <!-- Change type to text and v-model to username -->
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '@/store/auth';
  
  export default {
    name: 'Login',
    setup() {
      const authStore = useAuthStore();
      const username = ref('');
      const password = ref('');
  
      const login = async () => {
        try {
          await authStore.login(username.value, password.value);
          // Redirect to home page or wherever needed after successful login
          // Example: router.push('/home');
        } catch (error) {
          console.error(error);
          // Handle login error
        }
      };
  
      return {
        username,
        password,
        login,
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles for Login */
  </style>
  