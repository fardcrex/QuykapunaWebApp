<template>
  <div
    v-if="loading"
    class="preloader"
  ></div>
  <div
    v-else-if="notFound"
    class="container__not_found"
  >
    <h2>Evento no encontrado</h2>
    <NotFoundSvg class="svg"></NotFoundSvg>
  </div>
  <div
    v-else
    class="container"
  >
    <div class="eventoStyle">
      <BaseCardEvent :event="evento"></BaseCardEvent>

      <!--   Estado del pedido: <span v-bind:style="getColorStyle">{{stateEventName}}</span> -->
    </div>
    <div class="detallesEmpresa">
      <p>Ruc empresa: <span class="style_empresa"> {{evento.empresaRuc}}</span></p>
      <p>Razón Social: <span class="style_empresa"> {{evento.empresaRazonSocial}}</span></p>
    </div>
    <div class="title2">
      <router-view
        name="cabezera"
        @cancelar="cancelar"
        @terminar="terminar"
      ></router-view>
    </div>
    <template v-if="!isLoadingList">
      <router-view
        :productos="productos"
        class="body_container"
      ></router-view>
      <router-view
        :precioTotal="precioTotal"
        name="footer"
        class="table__pie"
      ></router-view>
    </template>
    <div
      v-else
      class="preloader preloader__list"
    ></div>
  </div>
</template>

