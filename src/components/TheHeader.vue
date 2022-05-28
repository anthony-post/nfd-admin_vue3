<template>
  <header class="header-wrp">
    <v-mobile-menu></v-mobile-menu>
    <v-search
      name="search"
      placeholder="Поиск ..."
      class="header__search"
    ></v-search>
    <div class="header__container">
      <v-notification></v-notification>
      <v-user-details></v-user-details>
    </div>
  </header>
</template>

<script>
import VSearch from "../components/VSearch.vue";
import VNotification from "../components/VNotification.vue";
import VUserDetails from "../components/VUserDetails.vue";
import VMobileMenu from "../components/VMobileMenu.vue";

export default {
  name: "TheHeader",
  components: {
    VSearch,
    VNotification,
    VUserDetails,
    VMobileMenu,
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.header-wrp {
  width: calc(100vw - 285px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2.5px 9.5px rgba(90, 97, 105, 0.12);

  @media #{$media} and (min-width: $tablet-min) and (max-width: $tablet-max) {
    width: 100vw;
    flex-wrap: wrap;
  }

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    width: 100vw;
    flex-wrap: wrap;
  }
}

.header__search {
  width: 70%;
  margin: 0 0 0 25px;

  @media #{$media} and (min-width: $tablet-min) and (max-width: $tablet-max) {
    width: 100%;
    margin: 0;
    padding: 10px;
    border-bottom: 1px solid $color-grey-light;
  }

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    width: 100%;
    margin: 0;
    padding: 10px;
    border-bottom: 1px solid $color-grey-light;
  }
}

.header__container {
  display: flex;
  flex-direction: row;

  @media #{$media} and (min-width: $tablet-min) and (max-width: $tablet-max) {
    justify-content: space-between;
    width: 100%;
  }

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    justify-content: space-between;
    width: 100%;
  }
}
</style>
