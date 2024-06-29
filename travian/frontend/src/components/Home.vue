<!-- Home.vue -->

<template>
    <div class="container">
      <h1>Welcome to the Home Page</h1>
      <p>You are logged in as {{ userEmail }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useAuthStore } from '@/store/auth';
  
  export default defineComponent({
    name: 'Home',
    setup() {
      const authStore = useAuthStore();
  
      const userEmail = computed(() => authStore.userEmail);
  
      return {
        userEmail,
      };
    }
  });
  </script>
  
  <style scoped>
  /* Add your scoped styles for Home */
  </style>
  