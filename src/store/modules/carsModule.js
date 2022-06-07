import { entityAPI } from "@/api/entityAPI";

export const carsModule = {
  namespaced: true,

  state: {
    cars: {},
    categoryList: [],
    selectedCar: {},
    colors: [],
  },

  mutations: {
    SET_CATEGORYLIST_TO_STATE: (state, categoryList) => {
      state.categoryList = categoryList;
    },

    SET_CARS_TO_STATE: (state, carsData) => {
      state.cars = carsData.data;
    },
    RESET_CARS_TO_STATE: (state) => {
      state.cars = {};
    },

    SET_SELECTEDCAR_TO_STATE: (state, chosenCar) => {
      state.selectedCar = chosenCar;
    },
    RESET_SELECTEDCAR_TO_STATE: (state) => {
      state.selectedCar = {};
    },

    SET_CARID_TO_STATE: (state, newCarId) => {
      state.selectedCar.id = newCarId;
    },

    SET_CARNAME_TO_STATE: (state, carName) => {
      state.selectedCar.name = carName;
    },

    SET_CARCATEGORY_TO_STATE: (state, carCategory) => {
      state.selectedCar.categoryId = carCategory;
    },

    SET_CARDESCRIPTION_TO_STATE: (state, carDescription) => {
      state.selectedCar.description = carDescription;
    },

    SET_CARPRICEMIN_TO_STATE: (state, carPriceMin) => {
      state.selectedCar.priceMin = carPriceMin;
    },

    SET_CARPRICEMAX_TO_STATE: (state, carPriceMax) => {
      state.selectedCar.priceMax = carPriceMax;
    },

    SET_CARTANK_TO_STATE: (state, carTank) => {
      state.selectedCar.tank = carTank;
    },

    SET_CARNUMBER_TO_STATE: (state, carNumber) => {
      state.selectedCar.number = carNumber;
    },

    SET_CARCOLORS_TO_STATE: (state, colorList) => {
      state.selectedCar.colors = colorList;
    },

    SET_COLOR_TO_STATE: (state, carColor) => {
      state.colors.push(carColor);
      state.selectedCar["colors"] = state.colors;
    },
    RESET_COLOR_TO_STATE: (state, color) => {
      state.colors.forEach( (item, index) => {
        if (item === color) {
          state.colors.splice(index, 1);
        }
      });
      state.selectedCar["colors"] = state.colors;
    },

    SET_CARIMAGE_TO_STATE: (state, carThumbnail) => {
      state.selectedCar["thumbnail"] = carThumbnail;
    },
  },

  actions: {
    async GET_CATEGORYLIST_FROM_API({ commit }) {
      const categoryList = await entityAPI.getCategoryList();
      commit("SET_CATEGORYLIST_TO_STATE", categoryList.data.data);
    },
    
    async GET_CARLIST_FROM_API({ commit }, { chosenCarCategoryId, selectedPage, limitPage }) {
      try {

        const categoryId = chosenCarCategoryId;
        const page = selectedPage;
        let limit = limitPage;

        if (categoryId !== "no-filter") {
          const carsData = await entityAPI.getCars({ categoryId, page, limit });
          commit("SET_CARS_TO_STATE", carsData);
        } else {
          const carsData = await entityAPI.getCars({ page, limit });
          commit("SET_CARS_TO_STATE", carsData);
        }

      } catch (error) {
        throw new Error(error);
      }
    },

    GET_SELECTEDCAR_FROM_API({ commit }, chosenCar) {
      if (chosenCar) {
        commit("SET_SELECTEDCAR_TO_STATE", chosenCar);
      } else {
        commit("RESET_SELECTEDCAR_TO_STATE");
      }
    }
  },
};
