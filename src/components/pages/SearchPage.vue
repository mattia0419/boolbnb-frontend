<script>
import { store } from "../../data/store";
import axios from "axios";
export default {
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="row row-cols-3">
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
