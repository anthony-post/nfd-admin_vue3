<template>
  <div class="card">
    <h2 class="card__title">Карточка заказа</h2>
    <div class="card-order">
      <section class="card-order__img">
        <div class="card-order__img-wrp">
          <img :src="thumbnailPath" alt="car" class="card-order__pic" />
          <p class="card-order__model">{{ car?.name }}</p>
          <p class="card-order__category">{{ car?.categoryId?.name }}</p>
        </div>
        <div class="card-order__description">
          <h4 class="card-order__description-title">Описание</h4>
          <p class="card-order__description-text">
            {{ car?.description }}
          </p>
        </div>
        <div class="card-order__summary">
          <dl class="card-order__summary-wrp">
            <dt class="card-order__summary-title">Статус заказа:</dt>
            <dd class="card-order__summary-data">
              {{ orderStatus?.name }}
            </dd>
          </dl>
          <dl class="card-order__summary-wrp">
            <dt class="card-order__summary-title">Длительность:</dt>
            <dd
              v-if="dateTimeFrom && dateTimeTo"
              class="card-order__summary-data"
            >
              {{ rentalDuration.days }}д. {{ rentalDuration.hours }}ч.
            </dd>
          </dl>
          <dl class="card-car__progress-bar-wrp card-order__price">
            <dt class="card-car__progress-bar-title">Тариф:</dt>
            <dd class="card-car__progress-bar-data card-order__price-data">
              {{ nameRate }}
            </dd>
          </dl>
          <dl class="card-order__summary-wrp">
            <dt class="card-order__summary-title">Цена:</dt>
            <dd class="card-order__summary-data card-order__summary-price">
              <v-input
                v-model:inputValue="price"
                name="price"
                placeholder="Введите цену"
                class="input input__order-additional"
              ></v-input>
              <span>P</span>
            </dd>
          </dl>
        </div>
      </section>
      <section class="card-order__details">
        <h3 class="card-order__details-title">Настройки заказа</h3>
        <div class="card-order__details-content">
          <!--car and color-->
          <div class="card-order__details-data">
            <v-dropdown
              id="dropdownCarModel"
              :itemList="carList"
              :selectedItem="car?.name"
              label="Модель"
              name="carmodel"
              placeholder="Выберите модель"
              class="input input__car-category"
              @on-item-selected="setSelectedCar"
            ></v-dropdown>
            <v-dropdown
              id="dropdownColor"
              :itemList="colorListByCar"
              :selectedItem="color"
              label="Цвет"
              name="color"
              placeholder="Выберите цвет"
              class="input input__car-category"
              @on-item-selected="setSelectedColor"
            ></v-dropdown>
          </div>
          <!--city and point-->
          <div class="card-order__details-data">
            <v-dropdown
              id="dropdownCity"
              :itemList="cityList"
              :selectedItem="city?.name"
              label="Город"
              name="city"
              placeholder="Выберите город"
              class="input input__order-city"
              @on-item-selected="setSelectedCity"
            ></v-dropdown>
            <!--filtered point list by the chosen city-->
            <v-dropdown
              id="dropdownPoint"
              :itemList="pointList"
              :selectedItem="point?.name"
              label="Пункт выдачи"
              name="point"
              placeholder="Выберите пункт выдачи"
              class="input input__order-point"
              @on-item-selected="setSelectedPoint"
            ></v-dropdown>
          </div>

          <div class="card-order__details-data-wrp">
            <!--date-->
            <div class="card-order__details-block">
              <v-select-date-time
                pretext="C"
                :optionsDate="arrayDate"
                :optionsTime="arrayTime"
                :selectedDateTime="dateTimeFrom"
                class="card-order__details-date"
                @setDateTime="setSelectedFrom"
                @resetDateTime="resetSelectedFrom"
                @selectDate="setDateFrom"
                @selectTime="setTimeFrom"
              ></v-select-date-time>
              <v-select-date-time
                pretext="По"
                :optionsDate="arrayDate"
                :optionsTime="arrayTime"
                :selectedDateTime="dateTimeTo"
                class="card-order__details-date"
                @setDateTime="setSelectedTo"
                @resetDateTime="resetSelectedTo"
                @selectDate="setDateTo"
                @selectTime="setTimeTo"
              ></v-select-date-time>
            </div>
            <div class="card-order__details-block">
              <!--rate-->
              <v-dropdown
                id="dropdownRate"
                :itemList="rateNameList"
                :selectedItem="nameRate"
                label="Тариф"
                name="rate"
                placeholder="Выберите тариф"
                class="input input__order-additional"
                @on-item-selected="setSelectedRate"
              ></v-dropdown>
              <!--order status-->
              <v-dropdown
                id="dropdownOrderStatus"
                :itemList="orderStatusList"
                :selectedItem="orderStatus?.name"
                label="Статус заказа"
                name="orderStatus"
                placeholder="Выберите статус заказа"
                class="input input__order-additional"
                @on-item-selected="setSelectedOrderStatus"
              ></v-dropdown>
            </div>
          </div>
          <!--additional-->
          <div class="card__order-additional">
            <div>
              <v-checkbox v-model="checkedTank" label="Полный бак"></v-checkbox>
              <v-checkbox
                v-model="checkedChildChair"
                label="Детское кресло"
              ></v-checkbox>
              <v-checkbox
                v-model="checkedRightWheel"
                label="Правый руль"
              ></v-checkbox>
            </div>
          </div>
        </div>
        <!--buttons-->
        <div class="card-order__button-bar">
          <div class="card-order__button">
            <v-button
              type="button"
              theme="confirm"
              class="card-order__button-item"
              @click="changeOrder"
            >
              Изменить
            </v-button>
            <router-link to="orders">
              <v-button
                type="button"
                theme="cancel"
                class="card-order__button-item"
              >
                Назад
              </v-button>
            </router-link>
          </div>
          <v-button
            type="button"
            theme="delete"
            class="card-order__button-item"
            @click="cancelOrder"
          >
            Отменить
          </v-button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, onMounted } from "vue";
