interface IRates {
    [key: string]: number;
}

class Converter {
    static rates: IRates = {};
    static base = 'RUB';

    protected _amount: string
    protected _result: string
    protected fromCurrency: string
    protected toCurrency: string

    constructor(amount = '0', fromCurrency = Converter.base, toCurrency = Converter.base) {
        this._result = '0';
        this._amount = amount;
        this.fromCurrency = fromCurrency;
        this.toCurrency = toCurrency;

    }

    convert({ from, to }: any = {}) {
        const { _amount, fromCurrency, toCurrency } = this;
        const { rates } = Converter;

        const value = _amount.replaceAll(/[^0-9.]/g, '');
        const a = from ?? fromCurrency;
        const b = to ?? toCurrency;

        const result = (rates[b] / rates[a]) * Number(value);

        return this._result = result.toFixed(2);
    }

    setRates({ rates, base }: any) {
        Converter.base = base;
        Converter.rates = rates;
    }

    to(currency: string) {
        const { _amount, fromCurrency } = this;

        return new Converter(_amount, fromCurrency, currency);
    }

    get result() {
        return this._result;
    }

    from(currency: string) {
        const { _amount, toCurrency } = this;

        return new Converter(_amount, currency, toCurrency );
    }

    amount(value: string | number ) {
        const { fromCurrency, toCurrency } = this;
        const valueStr = typeof value === "number" ? String(value) : value;

        return new Converter(valueStr, fromCurrency, toCurrency );
    }
}

export default new Converter();
