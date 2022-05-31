import { entityAPI } from "@/api/entityAPI";

const limit = 5; //limit items per page

export const entityModule = {
  namespaced: true,

  state: {
    orderStatusList: [],
    orders: {},
    // cityList: [],
    cities: {},
  },

  mutations: {
    SET_ORDERSTATUSLIST_TO_STATE: (state, statusList) => {
      state.orderStatusList = statusList;

      state.orders["no-filter"] = {
        value: [],
        page: 0,
      };

      statusList.forEach(status => {
        state.orders[status.id] = {
          value: [],
          page: 0,
        }
      });
    },
    SET_ORDERS_DATA: (state, { ordersData, orderStatusId }) => {
      if (!orderStatusId) {
        const ordersAll = state.orders["no-filter"];
        ordersAll.value.push(...ordersData.data.data);
        ordersAll.page++;
      } else {
        const ordersById = state.orders[orderStatusId];
        ordersById.value.push(...ordersData.data.data);
        ordersById.page++;
      }
    },

    // SET_CITIES_DATA: (state, { citiesData, id }) => {
    //   if (!id) {
    //     const citiesAll = state.cities["no-filter"];
    //     citiesAll.value.push(...citiesData.data.data);
    //   } else {
    //     const cityById = state.cities[id];
    //     cityById.value.push(...citiesData.data.data);
    //   }
    // },

    // SET_CITYLIST_TO_STATE(state, cities) {
    //   state.cityList = cities.data.data;
    // },
  },

  actions: {
    async GET_ORDERSTATUSLIST_FROM_API({ commit }) {
      const statusList = await entityAPI.getOrderStatusList();
      commit("SET_ORDERSTATUSLIST_TO_STATE", statusList.data.data);
    },

    async GET_FILTERED_ORDERLIST_FROM_API({ commit, state }, orderStatusId) {
      try {
        if (orderStatusId === "no-filter") {
          const page = state.orders["no-filter"]?.page;
          const ordersData = await entityAPI.getOrders({ page, limit });
          commit("SET_ORDERS_DATA", { ordersData });
        } else {
          const page = state.orders[orderStatusId]?.page;
          const ordersData = await entityAPI.getOrders({ orderStatusId, page, limit });
          commit("SET_ORDERS_DATA", { ordersData, orderStatusId });
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    // async GET_FILTERED_CITYLIST_FROM_API({ commit, state }, id) {
    //   try {
    //     if (id === "no-filter") {
    //       const page = state.cities["no-filter"]?.page;
    //       const citiesData = await entityAPI.getCities({ page, limit });
    //       commit("SET_CITIES_DATA", { citiesData });
    //     } else {
    //       const page = state.cities[id]?.page;
    //       const citiesData = await entityAPI.getCities({ id, page, limit });
    //       commit("SET_CITIES_DATA", { citiesData, id });
    //     }
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // },

    // async GET_CITYLIST_FROM_API({ commit }) {
    //   try {
    //     const cities = await entityAPI.getCities();
    //     commit("SET_CITYLIST_TO_STATE", cities);
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // },
  },

  getters: {
    FILTERED_ORDERS_BY_ORDERSTATUS: (state) => (orderStatusId) => {
      if (orderStatusId === "no-filter") {
        return state.orders["no-filter"]?.value;
      } else {
        return state.orders[orderStatusId]?.value;
      }
    },

    // FILTERED_CITIESDATA_BY_NAME: (state) => (id) => {
    //   if (id === "no-filter") {
    //     return state.cities["no-filter"].value;
    //   } else {
    //     return state.cities[id].value;
    //   }
    // },
  },
};
