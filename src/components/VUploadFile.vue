<template>
  <div class="upload">
    <input
      type="file"
      ref="fileInput"
      accept="image/*"
      class="upload-input"
      @change="onFilePicked"
    />
    <span v-if="fileName" class="upload-placeholder">{{ fileName }}</span>
    <span v-else class="upload-placeholder">Выберите файл ...</span>
    <button class="upload-btn upload-btn__text" @click="onPickFile">Обзор</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "VUploadFile",
  setup() {

    const image = ref(null);
    const fileInput = ref(null);
    const fileName = ref(null);

    const onPickFile = () => {
      fileInput.value.click()
    };

    const onFilePicked = event => {
      const files = event.target.files;
      fileName.value = files[0].name;

      // let filename = files[0].name;
      // console.log(filename);
      // const fileReader = new FileReader();

      // fileReader.addEventListener('load', () => {
      //   this.imageUrl = fileReader.result
      // });

      // fileReader.readAsDataURL(files[0]);
      // image.value = files[0];
    };

    return {
      image,
      fileInput,
      fileName,
      onPickFile,
      onFilePicked,
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.upload {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background: $color-white;
  border: 0.5px solid #BECAD6;
  border-radius: 4px;

  margin: 4px 0 0 0;
}

.upload-input {
  display: none;
}

.upload-btn {
  background: $color-grey-light;
  border: none;
  padding: 8px 16px;

  &:hover {
    cursor: pointer;
  }
}

.upload-placeholder {
  padding: 0 16px;
}

.upload-placeholder,
.upload-btn__text {
  font-family: $font2;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: $color-label;
}
</style>