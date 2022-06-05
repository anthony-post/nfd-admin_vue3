import { entityAPIInstance } from "@/api";

const url = {
  ORDER: "db/order",
  ORDERSTATUS: "db/orderStatus",
  CITY: "db/city",
  CATEGORY: "db/category",
  CAR: "db/car",
};

export const entityAPI = {

  getOrders(params = {}) {
    return entityAPIInstance.get(url.ORDER, {
      params,
    });
  },

  getOrderStatusList() {
    return entityAPIInstance.get(url.ORDERSTATUS);
  },

  getCityList() {
    return entityAPIInstance.get(url.CITY);
  },

  getCategoryList() {
    return entityAPIInstance.get(url.CATEGORY);
  },

  postCarCreateItem(data = {}) {
    return entityAPIInstance.post(url.CAR, {
      ...data,
    });
  },

  deleteCarCreateItem(carId) {
    return entityAPIInstance.delete(url.CAR + '/' + carId);
  },
  
};
