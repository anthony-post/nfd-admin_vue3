<template>
  <button
    :type="type"
    class="base-button"
    :class="[getThemeButton]"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  name: "VButton",
  props: {
    type: {
      type: String,
      default: "button",
      required: true,
    },
    theme: {
      type: String,
      default: "confirm",
      validator: (theme) => ["confirm", "delete", "cancel"].includes(theme),
    },
  },
  setup(props) {
    const getThemeButton = computed(() => `base-button_${props.theme}`);

    return {
      getThemeButton,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.base-button {
  width: 110px;
  height: 30px;
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 11.5px;
  line-height: 13px;
  text-align: center;
  color: $color-white;
  border-radius: 4px;
  cursor: pointer;

  &_confirm {
    background: $color-button-confirm;
    border: 0.5px solid $color-blue;

    &:hover {
      background: linear-gradient(90deg, #409aff 2.61%, #64afff 112.6%);
    }
    &:active {
      background: linear-gradient(90deg, #409aff 2.61%, #64afff 112.6%);
    }
  }

  &_delete {
    background: $color-button-delete;
    border: 0.5px solid $color-button-delete;

    &:hover {
      background: linear-gradient(90deg, #c74d62 2.61%, #c9657a 112.6%);
    }
    &:active {
      background: linear-gradient(90deg, #c74d62 2.61%, #c9657a 112.6%);
    }
  }

  &_cancel {
    color: $color-text;
    background: $color-button-cancel;
    border: 0.5px solid $color-button-cancel;

    &:hover {
      background: linear-gradient(90deg, #d2cccc 2.61%, #efefef 112.6%);
    }
    &:active {
      background: linear-gradient(90deg, #d2cccc 2.61%, #efefef 112.6%);
    }
  }
}
</style>
