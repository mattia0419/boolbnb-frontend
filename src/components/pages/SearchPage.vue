<script>
import { store } from "../../data/store";
import axios from "axios";
export default {
  data() {
    return {
      store,
      apartmentsToShow: [],
    };
  },
  methods: {
    // logResults() {
    //   console.log(this.store.apartments);
    //   console.log(this.store.searchedAddress);
    // },

    filterApartments() {
      for (let i = 0; i < this.store.apartments.length; i++) {
        if (
          this.store.apartments[i].latitude ==
          this.store.searchedAddress.position.lat
        ) {
          this.apartmentsToShow.push(this.store.apartments[i]);
          console.log(this.apartmentsToShow);
        }
      }
    },
  },

  created() {
    // this.logResults();
    this.filterApartments();
  },
};
</script>

<template>
  <div class="container">
    <div class="row row-cols-3">
      <div v-for="apartment in this.apartmentsToShow" class="col">
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
