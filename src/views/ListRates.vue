<template>
  <div class="entity-wrp entity">
    <div class="entity__title-wrp">
      <h2 class="entity__title">Тарифы</h2>
      <router-link to="card-rate">
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
            class="table__header-item table__header-item_rate"
          >
            {{ item }}
          </th>
        </tr>
        <tr v-for="rate in filteredRateList" :key="rate.id" class="table-data">
          <td class="table__data-item">{{ rate.rateTypeId.name }}</td>
          <td class="table__data-item">{{ rate.price }}</td>
          <td class="table__data-item table__button-container">
            <router-link
              :to="{
                name: 'card-rate_id',
                params: { id: rate?.id },
              }"
            >
              <button
                type="button"
                class="table__button-item"
                @click="setRateCard(rate)"
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
              @click="deleteRateItem(rate)"
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
  name: "ListRates",
  components: {
    VDropdown,
    VPagination,
    VButton,
    VIcon,
  },
  setup() {
    const store = useStore();

    const listTableHeaders = ["Название", "Цена", "Действия"];

    const filterRate = ref("no-filter");
    const selectedRateType = ref(null);

    const rateTypeList = computed(
      () => store.state.rateTypeModule.rateTypeList
    );

    const noFilter = computed(() => !selectedRateType.value);

    const setSelectedRateType = (chosenRateType) => {
      selectedRateType.value = chosenRateType.name;
    };

    const applyFilter = () => {
      filterRate.value = selectedRateType.value;
      currentPage.value = 1;
    };

    const rejectFilter = () => {
      store.commit("ratesModule/RESET_PAGINATED_FILTERED_RATES_TO_STATE");
      selectedRateType.value = null;
      filterRate.value = "no-filter";
      currentPage.value = 1;
      getPaginateRateListFromApi(filterRate.value);
    };

    const paginatedRateList = computed(() => {
      return store.state.ratesModule.rates.data || [];
    });

    const filteredRateList = computed(() => {
      if (filterRate.value !== "no-filter") {
        return paginatedRateList.value.filter((rate) => {
          if (rate?.rateTypeId?.name) {
            return rate.rateTypeId.name.includes(filterRate.value);
          }
        });
      } else {
        return paginatedRateList.value;
      }
    });

    const rateItem = computed(() => store.state.ratesModule.selectedRate);

    const getRateTypeListFromApi = () =>
      store.dispatch("rateTypeModule/GET_RATETYPES_FROM_API");

    const getPaginateRateListFromApi = async (chosenRateId) => {
      //на бэке первая страница начинается с 0
      const selectedPage = currentPage.value - 1;
      const limitPage = limitPerPage.value;
      await store.dispatch(
        "ratesModule/GET_PAGINATED_FILTERED_RATELIST_FROM_API",
        {
          chosenRateId,
          selectedPage,
          limitPage,
        }
      );
    };

    const deleteRateItem = async (rate) => {
      const rateId = rate.id;
      await entityAPI.deleteRateItem(rateId);
    };

    const setRateCard = (rate) => {
      store.commit("ratesModule/SET_SELECTEDRATE_TO_STATE", rate);
    };

    //API call
    const getData = async () => {
      await getRateTypeListFromApi();
      getPaginateRateListFromApi(filterRate.value);
    };
    getData();

    //Pagination
    const limitPerPage = ref(5);

    const currentPage = ref(1);

    const totalItems = computed(() => store.state.ratesModule.rates.count);

    const totalPages = computed(() =>
      Math.ceil(totalItems.value / limitPerPage.value) > 0
        ? Math.ceil(totalItems.value / limitPerPage.value)
        : 1
    );

    const onPageChange = (page) => {
      store.commit("ratesModule/RESET_PAGINATED_FILTERED_RATES_TO_STATE");
      currentPage.value = page;
      getPaginateRateListFromApi(filterRate.value);
    };

    return {
      listTableHeaders,
      filterRate,
      selectedRateType,
      paginatedRateList,
      rateTypeList,
      noFilter,
      setSelectedRateType,
      applyFilter,
      rejectFilter,
      filteredRateList,
      rateItem,
      limitPerPage,
      currentPage,
      totalItems,
      totalPages,
      onPageChange,
      deleteRateItem,
      setRateCard,
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
