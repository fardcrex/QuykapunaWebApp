import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import EventosPage from "../pages/EventosPage.vue";
import ProductosPage from "../pages/ProductosPage.vue";
import LoginUser from "../pages/LoginUser.vue";
import EventPage from "../pages/EventPage.vue";
import RegisterUser from "../pages/RegisterUser.vue";
import AgregarProductosPage from "../pages/AgregarProductosPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/eventos",
    name: "EventPage",
    component: EventosPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/evento/:idEvent",
    name: "EventOnePage",
    component: EventPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/AgregarProductosPage/:idEvent",
    name: "AgregarProductosPage",
    component: AgregarProductosPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/productos",
    name: "ProductPage",
    component: ProductosPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/entrar",
    name: "LoginUser",
    component: LoginUser,
  },
  {
    path: "/registro",
    name: "RegisterUser",
    component: RegisterUser,
  },
  { path: "*", component: Home },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("usuario");
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/");
    return;
  }
  next();
});
