<template>
  <div class="entity-wrp entity">
    <div class="entity__title-wrp">
      <h2 class="entity__title">Статусы заказов</h2>
      <router-link to="card-orderstatus">
        <v-button type="button" theme="confirm" class="card-car__button-item">
          Добавить
        </v-button>
      </router-link>
    </div>
    <section class="entity-container">
      <div class="entity__header">
        <div class="header-dropdown">
          <v-dropdown
            id="dropdownOrderStatus"
            :itemList="orderStatusList"
            :selectedItem="selectedOrderStatus"
            name="orderStatus"
            placeholder="Статус"
            class="header-dropdown__item"
            @on-item-selected="setSelectedOrderStatus"
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
            class="table__header-item table__header-item_status"
          >
            {{ item }}
          </th>
        </tr>
        <tr
          v-for="status in dataOrderStatusList"
          :key="status.id"
          class="table-data"
        >
          <td class="table__data-item">{{ status.name }}</td>
          <td class="table__data-item table__button-container">
            <router-link
              :to="{
                name: 'card-orderstatus_id',
                params: { id: status?.id },
              }"
            >
              <button
                type="button"
                class="table__button-item"
                @click="setOrderStatusCard(status)"
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
              @click="deleteOrderStatusItem(status)"
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
  name: "ListOrderStatus",
  components: {
    VDropdown,
    VPagination,
    VButton,
    VIcon,
  },
  setup() {
    const store = useStore();

    const listTableHeaders = ["Название", "Действия"];

    const filterOrderStatus = ref("no-filter");
    const selectedOrderStatus = ref(null);

    const orderStatusList = computed(
      () => store.state.orderStatusModule.orderStatusList
    );

    const noFilter = computed(() => !selectedOrderStatus.value);

    const setSelectedOrderStatus = (chosenOrderStatus) => {
      selectedOrderStatus.value = chosenOrderStatus.id;
    };

    const applyFilter = () => {
      store.commit(
        "orderStatusesModule/RESET_PAGINATED_FILTERED_ORDERSTATUSES_TO_STATE"
      );
      filterOrderStatus.value = selectedOrderStatus.value;
      currentPage.value = 1;
      getPaginateOrderStatusListFromApi(filterOrderStatus.value);
    };

    const rejectFilter = () => {
      store.commit(
        "orderStatusesModule/RESET_PAGINATED_FILTERED_ORDERSTATUSES_TO_STATE"
      );
      selectedOrderStatus.value = null;
      filterOrderStatus.value = "no-filter";
      currentPage.value = 1;
      getPaginateOrderStatusListFromApi(filterOrderStatus.value);
    };

    const filteredOrderStatusList = computed(() => {
      return store.state.orderStatusesModule.orderStatuses.data || [];
    });

    const dataOrderStatusList = computed(() => {
      if (filteredOrderStatusList.value instanceof Array) {
        return filteredOrderStatusList.value;
      } else {
        const arr = [];
        arr.push(filteredOrderStatusList.value);
        return arr;
      }
    });

    const orderStatusItem = computed(
      () => store.state.orderStatusesModule.selectedOrderStatus
    );

    const getOrderStatusListFromApi = () =>
      store.dispatch("orderStatusModule/GET_ORDERSTATUSES_FROM_API");

    const getPaginateOrderStatusListFromApi = async (chosenOrderStatusId) => {
      //на бэке первая страница начинается с 0
      const selectedPage = currentPage.value - 1;
      const limitPage = limitPerPage.value;
      await store.dispatch(
        "orderStatusesModule/GET_PAGINATED_FILTERED_ORDERSTATUSLIST_FROM_API",
        {
          chosenOrderStatusId,
          selectedPage,
          limitPage,
        }
      );
    };

    const deleteOrderStatusItem = async (status) => {
      const orderStatusId = status.id;
      await entityAPI.deleteOrderStatusItem(orderStatusId);
    };

    const setOrderStatusCard = (status) => {
      store.commit(
        "orderStatusesModule/SET_SELECTEDORDERSTATUS_TO_STATE",
        status
      );
    };

    //API call
    const getData = async () => {
      await getOrderStatusListFromApi();
      getPaginateOrderStatusListFromApi(filterOrderStatus.value);
    };
    getData();

    //Pagination
    const limitPerPage = ref(5);

    const currentPage = ref(1);

    const totalItems = computed(
      () => store.state.orderStatusesModule.orderStatuses.count
    );

    const totalPages = computed(() =>
      Math.ceil(totalItems.value / limitPerPage.value) > 0
        ? Math.ceil(totalItems.value / limitPerPage.value)
        : 1
    );

    const onPageChange = (page) => {
      store.commit(
        "orderStatusesModule/RESET_PAGINATED_FILTERED_ORDERSTATUSES_TO_STATE"
      );
      currentPage.value = page;
      getPaginateOrderStatusListFromApi(filterOrderStatus.value);
    };

    return {
      listTableHeaders,
      filterOrderStatus,
      selectedOrderStatus,
      orderStatusList,
      noFilter,
      setSelectedOrderStatus,
      applyFilter,
      rejectFilter,
      filteredOrderStatusList,
      dataOrderStatusList,
      orderStatusItem,
      getOrderStatusListFromApi,
      limitPerPage,
      currentPage,
      totalItems,
      totalPages,
      onPageChange,
      deleteOrderStatusItem,
      setOrderStatusCard,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.table {
  &__header-item_status {
    width: 50%;
  }
}
</style>
