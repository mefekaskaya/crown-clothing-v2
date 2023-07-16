import { useState, useContext } from 'react';

import { UserContext } from '../../contexts/user.context';

import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { SignInContainer, ButtonsContainer } from './sign-in-form.style.js';
const defaultFormFields = {
    email: '',
    password: ''
};

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const logGoogleUser = async () => {
        await signInWithGooglePopup();
    };

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const userDocRef = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(userDocRef);
            setCurrentUser(userDocRef);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Your password is wrong!!!');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    return (
        <SignInContainer>
            <h2>Already have an account</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <ButtonsContainer>
                    <Button
                        type="button"
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={logGoogleUser}>
                        Google Sign In
                    </Button>
                    <Button type="submit">Sign in with Email</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignIn;
