import { entityAPIInstance } from "@/api";

const url = {
  ORDERSTATUS: "db/orderStatus",
  ORDER: "db/order",
};

export const entityAPI = {

  getOrderStatusList() {
    return entityAPIInstance.get(url.ORDERSTATUS);
  },

  getOrders(params = {}) {
    return entityAPIInstance.get(url.ORDER, {
      params,
    });
  },
  
};
