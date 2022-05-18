<template>
  <div class="list-orders-wrp">
    <h2 class="orders__title">Заказы</h2>
    <section class="orders-container">
      <div class="orders__header">
        <div class="dropdown__container">
          <v-dropdown 
            :itemList="listItems"
            :selectedItem="chosenItem"
            name="period"
            placeholder="За неделю" 
            @on-item-selected="setSelectedItem"
            class="orders__header-dropdown"
          ></v-dropdown>
          <v-dropdown 
            :itemList="listItems"
            name="car"
            placeholder="Elantra" 
            class="orders__header-dropdown"
            ></v-dropdown>
          <v-dropdown 
            :itemList="listItems"
            name="city"
            placeholder="Ульяновск" 
            class="orders__header-dropdown"
            ></v-dropdown>
          <v-dropdown 
            :itemList="listItems"
            name="status"
            placeholder="В процессе" 
            class="orders__header-dropdown"
            ></v-dropdown>
        </div>
        <button class="orders__header-btn">Применить</button>
      </div>
      <div class="orders__content">
        <ul class="orders__list">
          <li class="orders__item">
            <div class="orders__car">
              <img :src="order.pic" :alt="order.name">
            </div>
            <div class="orders__data">
              <div class="data-wrp">
                <span class="data__item">{{ order.name }}</span>
                <span class="data__item">в {{ order.city }},</span>
                <span class="data__item">{{ order.point }}</span>
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
              <v-checkbox>Полный бак</v-checkbox>
              <v-checkbox>Детское кресло</v-checkbox>
              <v-checkbox>Правый руль</v-checkbox>
            </div>
            <div class="orders__price">{{ order.price }} &#8381;</div>
            <div class="orders__buttons-container">
              <button class="orders__button orders__button_left">
                <v-icon
                  icon-id="icon-approve"
                  width="12"
                  height="11"
                  class="orders__button-icon_approve"
                ></v-icon>  
                Готово
              </button>
              <button class="orders__button orders__button_middle">
                <v-icon
                  icon-id="icon-reject"
                  width="12"
                  height="11"
                  class="orders__button-icon_reject"
                ></v-icon>
                Отмена
              </button>
              <button class="orders__button orders__button_right">
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
import { ref } from "vue";
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
    const listItems = [
      { id: 1, name: "xxx" },
      { id: 2, name: "yyy" },
      { id: 3, name: "zzz" }
    ];

    const order = {
      id: 1,
      name: "ELANTRA",
      color: "Голубой",
      pic: `${require("../assets/img/car_image.jpg")}`,
      city: "Ульяновск",
      point: "Нариманова 42",
      dateFrom: "12.06.2019 12:00",
      dateTo: "13.06.2019 12:00",
      isNeedChair: true,
      isFullTank: false,
      isRightWeel: false,
      price: "4 300",
    };

    const chosenItem = ref({});

    const setSelectedItem = chosenItem => chosenItem.value = chosenItem;

    return {
      listItems,
      order,
      chosenItem,
      setSelectedItem,
    }
  }
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
}

.orders-container {
  background: $color-white;
  box-shadow: 0px 2px 0px rgba(90, 97, 105, 0.11),
    0px 4px 8px rgba(90, 97, 105, 0.12), 0px 10px 10px rgba(90, 97, 105, 0.06),
    0px 7px 70px rgba(90, 97, 105, 0.1);
  border-radius: 9px;
  margin: 0 25px;
}

.orders__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-basis: 40%;
  box-shadow: 0px -0.5px 0px #e0e2e8, 0px 0.5px 0px #e0e2e8;
  padding: 15px 20px;
}

.dropdown__container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.orders__header-dropdown {
  margin: 0 15px 0 0;
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

  background: $color-blue;
  border: 0.5px solid $color-blue;
  border-radius: 4px;
  box-sizing: border-box;

  padding: 8px 15px;
}

.orders__content {
  padding: 13px 20px 180px 20px;
}

.orders__item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.orders__data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  color: #5A6169;
  box-sizing: border-box;
  border: 0.5px solid #BECAD6;
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
  box-shadow: 0px -0.5px 0px #E0E2E8, 0px 0.5px 0px #E0E2E8;
  padding: 20px 0;
}
</style>
