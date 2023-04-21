<template>
  <div class="card">
    <h2 class="card__title">Карточка типа тарифа</h2>
    <div class="card-entity">
      <section class="card-entity__details">
        <h3 class="card-entity__title">Настройки типа тарифа</h3>
        <div class="card-entity__content">
          <div class="card-entity__data">
            <v-input
              v-model:inputValue="rateTypeName"
              label="Название типа тарифа"
              name="ratetype"
              placeholder="Введите название типа тарифа"
              class="input input__entity-name"
            ></v-input>
            <v-input
              v-model:inputValue="rateTypeUnit"
              label="Единица измерения тарифа"
              name="ratetype-unit"
              placeholder="Введите единицу измерения тарифа"
              class="input input__entity-name"
            ></v-input>
          </div>
        </div>
        <div class="card-entity__button-bar">
          <div class="card-entity__button">
            <v-button
              v-if="rateTypeId"
              type="button"
              theme="confirm"
              :disabled="!isFilledUp"
              :class="{ btn_disabled: !isFilledUp }"
              class="card-car__button-item"
              @click="changeRateTypeItem"
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
              @click="createRateTypeItem"
            >
              Сохранить
            </v-button>
            <v-button
              type="button"
              theme="cancel"
              :disabled="!isFilledUp"
              :class="{ btn_disabled: !isFilledUp }"
              class="card-car__button-item"
              @click="resetRateTypeItem"
            >
              Отменить
            </v-button>
          </div>
          <v-button
            type="button"
            theme="delete"
            class="card-car__button-item"
            :disabled="!rateTypeId"
            :class="{ btn_disabled: !rateTypeId }"
            @click="deleteRateTypeItem"
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
  name: "CardTypeRate",
  components: {
    VInput,
    VButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const selectedRateType = computed(
      () => store.state.rateTypesModule.selectedRateType
    );

    const rateTypeId = computed({
      get: () => {
        return Object.keys(selectedRateType.value).length !== 0
          ? selectedRateType.value?.id
          : null;
      },
      set: (newRateTypeId) =>
        store.commit("rateTypesModule/SET_RATETYPE_ID_TO_STATE", newRateTypeId),
    });

    const rateTypeName = computed({
      get: () => {
        return Object.keys(selectedRateType.value).length !== 0
          ? selectedRateType.value?.name
          : null;
      },
      set: (rateTypeName) =>
        store.commit(
          "rateTypesModule/SET_RATETYPE_NAME_TO_STATE",
          rateTypeName
        ),
    });

    const rateTypeUnit = computed({
      get: () => {
        return Object.keys(selectedRateType.value).length !== 0
          ? selectedRateType.value?.unit
          : null;
      },
      set: (rateTypeUnit) =>
        store.commit(
          "rateTypesModule/SET_RATETYPE_UNIT_TO_STATE",
          rateTypeUnit
        ),
    });

    const createRateTypeItem = async () => {
      const newRateTypeItem = await entityAPI.postCreateRateTypeItem({
        name: rateTypeName.value,
        unit: rateTypeUnit.value,
      });

      rateTypeId.value = newRateTypeItem.data.data.id;
    };

    const deleteRateTypeItem = async () => {
      await entityAPI.deleteRateTypeItem(rateTypeId.value);
      store.commit("rateTypesModule/RESET_SELECTEDRATETYPE_TO_STATE");
      router.push({ name: "card-ratetype" });
    };

    const resetRateTypeItem = () => {
      store.commit("rateTypesModule/RESET_SELECTEDRATETYPE_TO_STATE");
      router.push({ name: "typerates" });
    };

    const changeRateTypeItem = async () => {
      await entityAPI.putChangeRateTypeItem(rateTypeId.value, {
        name: rateTypeName.value,
        unit: rateTypeUnit.value,
      });
    };

    const isFilledUp = computed(() => rateTypeName.value && rateTypeUnit.value);

    return {
      selectedRateType,
      rateTypeId,
      rateTypeName,
      rateTypeUnit,
      createRateTypeItem,
      deleteRateTypeItem,
      resetRateTypeItem,
      changeRateTypeItem,
      isFilledUp,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";
</style>
