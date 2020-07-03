<template>
  <div class="container">
    <img
      class="imagen"
      :src="imagenQr"
      alt="código qr"
    >
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  props: {
    productos: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      imagenQr: ""
    };
  },
  created() {
    const codPedido = this.$route.params.idPedido;
    let strData = `${codPedido}`;
    for (const producto of this.productos) {
      strData += `|${producto.productoNombre}|${producto.cantidad}|${producto.productoCosto}`;
    }
    console.log(strData);
    QRCode.toDataURL(strData, { errorCorrectionLevel: "Q" })
      .then(url => {
        this.imagenQr = url;
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>

<style lang="scss" scoped>
$cel: 540px;
$tablet: 814px;
$laptop: 1025px;
$desk: 1300px;
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.imagen {
  display: block;
  width: 90%;
  @media screen and (min-width: $cel) {
    width: 65%;
  }
  @media screen and (min-width: $tablet) {
    margin: auto;
    width: 55%;
  }
  @media screen and (min-width: $laptop) {
    width: 50%;
  }
}
</style>