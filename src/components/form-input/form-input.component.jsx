import PropTypes from 'prop-types';

import './form-input.style.scss';

const FormInput = ({ label, ...inputProps }) => {
    return (
        <div className="group">
            <input className="form-input" {...inputProps} />
            {label && (
                <label
                    className={`${inputProps.value.length > 0 ? 'shrink' : null} form-input-label`}>
                    {label}
                </label>
            )}
        </div>
    );
};

export default FormInput;

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    inputProps: PropTypes.object
};
