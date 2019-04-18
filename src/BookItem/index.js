import React from 'react';
import BookRate from './BookRate';
import BookTitle from './BookTitle';
import './style.css';
import {Link} from "react-router-dom";

export default function BookItem({bookItem, setCurrentBook}) {
    return (
        <Link className="book-item"
              onClick={() => setCurrentBook(Object.assign({}, bookItem, {'tempRate': bookItem.rate}))}
              to={`/edit/${bookItem.id}`}>
            {bookItem.rate ? <BookRate rate={bookItem.rate}/> : ''}
            {bookItem.name ? <BookTitle title={bookItem.name}/> : ''}
            {bookItem.id || bookItem.imgUrl
                ? <img alt={bookItem.name} src={bookItem.imgUrl}/>
                : <span className="no-image">+</span>}
        </Link>
    );
};