import { entityAPIInstance } from "@/api";

const UrlEntity = {
  orderStatus: "db/orderStatus",
  city: "db/city",
  category: "db/category",
  order: "db/order",
  car: "db/car",
  point: "db/point",
  rate: "db/rate",
  rateType: "db/rateType",
};

export const entityAPI = {
  getRateTypeList() {
    return entityAPIInstance.get(UrlEntity.rateType);
  },

  getRateList() {
    return entityAPIInstance.get(UrlEntity.rate);
  },

  getCarById(carId) {
    return entityAPIInstance.get(UrlEntity.car + "/" + carId);
  },

  getFilteredPointList(params = {}) {
    return entityAPIInstance.get(UrlEntity.point, {
      params,
    });
  },

  getPointList() {
    return entityAPIInstance.get(UrlEntity.point);
  },

  getCarList() {
    return entityAPIInstance.get(UrlEntity.car);
  },

  getOrderStatusList() {
    return entityAPIInstance.get(UrlEntity.orderStatus);
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

  putOrderStatusId(orderStatusId, data = {}) {
    return entityAPIInstance.put(UrlEntity.order + "/" + orderStatusId, {
      ...data,
    });
  },

  putChangeOrder(orderId, data = {}) {
    return entityAPIInstance.put(UrlEntity.order + "/" + orderId, {
      ...data,
    });
  },

  getCategories(params = {}) {
    return entityAPIInstance.get(UrlEntity.category, {
      params,
    });
  },

  getCategoryById(categoryId) {
    return entityAPIInstance.get(UrlEntity.category + "/" + categoryId);
  },

  getCities(params = {}) {
    return entityAPIInstance.get(UrlEntity.city, {
      params,
    });
  },

  getCityById(cityId) {
    return entityAPIInstance.get(UrlEntity.city + "/" + cityId);
  },

  getPoints(params = {}) {
    return entityAPIInstance.get(UrlEntity.point, {
      params,
    });
  },

  getRates(params = {}) {
    return entityAPIInstance.get(UrlEntity.rate, {
      params,
    });
  },

  getRateTypes(params = {}) {
    return entityAPIInstance.get(UrlEntity.rateType, {
      params,
    });
  },

  getRateTypesById(rateTypeId) {
    return entityAPIInstance.get(UrlEntity.rateType + "/" + rateTypeId);
  },

  getOrderStatuses(params = {}) {
    return entityAPIInstance.get(UrlEntity.orderStatus, {
      params,
    });
  },

  getOrderStatusById(orderStatusId) {
    return entityAPIInstance.get(UrlEntity.orderStatus + "/" + orderStatusId);
  },

  postCreateCategoryItem(data = {}) {
    return entityAPIInstance.post(UrlEntity.category, {
      ...data,
    });
  },

  putChangeCategoryItem(categoryId, data = {}) {
    return entityAPIInstance.put(UrlEntity.category + "/" + categoryId, {
      ...data,
    });
  },

  deleteCategoryItem(categoryId) {
    return entityAPIInstance.delete(UrlEntity.category + "/" + categoryId);
  },

  postCreateCityItem(data = {}) {
    return entityAPIInstance.post(UrlEntity.city, {
      ...data,
    });
  },

  putChangeCityItem(cityId, data = {}) {
    return entityAPIInstance.put(UrlEntity.city + "/" + cityId, {
      ...data,
    });
  },

  deleteCityItem(cityId) {
    return entityAPIInstance.delete(UrlEntity.city + "/" + cityId);
  },

  postCreatePointItem(data = {}) {
    return entityAPIInstance.post(UrlEntity.point, {
      ...data,
    });
  },

  putChangePointItem(pointId, data = {}) {
    return entityAPIInstance.put(UrlEntity.point + "/" + pointId, {
      ...data,
    });
  },

  deletePointItem(pointId) {
    return entityAPIInstance.delete(UrlEntity.point + "/" + pointId);
  },

  postCreateRateItem(data = {}) {
    return entityAPIInstance.post(UrlEntity.rate, {
      ...data,
    });
  },

  putChangeRateItem(rateId, data = {}) {
    return entityAPIInstance.put(UrlEntity.rate + "/" + rateId, {
      ...data,
    });
  },

  deleteRateItem(rateId) {
    return entityAPIInstance.delete(UrlEntity.rate + "/" + rateId);
  },

  postCreateRateTypeItem(data = {}) {
    return entityAPIInstance.post(UrlEntity.rateType, {
      ...data,
    });
  },

  putChangeRateTypeItem(rateTypeId, data = {}) {
    return entityAPIInstance.put(UrlEntity.rateType + "/" + rateTypeId, {
      ...data,
    });
  },

  deleteRateTypeItem(rateTypeId) {
    return entityAPIInstance.delete(UrlEntity.rateType + "/" + rateTypeId);
  },

  postCreateOrderStatusItem(data = {}) {
    return entityAPIInstance.post(UrlEntity.orderStatus, {
      ...data,
    });
  },

  putChangeOrderStatusItem(orderStatusId, data = {}) {
    return entityAPIInstance.put(UrlEntity.orderStatus + "/" + orderStatusId, {
      ...data,
    });
  },

  deleteOrderStatusItem(orderStatusId) {
    return entityAPIInstance.delete(
      UrlEntity.orderStatus + "/" + orderStatusId
    );
  },
};
