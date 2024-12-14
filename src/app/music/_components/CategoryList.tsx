import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../../../store/store";
import { ListProp } from "../_interface/MusicInterface";
import styles from '../../../../styles/music/music.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addListByUrlAPI, getUserListAPI } from "../../../../store/music/musicAPI";
import { response } from '../../../../util/response';
import { error } from '../../../../util/error';

export default function CategoryList() {

    const dispatch = useDispatch<AppDispatch>();
    const userId = window.localStorage.getItem('userId');
    const list = useSelector((state: RootState) => state.musicAPI.categoryList);

    const addUrlList = (videoUrl: any) => {
        const addUrlDTO = {
            userId: userId!,
            videoUrl: videoUrl!
        }
        dispatch(addListByUrlAPI(addUrlDTO))
            .unwrap()
            .then((result) => {
                response(result);
                dispatch(getUserListAPI(userId!));
            })
            .catch((err) => {
                error(err)
            });
    }

    return (
        <>
            <div className={styles.list_div}>
                {list.length > 0 ?
                    (list).map((prop: ListProp) => (
                        <div className={styles.prop_div}>
                            <div
                                className={styles.list_url}
                                style={{ backgroundImage: `url(${prop.thumbnailUrl})` }}
                            ></div>
                            <div className={styles.title_div}>
                                <p>{prop.title}</p>
                                <p>{prop.channelTitle}</p>
                            </div>
                            <FontAwesomeIcon
                                icon={faPlus}
                                size="2x"
                                className={styles.plus}
                                onClick={() => addUrlList(prop.videoUrl)}
                            />
                        </div>
                    )) :
                    (
                        <div className={styles.list_div}>
                            <p>영상 정보가 없어요!</p>
                        </div>
                    )
                }
            </div >
        </>
    )
}