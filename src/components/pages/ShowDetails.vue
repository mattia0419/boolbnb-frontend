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
      messageSent: false,

      email: "",
      message: "",
    };
  },
  methods: {
    confirm() {
      if (this.messageSent) {
        setTimeout(() => {
          this.messageSent = false;
          let Conferm = document.getElementById("conferm");
          Conferm.classList.add("d-none");
        }, "4000");
      }
      // console.log("ciao");
    },
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
        apartment_id: this.apartment.id,
      };

      // Invia la richiesta POST a Laravel
      axios
        .post("http://localhost:8000/api/save-form-data", formData)
        .then((response) => {
          console.log(response.data);
          this.messageSent = true;
        })
        .catch((error) => {
          this.messageSent = false;
          console.error("Errore nella richiesta:", error);
        });

      this.email = "";
      this.message = "";
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
    <div class="row mt-4" :class="this.notFound ? 'd-none' : ''">
      <!-- BUTTON GO BACK -->
      <div class="d-flex flex-row-reverse">
        <router-link :to="{ name: 'home' }" class="btn btn-outline-primary"
          >Home</router-link
        >
      </div>

      <!-- CARD INFO HOUSE -->
      <div class="col-12 my-2">
        <p class="fs-1">
          <strong>{{ this.apartment.title }}</strong>
        </p>
      </div>
      <!-- IMG -->
      <div class="col-12 col-lg-4">
        <img
          :src="coverView(this.apartment.cover_img)"
          alt=""
          class="w-100 img-fluid"
        />
      </div>

      <div class="col-12 col-lg-7 ms-lg-5 mt-5 my-lg-auto">
        <p class="fs-3">
          <span class="icon-link">
            <font-awesome-icon
              class="bi"
              aria-hidden="true"
              icon="fa-solid fa-door-open"
            />
            <strong class="text-nowrap">Rooms: </strong>
            {{ this.apartment.rooms }}
          </span>
        </p>
        <p class="fs-3">
          <span class="icon-link">
            <font-awesome-icon
              class="bi"
              aria-hidden="true"
              icon="fa-solid fa-toilet"
            />
            <strong class="text-nowrap">Bathrooms: </strong>
            {{ this.apartment.bathrooms }}
          </span>
        </p>
        <p class="fs-3">
          <span class="icon-link">
            <font-awesome-icon
              class="bi"
              aria-hidden="true"
              icon="fa-solid fa-bed"
            />
            <strong class="text-nowrap">Beds: </strong>
            {{ this.apartment.beds }}
          </span>
        </p>
        <p class="fs-3">
          <span class="icon-link">
            <font-awesome-icon
              class="bi"
              aria-hidden="true"
              icon="fa-solid fa-ruler-combined"
            />
            <strong class="text-nowrap">Square meters: </strong>
            {{ this.apartment.square_meters }} m<sup>2</sup>
          </span>
        </p>
        <p class="fs-3">
          <span class="icon-link">
            <font-awesome-icon
              class="bi"
              aria-hidden="true"
              icon="fa-solid fa-map-location-dot"
            />
            <strong class="text-nowrap">Address: </strong>
            {{ this.apartment.address }}
          </span>
        </p>
        <p class="fs-3">
          <span class="icon-link">
            <font-awesome-icon
              class="bi"
              aria-hidden="true"
              icon="fa-solid fa-coins"
            />
            <strong class="text-nowrap">Price: </strong>
            {{ this.apartment.price + " €" }}
          </span>
        </p>
      </div>

      <!-- MAPPA -->
      <!-- <div
        id="map"
        ref="mapRef"
        style="width: 400px; height: 300px"
        :class="this.notFound ? 'd-none' : ''"
        class="col-4"
      ></div> -->

      <!-- SERVICE -->
      <div class="col-lg-4 mt-5">
        <div class="row row-cols-2">
          <div v-for="service in this.apartment.services">
            <div class="col services-container my-1 ps-3">
              <span class="icon-link">
                <font-awesome-icon
                  class="bi"
                  aria-hidden="true"
                  :icon="service.icon"
                />
                {{ service.label }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <h2 v-if="this.notFound" class="my-5 text-center">404 - Not found</h2>
      </div>
      <!-- FORM MESSAGE  -->

      <div class="row mx-auto mt-5">
        <div class="col-lg-8 mb-4 mb-lg-0 me-lg-3">
          <div class="form">
            <div class="fs-4 mb-4">
              <span class="icon-link">
                <font-awesome-icon
                  class="bi"
                  aria-hidden="true"
                  icon="fa-solid fa-message"
                />
                <strong> Send a Message </strong>
              </span>
            </div>
            <div class="">
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
                    Send
                  </button>
                </div>
                <div
                  id="conferm"
                  class="alert alert-success alert-dismissible fade show puff-in-center"
                  :class="this.messageSent ? confirm() : 'd-none'"
                  role="alert"
                >
                  Message sent!
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    @click="prova"
                  ></button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- MAP -->
        <div class="prova col-lg-4">
          <div
            id="map"
            ref="mapRef"
            :class="this.notFound ? 'd-none' : ''"
            class=""
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.puff-in-center {
  animation: puff-in-center 4s cubic-bezier(0.47, 0, 0.745, 0.715) both;
}

@keyframes puff-in-center {
  0% {
    transform: scale(2);
    filter: blur(4px);
    opacity: 0;
  }
  10% {
    transform: scale(1);
    filter: blur(0px);
    opacity: 1;
  }
  90% {
    transform: scale(1);
    filter: blur(0px);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    filter: blur(4px);
    opacity: 0;
  }
}
.prova {
  width: 400px;
  height: 100%;
  #map {
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }
}

img {
  border-radius: 12px;
}
.services-container {
  //   margin-top: 40px;
  //   div {
  border: black solid 1px;
  border-radius: 12px;
  //     margin-bottom: 5px;
  padding: 5px;
  //     display: flex;
  //     align-items: center;
  //     span {
  //       display: flex;
  //       align-items: center;
  //       height: 100%;
  //     }
  //   }
}
.form {
  overflow: hidden;
  padding: 20px;
  border-radius: 12px;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  box-shadow: 10px 10px 18px #c7c7c7, -10px -10px 18px #ffffff;
  .form-control {
    border: none;
    outline: none;
    border-radius: 15px;
    padding: 1em;
    background-color: #f4f4f4;
    box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1);
    transition: 300ms ease-in-out;
    &:focus {
      background-color: #f4f4f4;
      transform: scale(1.01);
      box-shadow: 13px 13px 100px #969696a0, -13px -13px 100px #ffffff96;
    }
  }
}

// Breakpoints
@media only screen and (max-width: 600px) {
  .fs-3 {
    text-align: center;
    font-size: 18px !important;
  }
  .prova {
    width: 100%;
  }
}
</style>
