import React from 'react';
import BookItem from '../index';
import './style.css';

export default function BooksList({books, page, pagination, sortOrder, sortProperty, setCurrentBook}) {
    books.sort((a, b) => {
        if (typeof a[sortProperty] === 'string') {
            return a[sortProperty].localeCompare(b[sortProperty]) * (sortOrder ? 1 : -1);
        }
        if (typeof a[sortProperty] === 'number') {
            return (a[sortProperty] - b[sortProperty]) * (sortOrder ? 1 : -1);
        }
        return false;
    });

    const getActualBooks = () => {
        return books.map((book, index) => {
                if ((index < page * pagination)
                    || (index > ((page + 1) * pagination) - 1)) {
                    return false;
                }
                return (
                    <BookItem setCurrentBook={setCurrentBook} key={index} bookItem={book}/>
                );
            }
        )
    };

    return (
        <div className="books-list">
            {getActualBooks()}
        </div>
    );
};