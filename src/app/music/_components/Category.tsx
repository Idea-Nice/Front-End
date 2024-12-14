import { useState } from 'react';
import styles from '../../../../styles/music/music.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { getCategoryAPI } from '../../../../store/music/musicAPI';
import { alertTitle } from '../../../../util/alert';

export default function Category() {

    const dispatch = useDispatch<AppDispatch>();
    const [view, setView] = useState<boolean>(false);

    const selectLofi = () => {
        dispatch(getCategoryAPI("lofi"))
            .then(() => {
                alertTitle("추가 완료");
            })
    }

    const selectPiano = () => {
        dispatch(getCategoryAPI("piano"))
            .then(() => {
                alertTitle("추가 완료");
            })
    }

    return (
        <>
            <div
                className={styles.category_div}
                onClick={() => { setView(!view) }}
            >
                <p>장르별 보기</p>
            </div>
            {view ? (
                <>
                    <div
                        className={styles.lofi_div}
                        onClick={() => selectLofi()}
                    >
                        <p>lofi</p>
                    </div>
                    <div
                        className={styles.piano_div}
                        onClick={() => selectPiano()}
                    >
                        <p>piano</p>
                    </div>
                </>
            ) : null
            }
        </>
    )
}