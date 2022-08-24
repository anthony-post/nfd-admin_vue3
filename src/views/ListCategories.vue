<template>
  <div class="entity-wrp entity">
    <div class="entity__title-wrp">
      <h2 class="entity__title">Категории автомобилей</h2>
      <router-link to="card-category">
        <v-button type="button" theme="confirm" class="card-car__button-item">
          Добавить
        </v-button>
      </router-link>
    </div>
    <section class="entity-container">
      <div class="entity__header">
        <div class="header-dropdown">
          <v-dropdown
            id="dropdownCategory"
            :itemList="categoryList"
            :selectedItem="selectedCarCategory"
            name="category"
            placeholder="Категория"
            class="header-dropdown__item"
            @on-item-selected="setSelectedCarCategory"
          ></v-dropdown>
        </div>
        <div class="header-btn__container">
          <v-button
            type="button"
            theme="delete"
            :disabled="noFilter"
            :class="{ btn_disabled: noFilter }"
            class="header-btn__item"
            @click="rejectFilter"
          >
            Сбросить
          </v-button>
          <v-button
            type="button"
            theme="confirm"
            :disabled="noFilter"
            :class="{ btn_disabled: noFilter }"
            class="header-btn__item"
            @click="applyFilter"
          >
            Применить
          </v-button>
        </div>
      </div>
      <table class="table-content table">
        <tr class="table-header">
          <th
            v-for="item in listTableHeaders"
            :key="item"
            class="table__header-item table__header-item_category"
          >
            {{ item }}
          </th>
        </tr>
        <tr
          v-for="category in dataCategoryList"
          :key="category.id"
          class="table-data"
        >
          <td class="table__data-item">{{ category.name }}</td>
          <td class="table__data-item">{{ category.description }}</td>
          <td class="table__data-item table__button-container">
            <router-link
              :to="{
                name: 'card-category_id',
                params: { id: category?.id },
              }"
            >
              <button
                type="button"
                class="table__button-item"
                @click="setCategoryCard(category)"
              >
                <v-icon
                  icon-id="icon-edit"
                  width="12"
                  height="11"
                  class="table__button-item_edit"
                ></v-icon>
                <span class="visualy-hidden">Изменить</span>
              </button>
            </router-link>
            <button
              type="button"
              class="table__button-item"
              @click="deleteCategoryItem(category)"
            >
              <v-icon
                icon-id="icon-reject"
                width="12"
                height="11"
                class="table__button-item_reject"
              ></v-icon>
              <span class="visualy-hidden">Удалить</span>
            </button>
          </td>
        </tr>
      </table>
      <div class="entity__pagination">
        <v-pagination
          :totalPages="totalPages"
          :currentPage="currentPage"
          @pagechanged="onPageChange"
        ></v-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed } from "vue";

import VDropdown from "../components/VDropdown.vue";
import VPagination from "../components/VPagination.vue";
import VIcon from "../components/VIcon.vue";
import VButton from "../components/VButton.vue";

import { entityAPI } from "@/api/entityAPI";

export default {
  name: "ListCategories",
  components: {
    VDropdown,
    VPagination,
    VIcon,
    VButton,
  },
  setup() {
    const store = useStore();

    const filterCarCategory = ref("no-filter");
    const selectedCarCategory = ref(null);

    const listTableHeaders = ["Название", "Описание", "Действия"];

    const categoryList = computed(
      () => store.state.categoryModule.categoryList
    );

    const noFilter = computed(() => !selectedCarCategory.value);

    const setSelectedCarCategory = (chosenCarCategory) => {
      selectedCarCategory.value = chosenCarCategory.id;
    };

    const applyFilter = () => {
      store.commit(
        "categoriesModule/RESET_PAGINATED_FILTERED_CATEGORIES_TO_STATE"
      );
      filterCarCategory.value = selectedCarCategory.value;
      currentPage.value = 1;
      getPaginateCategoryListFromApi(filterCarCategory.value);
    };

    const rejectFilter = () => {
      store.commit(
        "categoriesModule/RESET_PAGINATED_FILTERED_CATEGORIES_TO_STATE"
      );
      selectedCarCategory.value = null;
      filterCarCategory.value = "no-filter";
      currentPage.value = 1;
      getPaginateCategoryListFromApi(filterCarCategory.value);
    };

    const filteredCategoryList = computed(() => {
      return store.state.categoriesModule.categories.data || [];
    });

    const dataCategoryList = computed(() => {
      if (filteredCategoryList.value instanceof Array) {
        return filteredCategoryList.value;
      } else {
        const arr = [];
        arr.push(filteredCategoryList.value);
        return arr;
      }
    });

    const categoryItem = computed(
      () => store.state.categoriesModule.selectedCategory
    );

    const getCategoryListFromApi = () =>
      store.dispatch("categoryModule/GET_GATEGORYLIST_FROM_API");

    const getPaginateCategoryListFromApi = async (chosenCarCategoryId) => {
      //на бэке первая страница начинается с 0
      const selectedPage = currentPage.value - 1;
      const limitPage = limitPerPage.value;
      await store.dispatch(
        "categoriesModule/GET_PAGINATED_FILTERED_CATEGORYLIST_FROM_API",
        {
          chosenCarCategoryId,
          selectedPage,
          limitPage,
        }
      );
    };

    //API call
    const getData = async () => {
      await getCategoryListFromApi();
      getPaginateCategoryListFromApi(filterCarCategory.value);
    };
    getData();

    //Pagination
    const limitPerPage = ref(5);

    const currentPage = ref(1);

    const totalItems = computed(
      () => store.state.categoriesModule.categories.count
    );

    const totalPages = computed(() =>
      Math.ceil(totalItems.value / limitPerPage.value) > 0
        ? Math.ceil(totalItems.value / limitPerPage.value)
        : 1
    );

    const onPageChange = (page) => {
      store.commit(
        "categoriesModule/RESET_PAGINATED_FILTERED_CATEGORIES_TO_STATE"
      );
      currentPage.value = page;
      getPaginateCategoryListFromApi(filterCarCategory.value);
    };

    const deleteCategoryItem = async (category) => {
      const categoryId = category.id;
      await entityAPI.deleteCategoryItem(categoryId);
    };

    const setCategoryCard = (category) => {
      store.commit("categoriesModule/SET_SELECTEDCATEGORY_TO_STATE", category);
    };

    return {
      listTableHeaders,
      filterCarCategory,
      selectedCarCategory,
      categoryList,
      noFilter,
      setSelectedCarCategory,
      applyFilter,
      rejectFilter,
      filteredCategoryList,
      dataCategoryList,
      categoryItem,
      getCategoryListFromApi,
      limitPerPage,
      currentPage,
      totalItems,
      totalPages,
      onPageChange,
      deleteCategoryItem,
      setCategoryCard,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.table {
  &__header-item_rate {
    width: 33.333%;
  }
}
</style>
