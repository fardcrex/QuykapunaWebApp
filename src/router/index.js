import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import EventosPage from "../pages/EventosPage.vue";
import CreateEventPage from "../pages/CreateEventPage.vue";
import CreateProductPage from "../pages/CreateProductPage.vue";
import ProductosPage from "../pages/ProductosPage.vue";
import LoginUser from "../pages/LoginUser.vue";
import EventPage from "../pages/EventDetallePage.vue";
import EventStatePage from "../pages/EventStatePage.vue";
import RegisterUser from "../pages/RegisterUser.vue";
import RegisterEmpresa from "../pages/RegisterEmpresa.vue";
import RegisterOption from "../pages/HomeRegister.vue";
import AgregarProductosPage from "../pages/AgregarProductosPage.vue";
import AllEventosClientPage from "../pages/cliente-pages/AllEventosClientPage.vue";
import EventClientPage from "../pages/cliente-pages/EventClientPage.vue";
import RealizarPedidoPage from "../pages/cliente-pages/RealizarPedidoPage.vue";
import PedidosPage from "../pages/cliente-pages/PedidosPage.vue";
import DetallePedidoPage from "../pages/cliente-pages/DetallePedidoPage.vue";

import HeaderBody from "@/components/detalles-pedido-page/HeaderBody.vue";
import ListProductos from "@/components/detalles-pedido-page/ListProductos.vue";
import ChangeListProductos from "@/components/detalles-pedido-page/ChangeListProductos.vue";
import QrImagen from "@/components/detalles-pedido-page/QrImagen.vue";
import FooterBody from "@/components/detalles-pedido-page/FooterBody.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/crear-evento",
    name: "CreateEventPage",
    component: CreateEventPage,
    meta: { requiresAuth: true, isProveedor: true },
  },
  {
    path: "/eventos-proveedor",
    name: "EventPage",
    component: EventosPage,
    meta: { requiresAuth: true, isProveedor: true },
  },
  {
    path: "/evento-empresa/:idEvent",
    name: "EventOnePage",
    component: EventPage,
    meta: { requiresAuth: true, isProveedor: true },
  },
  {
    path: "/evento-estado/:idEvent",
    name: "EventStatePage",
    component: EventStatePage,
    meta: { requiresAuth: true, isProveedor: true },
  },
  {
    path: "/agregar-productos/:idEvent",
    name: "AgregarProductosPage",
    component: AgregarProductosPage,
    meta: { requiresAuth: true, isProveedor: true },
  },
  {
    path: "/productos",
    name: "ProductPage",
    component: ProductosPage,
    meta: { requiresAuth: true, isProveedor: true },
  },
  {
    path: "/crear-producto",
    name: "CreateProductPage",
    component: CreateProductPage,
    meta: { requiresAuth: true, isProveedor: true },
  },
  {
    path: "/Eventos",
    name: "EventoCliente",
    component: AllEventosClientPage,
    meta: { requiresAuth: true, isCliente: true },
  },
  {
    path: "/Pedidos",
    name: "PedidosPage",
    component: PedidosPage,
    meta: { requiresAuth: true, isCliente: true },
  },
  {
    path: "/Evento/:idEvent",
    name: "EventoClientePage",
    component: EventClientPage,
    meta: { requiresAuth: true, isCliente: true },
  },
  {
    path: "/Realizar-Pedido/:idEvent",
    name: "RealizarPedidoPage",
    component: RealizarPedidoPage,
    meta: { requiresAuth: true, isCliente: true },
  },
  {
    path: "/detalle-pedido/:idPedido/:idEvent",
    name: "DetallePedidoPage",
    component: DetallePedidoPage,
    redirect: "/detalle-pedido/:idPedido/:idEvent/lista-items",
    meta: { requiresAuth: true, isCliente: true },
    children: [
      {
        path: "lista-items",
        components: {
          default: ListProductos,
          cabezera: HeaderBody,
          footer: FooterBody,
        },

        name: "ListOfItems",
      },
      {
        path: "modificar-lista-items",
        components: {
          default: ChangeListProductos,
          cabezera: HeaderBody,
          footer: FooterBody,
        },
        name: "UpdateListOfItems",
        props: { cabezera: { isVistaModificar: true } },
      },
      {
        path: "codigo-Qr",
        components: { default: QrImagen, cabezera: HeaderBody },
        name: "CodigoQR",
        props: { cabezera: { isVistaQr: true } },
      },
    ],
  },
  {
    path: "/entrar",
    name: "LoginUser",
    component: LoginUser,
  },
  {
    path: "/registro-cliente",
    name: "RegisterUser",
    component: RegisterUser,
  },
  {
    path: "/registro",
    name: "RegisterOption",
    component: RegisterOption,
  },
  {
    path: "/registro-empresa",
    name: "RegisterEmpresa",
    component: RegisterEmpresa,
  },
  { path: "*", component: Home },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.name === "ListOfItems" || to.name === "CodigoQR")
      return savedPosition;
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

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      const userData = JSON.parse(loggedIn).datos;
      if (!userData) {
        next("/");
        return;
      }
      const isProveedor =
        userData.tipoUsuarioId === 2 || userData.tipoUsuarioId === 3;
      if (to.matched.some((record) => record.meta.isProveedor) && isProveedor) {
        next();
        return;
      }
      const isCliente = userData.tipoUsuarioId === 1;
      if (to.matched.some((record) => record.meta.isCliente) && isCliente) {
        next();
        return;
      }
    } catch (e) {
      next("/");
    }
    next("/");
    return;
  }
  next();
});
