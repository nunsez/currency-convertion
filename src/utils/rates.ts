import axios from "axios";

import { IDaily, IRates } from "../interfaces";

const dailyURL = 'https://www.cbr-xml-daily.ru/daily_json.js';

const ratesURL = 'https://www.cbr-xml-daily.ru/latest.js';

const URLMap: { [key: string]: string } = {
    daily: dailyURL,
    rates: ratesURL,
};

const getData = async (opt: string) => {
    const response = await axios.get(URLMap[opt]);

    return response.data;
};

const getRates = (): Promise<IRates> => getData('rates');

const getDaily = (): Promise<IDaily> => getData('daily');


export { getRates, getDaily };
