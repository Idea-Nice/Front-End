"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { toggleIsSign } from '../../../../store/sign/signSwitch';
import styles from '../../../../styles/login/signIn.module.css';
import { signInAPI } from '../../../../store/sign/signAPI';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function SignIn() {

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [idValue, setIdValue] = useState<string>('');
    const [pwValue, setPwValue] = useState<string>('');
    const [idFocused, setIdFocused] = useState(false);
    const [pwFocused, setPwFocused] = useState(false);

    const idInputRef = useRef<HTMLInputElement | null>(null);
    const pwInputRef = useRef<HTMLInputElement | null>(null);


    const signIn = () => {
        dispatch(signInAPI({ userId: idValue, userPw: pwValue }))
            .unwrap()
            .then((response) => {
                console.log(response);
                Swal.fire({
                    title: response
                });
                window.localStorage.setItem('userId', response.data.userId);
                router.push('/main');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <div className={styles.main_div}>
                <div className={styles.title_div}>
                    <p>
                        로그인
                    </p>
                </div>
                <div className={styles.userId_div}>
                    <label
                        onClick={() => idInputRef.current?.focus()}
                        className={idFocused || idValue !== '' ? styles.focusedLabel_id : styles.normalLabel_id}
                    >
                        아이디
                    </label>
                    <input
                        type='text'
                        name='id'
                        id='id'
                        onBlur={() => setIdFocused(false)}
                        onFocus={() => setIdFocused(true)}
                        className={idFocused || idValue !== '' ? styles.focusedInput_id : styles.normalInput_id}
                        ref={idInputRef}
                        onChange={(e) => setIdValue(e.target.value)}
                    />
                </div>
                <div className={styles.userPw_div}>
                    <label
                        onClick={() => pwInputRef.current?.focus()}
                        className={pwFocused || pwValue !== '' ? styles.focusedLabel_pw : styles.normalLabel_pw}
                    >
                        비밀번호
                    </label>
                    <input
                        type='password'
                        name='pw'
                        id='pw'
                        onBlur={() => setPwFocused(false)}
                        onFocus={() => setPwFocused(true)}
                        className={pwFocused || pwValue !== '' ? styles.focusedInput_pw : styles.normalInput_pw}
                        ref={pwInputRef}
                        onChange={(e) => setPwValue(e.target.value)}
                    />
                </div>
                <button className={styles.signin_button} onClick={() => signIn()}>로그인</button>
                <div className={styles.signup_div}>
                    <p>
                        아이디가 없으신가요?
                    </p>
                    <button className={styles.signup_button} onClick={() => dispatch(toggleIsSign())}>회원 가입</button>
                </div>
            </div>
        </>
    )

}