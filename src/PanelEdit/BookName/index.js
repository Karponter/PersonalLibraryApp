import React from 'react';

export default function BookName({onBookNameChange, bookName}) {
    const nameCheck = (name) => {
        return name;
    };

    return (
        <p>
            <label form="bookName">Book Name</label>
            <input
                className={nameCheck(bookName) ? '' : 'error'}
                id="bookName"
                type="text" value={bookName}
                onChange={onBookNameChange}
                placeholder="e.g.: Alice in  wonderland"/>
        </p>
    );
};