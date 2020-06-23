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
  agregarEvento(
    empresaId,
    administradorId,
    estadoEven,
    nombre,
    descripcion,
    fecha
  ) {
    return axios.post(`${servers.produccion}/empresa/evento/agregarEvento`, {
      empresaId,
      administradorId,
      estadoEven,
      nombre,
      descripcion,
      fecha,
    });
  },
};
