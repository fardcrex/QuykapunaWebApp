<template>
  <div>Precio Total: <span class="tolalPrecioFinal"> S/. {{precioTotal}}</span></div>
</template>

<script>
export default {
  props: ["precioTotal"],
  name: "FooterBody"
};
</script>

<style lang="scss" scoped>
$color-primary: #ff6531;
.tolalPrecioFinal {
  min-width: 80px;
  font-weight: 500;
  color: $color-primary;
  display: inline;
}
</style>