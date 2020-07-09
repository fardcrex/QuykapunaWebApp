<template>

  <div
    v-if="isPlus"
    class="sizeIcon"
  >
    <svg
      class="sizeSvg"
      viewBox="0 0 427 427"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0)">
        <path
          d="M405.332 192H234.668V21.332C234.668 9.55859 225.109 0 213.332 0C201.559 0 192 9.55859 192 21.332V192H21.332C9.55859 192 0 201.559 0 213.332C0 225.109 9.55859 234.668 21.332 234.668H192V405.332C192 417.109 201.559 426.668 213.332 426.668C225.109 426.668 234.668 417.109 234.668 405.332V234.668H405.332C417.109 234.668 426.668 225.109 426.668 213.332C426.668 201.559 417.109 192 405.332 192V192Z"
          fill="#FF6531"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width="426.667"
            height="426.667"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>

  </div>
  <div
    v-else
    class="sizeIcon"
  >
    <svg
      class="sizeSvg"
      viewBox="0 0 410 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M392.533 0.73291H17.067C7.641 0.73291 0 8.37391 0 17.7999C0 27.2259 7.641 34.8669 17.067 34.8669H392.534C401.96 34.8669 409.601 27.2259 409.601 17.7999C409.601 8.37391 401.959 0.73291 392.533 0.73291Z"
        fill="#FF6531"
      />
    </svg>

  </div>

</template>

<script>
export default {
  name: "BaseCircularButton",
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    isPlus() {
      if (this.type == "plus") return true;
      return false;
    },
    isMinus() {
      if (this.type == "minus") return true;
      return false;
    }
  },
  data() {
    return {
      size: 16
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.sizeSvg {
  width: 14px;
  height: 14px;
  @media screen and (min-width: $notebook) {
    width: 16px;
    height: 16px;
  }
}
.sizeIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: $color-bg;

  border-radius: 50%;
  box-shadow: $shadow-neumorphic;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  cursor: pointer;
  color: $color-primary;
  transition: all 0.5s ease;
  @media screen and (min-width: $notebook) {
    width: 2.5rem;
    height: 2.5rem;
  }
  &:active {
    box-shadow: $inner-shadow;
    color: $color-primary;
  }
  &:hover {
    color: $color-primary;
  }
}
</style>