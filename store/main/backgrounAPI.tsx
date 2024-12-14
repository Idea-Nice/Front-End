import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../util/axiosInstance';

const initialState = {
    backgrounds: [],
    background: null,
    loading: false,
    error: null as string | null | undefined,
};

const token = window.localStorage.getItem('token');

const backgroundAPI = createSlice({
    name: 'backgroundAPI',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // backgroundAllAPI
        builder
            .addCase(backgroundAllAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(backgroundAllAPI.fulfilled, (state, action) => {
                state.backgrounds = action.payload;
                state.loading = false;
            })
            .addCase(backgroundAllAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        // backgroundOwnedAPI
        builder
            .addCase(backgroundOwnedAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(backgroundOwnedAPI.fulfilled, (state, action) => {
                state.backgrounds = action.payload;
                state.loading = false;
            })
            .addCase(backgroundOwnedAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        // backgroundSetCurrentAPI
        builder
            .addCase(backgroundSetCurrentAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(backgroundSetCurrentAPI.fulfilled, (state, action) => {
                state.background = action.payload;
                state.loading = false;
            })
            .addCase(backgroundSetCurrentAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        // backgroundGetCurrentAPI
        builder
            .addCase(backgroundGetCurrentAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(backgroundGetCurrentAPI.fulfilled, (state, action) => {
                state.background = action.payload;
                state.loading = false;
            })
            .addCase(backgroundGetCurrentAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        // backgroundPurchaseAPI
        builder
            .addCase(backgroundPurchaseAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(backgroundPurchaseAPI.fulfilled, (state, action) => {
                state.background = action.payload;
                state.loading = false;
            })
            .addCase(backgroundPurchaseAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});

export const backgroundAllAPI = createAsyncThunk(
    '/background/all',
    async () => {
        const response = await axiosInstance(token!).get('/background/all');
        return response.data;
    }
);

export const backgroundOwnedAPI = createAsyncThunk(
    '/background/{userId}/owned',
    async (userId: string) => {
        const response = await axiosInstance(token!).get(`/background/${userId}/owned`);
        return response.data;
    }
);

export const backgroundSetCurrentAPI = createAsyncThunk(
    '/background/set-current/{backgroundId}',
    async (backgroundId: string) => {
        const response = await axiosInstance(token!).post(`/background/set-current/${backgroundId}`);
        return response.data;
    }
);

export const backgroundGetCurrentAPI = createAsyncThunk(
    '/background/{userId}/current',
    async (userId: string) => {
        const response = await axiosInstance(token!).get(`/background/${userId}/current`);
        return response.data;
    }
);

export const backgroundPurchaseAPI = createAsyncThunk(
    '/background/purchase',
    async (purchaseDTO: { userId: string; backgroundId: string; }) => {
        const response = await axiosInstance(token!).post(`/background/purchase`, purchaseDTO);
        return response.data;
    }
);

export default backgroundAPI.reducer;
