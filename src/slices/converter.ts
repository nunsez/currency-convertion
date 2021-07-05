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
            let result = value;

            switch (name) {
            case 'amount':
                result = value.match(/\d*\.?\d*/)[0]; // match only digits with dot
                result = result.replaceAll(/^0*(?<=.)/g, ''); // remove all zeros before dot
                result = result.startsWith('.') || result === '' ? `0${result}` : result; // add one zero before dot

                break;

            default:
                break;
            }

            state[name] = result;

            converter.amount(state.amount);

            state.result = converter.convert(state);
        },
        swapCurrencies: (state) => {
            const { from, to } = state;

            state.from = to;
            state.to = from;
            state.amount = state.result;

            converter.amount(state.amount);

            state.result = converter.convert(state);
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
