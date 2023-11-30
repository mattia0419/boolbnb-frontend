<script>
import { store } from "../../data/store";
import axios from "axios";
export default {
  data() {
    return {
      store,
      userLocation: {
        latitude: 40.7128, // Latitudine del punto specifico
        longitude: -74.006, // Longitudine del punto specifico
      },
      apartments: [
        { id: 1, name: "Apartment 1", latitude: 40.7218, longitude: -73.9977 },
        { id: 2, name: "Apartment 2", latitude: 40.73, longitude: -73.995 },
        // Aggiungi altri appartamenti con le relative coordinate
      ],
    };
  },
  computed: {
    sortedApartments() {
      // Ordina gli appartamenti per distanza
      return this.store.apartments.sort((a, b) => {
        // console.log(this.store.apartments);
        // console.log(this.store.searchedAddress.position.lat);
        const distanceA = this.calculateDistance(a);
        const distanceB = this.calculateDistance(b);
        return distanceA - distanceB;
      });
    },
  },
  methods: {
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
  <div class="container">
    <div class="row row-cols-3">
      <div v-for="apartmentshow in this.store.apartmentsToShow" class="col">
        <div class="card">
          <div class="card-header">
            {{ apartmentshow.title }}
          </div>
          <div class="card-body">
            {{ apartmentshow.address }}
          </div>
        </div>

        <div>
          <h2>Appartamenti ordinati per distanza:</h2>
          <ul v-for="apartment in sortedApartments" :key="apartment.id">
            <li v-if="apartment == apartmentshow">
              <div class="card">
                {{ apartment.title }} - Distanza:
                {{ calculateDistance(apartment) }} km
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