import { watch } from "vue";

import VButton from "../components/VButton.vue";
import VDropdown from "../components/VDropdown.vue";
import VSelectDateTime from "../components/VSelectDateTime.vue";
import VCheckbox from "../components/VCheckbox.vue";
import VInput from "../components/VInput.vue";

import { convertToDays } from "@/services/convertToDays.js";
import { entityAPI } from "@/api/entityAPI";

export default {
  name: "CardOrder",
  components: {
    VButton,
    VDropdown,
    VSelectDateTime,
    VCheckbox,
    VInput,
  },
  setup() {
    const store = useStore();

    const selectedOrder = computed(
      () => store.state.ordersModule.selectedOrder
    );

    const cancelOrder = async () => {
      const orderId = selectedOrder.value.id;
      const canceledOrdersStatusId = {
        id: 7,
        name: "Отмененный",
      };

      try {
        await entityAPI.putOrderStatusId(orderId, {
          orderStatusId: canceledOrdersStatusId,
          cityId: selectedOrder.value.cityId,
          pointId: selectedOrder.value.pointId,
          carId: selectedOrder.value.carId,
          rateId: selectedOrder.value.rateId,
          color: selectedOrder.value.color,
          dateFrom: selectedOrder.value.dateFrom,
          dateTo: selectedOrder.value.dateTo,
          price: selectedOrder.value.price,
          isFullTank: selectedOrder.value.isFullTank,
          isNeedChildChair: selectedOrder.value.isNeedChildChair,
          isRightWheel: selectedOrder.value.isRightWheel,
        });
      } catch (error) {
        throw new Error(error);
      }
    };

    const changeOrder = async () => {
      const orderId = selectedOrder.value.id;
      try {
        await entityAPI.putChangeOrder(orderId, {
          orderStatusId: selectedOrder.value.orderStatusId,
          cityId: selectedOrder.value.cityId,
          pointId: selectedOrder.value.pointId,
          carId: selectedOrder.value.carId,
          rateId: selectedOrder.value.rateId,
          color: selectedOrder.value.color,
          dateFrom: selectedOrder.value.dateFrom,
          dateTo: selectedOrder.value.dateTo,
          price: selectedOrder.value.price,
          isFullTank: selectedOrder.value.isFullTank,
          isNeedChildChair: selectedOrder.value.isNeedChildChair,
          isRightWheel: selectedOrder.value.isRightWheel,
        });
      } catch (error) {
        throw new Error(error);
      }
    };

    //dropdown cars
    const getCarsFromApi = () => store.dispatch("carModule/GET_CARS_FROM_API");

    const carList = computed(() => store.state.carModule.carList);

    const car = computed({
      get: () => {
        if (Object.keys(selectedOrder.value).length !== 0) {
          if (Object.keys(selectedOrder.value.carId).length !== 0) {
            return selectedOrder.value.carId;
          }
          return {};
        }
        return {};
      },
      set: (car) => {
        store.commit("ordersModule/SET_SELECTEDCAR_TO_STATE", car);
        //сброс цвета в dropdown при выборе другого авто
        store.commit("ordersModule/RESET_SELECTEDCOLOR_TO_STATE");
      },
    });

    const setSelectedCar = (chosenCar) => (car.value = chosenCar);

    const thumbnailPath = computed(() => {
      const defaultPath =
        "https://imgholder.ru/600x300/eeeeee/adb9ca&text=Изображение";
      if (Object.keys(selectedOrder.value).length !== 0) {
        if (selectedOrder.value.carId) {
          if (selectedOrder.value.carId.thumbnail) {
            if (selectedOrder.value.carId.thumbnail.path) {
              return selectedOrder.value.carId.thumbnail.path;
            }
          }
          return defaultPath;
        }
        return defaultPath;
      }
      return defaultPath;
    });

    //dropdown color list
    const colorListByCar = computed(() => {
      const colors = car.value.colors;
      let arr = [];

      for (let i = 0; i < colors.length; i++) {
        arr.push({ id: i, name: colors[i] });
      }
      return arr;
    });

    const color = computed({
      get: () => {
        if (Object.keys(selectedOrder.value).length !== 0) {
          if (selectedOrder.value?.color) {
            if (selectedOrder.value?.color.length !== 0) {
              return selectedOrder.value.color;
            }
            return "";
          }
          return "";
        }
        return "";
      },
      set: (color) =>
        store.commit("ordersModule/SET_SELECTEDCOLOR_TO_STATE", color),
    });

    const setSelectedColor = (chosenColor) => {
      color.value = chosenColor.name;
    };

    //dropdown city
    const getCitiesFromApi = () =>
      store.dispatch("cityModule/GET_CITIES_FROM_API");

    const cityList = computed(() => store.state.cityModule.cityList);

    const city = computed({
      get: () => {
        if (Object.keys(selectedOrder.value).length !== 0) {
          if (Object.keys(selectedOrder.value.cityId).length !== 0) {
            return selectedOrder.value.cityId;
          }
          return {};
        }
        return {};
      },
      set: (city) => {
        store.commit("ordersModule/SET_SELECTEDCITY_TO_STATE", city);
        //сброс пункта выдачи в dropdown при выборе другого города
        store.commit("ordersModule/RESET_SELECTEDPOINT_TO_STATE");
      },
    });

    const setSelectedCity = (chosenCity) => {
      city.value = chosenCity;
      getFilteredPointsFromApi();
    };

    //dropdown point
    const getFilteredPointsFromApi = async () => {
      const chosenCityObj = city.value;
      await store.dispatch("pointModule/GET_FILTERED_POINTS_FROM_API", {
        chosenCityObj,
      });
    };

    const pointList = computed(() => store.state.pointModule.pointList);

    const point = computed({
      get: () => {
        if (Object.keys(selectedOrder.value).length !== 0) {
          if (Object.keys(selectedOrder.value.pointId).length !== 0) {
            return selectedOrder.value.pointId;
          }
          return {};
        }
        return {};
      },
      set: (point) =>
        store.commit("ordersModule/SET_SELECTEDPOINT_TO_STATE", point),
    });

    const setSelectedPoint = (chosenPoint) => (point.value = chosenPoint);

    //date
    const arrayDate = ref([]);
    const arrayTime = ref([]);

    const dateTimeFrom = computed(
      () => store.state.ordersModule.selectedOrder.dateFrom
    );
    const dateTimeTo = computed(
      () => store.state.ordersModule.selectedOrder.dateTo
    );

    const rentalDuration = computed(() =>
      convertToDays(dateTimeTo.value - dateTimeFrom.value)
    );

    //генерация массива с объектами дат
    const createArrayDate = () => {
      const dateObj = new Date();
      dateObj.setHours(0, 0, 0);
      for (let i = 0; i <= 90; i++) {
        dateObj.setDate(dateObj.getDate() + 1);
        const newDate = formatedDate(dateObj);
        const newObjDate = {
          id: i,
          value: dateObj.getTime(),
          dateString: newDate,
        };
        arrayDate.value.push(newObjDate);
      }
    };

    //генерация массива с объектами времени
    const createArrayTime = () => {
      const time = [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
      ];
      for (let j = 0; j < time.length; j++) {
        const time_parts = time[j].split(":");
        const millisecond =
          time_parts[0] * (60000 * 60) + time_parts[1] * 60000;
        const newObjTime = { id: j, value: millisecond, timeString: time[j] };
        arrayTime.value.push(newObjTime);
      }
    };

    //форматирование даты
    const formatedDate = (dateObj) => {
      const date =
        dateObj.getDate().toString().length < 2
          ? "0" + dateObj.getDate()
          : dateObj.getDate();
      const month =
        dateObj.getMonth().toString().length < 2
          ? "0" + (dateObj.getMonth() + 1)
          : dateObj.getMonth() + 1;
      const year = dateObj.getFullYear().toString();

      return `${date}.${month}.${year}`;
    };

    //SELECTED DATE FROM
    const setSelectedFrom = (chosenOption) =>
      store.commit(
        "ordersModule/SET_SELECTEDDATETIMEFROM_TO_STATE",
        chosenOption
      );
    const resetSelectedFrom = () =>
      store.commit("ordersModule/RESET_SELECTEDDATETIMEFROM_TO_STATE");
    const setDateFrom = (selectedDate) => {
      store.commit("ordersModule/SET_SELECTEDDATEFROM", selectedDate);
    };
    const setTimeFrom = (selectedTime) => {
      store.commit("ordersModule/SET_SELECTEDTIMEFROM", selectedTime);
    };

    //SELECTED DATE TO
    const setSelectedTo = (chosenOption) =>
      store.commit(
        "ordersModule/SET_SELECTEDDATETIMETO_TO_STATE",
        chosenOption
      );
    const resetSelectedTo = () =>
      store.commit("ordersModule/RESET_SELECTEDDATETIMETO_TO_STATE");
    const setDateTo = (selectedDate) => {
      store.commit("ordersModule/SET_SELECTEDDATETO", selectedDate);
    };
    const setTimeTo = (selectedTime) => {
      store.commit("ordersModule/SET_SELECTEDTIMETO", selectedTime);
    };

    onMounted(() => {
      createArrayDate();
      createArrayTime();
    });

    //rate
    const getRatesFromApi = () =>
      store.dispatch("rateModule/GET_RATES_FROM_API");

    const rateList = computed(() => store.state.rateModule.rateList);

    const rateNameList = computed(() => {
      const rates = store.state.rateModule.rateList;
      let arr = [...rates];

      return arr.map(
        (item) => (item = { ...item, name: item.rateTypeId.name })
      );
    });

    const rate = computed({
      get: () => {
        if (Object.keys(selectedOrder.value).length !== 0) {
          if (Object.keys(selectedOrder.value.rateId).length !== 0) {
            return selectedOrder.value.rateId;
          }
          return {};
        }
        return {};
      },
      set: (rate) => {
        store.commit("ordersModule/SET_SELECTEDRATE_TO_STATE", rate);
      },
    });

    const setSelectedRate = (chosenRate) => {
      rate.value = {
        id: chosenRate.id,
        price: chosenRate.price,
        rateType_id: chosenRate.rateTypeId.id,
      };
      return rate.value;
    };

    //поиск выбранного id тарифа в массиве и получение его наименования
    const nameRate = computed(() => {
      return rateList.value.reduce((accumulator, item) => {
        if (item.rateTypeId.id === rate.value.rateType_id) {
          accumulator = item.rateTypeId.name;
        }
        return accumulator;
      }, "");
    });

    //dropdown status order
    const getOrderStatusesFromApi = () =>
      store.dispatch("orderStatusModule/GET_ORDERSTATUSES_FROM_API");

    const orderStatusList = computed(
      () => store.state.orderStatusModule.orderStatusList
    );

    const orderStatus = computed({
      get: () => {
        if (Object.keys(selectedOrder.value).length !== 0) {
          if (
            selectedOrder.value.orderStatusId &&
            Object.keys(selectedOrder.value.orderStatusId).length !== 0
          ) {
            return selectedOrder.value.orderStatusId;
          }
          return {};
        }
        return {};
      },
      set: (orderStatus) =>
        store.commit(
          "ordersModule/SET_SELECTEDORDERSTATUS_TO_STATE",
          orderStatus
        ),
    });

    const setSelectedOrderStatus = (chosenOrderStatus) =>
      (orderStatus.value = chosenOrderStatus);

    //additional
    const checkedTank = computed({
      get: () => selectedOrder.value.isFullTank,
      set: (checkedTank) => {
        store.commit("ordersModule/SET_SELECTEDTANK", checkedTank);
      },
    });

    const checkedChildChair = computed({
      get: () => selectedOrder.value.isNeedChildChair,
      set: (checkedChildChair) => {
        store.commit("ordersModule/SET_SELECTEDCHILDCHAIR", checkedChildChair);
      },
    });

    const checkedRightWheel = computed({
      get: () => selectedOrder.value.isRightWheel,
      set: (checkedRightWheel) => {
        store.commit("ordersModule/SET_SELECTEDRIGHTWHEEL", checkedRightWheel);
      },
    });

    //price
    const price = computed({
      get: () => {
        if (Object.keys(selectedOrder.value).length !== 0) {
          if (selectedOrder.value.price) {
            return selectedOrder.value.price;
          }
          return 0;
        }
        return 0;
      },
      set: (price) => store.commit("ordersModule/SET_PRICE_TO_STATE", price),
    });

    //подсчет итоговой суммы заказа
    watch(
      [
        () => rate.value,
        () => checkedTank.value,
        () => checkedChildChair.value,
        () => checkedRightWheel.value,
      ],
      () => {
        getPriceSummary();
      },
      { deep: true }
    );

    const getPriceSummary = () => {
      const day = 1;
      const week = 7;
      const month = 30;

      const rateDayId = 2;
      const rateWeekId = 1;
      const rateMonthId = 3;

      const priceTank = 500;
      const priceBabyChair = 200;
      const priceRightHandDrive = 1600;

      const dayMs = 86400000;

      const duration = dateTimeTo.value - dateTimeFrom.value;
      let priceCalculated;

      if (rate.value.id === rateDayId) {
        if (duration >= dayMs && duration < week * dayMs) {
          priceCalculated = calcPrice(rate.value.price, day, duration);
        }
      }

      if (rate.value.id === rateWeekId) {
        if (duration === week * dayMs) {
          priceCalculated = calcPrice(rate.value.price, week, duration);
        }
      }

      if (rate.value.id === rateMonthId) {
        if (duration === month * dayMs) {
          priceCalculated = calcPrice(rate.value.price, month, duration);
        }
      }

      priceCalculated = calcAddService(
        priceCalculated,
        priceTank,
        priceBabyChair,
        priceRightHandDrive
      );

      price.value = priceCalculated;
    };

    const calcPrice = (ratePrice, durationDays, durationMs) => {
      let ratePriceItem = null;
      if (typeof ratePrice === "string") {
        ratePriceItem = +ratePrice;
      } else {
        ratePriceItem = ratePrice;
      }

      const durationPrice = ratePriceItem / (durationDays * 86400000);
      const priceSummary = Math.round(durationMs * durationPrice);

      return priceSummary;
    };

    const calcAddService = (
      priceCalculated,
      priceTank,
      priceBabyChair,
      priceRightHandDrive
    ) => {
      if (checkedTank.value) {
        priceCalculated += priceTank;
      }
      if (checkedChildChair.value) {
        priceCalculated += priceBabyChair;
      }
      if (checkedRightWheel.value) {
        priceCalculated += priceRightHandDrive;
      }
      return priceCalculated;
    };

    //API call
    const getData = async () => {
      await getCarsFromApi();
      await getCitiesFromApi();
      await getRatesFromApi();
      await getOrderStatusesFromApi();
    };
    getData();

    return {
      selectedOrder,

      carList,
      car,
      thumbnailPath,
      setSelectedCar,

      cityList,
      city,
      setSelectedCity,

      pointList,
      point,
      setSelectedPoint,

      orderStatusList,
      orderStatus,
      setSelectedOrderStatus,

      colorListByCar,
      color,
      setSelectedColor,

      arrayDate,
      arrayTime,
      setDateFrom,
      setTimeFrom,
      dateTimeFrom,
      setSelectedFrom,
      resetSelectedFrom,
      setDateTo,
      setTimeTo,
      dateTimeTo,
      setSelectedTo,
      resetSelectedTo,
      rentalDuration,

      rateList,
      rate,
      setSelectedRate,
      nameRate,
      rateNameList,

      checkedTank,
      checkedChildChair,
      checkedRightWheel,

      changeOrder,
      cancelOrder,

      price,
      getPriceSummary,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.card {
  &__title {
    margin: 0;
    font-family: $ff;
    font-style: normal;
    font-weight: 400;
    font-size: 29px;
    line-height: 33px;
    letter-spacing: -0.725px;
    color: $color-text;
    padding: 25px;

    @media #{$media} and (min-width: $tablet-min) and (max-width: $tablet-max) {
      padding: 10px 25px;
      font-size: 24px;
    }

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      padding: 10px 25px;
      font-size: 19px;
    }
  }
}

.card-order {
  display: flex;
  flex-direction: row;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    flex-direction: column;
  }

  &__img {
    width: 30%;
    background: $color-white;
    box-shadow: 0px 2px 4px rgba(90, 97, 105, 0.12);
    border-radius: 9px;
    margin: 0 10px 0 20px;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      width: 100%;
      border-radius: 0;
      margin: 0;
    }
  }

  &__img-wrp {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  &__pic {
    max-width: 100%;
  }

  &__model {
    font-family: $ff;
    font-style: normal;
    font-weight: 400;
    font-size: 24.5px;
    line-height: 28px;
    color: $color-text;
    margin: 4px 0;

    @media #{$media} and (min-width: $desktop-min) and (max-width: $desktop-max) {
      font-size: 20px;
    }

    @media #{$media} and (min-width: $tablet-min) and (max-width: $tablet-max) {
      font-size: 16px;
    }
  }

  &__category {
    font-family: $ff;
    font-style: normal;
    font-weight: 400;
    font-size: 12.5px;
    line-height: 14px;
    color: $color-grey-middle;
    margin: 4px 0;
  }

  &__summary {
    padding: 15px 20px;
  }

  &__summary-wrp {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__summary-title {
    font-family: $ff;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: $color-dropdown-placeholder;
    margin: 0;
  }

  &__summary-data {
    font-family: $font2;
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: $color-grey-font;
    margin: 0;
  }

  &__summary-price {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

  &__description {
    box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.12),
      0px 1px 0px rgba(0, 0, 0, 0.12);
    padding: 15px 20px;
  }

  &__description-title {
    font-family: $font2;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    color: $color-grey-middle-font;
    margin: 0 0 10px 0;
  }

  &__description-text {
    font-family: $font2;
    font-style: normal;
    font-weight: 400;
    font-size: 13.5px;
    line-height: 20px;
    color: $color-grey-font;
    margin: 0;
  }

  &__details {
    width: 70%;
    background: $color-white;
    box-shadow: 0px 2px 4px rgba(90, 97, 105, 0.12);
    border-radius: 9px;
    padding: 20px;
    margin: 0 20px 0 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      width: 100%;
      border-radius: 0;
      margin: 0;
      padding: 0;
    }
  }

  &__details-title {
    font-family: $font2;
    font-style: normal;
    font-weight: 500;
    font-size: 17.5px;
    line-height: 21px;
    color: $color-text;
    margin: 0 0 20px 0;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      padding: 0 10px;
      margin: 20px 0;
    }
  }

  &__details-content {
    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      padding: 10px;
    }
  }

  &__details-data {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -10px;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      margin: 0 0 20px 0;
      flex-direction: column;
    }
  }

  &__details-data-wrp {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -10px;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      flex-direction: column;
    }
  }

  &__details-block {
    width: 50%;
    padding: 20px 10px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin: 0 -10px;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      padding: 0;
      width: 100%;
      margin: 0;
    }
  }

  &__details-block .select {
    width: 50%;
    padding: 0 10px;
  }

  &__button-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      padding: 10px;
      flex-direction: column;
    }
  }

  &__button {
    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      display: flex;
      flex-direction: column;
    }
  }

  &__button-item {
    margin: 0 12px;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      margin: 5px 0;
      width: 100%;
    }
  }
}

.card__order-additional {
  margin: 20px 0;
}

.input {
  &__order-city,
  &__order-point {
    width: 50%;
    padding: 20px 10px;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      padding: 0;
      width: 100%;
    }
  }
  &__order-city .dropdown__input,
  &__order-point .dropdown__input {
    width: 100%;
    box-sizing: border-box;
  }
  &__order-additional {
    width: 50%;
    padding: 0 10px;
  }
  &__order-additional .dropdown__input {
    width: 100%;
    box-sizing: border-box;
  }
  &__order-additional .input__field {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
