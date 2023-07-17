import { AnyAction } from 'redux';

import { Category } from './category.types';
import { fetchActionStart, fetchCategoriesFail, fetchCategoriesSuccess } from './category.action';

export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
};

export const CATEGORY_INITIAL_STATE: CategoriesState = {
    categories: [],
    error: null,
    isLoading: false
};

export const categoriesReducer = (
    state = CATEGORY_INITIAL_STATE,
    action: AnyAction
): CategoriesState => {
    if (fetchActionStart.match(action)) {
        return { ...state, isLoading: true };
    }
    if (fetchCategoriesSuccess.match(action)) {
        return { ...state, isLoading: false, categories: action.payload };
    }
    if (fetchCategoriesFail.match(action)) {
        return { ...state, isLoading: false, error: action.payload };
    }
    return state;
};
