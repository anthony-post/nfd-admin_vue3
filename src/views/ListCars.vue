<template>
  <div class="list-orders-wrp">
    <h2 class="orders__title">Автомобили</h2>
    <section class="orders-container">
      <div class="orders__header">
        <div class="dropdown__container">
          <v-dropdown
            :itemList="listItems"
            name="period"
            placeholder="За неделю"
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
        <div>
          <button class="orders__header-btn">Сбросить</button>
          <button class="orders__header-btn">Применить</button>
        </div>
      </div>
       <div class="orders__content">
         <ul class="orders__list">
           <li 
           v-for="car in listCars"
           :key="car.id"
            class="orders__item"
          >
          <!--TO DO вывод имен свойств через Object.keys-->
           </li>
         <ul class="orders__list">
           <li 
           v-for="car in listCars"
           :key="car.id"
            class="orders__item"
          >
            {{ car }}
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
import VDropdown from "../components/VDropdown.vue";
import VPagination from "../components/VPagination.vue";

export default {
  name: "ListCars",
  components: {
    VDropdown,
    VPagination,
  },
  setup() {
    const listItems = [
      { id: 1, name: "xxx" },
      { id: 2, name: "yyy" },
      { id: 3, name: "zzz" },
    ];

    const listCars = [
      { id: 1, name: "ELANTRA", number: "x123yz", category: "Бизнес", color: "Черный", priceMin: 5000, priceMax: 10000 },
      { id: 2, name: "ELANTRA", number: "x123yz", category: "Бизнес", color: "Черный", priceMin: 5000, priceMax: 10000 },
      { id: 3, name: "ELANTRA", number: "x123yz", category: "Бизнес", color: "Черный", priceMin: 5000, priceMax: 10000 },
    ];

    return {
      listItems,
      listCars,
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";
</style>
