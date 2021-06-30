import React, { useEffect } from 'react';
import { fetchDaily } from '../slices/daily';

import { IDaily } from '../interfaces';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../selectors';


interface IProps {
    valutes: IDaily['Valute'];
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
    const dispatch = useDispatch();
    const valutes = useSelector(selectors.valutesSelector);
    const timestamp = useSelector(selectors.dailyTimestampSelector);

    const date = new Date(timestamp);

    const valutesList = Object.keys(valutes).concat('RUB').sort();

    useEffect(() => {
        dispatch(fetchDaily());
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
