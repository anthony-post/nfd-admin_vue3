import { entityAPI } from "@/api/entityAPI";

export const carsModule = {
  namespaced: true,

  state: {
    cars: {},
    categoryList: [],
  },

  mutations: {
    SET_CATEGORYLIST_TO_STATE: (state, categoryList) => {
      state.categoryList = categoryList;
    },

    // SET_CITYLIST_TO_STATE: (state, cityList) => {
    //   state.cityList = cityList;
    // },

    SET_CARS_TO_STATE: (state, carsData) => {
      state.cars = carsData.data;
    },
    RESET_CARS_TO_STATE: (state) => {
      state.cars = {};
    },
  },

  actions: {
    async GET_CATEGORYLIST_FROM_API({ commit }) {
      const categoryList = await entityAPI.getCategoryList();
      commit("SET_CATEGORYLIST_TO_STATE", categoryList.data.data);
    },

  //   async GET_CITYLIST_FROM_API({ commit }) {
  //     const cityList = await entityAPI.getCityList();
  //     commit("SET_CITYLIST_TO_STATE", cityList.data.data);
  //   },
    
    async GET_CARLIST_FROM_API({ commit }, { chosenCarCategoryId, selectedPage, limitPage }) {
      try {

        // const cityId = chosenCityId;
        const categoryId = chosenCarCategoryId;
        const page = selectedPage;
        const limit = limitPage;

        if (categoryId !== "no-filter") {
         const carsData = await entityAPI.getCars({ categoryId, page, limit });
          commit("SET_CARS_TO_STATE", carsData);
        } else {
          const carsData = await entityAPI.getCars({ page, limit });
          commit("SET_CARS_TO_STATE", carsData);
        }


        // if (orderStatusId !== "no-filter" && cityId !== "no-filter") {
        //   const ordersData = await entityAPI.getOrders({ orderStatusId, cityId, page, limit });
        //   commit("SET_ORDERS_TO_STATE", ordersData);
        // } else if (orderStatusId !== "no-filter") {
        //   const ordersData = await entityAPI.getOrders({ orderStatusId, page, limit });
        //   commit("SET_ORDERS_TO_STATE", ordersData);
        // } else if (cityId !== "no-filter") {
        //   const ordersData = await entityAPI.getOrders({ cityId, page, limit });
        //   commit("SET_ORDERS_TO_STATE", ordersData);
        // } else {
        //   const ordersData = await entityAPI.getOrders({ page, limit });
        //   commit("SET_ORDERS_TO_STATE", ordersData);
        // }

      } catch (error) {
        throw new Error(error);
      }
    },

    // async GET_ORDERLIST_FROM_API({ commit }, { chosenOrdersStatusId, chosenCityId, chosenPage, limitPerPage }) {
    //   try {

    //     const cityId = chosenCityId;
    //     const orderStatusId = chosenOrdersStatusId;
    //     const page = chosenPage;
    //     const limit = limitPerPage;

    //     if (orderStatusId !== "no-filter" && cityId !== "no-filter") {
    //       const ordersData = await entityAPI.getOrders({ orderStatusId, cityId, page, limit });
    //       commit("SET_ORDERS_TO_STATE", ordersData);
    //     } else if (orderStatusId !== "no-filter") {
    //       const ordersData = await entityAPI.getOrders({ orderStatusId, page, limit });
    //       commit("SET_ORDERS_TO_STATE", ordersData);
    //     } else if (cityId !== "no-filter") {
    //       const ordersData = await entityAPI.getOrders({ cityId, page, limit });
    //       commit("SET_ORDERS_TO_STATE", ordersData);
    //     } else {
    //       const ordersData = await entityAPI.getOrders({ page, limit });
    //       commit("SET_ORDERS_TO_STATE", ordersData);
    //     }

    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // },
  },
};
