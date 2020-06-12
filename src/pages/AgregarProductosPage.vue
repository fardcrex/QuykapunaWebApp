<template>
  <div class="container">

    <h2 class="title2">Agrega los Productos</h2>
    <div class="eventList">

      <div
        v-for="producto in productos"
        v-bind:key="producto.productoId"
      >
        <BaseCardProduct :producto="producto"></BaseCardProduct><button
          class="red child btn"
          type="submit"
          name="button"
          v-on:click="agregarProducto(producto)"
        >Agregar Producto</button>
      </div>
    </div>
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
import ProductService from "@/services/ProductService.js";
//import EventCard from "../components/EventCard";

import axios from "axios";

export default {
  components: {},
  data() {
    return {
      isLoading: false,
      productos: []
    };
  },
  async created() {
    try {
      const empresaId = this.$store.state.empresa.empresaId;
      var response = await ProductService.getProductos(empresaId);

      console.log(response);

      this.productos = response.data.reverse();
      this.isLoading = false;
      // For now, logs out the response
    } catch (error) {
      console.log("There was an error:", error.response); // Logs out the error
    }
  },
  methods: {
    async agregarProducto(product) {
      console.log(product);
      try {
        let responEvent = await axios.post(
          `https://api-pollo.herokuapp.com/empresa/Evento/agregarProducto`,
          {
            eventoId: this.$route.params.idEvent,
            productoId: product.productoId
          }
        );

        let dataArray = this.productos.filter(producto => {
          console.log(producto);
          return producto !== product;
        });
        this.productos = dataArray;
        console.log(responEvent);
      } finally {
        this.isLoading = false;
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

.container {
  justify-items: center;

  display: grid;
  width: 100%;
  max-width: 1024px;
  margin: auto;
  grid-template-columns: 100%;
  grid-template-rows: 10vh auto;
  @media screen and (min-width: $tablet) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 10vh auto;
  }
}

.svg {
  grid-row: 1;
  margin: 5vh 1em 0 1em;
  width: 80%;
  @media screen and (min-width: $tablet) {
    grid-column: 2;
    margin: auto;
    width: 90%;
  }
  @media screen and (min-width: $laptop) {
    width: 100%;
  }
}

.title2 {
  grid-row: 1/2;
  grid-column: 1/2;
  @media screen and (min-width: $tablet) {
    grid-row: 1/2;
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
  row-gap: 3.5rem;
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
  margin: 1.5em 0 1.5em 0;
  height: 3em;
  width: 100%;
}
.btn {
  margin: 0 auto 0 auto;
  margin-top: 1.5em;
  width: 14em;
}
.textarea {
  height: 7em;
  border-radius: 20px;
}
.input-costo {
  width: 60%;
  margin: 0%;
}
.preloader {
  margin: auto;
  width: 70px;
  height: 70px;
  border: 10px solid #eee;
  border-top: 10px solid #ff6531;
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