import { entityAPIInstance } from "@/api";

const url = {
  CITY: "/db/city",
  //   POINT: "/db/point",
  //   CATEGORY: "/db/category",
  //   CAR: "/db/car",
  //   RATE: "/db/rate",
  ORDERSTATUS: "db/orderStatus",
  ORDER: "db/order",
};

export const entityAPI = {
  // getCities() {
  //   return entityAPIInstance.get(url.CITY);
  // },
  getCities(params = {}) {
    return entityAPIInstance.get(url.CITY, {
      params,
    });
  },
  getOrderStatusList() {
    return entityAPIInstance.get(url.ORDERSTATUS);
  },
  getOrders(params = {}) {
    return entityAPIInstance.get(url.ORDER, {
      params,
    });
  },
};

// export default {
//   getCities() {
//     return entityAPIInstance.get(url.CITY);
//   },
//   getPoints() {
//     return axiosConfig.get(url.POINT);
//   },
//   getCategories() {
//     return axiosConfig.get(url.CATEGORY);
//   },
//   getCars(params = {}) {
//     return axiosConfig.get(url.CAR, {
//       params,
//     });
//   },
//   getRate() {
//     return axiosConfig.get(url.RATE);
//   },
//   postOrder(data = {}) {
//     return axiosConfig.post(url.ORDER, {
//       ...data,
//     });
//   },
//   putOrder(idOrder, data = {}) {
//     return axiosConfig.put(url.ORDER + '/' + idOrder, {
//       ...data,
//     });
//   },
//   getOrder(idOrder, data = {}) {
//     return axiosConfig.get(url.ORDER + '/' + idOrder, {
//       ...data,
//     });
//   },
// };
