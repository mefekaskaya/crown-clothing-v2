import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUp from '../../components/sign-up-form/sign-up-form.component';

import {
    auth,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
    const getRedirectedResult = async () => {
        const response = await getRedirectResult(auth);
        if (response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
            console.log(userDocRef);
        }
    };

    useEffect(() => {
        getRedirectedResult();
    }, []);
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    };

    return (
        <div>
            <h1>SignIn Page</h1>
            <button onClick={logGoogleUser}>Sigsn in with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
            <SignUp />
        </div>
    );
};

export default SignIn;
