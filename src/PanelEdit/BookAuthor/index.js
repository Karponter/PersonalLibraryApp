import React from 'react';

export default function BookAuthor({onBookAuthorChange, bookAuthor}) {
    return (
        <p>
            <label form="bookAuthor">Author</label>
            <input
                id="bookAuthor"
                type="text" value={bookAuthor}
                onChange={onBookAuthorChange}
                placeholder="e.g.: Lewis Carroll"/>
        </p>
    );
};