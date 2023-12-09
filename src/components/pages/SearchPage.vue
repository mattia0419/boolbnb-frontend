<script>
import { store } from "../../data/store";
import axios from "axios";
export default {
  data() {
    return {
      store,
      services: [],
      activeServices: [],
    };
  },

  methods: {
    // servicesCicle(apartments) {
    //   for (let i = 0; i < this.apartments.length; i++) {
    //     for (let j = 0; j < this.activeServices.length; j++) {
    //       if (this.apartments[i] === this.activeServices[j]) {
    //         break;
    //       } else {
    //         return false;
    //       }
    //     }
    //   }
    // },
    filterApartments() {
      // Azzerare l'array prima di applicare il filtro
      this.store.apartmentsToShow.splice(0, this.store.apartmentsToShow.length);
      this.store.featuredApartmentsToShow.splice(
        0,
        this.store.featuredApartmentsToShow.length
      );

      for (let i = 0; i < this.store.featuredApartments.length; i++) {
        console.log(this.store.featuredApartments[i].services);
        const puntoDaControllare = this.puntoInCerchio(
          this.store.featuredApartments[i].latitude,
          this.store.featuredApartments[i].longitude,
          this.store.searchedAddress.position.lat,
          this.store.searchedAddress.position.lon,
          this.store.radiusFilter
        );

        // creo una costante vuota
        const hasServices = [];
        // la riempio con le label dei servizi
        for (
          let j = 0;
          j < this.store.featuredApartments[i].services.length;
          j++
        ) {
          hasServices.push(this.store.featuredApartments[i].services[j].label);
        }

        if (
          puntoDaControllare &&
          this.store.featuredApartments[i].bathrooms >=
            this.store.bathroomsFilter &&
          this.store.featuredApartments[i].beds >= this.store.bedsFilter &&
          this.store.featuredApartments[i].rooms >= this.store.roomsFilter &&
          // verifico che i servizi attivati siano compresi in quelli degli appartamenti
          this.activeServices.every((label) => hasServices.includes(label))
        ) {
          this.store.featuredApartmentsToShow.push(
            this.store.featuredApartments[i]
          );
        } else {
          // console.log("Il punto non si trova all'interno del cerchio.");
        }

        this.sortedApartments();
      }

      for (let i = 0; i < this.store.apartments.length; i++) {
        console.log(this.store.apartments[i].services);
        const puntoDaControllare = this.puntoInCerchio(
          this.store.apartments[i].latitude,
          this.store.apartments[i].longitude,
          this.store.searchedAddress.position.lat,
          this.store.searchedAddress.position.lon,
          this.store.radiusFilter
        );

        // creo una costante vuota
        const hasServices = [];
        // la riempio con le label dei servizi
        for (let j = 0; j < this.store.apartments[i].services.length; j++) {
          hasServices.push(this.store.apartments[i].services[j].label);
        }

        if (
          puntoDaControllare &&
          this.store.apartments[i].bathrooms >= this.store.bathroomsFilter &&
          this.store.apartments[i].beds >= this.store.bedsFilter &&
          this.store.apartments[i].rooms >= this.store.roomsFilter &&
          // verifico che i servizi attivati siano compresi in quelli degli appartamenti
          this.activeServices.every((label) => hasServices.includes(label))
        ) {
          this.store.apartmentsToShow.push(this.store.apartments[i]);
        } else {
          // console.log("Il punto non si trova all'interno del cerchio.");
        }

        this.sortedApartments();
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

  created() {
    axios.get("http://127.0.0.1:8000/api/services").then((response) => {
      this.services = response.data;
      console.log(response.data);
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
      <div class="col-12 d-flex">
        <div class="col-2" v-for="(service, index) in this.services">
          <label :for="index">{{ service.label }}</label>
          <input
            type="checkbox"
            class="form-check-control"
            :id="index"
            v-model="activeServices"
            :value="service.label"
          />
        </div>
      </div>

      <div class="col mt-auto">
        <div class="btn btn-primary" @click="filterApartments">Filter</div>
      </div>
    </div>

    <!-- apartments -->
    <div class="row row-cols-3 my-5 g-3">
      <div v-for="apartment in this.store.featuredApartmentsToShow" class="col">
        <router-link
          class="nav-link"
          :to="{ name: 'showdetails', params: { id: `${apartment.id}` } }"
        >
          <div class="card-searchpage">
            <div class="apartment-img">
              <span
                class="position-absolute translate-middle badge rounded-pill"
              >
                Sponsorized
                <span class="visually-hidden">unread messages</span>
              </span>
              <img
                :src="'http://127.0.0.1:8000/storage/' + apartment.cover_img"
                alt=""
              />
            </div>
            <div class="card-info ps-2">
              <h4>{{ apartment.title }}</h4>
              <h6>{{ apartment.address }}</h6>
              <h6>Distance: {{ calculateDistance(apartment) }} km</h6>
              <div class="d-flex justify-content-between px-2">
                <div v-for="service in apartment.services">
                  <font-awesome-icon :icon="service.icon" />
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div class="row row-cols-3 my-5 g-3">
      <div v-for="apartment in this.store.apartmentsToShow" class="col">
        <router-link
          class="nav-link"
          :to="{ name: 'showdetails', params: { id: `${apartment.id}` } }"
        >
          <div class="card-searchpage">
            <div class="apartment-img">
              <img
                :src="'http://127.0.0.1:8000/storage/' + apartment.cover_img"
                alt=""
              />
            </div>
            <div class="card-info ps-2">
              <h4>{{ apartment.title }}</h4>
              <h6>{{ apartment.address }}</h6>
              <h6>Distance: {{ calculateDistance(apartment) }} km</h6>
              <div class="d-flex justify-content-between px-2">
                <div v-for="service in apartment.services">
                  <font-awesome-icon :icon="service.icon" />
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-h {
  height: 300px;
  width: 100%;
  img {
    object-fit: contain;
    height: 100%;
    width: 100%;
  }
}
.card-searchpage {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  &:hover .card-info {
    bottom: 0;
  }
  h4 {
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    color: white;
  }
  .card-info {
    transition: 0.5s;
    width: 100%;
    backdrop-filter: blur(2px);
    background-image: linear-gradient(
      to bottom,
      rgba(255, 0, 0, 0),
      rgb(186, 182, 182, 1)
    );
    position: absolute;
    bottom: -80px;
    left: 0;
    padding-left: 15px;
  }
  .apartment-img {
    height: 300px;
    width: 100%;
    span {
      top: 37px;
      right: 0px;
      background-color: green;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 12px;
    }
  }
}
</style>
