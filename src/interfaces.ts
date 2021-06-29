export interface IValute {
    CharCode: string;
    ID?: string;
    Name: string;
    Nominal: number;
    NumCode?: string;
    Previous: number;
    Value: number;
}

export interface IRates {
    Date: string;
    PreviousDate: string;
    PreviousURL: string;
    Timestamp: string;
    Valute: {
        [key: string]: IValute;
    }
}
