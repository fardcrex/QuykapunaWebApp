<template>
  <div
    v-if="loading"
    class="preloader"
  ></div>
  <div
    v-else-if="!notFound"
    class="container"
  >
    <div class="eventoStyle">
      <p class="state_info">
        Estado del evento: <span v-bind:style="getColorStyle">{{stateEventName}}</span>
      </p>
      <div class="input_style">
        <select
          class="svg1"
          name="cars"
          id="cars"
          placeholder=""
          v-model="adminIdState"
        >
          <optgroup label="Estados">
            <option
              v-for="state in estados"
              v-bind:key="state.estadoEventoId"
              :value="state.estadoEventoId"
            >{{state.estadoEventoNombre}}</option>
          </optgroup>
        </select>
        <button
          :class="{btn__isBlocked:isBlocked}"
          class="primary btn"
          type="submit"
          name="button"
          v-on:click="changeState"
        >Cambiar estado</button>
      </div>
    </div>
    <div class="container_form">
      <div class="container_input">
        <div class="container_title_select">
          <input
            placeholder="Título"
            class="child input"
            v-model="title"
            type="text"
            value
          />
          <select
            class="child input"
            v-model="condominioId"
          >
            <optgroup label="Condominios">
              <option
                v-for="condominio in condominios"
                v-bind:key="condominio.condominioId"
                :value="condominio.condominioId"
              >{{condominio.condominioNombre}}</option>
            </optgroup>
          </select>
        </div>
        <textarea
          rows="6"
          placeholder="Descripción"
          class="child textarea"
          v-model="descripcion"
          value
        />
        </div>
      <button
        :class="{btn__isBlocked:isBlockedButtonNotify}"
        class="primary btn_two"
        type="submit"
        name="button"
        v-on:click="sendNotify"
      >Enviar Notificación</button>
      <p>{{message}}</p>
    </div>
    <h2 class="title2">Cantidad de Productos</h2>
    <div
      class="eventList"
      v-if="!isLoadingList"
    >
      <BaseRowProductCantidad
        v-for="(producto,index) in productos"
        v-bind:key="index"
        :producto="producto"
        :eventoId="evento.eventoId"
      ></BaseRowProductCantidad>
    </div>
    <div
      v-else
      class="preloader preloader__list"
    ></div>
  </div>
  <div
    v-else
    class="container__not_found"
  >
    <h2>Evento no encontrado</h2>
    <NotFoundSvg class="svg"></NotFoundSvg>
  </div>
</template>

