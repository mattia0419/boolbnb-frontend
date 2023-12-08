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
    addDays() {
      var data = new Date(this.createdAt);
      data.setDate(data.getDate() + this.days);
      console.log(data);
    },
  },

  created() {
    axios.get(store.api.baseUrl).then((response) => {
      for (let i = 0; i < response.data.data.length; i++) {
        if (response.data.data[i].sponsorships.length > 0) {
          // this.createdAt =
          //   response.data.data[i].sponsorships[0].pivot.created_at;
          // this.days = response.data.data[i].sponsorships[0].duration;
          // this.addDays();
          store.featuredApartments.push(response.data.data[i]);
        } else {
          store.apartments.push(response.data.data[i]);
        }
      }

      // store.apartments = response.data.data;
      // console.log(response.data.data);
      // console.log(store.apartments[0].sponsorships[0].pivot);
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
