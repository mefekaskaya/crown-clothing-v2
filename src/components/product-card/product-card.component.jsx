import { useContext } from 'react';
import PropTypes from 'prop-types';

import { CartContext } from '../../contexts/cart.context';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { ProductCartContainer, Footer, Name, Price } from './product-card.styles.js';

const ProductCard = ({ product }) => {
    const { addItemToCart } = useContext(CartContext);
    const { name, price, imageUrl } = product;

    const addProductToCart = () => {
        addItemToCart(product);
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
