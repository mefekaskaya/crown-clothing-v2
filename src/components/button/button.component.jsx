import PropTypes from 'prop-types';

import { BaseButton, GoogleSignInButton, InvertedButton, ButtonSpiner } from './button.style.js';

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
    ({
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
    }[buttonType]);
const Button = ({ children, buttonType, isLoading, ...buttonProps }) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton disabled={isLoading} {...buttonProps}>
            {isLoading ? <ButtonSpiner /> : children}
        </CustomButton>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    buttonType: PropTypes.string,
    buttonProps: PropTypes.object,
    isLoading: PropTypes.bool
};

export default Button;
