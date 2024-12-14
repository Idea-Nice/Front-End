"use client";

import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import { toggleIsSign } from '../../../../store/sign/signSwitch';
import styles from '../../../../styles/login/signUp.module.css';
import { idCheckAPI, signUpAPI } from '../../../../store/sign/signAPI';
import Swal from 'sweetalert2';
import { response } from '../../../../util/response';
import { error } from '../../../../util/error';
import { alertTitle } from '../../../../util/alert';

export default function SignUp() {

    const dispatch = useDispatch<AppDispatch>();
    const isSign = useSelector(
        (state: RootState) => state.signSwitch
    );

    const [userIdValue, setUserIdValue] = useState<string>('');
    const [userPwValue, setUserPwValue] = useState<string>('');
    const [userNameValue, setUserNameValue] = useState<string>('');

    const [clearId, setClearId] = useState(false);
    const [idFocused, setIdFocused] = useState(false);
    const [pwFocused, setPwFocused] = useState(false);
    const [nameFocused, setNameFocused] = useState(false);

    const userIdRef = useRef<HTMLInputElement | null>(null);
    const userPwRef = useRef<HTMLInputElement | null>(null);
    const userNameRef = useRef<HTMLInputElement | null>(null);

    const idCheck = () => {
        if (userIdValue) {
            dispatch(idCheckAPI(userIdValue))
                .unwrap()
                .then((reslut) => {
                    response(reslut);
                    Swal.fire({
                        text: "해당 아이디를 사용하시겠어요?",
                        showCancelButton: true,
                        confirmButtonText: "네",
                        cancelButtonText: "아뇨"
                    }).then(click => {
                        if (click.isConfirmed) {
                            setClearId(true);
                        }else{
                            setClearId(false);
                        }
                    })
                })
                .catch((err) => {
                    error(err);
                    setClearId(false);
                })
        } else {
            alertTitle("아이디를 입력해주세요");
        }
    }

    const signUp = () => {
        if (!clearId) {
            alertTitle("아이디 체크를 진행하세요")
        } else if (!userPwValue) {
            alertTitle("비밀번호를 입력해주세요")
        } else if (!userNameValue) {
            alertTitle("닉네임을 입력해주세요")
        } else {
            dispatch(signUpAPI({ userId: userIdValue, userPw: userPwValue, userName: userNameValue }))
                .unwrap()
                .then((reslut) => {
                    response(reslut);
                })
                .catch((err) => {
                    error(err);
                })
        }
    }

    if (isSign.isSign === false) return null;

    return (
        <>
            <div className={styles.main_div}>
                <div className={styles.title_div}>
                    <p>회원가입</p>
                </div>
                <button className={styles.userId_check} onClick={() => idCheck()}>아이디 중복 확인</button>
                <div className={styles.userId_div}>
                    <label
                        className={idFocused || userIdValue !== '' ? `${styles.focusedLabel_user_id}` : `${styles.normalLabel_user_id}`}
                        onClick={() => userIdRef.current?.focus()}
                    >아이디
                    </label>
                    <input
                        type='tesx'
                        name='user_id'
                        id='user_id'
                        onBlur={() => setIdFocused(false)}
                        onFocus={() => setIdFocused(true)}
                        className={idFocused || userIdValue !== '' ? `${styles.focusedInput_user_id}` : `${styles.normalInput_user_id}`}
                        ref={userIdRef}
                        value={userIdValue}
                        onChange={(e) => setUserIdValue(e.target.value)}
                        disabled={clearId}
                    ></input>
                </div>
                <div className={styles.userPw_div}>
                    <label
                        className={pwFocused || userPwValue !== '' ? `${styles.focusedLabel_user_pw}` : `${styles.normalLabel_user_pw}`}
                        onClick={() => userPwRef.current?.focus()}
                    >비밀번호
                    </label>
                    <input type="password"
                        name='user_pw'
                        id='user_pw'
                        onBlur={() => setPwFocused(false)}
                        onFocus={() => setPwFocused(true)}
                        className={pwFocused || userPwValue !== '' ? `${styles.focusedInput_user_pw}` : `${styles.normalInput_user_pw}`}
                        ref={userPwRef}
                        value={userPwValue}
                        onChange={(e) => setUserPwValue(e.target.value)}
                    />
                </div>
                <div className={styles.userName_div}>
                    <label
                        className={nameFocused || userNameValue !== '' ? `${styles.focusedLabel_user_name}` : `${styles.normalLabel_user_name}`}
                        onClick={() => userNameRef.current?.focus()}
                    >닉네임
                    </label>
                    <input type="text"
                        name='user_name'
                        id='user_name'
                        onBlur={() => setNameFocused(false)}
                        onFocus={() => setNameFocused(true)}
                        className={nameFocused || userNameValue !== '' ? `${styles.focusedInput_user_name}` : `${styles.normalInput_user_name}`}
                        ref={userNameRef}
                        value={userNameValue}
                        onChange={(e) => setUserNameValue(e.target.value)}
                    />
                </div>
                <button className={styles.signup_button}
                    onClick={() => signUp()}
                >회원가입
                </button>
                <div className={styles.signin_div}>
                    <p>아이디가 있으신가요?</p>
                    <button
                        className={styles.signin_button}
                        onClick={() => dispatch(toggleIsSign())}
                    >로그인
                    </button>
                </div>
            </div >
        </>
    )
}