import { entityAPI } from "@/api/entityAPI";

export const rateTypesModule = {
  namespaced: true,

  state: {
    rateTypes: {},
    selectedRateType: {},
  },

  mutations: {
    SET_PAGINATED_FILTERED_RATETYPES_TO_STATE: (state, rateTypesData) => {
      state.rateTypes = rateTypesData.data;
    },
    RESET_PAGINATED_FILTERED_RATETYPES_TO_STATE: (state) => {
      state.rateTypes = {};
    },

    SET_SELECTEDRATETYPE_TO_STATE: (state, chosenRateType) => {
      state.selectedRateType = chosenRateType;
    },
    RESET_SELECTEDRATETYPE_TO_STATE: (state) => {
      state.selectedRateType = {};
    },

    SET_RATETYPE_ID_TO_STATE: (state, newRateTypeId) => {
      state.selectedRateType.id = newRateTypeId;
    },

    SET_RATETYPE_NAME_TO_STATE: (state, rateTypeName) => {
      state.selectedRateType.name = rateTypeName;
    },

    SET_RATETYPE_UNIT_TO_STATE: (state, rateTypeUnit) => {
      state.selectedRateType.unit = rateTypeUnit;
    },
  },

  actions: {
    async GET_PAGINATED_FILTERED_RATETYPELIST_FROM_API(
      { commit },
      { chosenRateTypeId, selectedPage, limitPage }
    ) {
      try {
        const rateTypeId = chosenRateTypeId;
        const page = selectedPage;
        const limit = limitPage;

        if (rateTypeId !== "no-filter") {
          const rateTypesData = await entityAPI.getRateTypesById(rateTypeId);
          commit("SET_PAGINATED_FILTERED_RATETYPES_TO_STATE", rateTypesData);
        } else {
          const rateTypesData = await entityAPI.getRateTypes({ page, limit });
          commit("SET_PAGINATED_FILTERED_RATETYPES_TO_STATE", rateTypesData);
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    GET_SELECTEDRATETYPE_FROM_API({ commit }, chosenRateType) {
      if (chosenRateType) {
        commit("SET_SELECTEDRATETYPE_TO_STATE", chosenRateType);
      } else {
        commit("RESET_SELECTEDRATETYPE_TO_STATE");
      }
    },
  },
};
