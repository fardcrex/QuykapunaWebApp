<template>
  <div class="container">
    <div
      class="eventList"
      v-if="!isLoadingList"
    >
      <BaseCardEvent
        v-for="(event,index) in eventos"
        v-bind:key="index"
        :event="event"
        :isPointer="true"
        route="EventoClientePage"
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
      isLoadingList: false
    };
  },
  computed: {
    ...mapState({
      usuarioId: state => state.user.usuarioId,
      eventos: state => state.eventos,
      isEventosPageLoaded: state => state.isEventosPageLoaded
    })
  },
  async created() {
    if (!this.isEventosPageLoaded) this.isLoadingList = true;
    await this.getEventosByIdUserAction();
    this.isLoadingList = false;
  },
  methods: {
    ...mapActions(["getEventosByIdUserAction"])
  }
};
</script>

<style lang="scss" scoped>
$cel: 540px;
$tablet: 814px;
$laptop: 1025px;
$desk: 1300px;
.preloader {
  margin: auto;
  margin-bottom: 2em;
  width: 70px;
  height: 70px;

  grid-column: 1/2;
  @media screen and (min-width: $tablet) {
    grid-column: 1/3;
  }
}
.eventList {
  grid-column: 1/2;
  display: grid;
  padding: 1rem;
  row-gap: 1.5rem;
  column-gap: 1.5rem;
  width: 80%;
  grid-template-columns: repeat(1, minmax(auto, 1fr));

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

.container {
  justify-items: center;

  display: grid;
  width: 100%;
  max-width: 1024px;
  margin: auto;
  grid-template-columns: 100%;
}
.preloader {
  margin-top: 10em;
  width: 60px;
  height: 60px;
}
</style>