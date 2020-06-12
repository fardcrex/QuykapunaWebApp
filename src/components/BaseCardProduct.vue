<template>

  <div class="neumorphic-card">
    <div>
      <div class="neumorphic-card__title">{{producto.productoNombre}}</div>
      <div class="neumorphic-card__outer">
        <img
          class="neumorphic-image"
          :src="imgProducto"
        /><!-- Photo by @alfonstaekema https://unsplash.com/photos/lvXeO04CxwQ -->
      </div>
      <div class="neumorphic-card__text">{{producto.productoDescripcion}}</div>
    </div>
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
      if (this.producto.productoImagen === "dasdasdas") {
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
  display: block;
  width: 100%;
}
.neumorphic-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f9f9f9;
  padding: 25px 40px 25px 40px;
  box-shadow: 7px 7px 15px rgba(55, 84, 170, 0.15),
    -7px -7px 20px rgba(255, 255, 255, 1), 0px 0px 4px rgba(255, 255, 255, 0.2) !important;
  border-radius: 20px;
  width: auto;
}

.neumorphic-card__title {
  display: block;
  color: #555f76;
  font-size: 22px;
  padding: 10px 0 1em;
  text-align: start;
}

.neumorphic-card__text {
  display: block;
  padding: 2em 0 10px;
  text-align: start;
  color: #8d96a8;
  min-height: 6vh;
}
.neumorphic-card__outer {
  background-color: #f3f4f7;
  border-radius: 10px;
  border: 1px solid #f3f4f7;
  box-shadow: 7px 7px 15px rgba(55, 84, 170, 0.15),
    -7px -7px 20px rgba(255, 255, 255, 1), 0px 0px 4px rgba(255, 255, 255, 0.2) !important;
  margin: -5px;
}
.neumorphic-card__precio {
  display: block;

  text-align: end;
  font-size: 1em;
}
</style>