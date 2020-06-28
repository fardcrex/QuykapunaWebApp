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
  getEventosByUserId(idUser) {
    return axios.get(
      `${servers.produccion}/Eventos/mostrarEventosPorUsuario/${idUser}`
    );
  },
  agregarEvento(body) {
    console.log(body);

    return axios.post(
      `${servers.produccion}/empresa/evento/agregarEvento`,
      body
    );
  },
  showCantidadProductos(data) {
    return axios.get(
      `${servers.produccion}/Evento/mostrarCantidadProductos/${data.eventoId}/${data.productoId}`
    );
  },
  updateStateEvent(data) {
    return axios.put(
      `${servers.produccion}/Eventos/actualizarEstadoEvento`,
      data
    );
  },
};
