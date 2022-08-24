<template>
  <div class="entity-wrp entity">
    <div class="entity__title-wrp">
      <h2 class="entity__title">Города</h2>
      <router-link to="card-city">
        <v-button type="button" theme="confirm" class="card-car__button-item">
          Добавить
        </v-button>
      </router-link>
    </div>
    <section class="entity-container">
      <div class="entity__header">
        <div class="header-dropdown">
          <v-dropdown
            id="dropdownCity"
            :itemList="cityList"
            :selectedItem="selectedCity"
            name="city"
            placeholder="Город"
            class="header-dropdown__item"
            @on-item-selected="setSelectedCity"
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
            class="table__header-item table__header-item_city"
          >
            {{ item }}
          </th>
        </tr>
        <tr v-for="city in dataCityList" :key="city.id" class="table-data">
          <td class="table__data-item">{{ city.name }}</td>
          <td class="table__data-item table__button-container">
            <router-link
              :to="{
                name: 'card-city_id',
                params: { id: city?.id },
              }"
            >
              <button
                type="button"
                class="table__button-item"
                @click="setCityCard(city)"
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
              @click="deleteCityItem(city)"
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

import { entityAPI } from "@/api/entityAPI";

import VDropdown from "../components/VDropdown.vue";
import VPagination from "../components/VPagination.vue";
import VButton from "../components/VButton.vue";
import VIcon from "../components/VIcon.vue";

export default {
  name: "ListCities",
  components: {
    VDropdown,
    VPagination,
    VButton,
    VIcon,
  },
  setup() {
    const store = useStore();

    const listTableHeaders = ["Наименование", "Действия"];

    const filterCity = ref("no-filter");
    const selectedCity = ref(null);

    const cityList = computed(() => store.state.cityModule.cityList);

    const noFilter = computed(() => !selectedCity.value);

    const setSelectedCity = (chosenCity) => {
      selectedCity.value = chosenCity.id;
    };

    const applyFilter = () => {
      store.commit("citiesModule/RESET_PAGINATED_FILTERED_CITIES_TO_STATE");
      filterCity.value = selectedCity.value;
      currentPage.value = 1;
      getPaginateCityListFromApi(filterCity.value);
    };

    const rejectFilter = () => {
      store.commit("citiesModule/RESET_PAGINATED_FILTERED_CITIES_TO_STATE");
      selectedCity.value = null;
      filterCity.value = "no-filter";
      currentPage.value = 1;
      getPaginateCityListFromApi(filterCity.value);
    };

    const filteredCityList = computed(() => {
      return store.state.citiesModule.cities.data || [];
    });

    const dataCityList = computed(() => {
      if (filteredCityList.value instanceof Array) {
        return filteredCityList.value;
      } else {
        const arr = [];
        arr.push(filteredCityList.value);
        return arr;
      }
    });

    const cityItem = computed(() => store.state.citiesModule.selectedCity);

    const getCityListFromApi = () =>
      store.dispatch("cityModule/GET_CITIES_FROM_API");

    const getPaginateCityListFromApi = async (chosenCityId) => {
      //на бэке первая страница начинается с 0
      const selectedPage = currentPage.value - 1;
      const limitPage = limitPerPage.value;
      await store.dispatch(
        "citiesModule/GET_PAGINATED_FILTERED_CITYLIST_FROM_API",
        {
          chosenCityId,
          selectedPage,
          limitPage,
        }
      );
    };

    //API call
    const getData = async () => {
      await getCityListFromApi();
      getPaginateCityListFromApi(filterCity.value);
    };
    getData();

    //Pagination
    const limitPerPage = ref(5);

    const currentPage = ref(1);

    const totalItems = computed(() => store.state.citiesModule.cities.count);

    const totalPages = computed(() =>
      Math.ceil(totalItems.value / limitPerPage.value) > 0
        ? Math.ceil(totalItems.value / limitPerPage.value)
        : 1
    );

    const onPageChange = (page) => {
      store.commit("citiesModule/RESET_PAGINATED_FILTERED_CITIES_TO_STATE");
      currentPage.value = page;
      getPaginateCityListFromApi(filterCity.value);
    };

    const deleteCityItem = async (city) => {
      const cityId = city.id;
      await entityAPI.deleteCityItem(cityId);
    };

    const setCityCard = (city) => {
      store.commit("citiesModule/SET_SELECTEDCITY_TO_STATE", city);
    };

    return {
      listTableHeaders,
      filterCity,
      selectedCity,
      cityList,
      dataCityList,
      noFilter,
      setSelectedCity,
      applyFilter,
      rejectFilter,
      filteredCityList,
      cityItem,
      getCityListFromApi,
      limitPerPage,
      currentPage,
      totalItems,
      totalPages,
      onPageChange,
      deleteCityItem,
      setCityCard,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.table {
  &__header-item_city {
    width: 50%;
  }

  &__button-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  &__button-item {
    background: $color-white;
    border: 0.5px solid #becad6;
    border-radius: 4px;
    box-sizing: border-box;

    font-family: $ff;
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: $color-grey;

    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 3px 5px 3px 0;
    margin: 3px;
    width: 80px;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      padding: 3px 0px 3px 0;
      width: 40px;
    }
  }

  .visualy-hidden {
    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      border: 0;
      padding: 0;
      white-space: nowrap;
      clip-path: inset(100%);
      clip: rect(0 0 0 0);
      overflow: hidden;
    }
  }
}
</style>
