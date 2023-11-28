<script>
import axios from "axios";
import Home from "./components/Home.vue";
// import SearchPage from "./components/SearchPage.vue";
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
  },
};
</script>

<template>
  <Home />
  <!-- <SearchPage></SearchPage> -->
</template>

<style lang="scss"></style>
