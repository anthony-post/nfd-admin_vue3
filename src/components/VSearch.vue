<template>
  <div class="search-wrp">
    <label :for="name"></label>
    <input
      :name="name"
      :placeholder="placeholder"
      type="text"
      autocomplete="off"
      class="search__input"
    />
    <v-icon
      icon-id="icon-search"
      width="15"
      height="15"
      class="search__icon"
    ></v-icon>
  </div>
</template>

<script>
import VIcon from "../components/VIcon.vue";

export default {
  name: "VSearch",
  components: {
    VIcon,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.search-wrp {
  position: relative;
}

.search__input {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: -0.0928572px;
  color: $color-search-input;
  border: none;
  padding: 0 0 0 30px;
  width: 60%;

  &:focus {
    outline: none;
  }
}

.search__icon {
  position: absolute;
  left: 5px;
  top: 3px;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    left: 15px;
    top: 13px;
  }
}
</style>
