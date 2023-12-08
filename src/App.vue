<script>
import axios from "axios";
import Navbar from "./components/partials/Navbar.vue";
import { store } from "./data/store";
import { router } from "./router";

export default {
  data() {
    return {
      store,
      createdAt: "",
      days: "",
    };
  },

  methods: {
    getExpirationDate() {
      let data = new Date(this.createdAt);
      data.setDate(data.getDate() + this.days);

      return data;
    },
  },

  created() {
    axios.get(store.api.baseUrl).then((response) => {
      for (let i = 0; i < response.data.data.length; i++) {
        if (response.data.data[i].sponsorships.length > 0) {
          this.createdAt =
            response.data.data[i].sponsorships[0].pivot.created_at;
          this.days = response.data.data[i].sponsorships[0].duration;

          let expirationDate = this.getExpirationDate();
          let today = new Date();

          if (today <= expirationDate) {
            store.featuredApartments.push(response.data.data[i]);
          } else {
            store.apartments.push(response.data.data[i]);
          }
        } else {
          store.apartments.push(response.data.data[i]);
        }
      }
    });
  },

  components: {
    Navbar,
    router,
  },
};
</script>

<template>
  <Navbar />
  <router-view></router-view>
  <!-- <SearchPage></SearchPage> -->
</template>

<style lang="scss"></style>
