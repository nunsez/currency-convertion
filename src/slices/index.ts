import dailyReducer from './daily';
import ratesReducer from './rates';

const rootReducer = {
    dailyInfo: dailyReducer,
    ratesInfo: ratesReducer,
}

export default rootReducer;
