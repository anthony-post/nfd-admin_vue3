<template>
  <div class="dropdown-wrp">
    <label :for="name" class="dropdown__label"></label>
    <!-- Dropdown Input -->
    <input
      v-model.trim="inputValue"
      :name="name"
      :placeholder="placeholder"
      type="text"
      autocomplete="off"
      class="dropdown__input"
      @focus="isDropDownVisible = true"
    />
    <div class="dropdown__icon-wrp" @click="isDropDownVisible = true">
      <div class="dropdown__icon dropdown__icon_up"></div>
      <div class="dropdown__icon dropdown__icon_down"></div>
    </div>
    <!-- Dropdown List -->
    <ul class="dropdown-list" v-show="isDropDownVisible">
      <li
        class="dropdown-item"
        v-for="item in filteredList"
        :key="item.id"
        @click="selectItem(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from "vue";
// import { ref, computed, onMounted, watch, toRef } from "vue";

export default {
  name: "VDropdown",
  props: {
    itemList: {
      type: Array,
      required: true,
    },
    selectedItem: {
      type: Object,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    //TO DO подставляет в инпут выбранное значение из store, если оно было выбрано и происходило переключение по вкладкам
    // onMounted(() => {
    //   if (Object.keys(props.selectedItem).length !== 0) {
    //     inputValue.value = props.selectedItem.name;
    //   } else {
    //     inputValue.value = "";
    //   }
    // });

    //TO DO отслеживает пустой объект в store.
    //если объект пустой, то значение инпута сбрасывается.
    //необходимо для того, чтобы в случае сброса города, пункт выдачи тоже сбрасывался
    // watch(
    //   toRef(props, "selectedItem"),
    //   () => {
    //     if (Object.keys(props.selectedItem).length === 0) {
    //       inputValue.value = "";
    //     }
    //   },
    //   { deep: true }
    // );

    const inputValue = ref("");
    const isDropDownVisible = ref(null);

    const filteredList = computed(() => {
      let currentInput = inputValue.value.toLowerCase();
      if (currentInput) {
        return props.itemList.filter((item) => {
          if (item?.name) {
            let currentName = item.name.toLowerCase();
            return currentName.startsWith(currentInput);
          }
        });
      } else {
        return props.itemList;
      }
    });

    const selectItem = (chosenItem) => {
      if (chosenItem) {
        inputValue.value = chosenItem.name;
      } else {
        inputValue.value = "";
      }
      isDropDownVisible.value = false;
      context.emit("on-item-selected", chosenItem);
    };

    const resetSelection = () => {
      inputValue.value = "";
      context.emit("on-item-reset");
    };

    return {
      inputValue,
      isDropDownVisible,
      filteredList,
      selectItem,
      resetSelection,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.dropdown-wrp {
  position: relative;
}

.dropdown__input {
  width: 110px;
  background: $color-white;
  border: 0.5px solid #becad6;
  border-radius: 4px;

  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  letter-spacing: -0.345714px;
  color: $color-dropdown-placeholder;

  padding: 8px 0 8px 14px;

  &:focus {
    outline: none;
  }
}

.dropdown__icon-wrp {
  position: absolute;
  top: 10px;
  right: 10px;
}

.dropdown__icon {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
}

.dropdown__icon_up {
  border-bottom: 4px solid #24375b;
  margin: 0 0 1px 0;
}

.dropdown__icon_down {
  border-top: 4px solid #24375b;
  margin: 1px 0 0 0;
}

.dropdown-list {
  list-style-type: none;
  padding: 0;
  position: absolute;
  width: 100%;
  max-height: 500px;
  margin: 4px 0 0 0;
  overflow-y: auto;
  z-index: 1;
  background: $color-white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
.dropdown-item {
  display: flex;
  padding: 11px 16px;

  &:hover {
    background: #edf2f7;
    cursor: pointer;
  }
}
</style>
