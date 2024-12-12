import React, { useState } from 'react';
import styles from '../../../../../styles/main/mypage.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store/store';
import { putUserAPI } from '../../../../../store/main/userAPI';
import Swal from 'sweetalert2';

export default function ModifyUser() {

    const dispatch = useDispatch<AppDispatch>();
    const userId = window.localStorage.getItem('userId');
    const [userPwValue, setUserPwValue] = useState<string>()
    const [userNameValue, setUserNameValue] = useState<string>()

    const onChangePw = (e: any) => {
        setUserPwValue(e.target.value);
    };

    const onChangeName = (e: any) => {
        setUserNameValue(e.target.value);
    };

    const putUser = (e: any) => {
        e.preventDefault();

        const userDTO = {
            userId: userId!,
            userPw: userPwValue!,
            userName: userNameValue!
        }

        if (userPwValue?.trim() === '' || userPwValue === undefined) {
            Swal.fire({
                title: "비밀번호를 입력해주세요"
            })
        } else if (userNameValue?.trim() === '' || userNameValue === undefined) {
            Swal.fire({
                title: "닉네임을 입력해주세요"
            })
        } else {
            dispatch(putUserAPI(userDTO))
                .unwrap()
                .then(() => {
                    Swal.fire({
                        title: "수정 완료"
                    })
                })
                .catch(error => {
                    if (error.response && error.response.status === 400) {
                        Swal.fire({
                            title: "오류가 발생하였습니다."
                        })
                    }
                });
        }
    }

    return (
        <div className={styles.modify_div} onClick={(e) => e.stopPropagation()}>
            <div className={styles.input_div}>
                <div className={styles.input_userId}>
                    <p className={styles.input_p}>아이디</p>
                    <input
                        type='text'
                        value={userId!}
                        disabled
                    />
                </div>
                <div className={styles.input_userPw}>
                    <p className={styles.input_p}>비밀번호</p>
                    <input
                        type='password'
                        onChange={onChangePw}
                    />
                </div>
                <div className={styles.input_userName}>
                    <p className={styles.input_p}>닉네임</p>
                    <input
                        type='text'
                        onChange={onChangeName}
                    />
                </div>
            </div>
            <div>
                <button className={styles.submit_btn} onClick={putUser}>수정</button>
            </div>
        </div>
    );
};