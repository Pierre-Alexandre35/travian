<template>
  <div id="app" class="container my-3">
    <h3>Vue Axios example</h3>

    <div class="card mt-3">
      <div class="card-header">Vue Axios GET - BezKoder.com</div>
      <div class="card-body">
        <div class="input-group input-group-sm">
          <button class="btn btn-sm btn-primary" @click="getAllData">Get All</button>

          <input type="text" ref="get_id" class="form-control ml-2" placeholder="Id" />
          <div class="input-group-append">
            <button class="btn btn-sm btn-primary" @click="getDataById">Get by Id</button>
          </div>

          <input type="text" ref="get_title" class="form-control ml-2" placeholder="Title" />
          <div class="input-group-append">
            <button class="btn btn-sm btn-primary" @click="getDataByTitle">Find By Title</button>
          </div>

          <button class="btn btn-sm btn-warning ml-2" @click="clearGetOutput">Clear</button>
        </div>

        <div v-if="getResult" class="alert alert-secondary mt-2" role="alert">
          <pre>{{ getResult }}</pre>
        </div>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header">Vue Axios POST - BezKoder.com</div>
      <div class="card-body">
        <div class="form-group">
          <input type="text" class="form-control" ref="username" placeholder="username" />
        </div>
        <div class="form-group">
          <input type="password" class="form-control" ref="password" placeholder="password" />
        </div>
        <button class="btn btn-sm btn-primary" @click="postData">Post Data</button>
        <button class="btn btn-sm btn-warning ml-2" @click="clearPostOutput">Clear</button>

        <div v-if="postResult" class="alert alert-secondary mt-2" role="alert">
          <pre>{{ postResult }}</pre>
        </div>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header">Vue Axios PUT - BezKoder.com</div>
      <div class="card-body">
        <div class="form-group">
          <input type="text" class="form-control" ref="put_id" placeholder="Id" />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" ref="put_title" placeholder="Title" />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" ref="put_description" placeholder="Description" />
        </div>
        <div class="form-check mb-2">
          <input type="checkbox" class="form-check-input" ref="put_published" />
          <label class="form-check-label" for="put_published">Publish</label>
        </div>
        <button class="btn btn-sm btn-primary" @click="putData">Update Data</button>
        <button class="btn btn-sm btn-warning ml-2" @click="clearPutOutput">Clear</button>

        <div v-if="putResult" class="alert alert-secondary mt-2" role="alert">
          <pre>{{ putResult }}</pre>
        </div>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header">Vue Axios DELETE - BezKoder.com</div>
      <div class="card-body">
        <div class="input-group input-group-sm">
          <button class="btn btn-sm btn-danger" @click="deleteAllData">Delete All</button>

          <input type="text" ref="delete_id" class="form-control ml-2" placeholder="Id" />
          <div class="input-group-append">
            <button class="btn btn-sm btn-danger" @click="deleteDataById">Delete by Id</button>
          </div>

          <button class="btn btn-sm btn-warning ml-2" @click="clearDeleteOutput">Clear</button>
        </div>

        <div v-if="deleteResult" class="alert alert-secondary mt-2" role="alert">
          <pre>{{ deleteResult }}</pre>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import http from "./http-commun";

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
      return JSON.stringify(res, null, 2);
    },

    async getAllData() {
      try {
        const res = await http.get("/tutorials");

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        this.getResult = this.fortmatResponse(result);
      } catch (err) {
        this.getResult = this.fortmatResponse(err.response?.data) || err;
      }
    },

    async getDataById() {
      const id = this.$refs.get_id.value;

      if (id) {
        try {
          const res = await http.get(`/tutorials/${id}`);

          const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };

          // const result = {
          //   data: res.data,
          //   status: res.status,
          //   statusText: res.statusText,
          //   headers: res.headers,
          //   config: res.config,
          // };

          this.getResult = this.fortmatResponse(result);
        } catch (err) {
          this.getResult = this.fortmatResponse(err.response?.data) || err;
        }
      }
    },

    async getDataByTitle() {
      const title = this.$refs.get_title.value;

      if (title) {
        try {
          // const res = await instance.get(`/tutorials?title=${title}`);
          const res = await http.get("/tutorials", {
            params: {
              title: title,
            },
          });

          const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };

          this.getResult = this.fortmatResponse(result);
        } catch (err) {
          this.getResult = this.fortmatResponse(err.response?.data) || err;
        }
      }
    },

    async postData() {
      const postData = {
        username: this.$refs.username.value,
        password: this.$refs.password.value,
      };

      try {
        const res = await http.post("http://localhost:8000/api/v1/token", postData, {
          headers: {
            "x-access-token": "token-value",
          },
        });

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        this.postResult = this.fortmatResponse(result);
      } catch (err) {
        this.postResult = this.fortmatResponse(err.response?.data) || err;
      }
    },

    async putData() {
      const { put_id, put_title, put_description, put_published } = this.$refs;
      const id = put_id.value;

      if (id) {
        const putData = {
          title: put_title.value,
          description: put_description.value,
          published: put_published.checked,
        };

        try {
          const res = await http.put(`/tutorials/${id}`, putData, {
            headers: {
              "x-access-token": "token-value",
            },
          });

          const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };

          this.putResult = this.fortmatResponse(result);
        } catch (err) {
          this.putResult = this.fortmatResponse(err.response?.data) || err;
        }
      }
    },

    async deleteAllData() {
      try {
        const res = await http.delete("/tutorials");

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        this.deleteResult = this.fortmatResponse(result);
      } catch (err) {
        this.deleteResult = this.fortmatResponse(err.response?.data) || err;
      }
    },

    async deleteDataById() {
      const id = this.$refs.delete_id.value;

      if (id) {
        try {
          const res = await http.delete(`/tutorials/${id}`);

          const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };

          this.deleteResult = this.fortmatResponse(result);
        } catch (err) {
          this.deleteResult = this.fortmatResponse(err.response?.data) || err;
        }
      }
    },

    clearGetOutput() {
      this.getResult = null;
    },

    clearPostOutput() {
      this.postResult = null;
    },

    clearPutOutput() {
      this.putResult = null;
    },

    clearDeleteOutput() {
      this.deleteResult = null;
    }
  }
}
</script>

<style>
#app {
  max-width: 600px;
  margin: auto;
}
</style>