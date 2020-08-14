<template>
  <div class="file has-name ">
    <label class="file-label ">
      <input
        class="file-input"
        type="file"
        name="resume"
        @change="previewFile"
        :accept="tipoFile"
      >
      <span class="file-cta">
        <span class="file-icon">
          <img
            src="../assets/subir.png"
            alt=""
          >
        </span>
        <span
          class="file-label"
          :class="{text_style:uploadValue > 0}"
        >
          {{mensajeDeCarga}}
        </span>
      </span>
      <span class="file-name">
        {{fileNameComputed}}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    tipoFile: {
      default: "image/*",
    },
    isDefaultFileName: Boolean,
    uploadValue: Number,
  },
  computed: {
    mensajeDeCarga() {
      if (this.uploadValue === 0) return this.text;
      return `subiendo ${Math.round(this.uploadValue)}% `;
    },
    fileNameComputed() {
      if (this.isDefaultFileName) return this.fileNameDefault;
      return this.fileName;
    },
  },
  data() {
    return {
      fileNameDefault: "Elige un archivo ...",
      fileName: "",
      /*   imageData: null,
      picture: null,
      uploadValue: 0, */
    };
  },
  methods: {
    previewFile(event) {
      /*   this.uploadValue = 0;
      this.picture = null;
       const imageData = event.target.files[0]; */
      const imageData = event.target.files[0];
      console.log(imageData, "hijo");
      this.fileName = imageData.name;
      this.$emit("previewFile", imageData);
    },
  },
  watch: {
    uploadEvent() {
      console.log("CAMBIO");
      if (this.uploadEvent) console.log("CAMBIO");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/bulma.scss";
@import "@/assets/styles/global.scss";
.text_style {
  color: $color-primary;
}
</style>