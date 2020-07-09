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

    <div class="neumorphic-card__precio">S/. {{producto.productoCosto}}</div>

  </div>

</template>

<script>
export default {
  props: {
    producto: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgProducto() {
      if (!this.producto.productoImagen) {
        return "./producto-default.png";
      }
      return this.producto.productoImagen;
    }
  },

  name: "BaseRowProduct"
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
  align-items: center;
  background-color: $color-card;
  padding: 10px 15px 10px 15px;
  box-shadow: $shadow-neumorphic;
  border-radius: 20px;
  grid-template-columns: auto minmax(auto, 120px) auto;

  @media screen and (min-width: $tablet) {
    grid-template-columns:
      minmax(auto, 75px) minmax(auto, 130px) auto
      auto;
    width: 100%;
  }
  @media screen and (min-width: $notebook) {
    grid-template-columns:
      minmax(auto, 75px) minmax(auto, 140px) auto
      auto;

    width: 100%;
  }
  @media screen and (min-width: $laptop) {
    grid-template-columns:
      minmax(auto, 75px) minmax(auto, 160px) auto
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
  font-size: $font-text * 0.98;
  text-align: start;
  color: $color-font-text;
  @media screen and (min-width: $tablet) {
    display: block;
  }
}
.neumorphic-card__outer {
  background-color: $color-card-outer;
  border-radius: 10px;
  border: 1px solid #f3f4f7;
  box-shadow: $inner-shadow;
  margin: -5px;
  padding: 6px;
}
.neumorphic-card__precio {
  padding: 0 0.5em;
  display: block;
  min-width: 50px;
  text-align: end;
  font-size: $font-precio;
  color: $color-font-precio;
}
</style>