<script>
import axios from "axios";
import Navbar from "./components/partials/Navbar.vue";
import { store } from "./data/store";
import { router } from "./router";

export default {
  data() {
    return {
      store,
    };
  },
  created() {
    axios.get(store.api.baseUrl).then((response) => {
      store.apartments = response.data.data;
      console.log(response.data.data);
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
