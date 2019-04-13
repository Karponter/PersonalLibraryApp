import React from 'react';

export default function BookImgUri({onBookImgChange, bookUri}) {
    return (
        <p>
            <label form="bookImg">Background Image URL</label>
            <input
                id="bookImg"
                type="text" value={bookUri}
                onChange={onBookImgChange}
                placeholder="e.g.: http://www.somehost.com/logo.png"/>
        </p>
    );
};