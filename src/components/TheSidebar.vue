<template>
  <nav class="sidebar">
    <div class="logo-wrp logo_sidebar">
      <img class="logo-pic_sidebar" src="../assets/logoAdmin.png" alt="logo" />
      <p class="logo-text logo-text_sidebar">Need for Drive</p>
    </div>
    <ul class="sidebar__list">
      <li
        v-for="item in menuList"
        :key="item.id"
        :class="{ sidebar__item_active: isActiveTab === item.id }"
        class="sidebar__item"
        @click="closeMobileSideBar(item)"
      >
        <router-link :to="item.path" class="item__link">
          <div>
            <v-icon :icon-id="item.id" width="15" height="15"></v-icon>
            <span
              :class="{ item__title_active: isActiveTab === item.id }"
              class="item__title"
            >
              {{ item.name }}
            </span>
          </div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref } from "vue";
import VIcon from "../components/VIcon.vue";

export default {
  name: "TheSidebar",
  components: {
    VIcon,
  },
  setup(_, context) {
    const menuList = [
      // {
      //   id: "icon-autocard",
      //   name: "Карточка автомобиля",
      //   path: "/admin-panel/card-car",
      // },
      { id: "icon-orders", name: "Заказы", path: "/admin-panel/orders" },
      { id: "icon-cars", name: "Список авто", path: "/admin-panel/cars" },
      {
        id: "icon-categories",
        name: "Категории авто",
        path: "/admin-panel/list-categories",
      },
      {
        id: "icon-cities",
        name: "Список городов",
        path: "/admin-panel/cities",
      },
      {
        id: "icon-pickuppoints",
        name: "Пункты выдачи",
        path: "/admin-panel/pickup-points",
      },
      { id: "icon-rates", name: "Тарифы", path: "/admin-panel/list-rates" },
      {
        id: "icon-typerates",
        name: "Типы тарифов",
        path: "/admin-panel/list-typerates",
      },
      {
        id: "icon-orderstatus",
        name: "Статусы заказов",
        path: "/admin-panel/list-orderstatus",
      },
    ];

    const isActiveTab = ref(null);

    const closeMobileSideBar = (item) => {
      isActiveTab.value = item.id;
      context.emit("close-mobile-sidebar");
    };

    return {
      menuList,
      isActiveTab,
      closeMobileSideBar,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.sidebar {
  width: 285px;
  height: 100vh;
  background: $color-white;
  box-shadow: 0px 1px 75px rgba(90, 97, 105, 0.11),
    0px 2px 4px rgba(90, 97, 105, 0.12), 0px 7.5px 11px rgba(90, 97, 105, 0.1),
    0px 3.5px 17.5px rgba(165, 182, 201, 0.1);

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    width: 100vw;
  }
}

.logo_sidebar {
  box-shadow: inset 0px -1px 0px #e1e5eb;
  padding: 24px 50px 21px 50px;
  justify-content: flex-start;
}

.logo-pic_sidebar {
  width: 21.5px;
  height: 21.5px;
}

.logo-text_sidebar {
  font-size: 16px;
  line-height: 18px;
  margin: 0;
  padding: 0 0 0 5px;
}

.sidebar__list {
  list-style: none;
}

.sidebar__item {
  background: $color-white;
  box-shadow: inset 0px -1px 0px #e1e5eb;

  &:hover {
    background: $color-bg-hover;
    box-shadow: inset 0px -1px 0px #e1e5eb, inset 4px 0px 0px #007bff;
  }
  &:active {
    background: $color-bg-hover;
    box-shadow: inset 0px -1px 0px #e1e5eb, inset 4px 0px 0px #007bff;
  }
}

.sidebar__item_active {
  background: $color-bg-hover;
  box-shadow: inset 0px -1px 0px #e1e5eb, inset 4px 0px 0px #007bff;
}

.sidebar__item:hover .icon {
  fill: $color-blue;
}

.item__link {
  text-decoration: none;
  display: block;
  padding: 20px 25px;
}

.item__title {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;
  letter-spacing: -0.234375px;
  color: $color-text;
  padding: 0 0 0 11px;
}

.item__title_active {
  color: $color-blue;
}
</style>
