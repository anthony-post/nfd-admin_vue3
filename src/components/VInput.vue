<template>
  <div class="input-wrp">
    <label class="input__label" :for="name">{{ label }}</label>
    <input
      class="input__field input__text"
      autocomplete="off"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :title="title"
      :value="inputValue"
      @input="$emit('update:inputValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "VInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    inputValue: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";
@import "@/assets/styles.scss";

.input-wrp {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.input__label {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 10.5px;
  line-height: 12px;
  letter-spacing: -0.18421px;
  color: $color-label;
  margin: 0 0 5px 0;
}

.input__field {
  background: $color-white;
  border: 0.5px solid $color-border;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 0 8px 11px;
  margin: 0 0 15px 0;

  &:focus {
    outline: 0.5px ridge $color-blue;
  }
}

.input__text {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: $color-black;
}
</style>
