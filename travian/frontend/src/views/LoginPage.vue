<!-- views/LoginPage.vue -->

<template>
    <div class="container">
      <h1>Login Page</h1>
      <Login />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Login from '@/components/Login.vue';
  
  export default defineComponent({
    name: 'LoginPage',
    components: {
      Login,
    },
  });
  </script>
  
  <style scoped>
  /* Add scoped styles for LoginPage */
  </style>
  