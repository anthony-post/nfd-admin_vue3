<template>
  <div class="select">
    <div class="select__text pretext">{{ pretext }}</div>
    <div class="select-block">
      <p
        class="select__title select__text"
        :class="{ placeholder: selectedDateTime }"
      >
        <span
          class="select__text-inside"
          @click="areOptionsVisible = !areOptionsVisible"
        >
          {{ dateTimeString }}
        </span>
        <span
          v-if="selectedDateTime"
          class="select__icon-inside"
          @click="resetOption"
        >
          <v-icon icon-id="icon-cross" width="8" height="8"></v-icon>
        </span>
      </p>
      <!--Options list-->
      <div class="select__options" v-if="areOptionsVisible">
        <div class="select__options-wrp">
          <div class="select__options-list">
            <p
              class="select__options-item select__text"
              v-for="option in optionsDate"
              :key="option.id"
              :class="[
                { item_blocked: option.value < chosenDateFromMs },
                { item_selected: option.value === selectedDate },
              ]"
              @click="selectDate(option)"
            >
              {{ option.dateString }}
            </p>
          </div>
          <div
            class="select__options-list"
            :class="{ list_blocked: !selectedDate }"
          >
            <p
              class="select__options-item select__text"
              v-for="option in optionsTime"
              :key="option.id"
              :class="[
                { item_blocked: isItemBlocked(option) },
                { item_selected: option.value === selectedTime },
              ]"
              @click="selectTime(option)"
            >
              {{ option.timeString }}
            </p>
          </div>
        </div>
        <button type="button" class="select__button" @click="selectOption">
          ОК
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";
import VIcon from "@/components/VIcon.vue";

import { convertToDate } from "@/services/convertDate.js";

export default {
  name: "VSelectDateTime",
  components: {
    VIcon,
  },
  props: {
    optionsDate: {
      type: Array,
      default() {
        return [];
      },
    },
    optionsTime: {
      type: Array,
      default() {
        return [];
      },
    },
    pretext: {
      type: String,
      default: "",
    },
    selectedDateTime: {
      type: [String, Number],
      default: 0,
    },
  },
  setup(props, context) {
    const store = useStore();

    const areOptionsVisible = ref(false);
    const selectedDate = ref(0);
    const selectedTime = ref(0);

    const chosenDateFromMs = computed(
      () => store.state.ordersModule.chosenDateFromMs
    );
    const chosenTimeFromMs = computed(
      () => store.state.ordersModule.chosenTimeFromMs
    );
    const chosenDateToMs = computed(
      () => store.state.ordersModule.chosenDateToMs
    );
    const chosenTimeToMs = computed(
      () => store.state.ordersModule.chosenTimeToMs
    );
    //выбранное значение даты и время в мс конвертируется в строку
    const dateTimeString = computed(() => {
      if (props.selectedDateTime) {
        return convertToDate(props.selectedDateTime);
      } else {
        return "Выберите дату и время";
      }
    });

    const selectDate = (option) => {
      context.emit("selectDate", option.value);
      selectedDate.value = option.value;
    };

    const selectTime = (option) => {
      context.emit("selectTime", option.value);
      selectedTime.value = option.value;
    };

    const selectOption = () => {
      const chosenDateTimeValue = selectedDate.value + selectedTime.value;
      context.emit("setDateTime", chosenDateTimeValue);
      areOptionsVisible.value = false;
    };

    const resetOption = () => {
      context.emit("resetDateTime");

      selectedDate.value = 0;
      selectedTime.value = 0;
      areOptionsVisible.value = false;
    };

    const isItemBlocked = (option) => {
      return (
        chosenDateFromMs.value === chosenDateToMs.value &&
        option.value <= chosenTimeFromMs.value
      );
    };

    return {
      areOptionsVisible,
      chosenDateFromMs,
      chosenTimeFromMs,
      chosenDateToMs,
      chosenTimeToMs,
      selectDate,
      selectTime,
      selectOption,
      resetOption,

      isItemBlocked,

      dateTimeString,
      selectedDate,
      selectedTime,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.select {
  display: flex;

  flex-direction: column;
  align-items: flex-start;
  width: 25%;
}
.select-block {
  position: relative;
  width: 100%;
  border: 0.5px solid #becad6;
  border-radius: 4px;
  padding: 8px 0;
  cursor: pointer;
}
.select__title {
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
}
.select__text-inside {
  cursor: pointer;
}

.select__icon-inside {
  margin-right: 10px;
  cursor: pointer;
}

.select__text {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 10.5px;
  line-height: 12px;
  color: $color-label;
}
.pretext {
  margin: 0 0 5px 0;
}
.placeholder {
  margin-left: 10px;
  color: $color-grey;
}
.select__options {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%);
  border-radius: 8px;
  left: 0;
  top: 30px;
  width: 100%;
  position: absolute;
  background: $color-white;
  text-align: center;
  z-index: 1;
  height: 20vh;
}

.select__options-wrp {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 80%;
}

.select__options-list {
  overflow-y: scroll;
  padding: 0 15px 0 0;
  color: $color-black;
}
.list_blocked {
  pointer-events: none;
  color: $color-grey;
  opacity: 0.5;
}
.select__options-item {
  text-align: center;
  cursor: pointer;
  &:hover {
    background: $color-grey-light;
  }
}
.item_blocked {
  pointer-events: none;
  opacity: 0.5;
}

.item_selected {
  color: $color-green;
}

.select__button {
  margin: 5px;
}
</style>
