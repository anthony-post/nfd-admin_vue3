import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
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
    next('/');
  } else {
    next();
  }
})

export default router;
