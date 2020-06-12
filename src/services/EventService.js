import axios from "axios";
import { servers } from "./ApiClient.js";

export default {
  getEvents() {
    return axios.get(`${servers.produccion}/Eventos/mostrarEventos`);
  },
};
