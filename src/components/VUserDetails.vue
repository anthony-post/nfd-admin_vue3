<template>
  <div class="user-details-wrp">
    <div class="user-container">
      <img :src="user.avatar" alt="avatar" class="user__avatar" />
      <p class="user__role">{{ user.role }}</p>
    </div>
    <div class="dropdown-icon"></div>
  </div>
</template>

<script>
export default {
  name: "VUserDetails",
  setup() {
    const user = {
      id: 1,
      name: "Имя",
      role: "Admin",
      avatar: `${require("../assets/img/user-avatar.jpg")}`,
    };
    return {
      user,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.user-details-wrp {
  width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    padding: 0 15px;
    width: 65%;
    justify-content: flex-end;
  }
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
}
</style>
