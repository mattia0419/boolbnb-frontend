<script>
import axios from "axios";
import Home from "./components/Home.vue";
import Navbar from "./components/partials/Navbar.vue";
import { store } from "./data/store";

export default {
  data() {
    return {
      store,
    };
  },
  created() {
    axios.get(store.api.baseUrl).then((response) => {
      store.apartments = response.data.data;
    });
  },
  components: {
    Home,
    Navbar,
  },
};
</script>

<template>
  <Navbar />
  <Home />
  <!-- <SearchPage></SearchPage> -->
</template>

<style lang="scss"></style>
