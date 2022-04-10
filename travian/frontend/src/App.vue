<template>
  <HomePage msg="Welcome to Your Vue.js App" />
</template>
<style lang="scss">
@import "./styles/main.scss"; // $text-primary would be defined in that file
</style>
<script>
import HomePage from "./components/HomePage.vue";

export default {
  name: "App",
  components: {
    HomePage,
  },
};
</script>

