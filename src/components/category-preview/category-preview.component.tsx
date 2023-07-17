import { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesIsLoading } from '../../store/category/category.selector';
import { CategoryItem } from '../../store/category/category.types';

import ProductCard from '../product-card/product-card.component';
import Spinner from '../spinner/spinner.component';

import { CategoryPreviewContainer, Preview, Title } from './category-preview.styles';

type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
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

export default CategoryPreview;
