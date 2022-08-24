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
import CardOrder from "../views/CardOrder.vue";
import CardCategory from "../views/CardCategory.vue";
import CardCity from "../views/CardCity.vue";
import CardPoint from "../views/CardPoint.vue";
import CardRate from "../views/CardRate.vue";
import CardTypeRate from "../views/CardTypeRate.vue";
import CardOrderStatus from "../views/CardOrderStatus.vue";
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
        path: "card-orderstatus_:id",
        name: "card-orderstatus_id",
        component: CardOrderStatus,
      },
      {
        path: "card-orderstatus",
        name: "card-orderstatus",
        component: CardOrderStatus,
      },
      {
        path: "card-typerate_:id",
        name: "card-typerate_id",
        component: CardTypeRate,
      },
      { path: "card-typerate", name: "card-typerate", component: CardTypeRate },
      {
        path: "card-rate_:id",
        name: "card-rate_id",
        component: CardRate,
      },
      { path: "card-rate", name: "card-rate", component: CardRate },
      {
        path: "card-point_:id",
        name: "card-point_id",
        component: CardPoint,
      },
      { path: "card-point", name: "card-point", component: CardPoint },
      {
        path: "card-city_:id",
        name: "card-city_id",
        component: CardCity,
      },
      { path: "card-city", name: "card-city", component: CardCity },
      {
        path: "card-category_:id",
        name: "card-category_id",
        component: CardCategory,
      },
      { path: "card-category", name: "card-category", component: CardCategory },
      {
        path: "card-order_:id",
        name: "card-order_id",
        component: CardOrder,
      },
      {
        path: "card-car_:id",
        name: "card-car_id",
        component: CardCar,
      },
      { path: "card-car", name: "/admin-panel/card-car", component: CardCar },
      { path: "orders", name: "orders", component: ListOrders },
      { path: "cars", name: "cars", component: ListCars },
      { path: "cities", name: "cities", component: ListCities },
      {
        path: "pickup-points",
        name: "pickup-points",
        component: ListPickUpPoints,
      },
      { path: "list-rates", name: "rates", component: ListRates },
      { path: "list-typerates", name: "typerates", component: ListTypeRates },
      {
        path: "list-categories",
        name: "categories",
        component: ListCategories,
      },
      {
        path: "list-orderstatus",
        name: "orderstatuses",
        component: ListOrderStatus,
      },
      { path: "404", name: "404", component: ErrorPage },
      //редирект на страницу с ошибкой 404 в случае несоответствия ни одной из вышеуказанных страниц 
      {
        path: "/:catchAll(.*)",
        name: "404",
        component: ErrorPage,
      },
      //редирект на страницу с ошибкой 404 в случае отсутствия ресурса
      {
        path: "/404/:resource",
        name: "404Resource",
        component: ErrorPage,
        props: true,
      },
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
