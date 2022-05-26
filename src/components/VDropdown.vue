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

    //TO DO закрытие ранее открытого dropdown и открытие dropdown, по которому кликнули
    // const showDropDown = event => {
    //   console.log(event);
    //   isDropDownVisible.value = true;
    // };

    // const showDropDown = event => {
    //   console.log(event);
    //   const elementsDropdown = document.querySelectorAll('.dropdown__input');
    //   for(let i = 0; i < elementsDropdown.length; i++) {
    //     if(isDropDownVisible.value && event.target.id !== elementsDropdown[i].id) {
    //       isDropDownVisible.value = false;
    //     }
    //   }
    // };

    // const chosenEl = ref("");
    // const closeDropDown = () => {
    //   if (chosenEl.value) {
    //     inputValue.value = chosenEl.value;
    //   } else {
    //     inputValue.value = "";
    //   }
    //   isDropDownVisible.value = false;
    // };

    const toggleDropDown = () => {
      isDropDownVisible.value = !isDropDownVisible.value;
    };

    const hideDropDown = (event) => {
      if (
        isDropDownVisible.value &&
        event.target.id !== inputRef.value.id
      ) {
        isDropDownVisible.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener("click", hideDropDown);

      //TO DO повесить слушатель на dropdown
      // const elemDropdown1 = document.querySelector('#dropdown1');
      // elemDropdown1.addEventListener('blur', closeDropDown);

      // const elemDropdown2 = document.querySelector('#dropdown2');
      // elemDropdown2.addEventListener('blur', closeDropDown);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", hideDropDown);
    });

    return {
      inputValue,
      isDropDownVisible,
      inputRef,
      filteredList,
      selectItem,
      resetSelection,
      toggleDropDown,
      // chosenEl,
      // closeDropDown,
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

  &:hover {
    background: #edf2f7;
    cursor: pointer;
  }
}
</style>