<script>
import PedidoService from "@/services/PedidoService.js";
import NotFoundSvg from "@/components-svg/NotFoundSvg.vue";
export default {
  components: { NotFoundSvg },
  computed: {
    isBlocked() {
      if (this.adminIdState == 0) return true;
      return false;
    },
    precioTotal() {
      let precioSum = 0;
      this.productos.forEach(producto => {
        precioSum = precioSum + producto.cantidad * producto.productoCosto;
      });
      return Math.round(precioSum * 100) / 100;
    },
    getColorPedidoStyle() {
      let colores = {
        "Por Recoger": "#4BA2F2",
        Entregado: "#FFA134",
        "Falta Pagar": "#6C4BF2",
        Pagado: "#D146D3"
      };
      return { color: colores[this.stateEventName] };
    }
  },
  data() {
    return {
      evento: {},
      loading: true,
      productos: [],
      productsOriginal: [],
      isLoadingList: true,
      notFound: false,
      adminIdState: 0,
      qrCodeImg: "",
      statesPedido: [
        {
          estadoPedidoId: 1,
          estadoPedidoNombre: "Por Recoger",
          estadoPedidoDescripcion: "El pedido esta por recoger"
        },
        {
          estadoPedidoId: 2,
          estadoPedidoNombre: "Entregado",
          estadoPedidoDescripcion: "El pedido ha sido entregado al cliente"
        },
        {
          estadoPedidoId: 3,
          estadoPedidoNombre: "Falta Pagar",
          estadoPedidoDescripcion: "Falta pagar"
        },
        {
          estadoPedidoId: 4,
          estadoPedidoNombre: "Pagado",
          estadoPedidoDescripcion: "Pagado"
        }
      ],
      estados: [
        {
          estadoEventoId: 1,
          estadoEventoNombre: "Propuesto"
        },
        {
          estadoEventoId: 2,
          estadoEventoNombre: "Aceptado"
        },
        {
          estadoEventoId: 3,
          estadoEventoNombre: "Publicado"
        },
        {
          estadoEventoId: 4,
          estadoEventoNombre: "Definitivo"
        },
        {
          estadoEventoId: 5,
          estadoEventoNombre: "En salida"
        },
        {
          estadoEventoId: 6,
          estadoEventoNombre: "Iniciado"
        },
        {
          estadoEventoId: 7,
          estadoEventoNombre: "Terminado"
        },
        {
          estadoEventoId: 8,
          estadoEventoNombre: "Cantabletado"
        }
      ]
    };
  },
  async created() {
    /* if (this.eventos.length > 0) {
      let eventoFind;
      for (let event of this.eventos) {
        if (event.eventoId == this.$route.params.idEvent) {
          eventoFind = event;
          break;
        }
      }
      if (!eventoFind) {
        this.notFound = true;
      }
      this.evento = eventoFind;
    } else {
      const respuesta = await PedidoService.getEmpresaByEventoId(
        this.$route.params.idEvent
      );
      if (respuesta.data[0]) {
        this.evento = respuesta.data[0];
        this.ADD_TO_EVENTS_DATA(this.evento);
      } else {
        this.notFound = true;
        this.loading = false;
        return;
      }
    }

    this.loading = false;
    */
    try {
      this.getProductos().then(() => {
        this.isLoadingList = false;
      });
      const respuesta = await PedidoService.getEmpresaByEventoId(
        this.$route.params.idEvent
      );
      if (respuesta.data[0]) {
        this.evento = respuesta.data[0];
        this.loading = false;
      } else {
        this.notFound = true;
        this.loading = false;
        return;
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async getProductos() {
      try {
        const response = await PedidoService.getItemsByPedidoId(
          this.$route.params.idPedido
        );

        this.productsOriginal = response.data.reverse();
        this.productos = this.productsOriginal.map(val => {
          return { ...val, isChange: false };
        });
        this.isLoading = false;
        // For now, logs out the response
      } catch (error) {
        console.log("There was an error:", error); // Logs out the error
      }
    },
    cancelar() {
      this.productos = this.productsOriginal.map(val => {
        return { ...val };
      });
    },
    async terminar() {
      this.isLoadingList = true;
      for (const val of this.productos) {
        if (val.isChange) {
          await PedidoService.updateItemsPedido({
            itemId: val.itemId,
            cantidad: val.cantidad
          });
        }
      }

      this.productsOriginal = this.productos.map(val => {
        return { ...val, isChange: false };
      });
      this.isLoadingList = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

.container__not_found {
  display: grid;
  width: 100%;
  max-width: 1024px;
  margin: 3em auto;
  justify-items: center;
  align-items: center;
  grid-template-rows: 20vh auto;
}
.svg {
  width: 80%;
  @media screen and (min-width: $tablet) {
    width: 70%;
  }
  @media screen and (min-width: $notebook) {
    width: 65%;
  }
  @media screen and (min-width: $laptop) {
    width: 60%;
  }
}

.container {
  justify-items: center;

  display: grid;
  width: 100%;
  max-width: 1100px;
  margin: auto;
  grid-template-columns: 100%;
  grid-template-rows: auto auto auto auto 10vh;
  @media screen and (min-width: $notebook) {
    grid-template-rows: minmax(200px, auto) 10vh auto 15vh;
  }
  @media screen and (min-width: $notebook) {
    grid-template-columns: 1fr 1fr;
  }
}

.detallesEmpresa {
  grid-row: 2/3;
  @media screen and (min-width: $notebook) {
    align-self: center;
    grid-row: 1/2;
    grid-column: 2/3;
    width: 90%;
  }
}
.title2 {
  align-self: center;
  grid-row: 3/4;
  grid-column: 1/2;
  @media screen and (min-width: $notebook) {
    grid-row: 2/3;
    grid-column: 1/3;
    width: 85%;
  }
  @media screen and (min-width: $laptop) {
  }
}
.eventoStyle {
  margin: 1rem auto 1rem;
  width: 80%;
  @media screen and (min-width: $tablet) {
    margin: 2rem auto 2rem;
    width: 50%;
  }
  @media screen and (min-width: $notebook) {
    width: 65%;
  }
  @media screen and (min-width: $laptop) {
    width: 80%;
  }
}
.table__pie {
  margin: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media screen and (min-width: $notebook) {
    grid-column: 1/3;
    margin: 0 4.5rem 0 auto;
  }
}
.body_container {
  grid-column: 1/2;
  @media screen and (min-width: $notebook) {
    width: 100%;
    grid-column: 1/3;
  }
}
.btn_svg {
  width: 70%;
  margin: 1em auto;
  @media screen and (min-width: $notebook) {
    margin: auto;
  }
}
.btn {
  margin: 1em auto 0;
}
.style_empresa {
  font-weight: 600;
}
.preloader {
  margin: 10em auto;
  width: 70px;
  height: 70px;
}
.preloader__list {
  margin: 1.5em auto 0;
  width: 70px;
  height: 70px;
  grid-column: 1/2;
  @media screen and (min-width: $notebook) {
    margin: 4em auto 4em;
    grid-column: 1/3;
  }
}
</style>