import { IDaily } from "../interfaces";

export const valutesSelector = (state: any): IDaily['Valute'] | {} => state.dailyInfo.Valute;

export const dailyTimestampSelector = (state: any): IDaily['Timestamp'] => state.dailyInfo.Timestamp;
