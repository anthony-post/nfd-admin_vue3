import { entityAPI } from "@/api/entityAPI";

export const rateModule = {
  namespaced: true,

  state: {
    rateList: [],
  },

  mutations: {
    SET_RATES_TO_STATE: (state, rateList) => {
      state.rateList = rateList;
    },
  },

  actions: {
    async GET_RATES_FROM_API({ commit }) {
      const rateList = await entityAPI.getRateList();
      commit("SET_RATES_TO_STATE", rateList.data.data);
    },
  },
};
