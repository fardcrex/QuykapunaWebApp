<template>
  <div id="nav">

    <router-link to="/">Inicio</router-link>
    <router-link
      v-if="loggedIn"
      to="/eventos"
    >Eventos</router-link>
    <router-link
      v-if="loggedIn"
      to="/productos"
    >Productos</router-link>
    <!--  <router-link
      v-if="!loggedIn"
      to="/entrar"
      class="button"
    >Entrar</router-link> -->
    <button
      v-if="loggedIn"
      type="button"
      class="logoutButton"
      @click="logout"
    >
      Salir
    </button>
  </div>
</template>

<script>
/* eslint-disable */
import { authComputed } from "../store/helpers.js";
export default {
  computed: {
    ...authComputed
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="scss" scoped>
#nav {
  display: flex;
  align-items: center;
  min-height: 50px;
  max-width: 1024px;
  margin: auto;
  padding: 0.2em 1em;
  // background: linear-gradient(to right, #fbb448, #f7892b);
}

.nav-welcome {
  margin-left: auto;
  margin-right: 1rem;
  color: white;
}

a {
  font-weight: bold;
  color: #2c3e50;
  margin: auto 0.8em auto 0.4em;
  text-decoration: none;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
}

.router-link-exact-active {
  color: #ff6531;
  border-bottom: 2px solid #fff;
}

button,
.button {
  margin-left: auto;
  background: white;
  text-decoration: none;
  color: #2c3e50;

  &.router-link-active {
    color: #2c3e50;
  }
}

.logoutButton {
  cursor: pointer;
}

.nav-welcome + button {
  margin-left: 0;
}
</style>
