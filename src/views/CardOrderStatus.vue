<template>
  <div class="card">
    <h2 class="card__title">Карточка статуса заказа</h2>
    <div class="card-entity">
      <section class="card-entity__details">
        <h3 class="card-entity__title">Настройки статуса заказа</h3>
        <div class="card-entity__content">
          <div class="card-entity__data">
            <v-input
              v-model:inputValue="orderStatusName"
              label="Название статуса заказа"
              name="orderStatus"
              placeholder="Введите название статуса заказа"
              class="input input__entity-name"
            ></v-input>
          </div>
        </div>
        <div class="card-entity__button-bar">
          <div class="card-entity__button">
            <v-button
              v-if="orderStatusId"
              type="button"
              theme="confirm"
              :disabled="!isFilledUp"
              :class="{ btn_disabled: !isFilledUp }"
              class="card-car__button-item"
              @click="changeOrderStatusItem"
            >
              Изменить
            </v-button>
            <v-button
              v-else
              type="button"
              theme="confirm"
              :disabled="!isFilledUp"
              :class="{ btn_disabled: !isFilledUp }"
              class="card-car__button-item"
              @click="createOrderStatusItem"
            >
              Сохранить
            </v-button>
            <v-button
              type="button"
              theme="cancel"
              :disabled="!isFilledUp"
              :class="{ btn_disabled: !isFilledUp }"
              class="card-car__button-item"
              @click="resetOrderStatusItem"
            >
              Отменить
            </v-button>
          </div>
          <v-button
            type="button"
            theme="delete"
            class="card-car__button-item"
            :disabled="!orderStatusId"
            :class="{ btn_disabled: !orderStatusId }"
            @click="deleteOrderStatusItem"
          >
            Удалить
          </v-button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";

import { entityAPI } from "@/api/entityAPI";

import VInput from "../components/VInput.vue";
import VButton from "../components/VButton.vue";

export default {
  name: "CardOrderStatus",
  components: {
    VInput,
    VButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const selectedOrderStatus = computed(
      () => store.state.orderStatusesModule.selectedOrderStatus
    );

    const orderStatusId = computed({
      get: () => {
        return Object.keys(selectedOrderStatus.value).length !== 0
          ? selectedOrderStatus.value?.id
          : null;
      },
      set: (newOrderStatusId) =>
        store.commit(
          "orderStatusesModule/SET_ORDERSTATUS_ID_TO_STATE",
          newOrderStatusId
        ),
    });

    const orderStatusName = computed({
      get: () => {
        return Object.keys(selectedOrderStatus.value).length !== 0
          ? selectedOrderStatus.value?.name
          : null;
      },
      set: (orderStatusName) =>
        store.commit(
          "orderStatusesModule/SET_ORDERSTATUS_NAME_TO_STATE",
          orderStatusName
        ),
    });

    const createOrderStatusItem = async () => {
      const newOrderStatusItem = await entityAPI.postCreateOrderStatusItem({
        name: orderStatusName.value,
      });

      orderStatusId.value = newOrderStatusItem.data.data.id;
    };

    const deleteOrderStatusItem = async () => {
      await entityAPI.deleteOrderStatusItem(orderStatusId.value);
      store.commit("orderStatusesModule/RESET_SELECTEDORDERSTATUS_TO_STATE");
      router.push({ name: "card-orderstatus" });
    };

    const resetOrderStatusItem = () => {
      store.commit("orderStatusesModule/RESET_SELECTEDORDERSTATUS_TO_STATE");
      router.push({ name: "orderstatuses" });
    };

    const changeOrderStatusItem = async () => {
      await entityAPI.putChangeOrderStatusItem(orderStatusId.value, {
        name: orderStatusName.value,
      });
    };

    const isFilledUp = computed(() => orderStatusName.value);

    return {
      orderStatusId,
      orderStatusName,
      createOrderStatusItem,
      deleteOrderStatusItem,
      resetOrderStatusItem,
      changeOrderStatusItem,
      isFilledUp,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";
</style>
