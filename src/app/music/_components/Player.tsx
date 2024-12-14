import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';

export default function MusicPlayer(props: any) {
    const { playlist, playing, setPlaying } = props;

    useEffect(() => {
        setPlaying(true);
    }, [playlist, setPlaying]);

    return (
        <>
            {playing && (
                <ReactPlayer
                    url={playlist} // 재생할 URL
                    playing={playing} // 재생 상태
                    controls={true} // 유튜브 재생 컨트롤바 노출 여부
                    width={870} // width 설정
                    height={550} // height 설정
                />
            )}
        </>
    );
}