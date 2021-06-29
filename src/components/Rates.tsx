import React, { useEffect, useState } from "react";
import getRates from "../utils/rates";

import { IRates } from '../interfaces';
import { Table } from "react-bootstrap";

interface IProps {
    valutes: IRates["Valute"];
}

const TableOfRates = ({ valutes }: IProps) => {
    const keys = Object.keys(valutes);

    return (
        <div className="d-flex flex-column">
            <Table striped>
                <thead>
                    <tr>
                        <th>Код</th>
                        <th>Ед.</th>
                        <th>Валюта</th>
                        <th>Курс</th>
                        <th>Изм.</th>
                    </tr>
                </thead>
                <tbody>
                    {keys.map((key) => {
                        const { CharCode, Nominal, Name, Value, Previous } = valutes[key];
                        const diff = (Value - Previous).toFixed(2);

                        return (
                            <tr key={CharCode}>
                                <td>{CharCode}</td>
                                <td className="text-end">{Nominal}</td>
                                <td>{Name}</td>
                                <td>{Value.toFixed(2)}</td>
                                <td>{diff}</td>
                            </tr>
                        );

                    })}
                </tbody>
            </Table>
        </div>
    );

    // return (
    //     <ul>
    //         {display.map((el) => {
    //             return <li key={el}>{el}</li>;
    //         })}
    //     </ul>
    // );
};

const Rates = () => {
    const defaultRates: IRates = {
        Date: '',
        PreviousDate: '',
        PreviousURL: '',
        Timestamp: '',
        Valute: {},
    };

    const [rates, setRates] = useState(defaultRates);

    const { Valute: valutes, Timestamp: dateStr } = rates;

    const date = new Date(dateStr);

    const valutesList = Object.keys(valutes).concat('RUB').sort();

    const getRatesHanle = async () => {
        const data = await getRates();
        setRates(data);
    };

    useEffect(() => {
        getRatesHanle();
    }, []);

    return (
        <React.Fragment>
            <h1>Rates Page</h1>
            <label htmlFor="select">Select your base valute: </label>
            <select id="select" defaultValue="RUB">
                {valutesList.map((val) => {
                    return <option key={val}>{val}</option>;
                })}
            </select>
            <p className="mt-2">Последнее обновление базы данных: {date.toLocaleString()}</p>
            <TableOfRates valutes={valutes} />
        </React.Fragment>
    );
};

export default Rates;
