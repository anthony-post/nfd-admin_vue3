<template>
  <div class="card">
    <h2 class="card__title">Карточка категории</h2>
    <div class="card-entity">
      <section class="card-entity__details">
        <h3 class="card-entity__title">Настройки категории</h3>
        <div class="card-entity__content">
          <div class="card-entity__data">
            <v-input
              v-model:inputValue="categoryName"
              label="Название категории"
              name="category-car"
              placeholder="Введите название категории"
              class="input input__entity-name"
            ></v-input>
          </div>
          <div class="card-entity__description">
            <v-text-area
              v-model:inputValue="categoryDescription"
              label="Описание категории"
              name="description-category"
              id="description-category"
              placeholder="Введите описание категории"
              class="input__entity-description"
            ></v-text-area>
          </div>
          <div class="card-entity__additional"></div>
        </div>
        <div class="card-entity__button-bar">
          <div class="card-entity__button">
            <v-button
              v-if="categoryId"
              type="button"
              theme="confirm"
              :disabled="!isFilledUp"
              :class="{ btn_disabled: !isFilledUp }"
              class="card-car__button-item"
              @click="changeCategoryItem"
            >
              Изменить
            </v-button>
            <v-button
              v-else
              type="button"
              theme="confirm"
              :disabled="!isFilledUp"
              :class="{ btn_disabled: !isFilledUp }"
              class="card-car__button-item"
              @click="createCategoryItem"
            >
              Сохранить
            </v-button>
            <v-button
              type="button"
              theme="cancel"
              class="card-car__button-item"
              @click="resetCategoryItem"
            >
              Отменить
            </v-button>
          </div>
          <v-button
            type="button"
            theme="delete"
            class="card-car__button-item"
            :disabled="!categoryId"
            :class="{ btn_disabled: !categoryId }"
            @click="deleteCategoryItem"
          >
            Удалить
          </v-button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";

import VInput from "../components/VInput.vue";
import VTextArea from "../components/VTextArea.vue";
import VButton from "../components/VButton.vue";

import { entityAPI } from "@/api/entityAPI";

export default {
  name: "CardCategory",
  components: {
    VInput,
    VTextArea,
    VButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const selectedCategory = computed(
      () => store.state.categoriesModule.selectedCategory
    );

    const categoryId = computed({
      get: () => {
        return Object.keys(selectedCategory.value).length !== 0
          ? selectedCategory.value?.id
          : null;
      },
      set: (newCategoryId) =>
        store.commit(
          "categoriesModule/SET_CATEGORY_ID_TO_STATE",
          newCategoryId
        ),
    });

    const categoryName = computed({
      get: () => {
        return Object.keys(selectedCategory.value).length !== 0
          ? selectedCategory.value?.name
          : null;
      },
      set: (categoryName) =>
        store.commit(
          "categoriesModule/SET_CATEGORY_NAME_TO_STATE",
          categoryName
        ),
    });

    const categoryDescription = computed({
      get: () => {
        return Object.keys(selectedCategory.value).length !== 0
          ? selectedCategory.value?.description
          : null;
      },
      set: (categoryDescription) =>
        store.commit(
          "categoriesModule/SET_CATEGORY_DESCRIPTION_TO_STATE",
          categoryDescription
        ),
    });

    const createCategoryItem = async () => {
      const newCategoryItem = await entityAPI.postCreateCategoryItem({
        name: categoryName.value,
        description: categoryDescription.value,
      });

      categoryId.value = newCategoryItem.data.data.id;
    };

    const deleteCategoryItem = async () => {
      await entityAPI.deleteCategoryItem(categoryId.value);
      store.commit("categoriesModule/RESET_SELECTEDCATEGORY_TO_STATE");
      router.push({ name: "card-category" });
    };

    const resetCategoryItem = () => {
      store.commit("categoriesModule/RESET_SELECTEDCATEGORY_TO_STATE");
      router.push({ name: "categories" });
    };

    const changeCategoryItem = async () => {
      await entityAPI.putChangeCategoryItem(categoryId.value, {
        name: categoryName.value,
        description: categoryDescription.value,
      });
    };

    const isFilledUp = computed(
      () => categoryName.value && categoryDescription.value
    );

    return {
      selectedCategory,
      categoryId,
      categoryName,
      categoryDescription,
      createCategoryItem,
      deleteCategoryItem,
      resetCategoryItem,
      changeCategoryItem,
      isFilledUp,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.card-entity {
  display: flex;
  flex-direction: row;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    flex-direction: column;
  }

  &__details {
    width: 100%;
    background: $color-white;
    box-shadow: 0px 2px 4px rgba(90, 97, 105, 0.12);
    border-radius: 9px;
    padding: 20px;
    margin: 0 20px 0 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      width: 100%;
      border-radius: 0;
      margin: 0;
      padding: 0;
    }
  }

  &__title {
    font-family: $font2;
    font-style: normal;
    font-weight: 500;
    font-size: 17.5px;
    line-height: 21px;
    color: $color-text;
    margin: 0 0 20px 0;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      padding: 0 10px;
      margin: 20px 0;
    }
  }

  &__content {
    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      padding: 10px;
    }
  }

  &__data {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -10px;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      margin: 0;
      flex-direction: column;
    }
  }

  &__additional {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 -10px;
  }

  &__button-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      padding: 10px;
      flex-direction: column;
    }
  }

  &__button {
    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      display: flex;
      flex-direction: column;
    }
  }

  &__button-item {
    margin: 0 12px;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      margin: 5px 0;
      width: 100%;
    }
  }
}

.input {
  &__entity-name {
    width: 50%;
    padding: 20px 10px;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      width: 100%;
      padding: 0;
    }
  }
}
</style>
