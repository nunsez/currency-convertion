import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRates } from "../utils/rates";

const fetchRates = createAsyncThunk('ratesInfo/fetchRates', async () => {
    const rates = await getRates();

    return rates;
})

const ratesSlice = createSlice({
    name: 'ratesInfo',
    initialState: {},
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRates.fulfilled, (state, { payload }) => {
            state = payload;
        })
    },
});

const { actions, reducer } = ratesSlice;

export { actions };

export default reducer;
