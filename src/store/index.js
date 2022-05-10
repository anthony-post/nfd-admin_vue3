import { createStore } from "vuex";
import { authModule } from "./modules/authModule.js"

export default createStore({

  modules: {
    authModule: {
      namespaced: true,
      ...authModule,
    },
  },
});
