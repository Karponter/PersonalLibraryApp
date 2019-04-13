import React from 'react';
import './style.css';

export default function Pagination({onPaginationChange, pagination}) {
    const paginationValues = [6, 9, 12, 18, 36];
    return (
        <p className="inputFiled">
            <label htmlFor="pagination">Pagination</label>
            <select id="pagination" value={pagination} onChange={onPaginationChange}>
                {paginationValues.map((value, index) => <option key={index}>{value}</option>)}
            </select>
        </p>
    );
}
