import React, { useEffect, useState } from "react";
import fx from 'money';
import { Form } from "react-bootstrap";
import { getRates } from "../utils/rates";
import { IRates } from "../interfaces";

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
                <Form.Control as="select" />
            </Form.Group>

            <Form.Group className="mx-2 w-25">
                <Form.Label>To</Form.Label>
                <Form.Control as="select" />
            </Form.Group>
            <button onClick={convertHandle}>press me</button>
        </Form>
    );
};

const Converter = () => {
    const defaultRates: IRates = { base: 'RUB', rates: {} };
    const [rates, setRates] = useState(defaultRates);


    const ratesHandle = async () => {
        const data: IRates = await getRates();
        setRates(data);
    };

    useEffect(() => {
        ratesHandle();
    }, []);

    return (
        <React.Fragment>
            <h1 className="text-center">Converter Page</h1>
            <ConverterForm rates={rates} />
        </React.Fragment>
    );
};

export default Converter;
