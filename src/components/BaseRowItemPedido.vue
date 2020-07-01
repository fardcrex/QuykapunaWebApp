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

    <div class="neumorphic-card__precio">{{producto.cantidad}} unidad(es)</div>

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
  created() {},
  data() {
    return {};
  },
  computed: {
    imgProducto() {
      if (!this.producto.productoImagen) {
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
$cel: 540px;
$tablet: 814px;
$laptop: 1025px;
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
  background-color: #f9f9f9;
  padding: 6px 10px 6px 10px;
  box-shadow: 4px 4px 5px rgba(55, 84, 170, 0.15),
    -5px -4px 10px rgba(255, 255, 255, 0.98),
    0px 0px 4px rgba(255, 255, 255, 0.2) !important;
  border-radius: 20px;
  grid-template-columns: auto minmax(auto, 120px) auto;
  width: 95%;
  justify-content: space-evenly;
  @media screen and (min-width: $cel) {
    padding: 10px 15px 10px 15px;
    grid-template-columns:
      minmax(auto, 75px) minmax(auto, 150px) minmax(180px, 1fr)
      auto;
    width: 100%;
  }
  @media screen and (min-width: $tablet) {
    justify-content: space-between;
    grid-template-columns:
      minmax(auto, 75px) minmax(auto, 200px) minmax(180px, 1fr)
      auto;
    width: 100%;
  }
  @media screen and (min-width: $laptop) {
    grid-template-columns:
      minmax(auto, 75px) minmax(auto, 240px) minmax(180px, 1fr)
      auto;
    width: 100%;
  }
}

.neumorphic-card__title {
  display: block;
  color: #555f76;
  font-size: 22px;
  padding: 0 0 0 1rem;
  text-align: start;
}
.neumorphic-card__text {
  display: none;
  padding: 0 1em;
  font-size: 15px;
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
  padding: 0;
  display: block;
  min-width: 50px;
  text-align: end;
  font-size: 1em;
}
</style>