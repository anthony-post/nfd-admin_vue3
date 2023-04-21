import { entityAPI } from "@/api/entityAPI";

export const rateTypeModule = {
  namespaced: true,

  state: {
    rateTypeList: [],
  },

  mutations: {
    SET_RATETYPES_TO_STATE: (state, rateTypeList) => {
      state.rateTypeList = rateTypeList;
    },
  },

  actions: {
    async GET_RATETYPES_FROM_API({ commit }) {
      const rateTypeList = await entityAPI.getRateTypeList();
      commit("SET_RATETYPES_TO_STATE", rateTypeList.data.data);
    },
  },
};
