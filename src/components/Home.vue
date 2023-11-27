<script>
import { store } from "../data/store";

export default {
  data() {
    return {
      store,
    };
  },

  //   methods: {
  //     fetchProjects(uri = this.api.baseUrl + "apartment") {
  //       axios.get(uri).then((responce) => {
  //         this.apartments = responce.data.data;
  //       });
  //     },
  //   },

  //   created() {
  //     this.fetchProjects();
  //   },
};
</script>

<template>
  <div class="container">
    <div class="card" v-for="apartment in store.apartments">
      <div class="card-header">
        <h3>{{ apartment.title }}</h3>
      </div>
      <div class="card-body">
        <p>{{ apartment.id }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
