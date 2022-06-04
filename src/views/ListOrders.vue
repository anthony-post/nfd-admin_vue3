<template>
  <div class="list-orders-wrp">
    <h2 class="orders__title">Заказы</h2>
    <section class="orders-container">
      <div class="orders__header">
        <div class="header-dropdown__container">
          <v-dropdown
            id="dropdownCity"
            :itemList="cityList"
            :selectedItem="selectedCity"
            name="city"
            placeholder="Город"
            class="orders__header-dropdown"
            @on-item-selected="setSelectedCity"
          ></v-dropdown>
          <v-dropdown
            id="dropdownStatus"
            :itemList="orderStatusList"
            :selectedItem="selectedOrderStatus"
            name="status"
            placeholder="Статус"
            class="orders__header-dropdown"
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
      <div class="orders__content">
        <ul class="orders__list">
          <VPreloader v-show="togglePreloader" />
          <li 
            v-for="order in filteredOrderList"
            :key="order.id"
            class="orders__item">
            <div class="orders__car">
              <img 
                :src="order.carId?.thumbnail?.path" 
                :alt="order.carId?.thumbnail?.originalname" 
                class="orders__car-img"
              />
            </div>
            <div class="orders__data">
              <div class="data-wrp">
                <span class="data__item">{{ order.carId?.name }}</span>
                <span class="data__item">в {{ order.cityId?.name }},</span>
                <span class="data__item">{{ order.pointId?.address }}</span>
              </div>
              <div class="data-wrp">
                <span class="data__period">{{ convertToDate(order.dateFrom) }}</span>
                <span class="data__period">- {{ convertToDate(order.dateTo) }}</span>
              </div>
              <div class="data__period">
                Цвет:<span class="data__item">{{ order.color }}</span>
              </div>
            </div>
            <div class="orders__additional">
              <v-checkbox :isOption="order.isFullTank">Полный бак</v-checkbox>
              <v-checkbox :isOption="order.isNeedChildChair">Детское кресло</v-checkbox>
              <v-checkbox :isOption="order.isRightWheel">Правый руль</v-checkbox>
            </div>
            <div class="orders__price">{{ order.price }} &#8381;</div>
            <div class="orders__buttons-container">
              <button type="button" class="orders__button orders__button_left">
                <v-icon
                  icon-id="icon-approve"
                  width="12"
                  height="11"
                  class="orders__button-icon_approve"
                ></v-icon>
                Готово
              </button>
              <button
                type="button"
                class="orders__button orders__button_middle"
              >
                <v-icon
                  icon-id="icon-reject"
                  width="12"
                  height="11"
                  class="orders__button-icon_reject"
                ></v-icon>
                Отмена
              </button>
              <button type="button" class="orders__button orders__button_right">
                <v-icon
                  icon-id="icon-edit"
                  width="12"
                  height="11"
                  class="orders__button-icon_edit"
                ></v-icon>
                <span>Изменить</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="orders__pagination">
        <v-pagination v-if="!isNaN(totalPages)"
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
import VCheckbox from "../components/VCheckbox.vue";
import VIcon from "../components/VIcon.vue";
import VPagination from "../components/VPagination.vue";
import VPreloader from "@/components/VPreloader.vue";
import VButton from "../components/VButton.vue";

