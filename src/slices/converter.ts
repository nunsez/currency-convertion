import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IConverter } from "../interfaces";
import { getRates } from "../utils/rates";
import converter from "../utils/converter";

const fetchRates = createAsyncThunk('ratesInfo/fetchRates', async () => {
    const rates = await getRates();

    return rates;
})

const initialState: IConverter = {
    amount: '0',
    from: 'RUB',
    to: 'USD',
    result: '0',
    base: '',
    rates: {},
};

const converterInfo = createSlice({
    name: 'converterInfo',
    initialState,
    reducers: {
        setValue: (state, { payload }) => {
            const { name, value } = payload;
            state[name] = value;

            state.result = converter.amount(state.amount).from(state.from).to(state.to).convert();
            console.log(state.result);
        },
        swapCurrencies: (state) => {
            const { from, to } = state;

            state.from = to;
            state.to = from;
            state.result = converter.amount(state.amount).convert({ from: state.from, to: state.to });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRates.fulfilled, (state, { payload }) => {
            const { base } = payload;

            Object.keys(payload).forEach((key) => state[key] = payload[key]);
            state.rates[base] = 1;

            converter.setRates({ base, rates: state.rates });
        });
    },
});

const { reducer } = converterInfo;

const actions = { ...converterInfo.actions, fetchRates };

export { actions };

export default reducer;
