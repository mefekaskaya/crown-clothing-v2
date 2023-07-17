import { all, call, takeLatest, put } from 'typed-redux-saga/macro';
import { User } from 'firebase/auth';

import { USER_ACTION_TYPES } from './user.types';
import {
    signInFail,
    signInSuccess,
    signOutFail,
    signOutSuccess,
    signUpFail,
    signUpSuccess,
    EmailSignInStart,
    EmailSignUpStart,
    SignUpSuccess
} from './user.action';
import {
    createUserDocumentFromAuth,
    getCurrentUser,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    AdditionalInformation
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(
    userAuth: User,
    additionalDetails?: AdditionalInformation
) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);
        if (userSnapshot) {
            yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        }
    } catch (error) {
        yield* put(signInFail(error as Error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) {
            return;
        }
        yield* call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield* put(signInFail(error as Error));
        console.log(error);
    }
}

export function* onGoogleSignIn() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(signInFail(error as Error));
    }
}

export function* onSignOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch (error) {
        yield* put(signOutFail(error as Error));
    }
}

export function* startGoogleSignIn() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, onGoogleSignIn);
}

export function* startSignOut() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, onSignOut);
}

export function* onEmailSignIn({ payload: { email, password } }: EmailSignInStart) {
    try {
        const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password);
        if (userCredential) {
            const { user } = userCredential;
            yield* call(getSnapshotFromUserAuth, user);
        }
    } catch (error) {
        yield* put(signInFail(error as Error));
    }
}

export function* onEmailSignUp({ payload: { email, password, displayName } }: EmailSignUpStart) {
    try {
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
        if (userCredential) {
            const { user } = userCredential;
            yield* put(signUpSuccess(user, { displayName }));
        }
    } catch (error) {
        yield* put(signUpFail(error as Error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }: SignUpSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* startEmailSignINStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, onEmailSignIn);
}

export function* startEmailSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, onEmailSignUp);
}

export function* onCheckUser() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpSucces() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
    yield* all([
        call(onCheckUser),
        call(startGoogleSignIn),
        call(startEmailSignINStart),
        call(startEmailSignUpStart),
        call(startSignOut)
    ]);
}
