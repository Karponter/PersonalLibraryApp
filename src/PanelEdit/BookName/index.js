import React, {useState} from 'react';

export default function BookName({onBookNameChange, bookName, setGlobalError, forceCheck}) {
    const [error, setError] = useState(false);

    const nameCheck = (name) => {
        const error = !name;
        setGlobalError(error);
        return error;
    };

    if (forceCheck && error !== nameCheck(bookName)) {
        setError(nameCheck(bookName));
    }

    return (
        <p>
            <label form="bookName">Book Name</label>
            <input
                className={error ? 'error' : ''}
                id="bookName"
                type="text" value={bookName}
                onChange={(el) => {
                    setError(nameCheck(el.target.value));
                    onBookNameChange(el);
                }}
                placeholder="e.g.: Alice in  wonderland"/>
        </p>
    );
};