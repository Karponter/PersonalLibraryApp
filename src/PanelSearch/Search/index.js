import React from 'react';

export default function Search({onSearchChange}) {
    return (
        <p className="inputFiled">
            <label htmlFor="search">Search</label>
            <input id="search" onChange={onSearchChange} type="text"/>
        </p>
    );
};