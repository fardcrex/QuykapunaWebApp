<template>
  <div class="productList">

    <div
      class="rowCardProduct"
      v-for="(producto,index) in productos"
      v-bind:key="index"
    >
      <BaseRowProduct :producto="producto"></BaseRowProduct>
      <div class="container_cantidad_costo">

        <div class="cantidad__value">{{producto.cantidad}} unidad(es)</div>

        <span class="tolalPrecioProducto">S/ {{producto.cantidad*producto.productoCosto}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productos: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  name: "ListProductos"
};
</script>

<style lang="scss" scoped>
$greyLight-2: #c8d0e7;
$color-primary: #ff6531;
$color-bg: #f9f9f9;
$cel: 540px;
$tablet: 814px;
$laptop: 1025px;
$desk: 1300px;
.productList {
  display: grid;
  row-gap: 1rem;
  width: auto;
  grid-template-columns: 100%;
  grid-template-rows: auto;

  @media screen and (min-width: $tablet) {
    padding: 0 1rem;
    justify-items: stretch;

    grid-column: 1/3;
  }
}
.rowCardProduct {
  display: flex;
  align-items: flex-end;
  margin: 0 1em;
  flex-direction: column;
  @media screen and (min-width: $tablet) {
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }
}
.container_cantidad_costo {
  padding: 10px;
  display: flex;
  width: max-content;

  align-items: center;
  justify-content: flex-end;
  @media screen and (min-width: $tablet) {
    margin-left: 1rem;
  }
}

.cantidad__value {
  min-width: 20px;
  padding: 0 0.5rem;
  @media screen and (min-width: $tablet) {
    padding: 0 1rem;
  }
}

.tolalPrecioProducto {
  color: $color-primary;
  display: inline;
  font-weight: 500;
  min-width: 5rem;
  @media screen and (min-width: $tablet) {
    margin-left: 1rem;
  }
}
</style>