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
$cel: 540px;
$tablet: 814px;
$laptop: 1025px;
$desk: 1300px;

#nav {
  display: flex;
  align-items: center;
  min-height: 50px;
  max-width: 100%;
  margin: auto;
  padding: 0.2em 0.6em;
  background: #f9f9f9;
  box-shadow: 4px 4px 5px rgba(55, 84, 170, 0.15),
    -5px -4px 10px rgba(255, 255, 255, 0.98),
    0px 0px 4px rgba(255, 255, 255, 0.2) !important;
  @media screen and (min-width: $cel) {
  }

  @media screen and (min-width: $tablet) {
    padding: 0.2em 10%;
  }
  @media screen and (min-width: $laptop) {
    padding: 0.2em 15%;
  }
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
  border-bottom: 2px solid #f9f8f8;
}

button,
.button {
  margin-left: auto;
  background: linear-gradient(145deg, #e0e0de, #ffffff);
  box-shadow: 4px 4px 8px #d6d6d4, -4px -4px 8px #ffffff;
  text-decoration: none;
  color: #2c3e50;
  padding: 0.8em 1.5em;
  &.router-link-active {
    color: #2c3e50;
  }
  /* &:hover {
    box-shadow: 4px 4px 8px #d6d6d4, -4px -4px 8px #ffffff;
  } */
}

.logoutButton {
  cursor: pointer;
}

.nav-welcome + button {
  margin-left: 0;
}
</style>
