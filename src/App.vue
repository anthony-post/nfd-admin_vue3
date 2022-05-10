<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/assets/variables.scss";
@import "@/assets/styles.scss";

.wrapper {
  display: flex;
  flex-direction: row;
  max-width: 100vw;
  min-width: 1440px;

  @media #{$media} and (min-width: $desktop-min) and (max-width: $desktop-max) {
    min-width: 1024px;
    max-width: 1439px;
  }

  @media #{$media} and (min-width: $tablet-min) and (max-width: $tablet-max) {
    min-width: 768px;
    max-width: 1023px;
  }

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 320px;
    max-width: 767px;
    height: calc(100vh - 80px);
    height: -webkit-fill-available;
  }
}
</style>
