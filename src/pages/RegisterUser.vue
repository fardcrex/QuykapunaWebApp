<template>
  <div class="home">
    <Circle1 class="circle1"></Circle1>
    <Circle2 class="circle2"></Circle2>

    <form
      v-on:submit.prevent="register"
      class="container__body"
    >
      <TittleLogo class="logo"></TittleLogo>
      <div></div>
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
          placeholder="Telefono"
          class="child input"
          v-model="phone"
          type="text"
          name="phone"
          value
        />

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
          name
          value
        />
      </template>
      <template v-if="estadoForm===3">
        <select
          class="child condominio_style"
          v-model="edificio"
        >
          <optgroup label="Condominios">

            <option
              v-for="edificio in edificios"
              v-bind:key="edificio.condominioId"
              :value="edificio.condominioId"
            >{{edificio.condominioNombre}}</option>

          </optgroup>

        </select>
        <input
          placeholder="Departamento"
          class="child input"
          v-model="departamento"
          type="text"
          name="departamento"
          value
        />
      </template>
      <div
        v-if="estadoForm===1"
        class="red child btn btn_next"
        name="button"
        v-on:click="nextForm2"
      >Siguiente</div>
      <div
        v-if="estadoForm===2"
        class="red child btn btn_next"
        name="button"
        v-on:click="nextForm3"
      >Siguiente</div>
      <div v-if="estadoForm===3">
        <button
          v-if="!loading"
          class="red child btn"
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
    </form>
    <router-link to="/entrar">login</router-link>
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
      departamento: "",
      edificio: -1,
      password: "",
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
      if (this.phone === "" || this.email === "" || this.password === "") {
        this.errors = "Falta completar datos";
        return;
      }
      this.errors = "";
      this.estadoForm = this.estadoForm + 1;
    },
    register() {
      if (this.phone === "" || this.email === "" || this.password === "") {
        this.errors = "Falta completar datos";
        return;
      }
      this.loading = true;
      this.$store
        .dispatch("register", {
          nombre: this.name,
          dni: this.dni,
          apellido: this.lastname,
          telefono: this.phone,
          correo: this.email,
          departamento: this.departamento,
          edificio: this.edificio,
          contraseña: this.password
        })
        .then(res => {
          console.log(res);
          this.loading = false;
          this.$router.push({ name: "LoginUser" });
          this.mensaje =
            "Hemos recibido sus datos, le avisaremos cuando habilitemos su cuenta";
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
$cel: 540px;
$tablet: 814px;
$laptop: 1025px;
$desk: 1300px;
form {
  margin: 0;
}
.container__body {
  justify-items: center;
  height: 75vh;
  display: grid;
  width: 60%;
  max-width: 1000px;
  margin: auto;
  grid-template-rows: auto 3vh auto auto 2fr 1fr 3fr;
}
.input {
  padding: 1.6em 2em;
}
.child {
  display: block;
  margin: 0.6em 0;
  height: 3em;
  width: 250px;
}
.btn {
  margin-top: 1.5em;
  width: 10em;
}
.logo {
  margin: 0 auto;
  width: 75%;
  @media screen and (min-width: $tablet) {
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
$ruler: 16px;
$color-red: #ff6531;
$color-bg: #f9f9f9;
$color-shadow: #e3e5e9;
$color-white: #fff;

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

  &.red {
    display: block;
    color: $color-red;
  }
}
.condominio_style {
  height: 50px;
  width: 250px;
  color: rgba(85, 85, 85, 0.863);
}
.preloader {
  margin-top: 1.6em;
  width: 60px;
  height: 60px;
}
</style>