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
    <div class="detallesPedidoData">
      <!--   Estado del pedido: <span v-bind:style="getColorStyle">{{stateEventName}}</span> -->
    </div>
    <div class="title2">
      <router-view name="cabezera"></router-view>
    </div>
    <template v-if="!isLoadingList">
      <router-view :productos="productos"></router-view>
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
import { mapState } from "vuex";
export default {
  components: { NotFoundSvg },
  computed: {
    ...mapState(["eventos"]),
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
    stateEventName() {
      const estadoEvento = this.estados[this.evento.estadoEventoId - 1];
      if (estadoEvento) {
        return estadoEvento.estadoEventoNombre;
      }
      // return "";
      return "Sin definir";
    },
    getColorStyle() {
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
      evento: {
        eventoNombre: "cargando",
        eventoDescripcion: "cargando",
        estadoEventoId: "cargando"
      },
      loading: false,
      productos: [],
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
    await this.getProductos();
    this.isLoadingList = false;
  },
  methods: {
    async getProductos() {
      try {
        const response = await PedidoService.getItemsByPedidoId(
          this.$route.params.idPedido
        );

        this.productos = response.data.reverse();
        this.isLoading = false;
        // For now, logs out the response
      } catch (error) {
        console.log("There was an error:", error); // Logs out the error
      }
    },
    getCodeSQR() {}
  }
};
</script>

<style lang="scss" scoped>
$greyLight-2: #c8d0e7;
$color-primary: #ff6531;
$color-bg: #f9f9f9;
$cel: 540px;
$tablet: 814px;
$laptop: 1025px;
$desk: 1300px;
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
  @media screen and (min-width: $cel) {
    width: 70%;
  }
  @media screen and (min-width: $tablet) {
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
  max-width: 900px;
  margin: auto;
  grid-template-columns: 100%;
  grid-template-rows: auto auto auto auto 10vh;
  @media screen and (min-width: $tablet) {
    grid-template-rows: minmax(200px, auto) 10vh auto 10vh;
  }
  @media screen and (min-width: $tablet) {
    grid-template-columns: 1fr 1fr;
  }
}
.title2 {
  margin-top: 3vh;
  align-self: center;
  grid-row: 2/3;
  grid-column: 1/2;
  @media screen and (min-width: $tablet) {
    grid-row: 2/3;
    grid-column: 1/3;
    width: 90%;
  }
  @media screen and (min-width: $laptop) {
  }
}
.eventoStyle {
  margin: 1rem auto 1rem;
  width: 80%;
  @media screen and (min-width: $cel) {
    margin: 2rem auto 1rem;
    width: 65%;
  }
  @media screen and (min-width: $tablet) {
    margin: auto;
    width: 65%;
  }
  @media screen and (min-width: $laptop) {
    margin: auto;
    width: 80%;
  }
}
.state_info {
  font-size: 1.5rem;
  margin: 1rem auto 0.6rem;
}
.btn_svg {
  width: 70%;
  margin: 1em auto;
  @media screen and (min-width: $tablet) {
    margin: auto;
  }
}
.btn {
  margin: 1em auto 0;
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
  @media screen and (min-width: $tablet) {
    margin: 4em auto 4em;
    grid-column: 1/3;
  }
}
.table__pie {
  margin: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media screen and (min-width: $tablet) {
    margin: 1rem 4.5rem 3rem auto;
  }
}
</style>