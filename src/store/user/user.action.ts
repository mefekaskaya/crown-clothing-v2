import { User } from 'firebase/auth';

import { USER_ACTION_TYPES } from './user.types';
import {
    createAction,
    withMatcher,
    Action,
    ActionWithPayload
} from '../../utils/reducer/reducer.utils';
import { UserData, AdditionalInformation } from '../../utils/firebase/firebase.utils';

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export const checkUserSession = withMatcher(
    (): CheckUserSession => ({
        type: USER_ACTION_TYPES.CHECK_USER_SESSION
    })
);

export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>;

export const setCurrenctUser = withMatcher(
    (user: UserData): SetCurrentUser => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
);

export type GoogleSigninStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export const googleSignInStart = withMatcher(
    (): GoogleSigninStart => ({
        type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START
    })
);

export type EmailSignUpStart = ActionWithPayload<
    USER_ACTION_TYPES.EMAIL_SIGN_UP_START,
    { email: string; password: string; displayName: string }
>;

export const emailSignUpStart = withMatcher(
    (email: string, password: string, displayName: string): EmailSignUpStart => ({
        type: USER_ACTION_TYPES.EMAIL_SIGN_UP_START,
        payload: { email, password, displayName }
    })
);

export type EmailSignInStart = ActionWithPayload<
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    { email: string; password: string }
>;

export const emailSignInStart = withMatcher(
    (email: string, password: string): EmailSignInStart => ({
        type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
        payload: { email, password }
    })
);

export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>;

export const signInSuccess = withMatcher((user: UserData & { id: string }) => ({
    type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
    payload: user
}));

export type SignInFail = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAIL, Error>;

export const signInFail = withMatcher(
    (error: Error): SignInFail => ({
        type: USER_ACTION_TYPES.SIGN_IN_FAIL,
        payload: error
    })
);

export type SignUpSuccess = ActionWithPayload<
    USER_ACTION_TYPES.SIGN_UP_SUCCESS,
    { user: User; additionalDetails: AdditionalInformation }
>;

export const signUpSuccess = withMatcher(
    (user: User, additionalDetails: AdditionalInformation): SignUpSuccess => ({
        type: USER_ACTION_TYPES.SIGN_UP_SUCCESS,
        payload: { user, additionalDetails }
    })
);

export type SignUpFail = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAIL, Error>;

export const signUpFail = withMatcher(
    (error: Error): SignUpFail => ({
        type: USER_ACTION_TYPES.SIGN_UP_FAIL,
        payload: error
    })
);

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export const signOutStart = withMatcher(
    (): SignOutStart => ({
        type: USER_ACTION_TYPES.SIGN_OUT_START
    })
);

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export const signOutSuccess = withMatcher(
    (): SignOutSuccess => ({
        type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS
    })
);

export type SignOutFail = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAIL, Error>;

export const signOutFail = withMatcher(
    (error: Error): SignOutFail => ({
        type: USER_ACTION_TYPES.SIGN_OUT_FAIL,
        payload: error
    })
);
