<script>
import { store } from "../../data/store";
import axios from "axios";
import tt from "@tomtom-international/web-sdk-maps";

export default {
  data() {
    return {
      store,
      apartment: {},
      map: null,
      notFound: false,

      email: "",
      message: "",
    };
  },
  methods: {
    coverView(cover) {
      if (cover) {
        return cover;
      } else {
        return "https://placehold.co/400";
      }
    },
    initializeMap() {
      const map = tt.map({
        key: "EoW1gArKxlBBEKl68AZm1uhfhcLougV4",
        container: this.$refs.mapRef,
        center: [this.apartment.longitude, this.apartment.latitude],
        zoom: 10,
      });

      new tt.Marker()
        .setLngLat([this.apartment.longitude, this.apartment.latitude])
        .addTo(map);

      this.map = Object.freeze(map);
    },

    submitForm() {
      const formData = {
        email: this.email,
        message: this.message,
      };

      // Invia la richiesta POST a Laravel
      axios
        .post("http://localhost:8000/api/save-form-data", formData)
        .then((response) => {
          console.log(response.data);
          // Puoi gestire la risposta come preferisci
        })
        .catch((error) => {
          console.error("Errore nella richiesta:", error);
        });
    },
  },

  created() {
    axios
      .get(store.api.baseUrl + "/" + this.$route.params.id)
      .then((response) => {
        if (response.data && response.data.visible) {
          this.apartment = response.data;
          this.initializeMap();
        } else {
          this.notFound = true;
        }
      })
      .catch((err) => {
        this.notFound = true;
      });
  },
};
</script>

<template>
  <div class="container">
    <div class="row" :class="this.notFound ? 'd-none' : ''">
      <div class="col-4">
        <img :src="this.apartment.cover_img" alt="" class="img-fluid" />
      </div>
      <div class="col-8">
        <h3>{{ this.apartment.title }}</h3>
        <p>
          <strong>Rooms : </strong>
          {{ this.apartment.rooms }}
        </p>
        <p>
          <strong>Bathrooms : </strong>
          {{ this.apartment.bathrooms }}
        </p>
        <p>
          <strong>Beds : </strong>
          {{ this.apartment.beds }}
        </p>
        <p>
          <strong>Square meters : </strong>
          {{ this.apartment.square_meters }}
        </p>
        <p>
          <strong>Address : </strong>
          {{ this.apartment.address }}
        </p>
        <p>
          <strong>Price : </strong>
          {{ this.apartment.price + "€" }}
        </p>
      </div>
      <div class="col-12">
        <p v-for="service in this.apartment.services">
          {{ service.label }}
          <font-awesome-icon :icon="service.icon" />
        </p>
      </div>

      <!-- FORM MESSAGE  -->

      <div class="col-8 mx-auto m-5">
        <div class="card">
          <div class="card-header">Form Message</div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Email address</label
                >
                <input
                  v-model="email"
                  required
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"
                  >Example textarea</label
                >
                <textarea
                  v-model="message"
                  required
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
              <div class="col-auto">
                <button type="submit" class="btn btn-primary mb-3">
                  Confirm identity
                </button>
              </div>
            </form>
          </div>
          <div class="card-footer"></div>
        </div>
      </div>
    </div>

    <!-- MAP -->
    <div
      id="map"
      ref="mapRef"
      style="width: 300px; height: 300px"
      :class="this.notFound ? 'd-none' : ''"
    ></div>

    <div class="row">
      <h2 v-if="this.notFound" class="my-5 text-center">404 - Not found</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#map {
  height: 500px;
}
</style>
