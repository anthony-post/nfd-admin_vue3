<template>
  <div class="card-car-wrp">
    <h2 class="card__title">Карточа автомобиля</h2>
    <div class="card-car-container">
      <section class="card-car-container__img">
        <div class="card-car__img-wrp">
          <div>
            <img src="https://via.placeholder.com/240x110.jpg" alt="car" class="card-car__img">
          </div>
          <p class="card-car__model">Hyndai, i30 N</p>
          <p class="card-car__category">Компакт-кар</p>
          <!--TO DO DOWNLOAD INPUT-->
          <div>
            <v-upload-file name="carimg"></v-upload-file>
          </div>
        </div>
        <!--TO DO PROGRESS BAR-->
        <div class="card-car__progress-bar">PROGRESS BAR</div>
        <div class="card-car__description">
          <h3 class="card-car__description-title">Описание</h3>
          <p class="card-car__description-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis minima in, iusto error optio molestias quo alias perferendis! Earum pariatur optio ipsa aliquam facere aspernatur ex magni cumque non consectetur!</p>
        </div>
      </section>
      <section class="card-car-container__details">Детали</section>
    </div>
  </div>
</template>

<script>
import VUploadFile from "../components/VUploadFile.vue";

export default {
  name: "CardCar",
  components: {
    VUploadFile,
  }
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

.card-car-container__details {
  width: 60%;
  height: 60vh;
  background: $color-white;
  box-shadow: 0px 2px 4px rgba(90, 97, 105, 0.12);
  border-radius: 9px;
}

.card-car__img-wrp {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
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
  margin: 2px 0;
}

.card-car__category {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 12.5px;
  line-height: 14px;
  color: $color-grey-middle;
  margin: 2px 0;
}

.card-car__progress-bar {
  box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.12), 0px 1px 0px rgba(0, 0, 0, 0.12);
  padding: 15px 20px;
}

.card-car__description {
  padding: 20px;
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
</style>
