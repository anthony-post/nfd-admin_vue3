<template>
  <div class="card-wrp">
    <h2 class="card__title">Автомобили</h2>
    <section class="card-container">
      <div class="card__header">
        <div class="header-dropdown__container">
          <v-dropdown
            :itemList="listItems"
            name="period"
            placeholder="Field"
            class="card__header-dropdown"
          ></v-dropdown>
          <v-dropdown
            :itemList="listItems"
            name="car"
            placeholder="Field"
            class="card__header-dropdown"
          ></v-dropdown>
          <v-dropdown
            :itemList="listItems"
            name="city"
            placeholder="Field"
            class="card__header-dropdown"
          ></v-dropdown>
          <v-dropdown
            :itemList="listItems"
            name="status"
            placeholder="Field"
            class="card__header-dropdown"
          ></v-dropdown>
        </div>
        <div class="header-btn__container">
          <button type="reset" class="card__header-btn card__header-btn_reset">Сбросить</button>
          <button type="submit" class="card__header-btn card__header-btn_submit">Применить</button>
        </div>
      </div>
       <div class="card__content">
         <ul class="field-list">
           <li 
            v-for="field in listFields"
            :key="field.id"
            class="field__item"
          >
            {{ field }}
           </li>
         </ul>
         <ul class="car-list">
           <li 
            v-for="car in listCars"
            :key="car.id"
            class="car__item"
          >
            <!-- <div class="car__item-data">
              <img :src="car.pic" :alt="car.name" class="car__pic" />
            </div> -->
            <div class="car__item-data">{{ car.name }}</div>
            <!-- <div class="car__item-data">{{ car.number }}</div> -->
            <div class="car__item-data">{{ car.category }}</div>
            <div class="car__item-data">{{ car.color }}</div>
            <div class="car__item-data">{{ car.priceMin }} - {{ car.priceMax }}</div>
            <div class="car__item-data">
              <button type="button" class="car__item-btn" @click="showPopUp">...</button>
            </div>
            <!--TO DO pop-up-->
            <pop-up 
              v-if="popUpIsActive" 
              class="car__item-popup"
              @close-popup="closePopUp"
            ></pop-up>
           </li>
         </ul>
       </div>
      <div class="card__pagination">
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

    // const listFields = ["Фото", "Модель", "Номер", "Категория", "Цвет", "Цена" ];
    const listFields = ["Модель", "Категория", "Цвет", "Цена", "Подробнее" ];

    const listCars = [
      { id: 1, name: "ELANTRA", number: "x123yz", category: "Бизнес", color: "Черный", priceMin: 5000, priceMax: 10000, pic: `${require("../assets/img/car_image.jpg")}`, description: "Отличный автомобиль" },
      { id: 2, name: "ELANTRA", number: "x123yz", category: "Бизнес", color: "Черный", priceMin: 5000, priceMax: 10000, pic: `${require("../assets/img/car_image.jpg")}`, description: "Отличный автомобиль" },
      { id: 3, name: "ELANTRA", number: "x123yz", category: "Бизнес", color: "Черный", priceMin: 5000, priceMax: 10000, pic: `${require("../assets/img/car_image.jpg")}`, description: "Отличный автомобиль" },
    ];

    //pop-up
    const popUpIsActive = ref(false);
    // const togglePopUp = () => {
    //   popUpIsActive.value = !popUpIsActive.value;
    // };
    const showPopUp = () => {
      popUpIsActive.value = !popUpIsActive.value;
    };
    const closePopUp = () => {
      popUpIsActive.value = !popUpIsActive.value;
    };

    return {
      listItems,
      listFields,
      listCars,
      popUpIsActive,
      // togglePopUp,
      showPopUp,
      closePopUp,
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.card-wrp {
  width: 100%;
  height: 100%;
  background-color: $color-background;
}

.card__title {
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

.card-container {
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

.card__header {
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

.card__header-dropdown {
  margin: 5px;
}

.header-btn__container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.card__header-btn {
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
}

.card__header-btn_submit {
  background: $color-blue;
  border: 0.5px solid $color-blue;
}

.card__header-btn_reset {
  background: $color-red;
  border: 0.5px solid $color-red;
}

.card__content {
  padding: 15px 20px 20px;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    padding: 10px;
    overflow-x: scroll;
  }
}

.field-list {
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  margin: 0 0 15px 0;
}

.field__item {
  font-family: $ff;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.377143px;
  color: $color-text;
  margin: 5px;
  width: 20%;
}

.car__item {
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  align-items: center;
  margin: 15px 0;

  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.377143px;
  color: $color-text;
}

.car__item-data {
  margin: 0 5px;
  width: 20%;
}

.car__pic {
  max-width: 100%;
}

.car__item-btn {
  width: 50px;
  background: $color-white;
  border: 0.5px solid #BECAD6;
  border-radius: 4px;
}

.car__item-popup {
  position: absolute;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card__pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 0px -0.5px 0px #e0e2e8, 0px 0.5px 0px #e0e2e8;
  padding: 20px 0;
}
</style>
