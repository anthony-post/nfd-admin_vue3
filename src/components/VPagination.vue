<template>
  <div class="pagination">
      <a href="#" class="pagination-link">
          <slot></slot>
      </a>
  </div>
</template>

<script>
export default {
    name: "VPagination"
}
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.pagination-link {
    font-family: $ff;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 17px;
    letter-spacing: -0.471429px;
    color: $color-blue;
    padding: 0 7px;
}

</style>