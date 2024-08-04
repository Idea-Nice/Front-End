import React, { useState, useRef } from "react";
import ReactPlayer from 'react-player';

export default function MusicPlayer(props) {
    const { playing, setPlaying, playlist } = props; // 상위 컴포넌트에 playing, setPlaying true로 정의
    const playerRef = useRef(null);
    const [ready, setReady] = useState(false);
    const [curr, setCurr] = useState(
        'https://youtu.be/sqgxcCjD04s?si=ePXJiYzUtjTZ7g_e',
    );

    const onEnded = () => {
        setCurr('https://youtu.be/ZXmoJu81e6A?si=cqMWOLxy-4PF0dxg');
        setPlaying(true);
    };

    return (
        <>
            <ReactPlayer
                url={curr} // 영상 url 삽입
                className='player' // 클래스 이름 지정하여 스타일 적용
                playing={playing} // 재생 상태, true = 재생중 / false = 일시 정지
                controls={false} // 유튜브 재생 컨트롤바 노출 여부
                onEnded={onEnded} // 현재 재생 중인 영상 종료 시 호출
                onReady={() => setReady(true)} // 영상이 로드되어 준비된 상태
            />
        </>
    );
}