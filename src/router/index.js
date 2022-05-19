import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login.vue";
import ListOrders from "../views/ListOrders.vue";
import ListCars from "../views/ListCars.vue";
import CardCar from "../views/CardCar.vue";

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
      { path: "orders", component: ListOrders },
      { path: "cars", component: ListCars },
      { path: "card-car", component: CardCar },
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
