import { AnyAction } from 'redux';

import { signInFail, signUpFail, signOutFail, signOutSuccess, signInSuccess } from './user.action';

import { UserData } from '../../utils/firebase/firebase.utils';

export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

export const INITIAL_VALUES: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
};

export const userReducer = (state = INITIAL_VALUES, action: AnyAction) => {
    if (signInSuccess.match(action)) {
        return {
            ...state,
            currentUser: action.payload,
            isLoading: false
        };
    }
    if (signOutSuccess.match(action)) {
        return {
            ...state,
            currentUser: null
        };
    }
    if (signInFail.match(action) || signOutFail.match(action) || signUpFail.match(action)) {
        return {
            ...state,
            error: action.payload,
            isLoading: false
        };
    }
    return state;
};
