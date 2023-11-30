<script>
import { store } from "../../data/store";
import axios from "axios";
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
    <div class="row row-cols-3">
      <div v-for="apartment in this.store.apartmentsToShow" class="col">
        <div class="card">
          <div class="card-header">
            {{ apartment.title }}
          </div>
          <div class="card-body">
            {{ apartment.address }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