export default {
  name: "ListOrders",
  components: {
    VDropdown,
    VPagination,
    VCheckbox,
    VIcon,
    VPreloader,
    VButton,
  },
  setup() {
    const store = useStore();

    const filterOrderStatusId = ref("no-filter");
    const selectedOrderStatus = ref(null);
    const selectedCity = ref(null);
    const filterCityId = ref("no-filter");

    const noFilter = computed(() => !selectedOrderStatus.value && !selectedCity.value);

    const togglePreloader = computed(() => filteredOrderList.value?.length === 0);

    const orderStatusList = computed(() => store.state.ordersModule.orderStatusList);

    const cityList = computed(() => store.state.ordersModule.cityList);

    const filteredOrderList = computed(() => {
      return store.state.ordersModule.orders.data || [];
    });

    const setSelectedOrderStatus = chosenOrderStatus => {
      selectedOrderStatus.value = chosenOrderStatus.id;
    };

    const setSelectedCity = chosenCity => {
      selectedCity.value = chosenCity.id;
    };

    const getOrderStatusListFromApi = () =>
      store.dispatch("ordersModule/GET_ORDERSTATUSLIST_FROM_API");
    
    const getCityListFromApi = () =>
      store.dispatch("ordersModule/GET_CITYLIST_FROM_API");

    const getPaginateOrderListFromApi = (chosenOrdersStatusId, chosenCityId) => {
      const chosenPage = currentPage.value;
        store.dispatch("ordersModule/GET_ORDERLIST_FROM_API", { chosenOrdersStatusId, chosenCityId, chosenPage, limitPerPage });
    };

    const applyFilter = () => {
      store.commit("ordersModule/RESET_ORDERS_TO_STATE");
      filterOrderStatusId.value = selectedOrderStatus.value;
      filterCityId.value = selectedCity.value;
      currentPage.value = 1;
      getPaginateOrderListFromApi(filterOrderStatusId.value, filterCityId.value);
    }

    const rejectFilter = () => {
      store.commit("ordersModule/RESET_ORDERS_TO_STATE");
      selectedOrderStatus.value = null;
      filterOrderStatusId.value = "no-filter";
      selectedCity.value = null;
      filterCityId.value = "no-filter";
      currentPage.value = 1;
      getPaginateOrderListFromApi(filterOrderStatusId.value, filterCityId.value);
    };

    const convertToDate = mlsDate => {
      const dateObj = new Date(mlsDate);

      let dd = dateObj.getDate();
      if (dd < 10) dd = "0" + dd;

      let mm = dateObj.getMonth() + 1;
      if (mm < 10) mm = "0" + mm;

      let yy = dateObj.getFullYear();
      if (yy < 10) yy = "0" + yy;

      let hh = dateObj.getHours();
      if (hh < 10) hh = "0" + hh;

      let min = dateObj.getMinutes();
      if (min < 10) min = "0" + min;

      return dd + "." + mm + "." + yy + " " + hh + ":" + min;
    };

    //API call
    const getData = async () => {
      await getOrderStatusListFromApi();
      await getCityListFromApi();
      await getPaginateOrderListFromApi(filterOrderStatusId.value, filterCityId.value);
    };
    getData();

    //Pagination
    const limitPerPage = 5;

    const currentPage = ref(1);

    const totalItems = computed(() => store.state.ordersModule.orders.count);

    const totalPages = computed(() => Math.round(totalItems.value / limitPerPage));

    const onPageChange = page => {
      store.commit("ordersModule/RESET_ORDERS_TO_STATE");
      currentPage.value = page;
      getPaginateOrderListFromApi(filterOrderStatusId.value, filterCityId.value);
    };

    return {
      cityList,
      selectedCity,
      filterCityId,
      setSelectedCity,
      selectedOrderStatus,
      filterOrderStatusId,
      orderStatusList,
      filteredOrderList,
      setSelectedOrderStatus,
      noFilter,
      applyFilter,
      rejectFilter,
      getData,
      totalPages,
      currentPage,
      onPageChange,
      convertToDate,
      togglePreloader,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.orders__title {
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

.orders-container {
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

.orders__header {
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

.header-dropdown__container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    justify-content: center;
  }
}

.orders__header-dropdown {
  margin: 5px;
}

.header-btn__container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.header-btn__item {
  margin: 5px;
}

.btn_disabled {
  color: $color-text;
  background: $color-button-cancel;
  border: 0.5px solid $color-button-cancel;

  &:hover {
    background: $color-button-cancel;
    cursor: auto;
  }
  &:active {
    background: $color-button-cancel;
    cursor: auto;
  }
}

.orders__content {
  padding: 13px 20px;
  height: 50vh;
  overflow-x: scroll;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    padding: 10px;
    height: 45vh;
  }
}

.orders__item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 0;
}

.orders__car,
.orders__data,
.orders__additional,
.orders__price,
.orders__buttons-container {
  margin: 5px;
}

.orders__car {
  width: 140px;
  height: 70px;
}

.orders__car-img {
  width: inherit;
}

.orders__data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30%;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    padding: 10px 0;
    width: 100%;
  }
}

.data-wrp {
  margin: 0 0 7px 0;
}

.data__item {
  font-family: $font2;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: -0.408571px;
  color: $color-black;
  padding: 0 3px 0 0;
}

.data__period {
  font-family: $font2;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: -0.408571px;
  color: #889098;
  padding: 0 3px 0 0;
}

.orders__additional {
  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    padding: 10px 0;
  }
}

.orders__price {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: $color-black;
  width: 10%;
  text-align: right;

  @media #{$media} and (min-width: $desktop-min) and (max-width: $desktop-max) {
    font-size: 18px;
  }

  @media #{$media} and (min-width: $tablet-min) and (max-width: $tablet-max) {
    font-size: 18px;
  }

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    width: 30%;
    font-size: 20px;
  }
}

.orders__buttons-container {
  display: flex;
  flex-direction: row;

  @media #{$media} and (min-width: $desktop-min) and (max-width: $desktop-max) {
    width: 100%;
    justify-content: flex-end;
  }

  @media #{$media} and (min-width: $tablet-min) and (max-width: $tablet-max) {
    width: 100%;
    justify-content: center;
  }

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    width: 100%;
    justify-content: center;
  }
}

.orders__button {
  background: $color-white;
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  letter-spacing: -0.345714px;
  color: #5a6169;
  box-sizing: border-box;
  border: 0.5px solid #becad6;
  display: flex;
  margin: 0;
}

.orders__button_left {
  border-radius: 4px 0px 0px 4px;
  padding: 6px 15px 6px 8px;
}

.orders__button_middle {
  border-left: 0;
  border-right: 0;
  padding: 6px 15px 6px 8px;
}

.orders__button_right {
  border-radius: 0px 4px 4px 0px;
  padding: 6px;
}

.orders__pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 0px -0.5px 0px #e0e2e8, 0px 0.5px 0px #e0e2e8;
  padding: 20px 0;
}
</style>
