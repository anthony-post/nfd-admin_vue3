import { createStore } from "vuex";
import { authModule } from "./modules/authModule.js";

export default createStore({
  // state: {
  //   isDropDownVisible: false,
  // },

  // mutations: {
  //   SET_ISDROPDOWNVISIBLE_TO_STATE: (state) => {
  //     state.isDropDownVisible = true;
  //   },
  //   RESET_ISDROPDOWNVISIBLE_TO_STATE: (state) => {
  //     state.isDropDownVisible = false;
  //   }
  // },

  modules: {
    authModule: {
      namespaced: true,
      ...authModule,
    },
  },
});
