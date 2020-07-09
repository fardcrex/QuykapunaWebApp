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
    return axios.post(`${servers.produccion}/Pedido/InsertarItem`, {
      idProducto: body.idProducto,
      cantidad: body.cantidad,
      idpedido: body.idpedido,
    });
  },
  mostrartPedido(data) {
    return axios.get(
      `${servers.produccion}/Pedido/mostrarPedido/${data.usuarioId}/${data.idEstado}`
    );
  },
  getEmpresaByEventoId(eventoId) {
    return axios.get(
      `${servers.produccion}/Pedido/obtenerEmpresaPorEvento/${eventoId}`
    );
  },
  getItemsByPedidoId(pedidoId) {
    return axios.get(`${servers.produccion}/Pedido/obtenerItems/${pedidoId}`);
  },
  updateItemsPedido(body) {
    return axios.put(
      `${servers.produccion}/Pedido/actualizarItemsPedido`,
      body
    );
  },
};
