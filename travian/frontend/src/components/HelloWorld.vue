<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="onButtonClick($event)">Click here</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>