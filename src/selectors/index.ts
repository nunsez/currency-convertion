import { IDaily, IRates } from "../interfaces";

export const valutesSelector = (state: any): IDaily['Valute'] => state.dailyInfo.Valute;

export const dailyTimestampSelector = (state: any): IDaily['Timestamp'] => state.dailyInfo.Timestamp;

export const ratesSelector = (state: any): IRates => state.ratesInfo;
