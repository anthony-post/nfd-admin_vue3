<template>
  <transition name="popup">
    <div class="popup popup-mask">
      <div class="popup-container">
        <div class="popup-button">
          <v-icon icon-id="icon-x" width="32" height="32" @click="closePopUp" />
        </div>
        <div class="popup-body">
          <img 
            :src="carItem?.thumbnail?.path" 
            :alt="carItem?.thumbnail?.originalname" 
            class="popup__img"
          />
          <dl class="popup__title">
            <dt class="popup__title-text">Наименование:</dt>
            <dd class="popup__title-value">{{ carItem?.name }}</dd>
          </dl>
          <dl class="popup__title">
            <dt class="popup__title-text">Категория:</dt>
            <dd class="popup__title-value">{{ carItem?.categoryId?.name }}</dd>
          </dl>
          <dl class="popup__title">
            <dt class="popup__title-text">Гос. номер:</dt>
            <dd class="popup__title-value">{{ carItem?.number }}</dd>
          </dl>
          <dl class="popup__title">
            <dt class="popup__title-text">Цвет:</dt>
            <dd class="popup__title-value">{{ carItem?.colors }}</dd>
          </dl>
          <dl class="popup__title">
            <dt class="popup__title-text">Цена:</dt>
            <dd class="popup__title-value">
              {{ carItem?.priceMin }} - {{ carItem?.priceMax }}
            </dd>
          </dl>
          <dl class="popup__title">
            <dt class="popup__title-text">Описание:</dt>
            <dd class="popup__title-value">{{ carItem?.description }}</dd>
          </dl>
          <div class="popup__title">
            <router-link to="/admin-panel/card-car" class="popup__title-link">
              <button type="button" class="popup__title-btn">
                <v-icon
                  icon-id="icon-edit"
                  width="12"
                  height="11"
                  class="orders__button-icon_edit table__button-item_edit"
                ></v-icon>
                <span>Изменить</span>
              </button>
            </router-link>
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
  props: {
    carItem: {
      type: Object,
      required: true,
    },
  },
  setup(_, context) {

    const closePopUp = () => {
      context.emit("close-popup");
    };

    return {
      closePopUp,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.popup-mask {
  background-color: rgba(255, 255, 255, 0.9);
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

.popup {
  &__img {
    // max-width: 100%;
    width: 300px;

     @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      width: 200px;
    }
  }

  &__title {
    display: flex;
    flex-direction: row;
  }

  &__title-text {
    font-family: $font2;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: $color-grey-middle;
    margin: 0 5px;
  }

  &__title-value {
    font-family: $font2;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 15px;
    color: $color-black;
    margin: 0 5px;
  }

  &__title-link {
    width: 100%;
  }

  &__title-btn {
    background: $color-white;
    border: 0.5px solid #becad6;
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
