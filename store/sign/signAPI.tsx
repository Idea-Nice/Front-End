import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signAxiosInstance } from '../../util/signAxiosInstance';

const initialState = {
    user: null,
    loading: false,
    error: null as string | null | undefined,
    idCheckStatus: null
};

const signAPI = createSlice({
    name: 'signAPI',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // idCheck
        builder
            .addCase(idCheckAPI.pending, (state) => {
                state.loading = true;
                state.idCheckStatus = null;
            })
            .addCase(idCheckAPI.fulfilled, (state, action) => {
                state.idCheckStatus = action.payload;
                state.loading = false;
            })
            .addCase(idCheckAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        // signUp
        builder
            .addCase(signUpAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUpAPI.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(signUpAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        // signIn
        builder
            .addCase(signInAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signInAPI.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(signInAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});

export const idCheckAPI = createAsyncThunk(
    'sign/idCheckAPI',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await signAxiosInstance().post(`/user/idCheck?userId=${userId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || { message: "알 수 없는 오류가 발생했습니다.", status: 500 });
        }
    }
);

export const signUpAPI = createAsyncThunk(
    'sign/signUpAPI',
    async (userDTO: { userId: string; userPw: string; userName: string; }, { rejectWithValue }) => {
        try {
            const response = await signAxiosInstance().post('/user/Signup', userDTO);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || { message: "알 수 없는 오류가 발생했습니다.", status: 500 });
        }
    }
);

export const signInAPI = createAsyncThunk(
    'sign/signInAPI',
    async (userDTO: { userId: string; userPw: string; }, { rejectWithValue }) => {
        try {
            const response = await signAxiosInstance().post('/login', userDTO);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || { message: "알 수 없는 오류가 발생했습니다.", status: 500 });
        }
    }
);

export default signAPI.reducer;
