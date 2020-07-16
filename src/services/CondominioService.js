import axios from "axios";
import { servers } from "./ApiClient.js";

export default {
  showAdminCondominios() {
    return axios.get(
      `${servers.produccion}/Condominio/mostrarAdminCondominios`
    );
  },
  showCondominios() {
    return axios.get(`${servers.produccion}/Condominio/mostrarCondominios`);
  },
  showEdificioByCondominioId(idCondominio) {
    return axios.get(
      `${servers.produccion}/Condominio/mostrarEdificioXCondominio/${idCondominio}`
    );
  },
  sendNotify(body) {
    return axios.post(`${servers.produccion}/enviarNotificacion`, body);
  },
  getTokenByCondominioId(idCondominio) {
    return axios.get(
      `${servers.produccion}/Usuario/tokenPorCondominio/${idCondominio}`
    );
  },
};
