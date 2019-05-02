import React, {useState} from 'react';

export default function BookImgUri({onBookImgChange, bookUri, setGlobalError, forceCheck}) {
    const [error, setError] = useState(false);

    const urlCheck = (url) => {
        const error = !url.match(/^http[s]?:\/\/.+\/.*\.(png|jpg|jpeg|gif)$/);
        setGlobalError(error);
        return error;
    };

    if (forceCheck && error !== urlCheck(bookUri)) {
        setError(urlCheck(bookUri));
    }

    return (
        <p>
            <label form="bookImg">Background Image URL</label>
            <input
                className={error ? 'error' : ''}
                id="bookImg"
                type="text" value={bookUri}
                onChange={(el) => {
                    setError(urlCheck(el.target.value));
                    onBookImgChange(el);
                }}
                placeholder="e.g.: http://www.somehost.com/logo.png"/>
        </p>
    );
};