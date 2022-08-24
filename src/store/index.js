import { createStore } from "vuex";
import { authModule } from "./modules/authModule.js";
import { carsModule } from "./modules/carsModule.js";
import { ordersModule } from "./modules/ordersModule.js";
import { categoriesModule } from "./modules/categoriesModule.js";
import { citiesModule } from "./modules/citiesModule.js";
import { pointsModule } from "./modules/pointsModule.js";
import { ratesModule } from "./modules/ratesModule.js";
import { rateTypesModule } from "./modules/rateTypesModule.js";
import { orderStatusesModule } from "./modules/orderStatusesModule.js";
import { categoryModule } from "./modules/categoryModule.js";
import { carModule } from "./modules/carModule.js";
import { cityModule } from "./modules/cityModule.js";
import { pointModule } from "./modules/pointModule.js";
import { orderStatusModule } from "./modules/orderStatusModule.js";
import { rateModule } from "./modules/rateModule.js";
import { rateTypeModule } from "./modules/rateTypeModule.js";

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

    categoriesModule: {
      namespaced: true,
      ...categoriesModule,
    },

    citiesModule: {
      namespaced: true,
      ...citiesModule,
    },

    pointsModule: {
      namespaced: true,
      ...pointsModule,
    },

    ratesModule: {
      namespaced: true,
      ...ratesModule,
    },

    rateTypesModule: {
      namespaced: true,
      ...rateTypesModule,
    },

    orderStatusesModule: {
      namespaced: true,
      ...orderStatusesModule,
    },

    categoryModule: {
      namespaced: true,
      ...categoryModule,
    },

    carModule: {
      namespaced: true,
      ...carModule,
    },

    cityModule: {
      namespaced: true,
      ...cityModule,
    },

    pointModule: {
      namespaced: true,
      ...pointModule,
    },

    orderStatusModule: {
      namespaced: true,
      ...orderStatusModule,
    },

    rateModule: {
      namespaced: true,
      ...rateModule,
    },

    rateTypeModule: {
      namespaced: true,
      ...rateTypeModule,
    },
  },
});
