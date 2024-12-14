import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import styles from '../../../../styles/main/background.module.css';
import { headerProps } from '../_interface/MainInterface';

const Header: React.FC<headerProps> = ({ title, onClick }) => {
    return (
        <div className={styles.modalHeader}>
            <h2>{title}</h2>
            <FontAwesomeIcon icon={faX} className={styles.modal_out} onClick={onClick} />
        </div>
    );
};

export default Header;