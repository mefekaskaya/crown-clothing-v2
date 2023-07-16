import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectCategoriesIsLoading } from 'src/store/category/category.selector';

import ProductCard from '../product-card/product-card.component';
import Spinner from '../spinner/spinner.component';

import { CategoryPreviewContainer, Preview, Title } from './category-preview.styles.js';

const CategoryPreview = ({ title, products }) => {
    const isLoading = useSelector(selectCategoriesIsLoading);
    return isLoading ? (
        <Spinner />
    ) : (
        <>
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
        </>
    );
};

CategoryPreview.propTypes = {
    title: PropTypes.string,
    products: PropTypes.array
};

export default CategoryPreview;
