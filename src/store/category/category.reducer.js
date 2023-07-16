import { CATEGORIES_ACTION_TYPES } from './category.types';

export const CATEGORY_INITIAL_STATE = {
    categories: [],
    error: null,
    isLoading: false
};

export const categoriesReducer = (state = CATEGORY_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true
            };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload,
                isLoading: false
            };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL:
            return {
                ...state,
                error: payload,
                isLoading: false
            };
        default:
            return state;
    }
};
