import { configureStore } from '@reduxjs/toolkit';
import signSwitch from './sign/signSwitch';
import signAPI from './sign/signAPI';
import userAPI from './main/userAPI';
import backgrounAPI from './main/backgrounAPI';
import asmrAPI from './main/asmrAPI';
import calendarAPI from './main/calendarAPI';
import todolistAPI from './main/todolistAPI';
import musicAPI from './music/musicAPI';

export const store = configureStore({
    reducer: {
        signSwitch: signSwitch,
        signAPI: signAPI,
        userAPI: userAPI,
        backgroundAPI: backgrounAPI,
        asmrAPI: asmrAPI,
        calendarAPI: calendarAPI,
        todolistAPI: todolistAPI,
        musicAPI: musicAPI
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
