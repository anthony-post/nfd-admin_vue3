import { entityAPI } from "@/api/entityAPI";

export const pointModule = {
  namespaced: true,

  state: {
    pointList: [],
  },

  mutations: {
    SET_POINTS_TO_STATE: (state, pointList) => {
      state.pointList = pointList;
    },
  },

  actions: {
    //общий список пунктов выдачи
    async GET_POINTS_FROM_API({ commit }) {
      const pointList = await entityAPI.getPointList();
      commit("SET_POINTS_TO_STATE", pointList.data.data);
    },
    //список пунктов выдачи - фильтр по городу    
    async GET_FILTERED_POINTS_FROM_API({ commit }, { chosenCityObj }) {
      const cityId = chosenCityObj.id;
      const pointList = await entityAPI.getFilteredPointList({ cityId });
      commit("SET_POINTS_TO_STATE", pointList.data.data);
    },
  },
};
