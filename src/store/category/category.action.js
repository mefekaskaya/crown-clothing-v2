const { CATEGORIES_ACTION_TYPES } = require('./category.types');

export const setCategories = (categories) => ({
    type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
    payload: categories
});

export const fetchCategoriesStart = () => ({
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
});

export const fetchCategoriesSuccess = (categories) => {
    return {
        type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
        payload: categories
    };
};

export const fetchCategoriesFail = (error) => ({
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL,
    payload: error
});
