import { entityAPI } from "@/api/entityAPI";

export const carModule = {
  namespaced: true,

  state: {
    carList: [],
  },

  mutations: {
    SET_CARS_TO_STATE: (state, carList) => {
      state.carList = carList;
    },
  },

  actions: {
    async GET_CARS_FROM_API({ commit }) {
      const carList = await entityAPI.getCarList();
      commit("SET_CARS_TO_STATE", carList.data.data);
    },
  },
};
