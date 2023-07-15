import PropTypes from 'prop-types';

import './category-item.style.scss';

const CategoryItem = ({ category }) => {
    const { imageUrl, title } = category;
    return (
        <div className="category-container">
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className="category-body-container">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    );
};

export default CategoryItem;

CategoryItem.propTypes = {
    category: PropTypes.object.isRequired,
    title: PropTypes.string,
    imageUrl: PropTypes.string
};
