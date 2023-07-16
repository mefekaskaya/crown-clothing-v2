import { all, call, takeLatest, put } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';
import {
    signInFail,
    signInSuccess,
    signOutFail,
    signOutSuccess,
    signUpFail,
    signUpSuccess
} from './user.action';
import {
    createUserDocumentFromAuth,
    getCurrentUser,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser
} from 'src/utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFail(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) {
            return;
        }
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFail(error));
        console.log(error);
    }
}

export function* onGoogleSignIn() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFail(error));
    }
}

export function* onSignOut() {
    try {
        yield takeLatest(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFail(error));
    }
}

export function* startGoogleSignIn() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, onGoogleSignIn);
}

export function* startSignOut() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, onSignOut);
}

export function* onEmailSignIn({ payload: email, password }) {
    // export function* onEmailSignIn(email, password, resetForm)
    try {
        const userDocRef = yield call(signInAuthUserWithEmailAndPassword, email, password);
        yield call(getSnapshotFromUserAuth, userDocRef);
        // resetForm();
    } catch (error) {
        switch (error.code) {
            case 'auth/wrong-password':
                alert('Your password is wrong!!!');
                yield put(signInFail(error));
                break; // We write break because if we have a match in a case then it stops checking.
            case 'auth/user-not-found':
                alert('No user associated with this email');
                yield put(signInFail(error));
                break;
            default:
                yield put(signInFail(error));
        }
    }
    // There is no real compiled place or list right now that Firebas for Authentication in current version that showcases what all of these error codes will be and what they are. It's a common thing in this community using Firebase that Google has not provided yet this full list of the error codes as well as what they are. We wrote most important for sign-in.
    // auth/user-not-found is also seen when we try to sign-in with Google Popup and the reason for this because by default, buttons are type submit inside of form. For us to prevent this from happenning, we have say that the type of Google SignIn Popup button is just the button.
}

export function* onEmailSignUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        // user.displayName = displayName;
        yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            alert('Cannot create user, email already in use.');
            put(signUpFail(error));
        } else {
            console.log('user creation encountered an error', error);
            put(signUpFail(error));
        }
    }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* startEmailSignINStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, onEmailSignIn);
}

export function* startEmailSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, onEmailSignUp);
}

export function* onCheckUser() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpSucces() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
    yield all([
        call(onCheckUser),
        call(startGoogleSignIn),
        call(startEmailSignINStart),
        call(startEmailSignUpStart),
        call(startSignOut)
    ]);
}
