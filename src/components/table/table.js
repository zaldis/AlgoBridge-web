import React from 'react';
import PropType from 'prop-types';
import {Table as BootTable} from 'react-bootstrap';

const Table = ({headers, rows}) => {
    const headerCols = headers.map(([label, key]) => {
        return (
            <th key={label}>{label}</th>
        );
    });

    const rowsBody = rows.map((algo) => {
        const rowCols = headers.map(([colTitle, colKey]) => {
            return (<td key={colTitle}>{algo[colKey]}</td>);
        });

        return (
            <tr key={algo.id}>
                {rowCols}
            </tr>
        );
    });

    let table = (
        <BootTable striped bordered hover>
            <thead>
                <tr>
                    {headerCols}
                </tr>
            </thead>

            <tbody>
                {rowsBody}
            </tbody>
        </BootTable>
    );
    return (
        <div>
            {table}
        </div>
    );
};


Table.propTypes = {
    headers: PropType.arrayOf(PropType.string),
    rows: PropType.arrayOf(
        PropType.object    
    ),
};


export default Table;
