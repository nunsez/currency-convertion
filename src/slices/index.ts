import dailyReducer from './daily';
import ratesReducer from './rates';
import converterReducer from './converter';

const rootReducer = {
    dailyInfo: dailyReducer,
    ratesInfo: ratesReducer,
    converterInfo: converterReducer,
}

export default rootReducer;
