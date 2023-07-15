import PropTypes from 'prop-types';

import './button.style.scss';

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
};

const Button = ({ children, buttonType, ...buttonProps }) => {
    return (
        <button {...buttonProps} className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    buttonType: PropTypes.string,
    buttonProps: PropTypes.object
};

export default Button;
