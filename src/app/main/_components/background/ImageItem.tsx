import React from 'react';
import styles from '../../../../../styles/main/background.module.css';
import { BackgroundItemProps } from '../../_interface/MainInterface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store/store';
import { response } from '../../../../../util/response';
import { error } from '../../../../../util/error';
import Swal from 'sweetalert2';
import { backgroundPurchaseAPI } from '../../../../../store/main/backgrounAPI';


const ImageItem: React.FC<BackgroundItemProps> = ({
    id,
    name,
    imageUrl,
    isLocked,
    onSave,
    isActive,
    lockIcon,
    actionIcon,
    closeModal
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const userId = window.localStorage.getItem('userId');

    const purchaseBackgroundDTO = {
        userId: userId!,
        backgroundName: name
    }

    const saveDTO = {
        userId: userId!,
        backgroundName: name
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

                    dispatch(backgroundPurchaseAPI(purchaseBackgroundDTO))
                        .unwrap()
                        .then((result) => {
                            response(result);
                            closeModal();
                        })
                        .catch((err) => {
                            error(err);
                        })
                }
            })
        } else {
            onSave(saveDTO);
        }
    }

    return (
        <div
            className={styles.img}
            title={isLocked ? '' : name}
            style={{ backgroundImage: `url(${imageUrl})` }}
            onClick={() => purchaseOrPlay(id)}
        >
            {isLocked && <span>{lockIcon}</span>}
            {isActive && actionIcon && <span>{actionIcon}</span>}
        </div>
    );
};

export default ImageItem;