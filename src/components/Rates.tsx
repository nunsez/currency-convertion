import React, { useEffect } from 'react';
import { actions as dailyActions } from '../slices/daily';

import { IDaily } from '../interfaces';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../selectors';


const TableOfRates = ({ valutes }: { valutes: IDaily['Valute'] }) => {
    const keys = Object.keys(valutes);
    const headerList = ['Код', 'Ед.', 'Валюта', 'Курс', 'Изм.'];

    return (
        <div className="d-flex flex-column">
            <Table striped>
                <thead>
                    <tr>
                        {headerList.map((el) => <th key={el}>{el}</th>)}
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

    useEffect(() => {
        dispatch(dailyActions.fetchDaily());
    }, []);

    return (
        <div style={{ minWidth: '25rem' }}>
            <h1 className="text-center mb-2">Rates Page</h1>
            <p className="text-center mb-3">Последнее обновление базы данных: {date.toLocaleString()}</p>
            <TableOfRates valutes={valutes} />
        </div>
    );
};

export default Rates;
