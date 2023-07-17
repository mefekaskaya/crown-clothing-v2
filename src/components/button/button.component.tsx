import { FC, ButtonHTMLAttributes } from 'react';
import PropTypes from 'prop-types';

import { BaseButton, GoogleSignInButton, InvertedButton, ButtonSpiner } from './button.style';

export enum BUTTON_TYPE_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
    ({
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
    }[buttonType]);

export type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASSES;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...buttonProps }) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton disabled={isLoading} {...buttonProps}>
            {isLoading ? <ButtonSpiner /> : children}
        </CustomButton>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    isLoading: PropTypes.bool
};

export default Button;
