<script>
import { store } from "../data/store";

export default {
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <div class="container">
    <a href="http://127.0.0.1:8000/admin" class="btn btn-primary my-3"
      >Dashboard</a
    >
    <div class="row row-cols-4 my-3 g-3">
      <div class="col" v-for="apartment in store.apartments">
        <div class="card">
          <div class="card-header">
            <h3>{{ apartment.title }}</h3>
          </div>
          <div class="card-body">
            <p>{{ apartment.id }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
