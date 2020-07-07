<template>
  <div class="home">
    <Circle1 class="circle1"></Circle1>
    <Circle2 class="circle2"></Circle2>
    <div class="home container__body">
      <div v-bind:class="{ heightChild: loggedIn }"></div>
      <DeliverySvg class="child svg"></DeliverySvg>
      <h1 class="child">Bienvenidos a Quykapuna!</h1>
      <div class="parrafo">
        <p>
          Registrarse como ...
        </p>
      </div>
      <template
        v-if="!loggedIn"
        class="child"
      >
        <div class="botones">
          <button
            class="primary btn"
            type="button"
            v-on:click="goToPageLogin"
          >Cliente</button>
          <button
            class="primary btn btn__2"
            type="button"
            v-on:click="goToPageRegiste"
          >Proveedor</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { authComputed } from "../store/helpers.js";
import DeliverySvg from "@/components-svg/DeliverySvg.vue";
import Circle1 from "@/components-svg/Circle1.vue";
import Circle2 from "@/components-svg/Circle2.vue";

export default {
  name: "RegisterOption",
  components: { DeliverySvg, Circle1, Circle2 },
  computed: {
    ...authComputed
  },
  methods: {
    goToPageLogin: function() {
      this.$router.push({ name: "RegisterUser" });
    },
    goToPageRegiste: function() {
      // this.$router.push({ name: "RegisterProveedor" });
    }
  }
};
</script>

<style lang="scss" scoped>
.container__body {
  justify-items: center;
  height: 90vh;
  display: grid;
  width: 90%;
  max-width: 1000px;
  margin: auto;
  grid-template-rows: auto 40vh 1fr 1fr 1fr 3fr;
}
.child {
  display: block;
}
.heightChild {
  height: 10vh;
}
.btn {
  width: 100%;
  margin: 1em 0 1em 0;
  padding: 1em 3em;
}
.btn__2 {
  margin-top: 2em;
}
.svg {
  height: 100%;
}
p {
  margin-top: 0;
  margin-bottom: 2em;
}
.parrafo {
  width: 50%;
}
</style>