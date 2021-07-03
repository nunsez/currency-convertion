import dailyReducer from './daily';
import converterReducer from './converter';

const rootReducer = {
    dailyInfo: dailyReducer,
    converterInfo: converterReducer,
}

export default rootReducer;
