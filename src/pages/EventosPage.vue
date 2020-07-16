<template>
  <div class="container">
    <div class="title">
      <h2>Lista de Eventos</h2>
      <button
        class="primary  btn"
        type="submit"
        name="button"
        v-on:click="goCreateEventPage"
      >Crear Evento</button>
    </div>
    <div
      class="eventList"
      v-if="!isLoadingList"
    >
      <BaseCardEvent
        v-for="event in eventos"
        v-bind:key="event.eventoId"
        :event="event"
        :isPointer="true"
        route="EventOnePage"
      ></BaseCardEvent>
    </div>
    <div
      v-else
      class="preloader"
    ></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      isLoadingList: true
    };
  },
  created() {
    this.getEvents();
  },
  computed: {
    ...mapState(["eventos", "isEventosPageLoaded"])
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
    goCreateEventPage() {
      this.$router.push({ name: "CreateEventPage" });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.container {
  justify-items: center;
  display: grid;
  width: 100%;
  max-width: 1024px;
  margin: auto;
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
  @media screen and (min-width: $notebook) {
    grid-template-rows: 12vh auto;
  }
  @media screen and (min-width: $laptop) {
    grid-template-rows: 14vh auto;
  }
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-around;
  grid-row: 1/2;
  grid-column: 1/2;
  @media screen and (min-width: $notebook) {
    width: 90%;
  }
}
.eventList {
  grid-column: 1/2;
  display: grid;
  padding: 1rem;
  padding-top: 0;
  row-gap: 2rem;
  column-gap: 1.5rem;
  width: 90%;
  grid-template-columns: repeat(1, minmax(auto, 1fr));
  @media screen and (min-width: $tablet) {
    width: 95%;
    grid-template-columns: repeat(2, minmax(240px, 1fr));
  }
  @media screen and (min-width: $notebook) {
    width: 95%;
    grid-template-columns: repeat(2, minmax(270px, 1fr));
  }
  @media screen and (min-width: $laptop) {
    width: 100%;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
  }
}
.btn {
  display: block;
  margin: 2em 1em;
  height: 3em;
  width: 10em;
}
.preloader {
  margin: auto;
  margin-top: 20vh;
  width: 70px;
  height: 70px;
  grid-column: 1/2;
  @media screen and (min-width: $notebook) {
    grid-column: 1/3;
  }
}
</style>