import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { DirectoryItemContainer, Body, BackgroundImage } from './directory-item.style';
import { Directory } from '../../Directories';

type DirectoryContainer = {
    directory: Directory;
};

const DirectoryItem: FC<DirectoryContainer> = ({ directory }) => {
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
