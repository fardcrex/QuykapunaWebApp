<template>
  <div class="container">
    <div class="child-1">
      <h2 class="title">Crear Evento</h2>
      <input
        placeholder="Nombre"
        class="child input"
        v-model="name"
        type="text"
        value
      />
      <textarea
        rows="6"
        placeholder="Descripción"
        class="child textarea"
        v-model="descripcion"
        value
      />
      <!-- <input type="date" name="fecha" v-model="fecha"> -->
      <button
          v-if="!isLoadingRequest"
        class="red child btn"
        type="submit"
        name="button"
        v-on:click="createEvent"
      >Crear Evento</button>
      <div
        v-else
        class="preloader_min"
      ></div>
    </div>
    <Personaje class="svg"></Personaje>
    <h2 class="title2">Lista de Eventos</h2>
    <div class="eventList" v-if="!isLoadingList">
      <BaseCardEvent  v-for="event in eventos"  v-bind:key="event.eventoId"
      :event="event"
      ></BaseCardEvent>   
    </div> 
     <div
        v-else
        class="preloader"
      ></div>
    <!--  <template v-if="!isLoading">
      <EventCard
        v-for="event in events"
        :key="event.eventoId"
        :event="event"
      />
    </template>
    <p v-else>Loading events</p> -->
  </div>
</template>

<script>
//import EventCard from "../components/EventCard";
import Personaje from "@/components-svg/Personaje.vue";
import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  components: { Personaje },
  data() {
    return {
      isLoadingRequest: false,
      isLoadingList: true,
      events: [],
      name: "",
      descripcion: "",
      fecha: ""
    };
  },
  async created() {
    this.getEvents();
  },
  computed: {
    //  ...mapState(["user"])
    ...mapState({
      usuarioId: state => state.user.usuarioId,
      administradorId: state => state.empresa.administradorId,
      empresaId: state => state.empresa.empresaId,
      eventos: state => state.eventos,
      isEventosPageLoaded: state => state.isEventosPageLoaded
    })
  },
  methods: {
    ...mapMutations(["getEventosAction"]),
    async getEvents() {
      try {
        if (!this.isEventosPageLoaded) {
          await this.$store.dispatch("getEventosAction");
        }
      } catch (error) {
        console.log("There was an error:", error.response); // Logs out the error
      } finally {
        this.isLoadingList = false;
      }
    },
    async createEvent() {
      this.isLoadingRequest = true;
      if (!this.empresaId) {
        return;
      }

      const dateJson = new Date().toJSON();
      try {
        let responEvent = await axios.post(
          `https://api-pollo.herokuapp.com/empresa/evento/agregarEvento`,
          {
            empresaId: this.empresaId,
            administradorId: this.administradorId,
            estadoEven: 1,
            nombre: this.name,
            descripcion: this.descripcion,
            fecha: dateJson
          }
        );
        console.log(responEvent);

        if (responEvent.status == 201) {
          this.$store.dispatch("getEventosAction");
        }
      } finally {
        this.isLoadingRequest = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$cel: 540px;
$tablet: 814px;
$laptop: 1025px;
$desk: 1300px;

.title {
  margin-top: 5vh;
  @media screen and (min-width: $tablet) {
    margin-top: 12vh;
  }
}
.container {
  justify-items: center;

  display: grid;
  width: 100%;
  max-width: 1024px;
  margin: auto;
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
  @media screen and (min-width: $tablet) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 70vh 10vh auto;
  }
}

.svg {
  grid-row: 1;
  margin: auto;
  width: 85%;
  @media screen and (min-width: $tablet) {
    grid-column: 2;
    width: 90%;
  }
  @media screen and (min-width: $laptop) {
    width: 100%;
  }
}
.child-1 {
  width: 80%;
  grid-row: 2/3;
  @media screen and (min-width: $tablet) {
    grid-row: 1/2;
    grid-column: 1/2;
    width: 90%;
  }
  @media screen and (min-width: $laptop) {
    grid-column: 1/2;
  }
}
.title2 {
  grid-row: 3/4;
  grid-column: 1/2;
  @media screen and (min-width: $tablet) {
    grid-row: 2/3;
    grid-column: 1/3;
    width: 90%;
  }
  @media screen and (min-width: $laptop) {
  }
}
.eventList {
  grid-column: 1/2;
  display: grid;
  padding: 1rem;
  row-gap: 2rem;
  column-gap: 1.5rem;
  width: 90%;
  grid-template-columns: repeat(1, minmax(300px, 1fr));

  @media screen and (min-width: $tablet) {
    grid-column: 1/3;
    width: 95%;
    grid-template-columns: repeat(2, minmax(300px, 1fr));
  }
  @media screen and (min-width: $laptop) {
    width: 100%;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
  }
}
.input {
  padding: 1.6em 2em;
}
.child {
  display: block;
  margin: 2em auto;
  height: 3em;
  width: 80%;
}
.btn {
  margin-top: 1.5em;
  width: 10em;
}
.textarea {
  height: 10em;
  border-radius: 20px;
}
.preloader {
  margin: auto;
  margin-bottom: 2em;
  width: 70px;
  height: 70px;
  border: 10px solid #eee;
  border-top: 10px solid #ff6531;
  border-radius: 50%;
  animation-name: girar;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  grid-column: 1/2;
  @media screen and (min-width: $tablet) {
    grid-column: 1/3;
  }
}
@keyframes girar {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.preloader_min {
  margin: auto;
  margin-top: 1em;
  width: 40px;
  height: 40px;
  border: 10px solid #eee;
  border-top: 8px solid #ff6531;
  border-radius: 50%;
  animation-name: girar;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes girar {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>