import { categoriesReducer, CATEGORY_INITIAL_STATE } from '../category.reducer';
import { fetchCategoriesSuccess, fetchActionStart, fetchCategoriesFail } from '../category.action';

describe('Category reducer test', () => {
    test('fetchCategoryStart', () => {
        const expectedState = {
            ...CATEGORY_INITIAL_STATE,
            isLoading: true
        };
        expect(categoriesReducer(CATEGORY_INITIAL_STATE, fetchActionStart())).toEqual(
            expectedState
        );
    });

    test('fetchCategoriesSuccess', () => {
        const mockData = [
            {
                title: 'mens',
                imageUrl: 'test',
                items: [
                    { id: 1, name: 'Product 1' },
                    { id: 2, name: 'Product 2' }
                ]
            },
            {
                title: 'womens',
                imageUrl: 'test2',
                items: [
                    { id: 3, name: 'Product 3' },
                    { id: 4, name: 'Product 4' }
                ]
            }
        ];
        const expectedState = {
            ...CATEGORY_INITIAL_STATE,
            isLoading: false,
            categories: mockData
        };
        expect(categoriesReducer(CATEGORY_INITIAL_STATE, fetchCategoriesSuccess(mockData))).toEqual(
            expectedState
        );
    });
    test('fetchCategoriesFailed', () => {
        const mockError = new Error('Error fetching categories');
        const expectedState = {
            ...CATEGORY_INITIAL_STATE,
            isLoading: false,
            error: mockError
        };
        expect(categoriesReducer(CATEGORY_INITIAL_STATE, fetchCategoriesFail(mockError))).toEqual(
            expectedState
        );
    });
});
