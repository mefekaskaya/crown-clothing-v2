import { useContext } from 'react';
import PropTypes from 'prop-types';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';

import './product-card.styles.scss';

const ProductCard = ({ product }) => {
    const { addItemToCart } = useContext(CartContext);
    const { name, price, imageUrl } = product;

    const addProductToCart = () => {
        addItemToCart(product);
    };
    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType="inverted" onClick={addProductToCart}>
                Add to Card
            </Button>
        </div>
    );
};

export default ProductCard;

ProductCard.propTypes = {
    product: PropTypes.object.isRequired
};
