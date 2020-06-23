<template>
  <div id="app">
    <app-nav />
    <router-view class="page" />
  </div>
</template>
<script>
import AppNav from "./components/AppNav";

export default {
  components: { AppNav }
};
</script>
<style lang="scss">
@import "./assets/styles/normalize.css";
@import "./assets/styles/global.scss";

$cel: 540px;
$tablet: 814px;
$laptop: 1025px;
$desk: 1300px;

.circle1 {
  position: fixed;
  z-index: -10;
  height: 30%;
  left: -10%;
  bottom: 0;
  @media screen and (min-width: $tablet) {
    height: 35%;
    left: -5%;
  }
  @media screen and (min-width: $laptop) {
    height: 40%;
    left: 0;
  }
}
.circle2 {
  position: fixed;
  z-index: -20;
  height: 30%;
  right: -10%;
  top: 0;
  @media screen and (min-width: $tablet) {
    height: 35%;
    right: -5%;
  }
  @media screen and (min-width: $laptop) {
    height: 43%;
    right: 0;
  }
}
</style>

