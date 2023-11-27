<script>
import { store } from "../data/store";
import { services } from "@tomtom-international/web-sdk-services";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import tt from "@tomtom-international/web-sdk-maps";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    searchBox() {
      let options = {
        searchOptions: {
          key: "EoW1gArKxlBBEKl68AZm1uhfhcLougV4",
          language: "en-GB",
          limit: 5,
          countrySet: "IT",
        },
        autocompleteOptions: {
          key: "EoW1gArKxlBBEKl68AZm1uhfhcLougV4",
          language: "en-GB",
        },
      };

      const ttSearchBox = new SearchBox(services, options);
      const searchBoxHTML = ttSearchBox.getSearchBoxHTML();

      let searchBoxDiv = document.getElementById("searchbox");
      //   searchBoxDiv.append(searchBoxHTML);
      searchBoxDiv.innerHTML = searchBoxHTML;
    },
  },
  created() {
    this.searchBox();
  },
};
</script>

<template>
  <div id="searchbox"></div>
</template>

<style lang="scss" scoped></style>
