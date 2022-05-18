<template>
  <div class="panel-wrp">
    <the-sidebar></the-sidebar>
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

.panel-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.section-content {
  width: 100%;
  height: 100%;
}
</style>
