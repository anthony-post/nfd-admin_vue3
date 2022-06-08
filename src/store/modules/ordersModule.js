import { entityAPI } from "@/api/entityAPI";

export const ordersModule = {
  namespaced: true,

  state: {
    orderStatusList: [],
    cityList: [],
    orders: {},
  },

  mutations: {
    SET_ORDERSTATUSLIST_TO_STATE: (state, statusList) => {
      state.orderStatusList = statusList;
    },

    SET_CITYLIST_TO_STATE: (state, cityList) => {
      state.cityList = cityList;
    },

    SET_ORDERS_TO_STATE: (state, ordersData) => {
      state.orders = ordersData.data;
    },
    RESET_ORDERS_TO_STATE: (state) => {
      state.orders = {};
    },
  },

  actions: {
    async GET_ORDERSTATUSLIST_FROM_API({ commit }) {
      const statusList = await entityAPI.getOrderStatusList();
      commit("SET_ORDERSTATUSLIST_TO_STATE", statusList.data.data);
    },

    async GET_CITYLIST_FROM_API({ commit }) {
      const cityList = await entityAPI.getCityList();
      commit("SET_CITYLIST_TO_STATE", cityList.data.data);
    },

    async GET_ORDERLIST_FROM_API(
      { commit },
      { chosenOrdersStatusId, chosenCityId, chosenPage, limitPerPage }
    ) {
      try {
        const cityId = chosenCityId;
        const orderStatusId = chosenOrdersStatusId;
        const page = chosenPage;
        const limit = limitPerPage;

        if (orderStatusId !== "no-filter" && cityId !== "no-filter") {
          const ordersData = await entityAPI.getOrders({
            orderStatusId,
            cityId,
            page,
            limit,
          });
          commit("SET_ORDERS_TO_STATE", ordersData);
        } else if (orderStatusId !== "no-filter") {
          const ordersData = await entityAPI.getOrders({
            orderStatusId,
            page,
            limit,
          });
          commit("SET_ORDERS_TO_STATE", ordersData);
        } else if (cityId !== "no-filter") {
          const ordersData = await entityAPI.getOrders({ cityId, page, limit });
          commit("SET_ORDERS_TO_STATE", ordersData);
        } else {
          const ordersData = await entityAPI.getOrders({ page, limit });
          commit("SET_ORDERS_TO_STATE", ordersData);
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
