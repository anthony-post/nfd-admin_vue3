<template>
  <div class="entity-wrp">
    <h2 class="entity__title">Типы тарифов</h2>
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
            class="field__item field__item_typerates"
          >
            {{ item }}
          </li>
        </ul>
        <ul class="entity-list">
          <li v-for="rate in listTypeRates" :key="rate.id" class="entity__item">
            <div class="entity__item-data entity__item-data_typerates">
              {{ rate.name }}
            </div>
            <div class="entity__item-data entity__item-data_typerates">
              {{ rate.unit }}
            </div>
            <div class="entity__item-data entity__item-data_typerates">
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
  name: "ListTypeRates",
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

    const listTableHeaders = ["Название", "Единица измерения", "Действия"];

    const listTypeRates = [
      { id: 1, name: "Недельный", unit: "7 дней" },
      { id: 2, name: "Месячный", unit: "30 дней" },
      { id: 3, name: "Годовой", unit: "365 дней" },
    ];

    return {
      listItems,
      listTableHeaders,
      listTypeRates,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.field__item_typerates {
  width: 33.333%;
}

.entity__item-data_typerates {
  width: 33.333%;
}
</style>
