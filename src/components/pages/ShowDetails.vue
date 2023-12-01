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
      if (this.$refs.mapRef) {
        this.map = tt.map({
          key: "EoW1gArKxlBBEKl68AZm1uhfhcLougV4",
          container: this.$refs.mapRef,
          center: [14.98227, 40.61214],
          zoom: 10,
        });

        // this.map.on("load", () => {
        //   const marker = new tt.Marker().setLngLat([14.98227, 40.61214]);
        //   marker.addTo(this.map);
        // });
      }
    },
  },
  mounted() {
    this.initializeMap();
  },
  created() {
    axios
      .get(store.api.baseUrl + "/" + this.$route.params.id)
      .then((response) => {
        // console.log(response.data);
        this.apartment = response.data;
      });
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
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
    </div>
    <div id="map" ref="mapRef" style="width: 100%; height: 400px"></div>
  </div>
</template>

<style lang="scss" scoped>
#map {
  height: 500px;
}
</style>
