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
    <div class="neumorphic-card__title">{{producto.productoNombre}}</div>
    <div class="neumorphic-card__text">{{producto.productoDescripcion}}</div>

    <div class="neumorphic-card__precio">S./ {{producto.productoCosto}}</div>

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
:root {
  --value: 40%;
  --back-color: #dd2222;
}
.neumorphic-image {
  border-radius: 10px;

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
  background-color: #f9f9f9;
  padding: 10px 15px 10px 15px;
  box-shadow: 4px 4px 5px rgba(55, 84, 170, 0.15),
    -5px -4px 10px rgba(255, 255, 255, 0.98),
    0px 0px 4px rgba(255, 255, 255, 0.2) !important;
  border-radius: 20px;
  grid-template-columns: auto auto 1fr auto;
  width: 100%;
}

.neumorphic-card__title {
  display: block;
  color: #555f76;
  font-size: 22px;
  padding: 0 1rem 0 1em;
  text-align: start;
}
$cel: 540px;
.neumorphic-card__text {
  display: none;
  padding: 0 1em;
  text-align: start;
  color: #8d96a8;
  @media screen and (min-width: $cel) {
    display: block;
  }
}
.neumorphic-card__outer {
  background-color: #f9f8f8;
  border-radius: 10px;
  border: 1px solid #f3f4f7;
  box-shadow: inset 4px 4px 6px #e3e5e9, inset -6px -6px 10px rgb(255, 255, 255),
    0px 0px 4px rgba(255, 255, 255, 0.2) !important;
  margin: -5px;
  padding: 6px;
}
.neumorphic-card__precio {
  padding: 0 1em;
  display: block;
  min-width: 50px;
  text-align: end;
  font-size: 1em;
}
</style>