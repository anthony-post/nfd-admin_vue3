<template>
  <div class="notification-wrp">
    <v-icon
      icon-id="icon-bell"
      width="17"
      height="21"
      class="notification__bell"
    ></v-icon>
    <div v-if="notificationCounter" class="notification__circle">
      {{ notificationCounter }}
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

import VIcon from "../components/VIcon.vue";

export default {
  name: "VNotification",
  components: {
    VIcon,
  },
  setup() {
    const store = useStore();

    const orderList = computed(() => {
      return store.state.ordersModule.ordersAll || [];
    });

    const getOrderListFromApi = () => {
      store.dispatch("ordersModule/GET_ALLORDERLIST_FROM_API");
    };

    const newOrderStatusId = {
      id: 1,
      name: "Новый",
    };

    const notificationCounter = computed(() =>
      orderList.value.reduce((acc, order) => {
        if (
          order?.orderStatusId?.id === newOrderStatusId.id ||
          order?.orderStatusId === null
        ) {
          return (acc += 1);
        }
        return acc;
      }, 0)
    );

    getOrderListFromApi();

    return {
      notificationCounter,
      orderList,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.notification-wrp {
  position: relative;
  padding: 21px 25px;
  box-shadow: 0.5px 0px 0px #cacedb, -0.5px 0px 0px #cacedb;

  @media #{$media} and (min-width: $tablet-min) and (max-width: $tablet-max) {
    padding: 13px 25px;
  }

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    padding: 13px 25px;
  }
}

.notification__bell {
  fill: $color-grey-middle;
}

.notification__circle {
  width: 14px;
  height: 14px;
  background: $color-notification-circle;
  border-radius: 50%;

  position: absolute;
  top: 35px;
  left: 35px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 9px;
  line-height: 14px;
  color: $color-white;
  text-align: center;

  @media #{$media} and (min-width: $tablet-min) and (max-width: $tablet-max) {
    top: 25px;
  }

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    top: 25px;
  }
}
</style>
