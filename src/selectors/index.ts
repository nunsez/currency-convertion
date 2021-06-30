import { IConverter, IDaily, IRates } from "../interfaces";
import { RootState } from '../store';

export const valutesSelector = (state: RootState): IDaily['Valute'] => state.dailyInfo.Valute;

export const dailyTimestampSelector = (state: RootState): IDaily['Timestamp'] => state.dailyInfo.Timestamp;

export const ratesSelector = (state: RootState): IRates => state.ratesInfo;

export const getConverterValues = (state: RootState): IConverter => state.converterInfo;
