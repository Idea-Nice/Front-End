import React from 'react';
import SignIn from './_components/SignIn';
import SignUp from './_components/SignUp';
import styles from '../../../styles/login/login.module.css';

export default function Login(){

    return(
        <>
        {/* 기본 backgorund */}
            <div className={styles.body}>
                {/* 장식용 배경 div */}
                <div className={styles.back_div}></div>
                <SignIn />
                <SignUp />
            </div>
        </>
    )

}