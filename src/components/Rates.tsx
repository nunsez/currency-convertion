import React, { useEffect, useState } from "react";
import { getDaily } from "../utils/rates";

import { IDaily } from '../interfaces';
import { Table } from "react-bootstrap";

interface IProps {
    valutes: IDaily["Valute"];
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
};

const Rates = () => {
    const defaultDaily: IDaily = {
        Date: '',
        PreviousDate: '',
        PreviousURL: '',
        Timestamp: '',
        Valute: {},
    };

    const [daily, setDaily] = useState(defaultDaily);

    const { Valute: valutes, Timestamp: dateStr } = daily;

    const date = new Date(dateStr);

    const valutesList = Object.keys(valutes).concat('RUB').sort();

    const ratesHanle = async () => {
        const data: IDaily = await getDaily();
        setDaily(data);
    };

    useEffect(() => {
        ratesHanle();
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
