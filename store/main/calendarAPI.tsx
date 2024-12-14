import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../util/axiosInstance';

const initialState = {
    schedulers: [],
    scheduler: null,
    loading: false,
    error: null as string | null | undefined,
};

const token = window.localStorage.getItem('token');

const calendarAPI = createSlice({
    name: 'calendarAPI',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // makeCalendarAPI
        builder
            .addCase(makeCalendarAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(makeCalendarAPI.fulfilled, (state, action) => {
                state.scheduler = action.payload;
                state.loading = false;
            })
            .addCase(makeCalendarAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        // getCalendarAPI
        builder
            .addCase(getCalendarAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCalendarAPI.fulfilled, (state, action) => {
                state.schedulers = action.payload;
                state.loading = false;
            })
            .addCase(getCalendarAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        // deleteCalendarAPI
        builder
            .addCase(deleteCalendarAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCalendarAPI.fulfilled, (state, action) => {
                state.scheduler = action.payload;
                state.loading = false;
            })
            .addCase(deleteCalendarAPI.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});

export const makeCalendarAPI = createAsyncThunk(
    '/calendar',
    async (calendarDTO: { userId: string; title: string; startDay: string; endDay: string; }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance(token!).post('/calendar', calendarDTO);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || { message: "알 수 없는 오류가 발생했습니다.", status: 500 });
        }
    }
);

export const getCalendarAPI = createAsyncThunk(
    '/calendar/{userId}',
    async (userId: string) => {
        if (token) {
            const response = await axiosInstance(token!).get(`/calendar/${userId}`);
            return response.data;
        }
    }
);

export const deleteCalendarAPI = createAsyncThunk(
    '/calendar/deleteCalendar',
    async (calendar_id: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance(token!).delete(`/calendar/${calendar_id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || { message: "알 수 없는 오류가 발생했습니다.", status: 500 });
        }
    }
);

export default calendarAPI.reducer;
