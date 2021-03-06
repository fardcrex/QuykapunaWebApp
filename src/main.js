import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import getStore from "./store";
import axios from "axios";
import AuthService from "@/services/AuthService.js";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

Vue.config.productionTip = false;
const requireComponent = require.context(
  // La ruta relativa de la carpeta de componentes
  "./components",
  // Si mirar o no en las subcarpetas
  false,
  // La expresión regular utilizada para hacer coincidir los nombres de los componentes básicos de los ficheros
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
  // Obtener la configuración de los componentes
  const componentConfig = requireComponent(fileName);

  // Obtener el nombre PascalCase del componente
  const componentName = upperFirst(
    camelCase(
      // Quitar el `./`en el comienzo y la extensión del nombre del archivo
      fileName.replace(/^\.\/(.*)\.\w+$/, "$1")
    )
  );

  // Registrar el componente a nivel global
  Vue.component(
    componentName,
    // Busca las opciones de componentes en `.default`, que
    // existen si el componente fue exportado con `export default`,
    // de lo contrario volver a la raíz del módulo.
    componentConfig.default || componentConfig
  );
});
new Vue({
  router,
  store: getStore(AuthService),
  created() {
    const userString = localStorage.getItem("usuario");
    const empresaString = localStorage.getItem("empresa");
    const timeTokenString = localStorage.getItem("timeToken");
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit("SET_USER_DATA", userData);
    }
    if (empresaString) {
      const empresaData = JSON.parse(empresaString);
      this.$store.commit("SET_EMPRESA_DATA", empresaData);
    }
    if (timeTokenString) {
      const timeToken = new Date(timeTokenString);
      this.$store.commit("SET_TIME_TOKEN_DATA", timeToken);
    }
    axios.interceptors.request.use(async (request) => {
      const timeToken = this.$store.state.timeToken;
      const now = new Date();
      if (
        now - timeToken >= 60 * 59 * 1000 &&
        axios.defaults.headers.common["Authorization"]
      ) {
        const token = axios.defaults.headers.common["Authorization"];
        let res;
        console.log(token);
        try {
          res = await AuthService.postRefrescarToken({ token });
        } catch (error) {
          console.log(error);
        }
        const data = res.data;
        console.log(data);
        if (data.newtoken) {
          console.log("here new token");
          this.$store.commit("SET_TIME_TOKEN_DATA");
          axios.defaults.headers.common["Authorization"] = `${data.newtoken}`;
          const userData = JSON.parse(userString);
          userData.token = data.newtoken;
          userData.idtoken = data.id;
          localStorage.setItem("usuario", JSON.stringify(userData));
          await AuthService.postRegistrarToken(data.newtoken, data.id);
        }
      }

      return request;
    });
    axios.interceptors.response.use(
      (response) => {
        console.log(response);
        if (
          response.data.message === "Autenticación fallida!" &&
          response.data.success === false
        ) {
          this.$store.dispatch("logout");
          return Promise.reject(response.data.message);
        }

        return response;
      }, // simply return the response
      (error) => {
        if (
          (error.response?.status === 401 &&
            error.config &&
            !error.config.__isRetryRequest) ||
          error.response?.status === 403
        ) {
          // if we catch a 401 error
          this.$store.dispatch("logout"); // force a log out
        }
        return Promise.reject(error); // reject the Promise, with the error as the reason
      }
    );
  },
  render: (h) => h(App),
}).$mount("#app");
