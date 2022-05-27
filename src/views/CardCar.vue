<template>
  <div class="card-car-wrp">
    <h2 class="card__title">Карточа автомобиля</h2>
    <div class="card-car-container">
      <section class="card-car-container__img">
        <div class="card-car__img-wrp">
          <div>
            <img src="https://imgholder.ru/600x300/eeeeee/adb9ca&text=Изображение" alt="car" class="card-car__img">
          </div>
          <p class="card-car__model">Hyndai, i30 N</p>
          <p class="card-car__category">Компакт-кар</p>
          <v-upload-file name="carimg"></v-upload-file>
        </div>
        <div class="card-car__progress-bar">
          <div class="card-car__progress-bar-wrp">
            <p class="card-car__progress-bar-title">Заполнено</p>
            <p class="card-car__progress-bar-data">100%</p>
          </div>
          <!--TO DO PROGRESS BAR-->
          <div class="progress-bar"></div>
        </div>
        <div class="card-car__description">
          <h4 class="card-car__description-title">Описание</h4>
          <p class="card-car__description-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis minima in, iusto error optio molestias quo alias perferendis! Earum pariatur optio ipsa aliquam facere aspernatur ex magni cumque non consectetur!</p>
        </div>
      </section>
      <section class="card-car-container__details">
        <h3 class="card-car__details-title">Настройки автомобиля</h3>
        <div class="card-car__details-data">
          <v-input 
            v-model:inputValue="carModel"
            label="Модель автомобиля" 
            name="model-car"
            placeholder="Введите модель автомобиля"
            class="input__car-model"
          ></v-input>
          <v-input 
            v-model:inputValue="carCategory"
            label="Тип автомобиля" 
            name="category-car"
            placeholder="Введите категорию автомобиля"
            class="input__car-category"
          ></v-input>
        </div>
        <div class="card-car__details-color">
          <v-input 
            v-model:inputValue="carColor"
            label="Доступные цвета" 
            name="color-car"
            placeholder="Введите цвет автомобиля"
            class="input__car-color"
          ></v-input>
          <button class="card-car__plus-button"></button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import VUploadFile from "../components/VUploadFile.vue";
import VInput from "../components/VInput.vue";

export default {
  name: "CardCar",
  components: {
    VUploadFile,
    VInput,
  },
  setup() {

    const carModel = ref("");
    const carCategory = ref("");
    const carColor = ref("");

    return {
      carModel,
      carCategory,
      carColor,
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.card-car-wrp {
  width: 100%;
  height: 100%;
  background-color: $color-background;
}

.card-car-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 25px;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    margin: 0 5px;
  }
}

.card-car-container__img {
  width: 35%;
  background: $color-white;
  box-shadow: 0px 2px 4px rgba(90, 97, 105, 0.12);
  border-radius: 9px;
}

.card-car__img-wrp {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.card-car__img {
  max-width: 100%;
}

.card-car__model {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 24.5px;
  line-height: 28px;
  color: $color-text;
  margin: 4px 0;
}

.card-car__category {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 12.5px;
  line-height: 14px;
  color: $color-grey-middle;
  margin: 4px 0;
}

.card-car__progress-bar {
  box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.12), 0px 1px 0px rgba(0, 0, 0, 0.12);
  padding: 15px 20px;
}

.card-car__progress-bar-wrp {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 10px 0;
}

.card-car__progress-bar-title {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  color: $color-dropdown-placeholder;
  margin: 0;
}

.card-car__progress-bar-data {
  font-family: $font2;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: $color-grey-font;
  margin: 0;
}

.progress-bar {
  width: 100%;
  height: 5px;
  box-shadow: inset 0px 0.5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  background: #007BFF;
}

.card-car__description {
  padding: 0 20px;
}

.card-car__description-title {
  font-family: $font2;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  color: $color-grey-middle-font;
}

.card-car__description-text {
  font-family: $font2;
  font-style: normal;
  font-weight: 400;
  font-size: 13.5px;
  line-height: 20px;
  color: $color-grey-font;
}

.card-car-container__details {
  width: 60%;
  background: $color-white;
  box-shadow: 0px 2px 4px rgba(90, 97, 105, 0.12);
  border-radius: 9px;
  padding: 20px;
}

.card-car__details-title {
  font-family: $font2;
  font-style: normal;
  font-weight: 500;
  font-size: 17.5px;
  line-height: 21px;
  color: $color-text;
  margin: 0 0 20px 0;
}

.card-car__details-data {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 -10px;
}

.input__car-model,
.input__car-category {
  width: 50%;
  padding: 20px 10px;
}

.input__car-color {
  width: 100%;
  padding: 0 10px;
}

.card-car__plus-button {
  --t:2px;   /* Thickness */
  --l:30px;  /* size of the symbol */
  --s:5px;  /* space around the symbol */
  --c1:#BECAD6; /* Plus color*/
  --c2:#FFFFFF; /* background color*/

  display:inline-block;
  width:var(--l);
  height:var(--l);
  padding:var(--s);
  box-sizing:border-box; /*Remove this if you don't want space to be included in the size*/
  
  background:
    linear-gradient(var(--c1),var(--c1)) content-box,
    linear-gradient(var(--c1),var(--c1)) content-box,
    var(--c2);
  background-position:center;
  background-size: 100% var(--t),var(--t) 100%;
  background-repeat:no-repeat;

  border: 0.5px solid $color-border;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
  }
}

.card-car__details-color {
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 -10px;
}
</style>
