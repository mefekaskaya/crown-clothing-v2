import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import Button, { BUTTON_TYPE_CLASSES } from '../button.component';

describe('button tests', () => {
    test('should base button when nothing is passed', async () => {
        render(<Button />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveStyleRule('background-color', 'black');
    });

    test('should render google button when passed google button type', async () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />);
        const googleButtonElement = screen.getByRole('button');
        expect(googleButtonElement).toHaveStyleRule('background-color', '#4285f4');
    });

    test('should render inverted button when passed google button type', async () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />);
        const invertedButton = screen.getByRole('button');
        expect(invertedButton).toHaveStyleRule('background-color', 'white');
    });

    test('should be disabled if isLoading is true', () => {
        render(<Button isLoading={true} />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeDisabled();
    });

    // TODO: Styled-components doesn't change color when it is hovered after package upgraded to 6.0.7 from 5.3.6
    // test('should render google button when passed google button type and is hovered', async () => {
    //     const user = userEvent.setup();
    //     render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />);
    //     const googleButtonElement = await screen.findByRole('button');
    //     await user.hover(googleButtonElement);
    //     expect(googleButtonElement).toHaveStyleRule('background-color', '#357ae8');
    // });
});
