import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login.vue";
import ListOrders from "../views/ListOrders.vue";
import ListCars from "../views/ListCars.vue";
import ListCities from "../views/ListCities.vue";
import ListPickUpPoints from "../views/ListPickUpPoints.vue";
import ListRates from "../views/ListRates.vue";
import ListTypeRates from "../views/ListTypeRates.vue";
import ListCategories from "../views/ListCategories.vue";
import ListOrderStatus from "../views/ListOrderStatus.vue";
import CardCar from "../views/CardCar.vue";
import ErrorPage from "../views/ErrorPage.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/admin-panel",
    name: "admin-panel",
    component: () => import("@/views/AdminPanel.vue"),
    meta: { needAuth: true },
    children: [
      {
        path: "card-car_:id",
        name: "/admin-panel/card-car_id",
        component: CardCar,
      },
      { path: "card-car", name: "/admin-panel/card-car", component: CardCar },
      { path: "orders", component: ListOrders },
      { path: "cars", name: "cars", component: ListCars },
      { path: "cities", component: ListCities },
      { path: "pickup-points", component: ListPickUpPoints },
      { path: "list-rates", component: ListRates },
      { path: "list-typerates", component: ListTypeRates },
      { path: "list-categories", component: ListCategories },
      { path: "list-orderstatus", component: ListOrderStatus },
      { path: "error-page", component: ErrorPage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("user");
  if (to.matched.some((record) => record.meta.needAuth) && !isLoggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;
