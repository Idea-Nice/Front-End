import { useDispatch } from 'react-redux';
import styles from '../../../../styles/music/music.module.css';
import { AppDispatch } from '../../../../store/store';
import { useState } from 'react';
import { addListByAiAPI } from '../../../../store/music/musicAPI';
import { response } from '../../../../util/response';
import { error } from '../../../../util/error';
import { alertTitle } from '../../../../util/alert';

export default function AiInput() {

    const dispatch = useDispatch<AppDispatch>();
    const userId = window.localStorage.getItem('userId');

    const [keywordOrGenre, setKeywordOrGenre] = useState('');

    const onChange = (e: any) => {
        setKeywordOrGenre(e.target.value);
    };

    const addAIList = () => {
        const addAIDTO = {
            userId: userId!,
            keywordOrGenre: keywordOrGenre
        }
        if (keywordOrGenre) {
            dispatch(addListByAiAPI(addAIDTO))
                .unwrap()
                .then((result) => {
                    response(result);
                    setKeywordOrGenre('');
                })
                .catch(err => {
                    error(err);
                });
        } else {
            alertTitle("빈 칸은 작성이 안됩니다.");
        }
    }

    return (
        <>
            <div className={styles.ai_input_div}>
                <p>AI가 재생 목록을 추천해줘요!</p>
                <div className={styles.ai_input_form}>
                    <input
                        type="text"
                        value={keywordOrGenre}
                        placeholder='어떤 음악을 추천해드릴까요?'
                        onChange={onChange}
                    />
                    <button onClick={() => addAIList()}>추천받기</button>
                </div>
            </div>
        </>
    )
}