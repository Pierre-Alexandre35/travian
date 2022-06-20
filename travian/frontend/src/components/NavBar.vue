<template>
  <navbar id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link class="icon-home" to="/about">TRAVIAN</router-link>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </navbar>
  <router-view />
</template>

<script>
export default {
  name: "NavBar",
  props: {
    msg: String,
  },
  methods: {
    onButtonClick() {
      console.log("Button has been clicked upon");
      // eslint-disable-next-line no-alert
      alert("Button has been clicked upon");
    },
  },
};
</script>

<style scoped>
/* Style the navbar */
navbar {
  position: absolute;
  left: 0px;
  height: 40px;
  width: 100%;
  text-align: center;
}

/* Navbar links */
navbar a {
  display: inline-block;
  color: #f2f2f2;
  text-align: center;
  padding: 18px;
  text-decoration: none;
  font-family: "Nova Cut", cursive;
  font-size: 25px;
}

/* Page content */
.content {
  padding: 16px;
}

/* The sticky class is added to the navbar with JS when it reaches its scroll position */
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

/* Add some top padding to the page content to prevent sudden quick movement (as the navigation bar gets a new position at the top of the page (position:fixed and top:0) */
.sticky + .content {
  padding-top: 60px;
}
</style>
