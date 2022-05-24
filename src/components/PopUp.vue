<template>
  <transition name="popup">
    <div class="popup-mask">
        <div class="popup-container">
          <div class="popup-button">
            <v-icon icon-id="icon-x" width="32" height="32" @click="closePopUp" />
          </div>
          <div class="popup-body">
            <div class="popup__img">
              <img :src="car.pic" :alt="car.name" />
            </div>
            <dl class="popup__title">
              <dt class="title__text">Наименование:</dt>
              <dd class="title__value">{{ car.name }}</dd>
            </dl>
            <dl class="popup__title">
              <dt class="title__text">Категория:</dt>
              <dd class="title__value">{{ car.category }}</dd>
            </dl>
            <dl class="popup__title">
              <dt class="title__text">Гос. номер:</dt>
              <dd class="title__value">{{ car.number }}</dd>
            </dl>
            <dl class="popup__title">
              <dt class="title__text">Цвет:</dt>
              <dd class="title__value">{{ car.color }}</dd>
            </dl>
            <dl class="popup__title">
              <dt class="title__text">Цена:</dt>
              <dd class="title__value">{{ car.priceMin }} - {{ car.priceMax }}</dd>
            </dl>
            <dl class="popup__title">
              <dt class="title__text">Описание:</dt>
              <dd class="title__value">{{ car.description }}</dd>
            </dl>
            <div class="popup__title">
              <button type="button" class="title__item-btn">
                <v-icon
                  icon-id="icon-edit"
                  width="12"
                  height="11"
                  class="orders__button-icon_edit"
                ></v-icon>
                <span>Изменить</span>
              </button>
            </div>
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
import VIcon from "../components/VIcon.vue";

export default {
  name: "PopUp",
  components: {
    VIcon,
  },
  setup(_, context) {

    const car = { 
      id: 1, 
      name: "ELANTRA", 
      number: "x123yz", 
      category: "Бизнес", 
      color: "Черный", 
      priceMin: 5000, 
      priceMax: 10000, 
      pic: `${require("../assets/img/car_image.jpg")}`, 
      description: "Отличный автомобиль" 
    };

    const closePopUp = () => {
      context.emit("close-popup");
    };

    return {
      car,
      closePopUp,
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.popup-mask {
  background-color: rgba(255, 255, 255, 0.6);
  transition: opacity 0.3s ease;
}

.popup-container {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  transition: all 0.3s ease;
}

.popup-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.popup__title {
  display: flex;
  flex-direction: row;
}

.title__text {
  font-family: $font2;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  color: $color-grey-middle;
  margin: 0 5px;
}

.title__value {
  font-family: $font2;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 15px;
  color: $color-black;
  margin: 0 5px;
}

.title__item-btn {
  background: $color-white;
  border: 0.5px solid #BECAD6;
  border-radius: 4px;
  box-sizing: border-box;

  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: $color-grey;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 5px;
  width: 100%;
}

.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>