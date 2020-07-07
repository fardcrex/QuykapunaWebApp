<template>

  <div class="neumorphic-card">

    <div class="neumorphic-card__outer">
      <img
        class="neumorphic-image"
        :src="imgProducto"
        loading="lazy"
        :alt="producto.productoNombre"
      />
    </div>
    <div class="neumorphic-card__title">
      <p>{{producto.productoNombre}}</p>
    </div>
    <div class="neumorphic-card__text">{{producto.productoDescripcion}}</div>

    <div class="neumorphic-card__cantidad">{{cantidad}} unidades</div>

  </div>

</template>

<script>
import EventService from "@/services/EventService.js";
export default {
  props: {
    producto: {
      type: Object,
      required: true
    },
    eventoId: {
      type: Number,
      required: true
    }
  },
  created() {
    EventService.showCantidadProductos({
      eventoId: this.eventoId,
      productoId: this.producto.productoId
    }).then(respond => {
      if (respond.data[0].cantidad) this.cantidad = respond.data[0].cantidad;
      else this.cantidad = 0;
    });
  },
  data() {
    return {
      cantidad: "..."
    };
  },
  computed: {
    imgProducto() {
      if (
        this.producto.productoImagen == "dasdasdas" ||
        this.producto.productoImagen === ""
      ) {
        return "./producto-default.png";
      }
      return this.producto.productoImagen;
    }
  },

  name: "BaseCardEvent"
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

.neumorphic-image {
  border-radius: 10px;
  margin: auto;
  height: auto;
  max-height: 40px;
  display: block;
  width: auto;
}
.neumorphic-card {
  display: grid;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  background-color: $color-card;
  padding: 6px 10px 6px 10px;
  box-shadow: $shadow-neumorphic;
  border-radius: 20px;
  grid-template-columns: auto minmax(auto, 120px) auto;
  width: 95%;
  justify-content: space-evenly;
  @media screen and (min-width: $tablet) {
    padding: 10px 15px 10px 15px;
    grid-template-columns:
      minmax(auto, 75px) minmax(auto, 150px) minmax(180px, 1fr)
      auto;
    width: 100%;
  }
  @media screen and (min-width: $notebook) {
    justify-content: space-between;
    grid-template-columns:
      minmax(auto, 75px) minmax(auto, 200px) minmax(180px, 1fr)
      auto;
  }
  @media screen and (min-width: $laptop) {
    grid-template-columns:
      minmax(auto, 75px) minmax(auto, 240px) minmax(180px, 1fr)
      auto;
  }
}

.neumorphic-card__title {
  display: block;
  color: $color-font-row-title;
  padding: 0 0 0 1rem;
  text-align: start;
  p {
    font-size: $font-title-row;
  }
}
.neumorphic-card__text {
  display: none;
  padding: 0 1em;
  font-size: $font-text;
  text-align: start;
  color: $color-font-text;
  @media screen and (min-width: $tablet) {
    display: block;
  }
}
.neumorphic-card__outer {
  background-color: $color-card-outer;
  border-radius: 10px;
  box-shadow: $inner-shadow;
  margin: -5px;
  padding: 6px;
}
.neumorphic-card__cantidad {
  padding: 0;
  display: block;
  min-width: 50px;
  text-align: end;
  font-size: $font-cantidad;
  color: $color-font-cantidad;
}
</style>