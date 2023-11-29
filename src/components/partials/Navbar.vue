<script>
import axios from "axios";
import { store } from "../../data/store";
export default {
  data() {
    return {
      isSearchDisabled: true,
      searchQuery: "",
      searchResults: [],
      lastSearchTime: 0,
      minSearchInterval: 1000,
      store,
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

    dropdownResult(address) {
      this.searchQuery = address;
      // console.log(address);
    },

    storeAddressObject(addressObject) {
      this.store.searchedAddress = addressObject;
      this.isSearchDisabled = false;
      // console.log(addressObject);
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
            <router-link class="nav-link" :to="{ name: 'home' }"
              >Home</router-link
            >
            <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
        <div class="dropdown w-50">
          <input
            v-model="searchQuery"
            class="form-control me-2 dropdown-toggle"
            type="search"
            data-bs-toggle="dropdown"
            placeholder="Search"
            aria-label="Search"
            @input="handleInput"
          />

          <ul class="dropdown-menu">
            <li v-for="result in searchResults" :key="result.id">
              <a
                class="dropdown-item"
                href="#"
                @click="
                  dropdownResult(result.address.freeformAddress),
                    storeAddressObject(result)
                "
                >{{ result.address.freeformAddress }}</a
              >
            </li>
          </ul>
        </div>
        <router-link
          class="btn btn-primary"
          :class="isSearchDisabled ? 'disabled' : ''"
          :to="{
            name: 'searchpage',
          }"
          >Search</router-link
        >
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
