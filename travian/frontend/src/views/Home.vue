<template>
  <div class="home">
    <NavBar />
    <div class="presentation">
      <article>
        <h1>Join now</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          impedit temporibus fugit, aliquid dicta iusto.
        </p>
      </article>
      <div class="hero-container">
        <h1>Join now</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          impedit temporibus fugit, aliquid dicta iusto.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import NavBar from "@/components/NavBar.vue";
export default {
  name: "Home",
  components: {
    HelloWorld,
    NavBar,
  },
};
</script>

<style scoped>
.hero-container {
  height: 100%;
  width: 40%;
  background: pink;
}
article {
  height: 100%;
  width: 40%;
  background: yellow;
}
body {
  margin: 40px;
}

.sidebar {
  grid-area: sidebar;
}

.content {
  grid-area: content;
}

.header {
  grid-area: header;
}

.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 120px 120px 120px;
  grid-template-areas:
    "header  header  header"
    "sidebar content content";
  background-color: #fff;
  color: #444;
}

.box {
  background-color: #444;
  color: #fff;
  border-radius: 5px;
  padding: 20px;
  font-size: 150%;
}

.header {
  background-color: #999;
}

.overlay {
  background-color: red;
  grid-column: content-start / content-end;
  grid-row: header-start / content-end;
}

.home {
  background: url("../assets/home/background.jpeg") no-repeat center center
    fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;

  /* Preserve aspet ratio */
  min-width: 100%;
  min-height: 100%;
}
</style>