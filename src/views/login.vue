<template>
  <div class="background-main">
    <div class="login-wrp">
      <div class="logo-wrp">
        <img class="logo-pic" src="../assets/logoAdmin.png" alt="logo" />
        <p class="logo-text">Need for Drive</p>
      </div>
      <div class="form-wrp">
        <p class="form-header">Вход</p>
        <form class="form" @submit.prevent="onSubmit">
          <v-input
            v-model:inputValue="login"
            label="Почта"
            type="text"
            name="login"
          />
          <v-input
            v-model:inputValue="password"
            label="Пароль"
            type="password"
            name="password"
            title="Пароль должен содержать цифры и буквы латинского алфавита разного регистра"
          />
          <p v-show="isError" class="error-msg">
            Логин и/или пароль не найдены
          </p>
          <div class="form-footer">
            <router-link
              class="form-footer__link link"
              :to="{ name: 'admin-panel' }"
              >Запросить доступ</router-link
            >
            <button
              type="submit"
              name="button"
              class="form-footer__button form-footer__button-text"
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";
import VInput from "../components/VInput.vue";

export default {
  name: "Login",
  components: {
    VInput,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const login = ref("");
    const password = ref("");
    const isError = ref(false);

    const onSubmit = async () => {
      try {
        //вызов action с POST запросом
        await store.dispatch("authModule/onLogin", {
          username: login.value,
          password: password.value,
        });
        //сброс к начальному состоянию
        resetInputs();
        isError.value = false;
        //редирект на страницу
        router.push({ name: "admin-panel" });
      } catch (error) {
        //сброс введенных данных
        resetInputs();
        //в случае получения ошибки от сервера
        isError.value = true;
      }
    };

    const resetInputs = () => {
      login.value = "";
      password.value = "";
    };

    return {
      login,
      password,
      isError,
      onSubmit,
      resetInputs,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.background-main {
  width: 100vw;
  height: 100vh;
  background-color: $color-background;
}

.login-wrp {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo-wrp {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.logo-pic {
  width: 45px;
  height: 45px;
}

.logo-text {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: $color-text;
}

.form-wrp {
  width: 370px;
  height: 250px;
  background: $color-white;
  box-shadow: 0px 1px 0px rgba(90, 97, 105, 0.11),
    0px 2px 4px rgba(90, 97, 105, 0.12), 0px 5px 5px rgba(90, 97, 105, 0.06),
    0px 3.5px 35px rgba(90, 97, 105, 0.1);
  border-radius: 9px;
  padding: 0 15px;

  @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
    width: 90%;
  }
}

.form-header {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 17.5px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.4375px;
  color: $color-text;
}

.form-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.link {
  text-decoration: none;
}

.form-footer__link {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 10.5px;
  line-height: 12px;
  letter-spacing: -0.18421px;
  color: $color-blue;
}

.form-footer__button {
  background: $color-blue;
  border: 0.5px solid $color-blue;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 10px;
  width: 110px;

  &:hover {
    background: $color-green;
    border: 0.5px solid $color-green;
    cursor: pointer;
  }
}

.form-footer__button-text {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 11.5px;
  line-height: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.0821429px;
  color: $color-white;
}

.error-msg {
  font-family: $ff;
  font-style: normal;
  font-weight: 400;
  font-size: 10.5px;
  line-height: 12px;
  color: $color-red;
  margin: 0;
}
</style>
