import { entityAPI } from "@/api/entityAPI";

export const categoriesModule = {
  namespaced: true,

  state: {
    categories: {},
    selectedCategory: {},
  },

  mutations: {
    SET_PAGINATED_FILTERED_CATEGORIES_TO_STATE: (state, categoriesData) => {
      state.categories = categoriesData.data;
    },
    RESET_PAGINATED_FILTERED_CATEGORIES_TO_STATE: (state) => {
      state.categories = {};
    },

    SET_SELECTEDCATEGORY_TO_STATE: (state, chosenCategory) => {
      state.selectedCategory = chosenCategory;
    },
    RESET_SELECTEDCATEGORY_TO_STATE: (state) => {
      state.selectedCategory = {};
    },

    SET_CATEGORY_ID_TO_STATE: (state, newCategoryId) => {
      state.selectedCategory.id = newCategoryId;
    },

    SET_CATEGORY_NAME_TO_STATE: (state, categoryName) => {
      state.selectedCategory.name = categoryName;
    },

    SET_CATEGORY_DESCRIPTION_TO_STATE: (state, categoryDescription) => {
      state.selectedCategory.description = categoryDescription;
    },
  },

  actions: {
    async GET_PAGINATED_FILTERED_CATEGORYLIST_FROM_API(
      { commit },
      { chosenCarCategoryId, selectedPage, limitPage }
    ) {
      try {
        const categoryId = chosenCarCategoryId;
        const page = selectedPage;
        const limit = limitPage;

        if (categoryId !== "no-filter") {
          const categoriesData = await entityAPI.getCategoryById(categoryId);
          commit("SET_PAGINATED_FILTERED_CATEGORIES_TO_STATE", categoriesData);
        } else {
          const categoriesData = await entityAPI.getCategories({ page, limit });
          commit("SET_PAGINATED_FILTERED_CATEGORIES_TO_STATE", categoriesData);
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    GET_SELECTEDCATEGORY_FROM_API({ commit }, chosenCategory) {
      if (chosenCategory) {
        commit("SET_SELECTEDCATEGORY_TO_STATE", chosenCategory);
      } else {
        commit("RESET_SELECTEDCATEGORY_TO_STATE");
      }
    },
  },
};
