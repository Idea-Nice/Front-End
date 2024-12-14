import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSign: false
};

const signSwitch = createSlice({
    name: 'signSwitch',
    initialState,
    reducers: {
        toggleIsSign: (state) => {
            state.isSign = !state.isSign;
        }
    }
});

export const {
    toggleIsSign
} = signSwitch.actions;

export default signSwitch.reducer;
