<template>

  <div class="container">
    <select
      class="child title"
      name="Pedidos"
      id="Pedidos"
      placeholder=""
      v-model="estadoPedidoId"
    >
      <option
        v-for="value in statesPedido"
        v-bind:key="value.estadoPedidoId"
        :value="value.estadoPedidoId"
      >{{value.estadoPedidoNombre}}</option>
    </select>

    <div
      class="eventList"
      v-if="!isLoadingList"
    >

      <BaseRowPedido
        class="rowCardProduct"
        v-for="(pedido,index) in pedidos"
        v-bind:key="index"
        :pedido="pedido"
        :numRow="index"
      ></BaseRowPedido>

    </div>

    <div
      v-else
      class="preloader preloader__list"
    ></div>

  </div>

</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "EventClientPage",
  computed: {
    ...mapState({
      usuarioId: state => state.user.usuarioId,
      pedidos: state => state.pedidos
    })
  },
  data() {
    return {
      estadoPedidoId: 1,
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
      isLoadingList: true,
      isLoadingRequest: false,

      requestCompleted: false
    };
  },

  async created() {
    await this.getPedidos();
    this.isLoadingList = false;
  },
  methods: {
    ...mapActions(["getPedidosAction"]),
    async getPedidos() {
      try {
        await this.getPedidosAction({
          usuarioId: this.usuarioId,
          idEstado: this.estadoPedidoId
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoadingList = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$greyLight-2: #c8d0e7;
$color-primary: #ff6531;
$color-bg: #f9f9f9;
$color-shadow: #e3e5e9;
$color-white: #fff;
$shadow: 0.3rem 0.3rem 0.6rem $color-shadow, -0.5rem -0.5rem 1rem $color-white;
$inner-shadow: inset 0.2rem 0.2rem 0.5rem $color-shadow,
  inset -0.2rem -0.2rem 0.5rem $color-white;
$cel: 540px;
$tablet: 814px;
$laptop: 1025px;
$desk: 1300px;

.container {
  justify-items: center;

  display: grid;
  width: 100%;
  max-width: 1024px;
  margin: auto;
  grid-template-columns: 100%;
  grid-template-rows: minmax(6rem, 10vh) auto;
}
.title {
  margin: auto;
  color: $color-primary;
  text-decoration: none;
}
.eventoStyle {
  margin: 2em 2em 0;

  width: 80%;
  @media screen and (min-width: $cel) {
    margin: 2em 5em 0;
    width: 65%;
  }
  @media screen and (min-width: $tablet) {
    margin: 2em 3em;
    width: 65%;
  }
  @media screen and (min-width: $laptop) {
    margin: 3em auto 2em;
    width: 80%;
  }
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
.btn__isBlocked {
  color: $greyLight-2;
}
.eventList {
  grid-column: 1/2;
  display: grid;

  row-gap: 15px;
  // width: max-content;
  justify-content: center;
  justify-items: center;
  grid-template-columns: 95%;
  @media screen and (min-width: $tablet) {
    width: 95%;
  }
  /* @media screen and (min-width: $cel) {
  }
  @media screen and (min-width: $laptop) {
    padding: 0 1rem;
  } */
}
.rowCardProduct {
  display: flex;
  align-items: flex-end;

  flex-direction: column;
  @media screen and (min-width: $tablet) {
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }
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
.svg {
  width: 60%;
  margin: 2.5em 2.5em 1em 2.5em;
}
</style>