<template>
  <div
    v-if="loading"
    class="preloader"
  ></div>
  <div
    v-else-if="!notFound"
    class="container"
  >
    <BaseCardEvent
      :event="evento"
      class="eventoStyle"
    ></BaseCardEvent>
    <div class="btn_svg">
      <NotFoundSvg class="svg1"></NotFoundSvg>
      <div class="button_container">
        <button
          :class="{btn__isBlocked:isBlocked}"
          class="red btn"
          type="submit"
          name="button"
          v-on:click="agregarProducto"
        >Agregar Producto</button>
        <button
          class="red btn"
          type="submit"
          name="button"
          v-on:click="watchState"
        >Ver Estado</button>
      </div>
    </div>
    <h2 class="title2">Lista de Productos del Evento</h2>
    <div
      class="eventList"
      v-if="!isLoadingList"
    >
      <BaseCardProduct
        v-for="(producto,index) in productos"
        v-bind:key="index"
        :producto="producto"
      ></BaseCardProduct>
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
import { mapState, mapMutations } from "vuex";
export default {
  components: { NotFoundSvg },
  computed: {
    ...mapState(["eventos"]),
    isBlocked() {
      if (this.evento.estadoEventoId > 3) return true;
      return false;
    }
  },
  data() {
    return {
      evento: {
        eventoNombre: "cargando",
        eventoDescripcion: "cargando",
        estadoEventoId: "cargando"
      },
      loading: true,
      productos: [],
      isLoadingList: true,
      notFound: false
    };
  },
  async created() {
    if (this.eventos[0]) {
      console.log("response 1s");
      let eventoFind;
      for (let event of this.eventos) {
        if (event.eventoId == this.$route.params.idEvent) {
          console.log("response 2s");
          eventoFind = event;
          break;
        }
      }
      if (!eventoFind) {
        console.log("response 3s", eventoFind);
        this.notFound = true;
      }
      this.evento = eventoFind;
    } else {
      const respuesta = await EventService.getEventsById(
        this.$route.params.idEvent
      );
      if (respuesta.data[0]) {
        console.log(respuesta.data[0]);
        this.evento = respuesta.data[0];
        this.ADD_TO_EVENTS_DATA(this.evento);
      } else {
        this.notFound = true;
        this.loading = false;
        return;
      }
    }

    this.loading = false;
    await this.getProductos();
    this.isLoadingList = false;
  },
  methods: {
    ...mapMutations(["ADD_TO_EVENTS_DATA"]),
    async getProductos() {
      try {
        console.log("response");
        var response = await ProductService.getProductosForEvent(
          this.$route.params.idEvent
        );
        console.log(response);

        this.productos = response.data.reverse();
        this.isLoading = false;
        // For now, logs out the response
      } catch (error) {
        console.log("There was an error:", error); // Logs out the error
      }
    },
    agregarProducto() {
      if (this.isBlocked) {
        return;
      }
      this.$router.push({
        name: "AgregarProductosPage",
        params: { idEvent: this.evento.eventoId }
      });
    },
    watchState() {
      this.$router.push({
        name: "EventStatePage",
        params: { idEvent: this.evento.eventoId }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$greyLight-2: #c8d0e7;
$cel: 540px;
$tablet: 814px;
$laptop: 1025px;
$desk: 1300px;
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
  @media screen and (min-width: $cel) {
    width: 70%;
  }
  @media screen and (min-width: $tablet) {
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
  @media screen and (min-width: $tablet) {
    grid-template-rows: minmax(350px, auto) 10vh auto auto 10vh;
  }
  @media screen and (min-width: $tablet) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(350px, auto) 10vh auto auto 10vh;
  }
}
.title2 {
  margin-top: 3vh;
  align-self: center;
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
  margin: 1em 1em 0;
}
.btn__isBlocked {
  color: $greyLight-2;
}
.eventList {
  grid-column: 1/2;
  display: grid;
  padding: 1rem;
  row-gap: 2rem;
  column-gap: 1.5rem;
  width: 90%;
  grid-template-columns: repeat(1, minmax(auto, 1fr));

  @media screen and (min-width: $cel) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
  @media screen and (min-width: $tablet) {
    grid-column: 1/3;
    width: 95%;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
  }
  @media screen and (min-width: $laptop) {
    width: 100%;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
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
.button_container {
  display: flex;
  justify-content: center;
}
</style>