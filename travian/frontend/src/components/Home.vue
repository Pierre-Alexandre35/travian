<!-- views/HomePage.vue -->

<template>
  <div class="container">
    <h1>Home Page</h1>
    <p>Welcome to the Home Page, {{ username }}</p>
    <h2>Your Villages</h2>
    <ul>
      <li v-for="village in villages" :key="village.village_id">
        <h3>{{ village.name }}</h3>
        <p>Population: {{ village.population }}</p>
        <p>Position ID: {{ village.position_id }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useVillagesStore } from '@/store/villages';

export default defineComponent({
  name: 'HomePage',
  setup() {
    const authStore = useAuthStore();
    const villagesStore = useVillagesStore();

    const username = computed(() => authStore.username);
    const villages = computed(() => villagesStore.villages);

    onMounted(async () => {
      await villagesStore.fetchVillages();
    });

    return {
      username,
      villages,
    };
  }
});
</script>

<style scoped>
/* Add your styles for HomePage */
</style>
