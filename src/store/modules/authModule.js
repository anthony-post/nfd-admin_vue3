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
      localStorage.setItem(
        "access_token",
        JSON.stringify(userData.access_token)
      );
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(userData.refresh_token)
      );
      localStorage.setItem("token_type", JSON.stringify(userData.token_type));
    },
    RESET_USER_DATA(state) {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
      localStorage.removeItem("refresh_token");
    },
  },
  actions: {
    async ON_LOGIN({ commit }, credentials) {
      try {
        const { data } = await authAPI.login(credentials);
        commit("SET_USER_DATA", data);
      } catch (error) {
        throw new Error(error);
      }
    },
    // async ON_REFRESH_TOKEN({ commit }, credentials) {
    //   try {
    //     const { data } = await authAPI.refresh(credentials);
    //     commit("SET_USER_DATA", data);
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // },
    async ON_LOGOUT({ commit }) {
      try {
        await authAPI.logout();
        commit("RESET_USER_DATA");
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