<script>
import ProductService from "@/services/ProductService.js";
import EventService from "@/services/EventService.js";
import NotFoundSvg from "@/components-svg/NotFoundSvg.vue";
import CondominioService from "@/services/CondominioService.js";
import { mapState, mapMutations } from "vuex";
export default {
  components: { NotFoundSvg },
  computed: {
    ...mapState(["eventos"]),
    isBlocked() {
      if (this.adminIdState == 0) return true;
      return false;
    },
    isBlockedButtonNotify() {
      if (
        this.condominioId === -1 ||
        this.title === "" ||
        this.descripcion === ""
      )
        return true;
      return false;
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
        Propuesto: "#4BA2F2",
        Aceptado: "#FFA134",
        Publicado: "#6C4BF2",
        Definitivo: "#D146D3",
        "En salida": "#27DA0A",
        Iniciado: "#1FD4A9",
        Terminado: "#AA4619",
        Cancelado: "#F24B4B"
      };
      return { color: colores[this.stateEventName] };
    }
  },
  data() {
    return {
      title: "",
      descripcion: "",
      evento: {
        eventoNombre: "cargando",
        eventoDescripcion: "cargando",
        estadoEventoId: "cargando"
      },
      loading: true,
      productos: [],
      isLoadingList: true,
      notFound: false,
      adminIdState: 0,
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
          estadoEventoNombre: "Cancelado"
        }
      ],
      message: "",
      condominios: [],
      condominioId: -1
    };
  },
  async created() {
    if (this.eventos.length > 0) {
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
      const respuesta = await EventService.getEventsById(
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
    this.getCondominios();
    await this.getProductos();
    this.isLoadingList = false;
  },
  methods: {
    ...mapMutations(["ADD_TO_EVENTS_DATA"]),
    async getProductos() {
      try {
        const response = await ProductService.getProductosForEvent(
          this.$route.params.idEvent
        );
        this.productos = response.data.reverse();
        this.isLoading = false;
        // For now, logs out the response
      } catch (error) {
        console.log("There was an error:", error); // Logs out the error
      }
    },
    async changeState() {
      if (!this.adminIdState) return;
      try {
        const response = await EventService.updateStateEvent({
          eventoId: this.$route.params.idEvent,
          estado: this.adminIdState
        });
        console.log(response);
        this.evento.estadoEventoId = this.adminIdState;
        this.adminIdState = 0;
      } catch (error) {
        console.log(error);
      }
    },
    async getCondominios() {
      try {
        const response = await CondominioService.showCondominios();
        this.condominios = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async sendNotify() {
      if (
        this.condominioId === -1 ||
        this.title === "" ||
        this.descripcion === ""
      ) {
        return;
      }
      const respond = await CondominioService.getTokenByCondominioId(
        this.condominioId
      );
      for (const user of respond.data) {
        if (user.usuarioTokenCelular)
          CondominioService.sendNotify({
            title: this.title,
            body: this.descripcion,
            data: this.$route.params.idEvent,
            token: user.usuarioTokenCelular
          });
        console.log({
          title: this.title,
          body: this.descripcion,
          data: this.$route.params.idEvent,
          token: user.usuarioTokenCelular
        });
      }
      this.clearInput();
      this.message = "enviado";
    },
    clearInput() {
      this.title = "";
      this.descripcion = "";
      this.condominioId = -1;
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
  max-width: 1024px;
  margin: auto;
  grid-template-columns: 100%;
  grid-template-rows: auto auto auto auto 10vh;
  @media screen and (min-width: $notebook) {
    grid-template-rows: minmax(200px, auto) 10vh auto 10vh;
  }
  @media screen and (min-width: $notebook) {
    grid-template-columns: 1fr 1fr;
  }
}
.title2 {
  margin-top: 3vh;
  align-self: center;
  grid-row: 3/4;
  grid-column: 1/2;
  @media screen and (min-width: $notebook) {
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
  @media screen and (min-width: $tablet) {
    margin: 2rem auto 2rem;
    width: 65%;
  }
  @media screen and (min-width: $notebook) {
    margin: auto;
    margin-left: 5rem;
    width: 75%;
  }
  @media screen and (min-width: $laptop) {
    width: 80%;
  }
}
.state_info {
  font-size: 1.5rem;
  margin: 1rem auto 0.6rem;
}
.input_style {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  margin: 1em 0 1em 1em;
}

.btn__isBlocked {
  color: $color-desactive-btn;
}
.eventList {
  grid-column: 1/2;
  display: grid;
  padding: 1rem;
  row-gap: 1rem;
  column-gap: 1.5rem;
  width: 90%;
  justify-items: center;
  grid-template-columns: repeat(1, minmax(auto, 1fr));

  @media screen and (min-width: $tablet) {
    grid-template-columns: repeat(1, minmax(300px, 1fr));
    width: 80%;
  }
  @media screen and (min-width: $notebook) {
    grid-column: 1/3;
    width: 85%;
  }
  @media screen and (min-width: $laptop) {
    width: 90%;
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
  @media screen and (min-width: $notebook) {
    margin: 4em auto 4em;
    grid-column: 1/3;
  }
}
.button_container {
  display: flex;
  justify-content: center;
}
.input {
  margin: 0.6em 1em;
  width: 15em;
}
.btn_two {
  margin: 1em auto;
}
.textarea {
  width: 15em;
  height: 8em;
  margin: 0.6em 1em;
  border-radius: 20px;
}
.container_input {
  display: flex;
}
.container_title_select {
  width: min-content;
}
.container_form {
  margin: 1em auto;
}
</style>