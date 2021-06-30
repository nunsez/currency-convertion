import React, { useEffect } from "react";
import fx from 'money';
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchRates } from "../slices/rates";
import * as selectors from '../selectors';
import { IRates } from '../interfaces';

const getOptionsForValuteSelect = (rates: IRates['rates']) => {
    const valutes = Object.keys(rates);

    return valutes.map((valute) => <option key={valute}>{valute}</option>);
};

const ConverterForm = ({ rates }: { rates: IRates }) => {
    fx.base = rates.base;
    fx.rates = rates.rates;

    const convertHandle = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const result = fx(16288).from("USD").to("GBP");
        console.log(result);
    };

    return (
        <Form className="d-flex justify-content-between">
            <Form.Group className="mx-2 w-25">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Group className="mx-2 w-25">
                <Form.Label>From</Form.Label>
                <Form.Control as="select">
                    {getOptionsForValuteSelect(rates.rates)}
                </Form.Control>
            </Form.Group>

            <Form.Group className="mx-2 w-25">
                <Form.Label>To</Form.Label>
                <Form.Control as="select">
                    {getOptionsForValuteSelect(rates.rates)}
                </Form.Control>
            </Form.Group>
            <button onClick={convertHandle}>press me</button>
        </Form>
    );
};

const Converter = () => {
    const dispatch = useDispatch();

    const rates = useSelector(selectors.ratesSelector);
    console.log(rates);
    //const base = useSelector(selectors.baseSelector);

    useEffect(() => {
        dispatch(fetchRates());
    }, []);

    return (
        <React.Fragment>
            <h1 className="text-center">Converter Page</h1>
            <ConverterForm rates={rates} />
        </React.Fragment>
    );
};

export default Converter;
