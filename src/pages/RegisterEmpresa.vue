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
          v-model="dni"
          type="text"
          name="Dni"
          value
        />
        <input
          placeholder="Nombre"
          class="child input"
          v-model="name"
          type="text"
          name="name"
          value
        />
        <input
          placeholder="Apellido"
          class="child input"
          v-model="lastname"
          type="text"
          name="name"
          value
        />
      </template>
      <template v-if="estadoForm===2">

        <input
          placeholder="Email"
          class="child input"
          v-model="email"
          type="email"
          name="email"
          value
        />
        <input
          placeholder="Contraseña"
          class="child input"
          v-model="password"
          type="password"
          name="password"
          value
        />
        <input
          placeholder="Confirmar Contraseña"
          class="child input"
          v-model="passwordTwo"
          type="password"
          name="password"
          autocomplete="on"
          value
        />
      </template>
      <template v-if="estadoForm===3">
        <input
          placeholder="Telefono"
          class="child input"
          v-model="phone"
          type="text"
          name="phone"
          value
        />
        <input
          placeholder="Ruc"
          class="child input"
          v-model="ruc"
          type="text"
          name="ruc"
          value
        />
        <input
          placeholder="Razón Social"
          class="child input"
          v-model="razonSocial"
          type="text"
          name="razonSocial"
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
      <p class="mensaje">{{mensaje}}</p>
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
import CondominioService from "@/services/CondominioService.js";
export default {
  components: { Circle1, Circle2, TittleLogo },
  data() {
    return {
      name: "",
      dni: "",
      lastname: "",
      phone: "",
      email: "",
      ruc: "",
      razonSocial: "",
      password: "",
      passwordTwo: "",
      errors: null,
      mensaje: "",
      loading: false,
      edificios: [],
      estadoForm: 1
    };
  },
  async created() {
    this.getCondominios();
  },
  methods: {
    nextForm2() {
      if (this.dni === "" || this.name === "" || this.lastname === "") {
        this.errors = "Falta completar datos";
        return;
      }
      this.errors = "";
      this.estadoForm = this.estadoForm + 1;
    },
    nextForm3() {
      if (
        this.passwordTwo === "" ||
        this.email === "" ||
        this.password === ""
      ) {
        this.errors = "Falta completar datos";
        return;
      }
      if (this.passwordTwo !== this.password) {
        this.errors = "Las Contraseñas no coinciden";
        return;
      }
      this.errors = "";
      this.estadoForm = this.estadoForm + 1;
    },
    register() {
      if (this.phone === "" || this.ruc === "" || this.razonSocial === "") {
        this.errors = "Falta completar datos";
        return;
      }
      this.loading = true;
      this.$store
        .dispatch("registerEmpresa", {
          usuarioNombre: this.name,
          usuarioDni: this.dni,
          usuarioApellido: this.lastname,
          usuarioTelefono: this.phone,
          usuarioCorreo: this.email,
          ruc: this.ruc,
          razonsocial: this.razonSocial,
          usuarioContraseña: this.password
        })
        .then(res => {
          console.log(res);
          this.loading = false;
          if (res.data[0].resultado === "Registrado") {
            return this.$store.dispatch("login", {
              correo: this.email,
              password: this.password
            });
          }
        })
        .then(() => {
          this.loading = false;
          this.$router.push({ name: "Home" });
        })
        .catch(err => {
          console.log("user data is", err);
          this.error = err.response.data.error;
        });
    },
    async getCondominios() {
      try {
        const response = await CondominioService.showCondominios();
        this.edificios = response.data;
      } catch (error) {
        console.log(error);
      }
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
.mensaje {
  color: green;
  width: 80%;
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