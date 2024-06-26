<script setup>
import { ref, onMounted } from 'vue';

const mapData = ref([]);

onMounted(async () => {
  try {
    const { default: axios } = await import('axios');
    const response = await axios.get('http://localhost:8000/get_map_data');
    mapData.value = response.data;
  } catch (error) {
    console.error('Error fetching map data:', error);
  }
});
</script>

<template>
  <div class="map">
    <div v-for="(row, rowIndex) in mapData" :key="rowIndex" class="map-row">
      <div
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        class="map-cell"
        :class="{ 'has-village': cell.hasVillage }"
      >
        <img v-if="cell.hasVillage" src="village_image_path" alt="Village" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your scoped styles */
</style>
