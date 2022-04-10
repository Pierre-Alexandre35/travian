<template lang="html">
<nav class="nav">
    <a class="nav-item">home</a>
    <a class="nav-item">demo</a>
    <a class="nav-item">contact</a>
</nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },
};
</script>


<style lang="css">
.nav {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
}
/* Navbar links */
.nav .nav-item {
  color: #f2f2f2;
  text-align: center;
  padding: 14px;
  text-decoration: none;
  margin: 10px;
  background-color: red;
}
</style>