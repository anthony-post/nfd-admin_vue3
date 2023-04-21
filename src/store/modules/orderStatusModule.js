import { entityAPI } from "@/api/entityAPI";

export const orderStatusModule = {
  namespaced: true,

  state: {
    orderStatusList: [],
  },

  mutations: {
    SET_ORDERSTATUSES_TO_STATE: (state, orderStatusList) => {
      state.orderStatusList = orderStatusList;
    },
  },

  actions: {
    async GET_ORDERSTATUSES_FROM_API({ commit }) {
      try {
        const orderStatusList = await entityAPI.getOrderStatusList();
        commit("SET_ORDERSTATUSES_TO_STATE", orderStatusList.data.data);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
