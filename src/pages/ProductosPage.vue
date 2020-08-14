<template>
  <div class="container">
    <div class="title">
      <h2>{{title}}</h2>
      <button
        class="primary  btn"
        type="submit"
        name="button"
        v-on:click="goCreateProductPage"
      >Crear Producto</button>
    </div>
    <div
      class="eventList"
      v-if="!isLoadingList"
    >
      <BaseCardProduct
        v-for="producto in productos"
        v-bind:key="producto.productoId"
        :producto="producto"
      ></BaseCardProduct>
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
      //Loader de la lista de productos
      isLoadingList: true,
      title: "Lista de Productos",
    };
  },
  async created() {
    await this.getProductos();
  },
  computed: {
    ...mapState(["productos", "isProductosPageLoaded"]),
  },
  methods: {
    ...mapActions(["getProductosAction"]),
    async getProductos() {
      try {
        await this.getProductosAction({
          reload: false,
        });
      } catch (error) {
        console.log("There was an error Productos Page:", error.response); // Logs out the error
      } finally {
        this.isLoadingList = false;
      }
      if (this.productos.length === 0) {
        this.title = "No hay productos creados";
      }
    },
    goCreateProductPage() {
      this.$router.push({ name: "CreateProductPage" });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.container {
  justify-items: center;
  display: grid;
  width: 100%;
  max-width: 1100px;
  margin: auto;
  grid-template-columns: 100%;
  grid-template-rows: auto auto auto;
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
  row-gap: 1.5rem;
  column-gap: 1.5rem;
  width: 85%;
  grid-template-columns: repeat(auto-fit, minmax(auto, 1fr));
  @media screen and (min-width: $tablet) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    width: 85%;
  }
  @media screen and (min-width: $notebook) {
    row-gap: 2.5rem;
    width: 95%;
    grid-template-columns: repeat(3t, minmax(200px, 1fr));
  }
  @media screen and (min-width: $laptop) {
    row-gap: 3rem;
    width: 100%;
    grid-template-columns: repeat(4, minmax(200px, 1fr));
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