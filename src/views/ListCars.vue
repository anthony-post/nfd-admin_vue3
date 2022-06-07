<template>
  <div class="entity-wrp entity">
    <h2 class="entity__title">Автомобили</h2>
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
        <div class="header-button">
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
            class="table__header-item table__header-item_car"
          >
            {{ item }}
          </th>
        </tr>
        <tr v-for="car in filteredCarList" :key="car.id" class="table-data">
          <td class="table__data-item">{{ car?.name }}</td>
          <td class="table__data-item">{{ car?.categoryId?.name }}</td>
          <td class="table__data-item">
            <div v-for="(item, index) in car?.colors" :key="index">{{ item }}</div>
          </td>
          <td class="table__data-item">
            {{ car?.priceMin }} - {{ car?.priceMax }}
          </td>
          <td class="table__data-item">
            <button
              type="button"
              class="table__button-item_car"
              @click="togglePopUp(car)"
            >
              ...
            </button>
          </td>
        </tr>
        <pop-up
          v-if="popUpIsActive"
          :carItem = carItem
          class="table__item-popup"
          @close-popup="togglePopUp()"
        ></pop-up>
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
import VButton from "../components/VButton.vue";
import PopUp from "../views/PopUp.vue";

export default {
  name: "ListCars",
  components: {
    VDropdown,
    VPagination,
    VButton,
    PopUp,
  },
  setup() {
    const store = useStore();

    const filterCarCategory = ref("no-filter");
    const selectedCarCategory = ref(null);

    const listTableHeaders = ["Модель", "Катег.", "Цвет", "Цена", "Подробнее"];

    const categoryList = computed(() => store.state.carsModule.categoryList);

    const noFilter = computed(() => !selectedCarCategory.value);

    const setSelectedCarCategory = chosenCarCategory => {
      selectedCarCategory.value = chosenCarCategory.id;
    };

    const applyFilter = () => {
      store.commit("carsModule/RESET_CARS_TO_STATE");
      filterCarCategory.value = selectedCarCategory.value;
      currentPage.value = 1;
      getPaginateCarListFromApi(filterCarCategory.value);
    };

    const rejectFilter = () => {
      store.commit("carsModule/RESET_CARS_TO_STATE");
      selectedCarCategory.value = null;
      filterCarCategory.value = "no-filter";
      currentPage.value = 1;
      getPaginateCarListFromApi(filterCarCategory.value);
    };

    const filteredCarList = computed(() => {
      return store.state.carsModule.cars.data || []
    });

    const carItem = computed(() => store.state.carsModule.selectedCar);

    const popUpIsActive = ref(false);

    const togglePopUp = (car) => {
      store.dispatch("carsModule/GET_SELECTEDCAR_FROM_API", car);
      popUpIsActive.value = !popUpIsActive.value;
    };

    const getCategoryListFromApi = () =>
      store.dispatch("carsModule/GET_CATEGORYLIST_FROM_API");

    const getPaginateCarListFromApi = async (chosenCarCategoryId) => {
      //на бэке первая страница начинается с 0
      const selectedPage = currentPage.value - 1;
      const limitPage = limitPerPage.value;
      await store.dispatch("carsModule/GET_CARLIST_FROM_API", { chosenCarCategoryId, selectedPage, limitPage });
    };

    //API call
    const getData = async () => {
      await getCategoryListFromApi();
      getPaginateCarListFromApi(filterCarCategory.value);
    };
    getData();

    //Pagination
    const limitPerPage = ref(3);

    const currentPage = ref(1);

    const totalItems = computed(() => store.state.carsModule.cars.count);

    const totalPages = computed(() => 
      Math.ceil(totalItems.value / limitPerPage.value) > 0 ? Math.ceil(totalItems.value / limitPerPage.value) : 1);

    const onPageChange = page => {
      store.commit("carsModule/RESET_CARS_TO_STATE");
      currentPage.value = page;
      getPaginateCarListFromApi(filterCarCategory.value);
    };

    return {
      filterCarCategory,
      selectedCarCategory,
      categoryList,
      setSelectedCarCategory,
      applyFilter,
      rejectFilter,
      noFilter,
      listTableHeaders,
      popUpIsActive,
      togglePopUp,
      filteredCarList,
      limitPerPage,
      currentPage,
      totalItems,
      totalPages,
      onPageChange,
      carItem,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.entity {
  &__title {
    margin: 0;
    font-family: $ff;
    font-style: normal;
    font-weight: 400;
    font-size: 29px;
    line-height: 33px;
    letter-spacing: -0.725px;
    color: $color-text;
    padding: 25px;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      padding: 10px 25px;
      font-size: 19px;
    }
  }
  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px -0.5px 0px #e0e2e8, 0px 0.5px 0px #e0e2e8;
    padding: 15px 20px;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      flex-wrap: wrap;
      justify-content: center;
      padding: 15px 15px 5px 15px;
    }
  }
  &__pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-shadow: 0px -0.5px 0px #e0e2e8, 0px 0.5px 0px #e0e2e8;
    padding: 20px 0;
  }
}

.entity-container {
  position: relative;

  background: $color-white;
  box-shadow: 0px 2px 0px rgba(90, 97, 105, 0.11),
    0px 4px 8px rgba(90, 97, 105, 0.12), 0px 10px 10px rgba(90, 97, 105, 0.06),
    0px 7px 70px rgba(90, 97, 105, 0.1);
  border-radius: 9px;
  margin: 0 25px;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    margin: 0 5px;
  }
}

.header-dropdown {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    justify-content: center;
  }

  &__item {
    margin: 5px;
  }
}

.header-button {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;

  &__item {
    font-family: $ff;
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    letter-spacing: -0.345714px;
    color: $color-white;

    border-radius: 4px;
    box-sizing: border-box;

    width: 95px;
    margin: 5px;
    padding: 8px 0;

    &_submit {
      background: $color-blue;
      border: 0.5px solid $color-blue;
    }

    &_reset {
      background: $color-red;
      border: 0.5px solid $color-red;
    }
  }
}

.table-content {
  height: 50vh;
  overflow-x: scroll;
  width: 100%;
  padding: 15px 20px 20px;
  text-align: left;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    padding: 10px;
    height: 40vh;
  }
}

.table {
  &__header-item {
    padding: 0 0 15px 0;
    &_car {
      width: 20%;
    }
  }

  &__data-item {
    padding: 5px 0;
  }

  &__button-item_car {
    font-family: $ff;
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: $color-grey;

    background: $color-white;
    border: 0.5px solid #becad6;
    border-radius: 4px;
    box-sizing: border-box;
    width: 50px;
  }

  &__item-popup {
    position: absolute;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.table-header {
  font-family: $ff;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.377143px;
  color: $color-text;
}

.table-data {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.377143px;
  color: $color-text;
}
</style>
