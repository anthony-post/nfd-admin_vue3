<template>
  <ul class="pagination" v-if="!isNaN(totalPages)">
    <li v-if="!isOnFirstPage" class="pagination-item">
      <button
        type="button"
        :disabled="isOnFirstPage"
        class="pagination-item__button"
        @click="onClickPreviousPage"
      >
        &lt;&lt;
      </button>
    </li>

    <li v-if="!isOnFirstPage" class="pagination-item">
      <button
        type="button"
        :disabled="isOnFirstPage"
        class="pagination-item__button"
        @click="onClickFirstPage"
      >
        1
      </button>
    </li>

    <li v-if="!isOnFirstPage" class="pagination-item pagination-item__button">
      ...
    </li>

    <li v-for="page in pages" :key="page.name" class="pagination-item">
      <button
        type="button"
        :disabled="page.isDisabled"
        class="pagination-item__button"
        :class="{ active: isPageActive(page.name) }"
        @click="onClickPage(page.name)"
      >
        {{ page.name }}
      </button>
    </li>

    <li v-if="!isOnLastPage" class="pagination-item pagination-item__button">
      ...
    </li>

    <li v-if="!isOnLastPage" class="pagination-item">
      <button
        type="button"
        :disabled="isOnLastPage"
        class="pagination-item__button"
        @click="onClickLastPage"
      >
        {{ totalPages }}
      </button>
    </li>

    <li v-if="!isOnLastPage" class="pagination-item">
      <button
        type="button"
        :disabled="isOnLastPage"
        class="pagination-item__button"
        @click="onClickNextPage"
      >
        &gt;&gt;
      </button>
    </li>
  </ul>
</template>

<script>
import { computed } from "@vue/runtime-core";

export default {
  name: "VPagination",
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    const startPage = computed(() => {
      if (isOnFirstPage.value) {
        return 1;
      }
      if (isOnLastPage.value) {
        const page = props.totalPages - props.maxVisibleButtons;
        if (page > 0) {
          return page + 1;
        } else {
          return props.totalPages;
        }
      }
      return props.currentPage - 1;
    });

    const lastNumber = computed(() => Math.min(
      startPage.value + props.maxVisibleButtons - 1,
      props.totalPages
    ));

    const pages = computed(() => {
      const range = [];

      for (let i = startPage.value; i <= lastNumber.value; i++) {
        range.push({
          name: i,
          isDisabled: i === props.currentPage,
        });
      }

      return range;
    });

    const isOnFirstPage = computed(() => {
      return props.currentPage === 1;
    });

    const isOnLastPage = computed(() => {
      return props.currentPage === props.totalPages;
    });

    const onClickFirstPage = () => context.emit("pagechanged", 1);

    const onClickPreviousPage = () =>
      context.emit("pagechanged", props.currentPage - 1);

    const onClickPage = (page) => context.emit("pagechanged", page);

    const onClickNextPage = () =>
      context.emit("pagechanged", props.currentPage + 1);

    const onClickLastPage = () => context.emit("pagechanged", props.totalPages);

    const isPageActive = (page) => props.currentPage === page;

    return {
      lastNumber,
      startPage,
      pages,
      isOnFirstPage,
      isOnLastPage,
      onClickFirstPage,
      onClickPreviousPage,
      onClickPage,
      onClickNextPage,
      onClickLastPage,
      isPageActive,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
  padding: 0 7px;

  &__button {
    font-family: $ff;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 17px;
    color: $color-blue;
    background-color: transparent;
    border: none;
    cursor: pointer;

     @media #{$media} and (min-width: $mobile-min) and (max-width: $mobile-max) {
      font-size: 12px;
    }
  }
}

.active {
  background-color: $color-blue;
  color: $color-white;
  border-radius: 50%;
}
</style>
