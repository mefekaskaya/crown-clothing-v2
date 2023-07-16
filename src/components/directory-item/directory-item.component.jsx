import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { DirectoryItemContainer, Body, BackgroundImage } from './directory-item.style.js';

const DirectoryItem = ({ directory }) => {
    const navigate = useNavigate();
    const { imageUrl, title, route } = directory;
    const onNavigateHandler = () => navigate(route);
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;

DirectoryItem.propTypes = {
    directory: PropTypes.object.isRequired,
    title: PropTypes.string,
    imageUrl: PropTypes.string
};
