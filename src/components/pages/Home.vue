<script>
import { store } from "../../data/store";

export default {
  data() {
    return {
      store,
      visibleApts: [],
    };
  },
};
</script>

<template>
  <div class="container">
    <!-- <a href="http://127.0.0.1:8000/admin" class="btn btn-primary my-3"
      >Dashboard</a
    > -->
    <h3 class="mt-4">Featured apartments</h3>

    <div class="row row-cols-lg-3 row-cols-1 row-cols-md-2 my-3 g-3">
      <div v-for="apartment in store.featuredApartments" class="col">
        <router-link
          class="nav-link"
          :to="{ name: 'showdetails', params: { id: `${apartment.id}` } }"
        >
          <div class="card-searchpage">
            <div class="apartment-img">
              <span class="position-absolute px-2 py-1 badge rounded-pill">
                Sponsored
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
              <div class="d-flex justify-content-between px-2 pb-1">
                <div v-for="service in apartment.services">
                  <font-awesome-icon :icon="service.icon" />
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <h3 class="mt-4">Other apartments</h3>
    <div class="row row-cols-lg-3 row-cols-1 row-cols-md-2 my-3 g-3">
      <div v-for="apartment in store.apartments" class="col">
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
              <div class="d-flex justify-content-between px-2 pb-1">
                <div v-for="service in apartment.services">
                  <font-awesome-icon :icon="service.icon" />
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <!-- <div class="row row-cols-4 my-3 g-3">
        <div class="col" v-for="apartment in store.apartments">
          <router-link
            class="nav-link"
            :to="{ name: 'showdetails', params: { id: `${apartment.id}` } }"
          >
            <div class="card">
              <div class="card-header">
                <h3>{{ apartment.title }}</h3>
              </div>
              <div class="card-body">
                <p>{{ apartment.id }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div> -->
  </div>
</template>

<style lang="scss" scoped>
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
    bottom: -60px;
    left: 0;
    padding-left: 15px;
  }
  .apartment-img {
    height: 300px;
    width: 100%;
    span {
      top: 20px;
      right: 15px;
      background-color: rgba(7, 156, 7, 0.818);
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
