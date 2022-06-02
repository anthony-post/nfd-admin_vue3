import { entityAPI } from "@/api/entityAPI";

const limit = 4; //limit items per page

export const ordersModule = {
  namespaced: true,

  state: {
    orderStatusList: [],
    orders: [],
    selectedPage: 1,

  },

  mutations: {
    SET_ORDERSTATUSLIST_TO_STATE: (state, statusList) => {
      state.orderStatusList = statusList;
    },

    SET_SELECTEDPAGE_TO_STATE: (state, chosenPage) => {
      state.selectedPage = chosenPage;
    },

    SET_ORDERS_TO_STATE: (state, ordersData) => {
      state.orders = ordersData.data;
    },
  },

  actions: {
    async GET_ORDERSTATUSLIST_FROM_API({ commit }) {
      const statusList = await entityAPI.getOrderStatusList();
      commit("SET_ORDERSTATUSLIST_TO_STATE", statusList.data.data);
      },
      
    async GET_ORDERLIST_FROM_API({ commit, state }, chosenId) {
      try {
        const orderStatusId = chosenId;

        if (orderStatusId === "no-filter") {

          const page = state.selectedPage;

          const ordersData = await entityAPI.getOrders({ page, limit });
          commit("SET_ORDERS_TO_STATE", ordersData);
            
        } else {

          const page = state.selectedPage;

          const ordersData = await entityAPI.getOrders({ orderStatusId, page, limit });
          commit("SET_ORDERS_TO_STATE", ordersData);
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    // async GET_ORDERLIST_FROM_API({ commit }, orderStatusId, currentPage) {
    //   try {
    //     if (orderStatusId === "no-filter") {

    //       let page = currentPage;
    //       // const limit = 4;

    //       const ordersData = await entityAPI.getOrders({ page, limit });
    //       commit("SET_ORDERS_TO_STATE", ordersData);
    //     } else {

    //       let page = currentPage;
    //       // const limit = 4;

    //       // const { count, data } = await entityAPI.getOrders({orderStatusId, page, limit});
    //       const ordersData = await entityAPI.getOrders({ orderStatusId, page, limit });
    //       commit("SET_ORDERS_TO_STATE", ordersData);
    //     }
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // },
  },

  getters: {
    ORDERS: (state) => {
      return state.orders.data;
    },
  },
};
