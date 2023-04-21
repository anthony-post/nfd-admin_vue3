<template>
  <div class="card">
    <h2 class="card__title">Карточка тарифа</h2>
    <div class="card-entity">
      <section class="card-entity__details">
        <h3 class="card-entity__title">Настройки тарифа</h3>
        <div class="card-entity__content">
          <div class="card-entity__data">
            <v-dropdown
              id="dropdownRateType"
              :itemList="rateTypeList"
              :selectedItem="rateName?.name"
              label="Название тарифа"
              name="rate"
              placeholder="Выберите тип тарифа"
              class="input input__car-category"
              @on-item-selected="setSelectedRateType"
            ></v-dropdown>
          </div>
          <div class="card-entity__data">
            <v-input
              v-model:inputValue="ratePrice"
              label="Цена тарифа"
              name="rate-price"
              placeholder="Введите цену тарифа"
              class="input input__entity-name"
            ></v-input>
          </div>
        </div>
        <div class="card-entity__button-bar">
          <div class="card-entity__button">
            <v-button
              v-if="rateId"
              type="button"
              theme="confirm"
              :disabled="!isFilledUp"
              :class="{ btn_disabled: !isFilledUp }"
              class="card-car__button-item"
              @click="changeRateItem"
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
              @click="createRateItem"
            >
              Сохранить
            </v-button>
            <v-button
              type="button"
              theme="cancel"
              :disabled="!isFilledUp"
              :class="{ btn_disabled: !isFilledUp }"
              class="card-car__button-item"
              @click="resetRateItem"
            >
              Отменить
            </v-button>
          </div>
          <v-button
            type="button"
            theme="delete"
            class="card-car__button-item"
            :disabled="!rateId"
            :class="{ btn_disabled: !rateId }"
            @click="deleteRateItem"
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
import VDropdown from "../components/VDropdown.vue";
import VButton from "../components/VButton.vue";

export default {
  name: "CardRate",
  components: {
    VInput,
    VDropdown,
    VButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    //TO DO получение списка типов тарифов по API
    const getRateTypeListFromApi = async () =>
      await store.dispatch("rateTypeModule/GET_RATETYPES_FROM_API");

    const rateTypeList = computed(
      () => store.state.rateTypeModule.rateTypeList
    );

    const selectedRate = computed(() => store.state.ratesModule.selectedRate);

    const rateId = computed({
      get: () => {
        return Object.keys(selectedRate.value).length !== 0
          ? selectedRate.value?.id
          : null;
      },
      set: (newRateId) =>
        store.commit("ratesModule/SET_RATE_ID_TO_STATE", newRateId),
    });

    const rateName = computed({
      get: () => {
        return Object.keys(selectedRate.value).length !== 0
          ? selectedRate.value?.rateTypeId
          : null;
      },
      set: (rateName) =>
        store.commit("ratesModule/SET_RATETYPE_NAME_TO_STATE", rateName),
    });

    const setSelectedRateType = (chosenRateType) =>
      (rateName.value = chosenRateType);

    const ratePrice = computed({
      get: () => {
        return Object.keys(selectedRate.value).length !== 0
          ? selectedRate.value?.price
          : null;
      },
      set: (ratePrice) =>
        store.commit("ratesModule/SET_RATE_PRICE_TO_STATE", ratePrice),
    });

    const createRateItem = async () => {
      const newRateItem = await entityAPI.postCreateRateItem({
        rateTypeId: rateName.value,
        price: ratePrice.value,
      });

      rateId.value = newRateItem.data.data.id;
    };

    const deleteRateItem = async () => {
      await entityAPI.deleteRateItem(rateId.value);
      store.commit("ratesModule/RESET_SELECTEDRATE_TO_STATE");
      router.push({ name: "card-rate" });
    };

    const resetRateItem = () => {
      store.commit("ratesModule/RESET_SELECTEDRATE_TO_STATE");
      router.push({ name: "rates" });
    };

    const changeRateItem = async () => {
      await entityAPI.putChangeRateItem(rateId.value, {
        rateTypeId: rateName.value,
        price: ratePrice.value,
      });
    };

    const isFilledUp = computed(() => rateName.value && ratePrice.value);

    getRateTypeListFromApi();

    return {
      rateTypeList,
      selectedRate,
      rateId,
      rateName,
      setSelectedRateType,
      ratePrice,
      createRateItem,
      deleteRateItem,
      resetRateItem,
      changeRateItem,
      isFilledUp,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";
</style>
