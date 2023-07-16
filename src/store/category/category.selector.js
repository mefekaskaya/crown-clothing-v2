import { createSelector } from 'reselect';

const selectCategoriesReducer = (state) => {
    return state.categories;
};

export const selectCategories = createSelector([selectCategoriesReducer], (categoriesReducer) => {
    return categoriesReducer.categories;
});

export const selectCategoriesMap = createSelector([selectCategories], (categories) => {
    return categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
});

export const selectCategoriesIsLoading = createSelector(
    [selectCategoriesReducer],
    (categoriesReducer) => {
        return categoriesReducer.isLoading;
    }
);
