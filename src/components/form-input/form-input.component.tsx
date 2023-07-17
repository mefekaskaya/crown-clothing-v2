import { InputHTMLAttributes, FC } from 'react';

import { FormInputLabel, Input, Group } from './form-input.style';

type FormInputProps = {
    label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...inputProps }) => {
    return (
        <Group>
            <Input {...inputProps} />
            {label && (
                <FormInputLabel
                    shrink={Boolean(
                        inputProps.value &&
                            typeof inputProps.value === 'string' &&
                            inputProps.value.length
                    )}>
                    {label}
                </FormInputLabel>
            )}
        </Group>
    );
};

export default FormInput;
