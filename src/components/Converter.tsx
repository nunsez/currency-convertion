import React, { useEffect } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from '../selectors';
import { IConverter, IRates } from '../interfaces';
import { actions as converterActions } from "../slices/converter";

import reversePic from '../assets/reverse.png';

const getOptionsForValuteSelect = (rates: IRates['rates']) => {
    const valutes = Object.keys(rates).sort();

    return valutes.map((valute) => <option key={valute}>{valute}</option>);
};

interface IProps {
    values: IConverter;
    onChange: (e: any) => void;
    onSwap: () => void;
}

const ConverterForm = ({ values, onChange, onSwap }: IProps) => {
    const { amount, from, to, result, rates } = values;

    return (
        <>
            <Form noValidate className="d-flex justify-content-between mt-3">
                <Form.Group className="mx-2 w-25">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type="text"
                        name="amount"
                        autoComplete="off"
                        value={amount}
                        onChange={onChange}
                    />
                </Form.Group>

                <Form.Group className="mx-2 w-25">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                        as="select"
                        value={from}
                        onChange={onChange}
                        name="from"
                    >
                        {getOptionsForValuteSelect(rates)}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mx-2 ">
                    <Form.Label hidden>Reverse</Form.Label>
                    <Button
                        type="button"
                        variant="outline-info"
                        onClick={onSwap}
                        className="d-block"
                        style={{marginTop: '2rem'}}
                    >
                        <Image
                            src={reversePic}
                            alt="reverse"
                            width={20}
                            height={20}
                        />
                    </Button>
                </Form.Group>

                <Form.Group className="mx-2 w-25">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                        as="select"
                        name="to"
                        value={to}
                        onChange={onChange}
                    >
                        {getOptionsForValuteSelect(rates)}
                    </Form.Control>
                </Form.Group>
            </Form>

            <div className="mt-5">
                <p>{result !== '0' && `${amount} ${from} = ${result} ${to}`}</p>
            </div>
        </>
    );
};

const Converter = () => {
    const dispatch = useDispatch();

    const values = useSelector(selectors.getConverterValues);

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
            <h1 className="text-center mb-2">Converter Page</h1>
            <ConverterForm values={values} onChange={handleChange} onSwap={handleSwapCurrencies} />
        </React.Fragment>
    );
};

export default Converter;
