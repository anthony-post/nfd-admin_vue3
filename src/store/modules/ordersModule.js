import { entityAPI } from "@/api/entityAPI";

export const ordersModule = {
  namespaced: true,

  state: {
    ordersAll: [],
    orders: {},
    selectedOrder: {},

    chosenDateFromMs: 0, //выбранная ДАТА в миллисекундах в поле "С"
    chosenTimeFromMs: 0, //выбранное ВРЕМЯ в миллисекундах в поле "С"
    chosenDateToMs: 0, //выбранная ДАТА в миллисекундах в поле "По"
    chosenTimeToMs: 0, //выбранное ВРЕМЯ в миллисекундах в поле "С"
  },

  mutations: {
    SET_ALLORDERLIST_TO_STATE: (state, orderList) => {
      state.ordersAll = orderList;
    },

    SET_ORDERS_TO_STATE: (state, ordersData) => {
      state.orders = ordersData.data;
    },
    RESET_ORDERS_TO_STATE: (state) => {
      state.orders = {};
    },

    //selected order
    SET_SELECTEDORDER_TO_STATE: (state, chosenOrder) => {
      state.selectedOrder = chosenOrder;
    },
    RESET_SELECTEDORDER_TO_STATE: (state) => {
      state.selectedOrder = {};
    },

    SET_SELECTEDCAR_TO_STATE: (state, chosenCar) => {
      state.selectedOrder.carId = chosenCar;
    },

    SET_SELECTEDCITY_TO_STATE: (state, chosenCity) => {
      state.selectedOrder.cityId = chosenCity;
    },

    SET_SELECTEDPOINT_TO_STATE: (state, chosenPoint) => {
      state.selectedOrder.pointId = chosenPoint;
    },
    RESET_SELECTEDPOINT_TO_STATE: (state) => {
      state.selectedOrder.pointId = "";
    },

    SET_SELECTEDORDERSTATUS_TO_STATE: (state, chosenOrderStatus) => {
      state.selectedOrder.orderStatusId = chosenOrderStatus;
    },

    SET_SELECTEDRATE_TO_STATE: (state, chosenRate) => {
      state.selectedOrder.rateId = chosenRate;
    },

    SET_SELECTEDCOLOR_TO_STATE: (state, chosenColor) => {
      state.selectedOrder.color = chosenColor;
    },
    RESET_SELECTEDCOLOR_TO_STATE: (state) => {
      state.selectedOrder.color = "";
    },

    //DATE_TIME_FROM
    SET_SELECTEDDATETIMEFROM_TO_STATE(state, chosenOption) {
      state.selectedOrder.dateFrom = chosenOption;
    },
    RESET_SELECTEDDATETIMEFROM_TO_STATE(state) {
      state.selectedOrder.dateFrom = 0;
      state.chosenDateFromMs = 0;
      state.chosenTimeFromMs = 0;
    },
    //DATE_FROM
    SET_SELECTEDDATEFROM(state, chosenOption) {
      state.chosenDateFromMs = chosenOption;
    },
    //TIME_FROM
    SET_SELECTEDTIMEFROM(state, chosenOption) {
      state.chosenTimeFromMs = chosenOption;
    },

    //DATE_TIME_TO
    SET_SELECTEDDATETIMETO_TO_STATE(state, chosenOption) {
      state.selectedOrder.dateTo = chosenOption;
    },
    RESET_SELECTEDDATETIMETO_TO_STATE(state) {
      state.selectedOrder.dateTo = 0;
      state.chosenDateToMs = 0;
      state.chosenTimeToMs = 0;
    },
    //DATE_TO
    SET_SELECTEDDATETO(state, chosenOption) {
      state.chosenDateToMs = chosenOption;
    },
    //TIME_TO
    SET_SELECTEDTIMETO(state, chosenOption) {
      state.chosenTimeToMs = chosenOption;
    },

    //TANK
    SET_SELECTEDTANK(state, selectedTank) {
      state.selectedOrder.isFullTank = selectedTank;
    },
    RESET_SELECTEDTANK(state) {
      state.selectedOrder.isFullTank = false;
    },
    //BABY CHAIR
    SET_SELECTEDCHILDCHAIR(state, selectedChildChair) {
      state.selectedOrder.isNeedChildChair = selectedChildChair;
    },
    RESET_SELECTEDCHILDCHAIR(state) {
      state.selectedOrder.isNeedChildChair = false;
    },
    //RIGHT HAND DRIVE
    SET_SELECTEDRIGHTWHEEL(state, selectedRightWheel) {
      state.selectedOrder.isRightWheel = selectedRightWheel;
    },
    RESET_SELECTEDRIGHTWHEEL(state) {
      state.selectedOrder.isRightWheel = false;
    },

    //PRICE
    SET_PRICE_TO_STATE(state, price) {
      state.selectedOrder.price = price;
    },
    RESET_PRICE_TO_STATE(state) {
      state.selectedOrder.price = 0;
    },
  },

  actions: {
    async GET_ALLORDERLIST_FROM_API({ commit }) {
      const orderList = await entityAPI.getAllOrders();
      commit("SET_ALLORDERLIST_TO_STATE", orderList.data.data);
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
