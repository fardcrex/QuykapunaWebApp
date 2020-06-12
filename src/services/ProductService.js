import axios from "axios";
import { servers } from "./ApiClient.js";

export default {
  getProductos(id) {
    return axios.get(
      `${servers.produccion}/empresa/mostrarProductoXEmpresa/${id}`
    );
  },
  getProductosForEvent(eventId) {
    return axios.get(
      `${servers.produccion}/Producto/mostrarProductoporEvento/${eventId}`
    );
  },
};
