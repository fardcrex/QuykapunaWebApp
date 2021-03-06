import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import EventService from "@/services/EventService.js";
import ProductService from "@/services/ProductService.js";
import PedidoService from "@/services/PedidoService.js";
/* eslint-disable */
Vue.use(Vuex);

export default function getStore(authService) {
  return new Vuex.Store({
    getters: {
      loggedIn(state) {
        return state.user.tipoUsuarioId !== -1;
      },
    },
    state: {
      user: { tipoUsuarioId: -1 },
      empresa: null,
      isEventosPageLoaded: false,
      eventos: [],
      isProductosPageLoaded: false,
      productos: [],
      isPedidosPageLoaded: false,
      pedidos: [],
      timeToken: new Date(localStorage.getItem("timeToken")),
    },
    mutations: {
      SET_USER_DATA(state, userData) {
        state.user = userData.datos;
        axios.defaults.headers.common["Authorization"] = `${userData.token}`;
      },
      SET_EMPRESA_DATA(state, empresaData) {
        state.empresa = empresaData;
      },
      SET_TIME_TOKEN_DATA(state, timeToken) {
        if (!timeToken) {
          timeToken = new Date();
          localStorage.setItem("timeToken", timeToken.toJSON());
        }
        state.timeToken = timeToken;
      },
      LOAD_EVENTS_DATA(state, eventsData) {
        state.isEventosPageLoaded = true;
        const dateNow = new Date();
        let eventFilter = eventsData.filter((event) => {
          const dateEvent = new Date(event.eventoFecha);
          return dateEvent > dateNow;
        });

        state.eventos = eventFilter;
      },
      ADD_TO_EVENTS_DATA(state, event) {
        state.eventos = [event, ...state.eventos];
      },
      LOAD_PRODUCTS_DATA(state, productosData) {
        state.isProductosPageLoaded = true;
        state.productos = productosData;
      },
      LOAD_PEDIDOS_DATA(state, pedidosData) {
        state.isPedidosPageLoaded = true;
        state.pedidos = pedidosData;
      },
      LOGOUT(state) {
        // state.user = null
        localStorage.clear();
        // axios.defaults.headers.common['Authorization'] = null
        location.reload();
      },
    },
    actions: {
      logout({ commit }) {
        commit("LOGOUT");
      },
      register({ commit }, credentials) {
        return authService.postRegister(credentials);
      },
      registerEmpresa({ commit }, credentials) {
        return authService.postRegisterEmpresa(credentials);
      },

      async login({ commit }, credentials) {
        const resUser = await authService.postLogin(credentials);
        if (resUser.data.datos) {
          commit("SET_USER_DATA", resUser.data);
          localStorage.setItem("usuario", JSON.stringify(resUser.data));
          commit("SET_TIME_TOKEN_DATA");
        } else {
          throw resUser.data.Status;
        }
        const user = resUser.data.datos;

        authService.postRegistrarToken(resUser.data.token, user.usuarioId);
        if (user.tipoUsuarioId === 2 || user.tipoUsuarioId === 3) {
          const resEmpresa = await EventService.getEmpresaData(user.usuarioId);
          if (resEmpresa.data) {
            const data = resEmpresa.data[0];
            console.log(data);
            localStorage.setItem("empresa", JSON.stringify(data));
            commit("SET_EMPRESA_DATA", data);
          }
        }
      },

      async getEventosAction({ commit, state }) {
        try {
          var response = await EventService.getEventsByEmpresaId(
            state.empresa.empresaId
          );
          const events = response.data.reverse();
          commit("LOAD_EVENTS_DATA", events);
        } catch (error) {
          console.log(error); // Logs out the error
          throw "error";
        }
      },
      async getEventosByIdUserAction({ commit, state }) {
        try {
          var response = await EventService.getEventosByUserId(
            state.user.usuarioId
          );
          const events = response.data.reverse();
          commit("LOAD_EVENTS_DATA", events);
        } catch (error) {
          console.log(error); // Logs out the error
          throw "error";
        }
      },
      async getProductosAction({ commit, state }, data) {
        try {
          //
          if (state.isProductosPageLoaded && !data.reload) {
            return;
          }
          var response = await ProductService.getProductos(
            state.empresa.empresaId
          );
          const productos = response.data.reverse();
          commit("LOAD_PRODUCTS_DATA", productos);
        } catch (error) {
          console.log(error); // Logs out the error
          throw "error";
        }
      },
      async getPedidosAction({ commit, state }, data) {
        try {
          if (state.isPedidosPageLoaded && !data.reload) {
            return;
          }
          const response = await PedidoService.mostrartPedido(data);
          const pedidos = response.data.reverse();
          commit("LOAD_PEDIDOS_DATA", pedidos);
        } catch (error) {
          console.log(error, "getPedidosAction");
          throw "getPedidosAction";
        }
      },
    },

    modules: {},
  });
}
