import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './spinner.style';

export default function Spinner() {
    return (
        <SpinnerOverlay>
            <SpinnerContainer></SpinnerContainer>
        </SpinnerOverlay>
    );
}
