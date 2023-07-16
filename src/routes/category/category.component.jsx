import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoriessContext } from '../../contexts/categories.context';

import { CategoryContainer, CategoryTitle } from './category.style.js';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriessContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {products &&
                    products.map((product) => <ProductCard key={product.id} product={product} />)}
            </CategoryContainer>{' '}
        </>
    );
};

export default Category;