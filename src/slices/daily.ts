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

type Keys = keyof IDaily;

const dailySlice = createSlice({
    name: 'dailyInfo',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDaily.fulfilled, (state, { payload }) => {
            Object.entries(payload).forEach(([key, value]) => state[key as Keys] = value);
        })
    },
});

const { reducer } = dailySlice;

const actions = { ...dailySlice.actions, fetchDaily };

export { actions, fetchDaily };

export default reducer;
