import { USER_ACTION_TYPES } from './user.types';

export const checkUserSession = () => ({
    type: USER_ACTION_TYPES.CHECK_USER_SESSION
});

export const googleSignInStart = () => ({
    type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START
});

export const emailSignUpStart = (email, password) => ({
    type: USER_ACTION_TYPES.EMAIL_SIGN_UP_START,
    payload: { email, password }
});

export const emailSignInStart = (email, password, displayName) => ({
    type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    payload: { email, password, displayName }
});

export const signInSuccess = (user) => ({
    type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFail = (error) => ({
    type: USER_ACTION_TYPES.SIGN_IN_FAIL,
    payload: error
});

export const signUpSuccess = (user, additionalDetails) => ({
    type: USER_ACTION_TYPES.SIGN_UP_SUCCESS,
    payload: { user, additionalDetails }
});

export const signUpFail = (error) => ({
    type: USER_ACTION_TYPES.SIGN_UP_FAIL,
    payload: error
});

export const signOutStart = () => ({
    type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS
});

export const signOutSuccess = () => ({
    type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS
});

export const signOutFail = (error) => ({
    type: USER_ACTION_TYPES.SIGN_UP_FAIL,
    payload: error
});
