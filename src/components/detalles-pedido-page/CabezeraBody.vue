<template>
  <div class="container_title">

    <button
      class="red btn"
      type="submit"
      name="button"
      v-on:click="goTheOtherPage"
    >{{getTextButton}}</button>
    <h2 class="title2">{{getTitle}}</h2>
    <div class="empthy_container">

    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVistaQr: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getTitle() {
      if (this.isVistaQr) return "Código QR";
      return "Lista de Productos";
    },
    getTextButton() {
      if (this.isVistaQr) return "Ver listado de items";
      return "Generar Código QR";
    }
  },
  methods: {
    goTheOtherPage() {
      if (this.isVistaQr) this.$router.push("lista-items");
      else this.$router.push("codigo-Qr");
    }
  },
  name: "CabezeraBody"
};
</script>

<style lang="scss" scoped>
$cel: 540px;
$tablet: 814px;
$laptop: 1025px;
$desk: 1300px;
.btn {
  margin: 1.5em auto 1em;
  background-color: #f9f9f9;
  @media screen and (min-width: $tablet) {
    margin: 1em 0 2em;
    flex-direction: row-reverse;
    align-items: center;
  }
}
.container_title {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  @media screen and (min-width: $tablet) {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
  }
}
.title2 {
  align-self: center;
  grid-row: 3/4;
  grid-column: 1/2;
  @media screen and (min-width: $tablet) {
    grid-row: 2/3;
    grid-column: 1/3;
    width: 90%;
  }
  @media screen and (min-width: $laptop) {
  }
}
.empthy_container {
  width: 170px;
}
</style>