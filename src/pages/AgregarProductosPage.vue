<template>
  <div class="container">
    <button
      class=" btn firstBotton"
      type="submit"
      name="button"
      v-on:click="regregarEvento"
    >Terminar</button>
    <h2 class="title2">Agrega los Productos</h2>
    <div
      class="productList"
      v-if="!isLoadingList"
    >

      <div
        class="producto_bottom"
        v-for="producto in productos"
        v-bind:key="producto.productoId"
      >
        <BaseCardProduct
          :producto="producto"
          class="cardproduct"
        ></BaseCardProduct>
        <button
          class="red child btn btn__add"
          type="submit"
          name="button"
          v-on:click="agregarProducto(producto)"
        >Agregar</button>
      </div>
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
import { mapState } from "vuex";
//import EventCard from "../components/EventCard";

import axios from "axios";

export default {
  components: {},
  data() {
    return {
      isLoadingList: true,
      productos: []
    };
  },
  computed: {
    //  ...mapState(["user"])
    ...mapState({
      administradorId: state => state.empresa.administradorId,
      empresaId: state => state.empresa.empresaId,
      productosState: state => state.productos,
      isProductosPageLoaded: state => state.isProductosPageLoaded
    })
  },
  async created() {
    this.productos = this.productosState;
    try {
      await this.$store.dispatch("getProductosAction", {
        empresaId: this.empresaId,
        reload: false
      });
    } catch (error) {
      console.log("There was an error:", error.response); // Logs out the error
    } finally {
      this.isLoadingList = false;
      this.productos = this.productosState;
    }
  },
  methods: {
    regregarEvento() {
      this.$router.push({
        name: "EventOnePage",
        params: { idEvent: this.$route.params.idEvent }
      });
    },
    async agregarProducto(product) {
      try {
        axios.post(
          `https://api-pollo.herokuapp.com/empresa/Evento/agregarProducto`,
          {
            eventoId: this.$route.params.idEvent,
            productoId: product.productoId
          }
        );

        let dataArray = this.productos.filter(producto => {
          return producto !== product;
        });
        this.productos = dataArray;
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
  max-width: 1100px;
  margin: auto;
  grid-template-columns: 100%;
  grid-template-rows: 2vh 10vh auto 10vh;
  @media screen and (min-width: $tablet) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 3vh 8vh 8vh auto 10vh;
  }
  @media screen and (min-width: $laptop) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 5vh 10vh 15vh auto 10vh;
  }
}
.title2 {
  align-self: center;
  grid-column: 1/2;
  grid-row: 3;
  @media screen and (min-width: $tablet) {
    grid-column: 1/3;
  }
}
.firstBotton {
  align-self: center;
  grid-row: 2;
  grid-column: 1/2;
  @media screen and (min-width: $tablet) {
    grid-column: 1/3;
    width: 90%;
  }
  @media screen and (min-width: $laptop) {
  }
}

.productList {
  grid-row: 4;
  grid-column: 1/2;
  display: grid;
  padding: 1rem;
  row-gap: 3rem;
  column-gap: 1.5rem;
  width: 85%;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  @media screen and (min-width: $cel) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    width: 85%;
  }

  @media screen and (min-width: $tablet) {
    row-gap: 3.5rem;
    grid-column: 1/3;
    width: 95%;
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }
  @media screen and (min-width: $laptop) {
    width: 100%;
    grid-template-columns: repeat(4, minmax(200px, 1fr));
  }
}

.btn {
  margin: 0 auto 0 auto;

  width: 14em;
}
.btn__add {
  margin-top: 1.5em;
}
.textarea {
  height: 7em;
  border-radius: 20px;
}
.input-costo {
  width: 60%;
  margin: 0%;
}

.producto_bottom {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.cardproduct {
  height: 95%;
}
.preloader {
  margin: auto;
  margin-top: 4em;
  width: 80px;
  height: 80px;
  grid-column: 1/2;
  grid-row: 4;
  @media screen and (min-width: $tablet) {
    grid-column: 1/3;
  }
}
</style>