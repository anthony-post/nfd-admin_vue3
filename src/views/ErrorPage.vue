<template>
  <div class="error-page">
    <h2 class="error-page__title">{{ errorNumber }}</h2>
    <p class="error-page__description">Что-то пошло не так</p>
    <p class="error-page__text">Попробуйте перезагрузить страницу</p>
    <router-link to="/admin-panel" class="footer__link">
      <v-button type="button" theme="confirm">Назад </v-button>
    </router-link>
  </div>
</template>

<script>
import VButton from "../components/VButton.vue";

export default {
  name: "ErrorPage",
  components: {
    VButton,
  },
  props: {
    resource: {
      type: String,
      required: true,
      default: "page",
    },
  },
  setup() {
    const errorNumber = "404";

    return {
      errorNumber,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.error-page {
  text-align: center;

  &__title {
    font-family: $font2;
    font-style: normal;
    font-weight: 500;
    font-size: 75px;
    line-height: 88px;
    color: $color-icon-not-active;
  }

  &__description {
    font-family: $ff;
    font-style: normal;
    font-weight: 400;
    font-size: 50px;
    line-height: 57px;
    color: $color-text;
    margin: 0;
  }

  &__text {
    font-family: $ff;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: $color-grey-middle;
  }
}

.checkbox_blocked {
  pointer-events: none; //block switching checkbox
}
</style>
