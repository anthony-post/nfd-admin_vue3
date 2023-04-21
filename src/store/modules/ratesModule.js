import { entityAPI } from "@/api/entityAPI";

export const ratesModule = {
  namespaced: true,

  state: {
    rates: {},
    selectedRate: {},
  },

  mutations: {
    SET_PAGINATED_FILTERED_RATES_TO_STATE: (state, ratesData) => {
      state.rates = ratesData.data;
    },
    RESET_PAGINATED_FILTERED_RATES_TO_STATE: (state) => {
      state.rates = {};
    },

    SET_SELECTEDRATE_TO_STATE: (state, chosenRate) => {
      state.selectedRate = chosenRate;
    },
    RESET_SELECTEDRATE_TO_STATE: (state) => {
      state.selectedRate = {};
    },

    SET_RATE_ID_TO_STATE: (state, newRateId) => {
      state.selectedRate.id = newRateId;
    },

    SET_RATETYPE_NAME_TO_STATE: (state, rateType) => {
      state.selectedRate.rateTypeId = rateType;
    },

    SET_RATE_PRICE_TO_STATE: (state, ratePrice) => {
      state.selectedRate.price = ratePrice;
    },
  },

  actions: {
    async GET_PAGINATED_FILTERED_RATELIST_FROM_API(
      { commit },
      { chosenRateId, selectedPage, limitPage }
    ) {
      try {
        const rateId = chosenRateId;
        const page = selectedPage;
        const limit = limitPage;

        if (rateId !== "no-filter") {
          const ratesData = await entityAPI.getRates({ rateId, page, limit });
          commit("SET_PAGINATED_FILTERED_RATES_TO_STATE", ratesData);
        } else {
          const ratesData = await entityAPI.getRates({ page, limit });
          commit("SET_PAGINATED_FILTERED_RATES_TO_STATE", ratesData);
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    GET_SELECTEDRATE_FROM_API({ commit }, chosenRate) {
      if (chosenRate) {
        commit("SET_SELECTEDRATE_TO_STATE", chosenRate);
      } else {
        commit("RESET_SELECTEDRATE_TO_STATE");
      }
    },
  },
};
