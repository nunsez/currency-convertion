import React, { SyntheticEvent, useEffect } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from '../selectors';
import { IConverter, IRates } from '../interfaces';
import { actions as converterActions } from "../slices/converter";

import reversePic from '../assets/reverse.png';

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
    const values = useSelector(selectors.getConverterValues);

    return (
        <>
            <Form noValidate className="d-flex justify-content-between">
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
            </Form>

            <div className="mt-5">
                <p>{values.result !== '0' && `${values.amount} ${values.from} = ${values.result} ${values.to}`}</p>
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
