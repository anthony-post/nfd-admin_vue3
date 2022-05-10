import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login.vue";
// import OrderList from "../views/order-list.vue";

// const isAuthorized = () => localStorage.getItem('user');
// const authGuard = (to, from, next) => {
//   if(!isAuthorized) next({ name: '/' });
//   else next();
// }

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  // {
  //   path: "/order-list",
  //   name: "order-list",
  //   component: OrderList,
  //   beforeEnter: authGuard
  // },
  {
    path: "/order-list",
    name: "order-list",
    component: () => import('@/views/order-list.vue'),
    meta: { needAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('user');
  if (to.matched.some(record => record.meta.needAuth) && !isLoggedIn) {
  // if (to.meta.needAuth && !isLoggedIn) {
  // if (!isLoggedIn) {
    next('/');
  } else {
    next();
  }
})

export default router;
