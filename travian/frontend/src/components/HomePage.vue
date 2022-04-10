<template lang="html">
  <div class="home">
    <NavBar/>
  </div>
</template>

<script>
import NavBar from "./NavBar";
export default {
  name: "HomePage",
  components: {
    NavBar,
  },
};
</script>

<style lang="css">
.home {
  height: 100vh;
  width: 100vw;
  background: url("home.png") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>