<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      lastSearchTime: 0,
      minSearchInterval: 1000,
    };
  },

  methods: {
    handleInput() {
      const currentTime = Date.now();

      if (
        this.searchQuery.length >= 3 &&
        currentTime - this.lastSearchTime >= this.minSearchInterval
      ) {
        this.searchResults = [];
        this.searchLocations();
        this.lastSearchTime = currentTime;
      }
    },

    searchLocations() {
      const apiKey = "EoW1gArKxlBBEKl68AZm1uhfhcLougV4"; // Sostituisci con la tua chiave API
      const apiUrl =
        "https://api.tomtom.com/search/2/geocode/" + this.searchQuery + ".json";

      // Esegui la chiamata Axios alle API di TomTom
      axios
        .get(apiUrl, {
          params: {
            key: apiKey,
          },
        })
        .then((response) => {
          // Aggiorna i risultati della ricerca nel componente
          this.searchResults = response.data.results;
        })
        .catch((error) => {
          console.error("Errore nella ricerca:", error);
        });
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <a class="navbar-brand" href="#">BoolBnB</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
        <input
          v-model="searchQuery"
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          @keydown="handleInput"
        />
        <button class="btn btn-outline-success">Search</button>
        <ul>
          <li v-for="result in searchResults" :key="result.id">
            {{ result.address.freeformAddress }}
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
