<template>
  <div class="container">
    <div class="child-1">
      <h2 class="title">Crear Producto</h2>
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
      <input
        placeholder="Imagen Url"
        class="child input"
        v-model="imagen"
        type="text"
        value
      />
      <input
        placeholder="Costo"
        class="child input input-costo"
        v-model="costo"
        type="number"
        value
      />
      <!-- <input type="date" name="fecha" v-model="fecha"> -->
      <button
          v-if="!isLoading"
        class="red child btn"
        type="submit"
        name="button"
        v-on:click="createEvent"
      >Crear Producto</button>
      <div
        v-else
        class="preloader"
      ></div>
    </div>

    <ShoppingCar class="svg"></ShoppingCar>
    <h2 class="title2">Lista de Productos</h2>
    <div class="eventList">
      <BaseCardProduct  v-for="producto in productos"  v-bind:key="producto.productoId"
      :producto="producto"
      ></BaseCardProduct>   
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
import ShoppingCar from "@/components-svg/ShoppingCar.vue";
import axios from "axios";

export default {
  components: { ShoppingCar },
  data() {
    return {
      isLoading: false,
      name: "",
      descripcion: "",
      costo: null,
      empresaId: null,
      imagen: null,
      productos: []
    };
  },
  async created() {
    try {
      await this.getEmpresaId();
      var response = await ProductService.getEvents(this.empresaId);

      console.log(response);

      this.productos = response.data.reverse();
      this.isLoading = false;
      // For now, logs out the response
    } catch (error) {
      console.log("There was an error:", error.response); // Logs out the error
    }
  },
  methods: {
    async createEvent() {
      this.isLoading = true;
      if (!this.empresaId) {
        await this.getEmpresaId();
      }
      try {
        let responEvent = await axios.post(
          `https://api-pollo.herokuapp.com/empresa/agregarProducto`,
          {
            idEmpresa: this.empresaId,
            costoP: this.costo,
            imagenP: this.imagen,
            nombreP: this.name,
            descripcionP: this.descripcion
          }
        );
        console.log(responEvent);

        if (responEvent.status == 201) {
          this.getEvents();
        }
      } finally {
        this.isLoading = false;
      }
    },
    async getEmpresaId() {
      const userString = localStorage.getItem("usuario");
      const userData = JSON.parse(userString);
      const usuarioId = userData.datos.usuarioId;
      const response = await axios.get(
        `https://api-pollo.herokuapp.com/empresa/mostrarEmpresa/${usuarioId}`
      );
      this.empresaId = response.data[0].empresaId;
      this.administradorId = response.data[0].administradorId;
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
  grid-template-rows: auto auto;
  @media screen and (min-width: $tablet) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 75vh 10vh auto;
  }
}
.title {
  margin-top: 5vh;
  @media screen and (min-width: $tablet) {
    margin-top: 15vh;
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
.child-1 {
  width: 80%;
  grid-row: 2/3;
  @media screen and (min-width: $tablet) {
    grid-row: 1/3;
    grid-column: 1/2;
    width: 75%;
  }
  @media screen and (min-width: $laptop) {
    grid-column: 1/2;
    width: 64%;
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
  margin: 1.5em 0 1.5em 0;
  height: 3em;
  width: 100%;
}
.btn {
  margin: 0 auto 0 auto;
  margin-top: 1.5em;
  width: 10em;
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