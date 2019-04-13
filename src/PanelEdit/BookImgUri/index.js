import React from 'react';

export default function BookImgUri({onBookImgChange, bookUri}) {
    const urlCheck = (url) => {
        return url.match(/^http[s]?:\/\/.+\/.*\.(png|jpg|jpeg|gif)$/);
    };

    return (
        <p>
            <label form="bookImg">Background Image URL</label>
            <input
                className={urlCheck(bookUri) ? '' : 'error'}
                id="bookImg"
                type="text" value={bookUri}
                onChange={onBookImgChange}
                placeholder="e.g.: http://www.somehost.com/logo.png"/>
        </p>
    );
};