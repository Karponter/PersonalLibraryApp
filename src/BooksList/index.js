import React from 'react';
import BookItem from '../BookItem/index';
import './style.css';

export default function BooksList({books, page, pagination, sortOrder, sortProperty, setCurrentBook}) {

    const emptyBook = {
        id: null,
        name: null,
        author: null,
        date: null,
        read: null,
        rate: null,
        notes: null,
        imgUrl: null
    };

    books.sort((a, b) => {
        if (typeof a[sortProperty] === 'string') {
            return a[sortProperty].localeCompare(b[sortProperty]) * (sortOrder ? 1 : -1);
        }
        if (typeof a[sortProperty] === 'number') {
            return (a[sortProperty] - b[sortProperty]) * (sortOrder ? 1 : -1);
        }
        return false;
    });

    const getActualBooks = (books) => {
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
            {getActualBooks([emptyBook, ...books])}
        </div>
    );
};