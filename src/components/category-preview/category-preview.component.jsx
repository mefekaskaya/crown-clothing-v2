import PropTypes from 'prop-types';

import ProductCard from '../product-card/product-card.component';

import { CategoryPreviewContainer, Preview, Title } from './category-preview.styles.js';

const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {products.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Preview>
        </CategoryPreviewContainer>
    );
};

CategoryPreview.propTypes = {
    title: PropTypes.string,
    products: PropTypes.array
};

export default CategoryPreview;
