import { createStore } from "vuex";
import { authModule } from "./modules/authModule.js";
import { carsModule } from "./modules/carsModule.js";
import { ordersModule } from "./modules/ordersModule.js";
import { categoryModule } from "./modules/categoryModule.js";

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

    categoryModule: {
      namespaced: true,
      ...categoryModule,
    },

    carsModule: {
      namespaced: true,
      ...carsModule,
    },
  },
});
