import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriessContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoryMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        };
        getCategoryMap();
    }, []);

    const value = {
        categoriesMap
    };
    return <CategoriessContext.Provider value={value}>{children}</CategoriessContext.Provider>;
};

CategoriesProvider.propTypes = {
    children: PropTypes.node
};
