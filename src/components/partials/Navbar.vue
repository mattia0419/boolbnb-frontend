<script>
import axios from "axios";
import { store } from "../../data/store";
export default {
  data() {
    return {
      isSearchDisabled: true,
      searchQuery: "",
      searchResults: [],
      store,
    };
  },

  methods: {
    filterApartments() {
      // Azzerare l'array prima di applicare il filtro
      this.store.bathroomsFilter = 1;
      this.store.bedsFilter = 1;
      this.store.roomsFilter = 1;
      this.store.radiusFilter = 20;
      this.store.apartmentsToShow.splice(0, this.store.apartmentsToShow.length);
      this.store.featuredApartmentsToShow.splice(
        0,
        this.store.featuredApartmentsToShow.length
      );

      for (let i = 0; i < this.store.featuredApartments.length; i++) {
        const puntoDaControllare = this.puntoInCerchio(
          this.store.featuredApartments[i].latitude,
          this.store.featuredApartments[i].longitude,
          this.store.searchedAddress.position.lat,
          this.store.searchedAddress.position.lon,
          this.store.radiusFilter
        );

        if (
          puntoDaControllare &&
          this.store.featuredApartments[i].bathrooms >=
            this.store.bathroomsFilter &&
          this.store.featuredApartments[i].beds >= this.store.bedsFilter &&
          this.store.featuredApartments[i].rooms >= this.store.roomsFilter
        ) {
          this.store.featuredApartmentsToShow.push(
            this.store.featuredApartments[i]
          );
          // console.log(this.store.apartmentsToShow);
        } else {
          // console.log("Il punto non si trova all'interno del cerchio.");
        }
      }

      for (let i = 0; i < this.store.apartments.length; i++) {
        const puntoDaControllare = this.puntoInCerchio(
          this.store.apartments[i].latitude,
          this.store.apartments[i].longitude,
          this.store.searchedAddress.position.lat,
          this.store.searchedAddress.position.lon,
          this.store.radiusFilter
        );

        if (
          puntoDaControllare &&
          this.store.apartments[i].bathrooms >= this.store.bathroomsFilter &&
          this.store.apartments[i].beds >= this.store.bedsFilter &&
          this.store.apartments[i].rooms >= this.store.roomsFilter
        ) {
          this.store.apartmentsToShow.push(this.store.apartments[i]);
          // console.log(this.store.apartmentsToShow);
        } else {
          // console.log("Il punto non si trova all'interno del cerchio.");
        }
      }

      this.sortedApartments();
    },
    puntoInCerchio(latPunto, lonPunto, latCentro, lonCentro, raggio) {
      const raggioTerra = 6371; // Raggio medio della Terra in chilometri

      // Converte le latitudini e longitudini da gradi a radianti
      const latRadPunto = (latPunto * Math.PI) / 180;
      const lonRadPunto = (lonPunto * Math.PI) / 180;
      const latRadCentro = (latCentro * Math.PI) / 180;
      const lonRadCentro = (lonCentro * Math.PI) / 180;

      // Calcola la distanza tra i due punti usando la formula dell'Earth's haversine
      const deltaLat = latRadCentro - latRadPunto;
      const deltaLon = lonRadCentro - lonRadPunto;
      const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(latRadPunto) *
          Math.cos(latRadCentro) *
          Math.sin(deltaLon / 2) *
          Math.sin(deltaLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distanza = raggioTerra * c;

      return distanza <= raggio;
    },
    handleInput() {
      if (this.searchQuery.length >= 1) {
        this.searchResults = [];
        this.searchLocations();
      }
    },

    searchLocations() {
      const apiKey = "EoW1gArKxlBBEKl68AZm1uhfhcLougV4"; // Sostituisci con la tua chiave API
      const apiUrl = "https://api.tomtom.com/search/2/search/";
      const fuzzySearchUrl = `${apiUrl}${encodeURIComponent(
        this.searchQuery
      )}.json`;

      // Esegui la chiamata Axios alle API di TomTom
      axios
        .get(fuzzySearchUrl, {
          params: {
            key: apiKey,
            countrySet: "IT",
            language: "it-IT",
          },
        })
        .then((response) => {
          // Aggiorna i risultati della ricerca nel componente
          this.searchResults = response.data.results;
        })
        .catch((error) => {
          if (error.response.status === 429) {
            setTimeout(() => {
              this.searchLocations();
            }, 500);
          }
        });
    },

    dropdownResult(address) {
      this.searchQuery = address;
      // console.log(address);
    },

    storeAddressObject(addressObject) {
      this.store.searchedAddress = {};
      this.store.searchedAddress = addressObject;
      this.isSearchDisabled = false;
      console.log(this.store.searchedAddress);
    },

    sortedApartments() {
      // Ordina gli appartamenti per distanza
      this.store.featuredApartmentsToShow =
        this.store.featuredApartmentsToShow.sort((a, b) => {
          const distanceA = this.calculateDistance(a);
          const distanceB = this.calculateDistance(b);
          return distanceA - distanceB;
        });

      this.store.apartmentsToShow = this.store.apartmentsToShow.sort((a, b) => {
        const distanceA = this.calculateDistance(a);
        const distanceB = this.calculateDistance(b);
        return distanceA - distanceB;
      });
    },

    calculateDistance(apartment) {
      const R = 6371; // Raggio medio della Terra in chilometri
      const dLat = this.degreesToRadians(
        apartment.latitude - this.store.searchedAddress.position.lat
      );
      const dLon = this.degreesToRadians(
        apartment.longitude - this.store.searchedAddress.position.lon
      );

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(
          this.degreesToRadians(this.store.searchedAddress.position.lat)
        ) *
          Math.cos(this.degreesToRadians(apartment.latitude)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c; // Distanza in chilometri

      return distance.toFixed(2); // Arrotonda la distanza a due decimali
    },

    degreesToRadians(degrees) {
      return degrees * (Math.PI / 180);
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
            <router-link
              class="nav-link active"
              aria-current="page"
              :to="{ name: 'home' }"
              >Home</router-link
            >
            <!-- <a class="nav-link active" aria-current="page" href="http://127.0.0.1:8000/admin">Home</a> -->
          </li>
          <li class="nav-item">
            <a
              class="nav-link active"
              aria-current="page"
              href="http://127.0.0.1:8000/admin"
              >Dashboard</a
            >
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

          <ul class="dropdown-menu w-100" v-show="searchResults.length">
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
          :class="isSearchDisabled ? 'disabled' : ''"
          class="btn btn-primary"
          v-slot="{ navigate }"
          :to="{
            name: 'searchpage',
          }"
          ><span @click="filterApartments" role="link"
            >Search</span
          ></router-link
        >
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.dropdown-menu {
  overflow: hidden;
  & .dropdown-item:hover {
    transform: scale(1.01);
  }
}
li.nav-item:hover {
  transform: scale(1.1);
}
</style>
