import PropTypes from 'prop-types';

import { CartItemContainer, ItemDetails } from './cart-item.styles.js';

const CartItem = ({ cartItem }) => {
    const { name, imageUrl, quantity, price } = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={name} />
            <ItemDetails>
                <span className="price">
                    {quantity} X ${price}
                </span>
            </ItemDetails>
        </CartItemContainer>
    );
};
CartItem.propTypes = {
    cartItem: PropTypes.object.isRequired
};

export default CartItem;
