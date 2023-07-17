import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { ProductCartContainer, Footer, Name, Price } from './product-card.styles';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CategoryItem } from '../../store/category/category.types';

type PropductCardProps = {
    product: CategoryItem;
};

const ProductCard: FC<PropductCardProps> = ({ product }) => {
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
