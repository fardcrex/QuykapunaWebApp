<template>
  <div class="home">
    <Circle1 class="circle1"></Circle1>
    <Circle2 class="circle2"></Circle2>

    <form
      v-on:submit.prevent="register"
      class="container__body"
    >
      <TittleLogo class="logo"></TittleLogo>

      <template v-if="estadoForm===1">
        <input
          placeholder="Dni"
          class="child input"
          v-model="credentials.usuarioDni"
          type="text"
          name="Dni"
          value
        />
        <input
          placeholder="Nombre"
          class="child input"
          v-model="credentials.usuarioNombre"
          type="text"
          name="name"
          autocomplete="given-name"
          value
        />
        <input
          placeholder="Apellido"
          class="child input"
          v-model="credentials.usuarioApellido"
          type="text"
          name="name"
          autocomplete="additional-name"
          value
        />
      </template>
      <template v-if="estadoForm===2">
        <input
          placeholder="Telefono"
          class="child input"
          v-model="credentials.usuarioTelefono"
          type="tel"
          name="phone"
          autocomplete="tel"
          value
        />
        <input
          placeholder="Ruc"
          class="child input"
          v-model="credentials.ruc"
          type="text"
          name="ruc"
          autocomplete="off"
          value
        />
        <input
          placeholder="Razón Social"
          class="child input"
          v-model="credentials.razonsocial"
          type="text"
          name="razonSocial"
          autocomplete="off"
          value
        />
      </template>
      <template v-if="estadoForm===3">
        <input
          placeholder="Email"
          class="child input"
          v-model="credentials.usuarioCorreo"
          type="email"
          name="email"
          autocomplete="email"
          value
        />
        <input
          placeholder="Contraseña"
          class="child input"
          v-model="credentials.usuarioContraseña"
          type="password"
          name="password"
          autocomplete="new-password"
          value
        />
        <input
          placeholder="Confirmar Contraseña"
          class="child input"
          v-model="passwordTwo"
          type="password"
          name="password"
          autocomplete="off"
          value
        />
      </template>
      <div
        v-if="estadoForm===1"
        class="primary child btn btn_next"
        name="button"
        v-on:click="nextForm2"
      >Siguiente</div>
      <div
        v-if="estadoForm===2"
        class="primary child btn btn_next"
        name="button"
        v-on:click="nextForm3"
      >Siguiente</div>
      <div v-if="estadoForm===3">
        <button
          v-if="!loading"
          class="primary child btn"
          type="submit"
          name="button"
        >Registrarse</button>
        <div
          v-else
          class="preloader"
        ></div>
      </div>
      <p class="error">{{errors}}</p>
      <router-link
        to="/entrar"
        class="link"
      >login</router-link>
    </form>

  </div>
</template>

<script>
import Circle1 from "@/components-svg/Circle1.vue";
import Circle2 from "@/components-svg/Circle2.vue";
import TittleLogo from "@/components-svg/TittleLogo.vue";
import { message } from "@/recursos/DataInformation.js";

export default {
  components: { Circle1, Circle2, TittleLogo },
  data() {
    return {
      credentials: {
        usuarioNombre: "",
        usuarioDni: "",
        usuarioApellido: "",
        usuarioTelefono: "",
        usuarioCorreo: "",
        ruc: "",
        razonsocial: "",
        usuarioContraseña: ""
      },
      passwordTwo: "",
      errors: null,
      loading: false,
      estadoForm: 1
    };
  },
  methods: {
    nextForm2() {
      const credentials = this.credentials;
      if (
        credentials.usuarioNombre === "" ||
        credentials.usuarioDni === "" ||
        credentials.usuarioApellido === ""
      ) {
        this.errors = message.notCompleted;
        return;
      }
      this.errors = "";
      this.estadoForm = this.estadoForm + 1;
    },
    nextForm3() {
      const credentials = this.credentials;
      if (
        credentials.phone === "" ||
        credentials.ruc === "" ||
        credentials.razonSocial === ""
      ) {
        this.errors = message.notCompleted;
        return;
      }
      this.errors = "";
      this.estadoForm = this.estadoForm + 1;
    },
    async register() {
      try {
        const credentials = this.credentials;
        if (
          this.passwordTwo === "" ||
          credentials.usuarioCorreo === "" ||
          credentials.usuarioContraseña === ""
        ) {
          this.errors = message.notCompleted;
          return;
        }
        if (this.passwordTwo !== credentials.usuarioContraseña) {
          this.errors = message.passwordNotEqual;
          return;
        }
        this.loading = true;
        const res = await this.$store.dispatch("registerEmpresa", credentials);
        if (res.data.successful === true) {
          await this.$store.dispatch("login", {
            correo: credentials.usuarioCorreo,
            password: credentials.usuarioContraseña
          });
          this.$router.push({ name: "Home" });
        } else {
          this.errors = res.data.resultado;
          this.estadoForm = 1;
        }
      } catch (error) {
        console.log("user data is", error);
        this.errors = error.response.data.error;
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
form {
  margin: 0;
}
.container__body {
  justify-items: center;
  height: 75vh;
  display: grid;
  width: 75%;
  max-width: 1000px;
  margin: auto;
  grid-template-rows: 140px auto auto auto 1fr;
  @media screen and (min-width: $tablet) {
    width: 60%;
    grid-template-rows: auto auto auto auto 1fr;
  }
}
.input {
  padding: 1.6em 1.8em;
  @media screen and (min-width: $notebook) {
    padding: 1.6em 2em;
  }
}
.child {
  display: block;
  margin: 0.6em 0;
  height: 3em;
}
.btn {
  margin-top: 1.5em;
  width: 10em;
}
.logo {
  margin: 0 auto;
  width: 85%;
  height: 140px;
  @media screen and (min-width: $notebook) {
    height: 150px;
    width: 45%;
  }
  @media screen and (min-width: $laptop) {
    width: 35%;
  }
}
.error {
  color: red;
}

.btn_next {
  border: 0;
  outline: 0;
  font-size: 14px;
  border-radius: $ruler * 20;
  padding: $ruler;
  background-color: $color-bg;
  text-shadow: 1px 1px 0 $color-white;
}
.btn_next {
  margin-right: $ruler/2;
  box-shadow: inset 2px 2px 5px $color-shadow, inset -5px -5px 10px $color-white;

  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  /*  appearance: none;
  -webkit-appearance: none; */

  &:focus {
    box-shadow: inset 1px 1px 2px $color-shadow,
      inset -1px -1px 2px $color-white;
  }
}
.btn_next {
  color: #61677c;
  font-weight: bold;
  box-shadow: -2px -2px 5px $color-white, 2px 2px 5px $color-shadow;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    box-shadow: -2px -2px 8px $color-white, 2px 2px 8px $color-shadow;
  }

  &:active {
    box-shadow: inset 1px 1px 2px $color-shadow,
      inset -1px -1px 2px $color-white;
  }

  .icon {
    margin-right: $ruler/2;
  }

  &.unit {
    border-radius: $ruler/2;
    line-height: 0;
    width: $ruler * 3;
    height: $ruler * 3;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 $ruler/2;
    font-size: $ruler * 1.2;

    .icon {
      margin-right: 0;
    }
  }

  &.primary {
    display: block;
    color: $color-primary;
  }
}
.condominio_style {
  height: 50px;
  width: 225px;
  color: rgba(85, 85, 85, 0.863);
  @media screen and (min-width: $notebook) {
    width: 225px;
  }
}
.preloader {
  margin-top: 1.6em;
  width: 60px;
  height: 60px;
}
.link {
  display: block;
  margin: 1.5em 0;
}
</style>