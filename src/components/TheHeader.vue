<template>
  <header class="header-wrp">
    <v-search
      name="search"
      placeholder="Поиск ..."
      class="header__search"
    ></v-search>
    <v-notification></v-notification>
    <v-user-details></v-user-details>
  </header>
</template>

<script>
import VSearch from "../components/VSearch.vue";
import VNotification from "../components/VNotification.vue";
import VUserDetails from "../components/VUserDetails.vue";

export default {
  name: "TheHeader",
  components: {
    VSearch,
    VNotification,
    VUserDetails,
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.header-wrp {
  width: calc(100vw - 285px);
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0px 2.5px 9.5px rgba(90, 97, 105, 0.12);
}

.header__search {
  width: 70%;
  margin: 0 0 0 25px;
}
</style>
