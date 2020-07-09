<template>
  <div
    id="nav"
    :class="{shadow:loggedIn}"
  >

    <router-link to="/">Inicio</router-link>
    <router-link
      v-if="isProveedor"
      to="/crear-eventos"
    >Eventos</router-link>
    <router-link
      v-if="isProveedor"
      to="/productos"
    >Productos</router-link>
    <router-link
      v-if="isCliente"
      to="/Eventos"
    >Eventos</router-link>
    <router-link
      v-if="isCliente"
      to="/pedidos"
    >Pedidos</router-link>
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
import { mapState } from "vuex";
export default {
  computed: {
    ...authComputed,
    ...mapState({
      isProveedor: state =>
        state.user.tipoUsuarioId === 2 || state.user.tipoUsuarioId === 3,
      isCliente: state => state.user.tipoUsuarioId === 1
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

#nav {
  display: flex;
  align-items: center;
  min-height: 50px;
  max-width: 100%;
  margin: auto;
  padding: 0.2em 0.6em;

  @media screen and (min-width: $tablet) {
  }

  @media screen and (min-width: $notebook) {
    padding: 0.2em 10%;
  }
  @media screen and (min-width: $laptop) {
    padding: 0.2em 15%;
  }
}
.shadow {
  background: $color-card;
  box-shadow: $shadow-neumorphic;
}
.nav-welcome {
  margin-left: auto;
  margin-right: 1rem;
  color: $color-white;
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
  color: $color-primary;
  border-bottom: 2px solid $color-card-outer;
}

button,
.button {
  margin-left: auto;
  background: $color-card-outer;
  box-shadow: 2px 2px 4px $color-shadow, -4px -4px 8px $color-white;
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
