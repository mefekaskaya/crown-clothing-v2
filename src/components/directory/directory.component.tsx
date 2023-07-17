import DirectoryItem from '../directory-item/directory-item.component';
import { DirectoryContainer } from './directory.style';
import { directories } from '../../Directories';

const Directory = () => {
    return (
        <DirectoryContainer>
            {directories.map((directory) => (
                <DirectoryItem directory={directory} key={directory.id} />
            ))}
        </DirectoryContainer>
    );
};

export default Directory;
