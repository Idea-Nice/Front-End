import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./MainPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeOff, faImage } from "@fortawesome/free-solid-svg-icons";
import WhiteNoise from '../../component/WhiteNoise/WhiteNoise.jsx';
import House from '../../component/House/House.jsx';
import Calendar from '../../component/Calendar/Calendar.jsx';
import Todolist from '../../component/Todolist/Todolist.jsx';
import BackImage from '../../component/BackImage/BackImage.jsx';
import axios from "axios";

export default function MainPage() {
    const token = window.localStorage.getItem('token');
    const user_id = window.localStorage.getItem('userId');
    const [level, setLevel] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [whiteNoiseOpen, setWhiteNoiseOpen] = useState(false);
    const [houseOpen, setHouseOpen] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [todolistOpen, setTodolistOpen] = useState(false);
    const [backImageOpen, setBackImageOpen] = useState(false);
    const [audioElement, setAudioElement] = useState(null);
    const [currentAsmr, setCurrentAsmr] = useState(null);

    useEffect(() => {
        axios({
            method: 'get',
            url: `/level-get/${user_id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((result) => {
            setLevel(result.data.level);
        });
        axios({
            method: 'get',
            url: `/user/get-background/${user_id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((result) => {
            setBackgroundImage(result.data.data.imageBase64);
        });
        axios({
            method: 'get',
            url: `/user/get-background/${user_id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((result) => {
            window.localStorage.setItem('back_id', result.data.data.id);
        })
    }, []);

    const toggleModal = (setOpen, openStates) => {
        setOpen(prev => !prev);
        Object.keys(openStates).forEach(key => {
            if (key !== setOpen) {
                openStates[key](false);
            }
        });
    };

    const whiteNoiseModal = () => toggleModal(setWhiteNoiseOpen, {
        setHouseOpen, setCalendarOpen, setTodolistOpen, setBackImageOpen
    });
    const houseModal = () => toggleModal(setHouseOpen, {
        setWhiteNoiseOpen, setCalendarOpen, setTodolistOpen, setBackImageOpen
    });
    const calendarModal = () => toggleModal(setCalendarOpen, {
        setWhiteNoiseOpen, setHouseOpen, setTodolistOpen, setBackImageOpen
    });
    const todolistModal = () => toggleModal(setTodolistOpen, {
        setWhiteNoiseOpen, setHouseOpen, setCalendarOpen, setBackImageOpen
    });
    const backImageModal = () => toggleModal(setBackImageOpen, {
        setWhiteNoiseOpen, setHouseOpen, setCalendarOpen, setTodolistOpen
    });

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const playAudio = (src, asmr) => {
        if (audioElement) {
            audioElement.pause(); // 현재 오디오를 정지
        }

        const newAudio = new Audio(src);
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
            {/* 배경화면 이미지 */}
            <div
                className="backgroundImage"
                style={{ backgroundImage: `url(data:image/jpeg;base64,${backgroundImage})` }}
            ></div>

            {/* 마이페이지 */}
            <div className="my_level_bar">{level}</div>

            {/* bgm 키고 끄기 */}
            <FontAwesomeIcon className="main_page_bgm" icon={faVolumeHigh} size="2x" color="#29293E" />

            {/* 모달 네비게이션 */}
            <div className="main_page_nav">
                <div className="main_page_nav_noise" onClick={whiteNoiseModal}>
                    {whiteNoiseOpen && (
                        <div onClick={stopPropagation}>
                            <WhiteNoise
                                playAudio={playAudio}
                                stopAudio={stopAudio}
                                currentAsmr={currentAsmr}
                            />
                        </div>
                    )}
                </div>
                <div className="main_page_nav_calendar" onClick={calendarModal}>
                    {calendarOpen && <div onClick={stopPropagation}><Calendar onClick={stopPropagation} /></div>}
                </div>
                <div className="main_page_nav_todolist" onClick={todolistModal}>
                    {todolistOpen && <div onClick={stopPropagation}><Todolist onClick={stopPropagation} /></div>}
                </div>
                <div className="main_page_nav_backimg" onClick={backImageModal}>
                    {backImageOpen && <div onClick={stopPropagation}><BackImage onClick={stopPropagation} /></div>}
                </div>
                <div className="main_page_nav_house" onClick={houseModal}>
                    {houseOpen && <div onClick={stopPropagation}><House onClick={stopPropagation} /></div>}
                </div>
            </div>

            {/* 음악 페이지로 이동 */}
            <Link to={'/musicpage'} className="main_page_music_bar" />
        </>
    );
}
