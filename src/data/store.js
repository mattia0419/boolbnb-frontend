import { reactive } from "vue";

export const store = reactive({
  api: {
    baseUrl: "http://127.0.0.1:8000/api/apartments",
  },
  apartments: [],
  searchedAddress: {},
});
