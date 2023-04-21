<template>
  <label class="checkbox checkbox__item" :class="{ item_active: isChecked }">
    {{ label }}
    <input
      class="checkbox__input"
      type="checkbox"
      :checked="isChecked"
      @change="updateInput"
    />
    <span class="checkmark-box"></span>
  </label>
</template>

<script>
import { computed } from "vue";

export default {
  name: "VCheckbox",
  props: {
    modelValue: null,
    label: {
      type: String,
      required: true,
    },
    trueValue: {
      default: true,
    },
    falseValue: {
      default: false,
    },
  },
  setup(props, context) {
    const isChecked = computed(() => {
      if (props.modelValue instanceof Array) {
        return props.modelValue.includes(props.value);
      }
      return props.modelValue === props.trueValue;
    });

    const updateInput = (event) => {
      const isChecked = event.target.checked;
      if (props.modelValue instanceof Array) {
        const newValue = [...props.modelValue];
        if (isChecked) {
          newValue.push(props.value);
        } else {
          newValue.splice(newValue.indexOf(props.value), 1);
        }
        context.emit("update:modelValue", newValue);
      } else {
        context.emit(
          "update:modelValue",
          isChecked ? props.trueValue : props.falseValue
        );
      }
    };

    return {
      isChecked,
      updateInput,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.checkbox {
  display: block;
  position: relative;
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: $color-grey;

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
  border: 0.5px solid #becad6;
  border-radius: 1px;
}
.checkbox:hover input ~ .checkmark-box {
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
.checkbox .checkmark-box:after {
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

.item_active {
  color: $color-black;
}
</style>
