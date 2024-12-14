import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../util/axiosInstance';

const initialState = {
    asmrs: [],
    asmr: null,
    loading: false,
    error: null as string | null | undefined,
};

const token = window.localStorage.getItem('token');

const asmrAPI = createSlice({
    name: 'asmrAPI',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // asmrAllAPI
        builder
            .addCase(asmrAllAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(asmrAllAPI.fulfilled, (state, action) => {
                state.asmrs = action.payload;
                state.loading = false;
            })
            .addCase(asmrAllAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        // asmrOwnedAPI
        builder
            .addCase(asmrOwnedAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(asmrOwnedAPI.fulfilled, (state, action) => {
                state.asmrs = action.payload;
                state.loading = false;
            })
            .addCase(asmrOwnedAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        // asmrPurchaseAPI
        builder
            .addCase(asmrPurchaseAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(asmrPurchaseAPI.fulfilled, (state, action) => {
                state.asmr = action.payload;
                state.loading = false;
            })
            .addCase(asmrPurchaseAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});

export const asmrAllAPI = createAsyncThunk(
    '/asmr/all',
    async () => {
        const response = await axiosInstance(token!).get('/asmr/all');
        return response.data;
    }
);

export const asmrOwnedAPI = createAsyncThunk(
    '/asmr/{userId}/owned',
    async (userId: string) => {
        const response = await axiosInstance(token!).get(`/asmr/${userId}/owned`);
        return response.data;
    }
);

export const asmrPurchaseAPI = createAsyncThunk(
    '/asmr/purchase',
    async (purchaseDTO: { userId: string; asmrFileName: string; }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance(token!).post(`/asmr/purchase`, purchaseDTO);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || { message: "알 수 없는 오류가 발생했습니다.", status: 500 });
        }
    }
);

export default asmrAPI.reducer;
