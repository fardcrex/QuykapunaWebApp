<template>

  <div class="neumorphic-card">
    <div>
      <div class="neumorphic-card__title">{{producto.productoNombre}}</div>
      <div class="neumorphic-card__outer">
        <img
          class="neumorphic-image"
          :src="imgProducto"
          loading="lazy"
          :alt="producto.productoNombre"
        />
      </div>
      <div class="neumorphic-card__text">{{producto.productoDescripcion}}</div>
    </div>
    <div class="neumorphic-card__precio">S/. {{producto.productoCosto}}</div>

  </div>

</template>

<script>
export default {
  props: {
    producto: {
      type: Object
    }
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
  min-height: 8rem;
  height: auto;
  max-height: 10rem;
  display: block;
  width: 100%;
}
.neumorphic-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $color-card;
  padding: 20px 30px 20px 30px;
  box-shadow: $shadow-neumorphic;
  border-radius: 20px;
  height: minmax(280px, auto);
  width: auto;
}

.neumorphic-card__title {
  display: block;
  color: $color-secondary;
  font-size: $font-title-card;
  padding: 0.2em 0 1em;
  text-align: start;
}

.neumorphic-card__text {
  display: block;
  padding: 1.5em 0 10px;
  text-align: start;
  color: $color-font-text;
  font-size: $font-text;
  min-height: 4vh;
}
.neumorphic-card__outer {
  background-color: $color-card-outer;
  border-radius: 10px;
  border: 1px solid #f3f4f7;
  box-shadow: $shadow-neumorphic-outer;
  margin: -5px;
  padding: 12px;
}
.neumorphic-card__precio {
  display: block;

  text-align: end;
  font-size: $font-precio;
}
</style>