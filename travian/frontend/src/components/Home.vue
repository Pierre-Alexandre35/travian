<!-- components/Home.vue -->

<template>
  <div class="village-list">
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
import { useVillagesStore } from '@/store/villages';
import { useAuthStore } from '@/store/auth';

export default defineComponent({
  name: 'Home',
  setup() {
    const authStore = useAuthStore();
    const villagesStore = useVillagesStore();
    const villages = computed(() => villagesStore.villages);

    onMounted(async () => {
      if (authStore.isLoggedIn) {
        try {
          await villagesStore.fetchVillages();
        } catch (error) {
          console.error('Failed to fetch villages:', error);
        }
      } else {
        console.error('User not authenticated');
      }
    });

    return {
      villages,
    };
  }
});
</script>

<style scoped>
.village-list {
  margin-top: 20px;
}
.village-list ul {
  list-style-type: none;
  padding: 0;
}
.village-list li {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
