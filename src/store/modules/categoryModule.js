import { entityAPI } from "@/api/entityAPI";

export const categoryModule = {
  namespaced: true,

  state: {
    categoryList: [],
  },

  mutations: {
    SET_GATEGORYLIST_TO_STATE: (state, categoryList) => {
      state.categoryList = categoryList;
    },
  },

  actions: {
    async GET_GATEGORYLIST_FROM_API({ commit }) {
      const categoryList = await entityAPI.getCategoryList();
      commit("SET_GATEGORYLIST_TO_STATE", categoryList.data.data);
    },
  },
};
