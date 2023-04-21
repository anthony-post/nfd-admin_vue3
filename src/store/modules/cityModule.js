import { entityAPI } from "@/api/entityAPI";

export const cityModule = {
  namespaced: true,

  state: {
    cityList: [],
  },

  mutations: {
    SET_CITIES_TO_STATE: (state, cityList) => {
      state.cityList = cityList;
    },
  },

  actions: {
    async GET_CITIES_FROM_API({ commit }) {
      const cityList = await entityAPI.getCityList();
      commit("SET_CITIES_TO_STATE", cityList.data.data);
    },
  },
};
