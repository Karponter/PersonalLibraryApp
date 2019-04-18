import React, {Component} from 'react';
import BookName from './BookName';
import BookAuthor from "./BookAuthor";
import BookImgUri from "./BookImgUri";
import BookRate from "./BookRate";
import './style.css';
import ButtonSave from "./ButtonSave";
import Lib from '../test';
import {Link} from "react-router-dom";

export default function PanelEdit({
                                      match, books, currentBook,
                                      setCurrentBook, onCurrentBookChange, onSaveCurrentBookItem
                                  }) {

    const parseUrl = match.url.split('/');
    const bookId = (parseUrl[2] ? parseUrl[2] : null);
    const editingBook = books.filter(book => String(book.id) === bookId)[0];
    if (currentBook.id === null) {
        setCurrentBook(editingBook);
    }
    console.log(currentBook, editingBook);
    return (
        <aside>
            <BookName
                onBookNameChange={(el) =>
                    onCurrentBookChange('name', el.target.value)
                }
                bookName={currentBook.name ? currentBook.name : ''}/>
            <BookAuthor
                onBookAuthorChange={(el) =>
                    onCurrentBookChange('author', el.target.value)
                }
                bookAuthor={currentBook.author ? currentBook.author : ''}/>

            <BookRate
                className="book-rate"
                bookRate={currentBook.rate ? currentBook.rate : 0}
                // bookTempRate={tempRate}
                onBookRateChange={(rate) => {
                    onCurrentBookChange('rate', rate)
                }}
                onBookTempRateChange={(rate) => {
                    onCurrentBookChange('tempRate', rate)
                }}/>

            <BookImgUri
                onBookImgChange={(el) => {
                    onCurrentBookChange('imgUrl', el.target.value)
                }}
                bookUri={currentBook.imgUrl ? currentBook.imgUrl : ''}/>
            <Link to="/">
                <button>Cancel</button>
            </Link>
            <ButtonSave
                onSaveCurrentBookItem={onSaveCurrentBookItem}
                currentBookItem={currentBook}/>
        </aside>
    );
}


