<template>
  <div class="panel-wrp">
    <div class="panel-sidebar">
      <the-sidebar></the-sidebar>
    </div>
    <div class="panel-content">
      <the-header></the-header>
      <div class="section-content">
        <router-view></router-view>
      </div>
      <the-footer></the-footer>
    </div>
  </div>
</template>

<script>
import TheSidebar from "../components/TheSidebar.vue";
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";

export default {
  name: "AdminPanel",
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.panel-wrp {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.panel-sidebar {
  @media #{$media} and (min-width: $tablet-min) and (max-width: $tablet-max) {
    display: none;
  }

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    display: none;
  }
}

.panel-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media #{$media} and (min-width: $desktop-min) and (max-width: $desktop-max) {
    height: 100vh;
  }

  @media #{$media} and (min-width: $tablet-min) and (max-width: $tablet-max) {
    height: 100vh;
  }

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    height: calc(100vh - 80px);
  }
}

.section-content {
  width: 100%;
  height: 100%;
  overflow-x: scroll;

  // @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
  //   overflow-x: scroll;
  // }
}
</style>
