import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRates } from "../interfaces";
import { getRates } from "../utils/rates";

const fetchRates = createAsyncThunk('ratesInfo/fetchRates', async () => {
    const rates = await getRates();

    return rates;
})

const initialState: IRates = {
    base: '',
    rates: {},
};

const ratesSlice = createSlice({
    name: 'ratesInfo',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRates.fulfilled, (state, { payload }) => {
            const { base } = payload;

            Object.keys(payload).forEach((key) => state[key] = payload[key]);
            state.rates[base] = 1;
        })
    },
});

const { actions, reducer } = ratesSlice;

export { actions, fetchRates };

export default reducer;
