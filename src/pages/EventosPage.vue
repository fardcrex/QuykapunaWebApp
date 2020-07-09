<template>
  <div class="container">
    <div class="child-1">
      <h2 class="title">Crear Evento</h2>
      <input
        placeholder="Nombre del evento"
        class="child input"
        v-model.trim="name"
        type="text"
        value
      />
      <div class="fecha_style">
        <input
          placeholder=""
          class="child input fecha"
          v-model="fecha"
          type="date"
          name="fecha"
          value
        /> <input
          placeholder="00:00"
          class="child input time"
          v-model="time"
          type="time"
          name="fecha"
          value
        />
      </div>

      <select
        class="child condominio_style"
        name="Condominios"
        id="Condominios"
        placeholder=""
        v-model="adminIdCondominio"
      >
        <optgroup label="Condominios">

          <option
            v-for="value in condominios"
            v-bind:key="value.condominioId"
            :value="value.administradorId"
          >{{value.condominioNombre}}</option>

        </optgroup>

      </select>

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
        class="primary child btn"
        type="submit"
        name="button"
        v-on:click="createEvent"
      >Crear Evento</button>
      <div
        v-else
        class="preloader__min preloader"
      ></div>
    </div>
    <Personaje class="svg"></Personaje>
    <h2 class="title2">Lista de Eventos</h2>
    <div class="eventList" v-if="!isLoadingList">
      <BaseCardEvent  v-for="event in eventos"  v-bind:key="event.eventoId"
      :event="event" :isPointer="true"  route="EventOnePage"
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
import CondominioService from "@/services/CondominioService.js";
import EventService from "@/services/EventService.js";
import { mapState, mapActions } from "vuex";

export default {
  components: { Personaje },
  data() {
    return {
      isLoadingRequest: false,
      isLoadingList: true,
      events: [],
      condominios: [
        {
          condominioId: "-1",
          administradorId: "-1",
          condominioNombre: "Condominios"
        }
      ],
      name: "",
      descripcion: "",
      fecha: "",
      adminIdCondominio: -1,
      time: ""
    };
  },
  created() {
    this.getCondominios();
    this.getEvents();
  },
  computed: {
    //  ...mapState(["user"])
    ...mapState({
      eventos: state => state.eventos,
      usuarioId: state => state.user.usuarioId,
      empresaId: state => state.empresa.empresaId,
      isEventosPageLoaded: state => state.isEventosPageLoaded
    })
  },
  methods: {
    ...mapActions(["getEventosAction"]),
    async getEvents() {
      try {
        if (!this.isEventosPageLoaded) {
          await this.getEventosAction();
        }
      } catch (error) {
        console.log("There was an error:", error.response); // Logs out the error
      } finally {
        this.isLoadingList = false;
      }
    },
    async createEvent() {
      this.isLoadingRequest = true;
      try {
        if (
          !this.empresaId ||
          !this.name ||
          this.name.length < 5 ||
          this.adminIdCondominio === -1
        ) {
          this.isLoadingRequest = false;
          return;
        }
        //const dateJson = `${this.fecha}T${this.time}`;
        const dateLocal = new Date(`${this.fecha}T${this.time}`).toUTCString();
        const dateUtc = new Date(dateLocal).toJSON();

        let responEvent = await EventService.agregarEvento({
          empresaId: this.empresaId,
          administradorId: this.adminIdCondominio,
          estadoEven: 1,
          nombre: this.name,
          descripcion: this.descripcion,
          fecha: dateUtc
        });
        console.log(responEvent);

        if (responEvent.status == 201) {
          await this.$store.dispatch("getEventosAction");
          this.isLoadingRequest = false;
        }
      } finally {
        this.clearForm();
        this.isLoadingRequest = false;
      }
    },
    async getCondominios() {
      try {
        const response = await CondominioService.showAdminCondominios();
        this.condominios = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    clearForm() {
      this.name = "";
      this.descripcion = "";
      this.fecha = "";
      this.adminIdCondominio = -1;
      this.time = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.title {
  margin-top: 5vh;
  @media screen and (min-width: $notebook) {
    margin-top: 7vh;
  }
  @media screen and (min-width: $laptop) {
    margin-top: 9vh;
    margin-bottom: 0;
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
  @media screen and (min-width: $notebook) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(500px, auto) 8vh auto 10vh;
  }
  @media screen and (min-width: $laptop) {
    grid-template-rows: minmax(550px, auto) 10vh auto 10vh;
  }
}

.svg {
  grid-row: 1;
  margin: auto;
  width: 85%;
  @media screen and (min-width: $notebook) {
    grid-column: 2;
    width: 90%;
  }
  @media screen and (min-width: $laptop) {
    width: 100%;
  }
}
.child-1 {
  display: flex;
  flex-direction: column;
  width: 80%;
  grid-row: 2/3;
  @media screen and (min-width: $notebook) {
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
  @media screen and (min-width: $notebook) {
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
  grid-template-columns: repeat(1, minmax(auto, 1fr));
  @media screen and (min-width: $tablet) {
    grid-column: 1/3;
    width: 95%;
    grid-template-columns: repeat(2, minmax(240px, 1fr));
  }
  @media screen and (min-width: $notebook) {
    grid-column: 1/3;
    width: 95%;
    grid-template-columns: repeat(2, minmax(270px, 1fr));
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
  height: 8em;
  border-radius: 20px;
  margin: 0 auto;
}
.fecha_style {
  margin: 0;
  margin: auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: $tablet) {
    flex-direction: row;
  }
}
input,
.fecha {
  margin-top: 0;
  width: 100%;
  margin-bottom: 0;
  @media screen and (min-width: $tablet) {
    width: 55%;
    margin-top: 0rem;
  }
}
input,
.time {
  margin-top: 2rem;
  width: 80%;
  margin-bottom: 0;
  @media screen and (min-width: $tablet) {
    width: 40%;
    margin-top: 0rem;
  }
}
.condominio_style {
  padding: -1em 0;
  height: 3.5em;
  color: rgba(85, 85, 85, 0.863);
}

.preloader {
  margin: auto;
  margin-bottom: 2em;
  width: 70px;
  height: 70px;

  grid-column: 1/2;
  @media screen and (min-width: $notebook) {
    grid-column: 1/3;
  }
}

.preloader__min {
  margin: auto;
  margin-top: 1em;
  width: 40px;
  height: 40px;
}
</style>