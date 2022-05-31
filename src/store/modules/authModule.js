import { authAPI } from "@/api/authAPI";

export const authModule = {
  namespaced: true,

  state: {
    user: null,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("access_token", JSON.stringify(userData.access_token));
      localStorage.setItem("token_type", JSON.stringify(userData.token_type));
    },
  },
  actions: {
    async onLogin({ commit }, credentials) {
      try {
        const { data } = await authAPI.login(credentials);
        commit("SET_USER_DATA", data);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
