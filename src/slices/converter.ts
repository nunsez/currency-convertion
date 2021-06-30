import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    amount: 0,
    from: 'RUB',
    to: '',
};

const converterInfo = createSlice({
    name: 'converterInfo',
    initialState,
    reducers: {
    },
});

const { actions, reducer } = converterInfo;

export { actions };

export default reducer;
