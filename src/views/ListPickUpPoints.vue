<template>
  <div class="entity-wrp">
    <h2 class="entity__title">Пункты выдачи</h2>
    <section class="entity-container">
      <div class="entity__header">
        <div class="header-dropdown__container">
          <v-dropdown
            id="dropdown1"
            :itemList="listItems"
            name="period"
            placeholder="Field"
            class="card__header-dropdown"
          ></v-dropdown>
          <v-dropdown
            id="dropdown2"
            :itemList="listItems"
            name="period"
            placeholder="Field"
            class="card__header-dropdown"
          ></v-dropdown>
        </div>
        <div class="header-btn__container">
          <button
            type="reset"
            class="entity__header-btn entity__header-btn_reset"
          >
            Сбросить
          </button>
          <button
            type="submit"
            class="entity__header-btn entity__header-btn_submit"
          >
            Применить
          </button>
        </div>
      </div>
      <div class="entity__content">
        <ul class="field-list">
          <li
            v-for="item in listTableHeaders"
            :key="item"
            class="field__item field__item_pickuppoint"
          >
            {{ item }}
          </li>
        </ul>
        <ul class="entity-list">
          <li
            v-for="point in listPickUpPoints"
            :key="point.id"
            class="entity__item"
          >
            <div class="entity__item-data entity__item-data_pickuppoint">
              {{ point.name }}
            </div>
            <div class="entity__item-data entity__item-data_pickuppoint">
              {{ point.city }}
            </div>
            <div class="entity__item-data entity__item-data_pickuppoint">
              {{ point.address }}
            </div>
            <div class="entity__item-data entity__item-data_pickuppoint">
              <button type="button" class="entity__item-btn">
                <v-icon
                  icon-id="icon-edit"
                  width="12"
                  height="11"
                  class="orders__button-icon_edit"
                ></v-icon>
                <span class="entity__item-btn-title">Изменить</span>
              </button>
              <button type="button" class="entity__item-btn">
                <v-icon
                  icon-id="icon-reject"
                  width="12"
                  height="11"
                  class="orders__button-icon_reject"
                ></v-icon>
                <span class="entity__item-btn-title">Удалить</span>
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

    const listTableHeaders = ["Название", "Город", "Адрес", "Действия"];

    const listPickUpPoints = [
      {
        id: 1,
        name: "Tорговый центр",
        city: "Ульяновск",
        address: "улица Уличная, 1",
      },
      {
        id: 2,
        name: "Tорговый центр",
        city: "Воронеж",
        address: "улица Уличная, 2",
      },
      {
        id: 3,
        name: "Tорговый центр",
        city: "Казань",
        address: "улица Уличная, 3",
      },
    ];

    return {
      listItems,
      listTableHeaders,
      listPickUpPoints,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.field__item_pickuppoint {
  width: 25%;
}

.entity__item-data_pickuppoint {
  width: 25%;
}

.entity__item-btn {
  background: $color-white;
  border: 0.5px solid #becad6;
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
  padding: 3px 5px 3px 0;
  margin: 3px;
  width: 80px;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    padding: 3px 0px 3px 0;
    width: 40px;
  }
}

.entity__item-btn-title {
  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    display: none;
  }
}
</style>
