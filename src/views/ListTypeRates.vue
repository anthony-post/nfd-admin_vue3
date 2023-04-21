<template>
  <div class="entity-wrp entity">
    <div class="entity__title-wrp">
      <h2 class="entity__title">Типы тарифов</h2>
      <router-link to="card-typerate">
        <v-button type="button" theme="confirm" class="card-car__button-item">
          Добавить
        </v-button>
      </router-link>
    </div>
    <section class="entity-container">
      <div class="entity__header">
        <div class="header-dropdown">
          <v-dropdown
            id="dropdownRateType"
            :itemList="rateTypeList"
            :selectedItem="selectedRateType"
            name="rateType"
            placeholder="Тип тарифа"
            class="header-dropdown__item"
            @on-item-selected="setSelectedRateType"
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
            class="table__header-item table__header-item_typerate"
          >
            {{ item }}
          </th>
        </tr>
        <tr
          v-for="rateType in dataRateTypeList"
          :key="rateType.id"
          class="table-data"
        >
          <td class="table__data-item">{{ rateType.name }}</td>
          <td class="table__data-item">{{ rateType.unit }}</td>
          <td class="table__data-item table__button-container">
            <router-link
              :to="{
                name: 'card-typerate_id',
                params: { id: rateType?.id },
              }"
            >
              <button
                type="button"
                class="table__button-item"
                @click="setRateTypeCard(rateType)"
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
              @click="deleteRateTypeItem(rateType)"
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
  name: "ListTypeRates",
  components: {
    VDropdown,
    VPagination,
    VIcon,
    VButton,
  },
  setup() {
    const store = useStore();

    const listTableHeaders = ["Название", "Единица измерения", "Действия"];

    const filterRateType = ref("no-filter");
    const selectedRateType = ref(null);

    const rateTypeList = computed(
      () => store.state.rateTypeModule.rateTypeList
    );

    const noFilter = computed(() => !selectedRateType.value);

    const setSelectedRateType = (chosenRateType) => {
      selectedRateType.value = chosenRateType.id;
    };

    const applyFilter = () => {
      store.commit(
        "rateTypesModule/RESET_PAGINATED_FILTERED_RATETYPES_TO_STATE"
      );
      filterRateType.value = selectedRateType.value;
      currentPage.value = 1;
      getPaginateRateTypeListFromApi(filterRateType.value);
    };

    const rejectFilter = () => {
      store.commit(
        "rateTypesModule/RESET_PAGINATED_FILTERED_RATETYPES_TO_STATE"
      );
      selectedRateType.value = null;
      filterRateType.value = "no-filter";
      currentPage.value = 1;
      getPaginateRateTypeListFromApi(filterRateType.value);
    };

    const filteredRateTypeList = computed(() => {
      return store.state.rateTypesModule.rateTypes.data || [];
    });

    const dataRateTypeList = computed(() => {
      if (filteredRateTypeList.value instanceof Array) {
        return filteredRateTypeList.value;
      } else {
        const arr = [];
        arr.push(filteredRateTypeList.value);
        return arr;
      }
    });

    const rateTypeItem = computed(
      () => store.state.rateTypesModule.selectedRateType
    );

    const getRateTypeListFromApi = () =>
      store.dispatch("rateTypeModule/GET_RATETYPES_FROM_API");

    const getPaginateRateTypeListFromApi = async (chosenRateTypeId) => {
      //на бэке первая страница начинается с 0
      const selectedPage = currentPage.value - 1;
      const limitPage = limitPerPage.value;
      await store.dispatch(
        "rateTypesModule/GET_PAGINATED_FILTERED_RATETYPELIST_FROM_API",
        {
          chosenRateTypeId,
          selectedPage,
          limitPage,
        }
      );
    };

    const deleteRateTypeItem = async (rateType) => {
      const rateTypeId = rateType.id;
      await entityAPI.deleteRateTypeItem(rateTypeId);
    };

    const setRateTypeCard = (rateType) => {
      store.commit("rateTypesModule/SET_SELECTEDRATETYPE_TO_STATE", rateType);
    };

    //API call
    const getData = async () => {
      await getRateTypeListFromApi();
      getPaginateRateTypeListFromApi(filterRateType.value);
    };
    getData();

    //Pagination
    const limitPerPage = ref(5);

    const currentPage = ref(1);

    const totalItems = computed(
      () => store.state.rateTypesModule.rateTypes.count
    );

    const totalPages = computed(() =>
      Math.ceil(totalItems.value / limitPerPage.value) > 0
        ? Math.ceil(totalItems.value / limitPerPage.value)
        : 1
    );

    const onPageChange = (page) => {
      store.commit(
        "rateTypesModule/RESET_PAGINATED_FILTERED_RATETYPES_TO_STATE"
      );
      currentPage.value = page;
      getPaginateRateTypeListFromApi(filterRateType.value);
    };

    return {
      listTableHeaders,
      filterRateType,
      selectedRateType,
      rateTypeList,
      noFilter,
      setSelectedRateType,
      applyFilter,
      rejectFilter,
      filteredRateTypeList,
      dataRateTypeList,
      rateTypeItem,
      getRateTypeListFromApi,
      limitPerPage,
      currentPage,
      totalItems,
      totalPages,
      onPageChange,
      deleteRateTypeItem,
      setRateTypeCard,
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
