<template>

  <div
    class="neumorphic-card pointer"
    v-on:click="goToThePedido"
  >
    <div>{{numRow}}</div>
    <div class="neumorphic-card__title">
      <p>{{pedido.eventoNombre}}</p>
    </div>
    <div class="neumorphic-card__text">{{getDescripcionText}}</div>

    <div class="neumorphic-card__fecha"><span>{{fechaLocal}}</span><span>{{getHora}}</span></div>

  </div>

</template>

<script>
/* import EventService from "@/services/EventService.js"; */
export default {
  props: {
    pedido: {
      type: Object
    },
    numRow: {
      type: Number
    }
  },
  data() {
    return {
      nameEvent: "..."
    };
  },
  computed: {
    fechaLocal() {
      if (this.pedido.pedidoFecha) {
        let date = new Date(this.pedido.pedidoFecha);
        return `${date.getDate()}/${date.getMonth() +
          1}/${date.getFullYear()}, `;
      } else {
        return "0/0/0";
      }
    },
    getHora() {
      if (this.pedido.pedidoFecha) {
        let date = new Date(this.pedido.pedidoFecha);
        return `${date.toLocaleTimeString()}`;
      } else {
        return "00:00";
      }
    },
    getDescripcionText() {
      if (this.pedido.pedidoDescripcion) {
        return "Descripción: " + this.pedido.pedidoDescripcion + ".";
      }
      return "Sin descripción.";
    }
  },
  created() {
    /*  EventService.getEventsById({
      eventoId: this.pedido.eventoId
    }).then(respond => {
      if (respond.data[0].cantidad) this.cantidad = respond.data[0].cantidad;
      else this.cantidad = 0;
    }); */
  },
  methods: {
    goToThePedido() {
      this.$router.push({
        name: "DetallePedidoPage",
        params: {
          idPedido: this.pedido.pedidoId,
          idEvent: this.pedido.eventoId
        }
      });
    }
  },
  name: "BaseRowPedido"
};
</script>

<style lang="scss" scoped>
:root {
  --value: 40%;
  --back-color: #dd2222;
}
$cel: 540px;
$tablet: 814px;
$laptop: 1025px;
.pointer {
  cursor: pointer;
}
.neumorphic-card {
  display: grid;
  flex-direction: row;
  align-items: center;
  background-color: #f9f9f9;
  padding: 10px 15px 10px 15px;
  box-shadow: 4px 4px 5px rgba(55, 84, 170, 0.15),
    -5px -4px 10px rgba(255, 255, 255, 0.98),
    0px 0px 4px rgba(255, 255, 255, 0.2) !important;
  border-radius: 20px;
  grid-template-columns: auto minmax(auto, 150px) auto;
  justify-content: space-around;
  width: 90%;
  @media screen and (min-width: $cel) {
    grid-template-columns:
      minmax(auto, 50px)
      1fr 1.5fr minmax(auto, 150px);
  }
  @media screen and (min-width: $tablet) {
    width: 100%;
    grid-template-columns:
      minmax(auto, 50px)
      1fr 1.5fr minmax(auto, 200px);
  }
}

.neumorphic-card__title {
  display: block;
  color: #555f76;
  font-size: 22px;
  padding: 0 0 0 1rem;
  text-align: start;
}
.neumorphic-card__text {
  display: none;
  padding: 0 1em;
  font-size: 15px;
  text-align: start;
  color: #8d96a8;
  @media screen and (min-width: $cel) {
    display: block;
  }
}
.neumorphic-card__fecha {
  display: grid;
  font-size: 12px;
  text-align: start;
  color: #8d96a8;
  @media screen and (min-width: $cel) {
    display: block;
    font-size: 15px;
  }
}
</style>