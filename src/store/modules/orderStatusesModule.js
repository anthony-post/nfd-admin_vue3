import { entityAPI } from "@/api/entityAPI";

export const orderStatusesModule = {
  namespaced: true,

  state: {
    orderStatuses: {},
    selectedOrderStatus: {},
  },

  mutations: {
    SET_PAGINATED_FILTERED_ORDERSTATUSES_TO_STATE: (
      state,
      orderStatusesData
    ) => {
      state.orderStatuses = orderStatusesData.data;
    },
    RESET_PAGINATED_FILTERED_ORDERSTATUSES_TO_STATE: (state) => {
      state.orderStatuses = {};
    },

    SET_SELECTEDORDERSTATUS_TO_STATE: (state, chosenOrderStatus) => {
      state.selectedOrderStatus = chosenOrderStatus;
    },
    RESET_SELECTEDORDERSTATUS_TO_STATE: (state) => {
      state.selectedOrderStatus = {};
    },

    SET_ORDERSTATUS_ID_TO_STATE: (state, newOrderStatusId) => {
      state.selectedOrderStatus.id = newOrderStatusId;
    },

    SET_ORDERSTATUS_NAME_TO_STATE: (state, orderStatusName) => {
      state.selectedOrderStatus.name = orderStatusName;
    },
  },

  actions: {
    async GET_PAGINATED_FILTERED_ORDERSTATUSLIST_FROM_API(
      { commit },
      { chosenOrderStatusId, selectedPage, limitPage }
    ) {
      try {
        const orderStatusId = chosenOrderStatusId;
        const page = selectedPage;
        const limit = limitPage;

        if (orderStatusId !== "no-filter") {
          const orderStatusesData = await entityAPI.getOrderStatusById(orderStatusId);
          commit(
            "SET_PAGINATED_FILTERED_ORDERSTATUSES_TO_STATE",
            orderStatusesData
          );
        } else {
          const orderStatusesData = await entityAPI.getOrderStatuses({
            page,
            limit,
          });
          commit(
            "SET_PAGINATED_FILTERED_ORDERSTATUSES_TO_STATE",
            orderStatusesData
          );
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    GET_SELECTEDORDERSTATUS_FROM_API({ commit }, chosenOrderStatus) {
      if (chosenOrderStatus) {
        commit("SET_SELECTEDORDERSTATUS_TO_STATE", chosenOrderStatus);
      } else {
        commit("RESET_SELECTEDORDERSTATUS_TO_STATE");
      }
    },
  },
};
