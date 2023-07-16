import DirectoryItem from '../directory-item/directory-item.component';
import { DirectoryContainer } from './directory.style.js';
import directories from '../../Directories.json';

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
