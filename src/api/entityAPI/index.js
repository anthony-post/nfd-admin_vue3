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

  postCreateCarItem(data = {}) {
    return entityAPIInstance.post(url.CAR, {
      ...data,
    });
  },

  putChangeCarItem(carId, data = {}) {
    return entityAPIInstance.put(url.CAR + '/' + carId, {
      ...data,
    });
  },

  deleteCarItem(carId) {
    return entityAPIInstance.delete(url.CAR + '/' + carId);
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
