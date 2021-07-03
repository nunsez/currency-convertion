import React, { SyntheticEvent, useEffect } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
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
    base: IConverter['base'];
    rates: IConverter['rates'];
    onChange: (e: any) => void;
    onSwap: () => void;
}

const ConverterForm = ({ base, rates, onChange, onSwap }: IProps) => {
    const [result, setResult] = useState('0');
    const values = useSelector(selectors.getConverterValues);

    const convert = ({ amount, from, to }: IConverter) => {
        let value: string | number = amount;
        value = amount.replaceAll(/[^0-9]/g, '');
        value = Number(value);

        const a = from === base ? 1 : rates[from];
        const b = to === base ? 1 : rates[to];
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
                        {getOptionsForValuteSelect(rates)}
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
                        {getOptionsForValuteSelect(rates)}
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

    const { rates, base } = useSelector(selectors.getConverterValues);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        dispatch(converterActions.setValue({ name, value }));
    };

    const handleSwapCurrencies = () => {
        dispatch(converterActions.swapCurrencies());
    };

    useEffect(() => {
        dispatch(converterActions.fetchRates());
    }, []);

    return (
        <React.Fragment>
            <h1 className="text-center">Converter Page</h1>
            <ConverterForm base={base} rates={rates} onChange={handleChange} onSwap={handleSwapCurrencies} />
        </React.Fragment>
    );
};

export default Converter;
