import React, { useState, FormEvent } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { PaymentFormContainer, FormContainer, PaymentButton } from './payment-form.styles';

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement =>
    card !== null;

export default function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsProcessingPayment(true);
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                ContentType: 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 })
        }).then((res) => res.json());
        const clientSecret = response.paymentIntent.client_secret;
        const cartDetails = elements.getElement(CardElement);
        if (!ifValidCardElement(cartDetails)) return;
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cartDetails,
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest'
                }
            }
        });
        setIsProcessingPayment(false);
        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('payment successful');
            }
        }
    };
    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <PaymentButton
                    isLoading={isProcessingPayment}
                    buttonType={BUTTON_TYPE_CLASSES.inverted}>
                    Pay Now
                </PaymentButton>
            </FormContainer>{' '}
        </PaymentFormContainer>
    );
}
