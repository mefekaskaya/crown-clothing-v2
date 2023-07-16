import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import PropTypes from 'prop-types';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { selectCartItems } from 'src/store/cart/cart-selector';

import { ProductCartContainer, Footer, Name, Price } from './product-card.styles.js';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, price, imageUrl } = product;

    const addProductToCart = () => {
        dispatch(addItemToCart(product, cartItems));
    };
    return (
        <ProductCartContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
                Add to Card
            </Button>
        </ProductCartContainer>
    );
};

export default ProductCard;

ProductCard.propTypes = {
    product: PropTypes.object.isRequired
};
