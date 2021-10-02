import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faAnchor,
    faBath,
    faBabyCarriage,
    faBirthdayCake,
    faCarSide,
    faCat,
    faGamepad,
    faGhost,
    faGifts,
    faGlassCheers,
    faIgloo,
    faPizzaSlice,
    faPoo,
    faRobot,
    faRocket,
    faSnowman,
    faSnowflake,
    faYinYang,
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faAnchor,
    faBath,
    faBabyCarriage,
    faBirthdayCake,
    faCarSide,
    faCat,
    faGamepad,
    faGhost,
    faGifts,
    faGlassCheers,
    faIgloo,
    faPizzaSlice,
    faPoo,
    faRobot,
    faRocket,
    faSnowman,
    faSnowflake,
    faYinYang
);

createApp(App)
    .use(store)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");
