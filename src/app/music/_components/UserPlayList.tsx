import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../../../store/store";
import { ListProp } from "../_interface/MusicInterface";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../../../../styles/music/music.module.css';
import { addListByUrlAPI, deleteListAPI, getUserListAPI } from "../../../../store/music/musicAPI";
import Swal from "sweetalert2";
import { response } from "../../../../util/response";
import { error } from "../../../../util/error";
import { alertTitle } from "../../../../util/alert";

export default function UserPlayList({ handleTitleClick }: { handleTitleClick: (url: string) => void }) {

    const dispatch = useDispatch<AppDispatch>();
    const userId = window.localStorage.getItem('userId');
    const list = useSelector((state: RootState) => state.musicAPI.userList);

    const [videoUrl, setVideoUrl] = useState<string>();

    useEffect(() => {
        dispatch(getUserListAPI(userId!))
    }, [])

    const onChange = (e: any) => {
        setVideoUrl(e.target.value)
    }

    const addUrlList = () => {
        const addUrlDTO = {
            userId: userId!,
            videoUrl: videoUrl!
        }
        if (videoUrl) {
            dispatch(addListByUrlAPI(addUrlDTO))
                .unwrap()
                .then((result) => {
                    response(result);
                    setVideoUrl('');
                    dispatch(getUserListAPI(userId!))
                })
                .catch((err) => {
                    error(err)
                });
        } else {
            alertTitle("빈 칸은 작성이 안됩니다.");
        }
    }

    const deleteList = (id: string) => {
        const deleteListDTO = {
            userId: userId!,
            videoId: id
        }
        Swal.fire({
            text: "재생 목록에서 삭제하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: "네",
            cancelButtonText: "아뇨"
        }).then(click => {
            if (click.isConfirmed) {
                dispatch(deleteListAPI(deleteListDTO))
                    .unwrap()
                    .then((result) => {
                        setTimeout(() => response(result), 2000);
                        dispatch(getUserListAPI(userId!))
                    })
                    .catch(err => {
                        error(err)
                    });
            }
        })
    }

    return (
        <>
            <div>
                <div className={styles.list_top}>
                    <input
                        type="text"
                        value={videoUrl}
                        placeholder="url을 입력하면 재생목록에 추가됩니다."
                        onChange={onChange}
                    />
                    <button onClick={() => addUrlList()}>추가</button>
                </div>
                <div className={styles.list_div}>
                    {list.length > 0 ?
                        (list).map((prop: ListProp) => (
                            <div className={styles.prop_div}>
                                <div
                                    className={styles.list_url}
                                    style={{ backgroundImage: `url(${prop.thumbnailUrl})` }}
                                    onClick={() => handleTitleClick(prop.videoUrl)}
                                ></div>
                                <div className={styles.title_div}>
                                    <p>{prop.title}</p>
                                    <p>{prop.channelTitle}</p>
                                </div>
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    size='2x'
                                    className={styles.trash}
                                    onClick={() => deleteList(prop.videoId)} />
                            </div>
                        )) :
                        (
                            <div className={styles.list_div}>
                                <p>재생 목록이 비어있어요!</p>
                            </div>
                        )}
                </div>
            </div>
        </>
    )
}