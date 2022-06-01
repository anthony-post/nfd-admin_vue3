<template>
  <div class="list-orders-wrp">
    <h2 class="orders__title">Заказы</h2>
    <section class="orders-container">
      <div class="orders__header">
        <div class="header-dropdown__container">
          <!-- <v-dropdown
            id="dropdown1"
            :itemList="listItems"
            name="period"
            placeholder="За неделю"
            class="orders__header-dropdown"
            @on-item-selected="setSelectedItem"
          ></v-dropdown>
          <v-dropdown
            id="dropdown2"
            :itemList="listItems"
            name="car"
            placeholder="Elantra"
            class="orders__header-dropdown"
            @on-item-selected="setSelectedItem"
          ></v-dropdown>
          <v-dropdown
            id="dropdown3"
            :itemList="listItems"
            name="city"
            placeholder="Ульяновск"
            class="orders__header-dropdown"
            @on-item-selected="setSelectedItem"
          ></v-dropdown> -->
          <v-dropdown
            id="dropdown4"
            :itemList="orderStatusList"
            name="status"
            placeholder="Статус"
            class="orders__header-dropdown"
            @on-item-selected="setSelectedItem"
          ></v-dropdown>
        </div>
        <div class="header-btn__container">
          <button
            type="reset"
            :disabled="!selectedItem"
            class="orders__header-btn orders__header-btn_reset"
            @click="rejectFilter"
          >
            Сбросить
          </button>
          <button
            type="button"
            :disabled="!selectedItem"
            class="orders__header-btn orders__header-btn_submit"
            @click="applyFilter"
          >
            Применить
          </button>
        </div>
      </div>
      <div class="orders__content">
        <ul class="orders__list">
          <li 
            v-for="order in filteredOrderList"
            :key="order.id"
            class="orders__item">
            <div class="orders__car">
              <img :src="order.carId?.thumbnail?.path" :alt="order.carId?.thumbnail?.originalname" class="orders__car-img" />
            </div>
            <div class="orders__data">
              <div class="data-wrp">
                <span class="data__item">{{ order.carId?.name }}</span>
                <span class="data__item">в {{ order.cityId?.name }},</span>
                <span class="data__item">{{ order.pointId?.address }}</span>
              </div>
              <div class="data-wrp">
                <span class="data__period">{{ order.dateFrom }}</span>
                <span class="data__period">- {{ order.dateTo }}</span>
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
        <v-pagination>1...4</v-pagination>
      </div>
    </section>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import store from "@/store";
import { useStore } from "vuex";
import { ref, computed } from "vue";
import VDropdown from "../components/VDropdown.vue";
import VCheckbox from "../components/VCheckbox.vue";
import VIcon from "../components/VIcon.vue";
import VPagination from "../components/VPagination.vue";

export default {
  name: "ListOrders",
  components: {
    VDropdown,
    VPagination,
    VCheckbox,
    VIcon,
  },
  setup() {
    const store = useStore();

    const orderStatusList = computed(() => store.state.entityModule.orderStatusList);

//вариант через state Vuex
    // const filteredOrderList = computed(() => {
    //   if (filterId.value === "no-filter") {
    //     return store.state.entityModule.orders["no-filter"]?.value;
    //   } else {
    //     return store.state.entityModule.orders[filterId.value]?.value;
    //   }
    // });

//вариант через getters Vuex
    // const filteredOrderList = computed(...mapGetters({FILTERED_ORDERS_BY_ORDERSTATUS(filterId.value)}));
    // const filteredOrderList = computed(() => store.getters.FILTERED_ORDERS_BY_ORDERSTATUS("no-filter"));
    const filteredOrderList = computed(() => store.getters.FILTERED_ORDERS_BY_ORDERSTATUS(filterId.value));
    // const filteredOrderList = computed(() => store.getters['entityModule/FILTERED_ORDERS_BY_ORDERSTATUS']);

    const filterId = ref("no-filter");
    const selectedItem = ref(null);

    const setSelectedItem = chosenItem => {
      selectedItem.value = chosenItem.id;
    };

    const getOrderStatusListFromApi = () =>
      store.dispatch("entityModule/GET_ORDERSTATUSLIST_FROM_API");

    const getFilteredOrderListFromApi = chosenId => {
      store.dispatch("entityModule/GET_FILTERED_ORDERLIST_FROM_API", chosenId);
    };

    const applyFilter = () => {
      filterId.value = selectedItem.value;
      getFilteredOrderListFromApi(filterId.value);
    }

    const rejectFilter = () => {
      selectedItem.value = null;
      filterId.value = "no-filter";
    };

    //API call
    const getData = async () => {
      await getOrderStatusListFromApi();
      await getFilteredOrderListFromApi(selectedItem.value);
    };
    getData();

    return {
      selectedItem,
      filterId,
      orderStatusList,
      filteredOrderList,
      setSelectedItem,
      applyFilter,
      rejectFilter,
      getFilteredOrderListFromApi,
      getData,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.list-orders-wrp {
  width: 100%;
  height: 100%;
  background-color: $color-background;
}

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

.orders__header-btn {
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

  cursor: pointer;
}

.orders__header-btn_submit {
  background: $color-blue;
  border: 0.5px solid $color-blue;
}

.orders__header-btn_reset {
  background: $color-red;
  border: 0.5px solid $color-red;
}

.orders__content {
  padding: 13px 20px;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    padding: 10px;
  }
}

.orders__item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
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
  max-width: 100%;
}

.orders__data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    padding: 10px 0;
  }
}

.data-wrp {
  display: flex;
  flex-direction: row;
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
  letter-spacing: -0.754286px;
  color: $color-black;
}

.orders__buttons-container {
  display: flex;
  flex-direction: row;
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
