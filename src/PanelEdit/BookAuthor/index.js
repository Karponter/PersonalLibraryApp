import React from 'react';

export default function BookAuthor({onBookAuthorChange, bookAuthor}) {
    const authorCheck = (author) => {
        return author.match(/^[a-zA-Z ]+$/);
    };
    return (
        <p>
            <label form="bookAuthor">Author</label>
            <input
                className={authorCheck(bookAuthor) ? '' : 'error'}
                id="bookAuthor"
                type="text" value={bookAuthor}
                onChange={onBookAuthorChange}
                placeholder="e.g.: Lewis Carroll"/>
        </p>
    );
};