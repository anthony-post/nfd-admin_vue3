<template>
  <div class="dropdown-wrp">
    <label :for="name" class="dropdown__label"></label>
    <input
      v-model.trim="inputValue"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      type="text"
      autocomplete="off"
      class="dropdown__input"
      @click.self="toggleDropDown"
      ref="inputRef"
    />
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
import { onMounted, onBeforeUnmount } from "vue";
import { watch, toRef } from "vue";

export default {
  name: "VDropdown",
  props: {
    itemList: {
      type: Array,
      required: true,
    },
    selectedItem: {
      type: String,
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
    id: {
      type: String,
    },
  },
  setup(props, context) {
    const inputValue = ref("");
    const isDropDownVisible = ref(false);
    const inputRef = ref(null);

    const filteredList = computed(() => {
      const currentInput = inputValue.value.toLowerCase();
      if (currentInput) {
        return props.itemList.filter((item) => {
          if (item?.name) {
            const currentName = item.name.toLowerCase();
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
      context.emit("on-item-selected", chosenItem);
      isDropDownVisible.value = false;
    };

    const resetSelection = () => {
      inputValue.value = "";
      context.emit("on-item-reset");
    };

    const toggleDropDown = () => {
      isDropDownVisible.value = !isDropDownVisible.value;
    };

    const hideDropDown = (event) => {
      if (isDropDownVisible.value && event.target.id !== inputRef.value.id) {
        isDropDownVisible.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener("click", hideDropDown);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", hideDropDown);
    });

    watch(
      toRef(props, "selectedItem"),
      () => {
        // if (Object.keys(props.selectedItem).length === 0) {
        if (!props.selectedItem) {
          inputValue.value = "";
        }
      },
      { deep: true }
    );

    return {
      inputValue,
      isDropDownVisible,
      inputRef,
      filteredList,
      selectItem,
      resetSelection,
      toggleDropDown,
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
  color: $color-dropdown-placeholder;

  padding: 8px 0 8px 14px;

  background-image: url("../assets/icon_dropdown.svg");
  background-repeat: no-repeat no-repeat;
  background-position: 95%;
  background-size: 8px 11px;

  &:focus {
    outline: 0.5px ridge $color-blue;
  }
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

  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: $color-dropdown-placeholder;

  &:hover {
    background: #edf2f7;
    cursor: pointer;
  }
}
</style>
