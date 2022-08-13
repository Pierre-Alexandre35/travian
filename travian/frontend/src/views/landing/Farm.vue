<template>
  <nav id="navbar"></nav>
  <h2>Home</h2>
  <h3>{{ $route.query.id }}</h3>
</template>

<script>
export default {
  props: {
    foo: {
      type: Number,
      required: true,
    },
  },
};
</script>
<style>
/* Style the navbar */
#navbar {
  overflow: hidden;
  background-color: #73655a;
  height: 30px;
}

/* Navbar links */
#navbar a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px;
  text-decoration: none;
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