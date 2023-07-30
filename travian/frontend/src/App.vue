<template>
  <div id="app" class="container my-3">
    <h3>Vue Axios example</h3>

    <div class="card mt-3">
      <div class="card-header">Vue Axios GET - BezKoder.com</div>
      <div class="card-body">
        <div class="input-group input-group-sm">
          <button class="btn btn-sm btn-primary" @click="getAllData">Get All</button>


        </div>           
      </div>
    </div>
 
  </div>
</template>

<script>
import http from "./http-common";

export default {
  name: "App",
  data() {
    return {
      getResult: null,
      postResult: null,
      putResult: null,
      deleteResult: null,
    }
  },
  methods: {
    fortmatResponse(res) {
      return JSON.stringify('ddd');
      console.log('sdds');
    },

    async getAllData() {
      try {
        const res = await http.get("/");

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };
        this.getResult = this.fortmatResponse(result);
        console.log(result);
      } catch (err) {
        this.getResult = this.fortmatResponse(err.response?.data) || err;
      }
    },
  }
}
</script>

<style>
#app {
  max-width: 600px;
  margin: auto;
}
</style>