import React from 'react';
import styles from '../../../../styles/main/background.module.css';
import { ImageItemProps } from '../_interface/MainInterface';


const ImageItem: React.FC<ImageItemProps> = ({
    id,
    fileName,
    imageUrl,
    isLocked,
    onSave,
    isActive,
    lockIcon,
    actionIcon
}) => {

    return (
        <div
            className={`${styles.img} ${isLocked ? styles.locked : ''}`}
            title={isLocked ? '' : fileName}
            style={{ backgroundImage: `url(${imageUrl})` }}
            onClick={() => !isLocked && onSave(id)}
        >
            {isLocked && <span className={styles.lockIcon}>{lockIcon || "🔒"}</span>}
            {isActive && actionIcon && <span className={styles.actionIcon}>{actionIcon}</span>}
        </div>
    );
};

export default ImageItem;