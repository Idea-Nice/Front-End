import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../util/axiosInstance';
import { ListProp } from '@/app/music/_interface/MusicInterface';

const initialState = {
    userList: [] as ListProp[],
    categoryList: [] as ListProp[],
    loading: false,
    error: null as string | null | undefined,
};

const token = window.localStorage.getItem('token');

const musicAPI = createSlice({
    name: 'musicAPI',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getUserList
        builder
            .addCase(getUserListAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserListAPI.fulfilled, (state, action) => {
                state.userList = action.payload;
                state.loading = false;
            })
            .addCase(getUserListAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        // getCategory
        builder
            .addCase(getCategoryAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategoryAPI.fulfilled, (state, action) => {
                state.categoryList = action.payload;
                state.loading = false;
            })
            .addCase(getCategoryAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        // addListByCategory
        builder
            .addCase(addListByCategoryAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addListByCategoryAPI.fulfilled, (state, action) => {
                state.userList = action.payload;
                state.loading = false;
            })
            .addCase(addListByCategoryAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        // addListByUrl
        builder
            .addCase(addListByUrlAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addListByUrlAPI.fulfilled, (state, action) => {
                state.userList = action.payload;
                state.loading = false;
            })
            .addCase(addListByUrlAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        // addListByAi
        builder
            .addCase(addListByAiAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addListByAiAPI.fulfilled, (state, action) => {
                state.userList = action.payload;
                state.loading = false;
            })
            .addCase(addListByAiAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        // deleteList
        builder
            .addCase(deleteListAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteListAPI.fulfilled, (state, action) => {
                state.userList = action.payload;
                state.loading = false;
            })
            .addCase(deleteListAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});

export const getUserListAPI = createAsyncThunk(
    'getUserListAPI',
    async (userId: string) => {
        const response = await axiosInstance(token!).get(`/playlist/${userId}`);
        return response.data;
    }
);

export const getCategoryAPI = createAsyncThunk(
    'getCategoryAPI',
    async (keyword: string) => {
        const response = await axiosInstance(token!).get(`/api/youtube/search/${keyword}`);
        return response.data;
    }
);

export const addListByCategoryAPI = createAsyncThunk(
    'addListByCategoryAPI',
    async (categoryDTO: { userId: string; keywordOrGenre: string; }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance(token!).post(`/playlist/add-genre`, categoryDTO);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || { message: "알 수 없는 오류가 발생했습니다.", status: 500 });
        }
    }
);

export const addListByUrlAPI = createAsyncThunk(
    'addListByUrlAPI',
    async (addUrlDTO: { userId: string; videoUrl: string; }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance(token!).post(`/playlist/add-url`, addUrlDTO);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || { message: "알 수 없는 오류가 발생했습니다.", status: 500 });
        }
    }
);

export const addListByAiAPI = createAsyncThunk(
    'addListByAiAPI',
    async (addAIDTO: { userId: string; keywordOrGenre: string; }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance(token!).post(`/playlist/add-ai`, addAIDTO);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || { message: "알 수 없는 오류가 발생했습니다.", status: 500 });
        }
    }
);

export const deleteListAPI = createAsyncThunk(
    'deleteListAPI',
    async (deleteListDTO: { userId: string; videoId: string; }) => {
        const response = await axiosInstance(token!).delete(`/playlist/remove`, {
            data: deleteListDTO
        });
        return response.data;
    }
);

export default musicAPI.reducer;
