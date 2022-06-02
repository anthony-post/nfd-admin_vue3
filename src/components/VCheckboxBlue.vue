<template>
  <label class="checkbox checkbox__item">
    <slot></slot>
    <input class="checkbox__input" type="checkbox" checked />
    <span class="checkmark-box"></span>
  </label>
</template>

<script>
export default {
  name: "VCheckboxBlue",
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.checkbox {
  display: block;
  position: relative;

  font-family: $font2;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: $color-label;

  pointer-events: none; //block switching checkbox

  &__item {
    padding-left: 25px;
    margin-bottom: 7px;
  }

  &__input {
    height: 0;
    width: 0;
    position: absolute;
    opacity: 0;
  }
}

.checkmark-box {
  position: absolute;
  top: 0;
  left: 0;
  height: 13px;
  width: 13px;

  background: $color-blue;
  border-radius: 2px;
}
.checkbox:hover input ~ .checkmark-box {
  border: 1px solid $color-blue;
}
.checkbox__input:checked ~ .checkmark-box {
  border: 1px solid $color-blue;
}
.checkmark-box:after {
  content: "";
  position: absolute;
  display: none;
}
.checkbox__input:checked ~ .checkmark-box:after {
  display: block;
}
.checkbox .checkmark-box:after {
  left: 4px;
  top: -1px;
  width: 3px;
  height: 8px;

  border: solid $color-white;
  border-width: 0 2px 2px 0;
  border-radius: 1px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
