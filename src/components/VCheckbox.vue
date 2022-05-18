<template>
  <label class="checkbox-item">
    <slot></slot>
    <input
      class="checkbox__input"
      type="checkbox"
    />
    <span class="checkmark-box"></span>
  </label>
</template>

<script>
export default {
    name: "VCheckbox",
}
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.checkbox-item {
  display: block;
  position: relative;
  padding-left: 25px;
  margin-bottom: 7px;
  cursor: pointer;
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: $color-grey;
}


.checkbox__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark-box {
  position: absolute;
  top: 0;
  left: 0;
  height: 13px;
  width: 13px;
  border: 0.5px solid #BECAD6;
  border-radius: 1px;
}
.checkbox-item:hover input ~ .checkmark-box {
  border: 1px solid $color-green;
}
.checkbox__input:checked ~ .checkmark-box {
  border: 1px solid $color-green;
}
.checkmark-box:after {
  content: "";
  position: absolute;
  display: none;
}
.checkbox__input:checked ~ .checkmark-box:after {
  display: block;
}
.checkbox-item .checkmark-box:after {
  left: 4px;
  top: -1px;
  width: 3px;
  height: 8px;
  border: solid $color-black;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>