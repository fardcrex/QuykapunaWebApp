import axios from "axios";
import { servers } from "./ApiClient.js";

export default {
  insertarCarrito(body) {
    return axios.post(`${servers.produccion}/Pedido/InsertarCarrito`, {
      idUsuario: body.idUsuario,
      fecha: body.fecha,
      descripcion: body.descripcion,
      idEvento: body.idEvento,
      idEstadoPedido: body.idEstadoPedido,
    });
  },
  insertarItem(body) {
    console.log(body);

    return axios.post(`${servers.produccion}/Pedido/InsertarItem`, {
      idProducto: body.idProducto,
      cantidad: body.cantidad,
      idpedido: body.idpedido,
    });
  },
};
