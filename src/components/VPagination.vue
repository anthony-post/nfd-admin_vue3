<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button
        type="button"
        :disabled="isInFirstPage"
        @click="onClickFirstPage"
      >
        First
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        :disabled="isInFirstPage"
        @click="onClickPreviousPage"
      >
        Previous
      </button>
    </li>

    <!-- Visible Buttons Start -->

    <li
      v-for="page in pages"
      :key="page.name"
      class="pagination-item"
    >
      <button
        type="button"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
        @click="onClickPage(page.name)"
      >
        {{ page.name }}
      </button>
    </li>

    <!-- Visible Buttons End -->

    <li class="pagination-item">
      <button
        type="button"
        :disabled="isInLastPage"
        @click="onClickNextPage"
      >
        Next
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        :disabled="isInLastPage"
        @click="onClickLastPage"
      >
        Last
      </button>
    </li>
  </ul>

  <!-- <div class="pagination">
    <a href="#" class="pagination-link">
      <slot></slot>
    </a>
  </div> -->

</template>

<script>
import { computed } from '@vue/runtime-core';

export default {
  name: "VPagination",
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },    
    totalPages: {
      type: Number,
      required: true
    },
    // perPage: {
    //   type: Number,
    //   required: true
    // },
    currentPage: {
      type: Number,
      required: true
    }
  },
  setup(props, context) {

    const startPage = computed(() => {
      // When on the first page
      if (props.currentPage === 1) {
        return 1;
      }
      // When on the last page
      if (props.currentPage === props.totalPages) {
        return props.totalPages - props.maxVisibleButtons;
      }
      // When in between
      return props.currentPage - 1;
    });

    const pages = computed(() => {
      const range = [];

      for (
        let i = startPage.value;
        i <= Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === props.currentPage
        });
      }

      return range;
    });

    const isInFirstPage = computed(() => {
      return props.currentPage === 1;
    });

     const isInLastPage = computed(() => {
      return props.currentPage === props.totalPages;
    });

    const onClickFirstPage = () => {
      context.emit('pagechanged', 1);
    };

    const onClickPreviousPage = () => {
      context.emit('pagechanged', props.currentPage - 1);
    };

    const onClickPage = page => {
      context.emit('pagechanged', page);
    };

    const onClickNextPage = () => {
      context.emit('pagechanged', props.currentPage + 1);
    };

    const onClickLastPage = () => {
      context.emit('pagechanged', props.totalPages);
    };
    
    const isPageActive = page => {
      return props.currentPage === page;
    };

    return {
      startPage,
      pages,
      isInFirstPage,
      isInLastPage,
      onClickFirstPage,
      onClickPreviousPage,
      onClickPage,
      onClickNextPage,
      onClickLastPage,
      isPageActive,
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

// .pagination-link {
//   font-family: $ff;
//   font-style: normal;
//   font-weight: 400;
//   font-size: 15px;
//   line-height: 17px;
//   letter-spacing: -0.471429px;
//   color: $color-blue;
//   padding: 0 7px;
// }

.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4AAE9B;
  color: #ffffff;
}
</style>
