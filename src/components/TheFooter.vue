<template>
  <footer class="footer-wrp">
    <ul class="footer-list">
      <li>
        <router-link to="/admin-panel" class="footer__link"
          >Главная страница</router-link
        >
      </li>
      <li>
        <router-link to="/admin-panel/error-page" class="footer__link"
          >Error</router-link
        >
      </li>
    </ul>
    <p class="footer__copyright">Copyright © 2020 Simbirsoft</p>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.footer-wrp {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -0.5px 0px #d7dae3;
  padding: 25px;
  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    padding: 15px;
  }
}

.footer-list {
  display: flex;
  flex-direction: row;
}

.footer__link {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: $color-blue;
}

.footer__link:first-child {
  margin: 0 16px 0 0;
}

.footer__link:last-child {
  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    display: none;
  }
}

.footer__copyright {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  color: $color-grey-middle;
  margin: 0;
}
</style>
