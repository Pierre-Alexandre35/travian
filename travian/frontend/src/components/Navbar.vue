<!-- Navbar.vue -->

<template>
  <nav>
    <div class="container">
      <div class="brand">
        My App
      </div>
      <div v-if="isLoggedIn" class="user-info">
        Logged in as {{ username }}
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAuthStore } from '@/store/auth';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const authStore = useAuthStore();

    const isLoggedIn = computed(() => authStore.isLoggedIn);
    const username = computed(() => authStore.username);

    return {
      isLoggedIn,
      username,
    };
  }
});
</script>

<style scoped>
/* Add your scoped styles for Navbar */
</style>
