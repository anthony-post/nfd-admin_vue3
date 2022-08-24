import { entityAPI } from "@/api/entityAPI";

export const citiesModule = {
  namespaced: true,

  state: {
    cities: {},
    selectedCity: {},
  },

  mutations: {
    SET_PAGINATED_FILTERED_CITIES_TO_STATE: (state, citiesData) => {
      state.cities = citiesData.data;
    },
    RESET_PAGINATED_FILTERED_CITIES_TO_STATE: (state) => {
      state.cities = {};
    },

    SET_SELECTEDCITY_TO_STATE: (state, chosenCity) => {
      state.selectedCity = chosenCity;
    },
    RESET_SELECTEDCITY_TO_STATE: (state) => {
      state.selectedCity = {};
    },

    SET_CITY_ID_TO_STATE: (state, newCityId) => {
      state.selectedCity.id = newCityId;
    },

    SET_CITY_NAME_TO_STATE: (state, cityName) => {
      state.selectedCity.name = cityName;
    },
  },

  actions: {
    async GET_PAGINATED_FILTERED_CITYLIST_FROM_API(
      { commit },
      { chosenCityId, selectedPage, limitPage }
    ) {
      try {
        const cityId = chosenCityId;
        const page = selectedPage;
        const limit = limitPage;

        if (cityId !== "no-filter") {
          const citiesData = await entityAPI.getCityById(cityId);
          commit("SET_PAGINATED_FILTERED_CITIES_TO_STATE", citiesData);
        } else {
          const citiesData = await entityAPI.getCities({ page, limit });
          commit("SET_PAGINATED_FILTERED_CITIES_TO_STATE", citiesData);
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    GET_SELECTEDCITY_FROM_API({ commit }, chosenCity) {
      if (chosenCity) {
        commit("SET_SELECTEDCITY_TO_STATE", chosenCity);
      } else {
        commit("RESET_SELECTEDCITY_TO_STATE");
      }
    },
  },
};
