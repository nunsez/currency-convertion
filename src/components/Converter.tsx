import React, { SyntheticEvent, useEffect } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchRates } from "../slices/rates";
import * as selectors from '../selectors';
import { IConverter, IRates } from '../interfaces';
import { actions as converterActions } from "../slices/converter";

import reversePic from '../assets/reverse.png';
import { useState } from "react";

const getOptionsForValuteSelect = (rates: IRates['rates']) => {
    const valutes = Object.keys(rates);

    return valutes.map((valute) => <option key={valute}>{valute}</option>);
};

interface IProps {
    rates: IRates;
    onChange: (e: any) => void;
    onSwap: () => void;
}

const ConverterForm = ({ rates, onChange, onSwap }: IProps) => {
    const [result, setResult] = useState('0');
    const values = useSelector(selectors.getConverterValues);

    const convert = ({ amount, from, to }: IConverter) => {
        let value: string | number = amount;
        value = amount.replaceAll(/[^0-9]/g, '');
        value = Number(value);

        const a = from === rates.base ? 1 : rates.rates[from];
        const b = to === rates.base ? 1 : rates.rates[to];
        const answer = (b / a) * value;

        return answer.toFixed(2);
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        setResult(convert(values));
    };

    return (
        <>
            <Form noValidate onSubmit={handleSubmit} className="d-flex justify-content-between">
                <Form.Group className="mx-2 w-25">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type="number"
                        name="amount"
                        value={values.amount}
                        onChange={onChange}
                    />
                </Form.Group>

                <Form.Group className="mx-2 w-25">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                        as="select"
                        value={values.from}
                        onChange={onChange}
                        name="from"
                    >
                        {getOptionsForValuteSelect(rates.rates)}
                    </Form.Control>
                </Form.Group>

                <Button
                    type="button"
                    variant="outline-info"
                    onClick={(e) => {
                        onSwap();
                        handleSubmit(e);
                    }}
                    className="mt-auto"
                >
                    <Image
                        src={reversePic}
                        alt="reverse"
                        width={20}
                        height={20}
                    />
                </Button>

                <Form.Group className="mx-2 w-25">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                        as="select"
                        name="to"
                        value={values.to}
                        onChange={onChange}
                    >
                        {getOptionsForValuteSelect(rates.rates)}
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="info" className="mt-auto">Convert</Button>
            </Form>

            <div className="mt-5">
                <p>{result !== '0' && `${values.amount} ${values.from} = ${result} ${values.to}`}</p>
            </div>
        </>
    );
};

const Converter = () => {
    const dispatch = useDispatch();

    const rates = useSelector(selectors.ratesSelector);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        dispatch(converterActions.setConverterValue({ name, value }));
    };

    const handleSwapCurrencies = () => {
        dispatch(converterActions.swapConverterCurrencies());
    };

    useEffect(() => {
        dispatch(fetchRates());
    }, []);

    return (
        <React.Fragment>
            <h1 className="text-center">Converter Page</h1>
            <ConverterForm rates={rates} onChange={handleChange} onSwap={handleSwapCurrencies} />
        </React.Fragment>
    );
};

export default Converter;
