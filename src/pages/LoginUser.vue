<template>
  <div>
    <Circle1 class="circle1"></Circle1>
    <Circle2 class="circle2"></Circle2>
    <form
      @submit.prevent="login"
      class="container__body"
    >
      <TittleLogo class="logo"></TittleLogo>
      <div></div>
      <input
        placeholder="Correo"
        class="child input"
        v-model="email"
        type="email"
        name="correo"
        value
      />

      <input
        placeholder="Contraseña"
        class="child input"
        v-model="password"
        type="password"
        name="contraseña"
        value
      />

      <button
        v-if="!loading"
        class="red child btn"
        type="submit"
        name="button"
      >Entrar</button>
      <div
        v-else
        class="preloader"
      ></div>
      <p>{{ error }}</p>
    </form>
    <router-link to="/registro">Registrarse</router-link>
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
      email: "",
      password: "",
      error: null,
      loading: false
    };
  },
  methods: {
    login() {
      if (this.email === "" || this.password === "") {
        this.error = "Falta completar datos";
        return;
      }
      this.loading = true;
      this.error = "";
      this.$store
        .dispatch("login", {
          correo: this.email,
          password: this.password
        })
        .then(() => {
          this.loading = false;
          this.$router.push({ name: "EventPage" });
        })
        .catch(err => {
          this.loading = false;
          console.log("user data is", err);
          this.error = err;
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
p {
  color: red;
}
.preloader {
  margin-top: 1.6em;
  width: 60px;
  height: 60px;
}
</style>