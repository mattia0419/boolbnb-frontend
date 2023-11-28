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
    fetchResults() {
      console.log(this.store.apartments);
      console.log(this.store.searchedAddress);
    },
  },
  created() {
    this.fetchResults();
  },
};
</script>

<template></template>

<style></style>
