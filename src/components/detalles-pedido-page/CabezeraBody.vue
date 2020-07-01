<template>
  <div class="container_title">
    <button
      class="red btn"
      type="submit"
      name="button"
      v-on:click="goTheOtherPage"
    >{{getTextButton}}</button>
    <h2 class="title2">{{getTitle}}</h2>

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
.btn {
  margin: 1em auto 0;
  background-color: #fff9f5;
}
</style>