<template>
  <div class="navigation-wrp">
    <div class="burger-button" @click="toggleNav">
      <v-icon icon-id="icon-bars" width="32" height="32" />
    </div>
    <transition name="nav">
      <div v-show="dropdownNav" class="dropdown-nav">
        <div class="x-button">
          <v-icon icon-id="icon-x" width="32" height="32" @click="toggleNav" />
        </div>
        <div class="menu-wrp">
          <the-sidebar @close-mobile-sidebar="toggleNav"></the-sidebar>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from "vue";
import VIcon from "../components/VIcon.vue";
import TheSidebar from "../components/TheSidebar.vue";

export default {
  name: "VMobileMenu",
  components: {
    VIcon,
    TheSidebar,
  },
  setup() {
    const dropdownNav = ref(false);

    const toggleNav = () => (dropdownNav.value = !dropdownNav.value);

    return {
      dropdownNav,
      toggleNav,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.navigation-wrp {
  position: relative;
  display: none;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    display: block;
  }
}

.burger-button {
  position: fixed;
  top: 5px;
  right: 20px;
  cursor: pointer;
  z-index: 10;
}

.x-button {
  position: fixed;
  top: 5px;
  right: 20px;
  cursor: pointer;
}

.dropdown-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $color-background;
  z-index: 99;
}

//animation
.nav-enter-active,
.nav-leave-active {
  transition: 1s ease all;
}
.nav-enter-from,
.nav-leave-to {
  transform: translateX(100%);
}
.nav-enter-to {
  transform: translateX(0);
}
</style>
