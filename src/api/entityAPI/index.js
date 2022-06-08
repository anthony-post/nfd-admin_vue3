import { entityAPIInstance } from "@/api";

const UrlEntity = {
  orderstatus: "db/orderStatus",
  city: "db/city",
  category: "db/category",
  order: "db/order",
  car: "db/car",
};

export const entityAPI = {
  getOrderStatusList() {
    return entityAPIInstance.get(UrlEntity.orderstatus);
  },

  getCityList() {
    return entityAPIInstance.get(UrlEntity.city);
  },

  getCategoryList() {
    return entityAPIInstance.get(UrlEntity.category);
  },

  postCreateCarItem(data = {}) {
    return entityAPIInstance.post(UrlEntity.car, {
      ...data,
    });
  },

  putChangeCarItem(carId, data = {}) {
    return entityAPIInstance.put(UrlEntity.car + "/" + carId, {
      ...data,
    });
  },

  deleteCarItem(carId) {
    return entityAPIInstance.delete(UrlEntity.car + "/" + carId);
  },

  getOrders(params = {}) {
    return entityAPIInstance.get(UrlEntity.order, {
      params,
    });
  },

  getCars(params = {}) {
    return entityAPIInstance.get(UrlEntity.car, {
      params,
    });
  },
};
