<template>
  <div class="search-wrp">
    <label :for="name"></label>
    <input
      v-model.trim="inputValue"
      :name="name"
      :placeholder="placeholder"
      type="text"
      autocomplete="off"
      class="search__input"
      @keyup.enter="getEntity"
    />
    <v-icon
      icon-id="icon-search"
      width="15"
      height="15"
      class="search__icon"
    ></v-icon>
    <ul class="search__dropdown-list" v-show="isDropDownVisible">
      <li
        class="search__dropdown-item"
        v-for="(item, index) in searchList"
        :key="index"
        :class="[
          {
            'search__dropdown-item_chosen':
              filteredList.length > 0 && filteredList.includes(item),
          },
        ]"
        @click="selectItem(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import VIcon from "../components/VIcon.vue";

export default {
  name: "VSearch",
  components: {
    VIcon,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
  },
  setup() {
    const router = useRouter();

    const entities = {
      orders: "заказы",
      cars: "машины",
      cities: "города",
      pickuppoints: "пункты выдачи",
      rates: "тарифы",
      typerates: "типы тарифов",
      categories: "категории",
      orderstatuses: "статусы заказов",
    };

    const searchList = computed(() => Object.values(entities));

    const inputValue = ref("");

    const getEntity = () => {
      const val = searchList.value.filter((item) =>
        item.includes(inputValue.value.toLowerCase())
      );
      for (let key in entities) {
        if (val.includes(entities[key])) {
          router.push({ name: key });
          inputValue.value = "";
        }
      }
    };

    const isDropDownVisible = computed(() => (inputValue.value ? true : false));

    const filteredList = computed(() => {
      const currentInput = inputValue.value?.toLowerCase();
      if (currentInput) {
        return searchList.value.filter((item) => {
          if (item) {
            const currentName = item.toLowerCase();
            return currentName.startsWith(currentInput);
          }
        });
      } else {
        return [];
      }
    });

    const selectItem = (chosenItem) => {
      if (chosenItem) {
        inputValue.value = chosenItem;
        getEntity();
      } else {
        inputValue.value = "";
      }
    };

    return {
      inputValue,
      getEntity,
      isDropDownVisible,
      filteredList,
      searchList,
      selectItem,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.search-wrp {
  position: relative;
}

.search__input {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: -0.0928572px;
  color: $color-search-input;
  border: none;
  padding: 0 0 0 30px;

  @media #{$media} and (min-width: $tablet-min) and (max-width: $tablet-max) {
    padding: 0 0 0 35px;
  }

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    padding: 0 0 0 35px;
  }

  &:focus {
    outline: none;
  }
}

.search__icon {
  position: absolute;
  left: 5px;
  top: 3px;

  @media #{$media} and (min-width: $tablet-min) and (max-width: $tablet-max) {
    left: 25px;
    top: 13px;
  }

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    left: 25px;
    top: 13px;
  }
}

.search__dropdown-list {
  list-style-type: none;
  padding: 0;
  position: absolute;
  width: 50%;
  max-height: 500px;
  margin: 4px 0 0 0;
  overflow-y: auto;
  z-index: 1;
  background: $color-white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
.search__dropdown-item {
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

  &_chosen {
    background: $color-grey-light;
  }
}
</style>
