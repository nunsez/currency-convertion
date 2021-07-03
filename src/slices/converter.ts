import { createSlice } from "@reduxjs/toolkit";
import { IConverter } from "../interfaces";

const initialState: IConverter = {
    amount: '0',
    from: 'RUB',
    to: 'USD',
    result: '0',
};

const converterInfo = createSlice({
    name: 'converterInfo',
    initialState,
    reducers: {
        setConverterValue: (state, { payload }) => {
            const { name, value } = payload;
            state[name] = value;
        },
        swapConverterCurrencies: (state) => {
            const { from, to } = state;
            state.from = to;
            state.to = from;
        },
    },
});

const { actions, reducer } = converterInfo;

export { actions };

export default reducer;
