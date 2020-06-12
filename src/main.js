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
    const userString = localStorage.getItem("usuario"); // grab user data from local storage
    const empresaString = localStorage.getItem("empresa"); // grab user data from local storage
    if (userString) {
      // check to see if there is indeed a user
      const userData = JSON.parse(userString); // parse user data into JSON
      const empresaData = JSON.parse(empresaString); // parse user data into JSON
      this.$store.commit("SET_USER_DATA", userData);
      this.$store.commit("SET_EMPRESA_DATA", empresaData); // restore user data with Vuex
    }
    axios.interceptors.response.use(
      (response) => response, // simply return the response
      (error) => {
        console.log("hubo un error =================");

        if (error.response.status === 401 || error.response.status === 403) {
          // if we catch a 401 error
          this.$store.dispatch("logout"); // force a log out
        }
        return Promise.reject(error); // reject the Promise, with the error as the reason
      }
    );
  },
  render: (h) => h(App),
}).$mount("#app");
