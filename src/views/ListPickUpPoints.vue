<template>
  <div class="entity-wrp entity">
    <div class="entity__title-wrp">
      <h2 class="entity__title">Пункты выдачи</h2>
      <router-link to="card-point">
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
            class="table__header-item table__header-item_pickuppoint"
          >
            {{ item }}
          </th>
        </tr>
        <tr
          v-for="point in filteredPointList"
          :key="point.id"
          class="table-data"
        >
          <td class="table__data-item">{{ point.name }}</td>
          <td class="table__data-item">{{ point.cityId?.name }}</td>
          <td class="table__data-item">{{ point.address }}</td>
          <td class="table__data-item table__button-container">
            <router-link
              :to="{
                name: 'card-point_id',
                params: { id: point?.id },
              }"
            >
              <button
                type="button"
                class="table__button-item"
                @click="setPointCard(point)"
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
              @click="deletePointItem(point)"
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
  name: "ListPickUpPoints",
  components: {
    VDropdown,
    VPagination,
    VButton,
    VIcon,
  },
  setup() {
    const store = useStore();

    const listTableHeaders = ["Название", "Город", "Адрес", "Действия"];

    const filterCity = ref("no-filter");
    const selectedCity = ref(null);

    const cityList = computed(() => store.state.cityModule.cityList);

    const noFilter = computed(() => !selectedCity.value);

    const setSelectedCity = (chosenCity) => {
      selectedCity.value = chosenCity.id;
    };

    const applyFilter = () => {
      store.commit("pointsModule/RESET_PAGINATED_FILTERED_POINTS_TO_STATE");
      filterCity.value = selectedCity.value;
      currentPage.value = 1;
      getPaginatePointListFromApi(filterCity.value);
    };

    const rejectFilter = () => {
      store.commit("pointsModule/RESET_PAGINATED_FILTERED_POINTS_TO_STATE");
      selectedCity.value = null;
      filterCity.value = "no-filter";
      currentPage.value = 1;
      getPaginatePointListFromApi(filterCity.value);
    };

    const filteredPointList = computed(() => {
      return store.state.pointsModule.points.data || [];
    });

    const pointItem = computed(() => store.state.pointsModule.selectedPoint);

    const getCityListFromApi = () =>
      store.dispatch("cityModule/GET_CITIES_FROM_API");

    const getPaginatePointListFromApi = async (chosenCityId) => {
      //на бэке первая страница начинается с 0
      const selectedPage = currentPage.value - 1;
      const limitPage = limitPerPage.value;
      await store.dispatch(
        "pointsModule/GET_PAGINATED_FILTERED_POINTLIST_FROM_API",
        {
          chosenCityId,
          selectedPage,
          limitPage,
        }
      );
    };

    const deletePointItem = async (point) => {
      const pointId = point.id;
      await entityAPI.deletePointItem(pointId);
    };

    const setPointCard = (point) => {
      store.commit("pointsModule/SET_SELECTEDPOINT_TO_STATE", point);
    };

    //API call
    const getData = async () => {
      await getCityListFromApi();
      getPaginatePointListFromApi(filterCity.value);
    };
    getData();

    //Pagination
    const limitPerPage = ref(5);

    const currentPage = ref(1);

    const totalItems = computed(() => store.state.pointsModule.points.count);

    const totalPages = computed(() =>
      Math.ceil(totalItems.value / limitPerPage.value) > 0
        ? Math.ceil(totalItems.value / limitPerPage.value)
        : 1
    );

    const onPageChange = (page) => {
      store.commit("pointsModule/RESET_PAGINATED_FILTERED_POINTS_TO_STATE");
      currentPage.value = page;
      getPaginatePointListFromApi(filterCity.value);
    };

    return {
      listTableHeaders,
      filterCity,
      selectedCity,
      cityList,
      noFilter,
      setSelectedCity,
      applyFilter,
      rejectFilter,
      filteredPointList,
      pointItem,
      setPointCard,
      deletePointItem,
      getCityListFromApi,
      limitPerPage,
      currentPage,
      totalItems,
      totalPages,
      onPageChange,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.table {
  &__header-item_pickuppoint {
    width: 25%;
  }
}
</style>
