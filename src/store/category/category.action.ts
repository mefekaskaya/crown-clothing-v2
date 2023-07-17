import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPES, Category } from './category.types';

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export const fetchActionStart = withMatcher(
    (): FetchCategoriesStart => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
);

export type FetchCategoriesSuccess = ActionWithPayload<
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    Category[]
>;

export const fetchCategoriesSuccess = withMatcher(
    (categories: Category[]): FetchCategoriesSuccess =>
        createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories)
);

export type FetchCategoriesFail = ActionWithPayload<
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL,
    Error
>;

export const fetchCategoriesFail = withMatcher(
    (error: Error): FetchCategoriesFail =>
        createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, error)
);