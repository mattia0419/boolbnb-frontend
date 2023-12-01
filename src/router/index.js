import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/pages/Home.vue";
import SearchPage from "../components/pages/SearchPage.vue";
import ShowDetails from "../components/pages/ShowDetails.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/searchpage",
      name: "searchpage",
      component: SearchPage,
    },
    {
      path: "/apartments/:id",
      name: "showdetails",
      component: ShowDetails,
    },
  ],
});

export { router };
