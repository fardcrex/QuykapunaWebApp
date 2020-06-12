<template>
  <div class="container">
    <BaseCardEvent
      :event="evento"
      class="eventoStyle"
    ></BaseCardEvent>
    <button
      class="red btn"
      type="submit"
      name="button"
      v-on:click="agregarProducto"
    >Agregar Producto</button>
    <h2 class="title2">Lista de Productos del Evento</h2>
    <div class="eventList">
      <BaseCardProduct
        v-for="producto in productos"
        v-bind:key="producto.productoId"
        :producto="producto"
      ></BaseCardProduct>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/ProductService.js";
import { mapState } from "vuex";
export default {
  computed: {
    //  ...mapState(["user"])
    ...mapState(["eventos"])
  },
  data() {
    return {
      evento: null,
      productos: []
    };
  },
  async created() {
    let eventoFind;
    console.log(this.$route.params.idEvent);

    for (const event of this.eventos) {
      if (event.eventoId === this.$route.params.idEvent) {
        eventoFind = event;
        break;
      }
    }
    this.evento = eventoFind;
    await this.getProductos();
  },
  methods: {
    async getProductos() {
      try {
        var response = await ProductService.getProductosForEvent(
          this.evento.eventoId
        );

        console.log(response);

        this.productos = response.data.reverse();
        this.isLoading = false;
        // For now, logs out the response
      } catch (error) {
        console.log("There was an error:", error.response); // Logs out the error
      }
    },
    agregarProducto() {
      this.$router.push({
        name: "AgregarProductosPage",
        params: { idEvent: this.evento.eventoId }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$cel: 540px;
$tablet: 814px;
$laptop: 1025px;
$desk: 1300px;

.container {
  justify-items: center;

  display: grid;
  width: 100%;
  max-width: 1024px;
  margin: auto;
  grid-template-columns: 100%;
  grid-template-rows: 35vh 15vh auto;
  @media screen and (min-width: $tablet) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 40vh 10vh auto;
  }
}
.eventoStyle {
  margin: auto;
  width: 80%;
}
.btn {
  height: 7vh;
  margin: auto;
  @media screen and (min-width: $tablet) {
    height: 8vh;
    margin: auto;
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
</style>