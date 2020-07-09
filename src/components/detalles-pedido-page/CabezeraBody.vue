<template>
  <div class="container_title">

    <button
      class="primary btn"
      type="submit"
      name="button"
      v-on:click="goTheQrPage"
    >{{getTextButton}}</button>
    <h2 class="title2">{{getTitle}}</h2>
    <div
      v-if="isVistaQr"
      class="empthy_container"
    >
    </div><button
      v-else
      class="primary btn"
      type="submit"
      name="button"
      v-on:click="goTheChangePage"
    >{{getTextButtonModify}}</button>
  </div>
</template>

<script>
export default {
  props: {
    isVistaQr: {
      type: Boolean,
      default: false
    },
    isVistaModificar: {
      type: Boolean,
      default: false
    },
    productos: {
      type: Array,
      default: function() {
        return [];
      }
    },
    productsOriginal: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    getTitle() {
      if (this.isVistaQr) return "Código QR";
      if (this.isVistaModificar) return "Modificar Pedido";
      return "Pedidos";
    },
    getTextButton() {
      if (this.isVistaQr) return "Ver pedido";
      if (this.isVistaModificar) return "Terminar";
      return "Código QR";
    },
    getTextButtonModify() {
      if (this.isVistaModificar) return "Cancelar";
      return "Modificar";
    }
  },
  methods: {
    goTheQrPage() {
      if (this.isVistaQr) this.$router.push("lista-items");
      else if (this.isVistaModificar) this.$router.push("lista-items");
      else this.$router.push("codigo-Qr");
    },
    goTheChangePage() {
      if (this.isVistaModificar) {
        this.$emit("cancelar");
        this.$router.push("lista-items");
      } else this.$router.push("modificar-lista-items");
    }
  },
  name: "CabezeraBody"
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

.btn {
  min-width: 7rem;
  margin: 1.5em auto 1em;
  background-color: #f9f9f9;
  @media screen and (min-width: $notebook) {
    margin: 1em 0 2em;
    flex-direction: row-reverse;
    align-items: center;
  }
}
.container_title {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  @media screen and (min-width: $notebook) {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
  }
}
.title2 {
  align-self: center;
  grid-row: 3/4;
  grid-column: 1/2;
  @media screen and (min-width: $notebook) {
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