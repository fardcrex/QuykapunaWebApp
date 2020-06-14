import axios from "axios";
import { servers } from "./ApiClient.js";

export default {
  getEvents() {
    return axios.get(`${servers.produccion}/Eventos/mostrarEventos`);
  },
  getEventsById(eventoId) {
    return axios.get(
      `${servers.produccion}/Eventos/mostrarEventos/${eventoId}`
    );
  },
  getEmpresaData(idUser) {
    return axios.get(`${servers.produccion}/empresa/mostrarEmpresa/${idUser}`);
  },
};
