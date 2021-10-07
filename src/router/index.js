import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
// import Home from "../views/Home.vue";
import Faker from "../views/Faker.vue";
import Orders from "../views/Orders.vue";
import Order from "../views/Order.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/order",
    name: "Order",
    component: Order,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
  {
    path: "/faker",
    name: "Faker",
    component: Faker,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
