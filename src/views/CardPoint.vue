<template>
  <div class="card">
    <h2 class="card__title">Карточка пункта выдачи</h2>
    <div class="card-entity">
      <section class="card-entity__details">
        <h3 class="card-entity__title">Настройки пункта выдачи</h3>
        <div class="card-entity__content">
          <div class="card-entity__data">
            <v-input
              v-model:inputValue="pointName"
              label="Название пункта выдачи"
              name="point-name"
              placeholder="Введите название пункта выдачи"
              class="input input__entity-name"
            ></v-input>
          </div>
          <div class="card-entity__data">
            <v-dropdown
              id="dropdownCityPoint"
              :itemList="cityList"
              :selectedItem="pointCity?.name"
              label="Город"
              name="city"
              placeholder="Выберите город"
              class="input input__car-category"
              @on-item-selected="setSelectedPointCity"
            ></v-dropdown>
          </div>
          <div class="card-entity__data">
            <v-input
              v-model:inputValue="pointAddress"
              label="Адрес"
              name="point-address"
              placeholder="Введите адрес"
              class="input input__entity-name"
            ></v-input>
          </div>
        </div>
        <div class="card-entity__button-bar">
          <div class="card-entity__button">
            <v-button
              v-if="pointId"
              type="button"
              theme="confirm"
              :disabled="!isFilledUp"
              :class="{ btn_disabled: !isFilledUp }"
              class="card-car__button-item"
              @click="changePointItem"
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
              @click="createPointItem"
            >
              Сохранить
            </v-button>
            <v-button
              type="button"
              theme="cancel"
              :disabled="!isFilledUp"
              :class="{ btn_disabled: !isFilledUp }"
              class="card-car__button-item"
              @click="resetPointItem"
            >
              Отменить
            </v-button>
          </div>
          <v-button
            type="button"
            theme="delete"
            class="card-car__button-item"
            :disabled="!pointId"
            :class="{ btn_disabled: !pointId }"
            @click="deletePointItem"
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
  name: "CardPoint",
  components: {
    VInput,
    VDropdown,
    VButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const cityList = computed(() => store.state.cityModule.cityList);

    const selectedPoint = computed(
      () => store.state.pointsModule.selectedPoint
    );

    const pointId = computed({
      get: () => {
        return Object.keys(selectedPoint.value).length !== 0
          ? selectedPoint.value?.id
          : null;
      },
      set: (newPointId) =>
        store.commit("pointsModule/SET_POINT_ID_TO_STATE", newPointId),
    });

    const pointName = computed({
      get: () => {
        return Object.keys(selectedPoint.value).length !== 0
          ? selectedPoint.value?.name
          : null;
      },
      set: (pointName) =>
        store.commit("pointsModule/SET_POINT_NAME_TO_STATE", pointName),
    });

    const pointCity = computed({
      get: () => {
        return Object.keys(selectedPoint.value).length !== 0
          ? selectedPoint.value?.cityId
          : null;
      },
      set: (pointCity) =>
        store.commit("pointsModule/SET_POINT_CITYID_TO_STATE", pointCity),
    });

    const setSelectedPointCity = (chosenPointCity) =>
      (pointCity.value = chosenPointCity);

    const pointAddress = computed({
      get: () => {
        return Object.keys(selectedPoint.value).length !== 0
          ? selectedPoint.value?.address
          : null;
      },
      set: (pointAddress) =>
        store.commit("pointsModule/SET_POINT_ADDRESS_TO_STATE", pointAddress),
    });

    const createPointItem = async () => {
      const newPointItem = await entityAPI.postCreatePointItem({
        name: pointName.value,
        address: pointAddress.value,
        cityId: pointCity.value,
      });

      pointId.value = newPointItem.data.data.id;
    };

    const deletePointItem = async () => {
      await entityAPI.deletePointItem(pointId.value);
      store.commit("pointsModule/RESET_SELECTEDPOINT_TO_STATE");
      router.push({ name: "card-point" });
    };

    const resetPointItem = () => {
      store.commit("pointsModule/RESET_SELECTEDPOINT_TO_STATE");
      router.push({ name: "pickup-points" });
    };

    const changePointItem = async () => {
      await entityAPI.putChangePointItem(pointId.value, {
        name: pointName.value,
        address: pointAddress.value,
        cityId: pointCity.value,
      });
    };

    const isFilledUp = computed(
      () => pointName.value && pointAddress.value && pointCity.value
    );

    return {
      selectedPoint,
      cityList,
      pointId,
      pointName,
      pointCity,
      setSelectedPointCity,
      pointAddress,
      createPointItem,
      deletePointItem,
      resetPointItem,
      changePointItem,
      isFilledUp,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";
</style>
