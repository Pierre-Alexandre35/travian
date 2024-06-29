<!-- App.vue -->

<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navbar
  }
});
</script>

<style scoped>
/* Add your scoped global styles here */
</style>
