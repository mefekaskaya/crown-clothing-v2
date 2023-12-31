import { Middleware } from 'redux';

import { RootState } from '../store';

export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }
    console.log('type', action.type);
    console.log('type', action.payload);
    console.log('currenst state', store.getState());

    next(action);

    console.log('next state', store.getState());
};
