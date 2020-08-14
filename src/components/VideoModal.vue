<template>
  <div>
    <div
      class="modal is-active"
      v-if="isActive"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          {{titleVideo}}
        </header>
        <section class="modal-card-body ">
          <video
            controls
            class="body"
          >
            <source
              :src="urlVideo"
              type="video/mp4"
            >
          </video>
        </section>
      </div>
      <button
        @click="toggle"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
    <button
      @click="toggle"
      class="button is-primary is-pulled-right"
    >Video</button>
    <br>
  </div>
</template>

<script>
export default {
  name: "VideoModal",
  props: {
    urlVideo: {
      type: String,
      required: true,
    },
    titleVideo: String,
  },

  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/bulma.scss";
/* @import "~bulma/css/bulma.css"; */
.body {
  height: 75vh !important;
}
</style>