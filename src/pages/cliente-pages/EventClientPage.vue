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
      <BaseCardEvent
        :event="evento"
        class="eventoStyle"
      />
    </div>
    <div class="btn_svg">
      <ShoppingCar class="svg1"></ShoppingCar>
      <button
        :class="{btn__isBlocked:isBlocked}"
        class="primary btn"
        type="submit"
        name="button"
        v-on:click="hacerPedido"
      >Realizar un Pedido</button>
    </div>
    <h2 class="title2">Productos disponibles</h2>
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
import ShoppingCar from "@/components-svg/ShoppingCar.vue";
import NotFoundSvg from "@/components-svg/NotFoundSvg.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "EventClientPage",
  components: { NotFoundSvg, ShoppingCar },
  computed: {
    ...mapState(["eventos"]),
    isBlocked() {
      if (this.productos.length === 0) return true;
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
    hacerPedido() {
      if (this.isBlocked) {
        return;
      }
      this.$router.push({
        name: "RealizarPedidoPage",
        params: { idEvent: this.evento.eventoId }
      });
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
  margin: 1em auto;
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
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(220px, auto) 10vh auto auto 10vh;
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
    width: 50%;
  }
  @media screen and (min-width: $notebook) {
    margin: 1.8rem auto 2rem;
    width: 65%;
  }
  @media screen and (min-width: $laptop) {
    width: 80%;
  }
}

.btn_svg {
  width: 70%;
  margin: 1em auto;
  @media screen and (min-width: $notebook) {
    margin: auto;
  }
}
.btn {
  margin: 1em auto 0;
}
.eventList {
  grid-column: 1/2;
  display: grid;
  padding: 1rem;
  row-gap: 1.2rem;
  column-gap: 1.5rem;
  width: 85%;
  grid-template-columns: repeat(1, auto);

  @media screen and (min-width: $tablet) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
  @media screen and (min-width: $notebook) {
    grid-column: 1/3;
    width: 95%;
    grid-template-columns: repeat(3, minmax(220px, 1fr));
  }
  @media screen and (min-width: $laptop) {
    row-gap: 1.5rem;
    width: 100%;
    grid-template-columns: repeat(4, minmax(230px, 1fr));
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
.svg1 {
  margin: 1em auto 0.5em;
  @media screen and (min-width: $tablet) {
    width: 75%;
  }
  @media screen and (min-width: $notebook) {
    margin: 2.5em 2.5em 1em 2.5em;
  }
}

.btn__isBlocked {
  color: $color-desactive-btn;
}
</style>