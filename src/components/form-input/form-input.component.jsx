import PropTypes from 'prop-types';

import { FormInputLabel, Input, Group } from './form-input.style.js';

const FormInput = ({ label, ...inputProps }) => {
    return (
        <Group>
            <Input {...inputProps} />
            {label && <FormInputLabel shrink={inputProps.value.length}>{label}</FormInputLabel>}
        </Group>
    );
};

export default FormInput;

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    inputProps: PropTypes.object
};
