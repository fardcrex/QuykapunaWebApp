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
        v-model.number="costo"
        type="number"
        value
      />
      <!-- <input type="date" name="fecha" v-model="fecha"> -->
      <button
          v-if="!isLoadingRequest"
        class="red child btn"
        type="submit"
        name="button"
        v-on:click="createProducto"
      >Crear Producto</button>
      <div
        v-else
        class="preloader__min preloader"
      ></div>
    </div>

    <ShoppingCar class="svg"></ShoppingCar>
    <h2 class="title2">Lista de Productos</h2>
    <div class="eventList"  v-if="!isLoadingList">
      <BaseCardProduct  v-for="producto in productos"  v-bind:key="producto.productoId"
      :producto="producto"
      ></BaseCardProduct>   
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
import ProductService from "@/services/ProductService.js";
//import EventCard from "../components/EventCard";
import ShoppingCar from "@/components-svg/ShoppingCar.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: { ShoppingCar },
  data() {
    return {
      isLoadingRequest: false,
      isLoadingList: true,
      name: "",
      descripcion: "",
      costo: null,
      imagen: null
    };
  },
  async created() {
    await this.getProducto(false);
  },
  computed: {
    //  ...mapState(["user"])
    ...mapState({
      usuarioId: state => state.user.usuarioId,
      administradorId: state => state.empresa.administradorId,
      empresaId: state => state.empresa.empresaId,
      productos: state => state.productos,
      isProductosPageLoaded: state => state.isProductosPageLoaded
    })
  },
  methods: {
    ...mapMutations(["getEventosAction"]),
    async getProducto(reload) {
      try {
        await this.$store.dispatch("getProductosAction", {
          empresaId: this.empresaId,
          reload
        });
      } catch (error) {
        console.log("There was an error:", error.response); // Logs out the error
      } finally {
        this.isLoadingList = false;
      }
    },
    async createProducto() {
      this.isLoadingRequest = true;
      if (!this.empresaId) {
        return;
      }
      try {
        let responEvent = await ProductService.postCrearProducto(
          this.empresaId,
          this.costo,
          this.imagen,
          this.name,
          this.descripcion
        );
        if (responEvent.status == 201) {
          await this.getProducto(true);
        }
      } finally {
        this.isLoadingRequest = false;
        this.clearForm();
      }
    },
    clearForm() {
      (this.name = ""),
        (this.descripcion = ""),
        (this.costo = null),
        (this.imagen = null);
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
  max-width: 1100px;
  margin: auto;
  grid-template-columns: 100%;
  grid-template-rows: auto auto auto;
  @media screen and (min-width: $tablet) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(550px, auto) 10vh auto 10vh;
  }
}
.title {
  margin-top: 5vh;
  @media screen and (min-width: $tablet) {
    margin-top: 9vh;
  }
}
.svg {
  grid-row: 1;
  margin: 3vh 1em 0 1em;
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
    grid-row: 1/2;
    grid-column: 1/2;
    width: 75%;
  }
  @media screen and (min-width: $laptop) {
    grid-column: 1/2;
    width: 64%;
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

.eventList {
  grid-column: 1/2;
  display: grid;
  padding: 1rem;
  row-gap: 1.5rem;
  column-gap: 1.5rem;
  width: 85%;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  @media screen and (min-width: $cel) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    width: 85%;
  }

  @media screen and (min-width: $tablet) {
    row-gap: 2.5rem;
    grid-column: 1/3;
    width: 95%;
    grid-template-columns: repeat(3t, minmax(200px, 1fr));
  }
  @media screen and (min-width: $laptop) {
    row-gap: 3rem;
    width: 100%;
    grid-template-columns: repeat(4, minmax(200px, 1fr));
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
  margin: 0 auto 1em auto;
  margin-top: 1.5em;
  width: 10em;
  @media screen and (min-width: $tablet) {
    margin: 2em auto 1em auto;
  }
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
  margin-bottom: 2em;
  width: 70px;
  height: 70px;
  grid-column: 1/2;
  @media screen and (min-width: $tablet) {
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