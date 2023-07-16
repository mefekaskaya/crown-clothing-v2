import React, { Fragment, useContext } from 'react';
import { CategoriessContext } from '../../contexts/categories.context';

import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriessContext);
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
