import React from 'react';
import styles from '../../../../../styles/main/background.module.css';
import { ASMRItemProps } from '../../_interface/MainInterface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store/store';
import { asmrPurchaseAPI } from '../../../../../store/main/asmrAPI';
import { response } from '../../../../../util/response';
import { error } from '../../../../../util/error';
import Swal from 'sweetalert2';


const ImageItem: React.FC<ASMRItemProps> = ({
    id,
    name,
    imageUrl,
    isLocked,
    onPlay,
    isActive,
    lockIcon,
    actionIcon,
    closeModal
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const userId = window.localStorage.getItem('userId');

    const purchaseASMRDTO = {
        userId: userId!,
        asmrName: name
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
                    dispatch(asmrPurchaseAPI(purchaseASMRDTO))
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
            onPlay(id);
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