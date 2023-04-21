<template>
  <div class="textarea-wrp">
    <label class="textarea__label" :for="id">{{ label }}</label>
    <textarea
      autocomplete="off"
      :name="name"
      :placeholder="placeholder"
      :value="inputValue"
      class="textarea__field textarea__text"
      @input="$emit('update:inputValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "VTextArea",
  props: {
    label: {
      type: String,
      default: "",
    },
    id: {
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

.textarea-wrp {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.textarea__label {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 10.5px;
  line-height: 12px;
  letter-spacing: -0.18421px;
  color: $color-label;
  margin: 0 0 5px 0;
}

.textarea__field {
  background: $color-white;
  border: 0.5px solid $color-border;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 0 8px 11px;
  margin: 0 0 15px 0;

  resize: none;

  &:focus {
    outline: 0.5px ridge $color-blue;
  }
}

.textarea__text {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: $color-black;
}
</style>
