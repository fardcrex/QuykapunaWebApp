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
          v-model="cliente.dni"
          type="text"
          name="Dni"
          value
        />
        <input
          placeholder="Nombre"
          class="child input"
          v-model="cliente.nombre"
          type="text"
          name="name"
          autocomplete="given-name"
          value
        />
        <input
          placeholder="Apellido"
          class="child input"
          v-model="cliente.apellido"
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
          v-model="cliente.telefono"
          type="text"
          name="phone"
          autocomplete="tel"
          value
        />
        <select
          class="child condominio_style"
          v-model="condominioId"
        >
          <optgroup label="Condominios">
            <option
              v-for="condominio in condominios"
              v-bind:key="condominio.condominioId"
              :value="condominio.condominioId"
            >{{condominio.condominioNombre}}</option>
          </optgroup>
        </select>
        <select
          v-if="isCondominioChecked"
          class="child condominio_style"
          v-model="cliente.edificio"
        >
          <optgroup label="Edificios">
            <option
              v-for="edificio in edificios"
              v-bind:key="edificio.edificioId"
              :value="edificio.edificioId"
            >{{edificio.edificioNombre}}</option>
          </optgroup>
        </select>
        <div
          v-if="isLoadingEdificios"
          class="preloader preloader__min"
        ></div>
        <input
          placeholder="Departamento"
          class="child input"
          v-model="cliente.departamento"
          type="text"
          name="departamento"
          autocomplete="off"
          value
        />
      </template>
      <template v-if="estadoForm===3">
        <input
          placeholder="Email"
          class="child input"
          v-model="cliente.correo"
          type="email"
          name="email"
          autocomplete="email"
          value
        />
        <input
          placeholder="Contraseña"
          class="child input"
          v-model="cliente.contraseña"
          type="password"
          name="password"
          autocomplete="new-password"
          value
        />
        <input
          placeholder="Contraseña"
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
import { message } from "@/recursos/DataInformation.js";
export default {
  components: { Circle1, Circle2, TittleLogo },
  data() {
    return {
      cliente: {
        nombre: "",
        dni: "",
        apellido: "",
        telefono: "",
        correo: "",
        departamento: "",
        edificio: -1,
        contraseña: ""
      },
      passwordTwo: "",
      condominioId: -1,
      errors: "",
      mensaje: "",
      edificios: [],
      condominios: [],
      estadoForm: 1,
      isCondominioChecked: false,
      loading: false,
      isLoadingEdificios: false
    };
  },
  computed: {},
  watch: {
    async condominioId(newQuestion, oldQuestion) {
      if (newQuestion !== oldQuestion) {
        this.isCondominioChecked = false;
        this.isLoadingEdificios = true;
        await this.getEdificios();
        this.isLoadingEdificios = false;
        this.isCondominioChecked = true;
      }
    }
  },
  async created() {
    this.getCondominios();
  },
  methods: {
    nextForm2() {
      const cliente = this.cliente;
      if (
        cliente.dni === "" ||
        cliente.nombre === "" ||
        cliente.apellido === ""
      ) {
        this.errors = message.notCompleted;
        return;
      }
      this.errors = "";
      this.estadoForm = this.estadoForm + 1;
    },
    nextForm3() {
      const cliente = this.cliente;
      if (
        cliente.telefono === "" ||
        cliente.departamento === "" ||
        cliente.edificio === -1
      ) {
        this.errors = message.notCompleted;
        return;
      }
      this.errors = "";
      this.estadoForm = this.estadoForm + 1;
    },
    async register() {
      try {
        const cliente = this.cliente;
        if (
          this.passwordTwo === "" ||
          cliente.email === "" ||
          cliente.contraseña === ""
        ) {
          this.errors = message.notCompleted;
          return;
        }
        if (this.passwordTwo !== cliente.contraseña) {
          this.errors = message.passwordNotEqual;
        }
        this.loading = true;

        const res = await this.$store.dispatch("register", cliente);
        if (res.data.successful === true) {
          await this.$store.dispatch("login", {
            correo: cliente.correo,
            password: cliente.contraseña
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
    },
    async getCondominios() {
      try {
        const response = await CondominioService.showCondominios();
        this.condominios = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getEdificios() {
      try {
        const response = await CondominioService.showEdificioByCondominioId(
          this.condominioId
        );
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
  &__min {
    margin-top: 0;
    margin-bottom: 1rem;
    width: 30px;
    height: 30px;
    border: 7px solid #fdebd7;
    border-top: 7px solid #ff865e;
  }
}

.link {
  display: block;
  margin: 1.5em 0;
}
</style>