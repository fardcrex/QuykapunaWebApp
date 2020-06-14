<template>

  <div class="neumorphic-card">
    <div>
      <div class="neumorphic-card__title">{{producto.productoNombre}}</div>
      <div class="neumorphic-card__outer">
        <img
          class="neumorphic-image"
          :src="imgProducto"
          loading="lazy"
        />
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
      if (
        this.producto.productoImagen === "dasdasdas" ||
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
  min-height: 180px;
  height: auto;
  max-height: 35vh;
  display: block;
  width: 100%;
}
.neumorphic-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f9f9f9;
  padding: 20px 30px 20px 30px;
  box-shadow: 4px 4px 5px rgba(55, 84, 170, 0.15),
    -5px -4px 10px rgba(255, 255, 255, 0.98),
    0px 0px 4px rgba(255, 255, 255, 0.2) !important;
  border-radius: 20px;
  height: minmax(300px, auto);
  width: auto;
}

.neumorphic-card__title {
  display: block;
  color: #555f76;
  font-size: 22px;
  padding: 0.2em 0 1em;
  text-align: start;
}

.neumorphic-card__text {
  display: block;
  padding: 1.5em 0 10px;
  text-align: start;
  color: #8d96a8;
  min-height: 4vh;
}
.neumorphic-card__outer {
  background-color: #f9f8f8;
  border-radius: 10px;
  border: 1px solid #f3f4f7;
  box-shadow: inset 4px 4px 6px #e3e5e9, inset -6px -6px 10px rgb(255, 255, 255),
    0px 0px 4px rgba(255, 255, 255, 0.2) !important;
  margin: -5px;
  padding: 12px;
}
.neumorphic-card__precio {
  display: block;

  text-align: end;
  font-size: 1em;
}
</style>