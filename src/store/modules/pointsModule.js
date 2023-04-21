import { entityAPI } from "@/api/entityAPI";

export const pointsModule = {
  namespaced: true,

  state: {
    points: {},
    selectedPoint: {},
  },

  mutations: {
    SET_PAGINATED_FILTERED_POINTS_TO_STATE: (state, pointsData) => {
      state.points = pointsData.data;
    },
    RESET_PAGINATED_FILTERED_POINTS_TO_STATE: (state) => {
      state.points = {};
    },

    SET_SELECTEDPOINT_TO_STATE: (state, chosenPoint) => {
      state.selectedPoint = chosenPoint;
    },
    RESET_SELECTEDPOINT_TO_STATE: (state) => {
      state.selectedPoint = {};
    },

    SET_POINT_ID_TO_STATE: (state, newPointId) => {
      state.selectedPoint.id = newPointId;
    },

    SET_POINT_NAME_TO_STATE: (state, pointName) => {
      state.selectedPoint.name = pointName;
    },

    SET_POINT_ADDRESS_TO_STATE: (state, pointAddress) => {
      state.selectedPoint.address = pointAddress;
    },

    SET_POINT_CITYID_TO_STATE: (state, pointCityId) => {
      state.selectedPoint.cityId = pointCityId;
    },
  },

  actions: {
    async GET_PAGINATED_FILTERED_POINTLIST_FROM_API(
      { commit },
      { chosenCityId, selectedPage, limitPage }
    ) {
      try {
        const cityId = chosenCityId;
        const page = selectedPage;
        const limit = limitPage;

        if (cityId !== "no-filter") {
          const pointsData = await entityAPI.getPoints({ cityId, page, limit });
          commit("SET_PAGINATED_FILTERED_POINTS_TO_STATE", pointsData);
        } else {
          const pointsData = await entityAPI.getPoints({ page, limit });
          commit("SET_PAGINATED_FILTERED_POINTS_TO_STATE", pointsData);
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    GET_SELECTEDPOINT_FROM_API({ commit }, chosenPoint) {
      if (chosenPoint) {
        commit("SET_SELECTEDPOINT_TO_STATE", chosenPoint);
      } else {
        commit("RESET_SELECTEDPOINT_TO_STATE");
      }
    },
  },
};
