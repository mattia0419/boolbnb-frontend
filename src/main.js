import { createApp } from "vue";
import * as bootstrap from "bootstrap";
import "./scss/style.scss";
import { router } from "./router/index.js";

// / import the fontawesome core /
import { library } from "@fortawesome/fontawesome-svg-core";
// / import font awesome icon component /
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// / import specific icons /
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faWaterLadder } from "@fortawesome/free-solid-svg-icons";
import { faBath } from "@fortawesome/free-solid-svg-icons";
import { faWater } from "@fortawesome/free-solid-svg-icons";
// / add icons to the library /
library.add(faUtensils);
library.add(faWifi);
library.add(faCar);
library.add(faWaterLadder);
library.add(faBath);
library.add(faWater);

import App from "./App.vue";
createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
