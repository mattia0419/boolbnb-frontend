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
    // logResults() {
    //   console.log(this.store.apartments);
    //   console.log(this.store.searchedAddress);
    // },
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

    filterApartments() {
      for (let i = 0; i < this.store.apartments.length; i++) {
        const puntodacontrollare = this.puntoInCerchio(
          this.store.apartments[i].latitude,
          this.store.apartments[i].longitude,
          this.store.searchedAddress.position.lat,
          this.store.searchedAddress.position.lon,
          20
        );
        console.log(this.store.apartments[i]);
        if (puntodacontrollare) {
          this.apartmentsToShow.push(this.store.apartments[i]);
          console.log(this.apartmentsToShow);
        } else {
          console.log("Il punto non si trova all'interno del cerchio.");
        }
      }
    },
  },

  created() {
    // this.logResults();
    this.filterApartments();
  },
};
</script>

<template>
  <div class="container">
    <div class="row row-cols-3">
      <div v-for="apartment in this.apartmentsToShow" class="col">
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

<!-- // Utilizzo della funzione per verificare se un punto si trova all'interno del cerchio
const latitudinePunto = /* Inserisci la latitudine del punto da controllare */;
const longitudinePunto = /* Inserisci la longitudine del punto da controllare */;

const latitudineCentro = /* Inserisci la latitudine del centro del cerchio */;
const longitudineCentro = /* Inserisci la longitudine del centro del cerchio */;
const raggioCerchio = 20; // Raggio del cerchio in chilometri

const puntoDaControllare = puntoInCerchio(latitudinePunto, longitudinePunto, latitudineCentro, longitudineCentro, raggioCerchio);

if (puntoDaControllare) {
  console.log('Il punto si trova all\'interno del cerchio.');
} else {
  console.log('Il punto non si trova all\'interno del cerchio.');
} -->
-->
