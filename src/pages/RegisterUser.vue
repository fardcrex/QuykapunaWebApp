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
      <template v-if="!isNext">
        <input
          placeholder="Dni"
          class="child input"
          v-model="dni"
          type="number"
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
      <template v-if="isNext">
        <input
          placeholder="Telefono"
          class="child input"
          v-model="phone"
          type="number"
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

      <button
        v-if="!isNext"
        class="red child btn"
        name="button"
        v-on:click="nextForm"
      >Siguiente</button>
      <button
        v-if="isNext"
        class="red child btn"
        type="submit"
        name="button"
        v-on:click="changeIsRegister"
      >Registrarse</button>
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
export default {
  components: { Circle1, Circle2, TittleLogo },
  data() {
    return {
      name: "",
      dni: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      errors: null,
      mensaje: "",
      isNext: false,
      isRegister: false
    };
  },
  methods: {
    nextForm() {
      if (this.dni === "" || this.name === "" || this.lastname === "") {
        this.errors = "Falta completar datos";
        return;
      }
      this.errors = "";
      this.isNext = true;
    },
    changeIsRegister() {
      console.log("holaconsola");
      this.isRegister = true;
    },
    register() {
      if (!this.isNext || !this.isRegister) {
        return;
      }
      if (this.phone === "" || this.email === "" || this.password === "") {
        this.errors = "Falta completar datos";
        return;
      }
      this.$store
        .dispatch("register", {
          nombre: this.name,
          dni: this.dni,
          apellido: this.lastname,
          telefono: this.phone,
          correo: this.email,
          contraseña: this.password
        })
        .then(() => {
          this.mensaje =
            "Hemos recibido sus datos, le avisaremos cuando habilitemos su cuenta";
        })
        .catch(err => {
          console.log("user data is", err);
          this.error = err.response.data.error;
        });
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
  height: 80vh;
  display: grid;
  width: 60%;
  max-width: 1000px;
  margin: auto;
  grid-template-rows: auto 1fr 2fr 2fr 2fr 2fr 1fr 3fr;
}
.input {
  padding: 1.6em 2em;
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
  width: 80%;
  @media screen and (min-width: $tablet) {
    width: 60%;
  }
  @media screen and (min-width: $laptop) {
    width: 40%;
  }
}
.error {
  color: red;
}
.mensaje {
  color: green;
  width: 80%;
}
</style>