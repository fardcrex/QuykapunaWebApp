<template>

  <div
    :class="{pointer :isPointer}"
    class="neumorphic-card"
    v-on:click="goTheEvent"
  >

    <div>
      <div class="neumorphic-card__title">{{event.eventoNombre}}</div>
      <div class="neumorphic-card__text">{{event.eventoDescripcion}}</div>
    </div>
    <div class="neumorphic-card__estado">
      <p>Estado: <span v-bind:style="getColorStyle">{{stateEventName}}</span></p>
    </div>
    <div class="neumorphic-card__fecha">{{fechaLocal}}</div>
  </div>

</template>

<script>
import { getFormatTime, getFormatFecha } from "@/recursos/timeHelper.js";
export default {
  props: {
    event: {
      type: Object,
    },
    route: String,
    isPointer: Boolean,
  },
  data() {
    return {
      asd: {
        idPedido: 33,
        productos: [
          {
            productoNombre: "panettone ",

            productoCosto: 40,

            cantidad: 1,
          },
        ],
      },
      estados: [
        {
          estadoEventoId: 1,
          estadoEventoNombre: "Propuesto",
        },
        {
          estadoEventoId: 2,
          estadoEventoNombre: "Aceptado",
        },
        {
          estadoEventoId: 3,
          estadoEventoNombre: "Publicado",
        },
        {
          estadoEventoId: 4,
          estadoEventoNombre: "Definitivo",
        },
        {
          estadoEventoId: 5,
          estadoEventoNombre: "En salida",
        },
        {
          estadoEventoId: 6,
          estadoEventoNombre: "Iniciado",
        },
        {
          estadoEventoId: 7,
          estadoEventoNombre: "Terminado",
        },
        {
          estadoEventoId: 8,
          estadoEventoNombre: "Cancelado",
        },
      ],
    };
  },
  computed: {
    getColorStyle() {
      let colores = {
        Propuesto: "#4BA2F2",
        Aceptado: "#FFA134",
        Publicado: "#6C4BF2",
        Definitivo: "#D146D3",
        "En salida": "#27DA0A",
        Iniciado: "#1FD4A9",
        Terminado: "#AA4619",
        Cancelado: "#F24B4B",
      };
      return { color: colores[this.stateEventName] };
    },

    fechaLocal() {
      return (
        getFormatFecha(this.event.eventoFecha) +
        getFormatTime(this.event.eventoFecha)
      );
    },

    stateEventName() {
      const estadoEvento = this.estados[this.event.estadoEventoId - 1];
      if (estadoEvento) {
        return estadoEvento.estadoEventoNombre;
      }
      // return "";
      return "Sin definir";
    },
  },
  methods: {
    goTheEvent() {
      if (this.isPointer)
        this.$router.push({
          name: this.route,
          params: { idEvent: this.event.eventoId },
        });
    },
  },
  name: "BaseCardEvent",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.pointer {
  cursor: pointer;
}
.neumorphic-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $color-card;
  padding: 35px 40px 20px 40px;
  box-shadow: $shadow-neumorphic;
  border-radius: 20px;
  width: auto;
}

.neumorphic-card__title {
  display: block;
  color: $color-primary;
  font-size: $font-title-card;
  padding: 0 0 10px;
  text-align: start;
}

.neumorphic-card__text {
  display: block;
  padding: 0 0 10px;
  text-align: start;
  color: $color-font-text;
  font-size: $font-text;
  min-height: 10vh;
}

.neumorphic-card__fecha {
  display: block;
  padding: 0.5em 0 0 0;
  text-align: end;
  font-size: $font-fecha;
  color: $color-font-fecha;
}
p {
  font-size: $font-text;
  text-align: end;
  margin: 0;
  color: $color-font-text;
}
</style>