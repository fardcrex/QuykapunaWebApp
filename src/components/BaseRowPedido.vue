<template>

  <div
    class="neumorphic-card pointer"
    v-on:click="goToThePedido"
  >
    <div class="number_style">{{numRow}}</div>
    <div class="neumorphic-card__title">
      <p>{{pedido.eventoNombre}}</p>
    </div>
    <div class="neumorphic-card__text">{{getDescripcionText}}</div>

    <div class="neumorphic-card__fecha"><span>{{fechaLocal}}</span><span>{{getHora}}</span></div>

  </div>

</template>

<script>
import { getFormatTime, getFormatFecha } from "@/helpers/timeHelper.js";
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
      return getFormatFecha(this.pedido.pedidoFecha);
    },
    getHora() {
      return getFormatTime(this.pedido.pedidoFecha);
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
@import "@/assets/styles/global.scss";

.pointer {
  cursor: pointer;
}
.neumorphic-card {
  display: grid;
  flex-direction: row;
  align-items: center;
  background-color: $color-card;
  padding: 10px 15px 10px 15px;
  box-shadow: $shadow-neumorphic;
  border-radius: 20px;
  grid-template-columns: auto minmax(auto, 150px) auto;
  justify-content: space-around;
  width: 100%;
  @media screen and (min-width: $tablet) {
    grid-template-columns:
      minmax(auto, 50px)
      1fr 1.5fr minmax(auto, 150px);
  }
  @media screen and (min-width: $notebook) {
    width: 100%;
    grid-template-columns:
      minmax(auto, 50px)
      1fr 1.5fr minmax(auto, 200px);
  }
}
.number_style {
  color: $color-secondary;
}
.neumorphic-card__title {
  display: block;
  color: $color-font-row-title;
  padding: 0 0 0 1rem;
  text-align: start;
  p {
    font-size: $font-title-row;
  }
}
.neumorphic-card__text {
  display: none;
  padding: 0 1em;
  font-size: $font-text;
  text-align: start;
  color: $color-font-text;
  @media screen and (min-width: $tablet) {
    display: block;
  }
}
.neumorphic-card__fecha {
  display: grid;
  font-size: $font-fecha * 0.85;
  text-align: start;
  color: $color-font-fecha;
  @media screen and (min-width: $tablet) {
    display: block;
    font-size: $font-fecha;
  }
}
</style>