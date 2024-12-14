"use client";

import React, { useEffect, useState } from 'react';
import styles from '../../../styles/main/main.module.css';
import ASMR from './_components/asmr/ASMR';
import Background from './_components/background/Background';
import Calendar from './_components/calendar/Calendar';
import TodoList from './_components/todolist/TodoList';
import { backgroundGetCurrentAPI } from '../../../store/main/backgrounAPI';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import Mypage from './_components/mypage/Mypage';
import { useRouter } from 'next/navigation';
import { Asmr } from './_interface/MainInterface';

type ModalType = "asmr" | "background" | "calendar" | "todo" | "mypage" | null;

export default function Main() {

    const router = useRouter();
    const [openModal, setOpenModal] = useState<ModalType>(null);

    const dispatch = useDispatch<AppDispatch>();
    const userId = window.localStorage.getItem('userId');
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
    const [currentAsmr, setCurrentAsmr] = useState<Asmr | null>(null);


    useEffect(() => {
        dispatch(backgroundGetCurrentAPI(userId!))
            .unwrap()
            .then((response) => {
                setBackgroundImage(response.url);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const openModalHandler = (modalType: ModalType) => {
        if (openModal === modalType) {
            setOpenModal(null);
        } else setOpenModal(modalType);
    };

    const closeModalHandler = () => {
        setOpenModal(null);
    };

    const playAudio = (src: string, asmr: Asmr | null): void => {
        if (audioElement) {
            audioElement.pause(); // 현재 오디오를 정지
        }

        const newAudio = new Audio(src);
        newAudio.loop = true;
        newAudio.play();
        setAudioElement(newAudio);
        setCurrentAsmr(asmr);

        newAudio.onended = () => {
            setAudioElement(null); // 오디오가 끝났을 때 audioElement 초기화
            setCurrentAsmr(null);
        };
    };

    const stopAudio = () => {
        if (audioElement) {
            audioElement.pause(); // 현재 오디오를 정지
            setAudioElement(null); // 오디오 요소 초기화
            setCurrentAsmr(null);
        }
    };

    return (
        <>
            <div
                className={styles.backgroundImage}
                style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div >
            <div
                className={styles.mypage}
                onClick={() => openModalHandler("mypage")}
            >
                <Mypage
                    isModalOpen={openModal === "mypage"}
                    closeModal={closeModalHandler}
                />
            </div>
            <div
                className={styles.music_bar}
                onClick={() => { router.push('/music'); }}
            ></div>
            <div className={styles.nav}>
                <div
                    className={styles.asmr}
                    onClick={() => openModalHandler("asmr")}
                >
                    <ASMR
                        playAudio={playAudio}
                        stopAudio={stopAudio}
                        currentAsmr={currentAsmr}
                        isModalOpen={openModal === "asmr"}
                        closeModal={closeModalHandler}
                    />
                </div>
                <div
                    className={styles.background}
                    onClick={() => openModalHandler("background")}
                >
                    <Background
                        isModalOpen={openModal === "background"}
                        closeModal={closeModalHandler}
                    />
                </div>
                <div
                    className={styles.calendar}
                    onClick={() => openModalHandler("calendar")}
                >
                    <Calendar
                        isModalOpen={openModal === "calendar"}
                        closeModal={closeModalHandler}
                    />
                </div>
                <div
                    className={styles.todolist}
                    onClick={() => openModalHandler("todo")}
                >
                    <TodoList
                        isModalOpen={openModal === "todo"}
                        closeModal={closeModalHandler}
                    />
                </div>
            </div>
        </>
    )
}