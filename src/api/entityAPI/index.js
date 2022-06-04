import { entityAPIInstance } from "@/api";

const url = {
  ORDERSTATUS: "db/orderStatus",
  CITY: "db/city",
  ORDER: "db/order",
};

export const entityAPI = {

  getOrderStatusList() {
    return entityAPIInstance.get(url.ORDERSTATUS);
  },

  getCityList() {
    return entityAPIInstance.get(url.CITY);
  },

  getOrders(params = {}) {
    return entityAPIInstance.get(url.ORDER, {
      params,
    });
  },
  
};
