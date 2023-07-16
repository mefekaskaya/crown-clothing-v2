import { useSelector } from 'react-redux';

import CheckoutHeader from '../../components/checkout-header/checkout-header.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { selectCartItems, selectCartTotal } from 'src/store/cart/cart-selector';

import PaymentForm from 'src/components/payment-form/payment-form.component';
import { CheckoutContainer, Total } from './checkout.style.js';

export default function Checkout() {
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectCartTotal);
    return (
        <CheckoutContainer>
            <CheckoutHeader />
            {cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} checkoutItem={cartItem} />
            ))}
            <Total>Total: ${totalPrice}</Total>
            <PaymentForm />
        </CheckoutContainer>
    );
}
