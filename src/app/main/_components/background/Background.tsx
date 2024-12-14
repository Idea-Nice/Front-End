"use client";

import React from 'react';
import { BackGround, ModalProps } from '../../_interface/MainInterface';
import styles from '../../../../../styles/main/background.module.css';
import Headers from '../Header';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store/store';
import { backgroundSetCurrentAPI } from '../../../../../store/main/backgrounAPI';
import { useBackgroundData } from './useBackgroundData';
import ImageItem from '../ImageItem';

const Background: React.FC<ModalProps> = ({ isModalOpen, closeModal }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { backgroundImgs, userBackgroundImgs } = useBackgroundData(isModalOpen);

    const saveBackground = (background_id: string) => {
        dispatch(backgroundSetCurrentAPI(background_id))
            .unwrap()
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
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
                                        fileName={background.fileName}
                                        imageUrl={background.url}
                                        isLocked={isLocked}
                                        onSave={saveBackground}
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