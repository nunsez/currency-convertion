import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDaily } from "../interfaces";
import { getDaily } from "../utils/rates";

const fetchDaily = createAsyncThunk('dailyInfo/fetchDaily', async () => {
    const daily = await getDaily();

    return daily;
});

const initialState: IDaily = {
    Date: '',
    PreviousDate: '',
    PreviousURL: '',
    Timestamp: '',
    Valute: {},
};

const dailySlice = createSlice({
    name: 'dailyInfo',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDaily.fulfilled, (state, { payload }) => {
            Object.keys(payload).forEach((key) => state[key] = payload[key]);
        })
    },
});

const { actions, reducer } = dailySlice;

export { actions, fetchDaily };

export default reducer;
