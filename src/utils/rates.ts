import axios from "axios";

import { IRates } from "../interfaces";

const ratesURL = 'https://www.cbr-xml-daily.ru/daily_json.js';

const getRates = async (): Promise<IRates> => {
    const response = await axios.get(ratesURL);

    return response.data;
};

export default getRates;
