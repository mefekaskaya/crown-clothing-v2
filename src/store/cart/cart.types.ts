import { CategoryItem } from '../category/category.types';

export enum CART_ACTIONS {
    TOGGLE_IS_CART_OPEN = 'TOGGLE_IS_CART_OPEN',
    SET_CART_ITEMS = 'SET_CART_ITEMS',
    SET_TOTAL_PRICE = 'SET_TOTAL_PRICE',
    SET_TOTAL_QUANTITY = 'SET_TOTAL_QUANTITY'
}

export type CartItem = CategoryItem & {
    quantity: number;
};
