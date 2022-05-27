<template>
  <div class="entity-wrp entity">
    <h2 class="entity__title">Города</h2>
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
          <th v-for="item in listTableHeaders" :key="item" class="table__header-item table__header-item_city">{{ item }}</th>
        </tr>
        <tr v-for="city in listCities" :key="city.id" class="table-data">
          <td class="table__data-item">{{ city.name }}</td>
          <td class="table__data-item table__button-container">
            <button type="button" class="table__button-item">
                <v-icon
                  icon-id="icon-edit"
                  width="12"
                  height="11"
                  class="table__button-item_edit"
                ></v-icon>
                <span class="table__button-item-title">Изменить</span>
              </button>
              <button type="button" class="table__button-item">
                <v-icon
                  icon-id="icon-reject"
                  width="12"
                  height="11"
                  class="table__button-item_reject"
                ></v-icon>
                <span class="table__button-item-title">Удалить</span>
              </button>
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
import VDropdown from "../components/VDropdown.vue";
import VPagination from "../components/VPagination.vue";
import VIcon from "../components/VIcon.vue";

export default {
  name: "ListCities",
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

    const listTableHeaders = ["Наименование", "Действия"];

    const listCities = [
      { id: 1, name: "Ульяновск" },
      { id: 2, name: "Воронеж" },
      { id: 3, name: "Казань" },
    ];

    return {
      listItems,
      listTableHeaders,
      listCities,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.table {
  &__header-item_city {
    width: 50%;
  }

  &__button-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  &__button-item {
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

  &__button-item-title {
    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      display: none;
    }
  }
}
</style>
