<template>
  <div class="user-details-wrp">
    <div class="user-container">
      <img :src="user.avatar" alt="avatar" class="user__avatar" />
      <p class="user__role">{{ user.role }}</p>
    </div>
    <div class="dropdown-icon" @click="toggleDropDown"></div>
    <div v-show="isDropDownVisible" class="user-menu user-button">
      <v-button type="button" theme="cancel" @click="onLogout">Выйти </v-button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";

import VButton from "../components/VButton.vue";

export default {
  name: "VUserDetails",
  components: {
    VButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const user = {
      id: 1,
      name: "User1",
      role: "Admin",
      avatar: `${require("../assets/img/avatar.jpeg")}`,
    };

    const isDropDownVisible = ref(false);

    const toggleDropDown = () => {
      isDropDownVisible.value = !isDropDownVisible.value;
    };

    const onLogout = async () => {
      try {
        //вызов action с POST запросом
        await store.dispatch("authModule/ON_LOGOUT");
        //редирект на страницу
        router.push({ name: "login" });
      } catch (error) {
        throw new Error(error);
      }
    };

    return {
      user,
      isDropDownVisible,
      toggleDropDown,
      onLogout,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.user-details-wrp {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;

  position: relative;
}

.user-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.user__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user__role {
  padding: 0 14px;
}

.dropdown-icon {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid $color-dropdown-icon;
  margin: 1px 0 0 0;

  &:hover {
    cursor: pointer;
  }
}

.user-menu {
  position: absolute;
  top: 50px;
  right: 20px;
}
</style>
