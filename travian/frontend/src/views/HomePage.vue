<!-- views/HomePage.vue -->

<template>
  <div class="container">
    <h1>Home Page</h1>
    <p>Welcome to the Home Page, {{ username }}</p>
    <Home />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAuthStore } from '@/store/auth';
import Home from '@/components/Home.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    Home
  },
  setup() {
    const authStore = useAuthStore();
    const username = computed(() => authStore.username);

    return {
      username,
    };
  }
});
</script>

<style scoped>
/* Add your styles for HomePage */
.container {
  padding: 20px;
}
</style>
