<script>
import { store } from "../../data/store";
import axios from "axios";
export default {
  data() {
    return {
      store,
    };
  },

  methods: {
    filterApartments() {
      // Azzerare l'array prima di applicare il filtro
      this.store.apartmentsToShow.splice(0, this.store.apartmentsToShow.length);

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
        } else {
          console.log("Il punto non si trova all'interno del cerchio.");
        }
      }
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

    getDistance(location) {
      const R = 6371; // Raggio della Terra in km
      const dLat = this.deg2rad(
        location.lat - this.store.searchedAddress.position.lat
      );
      const dLon = this.deg2rad(
        location.lon - this.store.searchedAddress.position.lon
      );
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(this.store.searchedAddress.position.lat)) *
          Math.cos(this.deg2rad(location.lat)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distanza in km
      return distance;
    },

    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
  },

  computed: {
    // Calcola e restituisci l'array ordinato in base alla distanza dal punto fisso
    sortedLocations() {
      return this.store.apartmentsToShow.slice().sort((a, b) => {
        const distanceA = this.getDistance(a);
        const distanceB = this.getDistance(b);
        return distanceA - distanceB;
      });
    },
  },

  created() {
    // Ascolta l'evento emesso dal componente Header.vue e ordina gli oggetti
    this.root.on("order-by-distance", () => {
      this.store.apartmentsToShow = this.sortedLocations;
    });
  },
};
</script>

<template>
  <div class="container">
    <h2 class="my-3">Results</h2>

    <!-- filters -->
    <div class="row row-cols-6 my-5 g-3">
      <div class="col">
        <label for="rooms">Rooms (min)</label>
        <input
          type="number"
          min="1"
          max="5"
          value="1"
          class="form-control"
          v-model="this.store.roomsFilter"
        />
      </div>

      <div class="col">
        <label for="beds">Bedrooms (min)</label>
        <input
          type="number"
          min="1"
          max="5"
          value="1"
          class="form-control"
          v-model="this.store.bedsFilter"
        />
      </div>

      <div class="col">
        <label for="bathrooms">Bathrooms (min)</label>
        <input
          type="number"
          min="1"
          max="5"
          value="1"
          class="form-control"
          v-model="this.store.bathroomsFilter"
        />
      </div>

      <div class="col">
        <label for="radius">Radius (km)</label>
        <input
          type="number"
          min="1"
          value="20"
          class="form-control"
          v-model="this.store.radiusFilter"
        />
      </div>

      <div class="col mt-auto">
        <div class="btn btn-primary" @click="filterApartments">Filter</div>
      </div>
    </div>

    <!-- apartments -->
    <div class="row row-cols-3 my-5 g-3">
      <div v-for="apartment in this.store.apartmentsToShow" class="col">
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
