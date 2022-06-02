import { createStore } from "vuex";
import { authModule } from "./modules/authModule.js";
// import { entityModule } from "./modules/entityModule.js";
import { ordersModule } from "./modules/ordersModule.js";

export default createStore({
  modules: {
    authModule: {
      namespaced: true,
      ...authModule,
    },
    // entityModule: {
    //   namespaced: true,
    //   ...entityModule,
    // },
    ordersModule: {
      namespaced: true,
      ...ordersModule,
    },
  },
});
