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
    base: string;
    rates: {
        [key: string]: number;
    };
    [key: string]: string | IRates['rates'];
}

export interface IDaily {
    Date: string;
    PreviousDate: string;
    PreviousURL: string;
    Timestamp: string;
    Valute: {
        [key: string]: IValute;
    };
    [key: string]: string | IDaily['Valute'];
}

export interface IConverter {
    amount: string;
    from: string;
    to: string;
    [key: string]: string;
}
