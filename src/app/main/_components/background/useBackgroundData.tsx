import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store/store';
import { backgroundAllAPI, backgroundOwnedAPI } from '../../../../../store/main/backgrounAPI';
import { BackGround } from '../../_interface/MainInterface';

export const useBackgroundData = (isModalOpen: boolean) => {
    const userId = window.localStorage.getItem('userId');
    const dispatch = useDispatch<AppDispatch>();
    const [backgroundImgs, setBackgroundImgs] = useState<BackGround[]>([]);
    const [userBackgroundImgs, setUserBackgroundImgs] = useState<BackGround[]>([]);

    useEffect(() => {
        if (isModalOpen === true) {
            dispatch(backgroundAllAPI())
                .unwrap()
                .then((response) => setBackgroundImgs(response))
                .catch(console.error);

            dispatch(backgroundOwnedAPI(userId!))
                .unwrap()
                .then((response) => setUserBackgroundImgs(response))
                .catch(console.error);
        };
    }, [isModalOpen])

    return { backgroundImgs, userBackgroundImgs };
}