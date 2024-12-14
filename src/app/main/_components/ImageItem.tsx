import React from 'react';
import styles from '../../../../styles/main/background.module.css';
import { ImageItemProps } from '../_interface/MainInterface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { asmrPurchaseAPI } from '../../../../store/main/asmrAPI';
import { response } from '../../../../util/response';
import { error } from '../../../../util/error';
import Swal from 'sweetalert2';
import { backgroundPurchaseAPI } from '../../../../store/main/backgrounAPI';


const ImageItem: React.FC<ImageItemProps> = ({
    id,
    name,
    fileName,
    imageUrl,
    isLocked,
    isWho,
    onPlay,
    isActive,
    lockIcon,
    actionIcon
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const userId = window.localStorage.getItem('userId');

    const purchaseASMRDTO = {
        userId: userId!,
        asmrFileName: fileName
    }

    const purchaseBackgroundDTO = {
        userId: userId!,
        backgroundId: id
    }

    const purchaseOrPlay = (id: string) => {
        if (isLocked) {
            Swal.fire({
                text: "결제하시겠습니까?",
                showCancelButton: true,
                confirmButtonText: "네",
                cancelButtonText: "아뇨"
            }).then(click => {
                if (click.isConfirmed) {
                    if (isWho === "ASMR") {
                        dispatch(asmrPurchaseAPI(purchaseASMRDTO))
                            .unwrap()
                            .then((result) => {
                                response(result);
                            })
                            .catch((err) => {
                                error(err);
                            })
                    } else if (isWho === "BACKGROUND") {
                        dispatch(backgroundPurchaseAPI(purchaseBackgroundDTO))
                            .unwrap()
                            .then((result) => {
                                response(result);
                            })
                            .catch((err) => {
                                error(err);
                            })
                    }
                }
            })
        } else {
            onPlay(id);
        }
    }

    return (
        <div
            className={`${styles.img} ${isLocked ? styles.locked : ''}`}
            title={isLocked ? '' : name}
            style={{ backgroundImage: `url(${imageUrl})` }}
            onClick={() => purchaseOrPlay(id)}
        >
            {isLocked && <span className={styles.lockIcon}>{lockIcon || "🔒"}</span>}
            {isActive && actionIcon && <span className={styles.actionIcon}>{actionIcon}</span>}
        </div>
    );
};

export default ImageItem;