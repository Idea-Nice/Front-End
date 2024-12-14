import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../util/axiosInstance';

const initialState = {
    user: null,
    loading: false,
    error: null as string | null | undefined,
};

const token = window.localStorage.getItem('token');

const userAPI = createSlice({
    name: 'userAPI',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // putUser
        builder
            .addCase(putUserAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(putUserAPI.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(putUserAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        // deleteUser
        builder
            .addCase(deleteUserAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUserAPI.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(deleteUserAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});

export const putUserAPI = createAsyncThunk(
    'putUserAPI',
    async (userDTO: { userId: string; userPw: string; userName: string; }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance(token!).put('/user', userDTO);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || { message: "알 수 없는 오류가 발생했습니다.", status: 500 });
        }
    }
);

export const deleteUserAPI = createAsyncThunk(
    'deleteUserAPI',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance(token!).delete(`/user/${userId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || { message: "알 수 없는 오류가 발생했습니다.", status: 500 });
        }
    }
);

export default userAPI.reducer;
