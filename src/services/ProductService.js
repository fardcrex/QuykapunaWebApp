import axios from "axios";
import { servers } from "./ApiClient.js";

export default {
  getProductos(empresaId) {
    return axios.get(
      `${servers.produccion}/empresa/mostrarProductoXEmpresa/${empresaId}`
    );
  },
  getProductosForEvent(eventId) {
    return axios.get(
      `${servers.produccion}/Producto/mostrarProductoporEvento/${eventId}`
    );
  },
  postCrearProducto(empresaId, costo, imagen, name, descripcion) {
    return axios.post(`${servers.produccion}/empresa/agregarProducto`, {
      idEmpresa: empresaId,
      costoP: costo,
      imagenP: imagen,
      nombreP: name,
      descripcionP: descripcion,
    });
  },
  agregarProductoEmpresa(eventoId, productoId) {
    return axios.post(`${servers.produccion}/empresa/Evento/agregarProducto`, {
      eventoId,
      productoId,
    });
  },
};
