import axios from "axios";
import { servers } from "./ApiClient.js";

export default {
  showAdminCondominios() {
    return axios.get(
      `${servers.produccion}/Condominio/mostrarAdminCondominios`
    );
  },
};
