<template>
  <div class="entity-wrp entity">
    <h2 class="entity__title">Автомобили</h2>
    <section class="entity-container">
      <div class="entity__header">
        <div class="header-dropdown">
          <v-dropdown
            id="dropdown1"
            :itemList="listItems"
            name="period"
            placeholder="Field"
            class="header-dropdown__item"
          ></v-dropdown>
          <v-dropdown
            id="dropdown2"
            :itemList="listItems"
            name="period"
            placeholder="Field"
            class="header-dropdown__item"
          ></v-dropdown>
          <v-dropdown
            id="dropdown3"
            :itemList="listItems"
            name="period"
            placeholder="Field"
            class="header-dropdown__item"
          ></v-dropdown>
          <v-dropdown
            id="dropdown4"
            :itemList="listItems"
            name="period"
            placeholder="Field"
            class="header-dropdown__item"
          ></v-dropdown>
        </div>
        <div class="header-button">
          <button
            type="reset"
            class="header-button__item header-button__item_reset"
          >
            Сбросить
          </button>
          <button
            type="submit"
            class="header-button__item header-button__item_submit"
          >
            Применить
          </button>
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
        <tr v-for="car in listCars" :key="car.id" class="table-data">
          <td class="table__data-item">{{ car.name }}</td>
          <td class="table__data-item">{{ car.category }}</td>
          <td class="table__data-item">{{ car.color }}</td>
          <td class="table__data-item">
            {{ car.priceMin }} - {{ car.priceMax }}
          </td>
          <td class="table__data-item">
            <button
              type="button"
              class="table__button-item_car"
              @click="togglePopUp"
            >
              ...
            </button>
            <pop-up
              v-if="popUpIsActive"
              class="table__item-popup"
              @close-popup="togglePopUp"
            ></pop-up>
          </td>
        </tr>
      </table>
      <div class="entity__pagination">
        <v-pagination>1...4</v-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";
import VDropdown from "../components/VDropdown.vue";
import VPagination from "../components/VPagination.vue";
import PopUp from "../components/PopUp.vue";

export default {
  name: "ListCars",
  components: {
    VDropdown,
    VPagination,
    PopUp,
  },
  setup() {
    const listItems = [
      { id: 1, name: "xxx" },
      { id: 2, name: "yyy" },
      { id: 3, name: "zzz" },
    ];

    const listTableHeaders = ["Модель", "Катег.", "Цвет", "Цена", "Подробнее"];

    const listCars = [
      {
        id: 1,
        name: "ELANTRA",
        number: "x123yz",
        category: "Бизнес",
        color: "Черный",
        priceMin: 5000,
        priceMax: 10000,
        pic: `${require("../assets/img/car_image.jpg")}`,
        description: "Отличный автомобиль",
      },
      {
        id: 2,
        name: "ELANTRA",
        number: "x123yz",
        category: "Бизнес",
        color: "Черный",
        priceMin: 5000,
        priceMax: 10000,
        pic: `${require("../assets/img/car_image.jpg")}`,
        description: "Отличный автомобиль",
      },
      {
        id: 3,
        name: "ELANTRA",
        number: "x123yz",
        category: "Бизнес",
        color: "Черный",
        priceMin: 5000,
        priceMax: 10000,
        pic: `${require("../assets/img/car_image.jpg")}`,
        description: "Отличный автомобиль",
      },
    ];

    const popUpIsActive = ref(false);
    const togglePopUp = () => {
      popUpIsActive.value = !popUpIsActive.value;
    };

    return {
      listItems,
      listTableHeaders,
      listCars,
      popUpIsActive,
      togglePopUp,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.entity-wrp {
  width: 100%;
  height: 100%;
  background-color: $color-background;
}

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
  width: 100%;
  padding: 15px 20px 20px;
  text-align: left;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    padding: 10px;
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
