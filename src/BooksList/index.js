import React from 'react';
import BookItem from '../BookItem/index';
import './style.css';
import {getEmptyBook} from "../Lib";

export default function BooksList({books, page, pagination}) {

    const getActualBooks = (books) => {
        return books.map((book, index) => {
                if ((index < page * pagination)
                    || (index > ((page + 1) * pagination) - 1)) {
                    return false;
                }
                return (
                    <BookItem key={index} bookItem={book}/>
                );
            }
        )
    };

    return (
        <div className="books-list">
            {getActualBooks([getEmptyBook(), ...books])}
        </div>
    );
};