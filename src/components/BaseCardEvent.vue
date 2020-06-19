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
      <p>Estado: {{estados[event.estadoEventoId - 1].estadoEventoNombre}}</p>
    </div>
    <div class="neumorphic-card__fecha">{{fechaLocal}}</div>
  </div>

</template>

<script>
/* class EventModel {
  constructor(
    eventoId,
    eventoNombre,
    eventoDescripcion,
    eventoFecha,
    administradorId,
    estadoEventoId,
    empresaId,
    usuarioId,
    condominioId
  ) {
    this.eventoId = eventoId;
    this.eventoNombre = eventoNombre;
    this.eventoDescripcion = eventoDescripcion;
    this.eventoFecha = eventoFecha;
    this.administradorId = administradorId;
    this.estadoEventoId = estadoEventoId;
    this.empresaId = empresaId;
    this.usuarioId = usuarioId;
    this.condominioId = condominioId;
  }
} */

export default {
  props: {
    event: {
      type: Object
    },
    route: String,
    isPointer: Boolean
  },
  data() {
    return {
      estados: [
        {
          estadoEventoId: 1,
          estadoEventoNombre: "propuesto"
        },
        {
          estadoEventoId: 2,
          estadoEventoNombre: "aceptado"
        },
        {
          estadoEventoId: 3,
          estadoEventoNombre: "publicado"
        },
        {
          estadoEventoId: 4,
          estadoEventoNombre: "definitivo"
        },
        {
          estadoEventoId: 5,
          estadoEventoNombre: "en salida"
        },
        {
          estadoEventoId: 6,
          estadoEventoNombre: "iniciado"
        },
        {
          estadoEventoId: 7,
          estadoEventoNombre: "terminado"
        },
        {
          estadoEventoId: 8,
          estadoEventoNombre: "cancelado"
        }
      ]
    };
  },
  computed: {
    fechaLocal() {
      if (this.event.eventoFecha) {
        let date = new Date(this.event.eventoFecha);
        return date.toLocaleString();
      } else {
        return "0/0/0 00:00";
      }
    }
  },
  methods: {
    goTheEvent() {
      this.$router.push({
        name: this.route,
        params: { idEvent: this.event.eventoId }
      });
    }
  },
  name: "BaseCardEvent"
};
</script>

<style lang="scss" scoped>
:root {
  --value: 40%;
  --back-color: #dd2222;
}
.pointer {
  cursor: pointer;
}
.neumorphic-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f9f9f9;
  padding: 35px 40px 20px 40px;
  box-shadow: 4px 4px 5px rgba(55, 84, 170, 0.15),
    -5px -4px 10px rgba(255, 255, 255, 0.98),
    0px 0px 4px rgba(255, 255, 255, 0.2) !important;
  border-radius: 20px;
  width: auto;
}

.neumorphic-card__title {
  display: block;
  color: #ff6531;
  font-size: 22px;
  padding: 0 0 10px;
  text-align: start;
}

.neumorphic-card__text {
  display: block;
  padding: 0 0 10px;
  text-align: start;
  color: #8d96a8;
  min-height: 10vh;
}

p {
  font-size: 0.8em;
  text-align: end;
  margin: 0;
}
.neumorphic-card__fecha {
  display: block;
  padding: 0.5em 0 0 0;
  text-align: end;
  font-size: 0.85em;
}
</style>