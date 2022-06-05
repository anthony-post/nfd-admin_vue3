import { entityAPIInstance } from "@/api";

const url = {
  ORDERSTATUS: "db/orderStatus",
  CITY: "db/city",
  CATEGORY: "db/category",
  ORDER: "db/order",
  CAR: "db/car",
};

export const entityAPI = {

  getOrderStatusList() {
    return entityAPIInstance.get(url.ORDERSTATUS);
  },

  getCityList() {
    return entityAPIInstance.get(url.CITY);
  },

  getCategoryList() {
    return entityAPIInstance.get(url.CATEGORY);
  },

  getOrders(params = {}) {
    return entityAPIInstance.get(url.ORDER, {
      params,
    });
  },

  getCars(params = {}) {
    return entityAPIInstance.get(url.CAR, {
      params,
    });
  },
  
};
