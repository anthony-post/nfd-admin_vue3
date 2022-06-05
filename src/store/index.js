import { createStore } from "vuex";
import { authModule } from "./modules/authModule.js";
import { carsModule } from "./modules/carsModule.js";
import { ordersModule } from "./modules/ordersModule.js";

export default createStore({
  modules: {
    authModule: {
      namespaced: true,
      ...authModule,
    },
    ordersModule: {
      namespaced: true,
      ...ordersModule,
    },
    carsModule: {
      namespaced: true,
      ...carsModule,
    },
  },
});
