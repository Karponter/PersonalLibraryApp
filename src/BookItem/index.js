import React from 'react';
import BookRate from './BookRate';
import BookTitle from './BookTitle';

export default function BookItem({bookItem, setCurrentBook}) {
    return (
        <div onClick={() =>
            setCurrentBook(Object.assign({}, bookItem, {'tempRate': bookItem.rate}))}
             className="book-item">
            <BookRate rate={bookItem.rate}/>
            <BookTitle title={bookItem.name}/>
            <img alt={bookItem.name} src={bookItem.imgUrl}/>
        </div>
    );
};