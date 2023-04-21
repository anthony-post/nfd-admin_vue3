<template>
  <div class="card">
    <h2 class="card__title">Карточка города</h2>
    <div class="card-entity">
      <section class="card-entity__details">
        <h3 class="card-entity__title">Настройки города</h3>
        <div class="card-entity__content">
          <div class="card-entity__data">
            <v-input
              v-model:inputValue="cityName"
              label="Название города"
              name="city-name"
              placeholder="Введите название города"
              class="input input__entity-name"
            ></v-input>
          </div>
        </div>
        <div class="card-entity__button-bar">
          <div class="card-entity__button">
            <v-button
              v-if="cityId"
              type="button"
              theme="confirm"
              :disabled="!isFilledUp"
              :class="{ btn_disabled: !isFilledUp }"
              class="card-car__button-item"
              @click="changeCityItem"
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
              @click="createCityItem"
            >
              Сохранить
            </v-button>
            <v-button
              type="button"
              theme="cancel"
              class="card-car__button-item"
              @click="resetCityItem"
            >
              Отменить
            </v-button>
          </div>
          <v-button
            type="button"
            theme="delete"
            class="card-car__button-item"
            :disabled="!cityId"
            :class="{ btn_disabled: !cityId }"
            @click="deleteCityItem"
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
  name: "CardCity",
  components: {
    VInput,
    VButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const selectedCity = computed(() => store.state.citiesModule.selectedCity);

    const cityId = computed({
      get: () => {
        return Object.keys(selectedCity.value).length !== 0
          ? selectedCity.value?.id
          : null;
      },
      set: (newCityId) =>
        store.commit("citiesModule/SET_CITY_ID_TO_STATE", newCityId),
    });

    const cityName = computed({
      get: () => {
        return Object.keys(selectedCity.value).length !== 0
          ? selectedCity.value?.name
          : null;
      },
      set: (cityName) =>
        store.commit("citiesModule/SET_CITY_NAME_TO_STATE", cityName),
    });

    const createCityItem = async () => {
      const newCityItem = await entityAPI.postCreateCityItem({
        name: cityName.value,
      });

      cityId.value = newCityItem.data.data.id;
    };

    const deleteCityItem = async () => {
      await entityAPI.deleteCityItem(cityId.value);
      store.commit("citiesModule/RESET_SELECTEDCITY_TO_STATE");
      router.push({ name: "card-city" });
    };

    const resetCityItem = () => {
      store.commit("citiesModule/RESET_SELECTEDCITY_TO_STATE");
      router.push({ name: "cities" });
    };

    const changeCityItem = async () => {
      await entityAPI.putChangeCityItem(cityId.value, {
        name: cityName.value,
      });
    };

    const isFilledUp = computed(() => cityName.value);

    return {
      selectedCity,
      cityId,
      cityName,
      createCityItem,
      deleteCityItem,
      resetCityItem,
      changeCityItem,
      isFilledUp,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";
</style>
