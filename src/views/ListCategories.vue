<template>
  <div class="entity-wrp entity">
    <h2 class="entity__title">Категории автомобилей</h2>
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
          <th v-for="item in listTableHeaders" :key="item" class="table__header-item table__header-item_category">{{ item }}</th>
        </tr>
        <tr v-for="category in listCategories" :key="category.id" class="table-data">
          <td class="table__data-item">{{ category.name }}</td>
          <td class="table__data-item">{{ category.description }}</td>
          <td class="table__data-item table__button-container">
            <button type="button" class="table__button-item">
                <v-icon
                  icon-id="icon-edit"
                  width="12"
                  height="11"
                  class="table__button-item_edit"
                ></v-icon>
                <span class="visualy-hidden">Изменить</span>
              </button>
              <button type="button" class="table__button-item">
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
  name: "ListCategories",
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

    const listTableHeaders = ["Название", "Описание", "Действия"];

    const listCategories = [
      { id: 1, name: "Эконом", description: "Описание эконом" },
      { id: 2, name: "Бизнес", description: "Описание бизнес" },
      { id: 3, name: "Спорт", description: "Описание спорт" },
    ];

    return {
      listItems,
      listTableHeaders,
      listCategories,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.table {
  &__header-item_rate {
    width: 33.333%;
  }
}
</style>
