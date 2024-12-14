"use client";

import React from 'react';
import styles from '../../../../../styles/main/asmr.module.css';
import { ASMRProps, Asmr } from '../../_interface/MainInterface';
import Headers from '../Header';
import ImageItem from './ImageItem';
import { useBackgroundData } from './useAsmrData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

const ASMR: React.FC<ASMRProps> = ({ playAudio, stopAudio, currentAsmr, isModalOpen, closeModal }) => {

    const { asmrAudios, userAsmrAudios } = useBackgroundData(isModalOpen);

    const handleAudioPlay = (asmr: Asmr) => {
        // 현재 재생 중인 ASMR과 클릭한 ASMR을 비교
        if (currentAsmr && currentAsmr.id === asmr.id) {
            stopAudio(); // 동일한 ASMR이면 정지
        } else {
            playAudio(asmr.audioUrl, asmr); // 다른 ASMR이면 재생
        }
    };

    if (!isModalOpen) return null;

    return (
        <>
            <div
                className={styles.main_div}
                onClick={(e: any) => e.stopPropagation()}
            >
                <Headers title="ASMR 선택" onClick={closeModal} />
                <div className={styles.out_div}>
                    <div className={styles.img_div}>
                        {
                            asmrAudios.map((asmr: Asmr) => {
                                const isLocked = !userAsmrAudios.some(userAsmr => userAsmr.id === asmr.id);
                                const isActive = currentAsmr && currentAsmr.id === asmr.id;
                                return (
                                    <ImageItem
                                        key={asmr.id}
                                        id={asmr.id}
                                        name={asmr.name}
                                        imageUrl={asmr.imageUrl}
                                        isLocked={isLocked}
                                        onPlay={() => handleAudioPlay(asmr)}
                                        isActive={isActive}
                                        lockIcon={<FontAwesomeIcon icon={faLock} />}
                                        actionIcon={isActive ? <span><FontAwesomeIcon icon={faPlay}/></span> : <span><FontAwesomeIcon icon={faStop}/></span>}
                                        closeModal={closeModal}
                                    />
                                )
                            })}
                    </div>
                </div>
            </div>

        </>
    )
}

export default ASMR;