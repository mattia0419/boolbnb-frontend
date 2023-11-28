import { createApp } from "vue";
import * as bootstrap from "bootstrap";
import "./scss/style.scss";

// / import the fontawesome core /
import { library } from "@fortawesome/fontawesome-svg-core";
// / import font awesome icon component /
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// / import specific icons /
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
// / add icons to the library /
library.add(faUserSecret);

import App from "./App.vue";
createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
