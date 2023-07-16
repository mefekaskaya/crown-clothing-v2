import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SHOP_DATA from '../shop-data.json';

export const ProductsContext = createContext({
    products: [],
    setProducts: () => []
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(SHOP_DATA);
    const value = {
        products,
        setProducts
    };

    useEffect(() => {
        setProducts(SHOP_DATA);
    }, []);
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

ProductsProvider.propTypes = {
    children: PropTypes.node
};
