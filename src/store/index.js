import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import EventService from "@/services/EventService.js";
/* eslint-disable */
Vue.use(Vuex);

export default function getStore(authService) {
  return new Vuex.Store({
    getters: {
      loggedIn(state) {
        return !!state.user;
      },
    },
    state: {
      user: null,
      eventos: [],
      productos: [],
      isEventosPageLoaded: false,
      isProductosPageLoaded: false,
      empresa: null,
    },
    mutations: {
      SET_USER_DATA(state, userData) {
        state.user = userData.datos;
        localStorage.setItem("usuario", JSON.stringify(userData));
        console.log(userData);

        axios.defaults.headers.common["Authorization"] = `${userData.token}`;
      },
      SET_EMPRESA_DATA(state, empresaData) {
        localStorage.setItem("empresa", JSON.stringify(empresaData));
        console.log(empresaData);
        state.empresa = empresaData;
      },
      LOAD_EVENTS_DATA(state, eventsData) {
        state.isEventosPageLoaded = true;
        state.eventos = eventsData;
      },
      LOGOUT(state) {
        // state.user = null
        localStorage.removeItem("usuario");
        // axios.defaults.headers.common['Authorization'] = null
        location.reload();
      },
    },
    actions: {
      logout({ commit }) {
        commit("LOGOUT");
      },
      async register({ commit }, credentials) {
        const { data } = await authService.postRegister(credentials);
      },
      async login({ commit }, credentials) {
        return authService
          .postLogin(credentials)
          .then(({ data }) => {
            console.log(data);
            if (data.datos) {
              commit("SET_USER_DATA", data);
              console.log("data.datos.usuarioId", data.datos.usuarioId);
              return axios.get(
                `https://api-pollo.herokuapp.com/empresa/mostrarEmpresa/${data.datos.usuarioId}`
              );
            } else {
              throw "datos inválidos";
            }
          })
          .then((response) => {
            console.log(response);

            commit("SET_EMPRESA_DATA", response.data[0]);
          });
      },
      async getEventosAction({ commit }) {
        try {
          var response = await EventService.getEvents();

          console.log(response);

          const events = response.data.reverse();
          commit("LOAD_EVENTS_DATA", events);
          // For now, logs out the response
        } catch (error) {
          throw "error"; // Logs out the error
        }
      },
    },

    modules: {},
  });
}
