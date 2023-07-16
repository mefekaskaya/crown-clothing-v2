import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesMap } from 'src/store/category/category.selector';

import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    return (
        <>
            {Object.keys(categoriesMap).map((title) => (
                <Fragment key={title}>
                    <CategoryPreview title={title} products={categoriesMap[title]} />
                </Fragment>
            ))}
        </>
    );
};

export default CategoriesPreview;
