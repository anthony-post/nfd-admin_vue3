<template>
  <div class="card">
    <h2 class="card__title">Карточка автомобиля</h2>
    <div class="card-car">
      <section class="card-car__img">
        <div class="card-car__img-wrp">
          <img
            src="https://imgholder.ru/600x300/eeeeee/adb9ca&text=Изображение"
            alt="car"
            class="card-car__pic"
          />
          <p class="card-car__model">Hyndai, i30 N</p>
          <p class="card-car__category">Компакт-кар</p>
          <v-upload-file name="carimg"></v-upload-file>
        </div>
        <div class="card-car__progress-bar">
          <div class="card-car__progress-bar-wrp">
            <p class="card-car__progress-bar-title">Заполнено</p>
            <p class="card-car__progress-bar-data">70%</p>
          </div>
          <!--TO DO PROGRESS BAR-->
          <progress value="70" max="100" class="progress-bar"></progress>
        </div>
        <div class="card-car__description">
          <h4 class="card-car__description-title">Описание</h4>
          <p class="card-car__description-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis
            minima in, iusto error optio molestias quo alias perferendis! Earum
            pariatur optio ipsa aliquam facere aspernatur ex magni cumque non
            consectetur!
          </p>
        </div>
      </section>
      <section class="card-car__details">
        <h3 class="card-car__details-title">Настройки автомобиля</h3>
        <div class="card-car__details-content">
          <div class="card-car__details-data">
            <v-input
              v-model:inputValue="carModel"
              label="Модель автомобиля"
              name="model-car"
              placeholder="Введите модель автомобиля"
              class="input input__car-model"
            ></v-input>
            <v-input
              v-model:inputValue="carCategory"
              label="Тип автомобиля"
              name="category-car"
              placeholder="Введите категорию автомобиля"
              class="input input__car-category"
            ></v-input>
          </div>
          <div class="card-car__details-description">
            <v-text-area
              v-model:inputValue="carDescription"
              label="Описание автомобиля"
              name="description-car"
              id="description-car"
              placeholder="Введите описание автомобиля"
              class="input__car-description"
            ></v-text-area>
          </div>
          <div class="card-car__details-additional">
            <v-input
              v-model:inputValue="carNumber"
              label="Гос. номер"
              name="number-car"
              class="input input__car-additional"
            ></v-input>
            <v-input
              v-model:inputValue="carTank"
              label="Топливо"
              name="tank-car"
              class="input input__car-additional"
            ></v-input>
            <v-input
              v-model:inputValue="carPriceMin"
              label="Мин. цена"
              name="minprice-car"
              class="input input__car-additional"
            ></v-input>
            <v-input
              v-model:inputValue="carPriceMax"
              label="Макс. цена"
              name="maxprice-car"
              class="input input__car-additional"
            ></v-input>
          </div>
          <div class="card-car__details-color">
            <div class="card-car__details-color-wrp">
              <v-input
                v-model:inputValue="carColor"
                label="Доступные цвета"
                name="color-car"
                placeholder="Введите цвет автомобиля"
                class="input input__car-color"
              ></v-input>
              <button class="card-car__plus-button"></button>
            </div>
            <ul class="card-car__color-list">
              <li class="card-car__color-item">
                <v-checkbox-blue>Желтый</v-checkbox-blue>
                <v-checkbox-blue>Красный</v-checkbox-blue>
                <v-checkbox-blue>Белый</v-checkbox-blue>
              </li>
            </ul>
          </div>
        </div>
        <div class="card-car__button-bar">
          <div class="card-car__button">
            <v-button
              type="button"
              theme="confirm"
              class="card-car__button-item"
            >
              Сохранить
            </v-button>
            <v-button 
              type="button" 
              theme="cancel" 
              class="card-car__button-item"
            >
              Отменить
            </v-button>
          </div>
          <v-button 
            type="button" 
            theme="delete" 
            class="card-car__button-item"
          >
            Удалить
          </v-button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import VUploadFile from "../components/VUploadFile.vue";
import VInput from "../components/VInput.vue";
import VCheckboxBlue from "../components/VCheckboxBlue.vue";
import VButton from "../components/VButton.vue";
import VTextArea from "../components/VTextArea.vue";

export default {
  name: "CardCar",
  components: {
    VUploadFile,
    VInput,
    VCheckboxBlue,
    VButton,
    VTextArea,
  },
  setup() {
    const carModel = ref("");
    const carCategory = ref("");
    const carDescription = ref("");
    const carColor = ref("");
    const carTank = ref("");
    const carNumber = ref("");
    const carPriceMin = ref("");
    const carPriceMax = ref("");

    return {
      carModel,
      carCategory,
      carDescription,
      carColor,
      carPriceMax,
      carPriceMin,
      carNumber,
      carTank,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.card {
  // width: 100%;
  // height: 100%;
  // background-color: $color-background;

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

.card-car {
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

  &__progress-bar {
    box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.12),
      0px 1px 0px rgba(0, 0, 0, 0.12);
    padding: 15px 20px;
  }

  &__progress-bar-wrp {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 10px 0;
  }

  &__progress-bar-title {
    font-family: $ff;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: $color-dropdown-placeholder;
    margin: 0;
  }

  &__progress-bar-data {
    font-family: $font2;
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: $color-grey-font;
    margin: 0;
  }

  &__description {
    padding: 0 20px;
  }

  &__description-title {
    font-family: $font2;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    color: $color-grey-middle-font;
  }

  &__description-text {
    font-family: $font2;
    font-style: normal;
    font-weight: 400;
    font-size: 13.5px;
    line-height: 20px;
    color: $color-grey-font;
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
      margin: 0;
      flex-direction: column;
    }
  }

  &__plus-button {
    --t: 2px; /* Thickness */
    --l: 30px; /* size of the symbol */
    --s: 5px; /* space around the symbol */
    --c1: #becad6; /* Plus color*/
    --c2: #ffffff; /* background color*/

    display: inline-block;
    width: var(--l);
    height: var(--l);
    padding: var(--s);
    box-sizing: border-box; /*Remove this if you don't want space to be included in the size*/

    background: linear-gradient(var(--c1), var(--c1)) content-box,
      linear-gradient(var(--c1), var(--c1)) content-box, var(--c2);
    background-position: center;
    background-size: 100% var(--t), var(--t) 100%;
    background-repeat: no-repeat;

    border: 0.5px solid $color-border;
    border-radius: 4px;

    &:hover {
      cursor: pointer;
    }
  }

  &__details-additional {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 -10px;
  }

  &__details-color {
    width: 50%;
    margin: 0 -10px;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      width: 100%;
      margin: 0;
    }
  }

  &__details-color-wrp {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  &__color-list {
    padding: 0 10px;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      padding: 0;
    }
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

.progress-bar {
  width: 100%;
  height: 10px;
}

.progress-bar::-webkit-progress-bar {
  box-shadow: inset 0px 0.5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
}

.progress-bar::-webkit-progress-value {
  background: $color-blue;
  border-radius: 4px;
}

.progress-bar::-moz-progress-bar {
  background: $color-blue;
  border-radius: 4px;
}

.input {
  &__car-model,
  &__car-category {
    width: 50%;
    padding: 20px 10px;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      width: 100%;
      padding: 0;
    }
  }

  &__car-color {
    width: 100%;
    padding: 0 10px;

    @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      padding: 0 10px 0 0;
    }
  }
}
</style>
