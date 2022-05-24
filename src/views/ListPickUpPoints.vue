<template>
  <div class="entity-wrp">
    <h2 class="entity__title">Пункты выдачи</h2>
    <section class="entity-container">
      <div class="entity__header">
        <div class="header-dropdown__container">
          <v-dropdown
            :itemList="listItems"
            name="period"
            placeholder="Field"
            class="entity__header-dropdown"
          ></v-dropdown>
          <v-dropdown
            :itemList="listItems"
            name="car"
            placeholder="Field"
            class="entity__header-dropdown"
          ></v-dropdown>
        </div>
        <div class="header-btn__container">
          <button type="reset" class="entity__header-btn entity__header-btn_reset">Сбросить</button>
          <button type="submit" class="entity__header-btn entity__header-btn_submit">Применить</button>
        </div>
      </div>
       <div class="entity__content">
         <ul class="field-list">
           <li 
            v-for="field in listFieldsTable"
            :key="field.id"
            class="field__item"
          >
            {{ field }}
           </li>
         </ul>
         <ul class="entity-list">
           <li 
            v-for="point in listPickUpPoints"
            :key="point.id"
            class="entity__item"
          >
            <div class="entity__item-wrp">
                <div class="entity__item-data">{{ point.name }}</div>
                <div class="entity__item-data">{{ point.city }}</div>
                <div class="entity__item-data">{{ point.address }}</div>
            </div>
            <div>
              <button type="button" class="entity__item-btn">
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
      <div class="entity__pagination">
        <v-pagination>1...4</v-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import VDropdown from "../components/VDropdown.vue";
import VPagination from "../components/VPagination.vue";
import VIcon from "../components/VIcon.vue";

export default {
  name: "ListPickUpPoints",
  components: {
    VDropdown,
    VPagination,
    VIcon,
  },
  setup() {
    const listItems = [
      { id: 1, name: "xxx" },
      { id: 2, name: "yyy" },
      { id: 3, name: "zzz" },
    ];

    const listFieldsTable = ["Наименование", "Город", "Адрес"];

    const listPickUpPoints = [
      { id: 1, name: "Tорговый центр", city: "Ульяновск", address: "улица Уличная, 1" },
      { id: 2, name: "Tорговый центр", city: "Воронеж", address: "улица Уличная, 2" },
      { id: 3, name: "Tорговый центр", city: "Казань", address: "улица Уличная, 3" },
    ];

    return {
      listItems,
      listFieldsTable,
      listPickUpPoints,
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.entity-wrp {
  width: 100%;
  height: 100%;
  background-color: $color-background;
}

.entity__title {
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

.entity__header {
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

.entity__header-dropdown {
  margin: 5px;
}

.header-btn__container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.entity__header-btn {
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

.entity__header-btn_submit {
  background: $color-blue;
  border: 0.5px solid $color-blue;
}

.entity__header-btn_reset {
  background: $color-red;
  border: 0.5px solid $color-red;
}

.entity__content {
  padding: 15px 20px 20px;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    padding: 10px;
    overflow-x: scroll;
  }
}

.field-list {
  display: flex;
  flex-direction: row;
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
}

.entity__item-wrp {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.entity__item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

.entity__item-data {
  margin: 0 5px;
}

.entity__item-btn {
  background: $color-white;
  border: 0.5px solid #BECAD6;
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
  padding: 5px 5px 5px 0;
  width: 100px;
}

.entity__pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 0px -0.5px 0px #e0e2e8, 0px 0.5px 0px #e0e2e8;
  padding: 20px 0;
}
</style>
