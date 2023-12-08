import { reactive } from "vue";

export const store = reactive({
  api: {
    baseUrl: "http://127.0.0.1:8000/api/apartments",
  },
  apartments: [],
  featuredApartments: [],
  searchedAddress: {},
  apartmentsToShow: [],
  featuredApartmentsToShow: [],
  bathroomsFilter: 1,
  bedsFilter: 1,
  roomsFilter: 1,
  radiusFilter: 20,
});
