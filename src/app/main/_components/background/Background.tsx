"use client";

import React from 'react';
import { BackGround, ModalProps } from '../../_interface/MainInterface';
import styles from '../../../../../styles/main/background.module.css';
import Headers from '../Header';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store/store';
import { backgroundSetCurrentAPI } from '../../../../../store/main/backgrounAPI';
import { useBackgroundData } from './useBackgroundData';
import ImageItem from './ImageItem';
import { response } from '../../../../../util/response';
import { error } from '../../../../../util/error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const Background: React.FC<ModalProps> = ({ isModalOpen, closeModal }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { backgroundImgs, userBackgroundImgs } = useBackgroundData(isModalOpen);

    const saveBackground = (saveDTO: { userId: string, backgroundName: string }) => {
        dispatch(backgroundSetCurrentAPI(saveDTO))
            .unwrap()
            .then(async (result) => {
                await response(result);
                window.location.reload();
            })
            .catch((err) => {
                error(err);
            })
    };

    if (!isModalOpen) return null;

    return (
        <>
            <div
                className={styles.main_div}
                onClick={(e: any) => e.stopPropagation()}
            >
                <Headers title="배경화면 선택" onClick={closeModal} />
                <div className={styles.out_div}>
                    <div className={styles.img_div}>
                        {
                            backgroundImgs.map((background: BackGround) => {
                                const isLocked = !userBackgroundImgs.some(userBackgroundImg => userBackgroundImg.id === background.id);
                                return (
                                    <ImageItem
                                        key={background.id}
                                        id={background.id}
                                        name={background.name}
                                        imageUrl={background.url}
                                        isLocked={isLocked}
                                        lockIcon={<FontAwesomeIcon icon={faLock} />}
                                        onSave={saveBackground}
                                        closeModal={closeModal}
                                    />
                                )
                            })}
                    </div>
                </div >
            </div>
        </>
    )

}

export default Background;