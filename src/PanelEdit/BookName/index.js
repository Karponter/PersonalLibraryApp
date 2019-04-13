import React from 'react';

export default function BookName({onBookNameChange, bookName}) {
    return (
        <p>
            <label form="bookName">Book Name</label>
            <input
                id="bookName"
                type="text" value={bookName}
                onChange={onBookNameChange}
                placeholder="e.g.: Alice in  wonderland"/>
        </p>
    );
};